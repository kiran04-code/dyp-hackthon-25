
function toggleDropdown() {
    const dropdown = document.getElementById("dropdown2");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

  

function filterDropdown() {
    const input = document.getElementById("input1").value.toLowerCase();
    const items = document.querySelectorAll("#dropdown2 div");
  
    let anyVisible = false;
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      const isVisible = text.includes(input);
      item.style.display = isVisible ? "block" : "none";
      if (isVisible) anyVisible = true;
    });
  
    // Always show dropdown while filtering if there's any match
    const dropdown = document.getElementById("dropdown2");
    dropdown.style.display = anyVisible ? "block" : "none";
  }
  
function selectOption(value) {
    document.getElementById("input1").value = value;
    document.getElementById("dropdown2").style.display = "none";
  }
  

function searchVaccine() {
  const value = document.getElementById("input1").value;
  alert("You searched for: " + value); // You can change this to redirect or show info
}

// Hide dropdown if clicked outside
document.addEventListener("click", function (e) {
    setTimeout(() => {
      if (!e.target.closest(".search-container")) {
        document.getElementById("dropdown2").style.display = "none";
      }
    }, 100);
  });
  

