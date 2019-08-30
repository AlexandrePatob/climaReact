import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = { cidade: "", clima: "" ,temperatura:""};

  chamarApiDoPato = async cidade => {
    const response = await axios.get(
      `https://testeapiclima.herokuapp.com/${cidade}`
    );
    this.setState({ clima: response.data.weather[0].description, temperatura: response.data.main.temp});
  };

  render() {
    return (
      <div className="App">
        <div>
          <input
            type="text"
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
              this.setState({ cidade: "", clima: "" });
            }}
          >
            Limpar
          </button>
        </div>
        <div>
          <h1>{this.state.clima}</h1>
          <h1>{this.state.temperatura}</h1>
        </div>
      </div>
    );
  }
}

export default App;
