'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // Import js-cookie
import Image from 'next/image';
export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Email: form.email,
          PasswordHash: form.password,
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Login failed');

      // Save token and user data to cookies
      Cookies.set('token', data.token, { expires: 7, path: '' }); // Set token cookie for 7 days
      Cookies.set('user', JSON.stringify(data.user), { expires: 7, path: '' }); // Set user data cookie

      setSuccess('Login successful!');
      setForm({ email: '', password: '' });

      // Redirect after successful login
      router.push('/home'); // Use router.push() for navigating in Next.js
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/bg.svg)' }}>
      
      <Image src="/logo.svg" alt="bg" width={422} height={77} className='mb-[95px] sm:w-auto w-[200px]'  />
      <div className="py-[47px] rounded-xl w-[90%] px-3 md:w-[723px] backdrop-blur-[58px] bg-[#EAF6F117] border-[#FFBB00] border "
      >
        <div className='max-w-[369px] mx-auto'>
          <h1 className=" text-3xl sm:text-5xl font-medium  text-[#FFFFFF] mb-6 text-center">Log In</h1>
          <p className='text-[#FFFFFF] text-center text-[18px] leading-[100%]'>Login to kickstart your learning</p>

          <form className="py-[44px]" onSubmit={handleSubmit}>
            {['email', 'password'].map((field) => (
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
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>
        {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
        {success && <p className="text-green-400 text-sm mt-2 text-center">{success}</p>}

        <p className=" text-sm text-gray-400 text-center">
          Create New Account?{' '}
          <Link href="/signup" className="text-[#FFC21B]  underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
