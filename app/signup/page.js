'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SignUp() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:8080/Auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Username: form.username,
          Email: form.email,
          PasswordHash: form.password,
        })
      });
      console.log(res)
      // const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      setSuccess('Account created successfully!');
      setForm({ username: '', email: '', password: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col py-6 items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/bg.svg)' }}>
      <Image src="/logo.svg" alt="bg" width={422} height={77}className='mb-[95px] sm:w-auto w-[200px]' />
      <div className="py-[47px] rounded-xl w-[90%] px-3 md:w-[723px] backdrop-blur-[58px] bg-[#EAF6F117] border-[#FFBB00] border">
        <div className='max-w-[369px] mx-auto'>
        <h1 className=" text-3xl sm:text-5xl font-medium  text-[#FFFFFF] mb-6 text-center">Sign Up</h1>
          <p className='text-[#FFFFFF] text-center text-[18px] leading-[100%]'>Create account to kickstart your learning</p>

          <form className="py-[44px]" onSubmit={handleSubmit}>
            {['username', 'email', 'password'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block mb-2 text-sm font-medium text-white capitalize">
                  {field}
                </label>
                <input
                  id={field}
                  name={field}
                  type={field === 'password' ? 'password' : 'text'}
                  required
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={`Enter your ${field}`}
                  className="w-full p-3 mt-1 bg-transparent border-[1px] mb-5 border-[#EAF6F1] rounded-md text-white focus:outline-none focus:ring-2 focus:[#FFBB00] focus:border-[#FFBB00]"
                />
              </div>
            ))}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 text-lg font-medium rounded-md text-black hover:opacity-90 transition duration-300"
              style={{
                background: 'linear-gradient(92.09deg, #FFBB00 9.67%, #3FB783 84.7%)'
              }}
            >
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>

          {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
          {success && <p className="text-green-400 text-sm mt-2 text-center">{success}</p>}

          <p className="text-sm text-gray-400 text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-[#FFC21B] underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
