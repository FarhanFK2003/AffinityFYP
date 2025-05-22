"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import Image from 'next/image';
// List of games
const gameData = {
  'galaxy-shooter': {
    title: 'Galaxy Shooter',
    img: '/images/game3.png',
    desc: 'An exciting space shooter game!',
    playUrl: 'https://farhanfk2003.itch.io/space-shooter-pro',
  },
  'super-mario': {
    title: 'Super Mario',
    img: '/images/game3.svg',
    desc: 'The classic Super Mario experience!',
    playUrl: 'https://farhanfk2003.itch.io/solar-system',
  },
};

export default function Page() {
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGames, setFilteredGames] = useState(Object.values(gameData)); // Initialize with all games
  const router = useRouter(); // For redirection

  useEffect(() => {
    // Read the user from cookies
    const user = Cookies.get('user'); // Assumes the user object is stored as a JSON string in cookies
    if (user) {
      const parsedUser = JSON.parse(user); // Parse the user object
      setUserName(parsedUser.username); // Assuming 'username' is a property in the user object
    }
  }, []);

  useEffect(() => {
    // Filter games based on search query
    const filtered = Object.values(gameData).filter(game =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredGames(filtered);
  }, [searchQuery]);

  const handleLogout = () => {
    // Remove the user cookie
    Cookies.remove('user');
    Cookies.remove('token');
    // Redirect to login page
    router.push('/login');
  };

  return (
    <div className="background h-screen flex">
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
              className="bg-yellow-500 text-black px-6 py-2 text-lg font-bold rounded-lg hover:bg-yellow-400 transition"
            >
              Logout
            </button>
          )}
        </header>

        {/* Recently Launched */}
        <section className="flex flex-col ">
          <div className='flex min-w-[879px] mx-auto bg-[#D9D9D966] mb-[54px] rounded-[22.5px] px-[27px] py-[11px] items-center  gap-2'>
            <Image src="/search.svg" alt="search" width={24} height={24} />

            <input
              type="text"
              placeholder="Search Here..."
              className="  outline-none rounded-full w-full text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
            />
          </div>
          <div>
            <h2 className="text-[32px] leading-[100%] font-400 mb-4">RECENTLY LAUNCHED</h2>
            {/* Display filtered games */}
            <div className="grid grid-cols-3 gap-10 max-w-[879px] mx-auto mt-[61px]">
              {filteredGames.length > 0 ? (
                filteredGames.map((game, index) => (
                  <Link key={index} href={`/details/${game.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="w-[235px] h-[245px] rounded-lg overflow-hidden">
                      <img src={game.img} alt={game.title} className="w-full h-full object-cover rounded-[50px]" />
                    </div>
                  </Link>
                ))
              ) : (
                <span className="text-gray-300">No games found</span>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
