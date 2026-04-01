import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function NavBar() {
  const { cartItemCount } = useCart();

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoLink}>🍔 Premium Bites</Link>
      </div>
      <div style={styles.links}>
        <Link to="/" style={styles.navLink}>Menu</Link>
        <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
        <Link to="/cart" style={styles.cartLink}>
          🛒 Cart 
          {cartItemCount > 0 && <span style={styles.badge}>{cartItemCount}</span>}
        </Link>
        <Link to="/login" style={styles.loginBtn}>Login</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "#121216",
    color: "#fff",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  logoLink: {
    color: "#fff",
    textDecoration: "none",
    background: "linear-gradient(90deg, #ff5e3a, #ff9900)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
  },
  navLink: {
    color: "#a0a0a0",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "color 0.3s ease",
  },
  cartLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  badge: {
    backgroundColor: "#ff5e3a",
    color: "#fff",
    fontSize: "0.75rem",
    fontWeight: "bold",
    borderRadius: "50%",
    padding: "2px 6px",
    marginLeft: "5px",
    position: "absolute",
    top: "-10px",
    right: "-15px",
  },
  loginBtn: {
    padding: "8px 20px",
    backgroundColor: "transparent",
    border: "1px solid #ff5e3a",
    color: "#ff5e3a",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    transition: "all 0.3s ease",
  }
};

export default NavBar;
