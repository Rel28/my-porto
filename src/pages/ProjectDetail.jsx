import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '../components/Footer'
import Lightbox from '../components/Lightbox'
import { projects, getProjectBySlug } from '../data/projects'


/* ============================================================
   IKON — konsisten dengan gaya ikon di Home.jsx
   ============================================================ */

const iconProps = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
}

const GithubIcon = () => (
    <svg {...iconProps}>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
)

const ArrowUpRightIcon = () => (
    <svg {...iconProps}>
        <path d="M7 17 17 7" />
        <path d="M7 7h10v10" />
    </svg>
)

const ArrowLeftIcon = () => (
    <svg {...iconProps}>
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
    </svg>
)

const CheckIcon = () => (
    <svg {...iconProps} width={16} height={16}>
        <path d="M20 6 9 17l-5-5" />
    </svg>
)

/* ============================================================
   VARIAN ANIMASI — easing sama dengan Home ([0.16, 1, 0.3, 1])
   ============================================================ */

const EASE = [0.16, 1, 0.3, 1]

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
})

/* ============================================================
   TOMBOL LINK — hover melebar + ikon "terbentuk",
   pola sama dengan tombol Download CV di Home.jsx
   ============================================================ */

const LinkButton = ({ href, icon, children, variant = 'dark' }) => {
    const base =
        variant === 'dark'
            ? 'bg-[#272729] text-white'
            : 'bg-transparent text-[#272729] border border-gray-400 hover:border-[#272729]'

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            initial="rest"
            animate="rest"
            whileHover="hover"
            whileTap={{ scale: 0.96 }}
            className={`font-display ${base} px-5 py-2.5 rounded-md text-sm font-medium cursor-pointer inline-flex items-center whitespace-nowrap transition-colors`}
        >
            {children}
            <motion.span
                variants={{
                    rest: { width: 0, marginLeft: 0, opacity: 0 },
                    hover: { width: 18, marginLeft: 8, opacity: 1 },
                }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="inline-flex items-center overflow-hidden"
            >
                <motion.span
                    variants={{
                        rest: { rotate: -270, scale: 0 },
                        hover: { rotate: 0, scale: 1 },
                    }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="inline-flex"
                >
                    {icon}
                </motion.span>
            </motion.span>
        </motion.a>
    )
}

/* ============================================================
   HALAMAN PROJECT DETAIL
   ============================================================ */

const ProjectDetail = () => {
    const { slug } = useParams()
    const navigate = useNavigate()
    const project = getProjectBySlug(slug)

    const [lightboxIndex, setLightboxIndex] = useState(null)

    const shots = (project?.gallery || []).slice(1)
    const lightboxImages = shots.map((src, i) => ({
        src,
        label: `${project?.title ?? ''} — ${i + 1}`,
    }))

    /* ---------- Project tidak ditemukan ---------- */
    if (!project) {
        return (
            <div className="bg-[#E9E9E9] min-h-screen flex flex-col">
                <main className="flex-1 flex flex-col items-center justify-center gap-4 px-5 text-center">
                    <h1 className="font-display text-3xl font-medium text-[#272729]">
                        Project tidak ditemukan
                    </h1>
                    <p className="font-sans text-sm text-gray-600">
                        Project yang kamu cari tidak ada atau sudah dipindahkan.
                    </p>
                    <Link
                        to="/projects"
                        className="font-display bg-[#272729] text-white px-5 py-2.5 rounded-md text-sm font-medium inline-flex items-center gap-2 mt-2"
                    >
                        <ArrowLeftIcon /> Kembali ke Projects
                    </Link>
                </main>
                <Footer />
            </div>
        )
    }

    /* ---------- Navigasi prev / next ---------- */
    const index = projects.findIndex((p) => p.slug === project.slug)
    const prev = projects[(index - 1 + projects.length) % projects.length]
    const next = projects[(index + 1) % projects.length]

    const meta = [
        { label: 'Category', value: project.tag },
        { label: 'Year', value: project.year },
        { label: 'Role', value: project.role },
        { label: 'Scale', value: project.scale },
    ].filter((m) => m.value)

    return (
        <div className="bg-[#E9E9E9] min-h-screen overflow-x-hidden flex flex-col">
            <main className="flex-1 max-w-6xl w-full mx-auto px-5 md:px-6 pt-10 md:pt-14 pb-20 md:pb-28">

                {/* ---------- TOMBOL KEMBALI ---------- */}
                <motion.button
                    {...fadeUp(0)}
                    onClick={() => window.location.href = '/projects'}
                    whileHover={{ x: -4 }}
                    className="group font-sans text-sm text-gray-500 hover:text-[#272729] inline-flex items-center gap-2 cursor-pointer mb-8 md:mb-10 transition-colors"
                >
                    <ArrowLeftIcon />
                    Back
                </motion.button>

                {/* ---------- HEADER ---------- */}
                <motion.div {...fadeUp(0.05)} className="mb-8 md:mb-12">
                    <div className="flex items-center gap-3 md:gap-4 mb-3">
                        <span className="w-8 md:w-10 h-px bg-gray-400" />
                        <p className="font-sans text-xs md:text-sm tracking-[0.25em] uppercase text-gray-500">
                            Case Study
                        </p>
                    </div>

                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <h1 className="font-display text-4xl md:text-6xl font-medium text-[#272729] leading-tight">
                            {project.title}
                        </h1>
                        <span className="font-sans text-xs font-medium uppercase tracking-wide text-indigo-500 border border-indigo-200 rounded-full px-3 py-1 mb-2">
                            {project.tag}
                        </span>
                    </div>

                    <p className="font-sans text-sm md:text-base text-gray-600 max-w-2xl mt-4">
                        {project.description}
                    </p>
                </motion.div>

                {/* ---------- HERO IMAGE ---------- */}
                <motion.div
                    initial={{ opacity: 0, clipPath: 'inset(8% 4% 8% 4% round 12px)' }}
                    animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 12px)' }}
                    transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
                    className="relative h-64 md:h-[28rem] bg-gray-300 rounded-xl overflow-hidden shadow-sm mb-10 md:mb-16"
                >
                    {project.image && (
                        <motion.img
                            src={project.image}
                            alt={project.title}
                            initial={{ scale: 1.12 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
                            className="w-full h-full object-cover"
                        />
                    )}
                </motion.div>

                {/* ---------- KONTEN 2 KOLOM ---------- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 items-start">

                    {/* ----- KIRI: overview + fitur ----- */}
                    <div className="lg:col-span-2 flex flex-col gap-10">
                        {/* Overview */}
                        <motion.section {...fadeUp(0.2)}>
                            <h2 className="font-display text-2xl md:text-3xl font-medium text-[#272729] mb-4">
                                Overview
                            </h2>
                            <p className="font-sans text-sm md:text-base text-gray-600 leading-relaxed">
                                {project.overview || project.description}
                            </p>
                        </motion.section>

                        {/* Fitur utama */}
                        {project.features?.length > 0 && (
                            <motion.section {...fadeUp(0.3)}>
                                <h2 className="font-display text-2xl md:text-3xl font-medium text-[#272729] mb-5">
                                    Key Features
                                </h2>
                                <ul className="flex flex-col gap-3">
                                    {project.features.map((f, i) => (
                                        <motion.li
                                            key={f}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                                            className="flex items-start gap-3 font-sans text-sm md:text-base text-gray-600"
                                        >
                                            <span className="mt-0.5 shrink-0 w-6 h-6 flex items-center justify-center bg-[#272729] text-white rounded-full">
                                                <CheckIcon />
                                            </span>
                                            {f}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.section>
                        )}

                        {/* Galeri tambahan */}
                        {project.gallery?.length > 1 && (
                            <motion.section {...fadeUp(0.35)}>
                                <h2 className="font-display text-2xl md:text-3xl font-medium text-[#272729] mb-5">
                                    Gallery
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {project.gallery.slice(1).map((img, i) => (
                                        <motion.div
                                            key={img}
                                            onClick={() => setLightboxIndex(i)}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
                                            className="relative h-48 md:h-56 bg-gray-300 rounded-lg overflow-hidden group cursor-pointer"
                                        >
                                            <img
                                                src={img}
                                                alt={`${project.title} screenshot ${i + 2}`}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                            />
                                            {/* Overlay + ikon zoom saat hover */}
                                            <span className="absolute inset-0 flex items-center justify-center bg-[#272729]/0 group-hover:bg-[#272729]/40 transition-colors duration-300">
                                                <svg className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white"
                                                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="11" cy="11" r="8" />
                                                    <path d="m21 21-4.3-4.3" />
                                                    <path d="M11 8v6M8 11h6" />
                                                </svg>
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.section>
                        )}
                    </div>

                    {/* ----- KANAN: kartu info sticky ----- */}
                    <motion.aside
                        {...fadeUp(0.25)}
                        className="lg:sticky lg:top-8 flex flex-col gap-6 bg-white/35 backdrop-blur-sm border border-white/60 rounded-2xl shadow-sm p-6"
                    >
                        {/* Meta info */}
                        <dl className="flex flex-col divide-y divide-gray-300">
                            {meta.map((m) => (
                                <div
                                    key={m.label}
                                    className="flex items-center justify-between py-3 first:pt-0"
                                >
                                    <dt className="font-sans text-xs uppercase tracking-[0.2em] text-gray-500">
                                        {m.label}
                                    </dt>
                                    <dd className="font-display text-sm font-medium text-[#272729]">
                                        {m.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        {/* Tech stack */}
                        {project.tech?.length > 0 && (
                            <div>
                                <p className="font-sans text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">
                                    Tech Stack
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="font-sans text-xs font-medium text-gray-600 bg-white/60 border border-white/70 rounded-full px-3 py-1.5"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <hr className="border-gray-300" />

                        {/* Link source & demo */}
                        <div className="flex flex-col gap-3">
                            {project.links?.source && (
                                <LinkButton
                                    href={project.links.source}
                                    icon={<GithubIcon />}
                                >
                                    Source Code
                                </LinkButton>
                            )}
                            {project.links?.demo && (
                                <LinkButton
                                    href={project.links.demo}
                                    icon={<ArrowUpRightIcon />}
                                    variant="light"
                                >
                                    Live Demo
                                </LinkButton>
                            )}
                        </div>
                    </motion.aside>
                </div>

                {/* ---------- NAVIGASI PREV / NEXT ---------- */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="grid grid-cols-2 gap-4 mt-16 md:mt-24 pt-8 border-t border-gray-300"
                >
                    <Link
                        to={`/projects/${prev.slug}`}
                        className="group flex flex-col gap-1"
                    >
                        <span className="font-sans text-xs uppercase tracking-[0.2em] text-gray-500 inline-flex items-center gap-2">
                            <motion.span className="inline-flex group-hover:-translate-x-1 transition-transform">
                                <ArrowLeftIcon />
                            </motion.span>
                            Previous
                        </span>
                        <span className="font-display text-lg md:text-2xl font-medium text-[#272729]">
                            {prev.title}
                        </span>
                    </Link>

                    <Link
                        to={`/projects/${next.slug}`}
                        className="group flex flex-col gap-1 items-end text-right"
                    >
                        <span className="font-sans text-xs uppercase tracking-[0.2em] text-gray-500 inline-flex items-center gap-2">
                            Next
                            <span className="inline-flex rotate-180 group-hover:translate-x-1 transition-transform">
                                <ArrowLeftIcon />
                            </span>
                        </span>
                        <span className="font-display text-lg md:text-2xl font-medium text-[#272729]">
                            {next.title}
                        </span>
                    </Link>
                </motion.div>
            </main>
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <Lightbox
                        images={lightboxImages}
                        index={lightboxIndex}
                        onClose={() => setLightboxIndex(null)}
                        onPrev={() =>
                            setLightboxIndex((i) => (i - 1 + lightboxImages.length) % lightboxImages.length)
                        }
                        onNext={() =>
                            setLightboxIndex((i) => (i + 1) % lightboxImages.length)
                        }
                    />
                )}
            </AnimatePresence>
            <Footer />
        </div>
    )
}

export default ProjectDetail
