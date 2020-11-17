import React, { Component} from 'react';
import Cardlist from './Cardlist';
import Searchbox from './Searchbox';
import Scroll from './Scroll';
import './App.css';
import ErrorBoundry from './ErrorBoundry';


class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			searchfield: ''
			
		}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users').then(response=>{
			return response.json();
		})
		.then(users => {
			this.setState({ robots: users})
		})
		console.log(fetch('https://jsonplaceholder.typicode.com/users'))

	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value})
	}

	render() {
		const filteredRobots = this.state.robots.filter(robot =>{
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		})
		if(this.state.robots.length === 0){
			return <h1 className ='tc'>Loading...</h1>
		} else {
		return (
		<div className ='tc'>
			<h1>RoboFriends</h1>
			<Searchbox searchChange = {this.onSearchChange} />
			<Scroll>
				<ErrorBoundry>
					<Cardlist robots = {filteredRobots}/>
				</ErrorBoundry>
			</Scroll>
		</div>
		);

		}
		
	}
}

export default App;