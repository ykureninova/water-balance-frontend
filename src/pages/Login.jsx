import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser, setToken } from "../utils/storage.js";
import { api } from "../api/client.js";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await api("/auth/login", {
        method: "post",
        data: {
          username: form.email,
          password: form.password,
        },
      });

      if (!data || !data.access_token) {
        throw new Error("Invalid credentials");
      }

      setToken(data.access_token);

      const user = await api("/user/me");
      setUser(user);

      navigate("/tracker");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed";
      alert(msg);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6">
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-sm">
        <div className="1-of-3">
          <h1 className="text-4xl font-bold mb-20">Login</h1>

          <input
            name="email"
            type="email"
            placeholder="Email or username"
            onChange={handleChange}
            className="input border border-[#8CC1E9] w-full mb-3 p-2 rounded-3xl"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="input border border-[#8CC1E9] w-full mb-3 p-2 rounded-3xl"
          />
        </div>

        <div className="3-of-3">
          <button
            type="submit"
            className="main-button mt-10 w-full py-2 rounded-3xl text-white font-medium bg-[#0055A0] transition hover:bg-[#004480]"
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="secondary-button bg-[#8CC1E9] font-medium text-black w-full mt-2 py-2 rounded-3xl transition hover:bg-[#77acd4]"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
