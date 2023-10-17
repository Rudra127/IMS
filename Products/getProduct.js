import products from "../Schema/product.js";

const productGet = async (req, res) =>{
    // console.log({body:req.body});
    // const {productnumber} = req.body.productNumber;
    try {
        const { productNumber } = await req.query;
        const query = {};
    
        if (productNumber) {
          query.productNumber = productNumber;
        }
    
        const findProduct = await products.find(query);
        res.status(200).json({ findProduct });
      } 
      catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
      }
    };
export default productGet;



// import products from "../Schema/product.js";

// const productGet = async (req, res) =>{
//     console.log({body:req.body});
//     const {productnumber} = req.body.productNumber;
//     try{
//         const findProduct = await products.findOne({
//           productNumber : productnumber,
//         });
//       if(findProduct){
//         res.json({message: "founded the Product", findProduct});
//         console.log(findProduct);
//       }
//       else{
//         res.status(404).json("product not found");
//       }

//        }
//     catch{
//       res.status(500).json({error: 'An error occurred while finding the product'});
//     }
//     };
// export default productGet;