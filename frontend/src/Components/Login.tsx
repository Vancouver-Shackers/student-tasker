import axios from 'axios'

export const Login = (props: {
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const fetchData = async () => {
		const results = await axios.get('http://localhost:5000/getAssignments')

		props.setLoggedIn(true)
		return results
	}

	return (
		<div className='loginParent'>
			<div className='loginChild mainBG'>
				<h2 className='headerMid centerText'>Choose a login option</h2>
				<button className='button ascend secondaryBG'>
					{' '}
					Connect student account{' '}
				</button>
				<button
					className='button ascend secondaryBG'
					onClick={() => props.setLoggedIn(true)}
				>
					{' '}
					Continue as guest{' '}
				</button>
			</div>
		</div>
	)
}

export default Login
