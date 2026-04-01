import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Dashboard() {
  const { orders } = useCart();

  const getEtaMinutes = (etaString) => {
    const diff = new Date(etaString) - new Date();
    return Math.max(0, Math.floor(diff / 60000));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>🎉 Congratulations!</h1>
      <p style={styles.subtext}>Your orders are being processed with premium care.</p>

      {orders.length === 0 ? (
        <div style={styles.emptyState}>
          <h3>You have no active orders.</h3>
          <p>Head over to the menu to explore delicious meals!</p>
          <Link to="/" style={styles.linkBtn}>Browse Menu</Link>
        </div>
      ) : (
        <div style={styles.ordersList}>
          {orders.map((order) => (
            <div key={order.id} style={styles.orderCard}>
              <div style={styles.orderHeader}>
                <span style={styles.orderId}>Order #{order.id.toUpperCase()}</span>
                <span style={styles.statusBadge}>{order.status}</span>
              </div>
              
              <div style={styles.deliveryInfo}>
                <p>📍 {order.details.address}</p>
                <p>⏱️ Estimated Delivery Limit: <strong>{getEtaMinutes(order.deliveryEta)} minutes</strong></p>
              </div>

              <div style={styles.itemsList}>
                {order.items.map((item, index) => (
                  <div key={index} style={styles.orderedItem}>
                    <img src={item.image} alt={item.name} style={styles.itemImg} />
                    <div style={styles.itemDetails}>
                      <h4>{item.name}</h4>
                      <p>Qty: {item.quantity} × ₹{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={styles.orderFooter}>
                <span>Order Total:</span>
                <span style={styles.orderTotal}>₹{order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    backgroundColor: "#0f0f13",
    color: "#fff",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif"
  },
  header: {
    fontSize: "3rem",
    textAlign: "center",
    marginBottom: "10px",
    background: "linear-gradient(90deg, #ff5e3a, #ff9900)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtext: {
    textAlign: "center",
    color: "#a0a0a0",
    marginBottom: "50px",
    fontSize: "1.2rem",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "rgba(30, 30, 36, 0.6)",
    borderRadius: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    border: "1px dashed rgba(255, 255, 255, 0.2)",
  },
  linkBtn: {
    display: "inline-block",
    marginTop: "20px",
    padding: "12px 24px",
    backgroundColor: "#ff5e3a",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "bold",
  },
  ordersList: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  orderCard: {
    backgroundColor: "rgba(30, 30, 36, 0.6)",
    borderRadius: "16px",
    padding: "30px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
  },
  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    paddingBottom: "15px",
    marginBottom: "20px",
  },
  orderId: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#e0e0e0",
  },
  statusBadge: {
    backgroundColor: "rgba(255, 94, 58, 0.15)",
    color: "#ff5e3a",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "0.9rem",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  deliveryInfo: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "20px",
    color: "#d0d0d0",
    lineHeight: "1.6",
  },
  itemsList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "20px",
  },
  orderedItem: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  itemImg: {
    width: "60px",
    height: "60px",
    borderRadius: "10px",
    objectFit: "cover",
  },
  itemDetails: {
    flex: 1,
  },
  itemDetailsHeader: {
    margin: "0 0 5px 0",
    fontSize: "1.1rem",
  },
  orderFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    paddingTop: "20px",
    fontSize: "1.2rem",
    fontWeight: "600",
  },
  orderTotal: {
    color: "#ff5e3a",
    fontSize: "1.5rem",
  }
};

export default Dashboard;