import React from "react";
import { Phone } from "lucide-react";

function ZaloIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="10" fill="#0068FF" />
      <path
        d="M7.8 10.2c0-2.1 1.8-3.8 4-3.8 2.2 0 4 1.7 4 3.8 0 2.1-1.8 3.8-4 3.8-2.2 0-4-1.7-4-3.8z"
        fill="#fff"
      />
      <path
        d="M9.4 12.2c.25.2.8.45 1.8.45 1.03 0 1.55-.26 1.8-.45.45-.34.65-.8.65-1.15 0-.47-.23-.9-.65-1.2-.25-.18-.8-.44-1.8-.44-1 0-1.55.26-1.8.44-.42.3-.65.72-.65 1.2 0 .36.2.81.65 1.15z"
        fill="#0068FF"
      />
    </svg>
  );
}

type Props = {
  phone: string;
  zalo: string;
};

export default function ContactFixed({ phone, zalo }: Props) {
  const telLink = `tel:${phone.replace(/\s+/g, "")}`;
  const zaloLink = `https://zalo.me/${zalo.replace(/\s+/g, "")}`;

  return (
    <div className="fixed right-4 bottom-6 flex flex-col gap-3 z-50">
      {/* Zalo */}
      <a
        href={zaloLink}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-full shadow-lg bg-white hover:scale-105 transition"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600">
          <ZaloIcon className="w-5 h-5" />
        </div>
        <span className="text-sm text-slate-700 font-medium">Chat Zalo</span>
      </a>

      {/* Phone */}
      <a
        href={telLink}
        className="flex items-center gap-2 px-4 py-2 rounded-full shadow-lg bg-white hover:scale-105 transition"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white">
          <Phone size={18} />
        </div>
        <span className="text-sm text-slate-700 font-medium">Gọi {phone}</span>
      </a>
    </div>
  );
}
