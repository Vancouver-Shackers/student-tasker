export const Login = (props: {
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	return (
		<div>
			<button> Connect Student Account </button>
			<button onClick={() => props.setLoggedIn(true)}>
				{' '}
				Continue as Guest{' '}
			</button>
		</div>
	)
}

export default Login
