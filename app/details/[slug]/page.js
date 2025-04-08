"use client";
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection

const gameData = {
  'galaxy-shooter': {
    title: 'Galaxy Shooter',
    img: '/images/game3.png',
    desc: `While working underground to fix a water main...`,
    playUrl: 'https://farhanfk2003.itch.io/space-shooter-pro',
  },
  'super-mario': {
    title: 'SUPER MARIO',
    img: '/images/game3.svg',
    desc: `While working underground to fix a water main...`,
    playUrl: 'https://farhanfk2003.itch.io/solar-system',
  },
};

export default function GameDetails() {
  const { slug } = useParams();
  const game = gameData[slug] || null;
  const [userName, setUserName] = useState('');
  const router = useRouter(); // For redirection

  useEffect(() => {
    // Fetch the user from cookies
    const user = Cookies.get('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserName(parsedUser.username); // Assumes 'username' property is available
    }
  }, []);

  const handleLogout = () => {
    // Remove the user cookie
    Cookies.remove('user');

    Cookies.remove('token');
    // Redirect to login page
    router.push('/login');
  };

  if (!game) {
    return (
      <div className="bg-black text-white h-screen flex items-center justify-center">
        <span className="text-3xl text-yellow-500">Game Not Found</span>
      </div>
    );
  }

  return (
    <div className="bg-black text-white h-screen flex">
      {/* Sidebar */}
      <aside className="bg-black text-white w-40 p-4 flex flex-col items-center space-y-6">
        <div className="text-yellow-500 text-3xl">AFFINITY</div>
        <div className="flex flex-col space-y-6 mt-10">
          <div className="bg-yellow-500 w-12 h-12 rounded-full flex justify-center items-center text-black">📁</div>
          <div className="bg-yellow-500 w-12 h-12 rounded-full flex justify-center items-center text-black">🛒</div>
          <div className="bg-yellow-500 w-12 h-12 rounded-full flex justify-center items-center text-black">📊</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-[#171717]">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold text-yellow-500">AFFINITY</h1>
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-500 w-12 h-12 rounded-full flex justify-center items-center text-black">🔔</div>
            <div className="bg-yellow-500 w-12 h-12 rounded-full flex justify-center items-center text-black">👤</div>
            <span className="text-xl">{userName || 'Guest'}</span> {/* Display user name */}
          </div>
          {/* Logout Button */}
          {userName && (
            <button
              onClick={handleLogout}
              className="bg-yellow-500 text-black px-6 py-2 text-lg font-bold rounded-lg hover:bg-yellow-400 transition"
            >
              Logout
            </button>
          )}
        </header>

        {/* Game Details */}
        <section className="flex flex-col items-center text-center">
          <img src={game.img} alt={game.title} className="w-64 h-64 object-cover rounded-lg mb-6" />
          <h2 className="text-4xl font-bold text-yellow-500 mb-4">{game.title}</h2>
          <p className="text-lg text-gray-300 max-w-2xl mb-6">{game.desc}</p>

          {/* Play Now Button */}
          <a href={game.playUrl} target="_blank" rel="noopener noreferrer">
            <button className="bg-yellow-500 text-black px-6 py-3 text-lg font-bold rounded-lg hover:bg-yellow-400 transition">
              Play now
            </button>
          </a>
        </section>
      </main>
    </div>
  );
}
