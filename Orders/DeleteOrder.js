import Order from "../Schema/Order.js";

export const DeleteOrders = async (req, res) => {
  try {
    const { cartId, orderId } = await req.query;
    // console.log(cartId);
    let query = {};
    if (cartId) {
      query.cartId = cartId;
    }
    if (orderId) {
      query.orderId = orderId;
    }

    const deletedOrders = await Order.deleteOne(query);
    // console.log(deletedOrders);
    if (deletedOrders) {
      res.status(200).json({ deletedOrders });
    } else {
      res.status(404).json({ error: "Order or Cart not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
