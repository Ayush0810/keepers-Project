const express = require("express");
const connectToMongo = require("./db.js");
const { body } = require("express-validator");
var cors = require("cors");
const todoList = require("./db");
const { default: mongoose } = require("mongoose");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

//get all item
app.get("/allNotes", async function (req, res) {
  const filter = {};
  const all = await todoList.find(filter);
  res.json(all);
});

//Add item
app.post(
  "/addNote",
  [body("title").isLength({ min: 2 }), body("content").isLength({ min: 5 })],
  async function (req, res) {
    const { title, content } = req.body;
    const note = new todoList({
      title,
      content,
    });
    await note.save();
    return res.json(note);
  }
);

//delete Item
app.delete("/deleteNote/:id", function (req, res) {
  todoList.deleteOne({ _id: req.params.id }, function (err) {
    if (err) {
      res.send("unable to delete");
    } else {
      res.send("deleted successfully");
    }
  });
});

//update item
app.put("/updateNote/:id", async function (req, res) {
  const { title, content } = req.body;
  const updated = {};
  const id = req.body;
  if (title) {
    updated.title = title;
  }
  if (content) {
    updated.content = content;
  }

  const updatedNote = await todoList.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: updated },
    { new: true }
  );

  res.json(updatedNote);
});

app.listen(5000, function () {
  console.log("listening at port 5000:");
});
