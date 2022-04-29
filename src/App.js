import { utils } from "near-api-js";
import React from "react";
import "regenerator-runtime/runtime";
import { v4 as uuid4 } from "uuid";
import "./global.css";
import { login, logout } from "./utils";

import Layout from "./Layout";
import Content from "./Content";
import List from "./List";

const GAS = 300000000000000;
const ONE_NEAR = utils.format.parseNearAmount("1");

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

const animalPics = [
  "https://bafybeihpxmpxynscvhr6qe6brakdhsuf4khoqf5vmmcdfxy5gardunmlce.ipfs.nftstorage.link",
  "https://bafybeiaq7ac5pd2ngmaec2fuqfeznnqutojaaoeuyntp3u2pvxks2qvi3e.ipfs.nftstorage.link",
  "https://bafybeiakjlzhrwbdxjklyskyn6k5dvdrjrwteys2k3gqbhleyl33nsxjha.ipfs.nftstorage.link",
  "https://bafybeiehj4hmkrlahj545pg55ev2sgshs44erobd225nvlhwzgcbfuonbe.ipfs.nftstorage.link",
  "https://bafybeicwytige6acrrtjt7d3v5f7cfsdqac63hfh3elnlnmjxogbch3jda.ipfs.nftstorage.link",
];

export default function App() {
  const [nfts, setNfts] = React.useState([]);

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  React.useEffect(() => {
    if (window.walletConnection.isSignedIn()) {
      window.contract
        .nft_tokens_for_owner({ account_id: window.accountId })
        .then((res) => {
          setNfts(res);
        });
    }
  }, []);

  if (!window.walletConnection.isSignedIn()) {
    return (
      <Layout buttonClick={login} isLoggedIn={false}>
        <Content />
      </Layout>
    );
  }

  const mint = async () => {
    const token_owner_id = window.walletConnection.account().accountId;
    try {
      const token_id = await window.contract.nft_total_supply();
      console.log(token_id);
      // const token_id = uuid4();
      const media = animalPics.random();
      const token_metadata = {
        title: `Zoo NFT #${token_id}`,
        description:
          "Ukrainian zoos are in severe need of help now and will be in need after the war ends. There are no visitors in the zoos, which results in no budgeting. All the NFT mint funds will be donated to Ukrainian zoo.",
        media,
        copies: 1,
      };
      setButtonDisabled(true);

      await window.contract.nft_mint(
        {
          token_id,
          token_owner_id,
          token_metadata,
        },
        GAS,
        ONE_NEAR
      );
    } catch (e) {
      alert(
        "Something went wrong! " +
          "Maybe you need to sign out and back in? " +
          "Check your browser console for more info."
      );
      throw e;
    } finally {
      setButtonDisabled(false);
    }

    setNfts([...nfts, { token_id, token_owner_id, token_metadata }]);
  };

  return (
    <Layout buttonClick={logout} isLoggedIn={true}>
      <Content showMintBtn onMint={mint} />
      <List nfts={nfts} />
    </Layout>
  );
}
