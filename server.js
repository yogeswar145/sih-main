const express = require("express");
const path = require("path");
const session = require("express-session");
require("dotenv").config();

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());

// ✅ Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey", // change in .env
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 15, // 15 minutes expiry
      httpOnly: true,
      sameSite: "lax"
    }
  })
);

// Authentication check middleware
function requireLogin(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.redirect("/sih/login");
  }
}

// API routes
app.use("/sih/api/auth", require("./routes/auth")(app));

// Protected routes
app.get("/sih/home", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.get("/sih/medicine", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "medicine.html"));
});

app.get("/sih/records", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "records.html"));
});

app.get("/sih/checkup", requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "checkup.html"));
});

// Public route
app.get("/sih/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve static files
app.use("/sih", express.static(path.join(__dirname, "public")));

// Catch-all fallback
app.get("/sih/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/sih`);
});









