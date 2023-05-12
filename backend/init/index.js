import { downloadImage, downloadJson } from "./utils.js";
import { chainIds } from "./data/chainIds.js";
import {
  addProjectsToDatabase,
  createCategories,
  populateBlockchains,
} from "./dbUtils.js";
import protocols from "./data/protocols.json" assert { type: "json" };

const initBlockchains = async () => {
  const blockchains = await downloadJson("https://chainid.network/chains.json");

  const blockchainDbObjects = [];
  for (const blockchain of blockchains) {
    const slug = chainIds[blockchain.chainId];
    let imageName = "bc-unknown-logo.png";
    // try {
    //   await downloadImage(
    //     `https://icons.llamao.fi/icons/chains/rsz_${slug}.jpg`,
    //     `./data/bc-${slug}.jpg`,
    //   );
    //   imageName = `bc-${slug}.jpg`;
    // } catch (error) {}

    const blockchainDbObject = {
      name: blockchain.name.replace(" Mainnet", "").replace(" Network", ""),
      chainId: blockchain.chainId,
      image: imageName,
    };

    if (blockchainDbObject.name === "Avalanche C-Chain")
      blockchainDbObject.name = "Avalanche";

    if (blockchainDbObject.name === "Binance Smart Chain")
      blockchainDbObject.name = "Binance";

    if (blockchainDbObject.name === "Arbitrum One")
      blockchainDbObject.name = "Arbitrum";

    if (!blockchainDbObject.name.toLowerCase().includes("test"))
      blockchainDbObjects.push(blockchainDbObject);
  }

  await populateBlockchains(blockchainDbObjects);
};

// Decentralized exchanges (DEXs)
// Centralized exchanges (CEXs)
// Decentralized finance (DeFi) protocols
// Non-fungible token (NFT) marketplaces
// Stablecoins
// Wallets
// Blockchain explorers
// Smart contract platforms
// Infrastructure providers (e.g., cloud computing services, data storage)
// Governance platforms
// Social media platforms
// Gaming and virtual worlds
// Enterprise blockchain solutions
// Education and research resources
// News and media outlets
// career opportunities
// development and bounties
// hackathons
// conferences and events
// podcasts
// security
// Funding Platforms
// Insurance
// Launchpads
// NFT Lending
// Oracles
const initCategories = async () => {
  const categories = [
    { name: "Decentralized Exchanges", shortName: "DEXs" },
    { name: "Centralized Exchanges", shortName: "CEXs" },
    { name: "Decentralized Finance", shortName: "DeFi" },
    { name: "NFT Marketplaces", shortName: "NFT" },
    { name: "Stablecoins", shortName: "Stables" },
    { name: "Wallets", shortName: "Wallets" },
    { name: "Blockchain Explorers", shortName: "Explorers" },
    { name: "Smart Contracts", shortName: "Contracts" },
    { name: "Infrastructure Providers", shortName: "Infrastructure" },
    { name: "Governance Platforms", shortName: "Governance" },
    { name: "Social Media Platforms", shortName: "Socials" },
    { name: "Gaming and Virtual Worlds", shortName: "Gaming" },
    { name: "Enterprise Blockchain Solutions", shortName: "Enterprise" },
    { name: "Education and Research Resources", shortName: "Education" },
    { name: "News", shortName: "News" },
    { name: "Jobs in Crypto", shortName: "Jobs" },
    { name: "Development and Bounties", shortName: "Development" },
    { name: "Hackathons", shortName: "Hackathons" },
    { name: "Conferences and Events", shortName: "Conferences" },
    { name: "Podcasts", shortName: "Podcasts" },
    { name: "Privacy and Security", shortName: "Security" },
    { name: "Funding Platforms", shortName: "Funding" },
    { name: "Insurance", shortName: "Insurance" },
    { name: "Launchpads", shortName: "Launchpads" },
    { name: "NFT Lending", shortName: "NFT-Lending" },
    { name: "Oracles", shortName: "Oracles" },
    { name: "Bridges and Cross Chain", shortName: "Cross-Chain" },
    { name: "Lending Platforms", shortName: "Lending" },
    { name: "Staking", shortName: "Staking" },
  ];

  await createCategories(categories);
};

