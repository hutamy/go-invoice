import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext.tsx';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  address: z.string().min(1, 'Address is required'),
  phone: z.string().min(1, 'Phone number is required'),
  bank_name: z.string().min(1, 'Bank name is required'),
  bank_account_name: z.string().min(1, 'Bank account name is required'),
  bank_account_number: z.string().min(1, 'Bank account number is required'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...registerData } = data;
      await registerUser(registerData);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch {
      toast.error('Failed to create account. Please try again.');
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
              <UserPlus className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="mt-8 text-2xl font-light text-gray-900 tracking-tight">
              Join Us Today
            </h2>
            <p className="mt-3 text-sm text-gray-500 font-light">
              Create your account to get started
            </p>
            <p className="mt-6 text-sm text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-300"
              >
                Sign in here
              </Link>
            </p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  {...register('name')}
                  type="text"
                  autoComplete="name"
                  className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200/60 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 placeholder-gray-400 text-gray-900"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-3 text-sm text-red-500 flex items-center font-light">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  {...register('email')}
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
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-3">
                  Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    className="w-full px-4 py-4 pr-12 bg-gray-50/50 border border-gray-200/60 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 placeholder-gray-400 text-gray-900"
                    placeholder="Create a secure password"
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-3">
                  Confirm Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register('confirmPassword')}
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    className="w-full px-4 py-4 pr-12 bg-gray-50/50 border border-gray-200/60 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 placeholder-gray-400 text-gray-900"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-3 text-sm text-red-500 flex items-center font-light">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Additional Profile Information */}
              <div className="pt-6 border-t border-gray-200/50">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Business Information</h3>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="address"
                      type="text"
                      placeholder="Your business address"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('address')}
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.address.message}
                      </p>
                    )}
                  </div>                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-3">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200/60 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 placeholder-gray-400 text-gray-900"
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                      <p className="mt-3 text-sm text-red-500 flex items-center font-light">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="bank_name" className="block text-sm font-medium text-gray-700 mb-3">
                      Bank Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      {...register('bank_name')}
                      type="text"
                      className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200/60 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 placeholder-gray-400 text-gray-900"
                      placeholder="Enter your bank name"
                    />
                    {errors.bank_name && (
                      <p className="mt-3 text-sm text-red-500 flex items-center font-light">
                        {errors.bank_name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="bank_account_name" className="block text-sm font-medium text-gray-700 mb-3">
                      Bank Account Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      {...register('bank_account_name')}
                      type="text"
                      className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200/60 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 placeholder-gray-400 text-gray-900"
                      placeholder="Enter account holder name"
                    />
                    {errors.bank_account_name && (
                      <p className="mt-3 text-sm text-red-500 flex items-center font-light">
                        {errors.bank_account_name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="bank_account_number" className="block text-sm font-medium text-gray-700 mb-3">
                      Bank Account Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      {...register('bank_account_number')}
                      type="text"
                      className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200/60 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 placeholder-gray-400 text-gray-900"
                      placeholder="Enter your account number"
                    />
                    {errors.bank_account_number && (
                      <p className="mt-3 text-sm text-red-500 flex items-center font-light">
                        {errors.bank_account_number.message}
                      </p>
                    )}
                  </div>
                </div>
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
                    Creating account...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-5 w-5 mr-3" />
                    Create Account
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
      </div>
    </div>
  );
};

export default RegisterPage;
