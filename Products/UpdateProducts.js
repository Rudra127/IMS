import products from "../Schema/product.js";

const UpdateProducts = async (req, res) => {
  console.log(req.body);
  const productData = req.body;
  try {
    if (productData) {
      const findProduct = await products.findOne({
        productId: productData.productId,
      });
      if (findProduct) {
        const updateProduct = await products.updateOne(
          { productId: productData.productId },
          productData
        );

        if (updateProduct) {
          res.json({ message: "product has been updated", updateProduct });
        } else {
          res.status(404).json("product not found");
        }
      } else {
        res.status(500).json(`please add the product data in body`);
      }
    }
  } catch (err) {
    console.error("Database error:", err); // Log the specific error
    res
      .status(500)
      .json({ error: "An error occurred while updating the product" });
  }
};

export default UpdateProducts;
