export default function Register() {
    return (
      <div className="container py-5">
        <div className="card p-4">
          <h1 className="mb-4">Register</h1>
          <p>Fill out the form to create an account:</p>
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input type="text" id="username" className="form-control" required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input type="password" id="password" className="form-control" required />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
  