const initProtocols = async () => {
  // await initBlockchains();
  // await initCategories();
  const categoryMapping = {
    CEX: "Centralized Exchanges",
    Dexes: "Decentralized Exchanges",
    "Liquid Staking": "Staking",
    Bridge: "Bridges and Cross Chain",
    Lending: "Decentralized Finance",
    Yield: "Decentralized Finance",
    Derivatives: "Decentralized Finance",
    "Yield Aggregator": "Decentralized Finance",
    "Cross Chain": "Bridges and Cross Chain",
    Synthetics: "Decentralized Finance",
    Privacy: "Privacy and Security",
    Indexes: "Decentralized Finance",
    Insurance: "Insurance",
    Launchpad: "Launchpads",
    "Leveraged Farming": "Decentralized Finance",
    "Liquidity manager": "Staking",
    "NFT Lending": "NFT Lending",
    Payments: "Decentralized Finance",
    "Algo-Stables": "Stablecoins",
    "NFT Marketplace": "NFT Marketplaces",
    RWA: "Decentralized Finance",
    Staking: "Staking",
    "Options Vault": "Decentralized Finance",
    Options: "Decentralized Finance",
    "Staking Pool": "Staking",
    "Reserve Currency": "Decentralized Finance",
    "Prediction Market": "Decentralized Finance",
    Farm: "Decentralized Finance",
    "Uncollateralized Lending": "Lending Platforms",
    Gaming: "Gaming and Virtual Worlds",
    "RWA Lending": "Decentralized Finance",
    Oracle: "Oracles",
  };

  const sortedByCategory = {};

  let tmpUniqueProtocols = {};
  for (const protocol of protocols) {
    if (tmpUniqueProtocols[protocol.url]) {
      const tmpProtocol = tmpUniqueProtocols[protocol.url];
      tmpUniqueProtocols[protocol.url] =
        tmpProtocol.tvl > protocol.tvl ? tmpProtocol : protocol;
    } else {
      tmpUniqueProtocols[protocol.url] = protocol;
    }
  }

  let uniqueProtocols = {};
  for (const protocol of Object.values(tmpUniqueProtocols)) {
    protocol.name = protocol.name
      .replace(" V3", "")
      .replace(" V2", "")
      .replace(" V1", "");
    if (uniqueProtocols[protocol.name]) {
      const tmpProtocol = uniqueProtocols[protocol.name];
      uniqueProtocols[protocol.name] =
        tmpProtocol.tvl > protocol.tvl ? tmpProtocol : protocol;
    } else {
      uniqueProtocols[protocol.name] = protocol;
    }
  }

  for (const protocol of Object.values(uniqueProtocols)) {
    let category = categoryMapping[protocol.category];
    if (
      protocol.name.toLowerCase().includes("compound") ||
      protocol.name.toLowerCase().includes("aave") ||
      (protocol.description?.toLowerCase().includes("lending") &&
        !protocol.description?.toLowerCase().includes("nft"))
    )
      category = "Lending Platforms";

    if (
      protocol.description?.toLowerCase().includes("lending") &&
      protocol.description?.toLowerCase().includes("nft")
    )
      category = "NFT Lending";

    if (protocol.description?.toLowerCase().includes("launchpad"))
      category = "Launchpads";

    if (!sortedByCategory[category]) {
      sortedByCategory[category] = [];
    }

    if (
      parseInt(protocol.tvl) <= 1_500_000 &&
      (category === "Decentralized Exchanges" ||
        category === "Decentralized Finance" ||
        category === "NFT" ||
        category === "NFT-Lending" ||
        category === "Lending Platforms")
    ) {
      console.log("dropped:", protocol.name);
    } else {
      console.log("added:", protocol.name);
      sortedByCategory[category].push(protocol);
    }
  }

  const categorySortedByTVL = {};
  for (const category in sortedByCategory) {
    const sortedByTVL = sortedByCategory[category].sort((a, b) => {
      // If a and b have different tvl values, sort by tvl in descending order
      if (a.tvl !== null && b.tvl !== null) {
        return b.tvl - a.tvl;
      }
      // If a has a tvl value and b doesn't, sort a before b
      else if (a.tvl !== null) {
        return -1;
      }
      // If b has a tvl value and a doesn't, sort b before a
      else if (b.tvl !== null) {
        return 1;
      }
      // If neither a nor b has a tvl value, maintain original order
      else {
        return 0;
      }
    });
    categorySortedByTVL[category] = sortedByTVL;
  }

  // map to db objects
  // model Project {
  // id          Int          @id @default(autoincrement())
  // name        String
  // description String?
  // image       String?
  // link        String?
  // dateAdded   DateTime     @default(now())
  // clicks      Int          @default(0)
  // clicksIpMap Json?
  // categories  Category[]
  // blockchains Blockchain[]
  // }

  const protocolDbObjects = [];
  for (const category in categorySortedByTVL) {
    const protocols = categorySortedByTVL[category];
    let rating = 1000;
    for (const protocol of protocols) {
      // await downloadImage(
      //   protocol.logo,
      //   `./data/protocols/${protocol.logo.replace(
      //     "https://icons.llama.fi/",
      //     "",
      //   )}`,
      // );
      const protocolDbObject = {
        name: protocol.name,
        description: protocol.description.replace(
          "(detailed in https://docs.donkey.fund/about/whitepaper/english-whitepaper)",
          "",
        ),
        image: protocol.logo.replace("https://icons.llama.fi/", ""),
        link: protocol.url,
        dateAdded: new Date(),
        rating: rating - 2,
        categories: [category],
        blockchains: protocol.chains,
      };
      protocolDbObjects.push(protocolDbObject);
    }
  }
  await addProjectsToDatabase(protocolDbObjects);
};

const init = async () => {
  await initBlockchains();
  await initCategories();
  await initProtocols();
};

init();

// todo: sort by tvl, highest == clicks 1000, und dann -1
