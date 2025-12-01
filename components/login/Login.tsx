import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api";
import "./Login.css";
import { useRouter } from "next/navigation";

interface LoginTypes {
  email: string;
  password: string;
}

const Login = () => {
  const [form, setForm] = useState<LoginTypes>({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  // const navigate = useNavigate();
  const router = useRouter();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const data = await loginUser(form);
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user.name));
      setMessage("Login successful!");
      setForm({ email: "", password: "" });
      router.push("/movies");
    } else {
      setMessage(data.message || "Login failed");
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
              className={`tab-button active`}
            >
              Login
            </button>
            <button
              onClick={() => router.push("/sign-up")}
              className={`tab-button inactive`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
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
                name="password"
                placeholder="••••••••"
                onChange={handleChange}
                value={form.password}
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Login
            </button>

            {message && (
              <p style={{ marginTop: "12px", color: "red" }}>{message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
