pragma solidity ^0.5.0;

interface Token {
    function transfer(address dst, uint wad) external returns (bool);
    function transferFrom(address src, address dst, uint wad) external returns (bool);
    function balanceOf(address guy) external view returns (uint);
}

contract PayItem {
    string public name = "Payment Gateway";
    Token public token;
    address public owner;

    event TokenPurchased(
        address customer,
        address merchant,
        address token,
        uint256 amount
    );

    constructor(Token _token) public {
        token = _token;
        owner = msg.sender;
    }

    function payItem(uint256 _amount, address _merchant) public {
        require(
            token.balanceOf(msg.sender) >= _amount,
            "You don't have enough tokens!"
        );

        token.transferFrom(msg.sender, _merchant, _amount);

        emit TokenPurchased(msg.sender, _merchant, address(token), _amount);
    }
}
