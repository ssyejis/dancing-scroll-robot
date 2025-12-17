import {motion} from 'framer-motion';

const Section = (props) => {
	const {children} = props;
	
	return (
		// framer-motion을 이용해서 section이 view단 화면에 들어왔을 때 아래 이벤트를 실행.
		<motion.section
			className="section"
			initial= {{
				opacity: 0,
				y: 50,
			}}
			whileInView={{
				opacity: 1,
				y: 0,
				transition: {
					duration: 1,
					delay: 0.5,
				}
			}}
		>
			{children}
		</motion.section>
	)
}

export const Interface = () => {
	const options = [];
	for(let i = 0; i < 4; i++) {
		options.push(
			<Section key={i}>
				<h1>action</h1>
			</Section>
		)
	}
	return (
		<div className='interface'>
			{options}
		</div>
	);
}