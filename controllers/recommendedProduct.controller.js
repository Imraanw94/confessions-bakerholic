/* In this file, you will find all the code needed to perform CRUD operations using Mongoose. 
After performing any CRUD operation, we return an array of all the documents in the DB.
*/
const RecommendedProduct = require("../models/recommendedProduct.model.js");
const User = require("../models/user.model.js");
var ObjectId = require("mongoose").Types.ObjectId;

exports.addRecommendedProduct = async function (recommended) {
  // Create and Save a new product recommendation
  let recommendedProductModel = new RecommendedProduct({
    name: recommended.name,
    recipe: recommended.recipe,
    picture: recommended.picture,
    author: recommended.author,
  });

  const newProduct = await recommendedProductModel.save();

  const recommendations = await RecommendedProduct.find({
    author: new ObjectId(recommended.author),
  });
  return recommendations;
};

// Get all the product recommendation documents in the DB
exports.findAllRecommendedProducts = async function (userId) {
  const user = await User.findOne({ _id: new ObjectId(userId) });
  let products;
  // If the user is an admin, return all the products, otherwise return those specific to that user
  if (user.isAdmin) {
    products = await RecommendedProduct.find({});
  } else {
    products = await RecommendedProduct.find({
      author: new ObjectId(userId),
    });
  }

  return products;
};

// Update the product recommendation by ID
exports.updateRecommendedProduct = async function (product) {
  const user = await User.findOne({ _id: new ObjectId(product.author) });

  let updatedProduct = await RecommendedProduct.findByIdAndUpdate(
    product.id,
    product
  );
  let products;
  // If the user is an admin, return all the products, otherwise return those specific to that user
  if (user.isAdmin) {
    products = await RecommendedProduct.find({});
  } else {
    products = await RecommendedProduct.find({
      author: new ObjectId(product.author),
    });
  }

  return products;
};

// Delete a product recommendation by ID
exports.deleteRecommendedProduct = async function (productId, authorId) {
  const user = await User.findOne({ _id: new ObjectId(authorId) });
  const productToDelete = await RecommendedProduct.findByIdAndDelete(productId);
  let products;
  // If the user is an admin, return all the products, otherwise return those specific to that user
  if (user.isAdmin) {
    products = await RecommendedProduct.find({});
  } else {
    products = await RecommendedProduct.find({
      author: new ObjectId(authorId),
    });
  }

  return products;
};
