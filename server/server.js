const express = require("express");
const cors = require("cors");
const supabase = require("./supabase");

const app = express();

/* ------------------ CORS (DEPLOY READY) ------------------ */
app.use(cors({
  origin: "*"
}));

app.use(express.json());

/* ------------------ ROOT ------------------ */
app.get("/", (req, res) => {
  res.send("API Running");
});

/* ------------------ TEST DB ------------------ */
app.get("/test-db", async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");
  res.json({ data, error });
});

/* ------------------ SIGNUP ------------------ */
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase
      .from("users")
      .insert([{ email, password }])
      .select();

    res.json({ data, error });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------ ADD SCORE ------------------ */
app.post("/add-score", async (req, res) => {
  try {
    const { userId, score } = req.body;

    const { data: scores } = await supabase
      .from("scores")
      .select("*")
      .eq("userid", userId)
      .order("createdat", { ascending: true });

    const existingScores = scores || [];

    if (existingScores.length >= 5) {
      await supabase
        .from("scores")
        .delete()
        .eq("id", existingScores[0].id);
    }

    const { data, error } = await supabase
      .from("scores")
      .insert([{ userid: userId, score }])
      .select();

    res.json({ message: "Score added", data, error });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------ SUBSCRIBE ------------------ */
app.post("/subscribe", async (req, res) => {
  try {
    const { userId } = req.body;

    const { data, error } = await supabase
      .from("users")
      .update({ issubscribed: true })
      .eq("id", userId)
      .select();

    res.json({ message: "Subscribed", data, error });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------ RUN DRAW ------------------ */
app.post("/run-draw", async (req, res) => {
  try {
    const numbers = Array.from({ length: 5 }, () =>
      Math.floor(Math.random() * 45) + 1
    );

    const { data, error } = await supabase
      .from("draws")
      .insert([{ numbers }])
      .select();

    res.json({ message: "Draw generated", numbers, data, error });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------ PORT FIX (IMPORTANT FOR RENDER) ------------------ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});