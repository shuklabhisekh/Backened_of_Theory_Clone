const express = require("express");

const {
  upload,
  uploadMultiple,
} = require("../middlewares/file-upload");

const Product = require("../model/product.model");

const router = express.Router();


router.post("/multiple", uploadMultiple("images"), async (req, res) => {
  try {
    const filePaths = req.files.map((file) => file.path);
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      type: req.body.type,
      images: filePaths,
    });

    return res.send(product);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


router.get("", async (req, res) => {
  try {
    const products = await Product.find().lean().exec();

    return res.send({ products });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/:category",async(req,res)=>{
    try {
        const product = await Product.find({category:req.params.category}).lean().exec()
        return res.send(product)
    } catch (error) {
        return res.status(500).send({ message: err.message });
    }
})

router.patch("/:id",async(req,res)=>{
    try {
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.send(product)
    } catch (error) {
        return res.status(500).send({ message: err.message });
    }
})

router.delete("/:id",async(req,res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        res.send(product)
    } catch (error) {
        return res.status(500).send({ message: err.message });
    }
})

module.exports = router;