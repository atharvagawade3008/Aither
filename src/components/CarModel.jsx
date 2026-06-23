import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Clone } from '@react-three/drei';
import * as THREE from 'three';

const CarModel = ({ color = "#E50000" }) => {
  const groupRef = useRef();
  const { scene } = useGLTF('/car.glb/scene.gltf');

  // Deeply clone the scene explicitly for this component instance
  // This physically separates the User's Interactive Car from the global Hero Car
  const clonedScene = React.useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child.isMesh) {
        // Unlink materials from the global GLTF cache
        if (child.material) child.material = child.material.clone();
        
        const name = child.name.toLowerCase();
        const matName = child.material?.name?.toLowerCase() || '';
        
        if (name.includes('floor') || name.includes('base') || name.includes('plane') || 
            name.includes('podium') || name.includes('ground') || name.includes('surface')) {
          child.visible = false;
        }

        child.castShadow = true;
        child.receiveShadow = true;

        if (name.includes('body') || name.includes('paint') || name.includes('shell') || 
            name.includes('car_color') || name.includes('primary') || matName.includes('body') || matName.includes('paint')) {
          
          child.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(color),
            metalness: 0.5, // Brought down from 0.9 so the pure CSS color shines through brightly
            roughness: 0.15,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
          });
          child.userData.isBody = true;
        }

        if (name.includes('glass') || name.includes('window') || name.includes('windshield')) {
          child.material = new THREE.MeshPhysicalMaterial({
            color: "#000",
            metalness: 0.1,
            roughness: 0,
            transparent: true,
            opacity: 0.5,
          });
        }
      }
    });
    return clone;
  }, [scene]);

  // Safely update the isolated clone's material color
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh && child.userData.isBody) {
        child.material.color.set(color);
      }
    });
  }, [clonedScene, color]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = -0.05 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02;
    }
  });

  return (
    <group ref={groupRef} scale={1.5} position={[0, -0.05, 0]} dispose={null}>
      <primitive object={clonedScene} />
    </group>
  );
};

// Preload the local model
useGLTF.preload('/car.glb/scene.gltf');

export default CarModel;
