import React from "react";
import SellerOrdersPage from "./SellerOrdersPage";
import { currentUser } from "@clerk/nextjs/server";
import { getSellerOrders } from "@/lib/actions/actions";
import { serializeOrders } from "@/utils/helpers";

export default async function page() {
  const user = await currentUser();
  const orders = await getSellerOrders(user?.id || "");
  const serializedOrders = serializeOrders(orders).filter(
    (order) => order !== undefined
  );
  return <SellerOrdersPage orders={serializedOrders} />;
}
