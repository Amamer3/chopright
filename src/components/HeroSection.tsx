import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// 3D Plate with interactive tilt
const Plate = ({ tilt }: { tilt: [number, number] }) => {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) {
      // Smoothly interpolate to the target tilt
      ref.current.rotation.x += (tilt[1] - ref.current.rotation.x) * 0.08
      ref.current.rotation.z += (tilt[0] - ref.current.rotation.z) * 0.08
      ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
    }
  })
  return (
    <mesh ref={ref} position={[0, 0, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[1.8, 1.8, 0.15, 64]} />
      <meshStandardMaterial color="#fff" metalness={0.2} roughness={0.6} />
    </mesh>
  )
}

// 3D Salmon (main food)
const Salmon = () => {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = 0.25 + Math.sin(state.clock.getElapsedTime() * 2) * 0.03
      ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.1
    }
  })
  return (
    <mesh ref={ref} position={[0, 0.25, 0]} castShadow>
      <boxGeometry args={[0.8, 0.2, 0.4]} />
      <meshStandardMaterial color="#ff9966" />
    </mesh>
  )
}

// 3D Salad (floating leaves)
const SaladLeaf = ({ position, color, speed = 1 }: { position: [number, number, number], color: string, speed?: number }) => {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * speed) * 0.05
      ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * speed) * 0.3
    }
  })
  return (
    <mesh ref={ref} position={position} castShadow>
      <sphereGeometry args={[0.12, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

// Cherry tomatoes
const Cherry = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 1.5 + position[0]) * 0.04
    }
  })
  return (
    <mesh ref={ref} position={position} castShadow>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial color="#e74c3c" />
    </mesh>
  )
}

// 3D Fried Rice Image with depth effect
const FriedRice3D = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  
  // Load the PNG texture
  const texture = useTexture('/delicious-homemade-vegetable-fried-rice-removebg-preview.png')
  
  useFrame((state) => {
    if (groupRef.current) {
      // Floating animation
      groupRef.current.position.y = 0.8 + Math.sin(state.clock.getElapsedTime() * 0.8) * 0.1
      // Gentle rotation
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.05
    }
  })
  
  return (
    <group ref={groupRef} position={[0, 0.8, 0]}>
      {/* Main image plane */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <planeGeometry args={[1.5, 1.5]} />
        <meshStandardMaterial 
          map={texture} 
          transparent 
          alphaTest={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Depth layers for 3D effect */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <planeGeometry args={[1.45, 1.45]} />
        <meshStandardMaterial 
          map={texture} 
          transparent 
          alphaTest={0.1}
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <planeGeometry args={[1.4, 1.4]} />
        <meshStandardMaterial 
          map={texture} 
          transparent 
          alphaTest={0.1}
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Glow effect behind */}
      <mesh position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.8, 1.8]} />
        <meshStandardMaterial 
          color="#ffa500" 
          transparent 
          opacity={0.2}
          emissive="#ffa500"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  )
}

