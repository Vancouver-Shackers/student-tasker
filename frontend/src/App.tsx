import './App.css'
import Main from './Components/Main'
// import Header from "./Components/Header";

const App = () => {
	return (
		<div className='app'>
			{/* Where the header will go
      <Header /> */}

			<div className='background'></div>

			{/* All task-related content */}
			<Main />
		</div>
	)
}

export default App
