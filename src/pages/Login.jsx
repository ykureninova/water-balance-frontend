import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setUser } from '../utils/storage.js';

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username: form.email.split('@')[0], email: form.email };
    setUser(user);
    navigate("/tracker");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-sm"
      >
        <div className='1-of-3'>
            <h1 className="text-4xl font-bold mb-20">Login</h1>
            
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
        </div>
       
        <div className='3-of-3'>
            <button
            type="submit"
            className="main-button mt-10 w-full py-2 rounded-3xl text-white font-medium bg-[#0055A0] transition hover:bg-[#004480]"
            >
            Login
            </button>
            
            <button
            type='button'
            onClick={() => navigate("/register")}
            className="secondary-button bg-[#8CC1E9] font-medium text-black w-full mt-2 py-2 rounded-3xl transition hover:bg-[#77acd4]"
            >
                Sign Up
            </button>
        </div>
      </form>
    </div>
  )
}

