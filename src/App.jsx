import React, { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { View, AdaptiveDpr } from '@react-three/drei'
import Navbar from './components/Navbar'
import Stats from './components/Stats'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'

// Code-split the heaviest 3D components to drastically compress the initial bundle load time
const Hero = React.lazy(() => import('./components/Hero'))
const VideoSection = React.lazy(() => import('./components/VideoSection'))
const InteractiveViewer = React.lazy(() => import('./components/InteractiveViewer'))

function App() {
  const containerRef = useRef()

  // Force scroll to top on page load
  React.useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={containerRef} className="bg-dark min-h-screen text-light font-sans selection:bg-neon selection:text-dark overflow-x-hidden relative">
      
      <LoadingScreen />

      {/* Unified 3D Canvas - Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Canvas 
          shadows 
          dpr={[1, 1.5]} 
          camera={{ position: [0, 0, 5], fov: 35 }}
          className="w-full h-full"
          eventSource={containerRef}
        >
          <Suspense fallback={null}>
            <View.Port />
          </Suspense>
          <AdaptiveDpr pixelated />
        </Canvas>
      </div>

      {/* UI Content - Foreground Layer */}
      <div className="relative z-10 w-full">
        <Navbar />
        <main>
          <Suspense fallback={null}>
            <Hero />
            <VideoSection />
          </Suspense>
          <Stats />
          <Suspense fallback={null}>
            <InteractiveViewer />
          </Suspense>
          <Gallery />
        </main>
        <Footer />
      </div>

    </div>
  )
}

export default App
