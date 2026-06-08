"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const TOKENS = [
  { name: "RITUAL", full: "Ritual Network", color: "#1A6B4A" },
  { name: "USDT", full: "Tether USD", color: "#26A17B" },
  { name: "USDC", full: "USD Coin", color: "#2775CA" },
  { name: "ETH", full: "Ethereum", color: "#627EEA" },
  { name: "WBTC", full: "Wrapped Bitcoin", color: "#F7931A" },
  { name: "DAI", full: "Dai Stablecoin", color: "#F5AC37" },
];

const RATES: Record<string, number> = {
  RITUAL: 1,
  USDT: 2.48,
  USDC: 2.47,
  ETH: 0.00082,
  WBTC: 0.000041,
  DAI: 2.48,
};

interface SwapProps {
  balances: Record<string, number>;
  onSwapped: (
    tokenIn: string,
    spent: number,
    tokenOut: string,
    received: number,
  ) => void;
}

export function SwapSection({ balances, onSwapped }: SwapProps) {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const [tokenIn, setTokenIn] = useState("RITUAL");
  const [tokenOut, setTokenOut] = useState("USDC");
  const [amtIn, setAmtIn] = useState("");
  const [swapping, setSwapping] = useState(false);
  const [txResult, setTxResult] = useState<{ ok: boolean; msg: string } | null>(
    null,
  );
  const [modalFor, setModalFor] = useState<"in" | "out" | null>(null);

  const amtOut = amtIn
    ? (
        ((parseFloat(amtIn) * RATES[tokenIn]) / RATES[tokenOut]) *
        0.997
      ).toFixed(6)
    : "";

  const balIn = balances[tokenIn] ?? 0;
  const balOut = balances[tokenOut] ?? 0;
  const insufficient = amtIn && parseFloat(amtIn) > balIn;

  function flipTokens() {
    setTokenIn(tokenOut);
    setTokenOut(tokenIn);
    setAmtIn("");
  }

  async function doSwap() {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }
    if (!amtIn || parseFloat(amtIn) <= 0) return;
    if (parseFloat(amtIn) > balIn) return;
    setSwapping(true);
    await new Promise((r) => setTimeout(r, 2000));
    setSwapping(false);
    const spent = parseFloat(amtIn);
    const received = parseFloat(amtOut);
    onSwapped(tokenIn, spent, tokenOut, received);
    setTxResult({
      ok: true,
      msg: `Swapped ${spent} ${tokenIn} → ${received.toFixed(4)} ${tokenOut}`,
    });
    setAmtIn("");
    setTimeout(() => setTxResult(null), 6000);
  }

  const tokenInData = TOKENS.find((t) => t.name === tokenIn)!;
  const tokenOutData = TOKENS.find((t) => t.name === tokenOut)!;

  return (
    <div className="px-4 pt-9 pb-10 max-w-md mx-auto">
      <h1 className="text-[28px] font-bold tracking-tight mb-1.5">
        Swap tokens
      </h1>
      <p className="text-[14px] text-gray-500 mb-6">
        Exchange RITUAL with other tokens on Ritual Testnet.
      </p>

      {txResult && (
        <div
          className={`border-2 rounded-xl p-3 mb-4 text-[13px] font-semibold flex items-center gap-2
          ${txResult.ok ? "bg-green-bg border-green text-green" : "bg-red-50 border-red-400 text-red-700"}`}
        >
          {txResult.ok ? "✅" : "❌"} {txResult.msg}
        </div>
      )}

      {/* Pay box */}
      <div
        className={`bg-cream border-2 rounded-2xl p-4 mb-1.5 ${insufficient ? "border-red-400" : "border-ink"}`}
      >
        <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-2.5">
          You pay
        </div>
        <div className="flex items-center gap-2.5">
          <input
            type="number"
            value={amtIn}
            onChange={(e) => setAmtIn(e.target.value)}
            placeholder="0.0"
            className="flex-1 text-[26px] font-bold bg-transparent border-none outline-none
              text-ink placeholder-gray-300 min-w-0"
          />
          <button
            onClick={() => setModalFor("in")}
            className="flex items-center gap-2 bg-white border-2 border-ink rounded-pill
              px-3 py-2 text-[13px] font-bold hover:bg-green-bg transition-colors whitespace-nowrap"
          >
            <span
              className="w-4 h-4 rounded-full inline-block"
              style={{ background: tokenInData.color }}
            />
            {tokenIn}
            <span className="text-gray-400 text-[11px]">▾</span>
          </button>
        </div>
        <div
          className={`text-[12px] mt-2 flex justify-between ${insufficient ? "text-red-500" : "text-gray-400"}`}
        >
          <span>
            Balance: {balIn.toFixed(4)} {tokenIn}
          </span>
          {insufficient && <span>Insufficient balance</span>}
        </div>
      </div>

      {/* Flip */}
      <div className="flex justify-center my-[-6px] relative z-10">
        <button
          onClick={flipTokens}
          className="w-9 h-9 rounded-full bg-white border-2 border-ink flex items-center justify-center
            hover:bg-green-bg hover:rotate-180 transition-all duration-200"
        >
          ⇅
        </button>
      </div>

      {/* Receive box */}
      <div className="bg-cream border-2 border-ink rounded-2xl p-4 mt-1.5">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-2.5">
          You receive
        </div>
        <div className="flex items-center gap-2.5">
          <input
            type="number"
            value={amtOut}
            readOnly
            placeholder="0.0"
            className="flex-1 text-[26px] font-bold bg-transparent border-none outline-none
              text-ink placeholder-gray-300 min-w-0"
          />
          <button
            onClick={() => setModalFor("out")}
            className="flex items-center gap-2 bg-white border-2 border-ink rounded-pill
              px-3 py-2 text-[13px] font-bold hover:bg-green-bg transition-colors whitespace-nowrap"
          >
            <span
              className="w-4 h-4 rounded-full inline-block"
              style={{ background: tokenOutData.color }}
            />
            {tokenOut}
            <span className="text-gray-400 text-[11px]">▾</span>
          </button>
        </div>
        <div className="text-[12px] text-gray-400 mt-2">
          Balance: {balOut.toFixed(4)} {tokenOut}
        </div>
      </div>

      {/* Rate */}
      <div className="flex justify-between text-[12px] text-gray-400 my-3 px-1">
        <span>
          1 {tokenIn} = {(RATES[tokenIn] / RATES[tokenOut]).toFixed(4)}{" "}
          {tokenOut}
        </span>
        <span>Slippage: 0.5%</span>
      </div>

      {/* Swap button */}
      <button
        onClick={doSwap}
        disabled={swapping || !amtIn || !!insufficient}
        className="w-full py-3.5 rounded-pill bg-ink text-white border-2 border-ink
          text-[14px] font-bold uppercase tracking-wide
          hover:bg-gray-800 active:scale-[0.98] transition-all
          disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed"
      >
        {swapping
          ? "Swapping..."
          : !isConnected
            ? "Connect wallet to swap"
            : insufficient
              ? "Insufficient balance"
              : "Swap"}
      </button>

      {/* Token picker modal */}
      {modalFor && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={() => setModalFor(null)}
        >
          <div
            className="bg-white border-2 border-ink rounded-card p-5 w-72 max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-[15px]">Select token</span>
              <button
                onClick={() => setModalFor(null)}
                className="text-gray-400 text-lg leading-none"
              >
                ✕
              </button>
            </div>
            {TOKENS.filter((t) =>
              modalFor === "in" ? t.name !== tokenOut : t.name !== tokenIn,
            ).map((t) => (
              <button
                key={t.name}
                onClick={() => {
                  if (modalFor === "in") setTokenIn(t.name);
                  else setTokenOut(t.name);
                  setAmtIn("");
                  setModalFor(null);
                }}
                className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-cream transition-colors"
              >
                <div
                  className="w-8 h-8 rounded-full flex-shrink-0"
                  style={{ background: t.color }}
                />
                <div className="text-left">
                  <div className="font-bold text-[14px]">{t.name}</div>
                  <div className="text-[12px] text-gray-400">{t.full}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
