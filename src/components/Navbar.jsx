import React from 'react'
import Logo from '../assets/LOGO.svg'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'


const Navbar = () => {

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Projects', path: '/projects' }
    ]

    const navigate = useNavigate()
    const location = useLocation()

    const containerRef = React.useRef(null)
    const btnRefs = React.useRef([])

  return (
    <nav className="flex justify-between items-center px-10 py-6 bg-[#E9E9E9]">
        <img src={Logo} alt="Logo" className="h-10" />
        <motion.div 
        whileTap={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        ref={containerRef} 
        className="fixed left-1/2 -translate-x-1/2 bottom-6 lg:bottom-auto lg:top-6 flex bg-white/80 backdrop-blur-md border border-white/60 rounded-full p-2 shadow-sm z-50">
            {navItems.map((i, idx) => {
                const isActive = location.pathname === i.path
                return (
                    <button
                        key={i.label}
                        onClick={() => { window.scrollTo(0, 0); navigate(i.path) }}
                        ref={(el) => (btnRefs.current[idx] = el)}
                        className="relative px-6 py-2 rounded-full text-sm font-display font-medium cursor-pointer"
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activePill"
                                drag="x"
                                dragConstraints={containerRef}
                                dragElastic={0.2}
                                dragMomentum={false}
                                whileDrag={{ scale: 1.1 }}
                                onDragEnd={(e, info) => {
                                    let nearest = 0, min = Infinity
                                    btnRefs.current.forEach((btn, idx) => {
                                    const rect = btn.getBoundingClientRect()
                                    const center = rect.left + rect.width / 2
                                    const dist = Math.abs(center - info.point.x)   // info.point.x = posisi cursor
                                    if (dist < min) { min = dist; nearest = idx }
                                    })
                                    window.scrollTo(0, 0)
                                    navigate(navItems[nearest].path)
                                }}
                                className="absolute inset-0 bg-[#272729] rounded-full shadow"
                                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                            />
                        )}
                        <span className={`relative z-10 pointer-events-none ${isActive ? 'text-white' : 'text-gray-600'}`}>
                            {i.label}
                        </span>
                    </button>
                )
            })}
        </motion.div>
        <div />
    </nav>
  )
}

export default Navbar