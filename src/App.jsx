import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  contract_address,
  contract_abi,
  adminAddress,
} from "./Consts/constants.js";
import { Login } from "./Components/Login.jsx";
import { AfterLogin } from "./Components/AfterLogin.jsx";

import "./App.css";

function App() {
  const [Account, setAccount] = useState(null);
  const [IsConnected, setIsConnected] = useState(false);
  const [Candidates, setCandidates] = useState([]);
  const [CanVote, SetCanvote] = useState(false);
  const [voted, Setvoted] = useState(false);
  const [aadhar, SetAadhar] = useState("");

  const [ShowNotAuthorized, setShowNotAuthorized] = useState(false);

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const address = await signer.getAddress();

        const contract = new ethers.Contract(
          contract_address,
          contract_abi,
          signer
        );

        setAccount(address);
        if (CanVote) setIsConnected(true);
        else {
          setShowNotAuthorized(true);
          console.log("showNA" + ShowNotAuthorized);
          return;
        }
        console.log("Metamask Connected : " + address);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Metamask is not detected in the browser");
    }
  }

  const canVote = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      contract_address,
      contract_abi,
      signer
    );
    const address = await signer.getAddress();
    const voter = await contract.getVoters(address);
    SetCanvote(voter.authorized);
    console.log("VoterAadhar", voter.aadhar);
    SetAadhar(voter.aadhar);
    console.log("Voted" + voter.voted, "Auth" + voter.authorized);
    Setvoted(voter.voted);
  };
  const vote = async (index) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contract_address,
      contract_abi,
      signer
    );
    await contract.Vote(index);
    Setvoted(true);
    await getCandidates();
  };
  const authorize = async (Address, name, Aadhar) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const addressOfCurrentUser = await signer.getAddress();
    const contract = new ethers.Contract(
      contract_address,
      contract_abi,
      signer
    );

    const adminAdd = await contract.admin();

    console.log("Admin" + adminAdd);
    if (addressOfCurrentUser != adminAdd) {
      alert("You are not admin");
      return;
    }

    await contract.Authorize(Address, name, Aadhar);
  };
  const getCandidates = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contract_address,
      contract_abi,
      signer
    );

    const candidates = await contract.getCandidates();

    const formatedCandidate = candidates.map((candidate, ind) => {
      return {
        Name: candidate[0],
        VoteCount: candidate[1].toNumber(),
      };
    });
    console.log(formatedCandidate);
    console.log("dgdhgd");
    setCandidates(formatedCandidate);
  };

  useEffect(() => {
    canVote();
    getCandidates();
  }, []);

  const handelAccountChange = (account) => {
    canVote();
    setAccount(account[0]);
  };

  window.ethereum.on("accountsChanged", handelAccountChange);
  return (
    <>
      {!IsConnected ? (
        <Login
          connectAccount={connectToMetamask}
          ShowNotAuthorized={ShowNotAuthorized}
        />
      ) : (
        <AfterLogin
          account={Account}
          getCandidates={getCandidates}
          Candidates={Candidates}
          authorize={authorize}
          CanVote={CanVote}
          vote={vote}
          voted={voted}
          aadhar={aadhar}
        />
      )}
    </>
  );
}
export default App;
