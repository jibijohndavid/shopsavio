import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddProductInput,
  AddProductSchema,
} from "@/app/api/product/add/AddProductSchema";
import { postRequest } from "@/lib/axios";
import toast from "react-hot-toast";

export default function AddProductModal({
  refreshData,
}: {
  refreshData: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddProductInput>({
    resolver: zodResolver(AddProductSchema),
  });
  let [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async (formInputs: AddProductInput) => {
    setLoading(true);
    const { data } = await postRequest("product/add", formInputs);
    setLoading(false);

    if (data.success) {
      toast.success(`Product ${false ? "updated" : "added"} successfully`);
      refreshData();
      closeModal();
    } else {
      toast.error(data.message);
    }
  };

  function closeModal() {
    setIsOpen(false);
    reset();
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <button type="button" onClick={openModal} className="button">
          Add Product
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#232529] bg-opacity-80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-[#151515] p-10 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-medium leading-6 text-gray-200 mb-6"
                  >
                    New product
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(handleAddProduct)}>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="input-text-label">Name</label>
                        <input
                          className="input-text"
                          placeholder="Enter product name"
                          {...register("name")}
                        />
                        <p className="text-xs text-red-400 ml-2 mt-1">
                          {errors.name?.message}
                        </p>
                      </div>

                      <div className="col-span-2">
                        <label className="input-text-label">Description</label>
                        <textarea
                          className="input-text input-textarea"
                          placeholder="Enter description"
                          {...register("description")}
                          rows={4}
                        />
                        <p className="text-xs text-red-400 ml-2 mt-1">
                          {errors.description?.message}
                        </p>
                      </div>

                      <div>
                        <label className="input-text-label">Price</label>
                        <input
                          className="input-text"
                          placeholder="Enter price"
                          {...register("price")}
                        />
                        <p className="text-xs text-red-400 ml-2 mt-1">
                          {errors.price?.message}
                        </p>
                      </div>

                      <div>
                        <label className="input-text-label">Stock</label>
                        <input
                          className="input-text"
                          placeholder="Enter quantity"
                          {...register("stock")}
                        />
                        <p className="text-xs text-red-400 ml-2 mt-1">
                          {errors.stock?.message}
                        </p>
                      </div>
                    </div>

                    <div className="mt-14 flex gap-x-10 justify-between">
                      <button
                        type="button"
                        className="button-light"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="button w-14">
                        Add Product
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
