// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
// =============================================================

// HTML Route - Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// HTML Route - Send the user to the notes page.
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// API Route - Retrieves all the notes.
app.get("/api/notes", function(req, res) {
  
});

// API Route - Saves a new note to the list.
app.post("/api/notes", function(req, res) {
  
});

// API Route - Deletes the note identified by input id.
app.delete("/api/notes/:id", function(req, res) {
  var chosen = req.params.id;

app.use(express.static(__dirname + "/public"));

  console.log(chosen);

  for (var i = 0; i < characters.length; i++) {
    if (chosen === characters[i].routeName) {
      return res.json(characters[i]);
    }
  }

  return res.json(false);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
