import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../hooks/useTheme';
import { useTransform, useSpring } from 'framer-motion';

function FloatingGeometry({ color, animatedPosition, animatedScale }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;

      meshRef.current.scale.set(
        animatedScale.get(),
        animatedScale.get(),
        animatedScale.get()
      );
      meshRef.current.position.set(
        animatedPosition.get()[0],
        animatedPosition.get()[1],
        animatedPosition.get()[2]
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={color}
        metalness={0.4}
        roughness={0.2}
        wireframe
      />
    </mesh>
  );
}

function ParticleField({ animatedScale }) {
  const points = useRef();
  const { theme } = useTheme();

  const particlesCount = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.x += delta * 0.02;
      points.current.rotation.y += delta * 0.03;
      points.current.scale.set(
        animatedScale.get(),
        animatedScale.get(),
        animatedScale.get()
      );
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={useTheme().theme === 'dark' ? '#FFD700' : '#FFA500'}
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
}

const ThreeBackgroundContent = ({ scrollYProgress, opacity, isMobile }) => {
  const { theme } = useTheme();

  const middleSpherePosition = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile
      ? [[0, -5, -10], [0, 0, 0]]
      : [[15, 0, -20], [15, 0, 0]]
  );
  const springMiddleSpherePosition = useSpring(middleSpherePosition);

  const middleSphereScale = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [5, 20] : [11, 48]
  );
  const springMiddleSphereScale = useSpring(middleSphereScale);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Canvas
        camera={{
          position: isMobile ? [0, 0, 10] : [0, 0, 5],
          fov: 60,
        }}
        style={{
          background: theme === 'dark' ? '#1a1a2e' : '#f0f2f5',
          opacity,
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <FloatingGeometry
          color="#FF8C00"
          animatedPosition={springMiddleSpherePosition}
          animatedScale={springMiddleSphereScale}
        />
      </Canvas>
    </div>
  );
};

export default ThreeBackgroundContent;