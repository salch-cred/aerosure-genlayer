import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider, createConfig } from '@privy-io/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { defineChain } from 'viem';

// Setup TanStack Query
const queryClient = new QueryClient();

// Define GenLayer Testnet
const genlayerTestnet = defineChain({
  id: 298118, // Mock ID for GenLayer
  name: 'GenLayer Testnet',
  nativeCurrency: { name: 'GEN', symbol: 'GEN', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet.genlayer.network/rpc'] },
    public: { http: ['https://testnet.genlayer.network/rpc'] },
  },
});

// Configure Wagmi
const wagmiConfig = createConfig({
  chains: [genlayerTestnet],
  transports: {
    [genlayerTestnet.id]: http(),
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId="clx123abc456def789xyz" // Placeholder App ID
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'light',
          accentColor: '#2563eb', // Brand color
          logo: 'https://hugeicons.com/icons/airplane-01.svg',
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
