import React, { Component } from "react";
import Web3 from "web3";
import Token from "../abis/Token.json";
import PayItem from "../abis/PayItem.json";
import Navbar from "./Navbar";
import Main from "./Main";
import Footer from "./Footer";
import queryString from "query-string";

import axios from "axios";
import "./App.css";

// function withParams(Component) {
//   return (props) => <Component {...props} params={us} />;
// }

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  componentDidMount() {
    // axios.get(`http://localhost:3001/submit_post`).then((res) => {
    //   const paymentDetails = res.data;
    //   this.setState({ merchant: paymentDetails.merchant });
    //   this.price = paymentDetails.price;
    //   console.log(this.state.merchant + " => price of the item=" + this.price);
    // });
    const value = queryString.parse(window.document.location.search);
    // console.log(this.props);
    const price = value.price;
    this.price = price;
  }

  async loadBlockchainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const ethBalance = await web3.eth.getBalance(this.state.account);
    this.setState({ ethBalance });

    // Load Token
    const networkId = await web3.eth.net.getId();
    const tokenData = Token.networks[networkId];
    if (tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address);
      this.setState({ token });
      let tokenBalance = await token.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ tokenBalance: tokenBalance.toString() });
    } else {
      window.alert("Token contract not deployed to detected network.");
    }

    // Load PayItem
    window.payItemData = PayItem.networks[networkId];
    if (window.payItemData) {
      const payItem = new web3.eth.Contract(
        PayItem.abi,
        window.payItemData.address
      );
      this.setState({ payItem });
    } else {
      window.alert("PayItem contract not deployed to detected network.");
    }

    this.setState({ loading: false });
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  payItem = async (tokenAmount, email, firstName, lastName) => {
    let sentTime, confirmedTime;
    this.hasError = false;
    try {
      this.setState({ loading: true });
      await this.state.payItem.methods
        .payItem(tokenAmount, this.state.merchant)
        .send({ from: this.state.account })
        .on("transactionHash", (hash) => {
          const timeInstance = new Date();
          sentTime = timeInstance.getTime();
          console.log("Requested Time:", sentTime);
          // window.location.reload();
        })
        .on("receipt", (receipt) => {
          const timeInstance = new Date();
          confirmedTime = timeInstance.getTime();
          console.log("Receipt Recieved Time:", confirmedTime);
          console.log(
            "Time Gap(Transaction Processing Time):",
            confirmedTime - sentTime
          );
        });
      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
      this.hasError = true;
    } finally {
      if (this.hasError === false) {
        this.sendFormData(email, firstName, lastName);
      }
    }
  };

  sendFormData = (email, firstName, lastName) => {
    const formData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      customerAddress: this.state.account,
    }}

  //   axios({
  //     method: "post",
  //     url: "http://localhost:3001/receipient_details",
  //     data: formData,
  //   });
  // };

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      token: {},
      payItem: {},
      ethBalance: "0",
      tokenBalance: "0",
      loading: true,
      merchant: "0x4BCb5D968183aDa8c78b7E3e2a3b72EB40351021"
    };
  }

  render() {
    let content;
    if (this.state.loading) {
      content = (
        <p id="loader" className="text-center" style={{ height: "68vh" }}>
          Loading...
        </p>
      );
    } else {
      content = (
        <Main
          ethBalance={this.state.ethBalance}
          tokenBalance={this.state.tokenBalance}
          payItem={this.payItem} //email and names should be sent to payItem as arguments and in the payItem sendFormData should be executed.
          price={this.price}
        />
      );
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto"
              style={{ maxWidth: "600px" }}
            >
              <div className="content mr-auto ml-auto">
                <a target="_blank" rel="noopener noreferrer"></a>

                {content}
              </div>
            </main>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
