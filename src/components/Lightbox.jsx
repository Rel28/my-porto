import { useEffect } from 'react'
import { motion } from 'framer-motion'

/* ============================================================
   LIGHTBOX — preview besar saat thumbnail diklik
   ============================================================ */

const Lightbox = ({ images, index, onClose, onPrev, onNext }) => {
    // Tutup dengan Esc, navigasi dengan panah keyboard
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose()
            else if (e.key === 'ArrowLeft') onPrev()
            else if (e.key === 'ArrowRight') onNext()
        }
        window.addEventListener('keydown', onKey)
        document.body.style.overflow = 'hidden' // cegah scroll saat lightbox terbuka
        return () => {
            window.removeEventListener('keydown', onKey)
            document.body.style.overflow = ''
        }
    }, [onClose, onPrev, onNext])

    const img = images[index]

    return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-50 flex items-center justify-center bg-[#272729]/80 backdrop-blur-sm px-4"
            >
                {/* Tombol tutup */}
                <button
                    onClick={onClose}
                    aria-label="Close preview"
                    className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white cursor-pointer"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                </button>
    
                {/* Panah kiri / kanan (muncul kalau gambar > 1) */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={(e) => { e.stopPropagation(); onPrev() }}
                            aria-label="Previous image"
                            className="absolute left-3 md:left-8 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onNext() }}
                            aria-label="Next image"
                            className="absolute right-3 md:right-8 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </button>
                    </>
                )}
    
                {/* Gambar + caption */}
                <motion.div
                    key={img.src}
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    onClick={(e) => e.stopPropagation()}
                    className="flex flex-col items-center gap-3 max-w-4xl w-full"
                >
                    <img
                        src={img.src}
                        alt={img.label}
                        className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
                    />
                    <div className="flex items-center gap-3">
                        <p className="font-sans text-sm text-white/90">{img.label}</p>
                        {images.length > 1 && (
                            <span className="font-sans text-xs text-white/50">
                                {index + 1} / {images.length}
                            </span>
                        )}
                    </div>
                </motion.div>
            </motion.div>
    )
   }

   export default Lightbox