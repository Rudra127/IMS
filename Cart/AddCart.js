import Cart from "../Schema/Cart.js";

export const AddCart = async (req, res) => {
  try {
    const cartData = await req.body;
    const cartid = await req.body.cartId;
    console.log(cartData);
    const existedOrder = Cart.findOne({ cartId: cartData.cartId });
    if (!existedOrder) {
      const createdOrder = await Cart.create(cartData);
      console.log("cart created", createdOrder)
      if (createdOrder) {
        res.status(200).json({ createdOrder });
      }
    } else {
      const updatedOrder = await Cart.updateOne(
        { cartId: cartData.cartId },
        cartData
      );
      if (updatedOrder) {
        res.status(200).json({ updatedOrder });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export default AddCart;