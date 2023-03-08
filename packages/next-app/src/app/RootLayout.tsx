"use client";

import { Pool } from "@balancer-pool-metadata/balancer-gql/src/gql/__generated__/mainnet";
import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount, useNetwork, WagmiConfig } from "wagmi";

import { OwnedPool } from "../components/OwnedPool";
import gql from "../lib/gql";
import { chains, client } from "../wagmi";

export function RootLayout({ children }: { children: React.ReactNode }) {
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("networkId", chain?.id?.toString() || "1");

    router.refresh();
  }, [chain]);

  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <Header />
        {isConnected ? (
          <div className="flex h-full">
            <div className="h-full w-96">
              <div className="h-full w-full">
                <Sidebar />
              </div>
            </div>

            {children}
          </div>
        ) : (
          <WalletEmptyState />
        )}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export function Header() {
  return (
    <div className="flex flex-wrap items-center justify-between bg-gray-700 p-4 text-white">
      <div className="mr-5 flex items-center">
        <h1 className="text-lg font-medium tracking-tighter md:text-xl">
          Balancer Pool Metadata
        </h1>
      </div>

      <ConnectButton />
    </div>
  );
}

export function Sidebar() {
  const { address } = useAccount();
  const { data } = gql.usePool({
    owner: address,
  });

  const [selectedPool, setSelectedPool] = useState<string | null>(null);

  const handleButtonClick = (index: string | null) => {
    setSelectedPool(index === selectedPool ? null : index);
  };

  return (
    <div className="h-full w-96 max-w-full bg-gray-900 p-5">
      <div className="h-screen w-96 max-w-full items-start justify-start space-y-4">
        <div className="items-start justify-start space-y-2.5 self-stretch bg-gray-900 px-2">
          <div className="flex items-center justify-start space-x-0 text-2xl font-medium text-gray-400">
            <span>Owned pools</span>
          </div>
        </div>
        <div className="relative max-h-[40rem] self-stretch overflow-auto rounded-md border border-gray-700 bg-gray-800">
          {data?.pools &&
            data.pools.map((item) => (
              <OwnedPool
                key={item.id}
                onClick={() => handleButtonClick(item.id)}
                isSelected={item.id === selectedPool}
                pool={item as Pool}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export function WalletEmptyState() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <h1 className="text-center text-xl font-normal leading-6 text-white opacity-80 md:text-2xl md:leading-9">
        Welcome to Balancer Pool Metadata, please connect your wallet
      </h1>
    </div>
  );
}