import React, { Fragment, useEffect, useContext } from "react";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import Repos from '../repos/Repos';
import GithubContext from "../../context/github/githubContext";

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);
  const { getUser, loading, user, repos, getUserRepos } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);
  /* }, [repos]); -> Essa função irá rodar quando um parâmetro específico, setado
  dentro dos [] for alterado. Como se quer que isso rode apenas uma vez, 
  será utilizado um par de [] vazios, com a finalidade de imitar o comportamento
  componentDidMount */

    /* Forma de puxar informação da url. Como a função getUser recebe username,
        que é a mesma coisa que :login, fará a requisição da mesma forma, trará
        as informações do usuário. O estado de usuário será preenchido com a resposta.
        Este estado está sendo passado dentro da tag <User
        */

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
    } = user;

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

        <Repos repos={repos} />
      </Fragment>
    );
}

export default User;
