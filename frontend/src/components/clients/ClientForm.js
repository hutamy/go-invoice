import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ClientSchema } from "@/schema/Client";
import { Text, Email, Button } from "@/components/ui";

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
    formState: { errors, isSubmitting },
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
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="space-x-2">
              Saving...
              <span className="inline-block mx-2 align-middle">
                <span
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    border: "3px solid #ccc",
                    borderTop: "3px solid #333",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                <style>
                  {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
                </style>
              </span>
            </span>
          ) : (
            <span>Save</span>
          )}
        </Button>
      </div>
    </form>
  );
}
