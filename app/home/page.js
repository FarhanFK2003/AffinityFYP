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
    desc: 'An exciting space shooter game where you battle through the cosmos!',
    playUrl: 'https://farhanfk2003.itch.io/space-shooter-pro',
    apkUrl: '/apks/galaxy-shooter.apk'
  },
  'crash-lander': {
    title: 'Crash Lander',
    img: '/images/crash.jpeg',
    desc: 'Navigate through challenging terrain in this thrilling crash landing adventure!',
    playUrl: 'https://crashlander-bucket.s3.eu-north-1.amazonaws.com/index.html',
    apkUrl: '/apks/color-crash.apk'
  },
  'super-space-stranout': {
    title: 'Super Space Stranout',
    img: '/images/super-spane-stranout.jpeg',
    desc: 'Embark on an epic space adventure in this action-packed platformer!',
    playUrl: 'https://superspacestronaut-bucket.s3.eu-north-1.amazonaws.com/index.html',
    apkUrl: '/apks/super-spane-stranout.apk'
  },
  'insect-planet': {
    title: 'Insect Planet',
    img: '/images/inspect-planet.jpeg',
    desc: 'Explore and investigate mysterious planets in this captivating adventure!',
    playUrl: 'https://insectplanet-bucket.s3.eu-north-1.amazonaws.com/index.html',
    apkUrl: '/apks/inspect-planet.apk'
  },
  'space-stranout-64': {
    title: 'Space Stranout 64',
    img: '/images/space-stanout-64.jpeg',
    desc: 'A retro-style space adventure with modern gameplay mechanics!',
    playUrl: 'https://spacestronaut64-bucket.s3.eu-north-1.amazonaws.com/index.html',
    apkUrl: '/apks/space-stanout-64.apk'
  },
};


const mobileGames = {
  'color-clash': {
    title: 'Color Clash',
    img: '/images/color-clash.jpeg',
    apkUrl: '/apks/color-clash.apk'
  },
  'ants-vs-bees': {
    title: 'Ants vs Bees',
    img: '/images/ants-vs-bees.jpeg',
    apkUrl: '/apks/ants-vs-bees.apk'
  },
  'galaxy-shooter': {
    title: 'Galaxy Shooter',
    img: '/images/game3.png',
    apkUrl: '/apks/galaxy-shooter.apk'
  }
};
export default function Page() {
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGames, setFilteredGames] = useState(Object.values(gameData)); // Initialize with all games
  const [mobilefilteredGames, setMobileFilteredGames] = useState(Object.values(mobileGames));
  const router = useRouter(); // For redirection

  // useEffect(() => {
  //   // Read the user from cookies
  //   const user = Cookies.get('user'); // Assumes the user object is stored as a JSON string in cookie
  //   if (user) {
  //     const parsedUser = JSON.parse(user); // Parse the user object
  //     setUserName(parsedUser.username); // Assuming 'username' is a property in the user object
  //   }
  // }, []);

  useEffect(() => {
    // Filter games based on search query
    const filtered = Object.values(gameData).filter(game =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredGames(filtered);
  }, [searchQuery]);

  useEffect(() => {
    // Filter games based on search query
    const filtered = Object.values(mobileGames).filter(game =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setMobileFilteredGames(filtered);
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
      <aside className="bg-black  text-white w-[159px] hidden lg:flex flex-col justify-between items-center py-[34px]">
        <Image src="/logo.svg" alt="logo" width={90} height={16} />

        <div className="flex flex-col gap-[50px] mt-22">
          <Link href='/home'>
            <div className='p-[9px] rounded-[10px] bg-[#FFBB00]'>
              <Image src="/home.svg" alt="home" width={24} height={24} />
            </div>
          </Link>
          <div className='p-[9px] rounded-[10px] '>
            <Image src="/db.svg" alt="home" width={24} height={24} />
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
        <header className="flex items-center justify-between mb-6 gap-2">
          <div className='flex items-center justify-center flex-1 gap-2'>
            <Image src="/logo.svg" alt="bell" width={422} height={77} className='sm:w-auto w-[200px]' />

          </div>

          <div className="flex items-center space-x-4">
            {/* Display user name if available */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm sm:text-lg">
                {(userName ? userName[0] : 'G').toUpperCase()}
              </div>
              <span className="text-sm sm:text-xl">{userName ? userName : 'Guest'}</span>
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
          <div className='flex lg:min-w-[879px] mx-auto bg-[#D9D9D966] mb-[54px] rounded-[22.5px] px-[27px] py-[11px] items-center  gap-2'>
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
            <h2 className="text-sm sm:text-[32px]  leading-[100%] font-400 mb-4">RECENTLY LAUNCHED</h2>
            {/* Display filtered games */}
            <div className=" hidden sm:grid  sm:grid-cols-2  md:grid-cols-3 gap-10 max-w-[879px] mx-auto mt-[61px]">
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
            <div className='sm:hidden grid gap-6'>
              {Object.values(mobilefilteredGames).map((game, index) => (
                <Link key={index} href={`/details/${game.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div key={index}>
                    <img src={game.img} alt={game.title} className="w-full h-full object-cover rounded-[50px]" />
                  </div>
                </Link>
              ))}

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
