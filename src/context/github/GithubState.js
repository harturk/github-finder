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
        setLoading(true);
        const res = await axios.get(
            // Texto digitado no campo search, recebido como props,
            // é passado para a query do github
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
            client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        /* A resposta está em res.data.items - Como setUsers retorna um objeto
        é necessário especificar o .items */ 
        dispatch({
            type: SEARCH_USERS,
            // payload são os dados que se quer enviar - resposta
            payload: res.data.items,
        });

        };

  // Get User

  // Get Repos

  // Clear Users

  // Set Loading
  const setLoading = () => {
      dispatch({ type: SET_LOADING });
  }

  return (
    <GithubContext.Provider
      // Tornar isso disponível para todo App
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
