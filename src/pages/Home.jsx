import React, { useState } from "react";
import { useCart } from "../context/CartContext";
// Importing our custom local generated images
import pizzaImg from "../assets/pizza.png";
import vegDishImg from "../assets/veg_dish.png";
import dessertImg from "../assets/chocolate_dessert.png";
import iceCreamImg from "../assets/ice_cream.png";
import waffleImg from "../assets/waffle.png";

const menuItems = [
  { id: 1, name: "Premium Pepperoni Pizza", price: 499, category: "Fast Food", image: pizzaImg, rating: "4.8" },
  { id: 2, name: "Gourmet Paneer Tikka Masala", price: 349, category: "Vegetarian", image: vegDishImg, rating: "4.9" },
  { id: 3, name: "Molten Dark Chocolate Lava Cake", price: 199, category: "Sweets", image: dessertImg, rating: "4.7" },
  { id: 4, name: "Deluxe Caramel Tower Sundae", price: 149, category: "Sweets", image: iceCreamImg, rating: "4.6" },
  { id: 5, name: "Belgian Chocolate Waffle", price: 249, category: "Sweets", image: waffleImg, rating: "4.8" },
  { id: 6, name: "Fresh Fruit Pastry", price: 129, category: "Sweets", image: "https://images.unsplash.com/photo-1549742464-67fb90547db9?auto=format&fit=crop&q=80&w=400&h=400", rating: "4.5" },
  { id: 7, name: "Chocolate Truffle Cake", price: 199, category: "Sweets", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400&h=400", rating: "4.9" },
  { id: 8, name: "Spicy Veg Manchuria", price: 229, category: "Fast Food", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=400&h=400", rating: "4.7" },
  { id: 9, name: "Hakka Fire Noodles", price: 249, category: "Asian", image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=400&h=400", rating: "4.6" },
  { id: 10, name: "Gourmet Beef Burger", price: 299, category: "Fast Food", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400&h=400", rating: "4.8" },
  { id: 11, name: "Fresh Sushi Platter", price: 899, category: "Asian", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=400&h=400", rating: "4.9" },
  { id: 12, name: "Fettuccine Alfredo Pasta", price: 399, category: "Vegetarian", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&q=80&w=400&h=400", rating: "4.7" },
  { id: 13, name: "Crispy Caesar Salad", price: 199, category: "Vegetarian", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400&h=400", rating: "4.5" },
  { id: 14, name: "Gourmet Street Tacos", price: 299, category: "Fast Food", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=400&h=400", rating: "4.8" }
];

function Home() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Vegetarian", "Sweets", "Fast Food", "Asian"];
  
  const filteredItems = activeCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Discover Exquisite Culinary Delights</h1>
        <p style={styles.heroSubtitle}>Explore our massive selection of gourmet meals, decadent desserts, and premium ice creams.</p>
      </div>

      {/* Categories */}
      <div style={styles.categoryContainer}>
        {categories.map((cat) => (
          <button 
            key={cat} 
            style={{
              ...styles.categoryBtn,
              backgroundColor: activeCategory === cat ? "#ff5e3a" : "rgba(255, 255, 255, 0.05)",
              color: activeCategory === cat ? "#fff" : "#a0a0a0"
            }}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div style={styles.grid}>
        {filteredItems.map((item) => (
          <div key={item.id} style={styles.card}>
            <div style={styles.imageWrapper}>
              <img src={item.image} alt={item.name} style={styles.image} />
              <div style={styles.ratingBadge}>⭐ {item.rating}</div>
            </div>
            <div style={styles.cardBody}>
              <h3 style={styles.cardTitle}>{item.name}</h3>
              <p style={styles.cardCategory}>{item.category}</p>
              
              <div style={styles.cardFooter}>
                <span style={styles.price}>₹{item.price.toFixed(2)}</span>
                <button style={styles.addBtn} onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px 40px",
    backgroundColor: "#0f0f13",
    color: "#fff",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif"
  },
  hero: {
    textAlign: "center",
    padding: "40px 0 60px 0"
  },
  heroTitle: {
    fontSize: "3rem",
    fontWeight: "800",
    marginBottom: "15px",
    background: "linear-gradient(90deg, #ff5e3a, #ff9900)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSubtitle: {
    fontSize: "1.2rem",
    color: "#a0a0a0",
    maxWidth: "600px",
    margin: "0 auto"
  },
  categoryContainer: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    marginBottom: "40px",
    flexWrap: "wrap",
  },
  categoryBtn: {
    padding: "10px 24px",
    borderRadius: "30px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "30px",
    paddingBottom: "50px"
  },
  card: {
    backgroundColor: "rgba(30, 30, 36, 0.6)",
    borderRadius: "20px",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  imageWrapper: {
    position: "relative",
    height: "250px",
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  ratingBadge: {
    position: "absolute",
    top: "15px",
    right: "15px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(5px)",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "15px",
    fontSize: "0.9rem",
    fontWeight: "600"
  },
  cardBody: {
    padding: "20px"
  },
  cardTitle: {
    margin: "0 0 5px 0",
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#fff"
  },
  cardCategory: {
    color: "#a0a0a0",
    fontSize: "0.9rem",
    margin: "0 0 20px 0"
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  price: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#ff5e3a"
  },
  addBtn: {
    backgroundColor: "#ff5e3a",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "12px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease"
  }
};

export default Home;