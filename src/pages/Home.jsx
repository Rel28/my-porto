import React, { useRef, useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence, useScroll } from 'framer-motion'
import MyPic from '../assets/MyPic.png'
import AboutGallery from '../components/AboutGallery'
import ProjectCardAnim from '../components/ProjectCardAnim'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const iconProps = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
}

const GithubIcon = () => (
    <svg {...iconProps}>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
)

const LinkedinIcon = () => (
    <svg {...iconProps}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
)

/* ============================================================
   MAGNETIC BUTTON — tombol "tertarik" ke arah kursor
   ============================================================ */

const Magnetic = ({ children, strength = 0.35 }) => {
    const ref = useRef(null)
    const mx = useMotionValue(0)
    const my = useMotionValue(0)
    const sx = useSpring(mx, { stiffness: 200, damping: 15 })
    const sy = useSpring(my, { stiffness: 200, damping: 15 })

    const onMove = (e) => {
        const rect = ref.current.getBoundingClientRect()
        mx.set((e.clientX - rect.left - rect.width / 2) * strength)
        my.set((e.clientY - rect.top - rect.height / 2) * strength)
    }
    const onLeave = () => {
        mx.set(0)
        my.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ x: sx, y: sy }}
            className="inline-block"
        >
            {children}
        </motion.div>
    )
}

/* ============================================================
   ROTATING ROLE — "I'm a Developer / Designer / Student"
   ============================================================ */

const roles = ['Developer', 'Designer', 'Engineer']

