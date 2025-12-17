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
		gsap.to(group.current.position, {
			y: -3,
			scrollTrigger: {
				trigger: '.interface',
				start: 'top top',
				end: '70% top',
				scrub: true,
			}
		})

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