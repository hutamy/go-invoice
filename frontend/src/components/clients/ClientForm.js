import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Text from "@/components/ui/Text";
import Email from "@/components/ui/Email";
import { ClientSchema } from "@/schema/Client";

export default function Form({
  client,
  onSubmit,
  clearForm,
  setShowForm,
  isEdit = false,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ClientSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  // Reset form when client data changes (for edit mode)
  useEffect(() => {
    if (client) {
      reset({
        name: client.name || "",
        email: client.email || "",
        phone: client.phone || "",
        address: client.address || "",
      });
    }
  }, [client, reset]);

  const handleFormSubmit = (data) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  const handleCancel = () => {
    reset({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    if (clearForm) clearForm();
    if (setShowForm) setShowForm(false);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
            <Text
              componentclassname={"mb-3"}
              label={"Name*"}
              {...register("name")}
              error={!!errors.name}
              errormessage={errors.name?.message}
              autoComplete="name"
            />
            <Email
              componentclassname={"mb-3"}
              label={"Email*"}
              {...register("email")}
              error={!!errors.email}
              errormessage={errors.email?.message}
              autoComplete="email"
            />
            <Text
              componentclassname={"mb-3"}
              label={"Address*"}
              {...register("address")}
              error={!!errors.address}
              errormessage={errors.address?.message}
              autoComplete="address"
            />
            <Text
              componentclassname={"mb-3"}
              label={"Phone*"}
              {...register("phone")}
              error={!!errors.phone}
              errormessage={errors.phone?.message}
              autoComplete="phone"
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={handleCancel}
          className="text-sm/6 font-semibold text-gray-900 cursor-pointer hover:text-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:cursor-pointer"
        >
          {isEdit ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
}
