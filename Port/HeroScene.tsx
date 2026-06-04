'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sphere, Box, MeshTransmissionMaterial, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

function GlassSphere({ position, scale, speed }: { position: [number, number, number], scale: number, speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.3
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <MeshTransmissionMaterial
        backside
        samples={4}
        thickness={0.3}
        roughness={0.05}
        transmissionSampler
        chromaticAberration={0.06}
        anisotropicBlur={0.1}
        distortion={0.1}
        distortionScale={0.1}
        temporalDistortion={0.2}
        color="#F59E0B"
        transmission={0.95}
      />
    </mesh>
  )
}

function GlassCube({ position, scale, speed }: { position: [number, number, number], scale: number, speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * speed + position[2]) * 0.25
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.1
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <MeshTransmissionMaterial
        backside
        samples={4}
        thickness={0.4}
        roughness={0.02}
        transmissionSampler
        chromaticAberration={0.08}
        color="#D97706"
        transmission={0.9}
      />
    </mesh>
  )
}

function ParticleField() {
  const count = 80
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5
    }
    return arr
  }, [])

  const geoRef = useRef<THREE.BufferGeometry>(null)

  useFrame((state) => {
    if (!geoRef.current) return
    const pos = geoRef.current.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.002
    }
    geoRef.current.attributes.position.needsUpdate = true
  })

  return (
    <points>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#F59E0B"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function MouseTracker() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const targetRotation = useRef({ x: 0, y: 0 })

  useFrame(() => {
    camera.rotation.y += (targetRotation.current.y - camera.rotation.y) * 0.05
    camera.rotation.x += (targetRotation.current.x - camera.rotation.x) * 0.05
  })

  return null
}

function SceneContent() {
  const groupRef = useRef<THREE.Group>(null)
  const { mouse } = useThree()

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += (mouse.x * 0.1 - groupRef.current.rotation.y) * 0.05
    groupRef.current.rotation.x += (-mouse.y * 0.05 - groupRef.current.rotation.x) * 0.05
  })

  return (
    <group ref={groupRef}>
      <ParticleField />

      {/* Glass Spheres */}
      <GlassSphere position={[-2.5, 1.5, -1]} scale={0.35} speed={0.8} />
      <GlassSphere position={[2.8, -0.5, 0]} scale={0.5} speed={0.6} />
      <GlassSphere position={[-1.8, -1.8, 0.5]} scale={0.28} speed={1.0} />
      <GlassSphere position={[1.5, 2.2, -0.5]} scale={0.22} speed={0.7} />

      {/* Glass Cubes */}
      <GlassCube position={[-3, -0.5, 0]} scale={0.3} speed={0.5} />
      <GlassCube position={[2.2, 1.2, -1]} scale={0.25} speed={0.9} />
      <GlassCube position={[0.5, -2.2, 0.5]} scale={0.35} speed={0.7} />

      {/* Ambient light */}
      <ambientLight intensity={0.3} color="#F59E0B" />
      <pointLight position={[0, 0, 5]} intensity={1} color="#F59E0B" />
      <pointLight position={[-5, 5, 0]} intensity={0.5} color="#D97706" />
      <pointLight position={[5, -5, 0]} intensity={0.3} color="#FDE68A" />
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <SceneContent />
      <MouseTracker />
    </Canvas>
  )
}
