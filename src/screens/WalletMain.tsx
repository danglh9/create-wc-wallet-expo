import "fast-text-encoding";
import "@walletconnect/react-native-compat";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { SignClientTypes, SessionTypes } from "@walletconnect/types";
import { getSdkError } from "@walletconnect/utils";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import useInitialization, {
  currentETHAddress,
  web3wallet,
  web3WalletPair,
} from "../utils/WalletConnectUtils";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import PairingModal from "./PairingModal";
import { EIP155_SIGNING_METHODS } from "../utils/EIP155Lib";
import SignModal from "./SignModal";
import { Wallet, ethers, providers } from "ethers";
import MyText from "../component/MyText";

import {
  getLocalStorage,
  restoreEIP155Wallet,
  setLocalStorage,
} from "../utils/EIP155Wallet";
import { CoinScreen } from "./CoinScreen";
import SendTransactionScreen from "./SendTransactionScreen";
const RPC = "https://goerli.infura.io/v3/20107bdcb0844ae2894c301166e5a723";
const PRIVATE_KEY =
  "09e15ebe6c44164105a7c9f992d79d61142479cafc74fc1118ca3cbe654c1174";
export default function WalletMain({ navigation }) {
  useInitialization();
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [mnemonic, setMnemonic] = useState("");
  const [showPopupSend, setShowPopupSend] = useState(false);
  // const [inputTextPrivateKey, setInputTextPrivateKey] = useState("");

  useEffect(() => {
    // restoreWallet();
  }, []);

  async function restoreWallet() {
    let _mnemonic = await getLocalStorage();
    console.log(typeof _mnemonic);

    if (_mnemonic != undefined) {
      const wallet = ethers.Wallet.fromMnemonic(_mnemonic);
      setMnemonic(wallet.mnemonic.phrase);
      setPrivateKey(wallet.privateKey);
      setLocalStorage(wallet.mnemonic.phrase);
      setAddress(wallet.address);
    }
  }

  function createNewWallet() {
    const wallet = ethers.Wallet.createRandom();
    setAddress(wallet.address);
    setMnemonic(wallet.mnemonic.phrase);
    setPrivateKey(wallet.privateKey);
    setLocalStorage(wallet.mnemonic.phrase);
  }

  function sendTransaction() {
    const provider = new ethers.providers.JsonRpcProvider(RPC);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const transaction = {
      to: "0xFa4A9861a2A4d30568bC05437E50ED27324CB915",
      value: ethers.utils.parseEther("0.000001"), // Chuyển đổi số Ether thành wei
    };

    wallet
      .sendTransaction(transaction)
      .then((transactionResponse) => {
        console.log("Giao dịch được gửi, hash:", transactionResponse.hash);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi giao dịch: ", error);
      });
  }

  function getHistory() {
    const provider = new ethers.providers.JsonRpcProvider(RPC);
    const filter = {
      address: "0x68f8dB77Bb0FaC1c54cD0aF94C0C3d0E454acf4C",
      fromBlock: 0, // Block bắt đầu
      toBlock: 9819902, // Block hiện tại
    };
    // provider.get
    let etherscanProvider = new ethers.providers.EtherscanProvider(
      5,
      "X769TY7S323QHI9U3UDNQMTKACBW9EZT6X"
    );
    console.log(etherscanProvider);

    etherscanProvider
      .getHistory(address, 9819679, 9819902)
      .then((history) => {
        history.forEach((tx) => {
          console.log(tx.from, tx.to, parseInt(tx.value._hex, 16));
        });
      })
      .catch((error) => {
        console.error("Lỗi khi lấy lịch sử giao dịch: ", error);
      });
    // provider
    //   .getLogs(filter)
    //   .then((a) => {
    //     console.log("Lịch sử giao dịch:", a);
    //   })
    //   .catch((error) => {
    //     console.error("Lỗi khi lấy lịch sử giao dịch: ", error);
    //   });
    // provider
    //   .getLogs(filter)
    //   .then((a) => {
    //     console.log("Lịch sử giao dịch:", a);
    //   })
    //   .catch((error) => {
    //     console.error("Lỗi khi lấy lịch sử giao dịch: ", error);
    //   });
  }

  function getBalanceToken(tokenAddress: string) {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://goerli.infura.io/v3/20107bdcb0844ae2894c301166e5a723"
    );
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ["function balanceOf(address) view returns (uint)"],
      wallet
    );

    tokenContract
      .balanceOf(address)
      .then((tokenBalance) => {
        console.log(`Số dư token ERC-20: ${tokenBalance.toString()}`);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy số dư token: ", error);
      });
  }
  console.log(mnemonic);

  const handleChangeInput = (text) => {
    setPrivateKey(text);
  };
  return (
    <View style={styles.container}>
      {/* <TextInput
        style={{ margin: 10, color: "white", backgroundColor: "green" }}
        placeholder="input private key or mnemonic (12 text)"
        placeholderTextColor="#c3c3c9"
        value={privateKey}
        onChangeText={handleChangeInput}
      ></TextInput>

      <MyText>
        Mnemonic:
        <Text style={{ color: "white", backgroundColor: "green" }}>
          {mnemonic}
        </Text>
      </MyText>
      <MyText>
        PrivateKey:
        <Text style={{ color: "white", backgroundColor: "green" }}>
          {privateKey}
        </Text>
      </MyText>
      <MyText>Balance: {balance}</MyText>
      <Button
        title="CREATE NEW WALLET"
        onPress={() => {
          createNewWallet();
        }}
      ></Button>
      <Button
        title="RESTORE WALLET"
        onPress={() => {
          console.log("OK Click");
          // const wallet = new ethers.Wallet(privateKey);
          let wallet;
          if (privateKey.includes(" ")) {
            wallet = ethers.Wallet.fromMnemonic(privateKey);
          } else {
            wallet = new Wallet(privateKey);
          }
          console.log("====================================");
          console.log(wallet.privateKey);
          console.log("====================================");
          setMnemonic(wallet.mnemonic ? wallet.mnemonic.phrase : "");
          setPrivateKey(wallet.privateKey);
          setLocalStorage(wallet.mnemonic ? wallet.mnemonic.phrase : "");
          console.log(
            "WalletInfo",
            wallet.address,
            wallet.mnemonic,
            wallet.getChainId,
            wallet.getTransactionCount
          );
          setAddress(wallet.address);

          getHistory();

          const provider = new ethers.providers.JsonRpcProvider(RPC);
          provider
            .getBalance(wallet.address)
            .then((balance) => {
              // Số dư trả về là dạng BigNumber, bạn có thể chuyển đổi nó thành đơn vị Ether
              const etherBalance = ethers.utils.formatEther(balance);
              setBalance(etherBalance);
              console.log(`Số dư ví Ethereum: ${etherBalance} ETH`);
              // getBalanceToken("0xd9EBB8CcFB0b8a8A8DaFe77d6eCF3f5Fb4d83a98");
            })
            .catch((error) => {
              console.error("Lỗi khi lấy số dư: ", error);
            });
          // restoreEIP155Wallet({
          //   privateKey:
          //     "4d3fffaf35085cab58f37d2a6a2c735999e9ef10f812455614eb82fb1bd01358",
          // });
        }}
      ></Button>

      <Button
        title="Send 0.0001ETH"
        onPress={() => {
          sendTransaction();
        }}
      ></Button>
      <Button
        title="Send"
        onPress={() => {
          navigation.navigate("SendTransaction");
          // setShowPopupSend(true);
        }}
      ></Button>

      <MyText>
        Address:
        <Text style={{ color: "white", backgroundColor: "green" }}>
          {address}
        </Text>
      </MyText>
      {showPopupSend && <SendTransactionScreen />} */}

      <CoinScreen address={address} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "black",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  appbar: {
    flexDirection: "row",
  },
  modalContentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 34,
    borderWidth: 1,
    width: "100%",
    height: "40%",
    position: "absolute",
    bottom: 0,
  },
  textInputContainer: {
    height: 40,
    width: 250,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    padding: 4,
  },
  addressContent: {
    textAlign: "center",
    marginVertical: 8,
  },
});
