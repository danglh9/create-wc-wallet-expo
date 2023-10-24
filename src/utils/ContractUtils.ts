import axios from "axios";

export function getContractABI(chain: number, address: string) {
  let url =
    "https://api.etherscan.io/api?module=contract&action=getabi&address=" +
    address;
}

export async function getTokenInfo(erc20Contract) {
  //   const contractAddress = "0xTokenContractAddress"; // Địa chỉ contract của token
  // const abi = YOUR_ERC20_ABI; // ABI của contract ERC-20

  // const erc20Contract = new ethers.Contract(contractAddress, abi, provider);
  // async function getTokenInfo() {
  try {
    const name = await erc20Contract.name();
    const symbol = await erc20Contract.symbol();
    const totalSupply = await erc20Contract.totalSupply();
    const decimals = await erc20Contract.decimals();

    console.log("Token Name:", name);
    console.log("Token Symbol:", symbol);
    console.log("Decimals:", decimals);

    console.log("Total Supply:", totalSupply.toString());
  } catch (error) {
    console.error("Error:", error);
  }
  // }
}

export async function getPrice(symbol: string) {
  // try {

  // }catch
  const response = await axios.get(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`,
    {
      headers: {
        "X-CMC_PRO_API_KEY": "b8c1b9b8-00e8-4368-92e0-dae334f32787",
      },
    }
  );

  //   const object = await JSON.parse(response.data.data);
  // await
  await console.log(
    "GET PRICE:",
    response.data.data[`${symbol}`].quote.USD.price
  );
  return response.data.data[`${symbol}`].quote.USD.price;
}
