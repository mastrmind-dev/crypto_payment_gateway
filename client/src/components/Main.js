import React, { Component } from "react";
import BuyForm from "./BuyForm";

class Main extends Component {


  render() {
    let content;
    content = (
      <BuyForm
        ethBalance={this.props.ethBalance}
        tokenBalance={this.props.tokenBalance}
        payItem={this.props.payItem}
        price={this.props.price}
      />
    );

    return (
      <div id="content" className="mt-3">
        <div className="card mb-4">
          <div className="card-body">{content}</div>
        </div>
      </div>
    );
  }
}

export default Main;
