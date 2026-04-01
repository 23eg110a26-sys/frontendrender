import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./Register.css";
import bgImage from "../assets/registration-bg.png";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", username: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration Successful!");
    navigate("/login");   // Redirect to Login
  };

  return (
    <div className="register-container">
      {/* Left side showcasing food / design */}
      <div className="register-image-section">
        <img src={bgImage} alt="Premium Food Delivery" className="register-image" />
        <div className="register-image-overlay"></div>
        <div className="register-image-text">
          <h2>Taste the Magic In Every Bite</h2>
          <p>Join the fastest premium food delivery network today and experience culinary excellence delivered to your door.</p>
        </div>
      </div>

      {/* Right side form */}
      <div className="register-form-section">
        <div className="register-form-container">
          <h1>Create Account</h1>
          <p className="register-subtitle">Sign up to get started</p>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" placeholder="John Doe" onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="john@example.com" onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" placeholder="Choose a username" onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Create a strong password" onChange={handleChange} required />
            </div>

            <button type="submit" className="register-btn">Sign Up</button>
          </form>

          <div className="login-link">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;