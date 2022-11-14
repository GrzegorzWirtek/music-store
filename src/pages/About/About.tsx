import './About.scss';
import { aboutTextContent } from './AboutTextContent';

const About = () => {
	return (
		<section className='about'>
			<h2 className='about__title'>About application</h2>
			<p className='about__text-content'>{aboutTextContent}</p>
		</section>
	);
};

export default About;
