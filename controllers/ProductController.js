var ProductModel = require("../models/ProductModel.js");

module.exports = function(router) {
    router.post("/createProduct", async (req, res) => {
        try {

            console.log("smsmdsmdsmmsdm",req.path)
            res.status(200).json(await ProductModel.create(req.body))
        } catch (err) {
            res.status(500).json(err)
        }
    })
    router.post("/updateProduct", async (req, res) => {
        try {
            res.status(200).json(await ProductModel.updateProduct(req.body))
        } catch (err) {
            res.status(500).json(err)
        }
    })
    router.post("/getAllProducts", async (req, res) => {
        try {
            res.status(200).json(await ProductModel.getAll(req.body))
        } catch (err) {
            console.log("err",err)
            res.status(500).json(err)
        }
    })
    router.post("/deleteProduct", async (req, res) => {
        try {
            res.status(200).json(await ProductModel.deleteProduct(req.body))
        } catch (err) {
            res.status(500).json(err)
        }
    })
    router.post("/getProduct", async (req, res) => {
        try {
            res.status(200).json(await ProductModel.getProduct(req.body))
        } catch (err) {
            res.status(500).json(err)
        }
    })
}

