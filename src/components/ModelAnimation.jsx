import '../modelAnimation.css';
import { Canvas } from '@react-three/fiber';
import { Setting } from './Setting';
import { Interface } from './Interface';

function ModelAnimation() {
  return (
    <>
		{/* threejs scene 이용 위해 canvas 선언, canvas position style을 위해 canvas classname을 붙이고 position fixed로 스타일을 줌. (고정된 상태로 글자영역만 움직이게 하기 위해) */}
      <Canvas className='canvas' shadows camera={{ position: [0, 3, 10], fov: 42 }}>
        <color attach="background" args={['#0F1222']} />
					{/* threejs 환경을 구성하는 컴포넌트 */}
          <Setting />
      </Canvas>
      <Interface />
    </>
  );
}

export default ModelAnimation;
