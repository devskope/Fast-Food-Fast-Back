import Order from '../../models/orders';
import orders from '../../datastores/orderData';
import checkRequired from '../../helpers/order_field_helpers';

const createOrder = (req, res) => {
  const { category, name, qty, ...extras } = req.body;

  checkRequired(req, res);

  const newOrder = new Order({ category, name, qty, ...extras });
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

const updateOrder = (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  const orderStates = ['completed', 'confirmed', 'declined'];

  const orderToUpdate = orders.findById(id);

  if (!orderStates.includes(status)) {
    res.status(500).json({
      success: false,
      message: `cannot parse invalid status "${status}" `
    });
  } else if (orderToUpdate) {
    orderToUpdate.status = status;
    res.status(200).json({
      success: true,
      message: `order #${id} has been marked as ${status}`,
      data: orderToUpdate
    });
  } else {
    res.status(404).json({
      success: false,
      message: `order #${id} not found`
    });
  }
};

export default { createOrder, getOrders, getSingleOrder, updateOrder };
