# RitualDEX

Faucet + Swap dapp for Ritual Testnet (Chain 1979).
Built with Next.js 14, RainbowKit, wagmi, viem.

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Get a WalletConnect Project ID (free)
- Go to https://cloud.walletconnect.com
- Create a project → copy the Project ID
- Open `src/lib/wagmi.ts`
- Replace `'YOUR_WALLETCONNECT_PROJECT_ID'` with your actual ID

### 3. Run dev server
```bash
npm run dev
```
Open http://localhost:3000

### 4. Add Ritual Testnet to MetaMask manually (first time)
- Network name: Ritual Testnet
- RPC URL: https://rpc.ritualfoundation.org
- Chain ID: 1979
- Currency symbol: RITUAL
- Explorer: https://explorer.ritualfoundation.org

RainbowKit will prompt users to add the network automatically when they connect.

## Wallet support
RainbowKit supports out of the box:
- MetaMask
- Rabby
- OKX Wallet
- WalletConnect (400+ mobile wallets)
- Coinbase Wallet
- Rainbow
- Trust Wallet
- And more

## Production notes
- `FaucetSection.tsx` → replace `doClaim()` mock with real contract call
- `SwapSection.tsx` → replace `doSwap()` mock with real DEX/pool contract call
- Deploy to Vercel: `vercel deploy`
