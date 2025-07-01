import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Suspense, useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

// 3D Plate with interactive tilt (realistic restaurant plate)
const Plate = ({ tilt }: { tilt: [number, number] }) => {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (ref.current) {
      // Smoothly interpolate to the target tilt
      ref.current.rotation.x += (tilt[1] - ref.current.rotation.x) * 0.08
      ref.current.rotation.z += (tilt[0] - ref.current.rotation.z) * 0.08
      ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
    }
  })
  return (
    <group ref={ref} position={[0, 0, 0]}>
      {/* Main plate */}
      <mesh castShadow receiveShadow>
         <cylinderGeometry args={[1.8, 1.8, 0.12, 64]} />
         <meshStandardMaterial 
           color="#f8f9fa" 
           metalness={0.1} 
           roughness={0.2}
         />
       </mesh>
      {/* Plate rim */}
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
        <torusGeometry args={[1.75, 0.08, 8, 64]} />
        <meshStandardMaterial 
          color="#e9ecef" 
          metalness={0.2} 
          roughness={0.4}
        />
      </mesh>
      {/* Plate center depression */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <cylinderGeometry args={[1.5, 1.5, 0.02, 64]} />
        <meshStandardMaterial 
          color="#f1f3f4" 
          metalness={0.05} 
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}

// 3D Salmon (realistic fish fillet)
const Salmon = () => {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = 0.25 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05
      ref.current.rotation.y = Math.sin(state.clock.getElapsedTime()) * 0.1
    }
  })
  return (
    <group ref={ref} position={[0, 0.25, 0]}>
      {/* Main salmon fillet */}
      <mesh castShadow>
        <cylinderGeometry args={[0.4, 0.3, 0.15, 8]} />
        <meshStandardMaterial 
          color="#ff8a65" 
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      {/* Salmon texture lines */}
      <mesh position={[0, 0.08, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.28, 0.02, 8]} />
        <meshStandardMaterial 
          color="#ff7043" 
          roughness={0.2}
        />
      </mesh>
      {/* Grill marks */}
      <mesh position={[0.1, 0.09, 0]} rotation={[0, 0, Math.PI/4]} castShadow>
        <boxGeometry args={[0.6, 0.02, 0.02]} />
        <meshStandardMaterial color="#d84315" />
      </mesh>
      <mesh position={[-0.1, 0.09, 0]} rotation={[0, 0, -Math.PI/4]} castShadow>
        <boxGeometry args={[0.6, 0.02, 0.02]} />
        <meshStandardMaterial color="#d84315" />
      </mesh>
    </group>
  )
}

// 3D Salad (realistic lettuce leaves)
const SaladLeaf = ({ position, color, speed = 1 }: { position: [number, number, number], color: string, speed?: number }) => {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * speed) * 0.08
      ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * speed) * 0.3
      ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * speed * 0.7) * 0.2
    }
  })
  return (
    <group ref={ref} position={position}>
      {/* Main leaf shape */}
      <mesh castShadow>
        <sphereGeometry args={[0.12, 8, 6]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Leaf veins */}
      <mesh position={[0, 0, 0.01]} castShadow>
        <planeGeometry args={[0.15, 0.02]} />
        <meshStandardMaterial 
          color={new THREE.Color(color).multiplyScalar(0.7)} 
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh position={[0.05, 0, 0.01]} rotation={[0, 0, Math.PI/6]} castShadow>
        <planeGeometry args={[0.08, 0.015]} />
        <meshStandardMaterial 
          color={new THREE.Color(color).multiplyScalar(0.7)} 
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh position={[-0.05, 0, 0.01]} rotation={[0, 0, -Math.PI/6]} castShadow>
        <planeGeometry args={[0.08, 0.015]} />
        <meshStandardMaterial 
          color={new THREE.Color(color).multiplyScalar(0.7)} 
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  )
}

// Cherry Tomato (realistic small tomato)
const CherryTomato = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 1.5 + position[0]) * 0.03
      ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.1
    }
  })
  return (
    <group ref={ref} position={position}>
      {/* Main tomato body */}
      <mesh castShadow>
        <sphereGeometry args={[0.08, 12, 8]} />
        <meshStandardMaterial 
          color="#e53e3e" 
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
      {/* Tomato stem */}
      <mesh position={[0, 0.08, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.015, 0.03, 6]} />
        <meshStandardMaterial color="#38a169" />
      </mesh>
      {/* Highlight */}
      <mesh position={[0.03, 0.03, 0.03]} castShadow>
        <sphereGeometry args={[0.02, 8, 6]} />
        <meshStandardMaterial 
          color="#fc8181" 
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  )
}

