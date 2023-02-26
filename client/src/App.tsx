import React, { useEffect, useState } from "react";
import Auth from "./Auth";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ApiClient from "./ApiClient";

export default function App() {
  return (
    <AuthProvider>
      <h1 className="text-center">Auth Example</h1>

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/protected"
            element={
              <RequireAuth>
                <ProtectedPage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function Layout() {
  return (
    <div>
      <AuthStatus />
      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected" data-qa="protected-link">
            Protected Page
          </Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}

interface AuthContextType {
  user: string;
  signin: (email: string, password: string, callback: VoidFunction) => void;
  signup: (
    username: string,
    email: string,
    password: string,
    callback: VoidFunction
  ) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);
const apiClient = new ApiClient();

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);

  const signin = (email: string, password: string, callback: VoidFunction) => {
    return apiClient
      .post("/auth/login", {
        email,
        password,
      })
      .then((response) => {
        const { token, userId } = response;
        // TODO: BE should send user name etc.
        setUser(userId);
        localStorage.setItem("token", token);
        callback();
      });
  };

  const signup = (
    username: string,
    email: string,
    password: string,
    callback: VoidFunction
  ) => {
    return apiClient
      .post("/profile", {
        username,
        email,
        password,
        repeatedPassword: password,
      })
      .then((response) => {
        const { token, username } = response;
        setUser(username);
        localStorage.setItem("token", token);
        callback();
      });
  };

  const signout = (callback: VoidFunction) => {
    setUser(null);
    localStorage.removeItem("token");
    callback();
  };

  let value = { user, signin, signout, signup };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p data-qa="not-logged">You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
        data-qa="sign-out-btn"
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  function handleSignin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    auth.signin(email, password, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    });
  }

  function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const repeatPassword = formData.get("repeat_password") as string;
    if (password !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }
    const username = formData.get("username") as string;

    auth.signup(username, email, password, () => {
      navigate(from, { replace: true });
    });
  }

  return (
    <div>
      <p>You must log in to view the page at {from}</p>
      <Auth handleSignin={handleSignin} handleSignup={handleSignup} />
    </div>
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3 data-qa="protected-page">Protected</h3>;
}
