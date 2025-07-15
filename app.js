const express = require("express");
const mongoose = require("mongoose");

const Product = require("./models/products");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  next();
});

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://mubarish007:tmkptkbThuWpgjtw@cluster0.o0g4mt8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Succesfully connected to mongoAtlas");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/api/products", (req, res, next) => {
  Product.find()
    .then((products) => {
      res.status(200).json({ products });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

app.get("/api/products/:id", (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => {
      res.status(200).json({ product });
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
});

app.post("/api/products", (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    inStock: req.body.inStock,
  });
  product
    .save()
    .then((savedProduct) => {
      res.status(201).json({ product: savedProduct });
      console.log("Succesfully saved");
    })
    .catch((error) => {
      res.status(400).json({ error });
      console.log(error);
    });
});

app.put("/api/products/:id", (req, res, next) => {
  const newProduct = new Product({
    _id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    inStock: req.body.inStock,
  });

  Product.updateOne({_id:req.params.id},newProduct)
  .then(()=>{
    res.status(200).json({ message: 'Modified!' })
  })
  .catch((error)=>{
    res.status(404).json({error})
  })
});


app.delete("/api/products/:id",(req,res)=>{
    Product.deleteOne({_id:req.params.id})
    .then(()=>{
        res.status(200).json({ message: 'Deleted!' })
    })
    .catch((error)=>{
        res.status(404).json({message:"Not found"})
    })
})

module.exports = app;
