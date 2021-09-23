import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import axios from "axios";
import GithubState from "./context/github/GithubState";
import "./App.css";

const App = () => {
  // default array ([])
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // state = {
  //   users: [],
  //   user: {},
  //   repos: [],
  //   loading: false,
  //   alert: null,
  // };

  /*Uma vez que o botão de search está funcionando,
  não será mais mostrado os usuários iniciais na tela, logo
  a função componentDidMount() pode ser comentada 
  */
  // async componentDidMount() {
  //   this.setState({ loading: true });

  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
  //     client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );

  //   this.setState({ users: res.data, loading: false });
  // }

  /* Não-Refatorado
  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("https://api.github.com/users")
      .then((res) => console.log(res.data));
    this.setState({ users: res.data, loading: false });
  }
  */

  // Get users repos
  const getUserRepos = async (username) => {
    setLoading(true);

    const res = await axios.get(
      /* O ponto de interrogação usado após ${username} serve para indicar que
      o client_id é o primeiro parâmetro*/
      `https://api.github.com/users/${username}/repos?&per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setRepos(res.data);
    setLoading(false);
  };

  // Mensagem alerta
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  };

  // prop está chamando searchUsers: <Search searchUsers={this.searchUsers} />
  // O botão de limpar só será mostrado caso o array, que retorna pesquisa de usuários, for maior que 0
  /*Após usar a desconstrução via atribuição, não será mais 
    necessário utilizar this.state ao lado de todas chamadas
    de users e loading*/
  // const { users, user, loading } = this.state;
  return (
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar title='Github Finder' icon='fab fa-github' />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search setAlert={showAlert} />
                    <Users />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={(props) => (
                  <User
                    {...props}
                    loading={setLoading}
                    getUserRepos={getUserRepos}
                    repos={repos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
