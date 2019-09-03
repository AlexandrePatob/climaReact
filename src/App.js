import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
  height: 450px;
  border-radius: 9px;
  background: #fff;
`

const OutContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ResultContainer = styled.div`
  padding: 10px;
  border-radius: 9px;
  border: 1px solid #01579b;
`;

const Title = styled.h1`
  color: #01579b;
`

const Result = styled.h3`
  color: #01579b;
`

const Input = styled.input`
  width: 200px;
  height: 30px;
  border: none;
  border-bottom: 1px solid #01579b;
  margin: 5px;
  outline: none !important;
`;

const Button = styled.button`
  width: 200px;
  background: #01579b;
  height: 30px;
  border: none;
  color: #fff;
  border-radius: 19px;
  display: flex;
  justify-content: center;
  margin: 5px;
`;

class App extends Component {
	state = {
    cidade: '',
    city:'',
		clima: '',
		temperatura: '',
		temperatura_max: '',
    temperatura_min: '',
    showForm: true,
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
      temperatura_max: response.data.main.temp_max,
      showForm: false,
		});
  };

	render() {
		return (
			<OutContainer className='App'>
				<Container>
          <Title>ClimaPato</Title>
          <InnerContainer>
          {this.state.showForm ? (
            <div>
              <Input
              placeholder="Digite a cidade"
                type='text'
                value={this.state.cidade}
                onChange={e => this.setState({ cidade: e.target.value })}
              />
              <Button
                onClick={async () => await this.chamarApiDoPato(this.state.cidade)}
              >
                Ver clima
              </Button>
              <Button
                onClick={() => {
                  this.setState({
                    city:'',
                    cidade: '',
                    clima: '',
                    temperatura: '',
                    temperatura_min: '',
                    temperatura_max: '',
                  });
                }}
              >
                Limpar
              </Button>
            </div>
          ): (
            <div>

            <ResultContainer>
            <Result>Cidade: {this.state.city}</Result>
            <Result>Clima:  {this.state.clima}</Result>
            <Result>Temperatura:{this.state.temperatura}</Result>
            <Result>Temp Minima:{this.state.temperatura_min}</Result>
            <Result>Temp Maxima:{this.state.temperatura_max}</Result>
          </ResultContainer>
            <Button
                onClick={() => this.setState({
                  showForm: true, 
                  city:'',
                  cidade: '',
                  clima: '',
                  temperatura: '',
                  temperatura_min: '',
                  temperatura_max: '',
                })}
              >
                voltar
              </Button>
            </div>
          )}
					
          </InnerContainer>
				</Container>
				
			</OutContainer>
		);
	}
}

export default App;
