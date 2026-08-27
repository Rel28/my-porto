import React, { useRef, useState, useLayoutEffect, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useAnimationFrame, animate } from 'framer-motion'
import { projects } from '../data/projects'
import { Link } from 'react-router-dom'

const CARD_W = 340   // harus sama dengan lebar kartu di className
const GAP = 32       // gap-8 = 32px
const STEP = CARD_W + GAP
const AUTO_SPEED = 60

const wrap = (min, max, v) => {
    const range = max - min
    return ((((v - min) % range) + range) % range) + min
}

const ProjectCardAnim = () => {
    const [copies, setCopies] = useState(2)
    const containerRef = useRef(null)
    const trackRef = useRef(null)
    const pannedRef = useRef(false)
    const cardWRef = useRef(CARD_W)
    const stepRef = useRef(STEP)

    const [loopWidth, setLoopWidth] = useState(0)
    const [mode, setMode] = useState('marquee') // 'marquee' | 'focus'
    // Index seleksi kontinu (boleh negatif / melebihi jumlah project,
    // wrap yang menormalkannya) supaya arrow key bisa terus berputar
    const [selected, setSelected] = useState(0)

    const baseX = useMotionValue(0)
    const x = useTransform(baseX, (v) =>
        loopWidth ? wrap(-loopWidth, 0, v) : v
    )

    useLayoutEffect(() => {
    const track = trackRef.current
    const containerW = containerRef.current?.offsetWidth ?? 0
    if (!track) return

    const cards = track.children
    const n = projects.length

    // Ukur lebar kartu & jarak antar kartu langsung dari DOM
    cardWRef.current = cards[0].offsetWidth
    stepRef.current = cards[1].offsetLeft - cards[0].offsetLeft

    // Jarak nyata (ter-render) dari kartu ke-0 ke kartu ke-n
    // = pitch satu set, sudah termasuk gap yang persis sama dgn antar kartu
    const setW = cards[n].offsetLeft - cards[0].offsetLeft
    setLoopWidth(setW)

    setCopies(Math.max(2, Math.ceil(containerW / setW) + 2))
  }, [])

    // Auto-scroll hanya di mode marquee
    useAnimationFrame((t, delta) => {
        if (mode === 'marquee' && loopWidth) {
            baseX.set(baseX.get() - AUTO_SPEED * (delta / 1000))
        }
    })

    // Geser track supaya kartu ke-k berada di tengah container
    const centerOn = (k) => {
        const containerW = containerRef.current?.offsetWidth ?? 0
        const target = (containerW - cardWRef.current) / 2 - k * stepRef.current
        // Cari representasi target terdekat dari posisi sekarang
        // agar animasinya mengambil jalur terpendek
        const current = baseX.get()
        const diff = wrap(-loopWidth / 2, loopWidth / 2, target - current)
        animate(baseX, current + diff, {
            type: 'spring',
            stiffness: 200,
            damping: 26,
        })
    }

    const selectCard = (i) => {
        setMode('focus')
        setSelected(i)
        baseX.stop?.()
        centerOn(i)
    }

    // Navigasi arrow key + Esc, aktif hanya di mode fokus
    useEffect(() => {
        if (mode !== 'focus') return
        const onKey = (e) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault()
                setSelected((k) => {
                    centerOn(k + 1)
                    return k + 1
                })
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault()
                setSelected((k) => {
                    centerOn(k - 1)
                    return k - 1
                })
            } else if (e.key === 'Escape') {
                setMode('marquee')
            }
        }
        // Klik di luar container -> keluar dari mode fokus
        const onPointerDownOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setMode('marquee')
            }
        }
        window.addEventListener('keydown', onKey)
        window.addEventListener('pointerdown', onPointerDownOutside)
        return () => {
            window.removeEventListener('keydown', onKey)
            window.removeEventListener('pointerdown', onPointerDownOutside)
        }
    }, [mode, loopWidth])

    // Swipe manual (tetap bisa di kedua mode)
    const handlePanStart = () => {
        pannedRef.current = false
        baseX.stop?.()
    }
    const handlePan = (e, info) => {
        if (Math.abs(info.offset.x) > 5) pannedRef.current = true
        baseX.set(baseX.get() + info.delta.x)
    }
    const handlePanEnd = (e, info) => {
        if (mode === 'focus') {
            // Setelah swipe di mode fokus, snap ke kartu terdekat dari tengah
            const containerW = containerRef.current?.offsetWidth ?? 0
            const centerOffset = (containerW - cardWRef.current) / 2
            const k = Math.round((centerOffset - baseX.get()) / stepRef.current)
            setSelected(k)
            centerOn(k)
        } else {
            animate(baseX, baseX.get() + info.velocity.x * 0.3, {
                type: 'tween',
                ease: [0.16, 1, 0.3, 1],
                duration: 0.8,
            })
        }
    }

    const n = projects.length
    const selectedMod = ((selected % n) + n) % n

    return (
        <div className="relative">
            <div
                ref={containerRef}
                className="overflow-hidden cursor-grab active:cursor-grabbing py-8"
            >
                <motion.div
                    ref={trackRef}
                    style={{ x }}
                    onPointerDown={() => { pannedRef.current = false }}
                    onPanStart={handlePanStart}
                    onPan={handlePan}
                    onPanEnd={handlePanEnd}
                    className="flex gap-8 w-max select-none"
                >
                    {Array.from({ length: copies }).flatMap((_, c) =>
                        projects.map((project, i) => {
                            const globalIndex = c * n + i
                            const isSelected =
                                mode === 'focus' && i === selectedMod
                            return (
                                <motion.div
                                    key={`${project.title}-${c}`}
                                    onClick={() => {
                                        if (pannedRef.current) return
                                        selectCard(globalIndex)
                                    }}
                                    animate={{
                                        scale:
                                            mode === 'focus'
                                                ? isSelected
                                                    ? 1.08
                                                    : 0.9
                                                : 1,
                                        opacity:
                                            mode === 'focus' && !isSelected
                                                ? 0.55
                                                : 1,
                                    }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 260,
                                        damping: 22,
                                    }}
                                    className={`w-[300px] sm:w-[340px] shrink-0 flex flex-col bg-white/35 backdrop-blur-sm border rounded-lg overflow-hidden cursor-pointer
                                        ${isSelected
                                            ? 'border-[#272729]/30 shadow-xl'
                                            : 'border-white/40 shadow-sm'}`}
                                >
                                    <div className="h-52 bg-gray-300">
                                        {project.image && (
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                draggable={false}
                                                className="w-full h-full object-cover pointer-events-none"
                                            />
                                        )}
                                    </div>

                                    <div className="p-6 flex flex-col flex-1">
                                        <span className="self-start inline-block font-sans text-xs font-medium uppercase tracking-wide text-indigo-500 border border-indigo-200 rounded-full px-3 py-1">
                                            {project.tag}
                                        </span>

                                        <h3 className="font-display text-3xl font-medium text-[#272729] mt-4 mb-2">
                                            {project.title}
                                        </h3>

                                        <p className="font-sans text-sm text-gray-600 mb-6">
                                            {project.description}
                                        </p>

                                        <hr className="border-gray-300 mb-6 mt-auto" />

                                        <Link
                                        to={`/projects/${project.slug}`}
                                        className="font-display w-full text-center bg-[#272729] text-white text-sm font-medium py-3 rounded-md cursor-pointer"
                                        >
                                            View details
                                        </Link>
                                    </div>
                                </motion.div>
                            )
                        })
                    )}
                </motion.div>
            </div>

            {/* Hint navigasi, muncul hanya di mode fokus */}
            <motion.p
                initial={false}
                animate={{ opacity: mode === 'focus' ? 1 : 0 }}
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-sans text-xs text-gray-400"
            >
                ← → to slide &nbsp;·&nbsp; Esc to continue
            </motion.p>
        </div>
    )
}

export default ProjectCardAnim
