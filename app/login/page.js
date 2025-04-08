'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // Import js-cookie

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
      const res = await fetch('http://localhost:8080/api/Auth/login', {
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
    <div className="bg-[#171717] h-screen flex items-center justify-center">
      <div className="bg-black bg-opacity-60 p-8 rounded-lg w-96">
        <h1 className="text-5xl font-bold text-yellow-500 mb-6 text-center">AFFINITY</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {['email', 'password'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-white capitalize">
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
                className="w-full p-3 mt-1 bg-gray-700 rounded-md border-2 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 text-lg font-medium bg-green-500 rounded-md text-black hover:bg-green-400 transition duration-300"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
        {success && <p className="text-green-400 text-sm mt-2 text-center">{success}</p>}

        <p className="mt-4 text-sm text-gray-400 text-center">
          Create New Account?{' '}
          <Link href="/signup" className="text-yellow-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
