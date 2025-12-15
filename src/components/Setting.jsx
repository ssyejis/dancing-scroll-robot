import React, { useEffect, useRef } from 'react'
import { ContactShadows, CameraShake } from '@react-three/drei';
import { useScroll } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Model } from "./Model";

gsap.registerPlugin(ScrollTrigger);

export const Setting = (props) => {
	// scroll양에 따라 레이의 움직임을 제어하기 위해 (gsap 사용) useScroll을 이용해 scoll의 y값을 받은 후 Model에 props로 보냄.
	const { scrollY } = useScroll();
	const group = useRef();
	const model = useRef();

	
  	useEffect(() => {
		// model와 model그림자의 포지션 이동을 위해서 model+그림자를 그룹으로 묶어 그룹 전체를 포지션 이동
		gsap.to(group.current.position, {
			y: -3,
			scrollTrigger: {
				// interface 영역이 전체 길이를 차지하기때문에 interface 길이에 맞춰 스크롤 애니메이션 진행함.
				trigger: '.interface',
				start: 'top top',
				end: '70% top',
				scrub: true,
			}
		})

		// 스크롤양에따라 rotation을 주는 함수 
		gsap.to(model.current.rotation, {
			y: -Math.PI*2,
			scrollTrigger: {
				trigger: '.interface',
				start: 'top top',
				end: '70% top',
				scrub: true,
			}
		});
	})

	return (
		<>
			{/* 카메라가 연속적으로 살짝 움직이게 하는 기능 maxYaw, maxPitch, maxRoll 값에 따라 카메라의 움직임 범위가 달라짐 */}
			<CameraShake
				maxYaw={0.01}
				maxPitch={0.01}
				maxRoll={0.01}
				yawFrequency={0.01}
				pitchFrequency={0.1}
				rollFrequency={0.1}
				intensity={1}
				decayRate={0.65}
			/>
			{/* intensity 높게줄 수록 밝아짐 */}
			<ambientLight intensity={2} />
			<group ref={group}>
				<group ref={model}>
					<Model scrollY={scrollY} />
				</group>
      	<ContactShadows positionY={-1} opacity={0.42} scale={10} blur={1} far={10} resolution={256} color="#000000" />
			</group>
		</>
	)
}