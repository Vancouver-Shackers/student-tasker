import './App.css'
import Main from './Components/Main'
import Login from './Components/Login'
import { useState } from 'react'
// import Header from "./Components/Header";

const App = () => {
	const [loggedIn, setLoggedIn] = useState(false)

	return (
		<div className='app'>
			{/* Where the header will go
      <Header /> */}
			<div className='background' />
			{loggedIn ? <Main /> : <Login setLoggedIn={setLoggedIn} />}
		</div>
	)
}

export default App
