
// URL for the JSON server endpoint
const url = "http://localhost:3000/users";


// Save user data to localStorage
export function save(nombre, edad) {
  const data = JSON.stringify({ nombre, edad });
  localStorage.setItem("userData", data);
  console.log("✅ Data saved to localStorage");
}


// Send user data to the JSON server
export async function toDb(nombre, edad) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombre, edad })
    });

    if (response.ok) {
      console.log("✅ Data sent to JSON server");
    } else {
      console.error("❌ Error sending data:", response.status);
    }
  } catch (error) {
    console.error("💥 Network error:", error);
  }
}


// Get user data from the JSON server and display it
export async function getFromDb() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    let output = document.getElementById("output");
    if (!data.length) {
      output.innerHTML = "<p>No registered data.</p>";
      return;
    }
    output.innerHTML = "<h3>Users from JSON Server:</h3><ul>";
    data.forEach(user => {
      output.innerHTML += `<li>${user.nombre} - ${user.edad} years old</li>`;
    });
    output.innerHTML += "</ul>";
  } catch (error) {
    console.error("Error getting data:", error);
  }
}


// Load user data from localStorage and display it
export function loadFromLocal() {
  const output = document.getElementById("output");
  const data = localStorage.getItem("userData");
  if (data) {
    const { nombre, edad } = JSON.parse(data);
    output.innerHTML = `
      <h3>Locally stored data:</h3>
      <p>👤 Name: ${nombre}</p>
      <p>🎂 Age: ${edad}</p>
    `;
  } else {
    output.innerHTML = "<p>No local data.</p>";
  }
}


// Clear user data from localStorage and update the output

// Clear user data from localStorage, clear output, and reset counter
export function clearData() {
  localStorage.removeItem("userData");
  sessionStorage.removeItem("counter");
  const output = document.getElementById("output");
  output.innerHTML = "<p>Data has been deleted.</p>";
  const contador = document.getElementById("contador");
  if (contador) {
    contador.innerHTML = "<p>🔁 Interactions in this session: 0</p>";
  }
}


// Count user interactions in the current session and display the count
export function countInteractions() {
  const contador = document.getElementById("contador");
  let count = sessionStorage.getItem("counter");
  count = count ? parseInt(count) + 1 : 1;
  sessionStorage.setItem("counter", count);
  contador.innerHTML = `<p>🔁 Interactions in this session: ${count}</p>`;
}
