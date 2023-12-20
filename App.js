import "@walletconnect/react-native-compat";
import { WagmiConfig } from "wagmi";
import { polygon } from "viem/chains";
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
} from "@web3modal/wagmi-react-native";
import Component from "./Component";

const projectId = "253d21a00f517cbe554d01eef6801546";

const metadata = {
  name: "web3modal-rn-test",
  description: "web3modal-rn-test",
  url: "https://web3modal.com",
  icons: [],
};

const chains = [polygon];

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ projectId, chains, wagmiConfig });

export default function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Component />
      <Web3Modal />
    </WagmiConfig>
  );
}
