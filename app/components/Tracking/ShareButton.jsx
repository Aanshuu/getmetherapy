'use client';
import { usePathname } from 'next/navigation';

export default function ShareButton({ speed }) {
  const pathname = usePathname();

  const handleShareClick = () => {
    const url = `${window.location.origin}${pathname}?speed=${speed}`;
    navigator.clipboard.writeText(url).then(() => {
      alert("URL copied to clipboard!");
    });
  };

  return (
    <button
      onClick={handleShareClick}
      className="bg-[#FE8C00] w-[300px] p-2 text-white rounded-full"
    >
      Share
    </button>
  );
}
