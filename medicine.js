async function loadMedicines() {
  try {
    const res = await fetch("/sih/data/medicine-data.json");
    const medicines = await res.json();

    const searchInput = document.getElementById("searchInput");
    const typeFilter = document.getElementById("typeFilter");
    const results = document.getElementById("results");

    function render() {
      const searchTerm = searchInput.value.toLowerCase();
      const type = typeFilter.value;

      results.innerHTML = "";

      const filtered = medicines.filter(med =>
        med.name.toLowerCase().includes(searchTerm) &&
        (type === "" || med.type === type)
      );

      if (filtered.length === 0) {
        results.innerHTML = `<p class="text-gray-500">No medicines found.</p>`;
        return;
      }

      filtered.forEach(med => {
        const card = document.createElement("div");
        card.className = "bg-white shadow rounded-lg p-4";

        let shopsHtml = med.shops.map(shop => `
          <div class="flex justify-between border-b py-1">
            <span>${shop.shop}</span>
            <span class="${shop.available ? "text-green-600" : "text-red-600"}">
              ${shop.available ? "Available" : "Out of stock"}
            </span>
            <span>₹${shop.price}</span>
            <span>Qty: ${shop.quantity}</span>
          </div>
        `).join("");

        card.innerHTML = `
          <h2 class="font-bold text-lg mb-2">${med.name} <span class="text-sm text-gray-500">(${med.type})</span></h2>
          ${shopsHtml}
        `;

        results.appendChild(card);
      });
    }

    // Event listeners
    searchInput.addEventListener("input", render);
    typeFilter.addEventListener("change", render);

    render(); // initial render
  } catch (err) {
    console.error("Error loading medicines:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadMedicines);
