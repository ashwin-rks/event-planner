import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../imgs/logo.svg";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isManager, setIsAuthenticated, setIsManager } = useContext(AuthContext);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsManager(false);
    localStorage.clear("token");
    navigate("/login");
  };

  return (
    <div className="container-fluid">
      <div className="row setColor">
        <div className="col">
          <nav className="navbar d-flex justify-content-between align-items-center setColor p-3 m-0 navbar">
            <div className="d-flex justify-content-center align-items-center gap-2">
              <img src={logo} alt="Booker" />
              <h1 className="m-0 fw-bold setColor">Booker</h1>
            </div>
            <div className="d-flex justify-content-between fs-5 fs-lg-4 fs-xl-3">
              <Link
                to="/home"
                className="text-decoration-none d-none d-md-block p-0 mx-3 m-0 setColor"
              >
                Dashboard
              </Link>
              <Link
                to="/bookings"
                className="text-decoration-none d-none d-md-block p-0 mx-3 m-0 setColor"
              >
                Bookings
              </Link>
              {isManager && (
                <Link
                  to="/my-events"
                  className="text-decoration-none d-none d-md-block p-0 mx-3 m-0 setColor"
                >
                  My Events
                </Link>
              )}
              {isManager && (
                <Link
                  to="/create-events"
                  className="text-decoration-none d-none d-md-block p-0 mx-3 m-0 setColor"
                >
                  Create Events
                </Link>
              )}
              <Link
                onClick={handleLogout}
                className="text-decoration-none d-none d-md-block p-0 mx-3 m-0 setColor"
              >
                Logout
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
