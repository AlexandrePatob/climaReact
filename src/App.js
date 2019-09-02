import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
	state = {
    cidade: '',
    city:'',
		clima: '',
		temperatura: '',
		temperatura_max: '',
		temperatura_min: ''
	};

	chamarApiDoPato = async cidade => {
		const response = await axios.get(
			`https://testeapiclima.herokuapp.com/${cidade}`
		);
		this.setState({
      city: response.data.name,
			clima: response.data.weather[0].description,
			temperatura: response.data.main.temp,
			temperatura_min: response.data.main.temp_min,
			temperatura_max: response.data.main.temp_max
		});
	};

	render() {
		return (
			<div className='App'>
				<div>
					<input
						type='text'
						value={this.state.cidade}
						onChange={e => this.setState({ cidade: e.target.value })}
					/>
					<button
						onClick={async () => await this.chamarApiDoPato(this.state.cidade)}
					>
						Ver clima
					</button>
					<button
						onClick={() => {
							this.setState({
								cidade: '',
								clima: '',
								temperatura: '',
								temperatura_min: '',
								temperatura_max: ''
							});
						}}
					>
						Limpar
					</button>
				</div>
				<div>
					<h1>Cidade:{this.state.city}</h1>
					<h1>Clima:{this.state.clima}</h1>
					<h1>Temperatura:{this.state.temperatura}</h1>
					<h1>Temp Minima:{this.state.temperatura_min}</h1>
					<h1>Temp Maxima:{this.state.temperatura_max}</h1>
				</div>
			</div>
		);
	}
}

export default App;
