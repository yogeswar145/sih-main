document.getElementById("logoutBtn").addEventListener("click", async () => {
  try {
    const res = await fetch("/sih/api/auth/logout", {
      method: "POST",
      credentials: "include" // include cookies
    });

    if (res.ok) {
      localStorage.removeItem("patientName"); // optional cleanup
      window.location.href = "/sih/login"; // back to login page
    }
  } catch (err) {
    console.error("Logout error:", err);
  }
});

// ✅ Optional: show name from localStorage
document.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("patientName") || "Patient";
  document.getElementById("patientName").textContent = name;
});

