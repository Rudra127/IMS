import products from "../Schema/product.js";

const productCreate = async (req, res) => {
    console.log(req.body);
    const productData = req.body;
        try{
            const productDatas = await products.create(productData);
            if(productDatas){
             res.json({message: "Product created successfully"});
            }
            else{
            res.json({message: "not able to create product"});
            }
         }
    catch (error) {
    console.error("Error creating products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default productCreate;