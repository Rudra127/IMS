import Order from "../Schema/Order.js";

export const GetOrders = async (req, res) => {
  try {
    const {
      cartId,
      Status,
      orderId,
      EmployeeNotification,
      ShopkeeperNotification,
    } = await req.query;
    console.log(cartId);
    let query = {};
    if (cartId) {
      query.cartId = cartId;
    }
    if (Status) {
      query.Status = Status;
    }
    if (orderId) {
      query.orderId = orderId;
    }
    if (EmployeeNotification) {
      query.EmployeeNotification = EmployeeNotification;
    }

    if (ShopkeeperNotification) {
      query.ShopkeeperNotification = ShopkeeperNotification;
    }

    const existedOrders = await Order.find(query);
    if (existedOrders) {
      res.status(200).json({ existedOrders });
    } else {
      res.status(404).json({ error: "Order or Cart not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
