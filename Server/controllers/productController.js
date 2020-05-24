const productModel = require('../Models/Product.model')



addProduct = async (req, res) => {

    try {
    const product = new productModel(req.body)
    const findProduct = await productModel.findOne ({ album: req.body.album })

        if (!findProduct) {
            await product.save()
            res.send(product) 
        } else {
            res.status(400).json('Album already exists')
        }

    } catch (err) {
        res.status(500).send(err)
    }
},

getAllProducts = async (req, res) => {

try {
    const product = await productModel.find()
    res.send(product)

  } catch (err) {
    res.status(500).send(err)
  }
}
module.exports = { addProduct, getAllProducts}
