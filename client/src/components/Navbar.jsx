import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, withRouter } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();
   const dispatch = useDispatch()

  const state = useSelector((state) => state.auth);
  //console.log(state);

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {state.isAuthenticated  ? (
              <ul className="navbar-nav m-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={state && state.user.role==="User" ? "/user/dashboard" : "/admin/dashboard"}>
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/create-post">
                    Create-Post
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </ul>
            )}

            {state.isAuthenticated && (
              <form class="d-flex">
                <Link
                  onClick={() => {
                    dispatch({ type: "CLEAR_USER" });
                    localStorage.clear("jwt");
                    localStorage.clear("user");
                    return history.push('/login')
                  }}
                  className="nav-link btn btn-danger text-light "
                  to="/login"
                >
                  Logout
                </Link>
              </form>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Navbar);
