
// Import functions from metodos.js
import {
  save,
  toDb,
  getFromDb,
  loadFromLocal,
  clearData,
  countInteractions
} from './metodos.js';


// Initialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Ensure the counter element exists before calling countInteractions
  setTimeout(() => {
    countInteractions(); // Count session interactions
  }, 0);
  loadFromLocal(); // Load data from localStorage
  getFromDb(); // Load data from JSON server
});


// Handle form submission (works with Enter or clicking submit)
document.getElementById("userForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  const edad = document.getElementById("edad").value.trim();

  // Validate input fields
  if (nombre === "" || edad === "" || isNaN(edad)) {
    alert("Please enter a valid name and a numeric age.");
    return;
  }

  save(nombre, edad); // Save to localStorage
  toDb(nombre, edad); // Save to JSON server
  loadFromLocal(); // Update local display
  getFromDb(); // Update server display
  document.getElementById("userForm").reset(); // Reset form
});


// Handle clear data button
document.getElementById("limpiar").addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default if button is inside a form
  clearData();
});
