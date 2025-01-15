import React from "react";

export default function Product({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div className="flex items-center justify-center flex-1 text-center">
      Product with ID : {id} page.
    </div>
  );
}
