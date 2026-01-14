'use client'
import { ReactNode, useEffect, useRef } from 'react'

export function SmoothScroll({ children }: { children: ReactNode }) {
    const lenisRef = useRef<any>(null)

    useEffect(() => {
        const initLenis = async () => {
            try {
                const Lenis = (await import('lenis')).default
                lenisRef.current = new Lenis({
                    duration: 1.5,
                    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    orientation: 'vertical',
                    gestureOrientation: 'vertical',
                    smoothWheel: true,
                    wheelMultiplier: 1,
                    touchMultiplier: 2,
                    infinite: false,
                })

                function raf(time: number) {
                    lenisRef.current?.raf(time)
                    requestAnimationFrame(raf)
                }
                requestAnimationFrame(raf)
                document.body.classList.remove('loading')
            } catch (e) {
                console.warn('Lenis not available:', e)
            }
        }

        initLenis()

        return () => {
            lenisRef.current?.destroy()
        }
    }, [])

    return <>{children}</>
}

export default SmoothScroll