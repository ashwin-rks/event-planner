import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  const { setIsAuthenticated, setIsManager, isAuthenticated } = useContext(AuthContext);

  // Updates form input into credentials state
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // Handles the login form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    // Checks for errors in Email field
    if (!credentials.email.trim()) {
      newErrors = {
        ...newErrors,
        email: "Email is required!",
      };
    } else if (!emailRegex.test(credentials.email.trim())) {
      newErrors = {
        ...newErrors,
        email: "Enter a valid email!",
      };
    }

    // Checks for errors in Password field
    if (!credentials.password.trim()) {
      newErrors = {
        ...newErrors,
        password: "Password is required!",
      };
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const email = credentials.email;
      const password = credentials.password;
      try {
        const response = await axios.post("http://localhost:8000/auth/login", {
          email,
          password,
        });
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          setIsAuthenticated(true);
          setIsManager(response.data.user.userType === 'Event Manager');
          navigate('/home');
        } else {
          console.error("Login failed:", response.data.error);
        }
      } catch (error) {
        console.error("Error during login:", error);
        newErrors = {
          ...newErrors,
          password: "Email or Password is invalid!",
        };
        setErrors(newErrors);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container-fluid vh-100 setColor">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col col-sm-8 col-md-6 col-lg-4">
          <div className="border rounded p-4 borderColor">
            <div className="text-center mb-4">
              <p className="h1 font-weight-bold">Login</p>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control form-control-lg"
                id="email"
                name="email"
                onChange={handleChange}
              />
            </div>
            {errors.email && (
              <div className="mb-1">
                <p className="small text-danger">{errors.email}</p>
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control form-control-lg"
                id="password"
                name="password"
                onChange={handleChange}
              />
            </div>
            {errors.password && (
              <div className="mb-1">
                <p className="small text-danger">{errors.password}</p>
              </div>
            )}
            <button
              type="submit"
              className="btn btnColor w-100 mb-3"
              onClick={handleSubmit}
            >
              Login
            </button>
            <div className="d-flex justify-content-center">
              <p className="m-0 p-0">Not an user?</p>
              <button className="notBtn" onClick={() => navigate("/signup")}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
