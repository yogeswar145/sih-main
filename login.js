document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const phone = document.getElementById("phone").value;
  const pin = document.getElementById("pin").value;

  try {
    const res = await fetch("/sih/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, pin }),
      credentials: "include" // ✅ important for sending/receiving session cookie
    });

    const data = await res.json();

    if (res.ok && data.success) {
      // No need for localStorage — session is handled by cookie
      localStorage.setItem("patientName", data.name); // optional, just for display
      window.location.href = "/sih/home"; // redirect to dashboard
    } else {
      document.getElementById("error").classList.remove("hidden");
    }
  } catch (err) {
    console.error("Login error:", err);
  }
});


