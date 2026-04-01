import { useState } from "react";

function App() {
  const [userId, setUserId] = useState("");
  const [score, setScore] = useState("");
  const [message, setMessage] = useState("");

  const BASE_URL = "https://golftracker-4gyk.onrender.com";

  const signup = async () => {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test" + Math.random() + "@gmail.com",
        password: "123456",
      }),
    });

    const data = await res.json();
    setUserId(data.data[0].id);
    setMessage("✅ User created");
  };

  const addScore = async () => {
    await fetch(`${BASE_URL}/add-score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        score: Number(score),
      }),
    });

    setMessage("🏌️ Score added");
  };

  const subscribe = async () => {
    await fetch(`${BASE_URL}/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    setMessage("💎 Subscribed");
  };

  const runDraw = async () => {
    const res = await fetch(`${BASE_URL}/run-draw`, {
      method: "POST",
    });

    const data = await res.json();
    setMessage("🎯 Draw: " + data.numbers.join(", "));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* 🏌️ Golf Image */}
        <img
          src="https://images.unsplash.com/photo-1592919505780-303950717480"
          alt="golf"
          style={styles.image}
        />

        <h1 style={styles.title}>🏌️ Golf App MVP</h1>

        <button style={styles.primaryBtn} onClick={signup}>
          Signup
        </button>

        <input
          style={styles.input}
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Enter Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />

        <div style={styles.buttonRow}>
          <button style={styles.btn} onClick={addScore}>
            Add Score
          </button>

          <button style={styles.btn} onClick={subscribe}>
            Subscribe
          </button>

          <button style={styles.btn} onClick={runDraw}>
            Run Draw
          </button>
        </div>

        <p style={styles.message}>{message}</p>
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    width: "350px",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "15px",
  },
  title: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  primaryBtn: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "5px",
  },
  btn: {
    flex: 1,
    padding: "10px",
    background: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  message: {
    marginTop: "15px",
    fontWeight: "bold",
  },
};

export default App;