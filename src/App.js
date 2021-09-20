import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };
  /*Uma vez que o botão de search está funcionando,
  não será mais mostrado os usuários iniciais na tela, logo
  a função componentDidMount() pode ser comentada 
  */
  async componentDidMount() {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ users: res.data, loading: false });
  }

  /* Não-Refatorado
  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("https://api.github.com/users")
      .then((res) => console.log(res.data));
    this.setState({ users: res.data, loading: false });
  }
  */
  // Search Github users
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      // Texto digitado no campo search, recebido como props,
      // é passado para a query do github
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    // A resposta está em res.data.items
    this.setState({ users: res.data.items, loading: false });
  };

  // Clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  // Mensagem alerta
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });
    setTimeout(() => this.setState( { alert: null } ), 5000);
  };

  // prop está chamando searchUsers: <Search searchUsers={this.searchUsers} />
  // O botão de limpar só será mostrado caso o array, que retorna pesquisa de usuários, for maior que 0
  render() {
    /*Após usar a desconstrução via atribuição, não será mais 
    necessário utilizar this.state ao lado de todas chamadas
    de users e loading
    */
    const { users, loading } = this.state;
    return (
      <div className='App'>
        <Navbar title='Github Finder' icon='fab fa-github' />
        <Alert alert={this.state.alert}/>
        <div className='container'>
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={this.state.users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
