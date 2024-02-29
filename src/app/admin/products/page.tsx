"use client";

import { useEffect, useState } from "react";
import Product from "./Product";
import AddProductModal from "./AddProductModal";
import { getRequest } from "@/lib/axios";
import { toast } from "react-hot-toast";
import ListTable from "@/components/ListTable";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import AppTitle from "@/components/AppTitle";

const COLUMNS = [
  {
    Header: "Product #",
    accessor: "code",
    minWidth: 70,
    maxWidth: 70,
  },
  {
    Header: "Name",
    accessor: "name",
    minWidth: 300,
    maxWidth: 400,
  },
  {
    Header: "Price",
    accessor: "price",
    minWidth: 90,
    maxWidth: 100,
  },
  {
    Header: "Stock",
    accessor: "stock",
    minWidth: 90,
    maxWidth: 100,
  },
  {
    Header: "Active",
    accessor: "isActive",
    // @ts-ignore
    Cell: ({ row: { original: values } }) => (
      <>
        <div>{values.isActive ? "Yes" : "No"}&nbsp;</div>
      </>
    ),
    minWidth: 90,
    maxWidth: 100,
  },
  {
    Header: "",
    accessor: "id",
    // @ts-ignore
    Cell: ({ row: { original: values } }) => {
      const deleteItem = async () => {
        // try {
        //   const { data } = await deleteRequest(
        //     `masters/college/delete?collegeId=${values.collegeId}`
        //   );

        //   if (data.success) {
        //     values?.refreshData();
        //     toast.success('Deleted successfully');
        //   }
        // } catch (error) {
        //   toast.error('Could not delete. Please try again');
        // }

        console.log("Item deleted");
      };
      return (
        <div className="flex items-center justify-end gap-x-4">
          <button
            className="p-2 rounded cursor-pointer hover:bg-blue-900 group opacity-20"
            type="button"
            onClick={() => values.openEditModal(values.collegeId)}
            disabled
          >
            <PencilSquareIcon className="h-5 w-5 text-blue-500 group-hover:text-blue-300" />
          </button>
          <button
            className="p-2 rounded cursor-pointer hover:bg-red-900 group opacity-20"
            type="button"
            onClick={deleteItem}
            disabled
          >
            <TrashIcon className="h-5 w-5 text-red-500 group-hover:text-red-300" />
          </button>
        </div>
      );
    },
    minWidth: 80,
    maxWidth: 90,
  },
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    setLoading(true);
    const { data } = await getRequest("product");
    if (data.success) {
      setProducts(data.data);
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(data.message);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-3 md:mb-6">
        <AppTitle title="Products" />

        <AddProductModal refreshData={getAllProducts} />
      </div>

      <ListTable tcolumns={COLUMNS} tdata={products} />
    </>
  );
}
