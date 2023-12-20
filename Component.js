import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useWeb3Modal } from "@web3modal/wagmi-react-native";
import { useAccount, useContractWrite } from "wagmi";
import { fetchBalance } from "@wagmi/core";
import { useEffect } from "react";
import USDT_ABI from "./usdt-abi.json";

const USDT_CONTRACT_ADDRESS = "0x7FFB3d637014488b63fb9858E279385685AFc1e2";

export default function Component() {
  const { isConnected, address } = useAccount();
  const { open } = useWeb3Modal();
  const [balance, setBalance] = useState("0");
  const { writeAsync } = useContractWrite({
    address: USDT_CONTRACT_ADDRESS,
    abi: USDT_ABI,
    functionName: "approve",
  });

  useEffect(() => {
    const getBalance = async (address) => {
      const response = await fetchBalance({
        address: address,
      });
      setBalance(response.formatted);
    };

    if (address) {
      getBalance(address);
    }
  }, [address]);

  return (
    <View style={styles.container}>
      {isConnected && <Text style={styles.text}>{address}</Text>}
      {address && <Text style={styles.text}>{balance} MATIC</Text>}
      <Pressable style={styles.button} onPress={() => open()}>
        <Text style={styles.buttonText}>
          {isConnected ? "Open modal" : "Connect wallet"}
        </Text>
      </Pressable>
      {isConnected && (
        <Pressable
          style={styles.button}
          onPress={async () =>
            await writeAsync?.({
              args: [address, 100000],
            })
          }
        >
          <Text style={styles.buttonText}>Approve 1 USDT</Text>
        </Pressable>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 20,
  },
  button: {
    height: 30,
    width: "50%",
    backgroundColor: "black",
    borderRadius: 10,
    paddingTop: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  text: {
    color: "black",
    fontSize: 12,
  },
});
