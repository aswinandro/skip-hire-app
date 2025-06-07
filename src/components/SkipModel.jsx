import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const SkipModel = ({ size, rotationEnabled }) => {
  const groupRef = useRef();

  const getDimensions = () => {
    switch (size) {
      case 4: return { width: 2, height: 1.2, depth: 2.2 };
      case 6: return { width: 2.5, height: 1.4, depth: 2.8 };
      case 8: return { width: 3, height: 1.6, depth: 3.4 };
      case 10: return { width: 3.5, height: 1.8, depth: 4.0 };
      default: return { width: 2, height: 1.2, depth: 2.2 };
    }
  };

  const { width, height, depth } = getDimensions();

  useFrame(() => {
    if (groupRef.current && rotationEnabled) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  const outerGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const topWidth = width;
    const bottomWidth = width * 0.7;
    const halfDepth = depth / 2;
    const hwTop = topWidth / 2;
    const hwBottom = bottomWidth / 2;

    const vertices = new Float32Array([
      -hwBottom, 0, -halfDepth,
       hwBottom, 0, -halfDepth,
       hwBottom, 0,  halfDepth,
      -hwBottom, 0,  halfDepth,
      -hwTop, height, -halfDepth,
       hwTop, height, -halfDepth,
       hwTop, height,  halfDepth,
      -hwTop, height,  halfDepth,
    ]);

    const indices = [
      0,1,2, 0,2,3,
      0,4,5, 0,5,1,
      1,5,6, 1,6,2,
      2,6,7, 2,7,3,
      3,7,4, 3,4,0,
      4,7,6, 4,6,5
    ];

    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }, [width, height, depth]);

  const cavityGeometry = useMemo(() => {
    const geom = new THREE.BoxGeometry(width * 0.65, height * 0.9, depth * 0.85);
    geom.translate(0, height * 0.45, 0);
    return geom;
  }, [width, height, depth]);

  const rimBars = [
    [0, height + 0.025, -(depth / 2) + 0.025, [width, 0.05, 0.05]],
    [0, height + 0.025, (depth / 2) - 0.025, [width, 0.05, 0.05]],
    [-(width / 2) + 0.025, height + 0.025, 0, [0.05, 0.05, depth]],
    [(width / 2) - 0.025, height + 0.025, 0, [0.05, 0.05, depth]],
  ];

  return (
    <group ref={groupRef}>
      {/* Outer Bin */}
      <mesh geometry={outerGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          color="#FFEA00" // Yellow body
          metalness={0.3}
          roughness={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner cavity */}
      <mesh geometry={cavityGeometry} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#222222"
          metalness={0.05}
          roughness={0.9}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Rim bars */}
      {rimBars.map(([x, y, z, args], i) => (
        <mesh key={i} position={[x, y, z]} castShadow receiveShadow>
          <boxGeometry args={args} />
          <meshStandardMaterial color="#999999" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}

      {/* Scale ticks and labels on top surface along width (x axis) */}
      {Array.from({ length: Math.floor(width * 4) + 1 }).map((_, i) => {
        const x = -width / 2 + i * 0.25; // Every 0.25m
        return (
          <group key={i} position={[x, height + 0.05, 0]}>
            {/* Tick mark */}
            <mesh>
              <boxGeometry args={[0.01, 0.02, 0.05]} />
              <meshStandardMaterial color="#CCCCCC" />
            </mesh>
            {/* Label */}
            <Text
              position={[0, 0.035, 0]}
              fontSize={0.07}
              color="#BBBBBB"
              anchorX="center"
              anchorY="bottom"
            >
              {x.toFixed(2)}m
            </Text>
          </group>
        );
      })}

      {/* Size label on top center */}
      <Text
        position={[0, height + 0.12, 0]}
        fontSize={0.3}
        color="#222222"
        anchorX="center"
        anchorY="bottom"
        // font={"https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff"} // Optional custom font
        outlineWidth={0.01}
        outlineColor="#FFFFFF"
      >
        {size} YD
      </Text>
    </group>
  );
};

export default SkipModel;
