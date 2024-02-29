import React from "react";

const Product = ({ product }: any) => {
  return (
    <div className="flex flex-col items-center rounded-xl px-4 py-4 text-center md:flex-row md:items-start md:text-left bg-[#1f2a37]">
      {/* <div className="mb-4 md:mr-6 md:mb-0 h-48">
        <img
          className="rounded-lg object-cover h-full w-full"
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2881&q=80"
          alt=""
        />
      </div> */}
      <div className="">
        <p className="text-xl font-medium">{product.name}</p>
        <p className="mb-4 text-sm font-medium text-[#14b8a6]">
          {product.description}
        </p>
        <div className="grid grid-cols-3 space-x-3">
          <div className="flex flex-col items-center rounded-xl bg-[#151619] px-4 py-2">
            <p className="text-sm font-medium text-[#14b8a6]">Price</p>
            <p className="text-xl font-medium text-gray-300">
              ₹ {product.price}
            </p>
          </div>
          <div className="flex flex-col items-center rounded-xl bg-[#151619] px-4 py-2">
            <p className="text-sm font-medium text-[#14b8a6]">Stock</p>
            <p className="text-xl font-medium text-gray-300">{product.stock}</p>
          </div>
          <div className="flex flex-col items-center rounded-xl bg-[#151619] px-4 py-2">
            <p className="text-sm font-medium text-[#14b8a6]">Code</p>
            <p className="text-xl font-medium text-gray-300">{product.code}</p>
          </div>
        </div>
        {/* <div className="flex space-x-2">
          <button className="w-full rounded-lg border-2 bg-white px-4 py-2 font-medium text-gray-500">
            Delete
          </button>
          <button className="w-full rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white">
            Edit
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Product;
