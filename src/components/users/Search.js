import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  /*Por padrão utiliza-se um nome para este estado, text, e um método
  para setar o estado, setText*/
  const [text, setText] = useState('');

  /* Para poder digitar é necessário um evento 'onChange',
  pois este é um  componente controlado. Em onChange está sendo
  alterado o estado (texto) para outro que está sendo digitado
  */
  const onChange = (e) => {
    setText(e.target.value);
  };

  /*
  Caso não for usado arrow function, deve-se explicitamente vincular 'this'
  a função: <form onSubmit={this.onSubmit.bind(this)} className='form'>
  */
  const onSubmit = e => {
    e.preventDefault();
    if (text === "") {
      alertContext.setAlert("Please enter something", "light");
    } else {
      // Passa text como props
      githubContext.searchUsers(text);
      // Limpar o formulário
      setText('');
    }
  };

  /*
  O botão será apenas mostrado se a prop de showClear for true 
        {this.props.showClear && (
            <button
                className='btn btn-light btn-block'
                onClick={this.props.clearUsers}          
            >
                Clear
          </button>
          )
  */
    return (
      <div>
        <form onSubmit={onSubmit} className='form'>
          <input
            type='text'
            name='text'
            placeholder='Search Users...'
            value={text}
            onChange={onChange}
          />
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />
        </form>
        {githubContext.users.length > 0 && (
          <button className='btn btn-light btn-block' onClick={githubContext.clearUsers}>
            Clear
          </button>
        )}
      </div>
    );
}

export default Search;
