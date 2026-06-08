"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

interface FaucetProps {
  balance: number;
  totalClaimed: number;
  claimers: number;
  onClaimed: (amount: number) => void;
}

const POOL_START = 142.5;
const CLAIM_AMOUNT = 0.005;
const COOLDOWN_MS = 24 * 60 * 60 * 1000;

export function FaucetSection({
  balance,
  totalClaimed,
  claimers,
  onClaimed,
}: FaucetProps) {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [inputAddr, setInputAddr] = useState("");
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [now, setNow] = useState(Date.now());

  // Auto-fill address
  useEffect(() => {
    if (address) setInputAddr(address);
  }, [address]);

  // Timer tiap detik
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Cooldown per wallet dari localStorage
  const storageKey = address ? `claimedAt_${address}` : null;
  const walletClaimedAt = storageKey
    ? parseInt(localStorage.getItem(storageKey) ?? "0") || null
    : null;
  const cooldownRemaining = walletClaimedAt
    ? Math.max(0, COOLDOWN_MS - (now - walletClaimedAt))
    : 0;
  const onCooldown = cooldownRemaining > 0;

  function formatCooldown(ms: number) {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${h}h ${m}m ${s}s`;
  }

  async function doClaim() {
    if (!inputAddr || inputAddr.length < 10) return;
    if (onCooldown) return;
    setClaiming(true);
    await new Promise((r) => setTimeout(r, 1800));
    setClaiming(false);
    setClaimed(true);
    onClaimed(CLAIM_AMOUNT);
    if (storageKey) localStorage.setItem(storageKey, Date.now().toString());
    setTimeout(() => setClaimed(false), 6000);
  }

  const poolBal = Math.max(0, POOL_START - totalClaimed);

  return (
    <div className="px-4 pt-9 pb-10 max-w-lg mx-auto">
      <h1 className="text-[28px] font-bold tracking-tight mb-1.5">
        Claim test RITUAL
      </h1>
      <p className="text-[14px] text-gray-500 mb-6">
        Free testnet tokens — one claim per address every 24 hours.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2.5 mb-6">
        {[
          { label: "Pool", value: poolBal.toFixed(3), unit: "RITUAL" },
          { label: "Claimed", value: totalClaimed.toFixed(3), unit: "RITUAL" },
          { label: "Claimers", value: claimers.toString(), unit: "wallets" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-cream border-2 border-ink rounded-xl p-3"
          >
            <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1">
              {s.label}
            </div>
            <div className="text-[20px] font-bold">{s.value}</div>
            <div className="text-[11px] text-gray-400 mt-0.5">{s.unit}</div>
          </div>
        ))}
      </div>

      {/* Notice */}
      <div className="bg-green-bg border-2 border-ink rounded-xl p-3.5 mb-5 text-[13px] text-green leading-relaxed">
        ⚠️ This is a <strong>mock faucet</strong> for demo. No real transaction
        yet.
      </div>

      {/* Your balance */}
      <div className="bg-cream border-2 border-ink rounded-xl p-3.5 mb-5 flex justify-between items-center">
        <span className="text-[13px] text-gray-500 font-semibold">
          Your RITUAL balance
        </span>
        <span className="text-[18px] font-bold">
          {balance.toFixed(3)} RITUAL
        </span>
      </div>

      {/* Cooldown */}
      {onCooldown && (
        <div
          className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-3 mb-4
          text-[13px] text-yellow-700 font-semibold flex items-center gap-2"
        >
          ⏳ Cooldown: {formatCooldown(cooldownRemaining)}
        </div>
      )}

      {/* Success */}
      {claimed && (
        <div
          className="bg-green-bg border-2 border-green rounded-xl p-3 mb-4
          text-[13px] text-green font-semibold flex items-center gap-2"
        >
          ✅ Claimed {CLAIM_AMOUNT} RITUAL successfully!
        </div>
      )}

      {/* Input */}
      <label className="block text-[12px] font-semibold uppercase tracking-wide text-gray-500 mb-2">
        Wallet address
      </label>
      <input
        type="text"
        value={inputAddr}
        onChange={(e) => setInputAddr(e.target.value)}
        placeholder="0x..."
        className="w-full px-3.5 py-3 text-[14px] border-2 border-ink rounded-xl
          font-mono outline-none focus:border-green transition-colors mb-4 bg-white"
      />

      {!isConnected ? (
        <button
          onClick={openConnectModal}
          className="w-full py-3.5 rounded-pill bg-green text-white border-2 border-ink
            text-[14px] font-bold uppercase tracking-wide
            hover:bg-[#145539] active:scale-[0.98] transition-all"
        >
          Connect wallet to claim
        </button>
      ) : (
        <button
          onClick={doClaim}
          disabled={claiming || claimed || onCooldown}
          className="w-full py-3.5 rounded-pill bg-ink text-white border-2 border-ink
            text-[14px] font-bold uppercase tracking-wide
            hover:bg-gray-800 active:scale-[0.98] transition-all
            disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed"
        >
          {claiming
            ? "Claiming..."
            : claimed
              ? "Claimed!"
              : onCooldown
                ? formatCooldown(cooldownRemaining)
                : "Claim 0.005 RITUAL"}
        </button>
      )}
      <p className="text-center text-[12px] text-gray-400 mt-2.5">
        Cooldown: 24 hours per address
      </p>
    </div>
  );
}
