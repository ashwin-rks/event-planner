import React, { useEffect, useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Singup = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    userType: "",
  });
  const [errors, setErrors] = useState({});
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

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

    if (!credentials.userType.trim()) {
      newErrors = {
        ...newErrors,
        userType: "Role is required!",
      };
    }

    if (!credentials.first_name.trim()) {
      newErrors = {
        ...newErrors,
        first_name: "First Name is required!",
      };
    }

    if (!credentials.last_name.trim()) {
      newErrors = {
        ...newErrors,
        last_name: "Last Name is required!",
      };
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const first_name = credentials.first_name;
      const last_name = credentials.last_name;
      const userType = credentials.userType;
      const email = credentials.email;
      const password = credentials.password;

      try {
        const response = await axios.post("http://localhost:8000/auth/signup", {
          first_name,
          last_name,
          userType,
          email,
          password,
        });
        console.log(response);
        if (response.status === 201) {
          console.log("Signup successful", response.data);
          navigate("/login");
        } else {
          console.error("Signup failed:", response.data.message);
        }
      } catch (error) {
        console.error("Error during Signup:", error);
        newErrors = {
          ...newErrors,
          password: "Email or Password is invalid!",
        };
        setErrors(newErrors);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <div className="container-fluid vh-100 setColor">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col col-sm-8 col-md-6 col-lg-4">
          <div className="border rounded p-4 borderColor">
            <div className="text-center mb-4">
              <p className="h1 font-weight-bold">Sign Up</p>
            </div>
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="first_name"
                name="first_name"
                onChange={handleChange}
              />
            </div>
            {errors.first_name && (
              <div className="mb-1">
                <p className="small text-danger">{errors.first_name}</p>
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="last_name" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="last_name"
                name="last_name"
                onChange={handleChange}
              />
            </div>
            {errors.last_name && (
              <div className="mb-1">
                <p className="small text-danger">{errors.last_name}</p>
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="userType" className="form-label">
                User Type
              </label>
              <select
                className="form-control form-control-lg"
                id="userType"
                name="userType"
                onChange={handleChange}
                value={credentials.userType}
              >
                <option value="" disabled>
                  Select User Type
                </option>
                <option value="Event Manager">Event Manager</option>
                <option value="User">User</option>
              </select>
            </div>
            {errors.userType && (
              <div className="mb-1">
                <p className="small text-danger">{errors.userType}</p>
              </div>
            )}
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
              Sign Up
            </button>
            <div className="d-flex justify-content-center">
              <p className="m-0 p-0">Already an User?</p>
              <button className="notBtn" onClick={() => navigate("/login")}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singup;
