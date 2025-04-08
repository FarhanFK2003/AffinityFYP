"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie
import { useRouter } from 'next/navigation'; // Import useRouter for redirection

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
      <aside className="bg-black text-white w-40 p-4 flex flex-col items-center space-y-4">
        <div className="text-yellow-500 text-3xl pt-[30px]">AFFINITY</div>
        <div className="flex flex-col space-y-6 mt-22">
          <div className="bg-yellow-500 w-12 h-12 rounded-full flex justify-center items-center text-black">📁</div>
          <div className="bg-yellow-500 w-12 h-12 rounded-full flex justify-center items-center text-black">🛒</div>
          <div className="bg-yellow-500 w-12 h-12 rounded-full flex justify-center items-center text-black">📊</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#171717] text-white p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 p-2 rounded-full text-white w-96"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
          />
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-500 w-12 h-12 rounded-full flex justify-center items-center text-black">🔔</div>
            <div className="bg-yellow-500 w-12 h-12 rounded-full flex justify-center items-center text-black">👤</div>
            {/* Display user name if available */}
            <span className="text-xl">{userName ? userName : 'Guest'}</span>
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
        <section className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">RECENTLY LAUNCHED</h2>
          {/* Display filtered games */}
          <div className="grid grid-cols-2 gap-10 max-w-2xl mx-auto">
            {filteredGames.length > 0 ? (
              filteredGames.map((game, index) => (
                <Link key={index} href={`/details/${game.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="w-[235px] h-[245px] rounded-lg overflow-hidden">
                    <img src={game.img} alt={game.title} className="w-full h-full object-cover" />
                  </div>
                </Link>
              ))
            ) : (
              <span className="text-gray-300">No games found</span>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
