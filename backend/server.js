const express = require("express");
const mongoose = require("mongoose");
const Movies = require("./models/movieModel")
const cors = require ("cors")


const dbUrl =
  "Nonono";
const app = express();
app.use(cors())

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));


const connectDB = async () => {
    try {
      await mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      console.log("mongoDB is Connect");
    } catch (error) {
      console.log(error);
    }
  };
  connectDB();
  
  app.get("/api/movies", async (req,res)=>{
    try {
      const movies = await Movies.find()
      res.json({movies})
    } catch (error) {
      console.log(error)
    }
  })

  app.post("/api/movies/add", async (req, res) => {
    try {
      await Movies.create({
        title: req.body.title,
        year: req.body.year,
        rating: req.body.rating,
        
      });
      res.json({
        message: "Add Successfully",
      });
    } catch (error) {
      res.json({ message: "Invalid User Data." });
    }
  });

  app.put("/api/movies/:id",async (req,res)=>{
    try {
      const data = req.body
      const movie = await Movies.findByIdAndUpdate(req.params.id, { $set: data })
    res.json({message : "Update Successfully"})
    } catch (error) {
      // res.send(error)
      res.json({ message: "Something wrong Oh Noo" });

    }
  })

  app.delete("/api/movies/:id", async (req, res) => {
    try {
      const movie = await Movies.findByIdAndDelete(req.params.id);
      res.json({ message: "Delete Successfully" });
    } catch (error) {
      res.send( error );
      res.json({ message: "Something wrong Oh Noo" });
    }
  });

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