// Lemon Slice (realistic citrus slice)
const LemonSlice = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 1.3 + position[2]) * 0.04
      ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.6) * 0.2
    }
  })
  return (
    <group ref={ref} position={position} rotation={[Math.PI/2, 0, 0]}>
      {/* Main lemon slice */}
      <mesh castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.02, 8]} />
        <meshStandardMaterial 
          color="#ffd93d" 
          roughness={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Lemon segments */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh 
          key={i} 
          position={[
            Math.cos(i * Math.PI / 4) * 0.06, 
            0.01, 
            Math.sin(i * Math.PI / 4) * 0.06
          ]} 
          castShadow
        >
          <boxGeometry args={[0.02, 0.01, 0.08]} />
          <meshStandardMaterial color="#fff3a0" transparent opacity={0.6} />
        </mesh>
      ))}
      {/* Lemon rind */}
      <mesh castShadow>
        <torusGeometry args={[0.12, 0.008, 8, 16]} />
        <meshStandardMaterial color="#ffeb3b" />
      </mesh>
    </group>
  )
}

// Herb (realistic herb sprig)
const Herb = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 2.2 + position[0] + position[2]) * 0.06
      ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 1.1) * 0.4
    }
  })
  return (
    <group ref={ref} position={position}>
      {/* Herb stem */}
      <mesh castShadow>
        <cylinderGeometry args={[0.005, 0.008, 0.15, 6]} />
        <meshStandardMaterial color="#2d5016" />
      </mesh>
      {/* Herb leaves */}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh 
          key={i}
          position={[
            Math.cos(i * Math.PI / 3) * 0.03,
            0.05 + i * 0.015,
            Math.sin(i * Math.PI / 3) * 0.03
          ]}
          rotation={[Math.random() * 0.5, Math.random() * Math.PI * 2, Math.random() * 0.5]}
          castShadow
        >
          <planeGeometry args={[0.02, 0.04]} />
          <meshStandardMaterial 
            color="#4a5d23" 
            side={THREE.DoubleSide}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

const RestaurantScene = () => {
  const [tilt, setTilt] = useState<[number, number]>([0, 0])
  // Mouse move handler for parallax effect
  useEffect(() => {
    const handle = (e: Event) => {
      if (!(e instanceof MouseEvent)) return;
      const hero = document.querySelector('.hero-3d') as HTMLElement
      if (!hero) return
      const rect = hero.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      // Map to [-0.25, 0.25] radians
      setTilt([ (x - 0.5) * 0.5, (0.5 - y) * 0.3 ])
    }
    const hero = document.querySelector('.hero-3d')
    if (hero) hero.addEventListener('mousemove', handle)
    return () => { if (hero) hero.removeEventListener('mousemove', handle) }
  }, [])

  return (
    <Canvas camera={{ position: [0, 2.5, 4], fov: 40 }} shadows>
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[3, 6, 2]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize-width={2048} 
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        {/* Additional warm lighting for food */}
        <pointLight position={[-2, 3, 1]} intensity={0.8} color="#ffd700" />
        <pointLight position={[2, 2, -1]} intensity={0.6} color="#ff8c42" />
        {/* Plate and food */}
        <Plate tilt={tilt} />
        <Salmon />
        {/* Floating salad leaves */}
        <SaladLeaf position={[-0.7, 0.45, 0.3]} color="#6ab04c" speed={1.2} />
        <SaladLeaf position={[0.6, 0.5, -0.2]} color="#badc58" speed={1.5} />
        <SaladLeaf position={[0.2, 0.6, 0.5]} color="#218c5a" speed={1.1} />
        {/* Cherry tomatoes */}
        <CherryTomato position={[-0.5, 0.4, -0.4]} />
        <CherryTomato position={[0.8, 0.35, 0.1]} />
        {/* Lemon slice */}
        <LemonSlice position={[0.3, 0.3, -0.6]} />
        {/* Herbs */}
        <Herb position={[-0.2, 0.5, 0.7]} />
        <Herb position={[0.4, 0.45, 0.8]} />
        {/* Table shadow */}
        <mesh position={[0, -0.1, 0]} receiveShadow>
          <cylinderGeometry args={[2.2, 2.2, 0.01, 64]} />
          <meshStandardMaterial color="#eee" />
        </mesh>
        {/* Environment and controls */}
        <Environment preset="sunset" />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} maxPolarAngle={Math.PI / 2.2} minPolarAngle={Math.PI / 2.8} />
      </Suspense>
    </Canvas>
  )
}

export default RestaurantScene
