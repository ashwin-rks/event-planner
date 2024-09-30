import React from "react";
import errorImg from "../imgs/error_page.png";

const ErrorBoundary = () => {
  return (
    <>
      <div className="container-fluid p-0 vh-100 m-0">
        <div className="row d-flex justify-content-center align-items-center vh-100 m-0 p-0">
          <div className="col-12 p-0 m-0">
            <img
              src={errorImg}
              alt="404 Page not found"
              className="img-fullscreen m-0 p-0"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorBoundary;
