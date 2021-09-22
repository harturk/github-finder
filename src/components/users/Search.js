import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ searchUsers, showClear, clearUsers, setAlert }) => {
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
      setAlert("Please enter something", "light");
    } else {
      // Passa text como props
      searchUsers(text);
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
        {showClear && (
          <button className='btn btn-light btn-block' onClick={clearUsers}>
            Clear
          </button>
        )}
      </div>
    );
}

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
