"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HomeSection } from "@/components/HomeSection";
import { FaucetSection } from "@/components/FaucetSection";
import { SwapSection } from "@/components/SwapSection";

type Tab = "home" | "faucet" | "swap";

export default function Page() {
  const [tab, setTab] = useState<Tab>("home");
  const [balances, setBalances] = useState<Record<string, number>>({
    RITUAL: 0,
    USDT: 0,
    USDC: 0,
    ETH: 0,
    WBTC: 0,
    DAI: 0,
  });
  const [claimedAt, setClaimedAt] = useState<number | null>(null);
  const [totalClaimed, setTotalClaimed] = useState(0);
  const [claimers, setClaimers] = useState(568);

  function handleClaimed(amt: number) {
    setBalances((prev) => ({ ...prev, RITUAL: prev.RITUAL + amt }));
    setClaimedAt(Date.now());
    setTotalClaimed((prev) => prev + amt);
    setClaimers((prev) => prev + 1);
  }

  function handleSwapped(
    tokenIn: string,
    spent: number,
    tokenOut: string,
    received: number,
  ) {
    setBalances((prev) => ({
      ...prev,
      [tokenIn]: Math.max(0, prev[tokenIn] - spent),
      [tokenOut]: prev[tokenOut] + received,
    }));
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar activeTab={tab} onTabChange={setTab} />
      {tab === "home" && (
        <HomeSection
          onGoFaucet={() => setTab("faucet")}
          onGoSwap={() => setTab("swap")}
        />
      )}
      {tab === "faucet" && (
        <FaucetSection
          balance={balances.RITUAL}
          totalClaimed={totalClaimed}
          claimers={claimers}
          onClaimed={handleClaimed}
        />
      )}
      {tab === "swap" && (
        <SwapSection balances={balances} onSwapped={handleSwapped} />
      )}
    </div>
  );
}
