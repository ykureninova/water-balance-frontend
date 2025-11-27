import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser, setToken } from "../utils/storage.js";
import { api } from "../api/client.js";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    "confirm-password": "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form["confirm-password"]) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const data = await api("/auth/register", {
        method: "post",
        data: {
          username: form.username,
          email: form.email,
          password: form.password,
        },
      });

      if (!data || !data.access_token) {
        throw new Error("No token returned");
      }

      setToken(data.access_token);

      const user = await api("/user/me");
      setUser(user);

      navigate("/goalcalc");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed";
      alert(msg);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6">
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-sm">
        <div className="1-of-3">
          <h1 className="text-4xl font-bold mb-20">Sign Up</h1>

          <input
            name="username"
            type="text"
            placeholder="Username"
            onChange={handleChange}
            className="input border border-[#8CC1E9] w-full mb-3 p-2 rounded-3xl"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
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
          <input
            name="confirm-password"
            type="password"
            placeholder="Confirm password"
            onChange={handleChange}
            className="input border border-[#8CC1E9] w-full mb-3 p-2 rounded-3xl"
          />
        </div>

        <div className="3-of-3">
          <button
            type="submit"
            className="main-button mt-10 w-full py-2 rounded-3xl text-white font-medium bg-[#0055A0] transition hover:bg-[#004480]"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="secondary-button bg-[#8CC1E9] font-medium text-black w-full mt-2 py-2 rounded-3xl transition hover:bg-[#77acd4]"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
