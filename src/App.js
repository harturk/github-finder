import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import User from "./components/users/User";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import "./App.css";

const App = () => {
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

  // prop está chamando searchUsers: <Search searchUsers={this.searchUsers} />
  // O botão de limpar só será mostrado caso o array, que retorna pesquisa de usuários, for maior que 0
  /*Após usar a desconstrução via atribuição, não será mais 
    necessário utilizar this.state ao lado de todas chamadas
    de users e loading*/
  // const { users, user, loading } = this.state;
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className='App'>
            <Navbar title='Github Finder' icon='fab fa-github' />
            <div className='container'>
              <Alert alert={alert} />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/user/:login' component={User} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
