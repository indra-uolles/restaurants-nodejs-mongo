import React, { useState } from "react";

export default function ({
  handleSignin,
  handleSignup,
}: {
  handleSignin: React.FormEventHandler<HTMLFormElement>;
  handleSignup: React.FormEventHandler<HTMLFormElement>;
}) {
  let [authMode, setAuthMode] = useState("signin");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container" data-qa="sign-in">
        <form className="Auth-form" onSubmit={handleSignin}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span
                className="link-primary"
                onClick={changeAuthMode}
                data-qa="change-auth-mode"
              >
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                name="email"
                data-qa="email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                name="password"
                data-qa="password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-primary" data-qa="submit">
                Log in
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSignup}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span
              className="link-primary"
              onClick={changeAuthMode}
              data-qa="change-auth-mode"
            >
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              name="username"
              data-qa="username"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              name="email"
              data-qa="email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              name="password"
              data-qa="password"
            />
          </div>
          <div className="form-group mt-3">
            <label>Repeat password</label>
            <input
              type="repeat_password"
              className="form-control mt-1"
              placeholder="Repeat password"
              name="repeat_password"
              data-qa="repeat_password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" data-qa="submit">
              Sign up
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}
