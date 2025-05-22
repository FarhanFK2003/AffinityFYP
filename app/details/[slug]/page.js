"use client";
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import Image from 'next/image';
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
      <aside className="bg-black text-white w-[159px] flex flex-col justify-between items-center py-[34px]">
        <Image src="/logo.svg" alt="logo" width={90} height={16} />
        <div className="flex flex-col gap-[50px] mt-22">
          <div className='p-[9px] rounded-[10px] bg-[#FFBB00]'>
          <Image src="/home.svg" alt="home" width={24} height={24} />
          </div>
          <div className='p-[9px] rounded-[10px] '>
          <Image src="/db.svg" alt="home" width={24} height={24} />
          </div>
          <div className='p-[9px] rounded-[10px] '>
          <Image src="/store.svg" alt="home" width={24} height={24} />
          </div>
          <div className='p-[9px] rounded-[10px] '>
          <Image src="/board.svg" width={24} height={24} alt='board' />
          </div>
        </div>
        <Image src="/logout.svg" alt="logout" width={24} height={24} />
      </aside>
      {/* Main Content */}
      <main className="flex-1 bg-[#171717] max-h-screen overflow-y-auto text-white p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div className='flex items-center justify-center flex-1 gap-2'>
            <Image src="/logo.svg" alt="bell" width={422} height={77} />

          </div>

          <div className="flex items-center space-x-4">
            {/* Display user name if available */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                {(userName ? userName[0] : 'G').toUpperCase()}
              </div>
              <span className="text-xl">{userName ? userName : 'Guest'}</span>
            </div>
          </div>
          {/* Logout Button */}
          {userName && (
            <button
              onClick={handleLogout}
              className="bg-[#FFBB00] text-black px-6 py-2 text-lg font-bold rounded-lg hover:bg-[#FFBB00] transition"
            >
              Logout
            </button>
          )}
        </header>

        {/* Game Details */}
        <section className="flex flex-col items-center text-center">
          <img src={game.img} alt={game.title} className="w-64 h-64 object-cover rounded-[50px] mb-6" />
          <h2 className="text-4xl font-bold text-[#FFBB00] mb-4">{game.title}</h2>
          <p className="text-lg text-gray-300 max-w-2xl mb-6">{game.desc}</p>

          {/* Play Now Button */}
          <a href={game.playUrl} target="_blank" rel="noopener noreferrer">
            <button  style={{
                background: 'linear-gradient(92.09deg, #FFBB00 9.67%, #3FB783 84.7%)'
              }} className=" text-black px-6 py-3 text-lg font-bold rounded-lg hover:bg-yellow-400 transition">
              Play now
            </button>
          </a>
        </section>
      </main>
    </div>
  );
}
