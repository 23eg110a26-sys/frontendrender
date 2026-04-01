
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login Successful!");
    navigate("/dashboard");   // Redirect to Dashboard
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <br /><br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <br /><br />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;