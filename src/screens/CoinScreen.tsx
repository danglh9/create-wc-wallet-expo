import { useState, useEffect } from "react";
import * as React from "react";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import axios from "axios";
import { formatNumber, formatNumberDecimal } from "../utils/NumberUtils";
import { Wallet, ethers, providers } from "ethers";
import { getPrice, getTokenInfo } from "../utils/ContractUtils";
const abi = require("../abi/abi-get-name.json");
export const CoinScreen = (props) => {
  const [data, setData] = useState([]);

  async function getBalanceTokenErc20(tokenAddress: string) {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://goerli.infura.io/v3/20107bdcb0844ae2894c301166e5a723"
    );
    // const wallet = new ethers.Wallet(
    //   "09e15ebe6c44164105a7c9f992d79d61142479cafc74fc1118ca3cbe654c1174",
    //   provider
    // );
    const erc20Contract = new ethers.Contract(tokenAddress, abi, provider);
    //  const tokenContract = new ethers.Contract(tokenAddress, abi, provider);
    try {
      const name = await erc20Contract.name();
      const symbol = await erc20Contract.symbol();
      // const totalSupply = await erc20Contract.totalSupply();
      const decimals = await erc20Contract.decimals();
      const tokenBalance = await erc20Contract.balanceOf(props.address);
      const price = await getPrice(symbol);

      console.log("Token Name:", name);
      console.log("Token Symbol:", symbol);
      console.log("Decimals:", decimals);
      console.log(`Balances ERC-20: ${tokenBalance.toString()}`, tokenAddress);

      console.log("Price", price);

      for (let i = 0; i < data.length; i++) {
        if (data[i].address == tokenAddress) {
          data[i].balances = tokenBalance / 10 ** decimals;
          data[i].price = price;
        }
      }
      setData([...data]);

      // console.log("Total Supply:", totalSupply.toString());
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    setData([
      {
        symbol: "ETH",
        price: 0,
        balances: 0,
        address: "",
      },
      {
        symbol: "WPEPE",
        price: 0,
        balances: 0,
        address: "0xd9EBB8CcFB0b8a8A8DaFe77d6eCF3f5Fb4d83a98",
      },
      {
        symbol: "USDC",
        price: 0,
        balances: 0,
        address: "0xA375A26dbb09F5c57fB54264f393Ad6952d1d2de",
      },
      {
        symbol: "USDT",
        price: 0,
        balances: 0,
        address: "0x50c9dfAE3969f6374d3870afF869D5C5A7Eac0f4",
      },
    ]);
    // loadData();
  }, []);
  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      getBalanceTokenErc20(data[i].address);
    }
  }, [props.address]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          style={styles.iconToken}
          source={{
            uri:
              "https://coinicons-api.vercel.app/api/icon/" +
              item.symbol.toLowerCase(),
          }}
        ></Image>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.tokenName}>{item.symbol}</Text>
            <Text style={styles.balances}>
              {item ? formatNumber(item.balances) : 0}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.priceText}>
              ${item ? formatNumber(item.price) : 0}
            </Text>

            <Text style={styles.balancesUSD}>
              {formatNumber(item.balances * item.price)}$
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    // backgroundColor: "red",
    width: "100%",
    flex: 1,
  },
  itemContainer: {
    marginTop: 10,

    padding: 5,
    flexDirection: "row",
    // backgroundColor: "blue",

    flex: 1,
    width: "100%",
    // alignSelf: "center",
  },
  iconToken: {
    // margin: 10,
    marginRight: 10,
    height: 40,
    width: 40,
    alignContent: "center",
    alignSelf: "center",
  },
  nameContainer: {
    flex: 1,
    color: "white",
    alignSelf: "center",
    backgroundColor: "gray",
    flexDirection: "column",
  },
  tokenName: {
    flex: 1,
    // backgroundColor: "blue",

    color: "white",
    alignSelf: "center",

    fontWeight: "500",
    fontSize: 17,
  },
  balances: {
    flex: 1,
    color: "white",
    // backgroundColor: "red",

    fontWeight: "300",
    fontSize: 17,
    alignSelf: "center",

    textAlign: "right",
  },
  balancesUSD: {
    // backgroundColor: "red",
    color: "white",
    fontWeight: "300",
    fontSize: 12,
    alignSelf: "center",
    textAlign: "right",
  },
  priceText: {
    flex: 1,
    fontSize: 12,
    color: "white",
    textAlign: "left",
    fontWeight: "300",
    alignSelf: "center",
  },
  row: {
    // backgroundColor: "green",
    flex: 1,
    flexDirection: "row",
  },
  column: {
    flex: 1,
    flexDirection: "column",
  },
});
