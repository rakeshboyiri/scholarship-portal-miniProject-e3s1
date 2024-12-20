import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Spin from "../utility/Spin";

function InstitueRegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    setLoading(true);
    setErrMsg("");
    try {
      const res = await fetch("/api/v1/institute/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (res.status !== 201) {
        setErrMsg(data.message || "An error occurred. Please try again.");
        setLoading(false);
        return;
      }
  
      setLoading(false);
      navigate("/institute/login");
    } catch (error) {
      setErrMsg("Server error. Please try again later.");
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create an Account for Institute
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              {...register("name", {
                required: true,
                minLength: 1,
                maxLength: 30,
              })}
              className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#5F0F40]"
              placeholder="Your Name"
            />
            {errors.name && (
              <span className="text-xs text-theme">This field is required</span>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#5F0F40]"
              placeholder="Your Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-xs text-theme">This field is required</span>
            )}
            {errMsg && <span className="text-xs text-theme">{errMsg}</span>}
          </div>
          <div>
            <label className="block text-gray-700">Phone no.</label>
            <input
              type="tel"
              className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#5F0F40]"
              placeholder="Your Phone Number"
              {...register("phone", { required: true, pattern: /^[0-9]{10}$/ })}
            />
            {errors.phone && (
              <span className="text-xs text-theme">
                Please enter a valid phone number
              </span>
            )}
            {errMsg && <span className="text-xs text-theme">{errMsg}</span>}
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#5F0F40]"
              placeholder="Your Password"
              {...register("password", { required: true, minLength: 6 })}
            />
          </div>
          {errors.password && (
            <span className="text-xs text-theme">
              This field is required with minimum length 6
            </span>
          )}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-sec focus:outline-none focus:ring-2 focus:ring-sec transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:scale-95 flex justify-center items-center"
          >
            {loading ? <Spin /> : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/institute/login" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default InstitueRegisterPage;
