import { useState } from "react";
import { useRouter } from "next/router";
import { setToken } from "../lib/authenticate"; // Make sure this function exists

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate an authentication API call
    if (userName === "user" && password === "password") {
      setToken("dummy-jwt-token"); // Save a dummy token
      router.push("/favourites"); // Redirect to the Favourites page
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="container py-5">
      <div className="card p-4">
        <h1 className="mb-4">Login</h1>
        <p>Enter your login information below:</p>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Log In</button>
        </form>
      </div>
    </div>
  );
}
