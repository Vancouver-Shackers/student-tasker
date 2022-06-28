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
		<div>
			<button onClick={() => fetchData()}>Connect Student Account</button>
			<button onClick={() => props.setLoggedIn(true)}>Continue as Guest</button>
		</div>
	)
}

export default Login
