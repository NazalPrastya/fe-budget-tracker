"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { login, register } from "@/services/auth";
import { DollarSign, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Modal from "@/ui/Modal";
import { CiWarning } from "react-icons/ci";

const AuthPage = () => {
  const [type, setType] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const termsCheckBoxRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
  });

  const isLogin = type === "login";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      let response;

      if (isLogin) {
        response = await login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        if (!termsCheckBoxRef.current?.checked) {
          setErrors({ terms: "Please accept terms and conditions" });
          return;
        }
        response = await register({
          ...formData,
          number: `+62${formData.number}`,
        });
      }

      const token = response.data.token;
      localStorage.setItem("token", token);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ general: error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  console.log(errors);
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-4">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Budget Tracker</h1>
            <p className="text-gray-600 mt-1">
              {isLogin ? "Welcome Back" : "Let's Get Started"}
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {isLogin ? "Sign In" : "Sign Up"}
              </h2>
              <p className="text-gray-600">
                Enter your email and password to{" "}
                {isLogin ? "sign in" : "sign up"}
              </p>
            </div>
            {errors.general && (
              <div
                role="alert"
                className="border-s-4 border-red-700 bg-red-50 p-4"
              >
                <div className="flex items-center gap-2 text-red-700">
                  <CiWarning className="w-5 h-5" />

                  <strong className="font-medium">{errors.general}</strong>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-2 flex items-center text-gray-500 text-sm font-bold">
                        +62
                      </div>
                      <input
                        value={formData.number}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            number: e.target.value,
                          })
                        }
                        id="phoneNumber"
                        type="text"
                        placeholder="8xxx"
                        className="w-full h-11 px-3 pl-12 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors "
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Emter password"
                    className="w-full h-11 px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              {!isLogin && (
                <div className="flex itemx-center">
                  <input
                    ref={termsCheckBoxRef}
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    I aggree to the{" "}
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => setShowModal(!showModal)}
                    >
                      Term and Privacy Policy
                    </button>
                  </label>
                </div>
              )}
              {errors.terms && <p className="text-red-500">{errors.terms}</p>}
              <button
                disabled={loading}
                type="submit"
                className={`w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLogin ? "Sign In" : "Sign Up"}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
              </div>

              <p className="text-center text-sm text-gray-600">
                {isLogin ? (
                  <>
                    Dont have an account?{" "}
                    <button
                      type="submit"
                      onClick={() => setType("register")}
                      className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      onClick={() => setType("login")}
                      className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                    >
                      Sign In
                    </button>
                  </>
                )}
              </p>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-center relative justify-center p-8 bg-gradient-to-br from-blue-600 to-purple-700">
        <Image
          src="/images/auth-img.png"
          alt="Auth Image"
          fill
          className="object-cover"
          priority
        />
      </div>
      {showModal && (
        <Modal
          type="information"
          message="Terms and Privacy Policy"
          onOk={() => {
            setShowModal(false);
            if (termsCheckBoxRef.current?.checked)
              termsCheckBoxRef.current.checked = true;
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default AuthPage;
