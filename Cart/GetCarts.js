import Cart from "../Schema/Cart.js";

export const GetCarts = async (req, res) => {
  try {
    const { cartId } = await req.query;
    console.log(cartId);
    let query = {};
    if (cartId) {
      query.cartId = cartId;
    }

    const existedOrder = await Cart.find(query);
    if (existedOrder) {
      res.status(200).json({ existedOrder });
    } else {
      res.status(404).json({ error: "Order or Cart not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
