'use client'

import React from 'react'
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const gameData = {
  'galaxy-shooter': {
    title: 'Galaxy Shooter',
    img: '/images/game3.png',
    desc: 'An exciting space shooter game!',
    playUrl: 'https://spaceshooter-bucket.s3.eu-north-1.amazonaws.com/index.html',
  },
  'crash-lander': {
    title: 'Crash Lander',
    img: '/images/crash.jpeg',
    desc: 'Navigate through challenging terrain in this thrilling crash landing adventure!',
    playUrl: 'https://crashlander-bucket.s3.eu-north-1.amazonaws.com/index.html',
    apkUrl: '/apks/color-crash.apk'
  },
  'super-space-stranout':{
    title: 'Super Space Stranout',
    img: '/images/super-spane-stranout.jpeg',
    desc: 'Embark on an epic space adventure in this action-packed platformer!',
    playUrl: 'https://superspacestronaut-bucket.s3.eu-north-1.amazonaws.com/index.html',
    apkUrl: '/apks/super-spane-stranout.apk'
  },
  'insect-planet':{
    title: 'Insect Planet',
    img: '/images/inspect-planet.jpeg',
    desc: 'Explore and investigate mysterious planets in this captivating adventure!',
    playUrl: 'https://insectplanet-bucket.s3.eu-north-1.amazonaws.com/index.html',
    apkUrl: '/apks/inspect-planet.apk'
  },
  'space-stranout-64':{
    title: 'Space Stranout 64',
    img: '/images/space-stanout-64.jpeg',
    desc: 'A retro-style space adventure with modern gameplay mechanics!',
    playUrl: 'https://spacestronaut64-bucket.s3.eu-north-1.amazonaws.com/index.html',
    apkUrl: '/apks/space-stanout-64.apk'
  },
};
const Page = () => {
     const { slug } = useParams();
      const game = gameData[slug] || {};
      const router = useRouter();

      console.log(game)
  return (

    <div className='w-[100vw] min-h-[100vh] overflow-y-auto h-[100vh]  bg-[#171717]'>
        <header className="flex pt-5 items-center flex-col">
          <Link href='/home'>
          <button  className='absolute text-[#FFBB00] rounded-full p-2 top-5 left-1 sm:left-5  cursor-pointer text-2xl font-bold'>
            Back
          </button>
          </Link>
          <div className='flex items-center justify-center flex-1 gap-2'>
          <Image src="/logo.svg" alt="bell" width={422} height={77} className='sm:w-auto w-[200px]' />

          </div>

        <h1 className='text-white text-3xl mb-3 md:text-5xl mt-3 font-bold'>{game.title}</h1>
        </header>

    <iframe
    src={game.playUrl} 
    title="Galaxy Shooter"
    width="100%"
    height="100%"
   
    allowFullScreen
  >
  </iframe>
  </div>
  )
}

export default Page