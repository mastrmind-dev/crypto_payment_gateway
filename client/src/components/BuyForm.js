import React, { Component } from "react";
import tokenLogo from "../token-logo.png";
import ethLogo from "../eth-logo.png";

class BuyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptocurrency: "LKRT",
    };
  }

  // // componentDidMount() {
  //   axios.get(`http://localhost:3001/submit_post`).then((res) => {
  //     const paymentDetails = res.data;
  //     this.setState({merchant : paymentDetails.merchant});
  //     console.log(this.state.merchant);
  //   });
  // }

  CryptoBalance(crypto) {
    if (crypto === "ETH") {
      return (
        <span className="float-right text-muted">
          Your Ether Balance:{" "}
          {window.web3.utils.fromWei(this.props.ethBalance, "Ether")}
        </span>
      );
    } else if (crypto === "LKRT") {
      return (
        <span className="float-right text-muted">
          Your SLToken Balance:{" "}
          {window.web3.utils.fromWei(this.props.tokenBalance, "Ether")}
        </span>
      );
    }
  }

  CryptoImage(crypto) {
    if (crypto === "ETH") {
      return (
        <div>
          <img src={ethLogo} height="32" alt="" />
          &nbsp;&nbsp;&nbsp; ETH
        </div>
      );
    } else if (crypto === "LKRT") {
      return (
        <div>
          <img src={tokenLogo} height="32" alt="" />
          &nbsp;&nbsp;&nbsp; LKRT
        </div>
      );
    } else {
    }
  }

  render() {
    return (
      <form
        className="mb-3"
        // action="http://localhost:3001/receipient_details"
        // method="POST"
        onSubmit={(event) => {
          let tokenAmount;
          tokenAmount = this.input.value.toString();
          tokenAmount = window.web3.utils.toWei(tokenAmount, "Ether");
          this.props.payItem(
            tokenAmount,
            this.email.value.toString(),
            this.firstName.value.toString(),
            this.lastName.value.toString()
          );
          // this.props.sendFormData(this.email.value.toString(), this.firstName.value.toString(), this.lastName.value.toString());
        }}
      >
        <div>
          <label className="float-left">
            <b>Paying Amount</b>
          </label>
          {this.CryptoBalance(this.state.cryptocurrency)}
        </div>
        {/* =============================first input============================= */}
        <div className="input-group mb-4">
          <input
            type="text"
            ref={(input) => {
              this.input = input;
            }}
            className="form-control form-control-lg"
            // placeholder="0"
            value={this.props.price}
            disabled
          />
          <div className="input-group-append">
            <div className="input-group-text">
              {this.CryptoImage(this.state.cryptocurrency)}
            </div>
          </div>
        </div>
        {/* <div>
          <label className="float-left">
            <b>Cryptocurrency</b>
          </label>
          {this.CryptoBalance(this.state.cryptocurrency)}
        </div> */}
        {/* ==============================second input================================== */}
        {/* <div className="input-group mb-2">
          <select
            id="cryptocurrency"
            className="form-control form-control-lg"
            ref={(input) => {
              this.crypto = input;
            }}
            onChange={(e) => {
              this.setState({ cryptocurrency: this.crypto.value });
            }}
          >
            <option value="0">Select A Cryptocurrency</option>
            <option value="LKRT">SLToken [LKRT]</option>
            <option value="ETH">Ether [ETH]</option>
          </select>
          <div className="input-group-append">
            <div className="input-group-text">
              {this.CryptoImage(this.state.cryptocurrency)}
            </div>
          </div>
        </div> */}
        {/* ==================================payment reciept part====================================== */}
        <div className="row mt-4">
          <div className="col-md-6">
            <div>
              <label className="float-left">
                <b>First Name</b>
              </label>
            </div>
            <div className="input-group mb-4">
              <input
                type="text"
                ref={(input) => {
                  this.firstName = input;
                }}
                className="form-control form-control-lg"
                placeholder="First Name..."
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <div>
              <label className="float-left">
                <b>Last Name</b>
              </label>
            </div>
            <div className="input-group mb-4">
              <input
                type="text"
                ref={(input) => {
                  this.lastName = input;
                }}
                className="form-control form-control-lg"
                placeholder="Last Name..."
                required
              />
            </div>
          </div>
        </div>

        <div className="">
          <div>
            <label className="float-left">
              <b>Email</b>
            </label>
          </div>
          <div className="input-group mb-4">
            <input
              type="email"
              ref={(input) => {
                this.email = input;
              }}
              className="form-control form-control-lg"
              placeholder="Enter Your Email..."
              required
            />
          </div>
        </div>

        <div className="mt-3">
          <button type="submit" className="btn btn-primary btn-block btn-lg">
            PAY
          </button>
        </div>
      </form>
    );
  }
}

// module.exports = {firstname : "this.firstName, lastname : this.lastName, eamil : this.email"};

export default BuyForm;
