import React, { useRef } from 'react';
import { easing } from 'maath';
import { useFrame } from '@react-three/fiber';
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';

const Backdrop = () => {
    const shadows = useRef();

    return (
        <AccumulativeShadows
            ref={shadows}
            temporal
            frames={60}
            alphaTest={0.5} // Lowered alphaTest for better shadow visibility
            scale={10}
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, 0, -0.14]}
        >
            <RandomizedLight
                amount={5}
                radius={9}
                intensity={1.5}  // Increased intensity
                ambient={0.5}  // Lowered ambient value
                position={[5, 5, -10]}
            />
        </AccumulativeShadows>
    );
}

export default Backdrop;