// 3D Food Scene
const FoodScene = ({ tilt }: { tilt: [number, number] }) => {
  return (
    <>
      {/* Ambient and directional lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[3, 5, 2]} 
        intensity={1.0} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* 3D Fried Rice Image */}
      <FriedRice3D />
      
      {/* Main plate and food */}
      <Plate tilt={tilt} />
      <Salmon />
      
      {/* Floating salad leaves */}
      <SaladLeaf position={[-0.7, 0.45, 0.3]} color="#27ae60" speed={1.2} />
      <SaladLeaf position={[0.6, 0.5, -0.2]} color="#2ecc71" speed={1.5} />
      <SaladLeaf position={[0.2, 0.6, 0.5]} color="#16a085" speed={1.1} />
      <SaladLeaf position={[-0.3, 0.55, -0.4]} color="#27ae60" speed={1.3} />
      
      {/* Cherry tomatoes */}
      <Cherry position={[0.8, 0.4, 0.1]} />
      <Cherry position={[-0.5, 0.35, 0.6]} />
      <Cherry position={[0.3, 0.45, -0.3]} />
      
      {/* Table surface shadow */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <cylinderGeometry args={[2.5, 2.5, 0.01, 64]} />
        <meshStandardMaterial color="#f8f9fa" transparent opacity={0.8} />
      </mesh>
      
      {/* Environment */}
      <Environment preset="sunset" />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        enableRotate={true} 
        maxPolarAngle={Math.PI / 2.2} 
        minPolarAngle={Math.PI / 2.8}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}

const HeroSection: React.FC = () => {
  const [tilt, setTilt] = useState<[number, number]>([0, 0])

  // Mouse move handler for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const hero = document.querySelector('.hero-3d') as HTMLElement
      if (!hero) return
      const rect = hero.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      // Map to [-0.2, 0.2] radians for subtle effect
      setTilt([(x - 0.5) * 0.4, (0.5 - y) * 0.2])
    }

    const hero = document.querySelector('.hero-3d')
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove as EventListener)
      return () => hero.removeEventListener('mousemove', handleMouseMove as EventListener)
    }
  }, [])

  return (
    <section className="flex flex-col lg:flex-row items-center justify-between bg-[#fef7ed] my-10 mx-auto mb-16 px-8 py-16 max-w-7xl gap-12 relative overflow-hidden">
      {/* Left Content */}
      <div className="flex-1 min-w-[320px] max-w-lg z-10 flex flex-col items-start">
        <h1 className="text-5xl lg:text-6xl font-black mb-6 text-gray-900 font-sans leading-tight">
          We Serve The Taste You Love{' '}
          <span role="img" aria-label="smile">😊</span>
        </h1>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-md">
          This is a type of restaurant which typically serves food and drinks, in addition to light refreshments such as baked goods or snacks. The term comes from the French word meaning food.
        </p>
        <div className="flex gap-4 mb-8">
          <button className="bg-orange-400 text-white rounded-full px-8 py-3 font-semibold shadow-lg hover:bg-orange-500 transition-all text-lg">
            Explore Food
          </button>
          <button className="bg-white text-gray-700 border border-gray-300 rounded-full px-8 py-3 font-semibold hover:bg-gray-50 transition-all text-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </button>
        </div>
      </div>

      {/* Right Content - 3D Scene */}
      <div className="flex-1 min-w-[400px] flex items-center justify-center relative z-10">
        {/* Background circle */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-100 rounded-full -z-10 opacity-30" />
        
        <div className="flex flex-col items-center gap-4 relative">
          {/* Category tags */}
          <div className="flex flex-col gap-3 absolute right-[-80px] top-1/2 -translate-y-1/2 z-20">
            <div className="bg-white text-gray-700 border border-gray-200 rounded-full px-4 py-2 font-medium shadow-md flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
              <span>Dishes</span>
            </div>
            <div className="bg-white text-gray-700 border border-gray-200 rounded-full px-4 py-2 font-medium shadow-md flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span>Dessert</span>
            </div>
            <div className="bg-white text-gray-700 border border-gray-200 rounded-full px-4 py-2 font-medium shadow-md flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span>Drinks</span>
            </div>
            <div className="bg-white text-gray-700 border border-gray-200 rounded-full px-4 py-2 font-medium shadow-md flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span>Pasta</span>
            </div>
            <div className="bg-white text-gray-700 border border-gray-200 rounded-full px-4 py-2 font-medium shadow-md flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
              <span>Snacks</span>
            </div>
          </div>
          
          {/* 3D Canvas */}
          <div className="w-[350px] h-[350px] flex items-center justify-center relative hero-3d rounded-full">
            <Canvas 
              camera={{ position: [0, 2.5, 4], fov: 40 }} 
              shadows
              className="rounded-full"
            >
              <Suspense fallback={null}>
                <FoodScene tilt={tilt} />
              </Suspense>
            </Canvas>
            
            {/* Decorative floating elements */}
            <div className="absolute top-4 left-4 w-12 h-12 bg-green-200 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute bottom-8 right-8 w-8 h-8 bg-orange-200 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-2 w-6 h-6 bg-yellow-200 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-8 top-8 w-16 h-16 opacity-20">
        <svg viewBox="0 0 64 64" className="w-full h-full text-orange-300">
          <circle cx="8" cy="8" r="2" fill="currentColor"/>
          <circle cx="24" cy="8" r="2" fill="currentColor"/>
          <circle cx="40" cy="8" r="2" fill="currentColor"/>
          <circle cx="56" cy="8" r="2" fill="currentColor"/>
          <circle cx="8" cy="24" r="2" fill="currentColor"/>
          <circle cx="24" cy="24" r="2" fill="currentColor"/>
          <circle cx="40" cy="24" r="2" fill="currentColor"/>
          <circle cx="56" cy="24" r="2" fill="currentColor"/>
        </svg>
      </div>
      <div className="absolute right-8 bottom-8 w-12 h-12 opacity-20">
        <svg viewBox="0 0 48 48" className="w-full h-full text-orange-300">
          <circle cx="8" cy="8" r="2" fill="currentColor"/>
          <circle cx="24" cy="8" r="2" fill="currentColor"/>
          <circle cx="40" cy="8" r="2" fill="currentColor"/>
          <circle cx="8" cy="24" r="2" fill="currentColor"/>
          <circle cx="24" cy="24" r="2" fill="currentColor"/>
          <circle cx="40" cy="24" r="2" fill="currentColor"/>
        </svg>
      </div>
    </section>
  )
}

export default HeroSection