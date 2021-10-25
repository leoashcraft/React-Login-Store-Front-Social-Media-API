import { Link } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from "../../UserContext";

function MainNavigation() {
    const { token, setToken } = useContext(UserContext);
    const { clicked, setClick } = useContext(UserContext);
    const { user, tokenStr } = useContext(UserContext);
    const { auth } = useContext(UserContext)

    const logout = () => {
        sessionStorage.clear()
        setToken(false);
    }

    return (
        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                SocialMedia
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/" className="nav-link active" aria-current="page">
                      All posts
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link to="/createproduct" className="nav-link active" aria-current="page">
                      Create product
                    </Link>
                  </li> */}
                  <li className="nav-item">
                    {auth || token ? <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
                      
                    : <Link to="/login" className="nav-link active" aria-current="page">
                      Login
                    </Link>}
                  </li>
                </ul>
                <li className="d-flex m-auto btn-outline-success btn">
                    {user}
                </li>
              </div>
            </div>
          </nav>
        </header>
      );
}

export default MainNavigation
