"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

interface NavbarProps {
  activeTab: "home" | "faucet" | "swap";
  onTabChange: (tab: "home" | "faucet" | "swap") => void;
}

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between px-7 py-3.5 border-2 border-ink rounded-pill mx-4 mt-4 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2 font-bold text-[17px] tracking-tight">
        <img src="/logo.png" alt="/logo.png" className="w-7 h-7 rounded-full" />{" "}
        Ritual
      </div>

      {/* Tabs */}
      <div className="flex gap-7">
        {(["home", "faucet", "swap"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`text-[13px] font-semibold uppercase tracking-wide pb-0.5 border-b-2 transition-colors capitalize
              ${
                activeTab === tab
                  ? "border-ink text-ink"
                  : "border-transparent text-gray-500 hover:text-ink"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ConnectButton */}
      <ConnectButton />
    </nav>
  );
}
