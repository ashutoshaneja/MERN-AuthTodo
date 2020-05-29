import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../Services/AuthService';
import {AuthContext} from '../Context/AuthContext';

const Navbar = props => {
    const {isAuthenticated, user, setIsAuthenticated, setUser} = useContext(AuthContext);

    const unauthenticatedNavBar = () => {
        return(
            <>
                <Link to="/">
                    <li className = "nav-item nav-link">Home 🏠</li>
                </Link>
                <Link to="/login">
                    <li className = "nav-item nav-link">Login 📩</li>
                </Link>
                <Link to="/register">
                    <li className = "nav-item nav-link">Register 💁🏻‍♂️</li>
                </Link>
            </>
        )
    }

    const authenticatedNavBar = () => {
        return(
            <>
                <Link to="/">
                    <li className = "nav-item nav-link">Home 🏠</li>
                </Link>
                <Link to="/todos">
                    <li className = "nav-item nav-link">Todos 📝</li>
                </Link>
                {
                    user.role === "admin" ? 
                    <Link to="/admin">
                        <li className="nav-item nav-link">
                            Admin
                        </li>
                    </Link> : null
                }  
                <button type="button" className="btn btn-link nav-item nav-link" onClick={onClickLogoutHandler}>
                    Logout 📩
                </button>
            </>
        )
    }

    const onClickLogoutHandler = () => {
        AuthService.logout().then(data => {
            if(data.success){
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    }

    return(
        <nav className="navbar .navbar-toggler navbar-expand-sm navbar-dark bg-dark">
            <Link to="/">
                <div className="navbar-brand">
                    MERN-Todoist
                </div>
            </Link>
  
  <div className="collapse navbar-collapse" id="navbarText">
    <ul className="navbar-nav mr-auto">
      {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
    </ul>
    <span className="navbar-text">
      
    </span>
  </div>
</nav>
    )
}

export default Navbar;