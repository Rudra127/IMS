import Order from "../Schema/Order.js";

export const UpdateOrder = async (req, res) => {
  try {
    const orderData = await req.body;
    console.log({ orderData });
    const existedOrder = await Order.findOne({
      cartId: orderData.cartId,
      orderId: orderData.orderId,
    });
    console.log({ existedOrder });
    if (existedOrder) {
      const updatedOrder = await Order.updateOne(
        { orderId: orderData.orderId },
        orderData
      );
      if (updatedOrder) {
        res
          .status(200)
          .json({ message: "Order updated successfully", updatedOrder });
      }
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
