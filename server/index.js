const express = require("express");
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/", (req, res) => {
    res.send("This is from express.js");
  });
  

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => { console.log("server is running")})