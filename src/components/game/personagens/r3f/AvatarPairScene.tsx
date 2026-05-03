'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useRef } from 'react'
import type { Group } from 'three'

export type AvatarPairFocus = 'adao' | 'eva'

type StylizedAvatarProps = {
  readonly position: [number, number, number]
  readonly bodyColor: string
  readonly headColor: string
  readonly accentRing: string
  readonly focused: boolean
}

function StylizedAvatar({ position, bodyColor, headColor, accentRing, focused }: StylizedAvatarProps) {
  const group = useRef<Group>(null)
  useFrame((_, delta) => {
    const g = group.current
    if (g) g.rotation.y += delta * 0.38
  })
  const s = focused ? 1.16 : 1
  return (
    <group ref={group} position={position} scale={s}>
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <capsuleGeometry args={[0.32, 0.92, 6, 18]} />
        <meshStandardMaterial color={bodyColor} roughness={0.52} metalness={0.12} />
      </mesh>
      <mesh position={[0, 1.3, 0]} castShadow>
        <sphereGeometry args={[0.28, 28, 28]} />
        <meshStandardMaterial color={headColor} roughness={0.42} metalness={0.05} />
      </mesh>
      <mesh position={[0, 1.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.34, 0.026, 8, 40]} />
        <meshStandardMaterial color={accentRing} emissive={accentRing} emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

export function AvatarPairScene({ focus }: { readonly focus: AvatarPairFocus }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%', touchAction: 'none' }}
    >
      <color attach="background" args={['#12151c']} />
      <ambientLight intensity={0.48} />
      <directionalLight castShadow position={[4.2, 9, 3.2]} intensity={1.12} />
      <PerspectiveCamera makeDefault position={[0, 1.38, 4.9]} fov={36} />
      <StylizedAvatar
        position={[-0.92, 0, 0]}
        bodyColor="#9a3412"
        headColor="#fdba74"
        accentRing="#f97316"
        focused={focus === 'adao'}
      />
      <StylizedAvatar
        position={[0.92, 0, 0]}
        bodyColor="#9d174d"
        headColor="#fbcfe8"
        accentRing="#ec4899"
        focused={focus === 'eva'}
      />
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#1e293b" roughness={0.92} metalness={0.02} />
      </mesh>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3.25}
        maxPolarAngle={Math.PI / 2.02}
        target={[0, 0.85, 0]}
      />
    </Canvas>
  )
}
