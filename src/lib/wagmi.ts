import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";

// Ritual Testnet custom chain
export const ritualTestnet = defineChain({
  id: 1979,
  name: "Ritual Testnet",
  nativeCurrency: {
    name: "RITUAL",
    symbol: "RITUAL",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.ritualfoundation.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "Ritual Explorer",
      url: "https://explorer.ritualfoundation.org",
    },
  },
  testnet: true,
});

// Get a free WalletConnect Project ID at https://cloud.walletconnect.com
// Replace the string below with your own Project ID
export const config = getDefaultConfig({
  appName: "RitualDEX",
  projectId: "4e4495912c02e5136a0b6eeef2234136",
  chains: [ritualTestnet],
  ssr: true,
});
