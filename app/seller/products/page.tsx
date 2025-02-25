import React from 'react'
import SellerProductsPage from './SellerProducts'
import { currentUser } from '@clerk/nextjs/server'
import { getSellerProducts } from '@/lib/actions/actions';
import { serializeProducts } from '@/utils/helpers';

export default async function page() {
    const user = await currentUser();
    const products = user ? await getSellerProducts(user.id) : [];
    const newProducts = serializeProducts(products || []);
  return <SellerProductsPage products={newProducts} />;
}
