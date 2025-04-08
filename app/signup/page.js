'use client';

import { useState } from 'react';
import Link from 'next/link';

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
    <div className="bg-[#171717] h-screen flex items-center justify-center">
      <div className="bg-black bg-opacity-60 p-8 rounded-lg w-96">
        <h1 className="text-5xl font-bold text-yellow-500 mb-6 text-center">AFFINITY</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {['username', 'email', 'password'].map((field) => (
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
            className="w-full py-3 mt-4 text-lg font-medium bg-yellow-500 rounded-md text-black hover:bg-yellow-400 transition duration-300"
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
        {success && <p className="text-green-400 text-sm mt-2 text-center">{success}</p>}

        <p className="mt-4 text-sm text-gray-400 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-yellow-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
