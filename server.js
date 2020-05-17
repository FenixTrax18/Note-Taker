// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

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
  var data = fs.readFileSync(__dirname + "/db/db.json");
  var noteDbArr = [];
  
  if(data.length > 0){
    noteDbArr = JSON.parse(data);
  }
  return res.json(noteDbArr);  
});

// API Route - Saves a new note to the list.
app.post("/api/notes", function(req, res) {
  console.log("I am your API call.");
  var newNote = req.body;
  var data = fs.readFileSync(__dirname + "/db/db.json");
  console.log(data);
  console.log(newNote);
  var noteDbArr = [];

  var newId = 1;
  if(data.length > 0){
    noteDbArr = JSON.parse(data);
    //todo: what happens if noteDbArr is empty?
    if(noteDbArr.length > 0){
      newId = noteDbArr[noteDbArr.length - 1].id + 1;
    }
  }

    newNote.id = newId;
    noteDbArr.push(newNote);
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(noteDbArr), function(err){
      if (err) {
          return console.log(err);
      }
      console.log("Success!");
    });
    return res.json(noteDbArr);
  });

// API Route - Deletes the note identified by input id.
app.delete("/api/notes/:id", function(req, res) {
  var deleteNoteId = req.params.id;
  var data = fs.readFileSync(__dirname + "/db/db.json");
  var noteListArr = [];
  
  if(data.length > 0){
    noteListArr = JSON.parse(data);
    console.log(noteListArr);
    console.log(deleteNoteId);
    
    for(var i=0; i < noteListArr.length; i++){
      if (deleteNoteId == noteListArr[i].id){
        console.log(noteListArr[i]);
        noteListArr.splice(i,1);
        console.log(noteListArr);
        break;
      }
    }
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(noteListArr), function(err){
      if (err) {
          return console.log(err);
      }
      console.log("Success!");
    });
    return res.json(noteListArr);
  }
  else{
    return res.json([]);
  }
  });


// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

