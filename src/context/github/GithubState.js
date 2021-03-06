import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from "../types";

let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !== 'production'){
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else{
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

// Criação estado inicial
const GithubState = (props) => {
  const initialState = {
    // Ações
    users: [],
    user: {},
    repos: [],
    loading: false,
  };
  /*dispatch para o reducer
    Reliaza uma ação, faz uma requisição para o Github, recebe uma reposta e 
    então é enviado um tipo para o reducer*/
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Github users
  const searchUsers = async (text) => {
    setLoading();
    const res = await axios.get(
      // Texto digitado no campo search, recebido como props,
      // é passado para a query do github
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&
            client_secret=${githubClientSecret}`
    );

    /* A resposta está em res.data.items - Como setUsers retorna um objeto
        é necessário especificar o .items */
    dispatch({
      type: SEARCH_USERS,
      // payload são os dados que se quer enviar - resposta
      payload: res.data.items,
    });
  };

  // Get single Github user
  const getUser = async (username) => {
    setLoading();

    const res = await axios.get(
      /* O ponto de interrogação usado após ${username} serve para indicar que
      o client_id é o primeiro parâmetro*/
      `https://api.github.com/users/${username}?client_id=${githubClientId}&
      client_secret=${githubClientSecret}`
    );
    dispatch({
      type: GET_USER,
      // payload são os dados que se quer enviar - resposta
      payload: res.data,
    });
  };

  // Get users repos
  const getUserRepos = async (username) => {
    setLoading();

    const res = await axios.get(
      /* O ponto de interrogação usado após ${username} serve para indicar que
      o client_id é o primeiro parâmetro*/
      `https://api.github.com/users/${username}/repos?&per_page=5&sort=created:asc&client_id=${githubClientId}&
      client_secret=${githubClientSecret}`
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

  // Clear users from state
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  return (
    <GithubContext.Provider
      // Tornar isso disponível para todo App
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
