
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


// Clear user data from localStorage, sessionStorage, UI, and db.json via JSON server
export async function clearData() {
  localStorage.removeItem("userData");
  sessionStorage.removeItem("counter");
  const output = document.getElementById("output");
  output.innerHTML = "<p>Data has been deleted.</p>";
  const contador = document.getElementById("contador");
  if (contador) {
    contador.innerHTML = "<p>🔁 Interactions in this session: 0</p>";
  }

  // Delete all users from the JSON server
  try {
    const response = await fetch("http://localhost:3000/users");
    if (response.ok) {
      const users = await response.json();
      // Delete each user
      await Promise.all(users.map(user =>
        fetch(`http://localhost:3000/users/${user.id}`, { method: 'DELETE' })
      ));
    }
  } catch (error) {
    console.error("Error deleting users from JSON server:", error);
  }
}



// Simple and effective session interaction counter
export function countInteractions() {
  const contador = document.getElementById("contador");
  if (!contador) return;
  // Get the current count or start at 0
  let count = Number(sessionStorage.getItem("counter")) || 0;
  contador.innerHTML = `<p>🔁 Interactions this session: <span id="counter-value">${count}</span></p>`;
}

// Call this function to increment the counter and update the UI
export function incrementCounter() {
  let count = Number(sessionStorage.getItem("counter")) || 0;
  count++;
  sessionStorage.setItem("counter", count);
  const value = document.getElementById("counter-value");
  if (value) {
    value.textContent = count;
  } else {
    // Fallback in case UI not rendered yet
    const contador = document.getElementById("contador");
    if (contador)
      contador.innerHTML = `<p>🔁 Interactions this session: <span id="counter-value">${count}</span></p>`;
  }
}
