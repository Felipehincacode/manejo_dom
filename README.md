# Dominando el DOM

<img width="633" height="500" alt="image" src="https://github.com/user-attachments/assets/55d8361f-4a1b-467d-a4aa-a96c90643d3f" />


This project is a simple web application for managing user data using the DOM, localStorage, and a JSON server. It allows users to:

- Add a name and age via a form
- Save data to localStorage and a JSON server
- View stored users from the server and localStorage
- Track the number of interactions in the current session
- Clear all stored data and reset the interaction counter

## Requirements
- Node.js and npm installed on your system

## Installation
1. Clone or download this repository.
2. Open a terminal in the project directory.
3. Run the following command to install dependencies:

```
npm install
```

## Running the Project
1. Start the JSON server (make sure you have `json-server` installed globally or as a dev dependency):

```
npx json-server --watch src/db/db.json --port 3000
```

2. Open `index.html` in your browser (you can use the Live Server extension in VS Code or any static server).

## Usage
- Fill in the name and age fields and submit the form (by clicking the button or pressing Enter).
- The data will be saved locally and sent to the JSON server.
- The right panel displays users from the server and local data.
- The left panel shows the number of interactions in the current session.
- Click "Limpiar Datos" to clear all data and reset the counter.

---

### Troubleshooting
- If you get CORS or fetch errors, make sure the JSON server is running and accessible at `http://localhost:3000/users`.
- If you use Live Server, ensure it is serving from the project root so that paths resolve correctly.
