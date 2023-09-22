const ProductModel = require("../model/ProductModel");
const CategoryModel = require("../model/CategoryModel");

exports.createProduct = async (req, res) => {
    try {
        const { name, price,category } = req.body;
        const product = await ProductModel.create({
        name,
        price,
        category
        });
        res.json(product);
    } catch (error) {
        console.log(error);
    }
}


exports.CreateCategory = async (req, res) => {
    try{
        const { name } = req.body;
        const category = await CategoryModel.create({
            name,
        });
        res.json(category);

    }
    catch(error){
        return res.status(500).json({message: error.message});
    }

}

exports.getCategory = async (req, res) => {
    try{
        const category = await CategoryModel.find();
        res.json(category);
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
}


exports.UpdateProduct = async (req, res) => {
    try {
        const {name, price, category} = req.body
        const product = await ProductModel.findOneAndUpdate({_id: req.params.id}, {
            name,
            price,
            category

        });
        res.json(product);
    } catch (error) {
        console.log(error);
    }
}

exports.getProduct = async (req, res) => {
    try{
        const product = await ProductModel.find();
        res.json(product);
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
}

exports.getProductById = async (req, res) => {
    try{
        const product = await ProductModel.findById(req.params.id);
        res.json(product);
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
}

exports.deleteProduct = async (req, res) => {
    try{
        const product = await ProductModel.findByIdAndDelete(req.params.id);
        res.json(product);
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
}


