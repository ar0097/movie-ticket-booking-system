import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { signupUser } from "../../api";
import "./Login.css";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  // const navigate = useNavigate();
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await signupUser(form);
    if (data.token) {
      localStorage.setItem("token", data.token);
      setForm({ name: "", email: "", password: "" });
      router.push("/");
    } else {
      console.log(data.message || "Signup failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-header">
          <h1 className="login-title">🎬 CineBook</h1>
          <p className="login-subtitle">Your Gateway to Movies</p>
        </div>

        <div className="login-card">
          <div className="tab-buttons">
            <button
              onClick={() => router.push("/")}
              className={`tab-button inactive`}
            >
              Login
            </button>
            <button
              onClick={() => router.push("/sign-up")}
              className={`tab-button active`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="John Doe"
                value={form.name}
                name="name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                name="email"
                placeholder="you@example.com"
                onChange={handleChange}
                value={form.email}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                name="password"
                onChange={handleChange}
                value={form.password}
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
