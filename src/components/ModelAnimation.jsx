import '../modelAnimation.css';
import { Canvas } from '@react-three/fiber';
import { Setting } from './Setting';
import { Interface } from './Interface';

function ModelAnimation() {
  return (
    <>
      <Canvas className='canvas' shadows camera={{ position: [0, 3, 10], fov: 42 }}>
        <color attach="background" args={['#0F1222']} />
          <Setting />
      </Canvas>
      <Interface />
    </>
  );
}

export default ModelAnimation;
