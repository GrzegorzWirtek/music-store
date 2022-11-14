import './Icons.scss';

const Icons = () => {
	return (
		<div className='icons'>
			<a
				href='https://www.facebook.com/grzegorz.wirtek/'
				target='_blank'
				rel='noreferrer noopener'>
				<img
					src='fb.svg'
					alt='Facebook icon'
					className='icons__icon'
					title='Facebook'
				/>
			</a>

			<a
				href='https://www.instagram.com/grzegorz.wirtek/'
				target='_blank'
				rel='noreferrer noopener'>
				<img
					src='in.svg'
					alt='Instagram icon'
					className='icons__icon'
					title='Instagram'
				/>
			</a>

			<a
				href='https://github.com/GrzegorzWirtek?tab=repositories'
				target='_blank'
				rel='noreferrer noopener'>
				<img
					src='gh.svg'
					alt='Github icon'
					className='icons__icon'
					title='Github'
				/>
			</a>
		</div>
	);
};

export default Icons;
