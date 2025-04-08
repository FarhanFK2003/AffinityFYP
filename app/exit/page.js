import Link from 'next/link';

export default function ExitScreen() {
  return (
    <div className="bg-black text-white h-screen flex flex-col justify-center items-center space-y-8">
      <h1 className="text-5xl font-bold text-yellow-500">SUPER MARIO</h1>
      <div className="relative rounded-lg p-2 glow-border">
        <img src="/images/game2.svg" alt="Blurred Super Mario" className="rounded-lg blur-background w-[600px] h-auto" />
        <Link href="/">
          <a className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black font-bold px-8 py-2 rounded-full hover:bg-yellow-400 transition">
            EXIT
          </a>
        </Link>
      </div>
    </div>
  );
}