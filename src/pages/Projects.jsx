import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, categories } from '../data/projects'

/* ============================================================
   HALAMAN PROJECTS
   Data project sekarang ada di src/data/projects.js
   supaya bisa dipakai juga oleh halaman ProjectDetail.
   ============================================================ */

const Projects = () => {
    const [active, setActive] = useState('All')

    const filtered =
        active === 'All' ? projects : projects.filter((p) => p.tag === active)

    return (
        <div className="bg-[#E9E9E9] min-h-screen overflow-x-hidden flex flex-col">

            <main className="flex-1 max-w-6xl w-full mx-auto px-5 md:px-6 pt-12 md:pt-16 pb-20 md:pb-28">
                {/* ---------- HEADER ---------- */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="mb-8 md:mb-10"
                >
                    <div className="flex items-center gap-3 md:gap-4 mb-2">
                        <span className="w-8 md:w-10 h-px bg-gray-400" />
                        <p className="font-sans text-xs md:text-sm tracking-[0.25em] uppercase text-gray-500">
                            My Work
                        </p>
                    </div>
                    <h1 className="font-display text-3xl md:text-5xl font-medium text-[#272729]">
                        Projects
                    </h1>
                    <p className="font-sans text-sm text-gray-600 max-w-xl mt-4">
                        A collection of things I've built, from web apps and
                        mobile experiments to machine learning projects.
                    </p>
                </motion.div>

                {/* ---------- FILTER KATEGORI ---------- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="flex flex-wrap gap-2 mb-10 md:mb-12"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActive(cat)}
                            className={`relative font-sans text-xs md:text-sm font-medium px-4 py-2 rounded-full cursor-pointer transition-colors
                                ${active === cat
                                    ? 'text-white'
                                    : 'text-gray-600 hover:text-[#272729]'}`}
                        >
                            {/* Pill hitam yang "meluncur" antar tombol aktif */}
                            {active === cat && (
                                <motion.span
                                    layoutId="activeCategoryPill"
                                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                                    className="absolute inset-0 bg-[#272729] rounded-full"
                                />
                            )}
                            <span className="relative z-10">{cat}</span>
                        </button>
                    ))}
                </motion.div>

                {/* ---------- GRID KARTU ---------- */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project) => (
                            <motion.div
                                key={project.slug}
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                                whileHover={{ y: -6 }}
                                className="flex flex-col bg-white/35 backdrop-blur-sm border border-white/40 rounded-lg shadow-sm overflow-hidden group"
                            >
                                {/* Area gambar */}
                                <div className="h-40 md:h-52 bg-gray-300 overflow-hidden">
                                    {project.image && (
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover
                                                    md:group-hover:scale-105 transition-transform duration-500 ease-out"
                                        />
                                    )}
                                </div>

                                {/* Badan kartu */}
                                <div className="p-4 md:p-6 flex flex-col flex-1">
                                    <span className="self-start inline-block font-sans text-[10px] md:text-xs font-medium uppercase tracking-wide text-indigo-500 border border-indigo-200 rounded-full px-2.5 py-0.5 md:px-3 md:py-1">
                                        {project.tag}
                                    </span>

                                    <h3 className="font-display text-2xl md:text-3xl font-medium text-[#272729] mt-3 md:mt-4 mb-1.5 md:mb-2 leading-tight">
                                        {project.title}
                                    </h3>

                                    <p className="font-sans text-xs md:text-sm text-gray-600 leading-relaxed mb-4 md:mb-6 line-clamp-3 md:line-clamp-none">
                                        {project.description}
                                    </p>

                                    <hr className="border-gray-300 mb-4 md:mb-6 mt-auto" />

                                    {/* Sekarang jadi Link ke halaman detail */}
                                    <Link
                                        to={`/projects/${project.slug}`}
                                        className="font-display w-full text-center bg-[#272729] text-white text-xs md:text-sm font-medium py-2.5 md:py-3 rounded-md cursor-pointer"
                                    >
                                        View details
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Pesan bila kategori kosong (jaga-jaga) */}
                {filtered.length === 0 && (
                    <p className="font-sans text-sm text-gray-500 text-center mt-16">
                        Belum ada project di kategori ini.
                    </p>
                )}
            </main>

            <Footer />
        </div>
    )
}

export default Projects
