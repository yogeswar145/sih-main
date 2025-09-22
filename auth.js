const express = require("express");
const router = express.Router();

module.exports = (app) => {
  // Login
  router.post("/login", (req, res) => {
    const { phone, pin } = req.body;

    // Replace with real DB check
    if (phone === "9999999999" && pin === "1234") {
      req.session.user = { phone }; // store user in session
      return res.json({ success: true, name: "John Doe" });
    }

    return res.status(401).json({ success: false, message: "Invalid login" });
  });

  // Logout
  router.post("/logout", (req, res) => {
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.json({ success: true });
    });
  });

  return router;
};

