import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import * as THREE from 'three';
import recycleURL from '../assets/recycle.svg';

const SkipModel = ({ size, rotationEnabled }) => {
  const groupRef = useRef();

  const getDimensions = () => {
    switch (size) {
      case 4: return { width: 2, height: 1.2, depth: 2.2 };
      case 6: return { width: 2.5, height: 1.4, depth: 2.8 };
      case 8: return { width: 3, height: 1.6, depth: 3.4 };
      case 10: return { width: 3.5, height: 1.8, depth: 4.0 };
      case 12: return { width: 4, height: 2, depth: 4.5 };
      case 14: return { width: 4.5, height: 2.2, depth: 5.0 };
      case 16: return { width: 5, height: 2.4, depth: 5.5 };
      case 20: return { width: 6, height: 2.6, depth: 6.0 };
      case 40: return { width: 7, height: 2.8, depth: 7.0 };
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
    const geom = new THREE.BoxGeometry(
      width * 0.64,
      height * 0.89,
      depth * 0.84
    );
    geom.translate(0, height * 0.445, 0);
    return geom;
  }, [width, height, depth]);

  const rimBars = [
    [0, height + 0.025, -(depth / 2) + 0.025, [width, 0.05, 0.05]],
    [0, height + 0.025, (depth / 2) - 0.025, [width, 0.05, 0.05]],
    [-(width / 2) + 0.025, height + 0.025, 0, [0.05, 0.05, depth]],
    [(width / 2) - 0.025, height + 0.025, 0, [0.05, 0.05, depth]],
  ];

  const svgData = useLoader(SVGLoader, recycleURL);
  const [svgShapes, setSvgShapes] = useState([]);

  useEffect(() => {
    if (svgData) {
      const shapes = [];
      svgData.paths.forEach((path) => {
        path.toShapes(true).forEach((shape) => {
          shapes.push(shape);
        });
      });
      setSvgShapes(shapes);
    }
  }, [svgData]);

  // === STICKER PLACEMENT ===
  const stickerOffsetX = 0.011;
  const stickerScale = Math.min(height * 0.3, 0.5); // sticker height max 30% of side
  const scaleFactor = stickerScale / 100; // scale down SVG assuming 100 unit height
  const stickerY = height / 2; // vertically centered

  return (
    <group ref={groupRef}>
      {/* Outer Body */}
      <mesh geometry={outerGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          color="#FFEA00"
          metalness={0.3}
          roughness={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner Cavity */}
      <mesh geometry={cavityGeometry} position={[0, 0.002, 0]}>
        <meshStandardMaterial
          color="#222222"
          metalness={0.05}
          roughness={0.9}
          side={THREE.FrontSide}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-4}
        />
      </mesh>

      {/* Rim Bars */}
      {rimBars.map(([x, y, z, args], i) => (
        <mesh key={i} position={[x, y, z]} castShadow receiveShadow>
          <boxGeometry args={args} />
          <meshStandardMaterial color="#999999" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}

      {/* LEFT SVG Sticker */}
      <group
        position={[(-width / 2) - stickerOffsetX, stickerY, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[scaleFactor, scaleFactor, scaleFactor]}
      >
        {svgShapes.map((shape, i) => (
          <mesh key={`left-svg-${i}`}>
            <shapeGeometry args={[shape]} />
            <meshStandardMaterial color="green" side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>

      {/* RIGHT SVG Sticker */}
      <group
        position={[(width / 2) + stickerOffsetX, stickerY, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[scaleFactor, scaleFactor, scaleFactor]}
      >
        {svgShapes.map((shape, i) => (
          <mesh key={`right-svg-${i}`}>
            <shapeGeometry args={[shape]} />
            <meshStandardMaterial color="green" side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

export default SkipModel;
