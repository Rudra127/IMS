import products from "../Schema/product.js";

const productDelete = async (req, res) =>{
    const {productNumber} = req.body.productNumber;
    try{
        const deleteProduct = await products.deleteOne(productNumber);
        if(deleteProduct){
            res.json({message:"product deleted"});
        }
        else{
            res.json({message:"error deleting product"});
        }
    }
    catch (error) {
        console.error(err);
        res
          .status(500)
          .json({ error: "An error occurred while deleting the todo" });
      }
    };
export default productDelete;