import React, { Fragment, Component } from "react";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Repos from '../repos/Repos';

export class User extends Component {
  componentDidMount() {
    /* Forma de puxar informação da url. Como a função getUser recebe username,
        que é a mesma coisa que :login, fará a requisição da mesma forma, trará
        as informações do usuário. O estado de usuário será preenchido com a resposta.
        Este estado está sendo passado dentro da tag <User
        */
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  }

    static propTypes = {
      loading: PropTypes.bool,
      user: PropTypes.object.isRequired,
      getUser: PropTypes.func.isRequired,
      getUserRepos: PropTypes.func.isRequired,
      repos: PropTypes.array.isRequired,
    };

  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
      company,
    } = this.props.user;

    const { loading } = this.props;

    if (loading) return <Spinner />;

    return (
      <Fragment>
        <Link to='/' className='btn btn-light'>
          Back To Search
        </Link>
        Hireable:{" "}
        {hireable ? (
          <i className='fas fa-check text-sucess' />
        ) : (
          <i className='fas fa-times-circle text-danger' />
        )}
        <div className='card grid-2'>
          <div className='all-center'>
            <img
              src={avatar_url}
              className='round-img'
              alt=''
              style={{ width: "150px" }}
            />
            <h1>{name}</h1>
            <p>Location: {location}</p>
          </div>
          <div>
              {/*Checa se o usuário tem uma bio*/}
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className='btn btn-dark my-1'>
              Visit Github Profile
            </a>
            <ul>
              <li>
                  {/*Checa se o usuário tem login, empresa e blog*/}
                {login && (
                  <Fragment>
                    <strong>Username: </strong> {login}
                  </Fragment>
                )}
              </li>

              <li>
                {company && (
                  <Fragment>
                    <strong>Company: </strong> {company}
                  </Fragment>
                )}
              </li>

              <li>
                {blog && (
                  <Fragment>
                    <strong>Website: </strong> {blog}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
            <div className="badge badge-dark">Followers {followers}</div>
            <div className="badge badge-sucess">Following {following}</div>
            <div className="badge badge-danger">Public Repos {public_repos}</div>
            <div className="badge badge-primary">Public Gists {public_gists}</div>
        </div>

        <Repos repos={this.props.repos} />
      </Fragment>
    );
  }
}

export default User;