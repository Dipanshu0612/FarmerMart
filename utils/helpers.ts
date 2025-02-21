export const serializeProduct = (product: ProductType) => {
  return {
    ...product,
    _id: product._id ? product._id.toString() : "",
    createdAt: product.createdAt
      ? new Date(product.createdAt).toISOString()
      : "",
    updatedAt: product.updatedAt
      ? new Date(product.updatedAt).toISOString()
      : "",
  };
};


export const serializeProducts = (products: ProductType[]) => {
  return products.map((product) => {
    return {
      ...product,
      _id: product._id ? product._id.toString() : "",
      createdAt: product.createdAt
        ? new Date(product.createdAt).toISOString()
        : "",
      updatedAt: product.updatedAt
        ? new Date(product.updatedAt).toISOString()
        : "",
    };
  });
};

export const serializeOrders = (orders: OrderType[]) => {
  return orders.map((order) => {
    if (!order) return;
    return {
      ...order,
      _id: order._id.toString(),
      ordered_at: new Date(order.ordered_at).toISOString(),
      createdAt: new Date(order.createdAt).toISOString(),
      updatedAt: new Date(order.updatedAt).toISOString(),
      products_details: Array.isArray(order.products_details) ? order.products_details.map((product: OrderProductDetails) => ({
        ...product,
        _id: product._id?.toString(),
      })) : [],
    };
  });
};