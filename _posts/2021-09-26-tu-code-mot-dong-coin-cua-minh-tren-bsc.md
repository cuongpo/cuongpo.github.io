---
layout: post
title:  "Tự code một đồng crypto cho riêng mình trên Binance Smart Chain"
author: sal
categories: [ Lifestyle ]
image: assets/images/dodge.jpg
rating: 4.5
---

## Tự code một đồng crypto cho riêng mình trên Binance Smart Chain
1. IDE
Để code smart contract mình có thể code ngay bằng IDE trên trình duyệt mà không cần cài thêm bất kì thứ gì
https://remix.ethereum.org/

2. Standard
BEP 20
https://docs.binance.org/smart-chain/developer/BEP20.html

3. Starting
Khi mở IDE remix ra thì mình sẽ thấy 3 thư mục contract, scripts, tests và 1 file readme.txt

Mình sẽ tạo đồng coin của mình --> code ở trong thư mục contract

Tạo 1 file .sol mới
example: hannah.sol
	mapping(address => mapping(address => uint)) public allowance;


solidity là có đuôi .sol nhé

pragma solidity ^0.8.2; // Khai báo phiên bản solidity

contract Hannah{
	mapping(address => uint) public balances; // Mapping address với balance 
	mapping(address => mapping(address => uint)) public allowance;

	uint public totalSupply = 1000 * 10 ** 18; // Khai báo các biến bắt buộc theo chuẩn BEP 20
	string public name = "HannahCoin";
	string public symbol = "HNC";
	uint public decimal = 18;

	event Transfer(address indexed from, address indexed to, uint value);
	event Approval(address indexed owner, address indexed spender, uint value);

	constructor(){  // Được gọi đầu tiên khi khởi tạo contract
		balances[msg.sender] = totalSupply; // Khi khởi tạo chuyển hết total supply vào ví thằng chủ :v 
	}

	function balanceOf(address owner) public view returns(uint){ // function kiểm tra balance address
		return balances[owner];
	}

	function transfer(address to, uint value) public returns(bool) { // function chuyển tiền
		require(balanceOf(msg.sender)>= value, 'Insufficent funds');
		balances[to] += value;
		balances[msg.sender] -= value;
		emit Transfer(msg.sender, to, value);
		return true;
	}

	fuction transferFrom(address from, address to, uint value) public returns(bool){
		require(balanceOf(from) >= value, 'Insufficent fund');
		require(allowance[from][msg.sender] >= value, 'Insufficent fund');
		balances[to] += value;
		balances[from] -= value;
		emit Transfer(from, to, value);
		return true;
	}

	function approve(address spender, uint value) public returns(bool){
		allowance[msg.sender][spender] = value;
		emit Approval(msg.sender, spender, value);
		return true;
	}

}

4. BSC testnet + Metamask
Cài đặt metamask BSC Testnet
Setting -> Network
https://gdtk.gitbook.io/docs/metamask/them-mang/bsc-testnet

Để buff tiền
Binance Smart Chain Faucet

5. Deploy
Deploy 
-	Environment: injected web3

