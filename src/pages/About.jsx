import React, { useRef, useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import Lightbox from '../components/Lightbox'
import Footer from '../components/Footer'
import PFPMe from '../assets/PFPMe.png'
import PFPMe2 from '../assets/PFPMe2.JPG'
import OrgCertificate from '../assets/Documentation/OrgCertificate.jpg'
import Member from '../assets/Documentation/Member.jpg'
import RakaminCert from '../assets/Documentation/RakaminCert.png'
import BestGroupCer from '../assets/Documentation/BestGroup.png'
import DesignOrg from '../assets/Documentation/DesignOrg.png'
import FinalProject from '../assets/Documentation/FinalProject.png'
import CompletionLetter from '../assets/Documentation/CompletionLetter.jpg'
import InternDoc from '../assets/Documentation/InternDoc.png'
import Infograph from '../assets/Documentation/Infograph.jpg'
import CertAward from '../assets/Documentation/CertAward.jpg'
import RakaminLogo from '../assets/RakaminLogo.jpg'
import DjafuLogo from '../assets/DjafuLogo.jpg'
import JsLogo from '../assets/Icon/javascript-original.svg'
import PythonLogo from '../assets/Icon/python-original.svg'
import PHPLogo from '../assets/Icon/php-original.svg'
import SQLLogo from '../assets/Icon/azuresqldatabase-original.svg'
import ReactLogo from '../assets/Icon/react-original.svg'
import NodeLogo from '../assets/Icon/nodejs-original.svg'
import FlaskLogo from '../assets/Icon/flask-original.svg'
import TailwindLogo from '../assets/Icon/tailwindcss-original.svg'
import FigmaLogo from '../assets/Icon/figma-original.svg'
import GitLogo from '../assets/Icon/git-original.svg'
import GCPLogo from '../assets/Icon/googlecloud-original.svg'



/* ============================================================
   DATA — ganti dengan data & aset milikmu
   ============================================================ */

const funFacts = [
    "I love talking to myself, it's to express my thoughts and ideas.",
    "I'm allergic to cats, but I still love them.",
    "I enjoy solving puzzles and brain teasers in my free time.",
    "I think I'm an introvert, but I can be an extrovert when I'm comfortable.",
    "I'm addicted to gacha games, but I try to limit my spending on them.",
    "I don't have a specific favorite music genre, I just love music in general.",
    "I love to travel and explore new places, but I also enjoy staying at home and relaxing.",
    "Why I don't have a girlfriend yet? :(",
    "I don't like or hate vegetables, but I do love to eat broccoli.",
]

const experiences = [
    {
        title: 'BSc Computer Science',
        place: 'Udayana University',
        location: 'Jimbaran, Bali',
        period: 'Aug 2022 - Jun 2026',
        description:
            'Graduated with a 3.91 GPA, focusing on software engineering, databases, and web technologies. Built TogaPed, a web-based recommendation system for medicinal plants, as my final project.',
        images: [],
    },
    {
        title: 'Head of Public Relations Division (HIMAIF)',
        place: 'Udayana University',
        location: 'Jimbaran, Bali',
        period: 'Jan 2025 - Dec 2025',
        description:
            'Led a team of 13 staff managing the organization\'s public image, directed visual content strategy for official social media, and served as the main liaison with external partners.',
        images: [
            { src: OrgCertificate, label: 'Certificate' },
            { src: Member, label: 'Member Photo' },
            { src: DesignOrg, label: 'Design Task' },
        ],
    },
    {
        title: 'Full-Stack Developer (Independent Study)',
        place: 'Rakamin Academy',
        location: 'Indonesia',
        period: 'Sep 2024 - Dec 2024',
        description:
            'Completed 800+ hours of MSIB Batch 7 training at Rakamin Academy covering UI/UX design, front-end and back-end development, and data science fundamentals. Awarded Best Group of Final Project among all teams in the batch.',
        images: [
            { src: RakaminCert, label: 'Certificate' },
            { src: BestGroupCer, label: 'Best Group Certificate' },
            { src: FinalProject, label: 'Final Project' },
        ],
    },
    {
        title: 'Software Developer Intern',
        place: 'PLN Icon Plus',
        location: 'Denpasar, Bali',
        period: 'Jul 2024 - Sep 2024',
        description:
            'Developed SIKADEK, an internal web-based information system that replaced manual spreadsheet workflows with real-time data management, including CSV import/export and activity logging, using PHP and MySQL.',
        images: [
            { src: CompletionLetter, label: 'Completion Letter' },
            { src: InternDoc, label: 'Documentation' },
        ],
    },
]

const achievements = [
    { 
        logo: RakaminLogo,
        place: 'Rakamin Academy',
        title: 'Best Group of Final Project', 
        year: '2024', 
        images: [
            { src: BestGroupCer, label: 'Best Group Certificate' },
        ]
    },
    {
        logo: DjafuLogo,
        place: 'Djafu Design',
        title: '2nd Place in Infograph', 
        year: '2024',
        images: [
            { src: CertAward, label: 'Certificate of Achievement' },
            { src: Infograph, label: 'Infograph Design' },
        ]
    },
]

// Ganti emoji dengan <img> logo aslimu kalau sudah ada asetnya
const skillGroups = [
    {
        title: 'Languages',
        pills: ['JavaScript', 'Python', 'PHP', 'SQL'],
        logos: [
            { icon: JsLogo, x: '15%', y: '20%', dur: 4 },
            { icon: PythonLogo, x: '60%', y: '10%', dur: 5 },
            { icon: PHPLogo, x: '30%', y: '55%', dur: 4.5 },
            { icon: SQLLogo, x: '70%', y: '50%', dur: 3.5 },
        ],
    },
    {
        title: 'Frameworks/Library',
        pills: ['React', 'Node.js', 'Flask', 'Tailwind'],
        logos: [
            { icon: ReactLogo, x: '20%', y: '15%', dur: 4.5 },
            { icon: NodeLogo, x: '65%', y: '25%', dur: 3.8 },
            { icon: FlaskLogo, x: '35%', y: '55%', dur: 5 },
            { icon: TailwindLogo, x: '68%', y: '58%', dur: 4.2 },
        ],
    },
    {
        title: 'Other',
        pills: ['Figma', 'Git', 'GCP'],
        logos: [
            { icon: FigmaLogo, x: '18%', y: '18%', dur: 4 },
            { icon: GitLogo, x: '62%', y: '12%', dur: 4.8 },
            { icon: GCPLogo, x: '30%', y: '52%', dur: 3.6 },
        ],
    },
]

const hobbies = [
    { icon: '🎮', label: 'Gaming' },
    { icon: '🧩', label: 'Puzzle & Strategy' },
    { icon: '🎾', label: 'Tennis' },
    { icon: '🚴', label: 'Cycling' },
    { icon: '🏊', label: 'Swimming' },
    { icon: '🎹', label: 'Piano' },
]
/* ============================================================
   HELPER — heading section
   ============================================================ */

const SectionHeader = ({ eyebrow, title }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-8 md:mb-10"
    >
        <div className="flex items-center gap-3 md:gap-4 mb-2">
            <span className="w-8 md:w-10 h-px bg-gray-400" />
            <p className="font-sans text-xs md:text-sm tracking-[0.25em] uppercase text-gray-500">
                {eyebrow}
            </p>
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-medium text-[#272729]">
            {title}
        </h2>
    </motion.div>
)

   /* ============================================================
      BARIS THUMBNAIL — gaya media attachment LinkedIn
      ============================================================ */
   
   const AttachmentRow = ({ images, onOpen }) => (
       <div className="flex flex-wrap gap-2.5 mt-4 md:mt-5">
           {images.map((img, i) => (
               <motion.button
                   key={img.src}
                   onClick={() => onOpen(i)}
                   whileHover={{ y: -3 }}
                   whileTap={{ scale: 0.96 }}
                   className="group/thumb relative w-24 h-16 md:w-28 md:h-20 rounded-md overflow-hidden
                              border border-white/60 bg-gray-300 shadow-sm cursor-pointer"
               >
                   <img
                       src={img.src}
                       alt={img.label}
                       className="w-full h-full object-cover
                                  group-hover/thumb:scale-105 transition-transform duration-500 ease-out"
                   />
                   {/* Overlay + ikon zoom saat hover */}
                   <span className="absolute inset-0 flex items-center justify-center
                                    bg-[#272729]/0 group-hover/thumb:bg-[#272729]/40 transition-colors duration-300">
                       <svg
                           className="opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 text-white"
                           width="20" height="20" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                       >
                           <circle cx="11" cy="11" r="8" />
                           <path d="m21 21-4.3-4.3" />
                           <path d="M11 8v6M8 11h6" />
                       </svg>
                   </span>
                   {/* Label kecil di bawah thumbnail */}
                   <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#272729]/70 to-transparent
                                    px-2 pb-1 pt-4 text-left">
                       <span className="font-sans text-[10px] text-white/90 line-clamp-1">
                           {img.label}
                       </span>
                   </span>
               </motion.button>
           ))}
       </div>
   )

/* ============================================================
   EXPERIENCE SECTION
   ============================================================ */

const ExperienceSection = () => {
    const timelineRef = useRef(null)

    // State lightbox: { expIndex, imgIndex } atau null saat tertutup
    const [preview, setPreview] = useState(null)

    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ['start 0.75', 'end 0.45'],
    })
    const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25 })

    const activeImages = preview !== null ? experiences[preview.expIndex].images : []

    return (
        <section className="max-w-6xl mx-auto px-5 md:px-6 pt-16 md:pt-24">
            <SectionHeader eyebrow="My Journey" title="Experience" />

            {/* pl lebih kecil di mobile supaya kartu tetap lebar */}
            <div ref={timelineRef} className="relative pl-9 md:pl-14">
                <div className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-0.5 bg-gray-300" />
                <motion.div
                    style={{ scaleY: lineScale }}
                    className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-0.5 bg-blue-500 origin-top"
                />

                <div className="flex flex-col gap-6 md:gap-10">
                    {experiences.map((exp, expIndex) => (
                        <div key={exp.title} className="relative">
                            <motion.span
                                initial={{ backgroundColor: '#9ca3af', scale: 1 }}
                                whileInView={{
                                    backgroundColor: '#3b82f6',
                                    scale: 1.15,
                                    boxShadow: '0 0 0 5px rgba(59,130,246,0.2)',
                                }}
                                viewport={{ once: false, amount: 0.6 }}
                                transition={{ duration: 0.4 }}
                                className="absolute -left-9 md:-left-14 top-5 md:top-6 w-4 h-4 md:w-5 md:h-5 rounded-full border-4 border-[#E9E9E9]"
                            />

                            <motion.div
                                initial={{ opacity: 0, x: 60 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, amount: 0.4 }}
                                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                                className="bg-white/35 backdrop-blur-sm border border-white/60 rounded-2xl shadow-sm p-5 md:p-6"
                            >
                                {/* Di mobile: badge periode pindah ke bawah judul */}
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4">
                                    <div>
                                        <h3 className="font-display text-xl md:text-2xl font-medium text-[#272729]">
                                            {exp.title}
                                        </h3>
                                        <p className="font-sans text-xs md:text-sm text-gray-500 mt-1">
                                            {exp.place} &nbsp;·&nbsp; {exp.location}
                                        </p>
                                    </div>
                                    <span className="self-start font-sans text-xs text-blue-600 bg-blue-100/70 border border-blue-200 rounded-full px-3 py-1 shrink-0">
                                        {exp.period}
                                    </span>
                                </div>

                                <p className="font-sans text-xs md:text-sm text-gray-600 mt-3 md:mt-4">
                                    {exp.description}
                                </p>

                                {/* ---- BARIS THUMBNAIL (pengganti See Certificate) ---- */}
                                {exp.images?.length > 0 && (
                                    <AttachmentRow
                                        images={exp.images}
                                        onOpen={(imgIndex) => setPreview({ expIndex, imgIndex })}
                                    />
                                )}
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ---- LIGHTBOX ---- */}
            <AnimatePresence>
                {preview !== null && (
                    <Lightbox
                        images={activeImages}
                        index={preview.imgIndex}
                        onClose={() => setPreview(null)}
                        onPrev={() =>
                            setPreview((p) => ({
                                ...p,
                                imgIndex: (p.imgIndex - 1 + activeImages.length) % activeImages.length,
                            }))
                        }
                        onNext={() =>
                            setPreview((p) => ({
                                ...p,
                                imgIndex: (p.imgIndex + 1) % activeImages.length,
                            }))
                        }
                    />
                )}
            </AnimatePresence>
        </section>
    )
}

/* ============================================================
   SKILL & TOOLS — logo melayang di dalam kartu
   ============================================================ */

const FloatingLogo = ({ icon, x, y, dur, delay }) => (
    <motion.span
        animate={{ y: [0, -14, 0], rotate: [0, 4, -4, 0] }}
        transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
        style={{ left: x, top: y }}
        className="absolute select-none drop-shadow-sm"
    >
        <img src={icon} className="w-9 h-9 md:w-11 md:h-11 object-contain" />
    </motion.span>
)

const SkillSection = () => (
    <section className="max-w-6xl mx-auto px-5 md:px-6 pt-16 md:pt-24">
        <SectionHeader eyebrow="Toolbox" title="Skill & Tools" />

        {/* 1 kolom di mobile, 3 kolom mulai md */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
            {skillGroups.map((group, gi) => (
                <motion.div
                    key={group.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: gi * 0.12, ease: 'easeOut' }}
                    className="bg-white/35 backdrop-blur-sm border border-white/60 rounded-2xl shadow-sm p-5 md:p-6 flex flex-col"
                >
                    <h3 className="font-display text-xl md:text-2xl font-medium text-[#272729]">
                        {group.title}
                    </h3>

                    {/* Area lebih pendek di mobile agar halaman tidak memanjang */}
                    <div className="relative h-36 md:h-56 my-4">
                        {group.logos.map((logo, i) => (
                            <FloatingLogo key={i} {...logo} delay={i * 0.4 + gi * 0.2} />
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                        {group.pills.map((pill) => (
                            <span
                                key={pill}
                                className="font-sans text-xs text-gray-600 bg-gray-200/80 border border-gray-300/60 rounded-full px-3 py-1.5"
                            >
                                {pill}
                            </span>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    </section>
)

/* ============================================================
   HALAMAN UTAMA
   ============================================================ */

const About = () => {
    const [fact, setFact] = useState(null)

    const [openAch, setOpenAch] = useState(null)   // { achIndex, imgIndex } | null
    const achImages = openAch !== null ? achievements[openAch.achIndex].images : []

    const showRandomFact = () => {
        let nextFact = funFacts[Math.floor(Math.random() * funFacts.length)]
        while (funFacts.length > 1 && nextFact === fact) {
            nextFact = funFacts[Math.floor(Math.random() * funFacts.length)]
        }
        setFact(nextFact)
    }

    return (
        <div className="bg-[#E9E9E9] min-h-screen overflow-x-hidden">

            {/* ---------- HERO ---------- */}
            <section className="max-w-6xl mx-auto px-5 md:px-6 pt-12 md:pt-20 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="text-center md:text-left"
                    >
                        <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#272729] mb-3">
                            Hi! I'm Verel Aditya
                        </h1>
                        <p className="font-display text-base md:text-lg text-gray-500 mb-4 md:mb-5">
                            Developer, Designer, & Software Engineering
                        </p>
                        <p className="font-sans text-sm text-gray-600 max-w-md mx-auto md:mx-0 font-medium">
                            I'm Verel, a Computer Science graduate from Udayana University, based in Bali. I love untangling hard problems, and once I take something on, I give it everything. Off screen, I recharge with strategy games, tennis, cycling, and the occasional piano session.
                        </p>
                        <div className="mt-6">
                            <button
                                onClick={showRandomFact}
                                className="font-display text-sm font-medium px-5 py-2.5 rounded-md border border-[#272729]/30 text-[#272729] hover:bg-[#272729] hover:text-white transition-colors cursor-pointer"
                            >
                                Show me a fun fact
                            </button>

                            <div className="min-h-[3.5rem]">
                                <AnimatePresence mode="wait">
                                    {fact && (
                                        <motion.p
                                            key={fact}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.25, ease: 'easeOut' }}
                                            className="font-sans text-sm text-gray-600 italic mt-4 max-w-md mx-auto md:mx-0"
                                        >
                                            “{fact}”
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>

                    {/* Foto bertumpuk: di mobile dikecilkan & dipusatkan */}
                    <div className="relative h-[240px] md:h-[340px] w-[260px] md:w-auto mx-auto md:mx-0">
                        <motion.img
                            src={PFPMe2}
                            alt="Verel Aditya"
                            initial={{ opacity: 0, x: 40, rotate: 4 }}
                            animate={{ opacity: 1, x: 0, rotate: 3 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="absolute right-0 top-0 w-36 h-36 md:w-52 md:h-52 object-cover object-center border border-white/70 rounded-2xl shadow-md"
                        />
                        <motion.img
                            src={PFPMe}
                            alt="Verel Aditya"
                            initial={{ opacity: 0, x: 40, rotate: -3 }}
                            animate={{ opacity: 1, x: 0, rotate: -2 }}
                            transition={{ duration: 0.8, delay: 0.35 }}
                            className="absolute right-16 md:right-24 top-14 md:top-24 w-40 h-40 md:w-60 md:h-60 object-cover object-center border border-white/70 rounded-2xl shadow-lg"
                        />
                    </div>
                </div>
            </section>

            {/* ---------- EXPERIENCE ---------- */}
            <ExperienceSection />

            {/* ---------- ACHIEVEMENTS ---------- */}
            <section className="max-w-6xl mx-auto px-5 md:px-6 pt-16 md:pt-24">
                <SectionHeader eyebrow="Recognition" title="Achievements" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {achievements.map((a, i) => (
                        <motion.div
                            key={a.title}
                            onClick={() => setOpenAch({ achIndex: i, imgIndex: 0 })}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.4 }}
                            transition={{ duration: 0.5, delay: 0.05 }}
                            whileHover={{ y: -4 }}
                            className="flex items-center gap-4 bg-white/35 backdrop-blur-sm border border-white/60 rounded-2xl shadow-sm p-4 md:p-5 cursor-pointer group"
                        >
                            <div className="w-12 h-12 md:w-14 md:h-14">
                                <img src={a.logo} alt={a.place} className="w-full h-full object-contain rounded-md" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-display text-sm md:text-base font-medium text-[#272729] truncate">
                                    {a.title}
                                </h3>
                                <p className="font-sans text-xs text-gray-500 mt-0.5">
                                    {a.place}
                                </p>
                                <span className="inline-block font-sans text-[10px] text-blue-600 bg-blue-100/70 rounded-full px-2.5 py-0.5 mt-2">
                                    {a.year}
                                </span>
                            </div>
                            <span className="text-gray-400 group-hover:translate-x-1 transition-transform">
                                ›
                            </span>
                        </motion.div>
                    ))}
                </div>
            </section>
            <AnimatePresence>
                {openAch !== null && (
                    <Lightbox
                        images={achImages}
                        index={openAch.imgIndex}
                        onClose={() => setOpenAch(null)}
                        onPrev={() =>
                            setOpenAch((p) => ({
                                ...p,
                                imgIndex: (p.imgIndex - 1 + achImages.length) % achImages.length,
                            }))
                        }
                        onNext={() =>
                            setOpenAch((p) => ({
                                ...p,
                                imgIndex: (p.imgIndex + 1) % achImages.length,
                            }))
                        }
                    />
                )}
            </AnimatePresence>

            {/* ---------- SKILL & TOOLS ---------- */}
            <SkillSection />

            {/* ---------- HOBBIES & INTERESTS ---------- */}
            <section className="max-w-6xl mx-auto px-5 md:px-6 pt-16 md:pt-24 pb-20 md:pb-28">
                <SectionHeader eyebrow="Beyond Code" title="Hobbies & Interests" />
                {/* 3 kolom di mobile (2 baris), 6 kolom di desktop */}
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-5">
                    {hobbies.map((h, i) => (
                        <motion.div
                            key={h.label}
                            initial={{ opacity: 0, y: 30, rotate: i % 2 ? 3 : -3 }}
                            whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 2 : -2 }}
                            viewport={{ once: false, amount: 0.4 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.05,
                                type: 'spring',
                                stiffness: 200,
                                damping: 15,
                            }}
                            whileHover={{ rotate: 0, scale: 1.08, y: -6 }}
                            className="flex flex-col items-center justify-center gap-1.5 md:gap-2 bg-white/45 backdrop-blur-sm border border-white/70 rounded-2xl shadow-sm py-4 md:py-6 cursor-default select-none"
                        >
                            <span className="text-2xl md:text-3xl">{h.icon}</span>
                            <p className="font-sans text-[10px] md:text-xs font-medium text-gray-600">
                                {h.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ---------- FOOTER / CONTACT ---------- */}
            <Footer />
        </div>
    )
}

export default About
