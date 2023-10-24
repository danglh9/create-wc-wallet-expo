import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import axios from "axios";
import { formatNumber, formatNumberDecimal } from "../utils/NumberUtils";

// const axios = require('axios');

export function MarketScreen() {
  const [data, setData] = useState([]);

  //   const [isDarkMode, setIsDarkMode] = useState(true);

  //   const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    // setData([
    //   {
    //     id: 1027,
    //     name: "Ethereum",
    //     symbol: "ETH",
    //     slug: "ethereum",
    //     num_market_pairs: 7577,
    //     date_added: "2015-08-07T00:00:00.000Z",
    //     tags: [Array],
    //     max_supply: null,
    //     circulating_supply: 120264972.34269167,
    //     total_supply: 120264972.34269167,
    //     infinite_supply: true,
    //     platform: null,
    //     cmc_rank: 2,
    //     self_reported_circulating_supply: null,
    //     self_reported_market_cap: null,
    //     tvl_ratio: null,
    //     last_updated: "2023-10-20T11:42:00.000Z",
    //     quote: [Object],
    //   },
    // ]);
    loadData2();

    // const intervalId = setInterval(() => {
    //   // Thực hiện tác vụ sau mỗi 2 giây ở đây
    //   loadData2();
    //   console.log('Tác vụ chạy sau mỗi 2 giây');
    // }, 5000); // 2 giây

    // return () => {
    //   clearInterval(intervalId); // Dừng setInterval khi component bị unmount
    // };
  }, []);

  async function loadData2() {
    let response;
    new Promise(async (resolve, reject) => {
      try {
        response = await axios.get(
          "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=100&convert=USD",
          {
            headers: {
              "X-CMC_PRO_API_KEY": "b8c1b9b8-00e8-4368-92e0-dae334f32787",
            },
          }
        );
      } catch (ex) {
        response = null;
        // error
        console.log(ex);
        reject(ex);
      }
      if (response) {
        // success
        const json = response.data;
        console.log("DATA NEW", json.data[0].quote.USD.price);
        resolve(json);
        setData(json.data);
      }
    });
  }
  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.cmc_rank}>{item.cmc_rank}</Text>
        <Image
          style={styles.iconToken}
          source={{
            uri:
              "https://coinicons-api.vercel.app/api/icon/" +
              item.symbol.toLowerCase(),
          }}
        ></Image>
        <View style={styles.nameContainer}>
          <Text style={styles.tokenName}>{item.symbol}</Text>
          <Text style={styles.vol}>
            ${item.quote.USD ? formatNumber(item.quote.USD.volume_24h) : 0}
          </Text>
        </View>
        <Text style={styles.priceText}>
          ${item.quote.USD ? formatNumber(item.quote.USD.price) : 0}
        </Text>
        {item.quote.USD && (
          <Text
            style={[
              styles.percent24h,
              {
                color: item.quote.USD.percent_change_24h > 0 ? "green" : "red",
              },
            ]}
          >
            {formatNumber(item.quote.USD.percent_change_24h)}%
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.cmc_rank}>#</Text>
        <Text style={[styles.textSection, { textAlign: "center" }]}>Vol</Text>
        <Text style={[styles.textSection, { textAlign: "right" }]}>Price</Text>
        <Text style={[styles.textSection, { textAlign: "right" }]}>24h %</Text>
      </View>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "white",
    // backgroundColor: "#212329",
    // padding: 5,
    // paddingTop: 70,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
  },
  itemContainer: {
    padding: 5,

    flexDirection: "row",
    // height: 60,
    alignSelf: "center",
  },

  cmc_rank: {
    color: "white",
    fontWeight: "800",
    fontSize: 16,
    marginRight: 10,
    alignContent: "center",
    alignSelf: "center",
  },
  iconToken: {
    margin: 10,
    height: 40,
    width: 40,
    alignContent: "center",
    alignSelf: "center",
  },
  nameContainer: {
    flex: 1,
    color: "white",
    alignSelf: "center",

    flexDirection: "column",
  },
  tokenName: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },
  vol: {
    marginTop: 5,
    color: "white",
    fontSize: 10,
    fontWeight: "300",
  },
  priceText: {
    flex: 1,
    fontSize: 14,
    color: "white",
    textAlign: "right",
    fontWeight: 500,
    alignSelf: "center",
  },
  percent24h: {
    flex: 1,
    textAlign: "right",
    alignSelf: "center",
    fontSize: 14,
    fontWeight: 700,
    color: "green",
  },
  textSection: {
    color: "white",
    flex: 1,
    fontWeight: "700",
    alignSelf: "center",
    textAlign: "center",
  },
});
