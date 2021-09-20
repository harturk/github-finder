import React, { Component } from "react";
import PropTypes from "prop-types";

export class Search extends Component {
  state = {
    text: "",
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  };

  /* Para poder digitar é necessário um evento 'onChange',
  pois este é um  componente controlado
  */
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /*
  Caso não for usado arrow function, deve-se explicitamente vincular 'this'
  a função: <form onSubmit={this.onSubmit.bind(this)} className='form'>
  */
  onSubmit(e) {
    e.preventDefault();
    if (this.state.text === "") {
      this.props.setAlert("Please enter something", "light");
    } else {
      // Passa text como props
      this.props.searchUsers(this.state.text);
      // Limpar o formulário
      this.setState({ text: "" });
    }
  }

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
  render() {
    const { showClear, clearUsers } = this.props;

    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)} className='form'>
          <input
            type='text'
            name='text'
            placeholder='Search Users...'
            value={this.state.text}
            onChange={this.onChange}
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
}

export default Search;
