import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setUser } from '../utils/storage.js';
import Navbar from "../components/Navbar.jsx";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    "confirm-password": ""   // додала, щоб не було undefined
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Перевірка паролів
    if (form.password !== form["confirm-password"]) {
      alert("Passwords don't match!");
      return;
    }

    // Зберігаємо юзера в localStorage
    const user = {
      username: form.username,
      email: form.email,
    };
    setUser(user); // тепер працює!
    navigate("/goalcalc");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-sm"
      >
        <div className='1-of-3'>
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
       
        <div className='3-of-3'>
            <button
            type="submit"
            className="main-button mt-10 w-full py-2 rounded-3xl text-white font-medium bg-[#0055A0] transition hover:bg-[#004480]"
            >
            Sign Up
            </button>
            <button
            type='button'
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

