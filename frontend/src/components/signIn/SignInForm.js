import Email from "@/components/ui/Email";
import Password from "@/components/ui/Password";
import { Button } from "../buttons";
import { SignInSchema } from "@/schema/SignIn";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignInForm({ setError }) {
  const { signIn } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);
      router.push("/dashboard");
    } catch (error) {
      setError(error.message || "Sign in failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4">
        <Email
          {...register("email")}
          componentclassname={"mb-3"}
          label={"Email*"}
          id="email"
          name="email"
          autoComplete="email"
          error={!!errors.email}
          errormessage={errors.email?.message}
        />
        <Password
          {...register("password")}
          componentclassname={"mb-3"}
          label={"Password*"}
          id="password"
          name="password"
          autoComplete="current-password"
          error={!!errors.password}
          errormessage={errors.password?.message}
        />
      </div>
      <div className="flex justify-between mt-8">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="space-x-2">
              Signing In...
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
            <span>Sign In</span>
          )}
        </Button>
      </div>
    </form>
  );
}
