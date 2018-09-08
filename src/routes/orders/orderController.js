import Order from '../../models/orders';
import orders from '../../datastores/orderData';
import checkRequired from '../../helpers/order_field_helpers';

const createOrder = (req, res) => {
  const { category, name, qty, ...extras } = req.body;

  checkRequired(req, res);

  const newOrder = new Order({ category, name, qty, extras });
  newOrder.save();

  res.status(201).json({
    success: true,
    message: `Order created successfully`,
    data: newOrder
  });
};

const getOrders = (req, res) => {
  if (orders.length === 0) {
    res.status(200).json({
      success: true,
      message: `no orders created yet`,
      data: []
    });
  } else {
    res.status(200).json({
      success: true,
      message: `fetched order list successfully`,
      data: orders
    });
  }
};

const getSingleOrder = (req, res) => {
  const { id } = req.params;

  if (orders.findById(id)) {
    res.status(200).json({
      success: true,
      message: `order found`,
      data: orders.findById(id)
    });
  } else {
    res.status(404).json({
      success: false,
      message: `no order found`
    });
  }
};

export default { createOrder, getOrders, getSingleOrder };
