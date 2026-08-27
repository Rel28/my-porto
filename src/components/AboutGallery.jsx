import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import BaliLife from '../assets/Bali Life.jpg'
import Tennis from '../assets/Tennis.jpeg'
import Graduation from '../assets/graduation.jpeg'
import HIMAIF from '../assets/HIMAIF.jpg'

// Ganti dengan foto-fotomu sendiri
// import Photo1 from '../assets/photo1.jpg'  dst.
// Posisi & ukuran dalam PERSEN terhadap container,
// jadi komposisinya otomatis menyesuaikan lebar kolom apa pun.
const photos = [
    { src: BaliLife, caption: 'Bali Life', rotate: -6, x: '6%',  y: '6%'  },
    { src: Tennis, caption: 'Tennis', rotate: 4,  x: '38%', y: '10%' },
    { src: Graduation, caption: 'Graduation', rotate: -3, x: '14%', y: '36%' },
    { src: HIMAIF, caption: 'HIMAIF', rotate: 7,  x: '40%', y: '40%' },
]

const AboutGallery = () => {
    // Batas area drag = container ini
    const constraintsRef = useRef(null)

    return (
        <div
            ref={constraintsRef}
            className="relative w-full max-w-[480px] mx-auto aspect-square"
        >
            {photos.map((photo) => (
                <motion.div
                    key={photo.caption}
                    drag
                    dragConstraints={constraintsRef}
                    dragElastic={0.2}
                    dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}

                    // Entrance: tiap foto "jatuh" ke posisinya satu per satu
                    initial={{ opacity: 0, y: -40, rotate: 0, scale: 0.8 }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        rotate: photo.rotate,
                        scale: 1,
                    }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{
                        delay: 0.1,
                        type: 'spring',
                        stiffness: 150,
                        damping: 14,
                    }}

                    // Interaksi hover & drag
                    whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
                    whileDrag={{ scale: 1.08, rotate: 0, zIndex: 30, cursor: 'grabbing' }}

                    style={{ left: photo.x, top: photo.y }}
                    className="absolute w-[46%] cursor-grab select-none
                               bg-white/60 backdrop-blur-sm border border-white/70
                               rounded-xl shadow-lg p-2 pb-3 sm:p-3 sm:pb-4"
                >
                    <img
                        src={photo.src}
                        alt={photo.caption}
                        draggable={false}
                        className="w-full aspect-[10/9] object-cover rounded-lg pointer-events-none"
                    />
                    <p className="font-sans text-center text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3">
                        {photo.caption}
                    </p>
                </motion.div>
            ))}

            {/* Hint kecil biar pengunjung tahu fotonya bisa digeser */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
                viewport={{ once: true }}
                className="absolute bottom-0 right-2 font-sans text-xs text-gray-400"
            >
                ✦ drag the photos
            </motion.p>
        </div>
    )
}

export default AboutGallery
