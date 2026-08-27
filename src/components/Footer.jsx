import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'

/* ---------- Ikon sosial (inline SVG) ---------- */
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
const MailIcon = () => (
    <svg {...iconProps}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
    </svg>
)

/* ---------- Data (ganti sesuai milikmu) ---------- */
const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Projects', path: '/projects' }
    ]

const socials = [
    { label: 'GitHub', href: 'https://github.com/Rel28', icon: <GithubIcon /> },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/verel-as-58091a252', icon: <LinkedinIcon /> },
    { label: 'Instagram', href: 'https://www.instagram.com/verel_asb?igsi=MXJvbmFyazJ1dXg4YQ%3D%3D&utm_source=qr', icon: <InstagramIcon /> },
    { label: 'Email', href: 'mailto:vereladitya07@gmail.com', icon: <MailIcon /> },
]

const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer data-navtheme="dark" className="bg-[#272729] text-gray-300">
            <motion.div
                className="max-w-6xl mx-auto px-10 py-14"
            >
                {/* Baris atas: identitas + navigasi + sosial */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
                    {/* Identitas */}
                    <div className="max-w-sm">
                        <h3 className="font-display text-2xl font-medium text-white">
                            Verel Aditya
                        </h3>
                        <p className="font-sans text-sm text-gray-400 mt-3 leading-relaxed">
                            Computer Science graduate from Udayana University | building clean,
                            interactive web experiences.
                        </p>
                    </div>

                    {/* Navigasi */}
                    <div>
                        <h4 className="font-sans text-xs uppercase tracking-wide text-gray-500 mb-4">
                            Navigation
                        </h4>
                        <ul className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <a
                                        href={link.path}
                                        className="font-sans text-sm text-gray-300 hover:text-white transition-colors duration-200"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Sosial */}
                    <div>
                        <h4 className="font-sans text-xs uppercase tracking-wide text-gray-500 mb-4">
                            Let's connect
                        </h4>
                        <div className="flex items-center gap-3">
                            {socials.map((s) => (
                                <motion.a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                                    className="flex items-center justify-center w-10 h-10 rounded-full border border-white/15 bg-white/5 text-gray-300 hover:bg-white hover:text-[#272729] transition-colors duration-200"
                                >
                                    {s.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Garis pemisah */}
                <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="font-sans text-xs text-gray-500">
                        © {year} Verel Aditya. All rights reserved.
                    </p>
                    <p className="font-sans text-xs text-gray-500">
                        Built with React &amp; Tailwind CSS
                    </p>
                </div>
            </motion.div>
        </footer>
    )
}

export default Footer
