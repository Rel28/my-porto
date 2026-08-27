import React from 'react'
import { motion } from 'framer-motion'

/* ---------- Ikon (inline SVG, tanpa library tambahan) ---------- */
const iconProps = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
}

const MailIcon = () => (
    <svg {...iconProps}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
    </svg>
)

const PhoneIcon = () => (
    <svg {...iconProps}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
)

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

const InstagramIcon = () => (
    <svg {...iconProps}>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
)

const ArrowIcon = () => (
    <svg {...iconProps} width={16} height={16}>
        <path d="M7 17 17 7M7 7h10v10" />
    </svg>
)

/* ---------- Data (ganti sesuai milikmu) ---------- */
const methods = [
    {
        label: 'Email',
        value: 'vereladitya07@gmail.com',
        href: 'mailto:vereladitya07@gmail.com',
        icon: <MailIcon />,
    },
    {
        label: 'WhatsApp',
        value: '+62 812-3456-7890',
        href: 'https://wa.me/6282147319077',
        icon: <PhoneIcon />,
    },
]

const socials = [
    { label: 'GitHub', href: 'https://github.com/Rel28', icon: <GithubIcon /> },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/verel-as-58091a252', icon: <LinkedinIcon /> },
    { label: 'Instagram', href: 'https://www.instagram.com/verel_asb?igsi=MXJvbmFyazJ1dXg4YQ%3D%3D&utm_source=qr', icon: <InstagramIcon /> },
]

/* ---------- Varian animasi (stagger) ---------- */
const containerV = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
}
const itemV = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 260, damping: 22 },
    },
}

const Contact = () => {
    return (
        <div
            className="relative overflow-hidden rounded-3xl px-8 py-20 bg-gray-300"
        >
            <motion.div
                variants={containerV}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.3 }}
                className="relative z-10 flex flex-col items-center text-center"
            >
                {/* Judul */}
                <motion.h1
                    variants={itemV}
                    className="font-display text-3xl sm:text-5xl font-medium text-[#272729]"
                >
                    Get in Touch With Me
                </motion.h1>

                {/* Deskripsi */}
                <motion.p
                    variants={itemV}
                    className="font-sans font-medium text-gray-600 text-md mt-5 max-w-xl"
                >
                    Whether it's a job opportunity, a collaboration, or a question about one of my projects, I'd love to hear from you. Feel free to reach out anytime.
                </motion.p>

                {/* Tombol kontak utama */}
                <motion.div
                    variants={itemV}
                    className="mt-10 flex flex-wrap justify-center gap-4"
                >
                    {methods.map((m) => (
                        <motion.a
                            key={m.label}
                            href={m.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -4, scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                            className="group flex items-center gap-3 bg-white/50 backdrop-blur-sm border border-white/70 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md"
                        >
                            <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#272729] text-white shrink-0">
                                {m.icon}
                            </span>
                            <span className="text-left">
                                <span className="block font-sans text-xs uppercase tracking-wide text-gray-500">
                                    {m.label}
                                </span>
                                <span className="block font-display font-medium text-[#272729]">
                                    {m.value}
                                </span>
                            </span>
                            <span className="ml-2 text-gray-400 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
                                <ArrowIcon />
                            </span>
                        </motion.a>
                    ))}
                </motion.div>

                {/* Ikon sosial media */}
                <motion.div
                    variants={itemV}
                    className="mt-8 flex items-center gap-4"
                >
                    {socials.map((s) => (
                        <motion.a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={s.label}
                            whileHover={{ y: -4, scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/50 backdrop-blur-sm border border-white/70 text-[#272729] shadow-sm hover:bg-[#272729] hover:text-white"
                        >
                            {s.icon}
                        </motion.a>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Contact
