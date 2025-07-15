import { useFrame } from '@react-three/fiber';
import React, { useEffect } from 'react';

export default function ThreeSceneReady() {
  useEffect(() => {
    // runs once after the first full render
    const event = new CustomEvent('three-scene-ready');
    window.dispatchEvent(event);
  }, []);

  return null;
}