import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Rice grain component
const RiceGrain: React.FC<{ position: [number, number, number]; color: string }> = ({ position, color }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.02, 8, 6]} />
      <meshStandardMaterial color={color} roughness={0.8} />
    </mesh>
  );
};

// Vegetable pieces
const VegetablePiece: React.FC<{ position: [number, number, number]; type: 'carrot' | 'pea' | 'corn' | 'pepper' }> = ({ position, type }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.05;
    }
  });

  const getVegetableProps = () => {
    switch (type) {
      case 'carrot':
        return { geometry: <boxGeometry args={[0.03, 0.03, 0.08]} />, color: '#ff6b35' };
      case 'pea':
        return { geometry: <sphereGeometry args={[0.025, 8, 8]} />, color: '#4caf50' };
      case 'corn':
        return { geometry: <cylinderGeometry args={[0.02, 0.02, 0.04]} />, color: '#ffeb3b' };
      case 'pepper':
        return { geometry: <boxGeometry args={[0.04, 0.02, 0.06]} />, color: '#f44336' };
      default:
        return { geometry: <sphereGeometry args={[0.02, 8, 8]} />, color: '#4caf50' };
    }
  };

  const { geometry, color } = getVegetableProps();

  return (
    <mesh ref={meshRef} position={position}>
      {geometry}
      <meshStandardMaterial color={color} roughness={0.6} />
    </mesh>
  );
};

// Scrambled egg pieces
const EggPiece: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4 + position[1]) * 0.03;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.06, 0.02, 0.04]} />
      <meshStandardMaterial color="#fff3a0" roughness={0.7} />
    </mesh>
  );
};

// Main plate
const Plate: React.FC = () => {
  return (
    <group>
      {/* Main plate */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Plate rim */}
      <mesh position={[0, -0.02, 0]}>
        <torusGeometry args={[1.15, 0.03, 8, 32]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.3} />
      </mesh>
    </group>
  );
};

// Main fried rice component
const FriedRiceContent: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);
  
  // Generate random positions for rice grains and vegetables
  const riceGrains = useMemo(() => {
    const grains = [];
    for (let i = 0; i < 200; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.8;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.random() * 0.1;
      const colors = ['#ffffff', '#f8f8f8', '#fff8dc', '#fffacd'];
      grains.push({
        position: [x, y, z] as [number, number, number],
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    return grains;
  }, []);

  const vegetables = useMemo(() => {
    const veggies = [];
    const types: ('carrot' | 'pea' | 'corn' | 'pepper')[] = ['carrot', 'pea', 'corn', 'pepper'];
    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.7;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.random() * 0.08 + 0.02;
      veggies.push({
        position: [x, y, z] as [number, number, number],
        type: types[Math.floor(Math.random() * types.length)]
      });
    }
    return veggies;
  }, []);

  const eggPieces = useMemo(() => {
    const eggs = [];
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.6;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.random() * 0.06 + 0.03;
      eggs.push({
        position: [x, y, z] as [number, number, number]
      });
    }
    return eggs;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Plate />
      
      {/* Rice grains */}
      {riceGrains.map((grain, index) => (
        <RiceGrain key={`rice-${index}`} position={grain.position} color={grain.color} />
      ))}
      
      {/* Vegetables */}
      {vegetables.map((veggie, index) => (
        <VegetablePiece key={`veggie-${index}`} position={veggie.position} type={veggie.type} />
      ))}
      
      {/* Egg pieces */}
      {eggPieces.map((egg, index) => (
        <EggPiece key={`egg-${index}`} position={egg.position} />
      ))}
    </group>
  );
};

// Main component with Canvas
const VegetableFriedRice3D: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`w-24 h-24 ${className || ''}`}>
      <Canvas
        camera={{ position: [2, 2, 2], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-2, 3, -2]} intensity={0.5} color="#ffa500" />
        <pointLight position={[2, 3, 2]} intensity={0.3} color="#ffff00" />
        
        <FriedRiceContent />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};

export default VegetableFriedRice3D;