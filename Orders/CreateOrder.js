import Order from "../Schema/Order.js";

export const CreateOrder = async (req, res) => {
  try {
    const orderData = await req.body;
    console.log({ orderData });
    const existedOrder = await Order.findOne({
      cartId: orderData.cartId,
      orderId: orderData.orderId,
    });
    console.log({ existedOrder });
    if (!existedOrder) {
      const createdOrder = await Order.create(orderData);
      if (createdOrder) {
        res
          .status(200)
          .json({ message: "Order created successfully", createdOrder });
      }
    } else {
      res.status(403).json({ error: "Order already exist" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