const RotatingRole = () => {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % roles.length)
        }, 2600)
        return () => clearInterval(id)
    }, [])

    return (
        <span className="relative inline-flex items-center overflow-hidden align-bottom pb-[0.2em] -mb-[0.2em]">
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                    key={roles[index]}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center leading-none whitespace-nowrap text-[#272729]"
                >
                    {roles[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    )
}

/* ============================================================
   MARQUEE STRIP — pita skill berjalan
   ============================================================ */

const skills = ['React', 'JavaScript', 'Python', 'Tailwind', 'Node.js', 'Flask', 'Figma', 'SQL']

const MarqueeStrip = () => (
    <div className="overflow-hidden py-4 select-none" aria-hidden>
        <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="flex w-max gap-8"
        >
            {[...skills, ...skills].map((s, i) => (
                <span
                    key={`${s}-${i}`}
                    className="flex items-center gap-8 font-display text-sm uppercase tracking-[0.3em] text-gray-400"
                >
                    {s} <span className="text-blue-500">✦</span>
                </span>
            ))}
        </motion.div>
    </div>
)

/* ============================================================
    GIANT NAME
   ============================================================ */

const GiantName = ({ text = 'Verel' }) => {
    // Parallax: 0–400px scroll pertama menggeser nama 70px ke bawah,
    // lebih lambat dari konten → terasa "di belakang"
    const { scrollY } = useScroll()
    const parallaxY = useTransform(scrollY, [0, 400], [0, 70])
    const fade = useTransform(scrollY, [0, 350], [1, 0])

    const letters = text.toUpperCase().split('')

    return (
        <motion.h1
            aria-hidden
            style={{ y: parallaxY, opacity: fade }}
            className="pointer-events-none select-none absolute left-1/2 -translate-x-1/2 top-16 lg:top-8
                       flex whitespace-nowrap
                       font-display font-bold uppercase tracking-tight leading-none
                       text-[20vw] lg:text-[12rem]"
        >
            {letters.map((ch, i) => (
                <motion.span
                    key={`${ch}-${i}`}
                    initial={{ y: 90, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        delay: 0.12 + i * 0.06,
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block text-transparent bg-clip-text
                               bg-gradient-to-b from-[#b9b9bd] via-[#d2d2d5] to-[#E9E9E9]"
                >
                    {ch}
                </motion.span>
            ))}
        </motion.h1>
    )
}

/* ============================================================
   HERO SECTION
   ============================================================ */

const HeroSection = () => {
    // Tilt 3D untuk kartu About (dari kode lamamu)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 15 })
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 15 })

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - rect.left) / rect.width - 0.5)
        y.set((e.clientY - rect.top) / rect.height - 0.5)
    }
    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.section
            className="relative max-w-6xl mx-auto px-5 md:px-6 pt-10 pb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* ---- NAMA RAKSASA DI BELAKANG FOTO ---- */}
            <GiantName text="Verel" />

            <div className="grid grid-cols-1 lg:grid-cols-3 items-center lg:items-end gap-8 relative">

                {/* ---- KIRI: kartu About dengan tilt ---- */}
                <motion.div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ rotateX, rotateY, transformPerspective: 800 }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="order-3 lg:order-1 relative z-10 bg-white/35 backdrop-blur-sm border border-white/60 rounded-2xl shadow p-6 w-full max-w-[320px] mx-auto lg:mx-0 lg:mb-50 hidden lg:block"
                >
                    <h3 className="font-display text-3xl font-medium mb-2 text-[#272729]">About</h3>
                    <p className="font-sans font-medium text-gray-600 text-sm">
                        Computer Science graduate from Udayana University, who loves building web applications end to end, from interface to logic behind it to data. I enjoy turning scattered information into something people can actually use.
                    </p>
                </motion.div>

                {/* ---- TENGAH: foto muncul dari dalam arch ---- */}
                <div className="order-2 relative isolate flex justify-center h-[300px] lg:h-[420px]">
                    <div className="absolute bottom-0 w-72 h-40 border-[44px] lg:w-160 lg:h-80 lg:border-90 lg:border-b-0 rounded-t-full border-b-0 border-[#272729] -z-10" />
                    <div className="self-end overflow-hidden rounded-t-full">
                        <motion.img
                            src={MyPic}
                            alt="My Picture"
                            initial={{ y: '55%', scale: 1.08 }}
                            animate={{ y: 0, scale: 1 }}
                            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="w-52 lg:w-80 object-cover rounded-t-full"
                        />
                    </div>
                    <div className="pointer-events-none absolute bottom-0 w-72 lg:w-160 h-24 z-10 bg-gradient-to-t from-[#E9E9E9] to-[#E9E9E9]/0" />
                </div>

                {/* ---- KANAN: sapaan + rotating role ---- */}
                <div className="order-1 lg:order-3 text-center lg:text-left mb-0 lg:mb-60 relative z-10 lg:mx-10">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="font-display text-gray-500 mb-2 whitespace-nowrap"
                    >
                        Hello there! My name is {' '}
                        <span className="font-semibold text-black">Verel Aditya</span>
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.45 }}
                        className="font-display text-4xl lg:text-5xl font-semibold mb-4 whitespace-nowrap"
                    >
                        I'm a <RotatingRole />
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.55 }}
                        className="flex items-center gap-3 justify-center lg:justify-start"
                    >
                        <Magnetic>
                            <a href="https://www.linkedin.com/in/verel-as-58091a252" className="w-10 h-10 flex items-center justify-center bg-[#272729] text-white rounded-full">
                                <LinkedinIcon />
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a href="https://github.com/Rel28" className="w-10 h-10 flex items-center justify-center bg-[#272729] text-white rounded-full">
                                <GithubIcon />
                            </a>
                        </Magnetic>
                        <motion.button
                            initial="rest"
                            animate="rest"
                            whileHover="hover"
                            whileTap={{ scale: 0.96 }}
                            className="font-display bg-[#272729] text-white px-5 py-2.5 rounded-md font-medium cursor-pointer inline-flex items-center whitespace-nowrap"
                        >
                        Download CV

                        {/* Wadah ikon: lebar 0 saat diam, memanjang saat hover → tombol ikut melebar */}
                        <motion.span
                            variants={{
                                rest:  { width: 0,  marginLeft: 0, opacity: 0 },
                                hover: { width: 20, marginLeft: 8, opacity: 1 },
                            }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                            className="inline-flex items-center overflow-hidden"
                        >
                            {/* Ikon: berputar lalu "terbentuk" (scale 0→1 + rotate) */}
                            <motion.span
                                variants={{
                                    rest:  { rotate: -270, scale: 0 },
                                    hover: { rotate: 0,    scale: 1 },
                                }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="inline-flex"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 3v12" />
                                    <path d="m7 10 5 5 5-5" />
                                    <path d="M5 21h14" />
                                </svg>
                            </motion.span>
                        </motion.span>
                    </motion.button>
                    </motion.div>
                </div>
            </div>

            {/* ---- MARQUEE SKILL ---- */}
            <MarqueeStrip />

            {/* ---- STATS BAR ---- */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="w-full grid grid-cols-3 divide-x divide-gray-300 bg-white/35 backdrop-blur-sm border border-white/60 rounded-2xl py-8 mx-auto shadow-sm"
            >
                {[
                    { num: '3', label: 'Years Coding' },
                    { num: '4', label: 'Project Built' },
                    { num: '10', label: 'Certificates' },
                ].map((s) => (
                    <div key={s.label} className="text-center">
                        <p className="font-display text-3xl font-bold">
                            {s.num}<span className="text-blue-500">+</span>
                        </p>
                        <p className="font-sans text-gray-500 text-sm mt-1">{s.label}</p>
                    </div>
                ))}
            </motion.div>
        </motion.section>
    )
}

const Home = () => {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 15 })
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 15 })

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - rect.left) / rect.width - 0.5)
        y.set((e.clientY - rect.top) / rect.height - 0.5)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        // General Section
        <section className="bg-[#E9E9E9] min-h-screen overflow-x-hidden">

            {/* Hero Section */}
            <motion.section
                className="relative max-w-6xl mx-auto px-5 md:px-6 pt-10 pb-10"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.2 }}
            >
                <HeroSection />
            </motion.section>

            {/* About Section */}
            <motion.section
                className="relative max-w-6xl mx-auto px-5 md:px-6 pt-16 lg:pt-24 pb-20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.2 }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
                    {/* Left Side */}
                    <div className="flex flex-col gap-6 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
                        <h1 className="font-display text-4xl lg:text-5xl text-[#272729] font-medium">About Me</h1>
                        <p className="font-sans font-medium text-gray-600 text-md">
                            I'm Verel, a Computer Science graduate from Udayana University, based in Bali. I love untangling hard problems, and once I take something on, I give it everything. Off screen, I recharge with strategy games, tennis, cycling, and the occasional piano session.
                        </p>
                        <motion.button
                            onClick={() => window.location.href = '/about'}
                            initial="rest"
                            animate="rest"
                            whileHover="hover"
                            whileTap={{ scale: 0.96 }}
                            className="font-display bg-[#272729] text-white px-6 py-2.5 rounded-md font-medium cursor-pointer self-center inline-flex lg:self-start items-center gap-1 whitespace-nowrap"
                        >
                            Learn More

                            <motion.span
                                variants={{
                                    rest:  { width: 0,  marginLeft: 0, opacity: 0 },
                                    hover: { width: 20, marginLeft: 8, opacity: 1 },
                                }}
                                transition={{ duration: 0.35, ease: 'easeOut' }}
                                className="inline-flex items-center overflow-hidden"
                            >
                                <motion.span
                                    variants={{
                                        rest:  { scaleY: 1 },
                                        hover: { scaleY: [1, 0.1, 1] },
                                    }}
                                    transition={{ duration: 0.45, repeat: Infinity, repeatDelay: 0.7, ease: 'easeInOut' }}
                                    className="inline-flex origin-center"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                </motion.span>
                            </motion.span>
                        </motion.button>
                    </div>

                    {/* Right Side */}
                    <div className="overflow-hidden">
                        <AboutGallery />
                    </div>
                </div>
            </motion.section>

            {/* Projects Section */}
            <motion.section
                className="relative max-w-6xl mx-auto px-5 md:px-6 pt-16 lg:pt-24 pb-20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.2 }}
            >
                <div className="flex flex-col items-center gap-12 lg:gap-20">
                    {/* Top Side */}
                    <div className="flex flex-col gap-6 max-w-2xl">
                        <h1 className="font-display text-4xl lg:text-5xl text-[#272729] font-medium text-center">My Projects</h1>
                        <p className="font-sans font-medium text-gray-600 text-md text-center">
                            A selection of things I've built while learning and
                            experimenting — from web apps and landing pages to mobile
                            and machine learning projects. Each one taught me something
                            new. Click a card to take a closer look.
                        </p>
                    </div>

                    {/* Bottom Side */}
                    <ProjectCardAnim />

                </div>
            </motion.section>

            {/* Contact Section */}
            <motion.section
                className="relative max-w-6xl mx-auto px-5 md:px-6 pt-10 pb-24"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.2 }}
            >
                <Contact />
            </motion.section>

            {/* Footer */}
            <Footer />
        </section>
    )
}

export default Home
