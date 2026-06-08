"use client";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

interface HomeProps {
  onGoFaucet: () => void;
  onGoSwap: () => void;
}

export function HomeSection({ onGoFaucet, onGoSwap }: HomeProps) {
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();

  return (
    <div className="px-4 pt-9 pb-10 max-w-2xl mx-auto">
      {/* Chain badge */}
      <div
        className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-wide
        bg-cream border-2 border-ink rounded-pill px-3 py-1.5 mb-7"
      >
        <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
        Live · Ritual Testnet · Chain 1979
      </div>

      <h1 className="text-[38px] font-bold tracking-tight leading-tight mb-7">
        How To Get Started
      </h1>

      <div
        className="grid grid-cols-2 gap-3.5"
        style={{ gridTemplateRows: "auto auto" }}
      >
        {/* Step 1 — featured, spans 2 rows */}
        <div className="border-2 border-ink rounded-card p-6 bg-green-bg row-span-2 flex flex-col justify-between">
          <div>
            <div
              className="w-8 h-8 rounded-full bg-green border-2 border-ink flex items-center justify-center
              text-white text-[13px] font-bold mb-5"
            >
              1
            </div>
            <h2 className="text-[26px] font-bold tracking-tight leading-tight mb-2.5">
              Connect Your Wallet
            </h2>
            <p className="text-[14px] text-gray-600 leading-relaxed mb-7">
              Connect MetaMask, OKX, Rabby, or any hot wallet. Make sure
              you&apos;re on Ritual Testnet (Chain ID: 1979).
            </p>
          </div>
          <button
            onClick={() => openConnectModal?.()}
            className="w-full bg-green text-white border-2 border-ink rounded-pill
              py-3 text-[13px] font-bold uppercase tracking-wide
              hover:bg-[#145539] active:scale-[0.98] transition-all"
          >
            {isConnected ? "Go to faucet →" : "Connect wallet"}
          </button>
        </div>

        {/* Step 2 */}
        <button
          onClick={onGoFaucet}
          className="border-2 border-ink rounded-card p-6 bg-white text-left
            hover:-translate-y-0.5 active:scale-[0.98] transition-transform"
        >
          <div
            className="w-8 h-8 rounded-full bg-green-light border-2 border-ink flex items-center justify-center
            text-ink text-[13px] font-bold mb-4"
          >
            2
          </div>
          <h3 className="text-[20px] font-bold tracking-tight mb-2">
            Claim Faucet
          </h3>
          <p className="text-[13px] text-gray-500 leading-relaxed">
            Get free RITUAL testnet tokens to cover gas fees and start
            interacting.
          </p>
        </button>

        {/* Step 3 */}
        <button
          onClick={onGoSwap}
          className="border-2 border-ink rounded-card p-6 bg-white text-left
            hover:-translate-y-0.5 active:scale-[0.98] transition-transform"
        >
          <div
            className="w-8 h-8 rounded-full bg-green-light border-2 border-ink flex items-center justify-center
            text-ink text-[13px] font-bold mb-4"
          >
            3
          </div>
          <h3 className="text-[20px] font-bold tracking-tight mb-2">
            Swap Tokens
          </h3>
          <p className="text-[13px] text-gray-500 leading-relaxed">
            Swap RITUAL with USDT, USDC, ETH and more — all on Ritual Testnet.
          </p>
        </button>
      </div>
    </div>
  );
}
