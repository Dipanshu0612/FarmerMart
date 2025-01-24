export const serializeProduct = (product: ProductType) => {
  return {
    ...product,
    _id: product._id.toString(),
    createdAt: new Date(product.createdAt).toISOString(),
    updatedAt: new Date(product.updatedAt).toISOString(),
  };
};


export const serializeProducts = (products: ProductType[]) => {
  return products.map((product) => {
    return {
      ...product,
      _id: product._id.toString(),
      createdAt: new Date(product.createdAt).toISOString(),
      updatedAt: new Date(product.updatedAt).toISOString(),
    };
  });
};
