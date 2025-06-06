// src/components/SkipModel.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text } from '@react-three/drei';

const SkipModel = ({ size, rotationEnabled }) => {
  const meshRef = useRef();
  
  // Calculate dimensions based on skip size
  const getDimensions = () => {
    switch(size) {
      case 4: return { width: 2, height: 1.2, depth: 1.5 };
      case 6: return { width: 2.5, height: 1.4, depth: 1.8 };
      case 8: return { width: 3, height: 1.6, depth: 2 };
      case 10: return { width: 3.5, height: 1.8, depth: 2.2 };
      default: return { width: 2, height: 1.2, depth: 1.5 };
    }
  };
  
  const { width, height, depth } = getDimensions();
  
  // Rotate the model if rotation is enabled
  useFrame(() => {
    if (meshRef.current && rotationEnabled) {
      meshRef.current.rotation.y += 0.005;
    }
  });
  
  return (
    <group>
      <mesh ref={meshRef} castShadow receiveShadow>
        {/* Main skip body */}
        <Box args={[width, height, depth]} position={[0, height/2, 0]}>
          <meshStandardMaterial 
            color="#4a5568" 
            metalness={0.7}
            roughness={0.3}
          />
        </Box>
        
        {/* Skip interior */}
        <Box 
          args={[width-0.2, height-0.1, depth-0.2]} 
          position={[0, height/2 + 0.05, 0]}
        >
          <meshStandardMaterial 
            color="#2d3748" 
            metalness={0.5}
            roughness={0.5}
          />
        </Box>
        
        {/* Skip rim */}
        <Box 
          args={[width+0.1, 0.1, depth+0.1]} 
          position={[0, height, 0]}
        >
          <meshStandardMaterial 
            color="#c0c0c0" 
            metalness={0.9}
            roughness={0.1}
          />
        </Box>
      </mesh>
      
      <Text
        position={[0, height + 0.2, 0]}
        color="silver"
        fontSize={0.3}
        anchorX="center"
        anchorY="middle"
      >
        {size} YD
      </Text>
    </group>
  );
};

export default SkipModel;