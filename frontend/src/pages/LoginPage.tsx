import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext.tsx";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      await login(data.email, data.password);
      navigate("/dashboard");
      toast.success("Login successful!");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Invalid credentials";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100/50 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-200/50">
              <LogIn className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="mt-8 text-2xl font-light text-gray-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="mt-3 text-sm text-gray-500 font-light">
              Sign in to continue to your dashboard
            </p>
            <p className="mt-6 text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-300"
              >
                Create one here
              </Link>
            </p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-3"
                >
                  Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  autoComplete="email"
                  className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200/60 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 placeholder-gray-400 text-gray-900"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="mt-3 text-sm text-red-500 flex items-center font-light">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-3"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className="w-full px-4 py-4 pr-12 bg-gray-50/50 border border-gray-200/60 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 placeholder-gray-400 text-gray-900"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-3 text-sm text-red-500 flex items-center font-light">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 flex justify-center items-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white mr-3"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5 mr-3" />
                    Sign In
                  </>
                )}
              </button>

              <div className="text-center">
                <Link
                  to="/"
                  className="text-sm text-gray-400 hover:text-blue-600 transition-colors duration-300 font-light"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </form>
        </div>

        {/* Bottom decoration */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center justify-center space-x-3 text-xs text-gray-300">
            <span>Secure</span>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <span>Fast</span>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <span>Reliable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
