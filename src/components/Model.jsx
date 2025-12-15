import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { AnimationMixer } from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function Model(props) {
  const { scrollY } = props;

  const group = useRef();
  const [mixer] = useState(() => new AnimationMixer());
  const { nodes, materials, animations, gltf } = useGLTF('models/robot-draco.glb');
  const { actions, clips  } = useAnimations(animations, group);

  // useEffect 두개 중 첫번째꺼는 스크롤 이벤트 없이 바로 애니메이션이 동작하는 것, 두번째는 스크롤양에따라 에니메이션을 1frame 단위로 나눠 움직이게끔함.
  // 원하는걸 사용 

	// useEffect(() => {
  //   // actions을 콘솔로 찍으면 이 모델에 해당하는 액션들이 나옴, 그 중 원하는 액션 정해서 아래 형식으로 배열 인덱스값 변경
  //   actions[animations[3].name].reset().play();
  //   // 액션을 몇번 반복할건지 설정하는 코드, 멈춤없이 계속 액션을 주고싶으면 아래 코드 주석처리
  //   actions[animations[3].name].repetitions = 1;
  //   actions[animations[3].name].clampWhenFinished = true;

	// 	return () => {
	// 		actions[animations[3].name].reset().stop();
	// 	}
	// });

  useEffect(() => {
    // clips[0] 액션을 사용하며 해당 액션을 group.current에 바인딩
    const action = mixer.clipAction(clips[0], group.current);
    // action을 실행하여 애니메이션 시작
    action.play();
    action.clampWhenFinished = true;

    // mixer가 모든 액션을 중지하도록 함.
    return () => mixer.stopAllAction();
  }, [clips, mixer]);

  // 매 프레임마다 실행되는 함수
  useFrame((_, delta) => {
    if (!clips[0]) return
    
   const maxScroll = document.documentElement.scrollHeight - window.innerHeight

    const scroll = scrollY.current

    const progress = Math.min(Math.max(scroll / maxScroll, 0), 1)

    mixer.setTime(progress * clips[0].duration)
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group name="RobotArmature" rotation={[-Math.PI / 2, 0, 0]} scale={60}>
            <primitive object={nodes.Bone} />
          </group>
          <group name="HandR" position={[-0.003, 2.37, -0.021]} rotation={[-Math.PI / 2, 0, 0]} scale={60}>
            <skinnedMesh name="HandR_1" geometry={nodes.HandR_1.geometry} material={materials.Main} skeleton={nodes.HandR_1.skeleton} />
            <skinnedMesh name="HandR_2" geometry={nodes.HandR_2.geometry} material={materials.Grey} skeleton={nodes.HandR_2.skeleton} />
          </group>
          <group name="HandL" position={[-0.003, 2.37, -0.021]} rotation={[-Math.PI / 2, 0, 0]} scale={60}>
            <skinnedMesh name="HandL_1" geometry={nodes.HandL_1.geometry} material={materials.Main} skeleton={nodes.HandL_1.skeleton} />
            <skinnedMesh name="HandL_2" geometry={nodes.HandL_2.geometry} material={materials.Grey} skeleton={nodes.HandL_2.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('models/robot-draco.glb');
