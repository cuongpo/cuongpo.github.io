---
title: Tự tạo Metaverse bằng A-frame và Three.js
author: Henry Pham
date: 2023-06-01 11:33:00 +0800
categories: [Coding]
tags: [Smart Contract,Side Project]
pin: true
math: true
mermaid: true
---

# How to Write an NFT Marketplace Smart Contract in Klaytn

## Overview

NFT marketplaces are online platforms that allow creators to mint and sell their NFTs to buyers who can purchase them using cryptocurrency. These marketplaces typically provide a user-friendly interface for creating and managing NFTs, including the ability to set prices, royalties, and other terms and conditions. In this article, we will explore how to create an NFT marketplace smart contract on Klaytn.

To establish a robust NFT marketplace on the Klaytn blockchain, three distinct smart contracts are necessary: a Token Smart Contract (ERC20) for managing fungible tokens used within the marketplace ecosystem, an NFT Smart Contract (ERC721) for handling unique and non-fungible assets, and a Marketplace Smart Contract serving as the central infrastructure for marketplace interactions, including buying, selling, bidding, and other essential functionalities. These smart contracts work together to enable secure ownership, seamless transactions, and a fair marketplace environment for participants on the Klaytn blockchain.

## Prerequisites

1. Install [Metamask](https://docs.klaytn.foundation/content/dapp/tutorials/connecting-metamask)

2. Get Test KLAY from [Faucet](https://baobab.wallet.klaytn.foundation/faucet)

## ERC20 Smart Contract

### IDE

To make it simple - we’ll use [Remix IDE](https://remix.ethereum.org/?#activate=klaytn-remix-plugin,fileManager&lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.18+commit.87f61d96.js)

  
  
  

### Code
```
//  SPDX-License-Identifier:  MIT

pragma  solidity  ^0.8.0;

  

import  "@openzeppelin/contracts/token/ERC20/ERC20.sol";

  

contract  token  is  ERC20  {

constructor(

string  memory  name,

string  memory  symbol,

uint256  initialSupply

)  ERC20(name,  symbol)  {

_mint(msg.sender,  initialSupply);

}

}
```
  

The contract has a constructor function that takes three parameters: name, symbol, and initialSupply. These parameters represent the desired name, symbol, and initial supply of the token, respectively. Inside the constructor, the ERC20 constructor is invoked with the provided name and symbol to initialize the token with the specified name and symbol.

Finally, within the constructor, the _mint function is called. This function is inherited from ERC20 and is used to mint a specified initialSupply of tokens and assign them to the address that deployed the contract, msg.sender. In other words, the tokens are initially assigned to the creator of the contract.

### Compiling the contract

Choose compiler fit with solidity version in smart contract

![](https://lh3.googleusercontent.com/IOUKWKaHsJakxBB_vXbN7vWCXKlq8ZYGVDathRSKJsCIjVrxGjdSsLOssaO3CSPtRaAF2cmYOJSfb5V5xGIcjksURTjriOkvPXu10i3sf_6jOJ_nsy9L66qojJ0YIfo3QmCUXAbDfnTRzkGVmPsCLAI)

### Deploying the contract

-   Click on Deploy button
    
-   On Environment - choose Injected Provider - Metamask
    
-   On Contract - choose MyERC20 - contracts/token.sol
    

![](https://lh3.googleusercontent.com/BRadEXzKNTKP0R_0VxJMk8QaU9BWgnQhzPLcrrwdtoHQrTfqSVh2sBLz-QYifu8KVA0TpFc_7c65btBBRwdhSWC6TnUMKdYza8rlGn_tYVpMcDcRx2Is9rlTS-hhTCd_Sg4w-1MkeMr49GNnfZJRJ9g)

Input name, symbol and decimal for ERC20 token. Example

-   Name: Brolab Token
    
-   Symbol: BRO
    
-   Decimals: 8
    

then click Transact

![](https://lh4.googleusercontent.com/2Ypu1WPZsL8mjx3RA6W5jANw7ou3bJqUyS97GUM1DkFMq0hXDSUw5yT1lQsNwM4x97rT75LZCEg2lw4Cv_gwV_UVUPzeemRkeym2mCgsyCtrPM4QHFXtT1IgPCrvHU-OY_7ttn8Ab-fCcWVsPH-O3y0)

Confirm transaction

![](https://lh3.googleusercontent.com/SoLEbASzXe2FXa1JlbDYHcp_84m4XIM9DnpssmnF9O8FdpDng_Kgdk6nXQswMjHCBHuEUFU7zwfD6SYRxWGwC2Pb8xC9wwVR5hrvqJPHZkZrTF9F4XeSTsJ2EQamClj8SPEQJ62xeBg-myNUlzJdIHg)

Now we got our ERC20 token: 0x524a6226ECaB7f358e1c66591288c8a7637f7146

![](https://lh4.googleusercontent.com/hMFRFLKKkGeYjw6z9CNRcRdGSHCDLSY7kB6thqaUvUJI14LkFR9S3PqNKU9nXM5VTooURryDJQPiqmTHvlRxd3kWBWWEMxr4tHZpkli7KqT-qJFbiILMSVK9E_pXhJ5VZ4KEf8wFaaqk748dCS_Z9qE)

## ERC721 Smart Contract

We do the same as ERC20 token
```
// SPDX-License-Identifier: MIT

  

pragma solidity ^0.8.0;

  

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/utils/Counters.sol";

  
  

contract nftcontract is ERC721, Ownable {

using Counters for Counters.Counter;

Counters.Counter private _tokenIds;

Counters.Counter private _collectionIds;

mapping (uint256 => string) public _tokenURIs;

mapping (uint256 => string) public _tokenName;

mapping (uint256 => uint256) public _collectionId;

mapping (uint256 => string) public _collectionName;

mapping (uint256 => address) public _collectionOwner;

  

event MintNFT(uint256 tokenId, address recipient, string tokenURI,string name,uint256 collectionId_);

event CreateCollection(uint256 collectionId,string collectionName,address collectionOwner);

  

string private _baseURIextended;

  

constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

  

function setBaseURI(string memory baseURI_) external onlyOwner {

_baseURIextended = baseURI_;

}

  

function mintNFT(address recipient, string memory tokenURI,string memory name,uint256 collectionId_)

public

returns (uint256)

{

require (

_collectionOwner[collectionId_] == msg.sender, 'not collection owner'

);

_tokenIds.increment();

uint256 newItemId = _tokenIds.current();

// mintWithTokenURI(recipient, newItemId, tokenURI);

_mint(recipient, newItemId);

_setTokenURI(newItemId, tokenURI);

_setName(newItemId,name);

_collectionId[newItemId] = collectionId_;

emit MintNFT(newItemId,recipient,tokenURI,name,collectionId_);

return newItemId;

}

  

function _setTokenURI(uint256 tokenId, string memory uri) internal {

require(

_exists(tokenId),

'ERC721: URI set of nonexistent token'

);

_tokenURIs[tokenId] = uri;

}

  

function _setName(uint256 tokenId, string memory name) internal {

require(

_exists(tokenId),

''ERC721Metadata: URI set of nonexistent token'

);

_tokenName[tokenId] = name;

}

  

function _baseURI() internal view virtual override returns (string memory) {

return _baseURIextended;

}

  

function createCollection(string memory collectionName_) public {

_collectionIds.increment();

uint256 newCollectionId = _collectionIds.current();

_collectionName[newCollectionId] = collectionName_;

_collectionOwner[newCollectionId] = msg.sender;

emit CreateCollection(newCollectionId,collectionName_,msg.sender);

}

}
```
The contract imports several files from the OpenZeppelin library, including ERC721.sol for the ERC721 token standard, Ownable.sol for ownership functionality, and Counters.sol for managing counters.

Next, the contract named "nftcontract" is defined, and it inherits from both ERC721 and Ownable. This means that the contract will have all the functionality of ERC721 tokens and also include additional ownership capabilities.

The contract uses the Counters library to create two counters: _tokenIds and _collectionIds. These counters are used to keep track of the token and collection identifiers.

Several mapping variables are declared to store information related to tokens and collections. These mappings include _tokenURIs to store the token URIs, _tokenName to store the token names, _collectionId to store the collection IDs associated with each token, _collectionName to store the collection names, and _collectionOwner to store the addresses of collection owners.

The contract includes events MintNFT and CreateCollection to emit events when a new token is minted and when a new collection is created, respectively.

The constructor function takes in the name and symbol of the NFT and initializes the ERC721 contract with these values.

The contract provides a function setBaseURI to set the base URI for token metadata.

The mintNFT function is used to mint a new NFT. It requires the caller to be the owner of the associated collection. It increments the _tokenIds counter, mints a new token with a unique ID, assigns the token URI, sets the token name, assigns the collection ID, and emits the MintNFT event.

The _setTokenURI and _setName internal functions are used to set the token URI and name, respectively.

The _baseURI function is overridden to return the extended base URI.

The createCollection function allows the anyone to create a new collection. It increments the _collectionIds counter, assigns a unique ID to the collection, sets the collection name, assigns the collection owner, and emits the CreateCollection event.

  

![](https://lh5.googleusercontent.com/iItp_ZO7p9ekgA3Eg0xHfi9kV_ApnZYnUa2Vfe8ubaIoiLVOjOEFT5a7u45WVFSpxH_13r_HQAu4YOj2k1L5CNooTCvxrGWKFPJtPa-P9DetI-Ixs55zKIq2KvLFyhfAJtIKjjKEwC6oNYhykQB1bSI)

Now we have our ERC20 contract address and ERC721 contract address - Let’s move to the next part: Building NFT Marketplace Smart Contract.

## Marketplace Smart Contract

### Step 1: Analyzing the Order Struct

In this step, we will first analyze a struct called "Order" that will be used to represent individual orders within the marketplace. This struct will contain fields for the seller's address, buyer's address, token ID, payment token address, and price. By organizing these details within the Order struct, you can effectively manage and track the lifecycle of each order.

Here's an example code snippet for defining the Order struct:
```
struct Order {

address seller; // Address of the seller

address buyer; // Address of the buyer

uint256 tokenId; // ID of the NFT token

address paymentToken; // Address of the payment token

uint256 price; // Price of the order

}
```
In the above code, we define a struct named "Order" that encapsulates the necessary information for an order in the marketplace. The "seller" field represents the address of the seller, while the "buyer" field represents the address of the buyer. The "tokenId" field stores the ID of the NFT token associated with the order.

The "paymentToken" field is used to store the address of the payment token that will be used for the transaction. This can be an ERC20 token address, enabling flexibility in the payment method within the marketplace. Lastly, the "price" field represents the price of the order.

By grouping these fields together within the Order struct, you can easily access and manage the relevant information for each order in your marketplace. This struct will play a crucial role in the overall functionality of your NFT marketplace smart contract.

### Step 2: Declaring Contract Variables

In this step, we will declare the necessary variables for your marketplace contract. These variables will include an instance of the ERC721 contract (nftContract) for managing NFTs, a mapping structure to store orders based on their unique order ID, and additional variables such as feeDecimal, feeRate, and feeRecipient for managing fees within the marketplace.

Here's an example code snippet for declaring these contract variables:

  
```
import  "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import  "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import  "@openzeppelin/contracts/access/Ownable.sol";

import  "@openzeppelin/contracts/utils/Counters.sol";

import  "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

  

contract  Marketplace  is  Ownable  {

using  Counters  for  Counters.Counter;

using  EnumerableSet  for  EnumerableSet.AddressSet;

Counters.Counter  private  _orderIdCount;

  

struct  Order  {

address  seller;  //  Address  of  the  seller

address  buyer;  //  Address  of  the  buyer

uint256  tokenId;  //  ID  of  the  NFT  token

address  paymentToken;  //  Address  of  the  payment  token

uint256  price;  //  Price  of  the  order

}

  

IERC721  public  immutable  nftContract;  //  Instance  of  the  ERC721  contract  for  NFTs

mapping  (uint256  =>  Order)  public  orders;  //  Mapping  to  store  orders  based  on  their  order  ID

  

uint256  public  feeDecimal;  //  Decimal  value  for  fee  calculation

uint256  public  feeRate;  //  Rate  of  the  fee  to  be  charged

address  public  feeRecipient;  //  Address  to  receive  the  fees

EnumerableSet.AddressSet  private  _supportedPaymentTokens;  //  Set  of  supported  payment  tokens

  

//  Other  contract  functions  and  events...

  

//  Constructor

constructor(

address  nftAddress_,

uint256  feeDecimal_,

uint256  feeRate_,

address  feeRecipient_

)  {

require(nftAddress_  !=  address(0),  "Marketplace:  nftAddress_  is  zero  address");

require(feeRecipient_  !=  address(0),  "Marketplace:  feeRecipient  is  zero  address");

  

nftContract  =  IERC721(nftAddress_);

_updateFeeRecipient(feeRecipient_);

_updateFeeRate(feeDecimal_,  feeRate_);

_orderIdCount.increment();

}

  

//  Other  contract  functions  and  events...

}
```

In the above code, we import the necessary dependencies from the OpenZeppelin library, including IERC721 for the ERC721 token interface, IERC20 for the ERC20 token interface, Ownable for contract ownership, Counters for managing order IDs, and EnumerableSet for managing supported payment tokens.

We then declare a struct named "Order" that we defined in the previous step. This struct represents individual orders in the marketplace and holds the necessary order information.

Next, we declare the contract variables. The "nftContract" variable is declared as an instance of the IERC721 contract, which will be used for managing NFTs within the marketplace.

The "orders" mapping is used to store orders based on their unique order ID. It allows for efficient retrieval and management of orders within the marketplace.

The "feeDecimal," "feeRate," and "feeRecipient" variables are used for managing the fees in the marketplace. These variables determine the fee calculation and the address that receives the fees. The "feeDecimal" variable represents the decimal value used for precise fee calculations, while the "feeRate" variable represents the fee rate to be charged. The "feeRecipient" variable stores the address that will receive the fees.

### Step 3: Implementing Events

In this step, we will implement events to emit important contract actions. By defining and emitting events, we enable external systems to listen and respond to these actions, facilitating effective communication with your marketplace. Events serve as a way to notify interested parties about specific occurrences within the contract.

Here's an example code snippet that implements events for the NFT marketplace:
```
event OrderAdded(

uint256 indexed orderId,

address indexed seller,

uint256 indexed tokenId,

address paymentToken,

uint256 price

);

  

event OrderCanceled(

uint256 indexed orderId

);

  

event OrderMatched(

uint256 indexed orderId,

address indexed seller,

address indexed buyer,

uint256 tokenId,

address paymentToken,

uint256 price

);

  

event FeeRateUpdated(

uint256 feeDecimal,

uint256 feeRate

);
```
In the above code, we define four events: OrderAdded, OrderCanceled, OrderMatched, and FeeRateUpdated.

The OrderAdded event is emitted when a new order is added to the marketplace. It includes the orderId, seller, tokenId, paymentToken, and price as indexed parameters, allowing external systems to filter and listen specifically to certain orders.

The OrderCanceled event is emitted when an existing order is canceled. It includes the orderId as an indexed parameter, providing a reference to the canceled order.

The OrderMatched event is emitted when an order is successfully matched, indicating that a buyer has purchased an NFT from a seller. It includes the orderId, seller, buyer, tokenId, paymentToken, and price as indexed parameters, enabling external systems to track and process the order matching.

The FeeRateUpdated event is emitted when the fee rate is updated within the marketplace. It includes the feeDecimal and feeRate as parameters, informing external systems about changes in the fee structure.

By emitting these events at appropriate points in your marketplace smart contract, you provide transparency and enable other systems to interact and respond to important contract actions, enhancing the overall functionality and usability of your NFT marketplace.

### Step 4: Writing core functions

In this step, we will implement the core functions of your marketplace contract. These functions are crucial for creating, managing, and executing orders within the marketplace. They enable users to add payment tokens, update fee-related variables, calculate fees, check if an address is the seller of an order, add an order, cancel an order, execute an order, and retrieve order information.

Here's an example code snippet that includes the implementation of these core functions:
```
function addPaymentToken(address paymentToken_) external onlyOwner {

require(paymentToken_ != address(0), "Marketplace: paymentToken_ is zero address");

require(_supportedPaymentTokens.add(paymentToken_), "Marketplace: token already supported");

}

  

function isPaymentTokenSupported(address paymentToken_) public view returns (bool) {

return _supportedPaymentTokens.contains(paymentToken_);

}

  

modifier onlySupportedPaymentToken(address paymentToken_) {

require(isPaymentTokenSupported(paymentToken_), "Marketplace: unsupported payment token");

_;

}

  

function addOrder(

uint256 tokenId_,

address paymentToken_,

uint256 price_

) public onlySupportedPaymentToken(paymentToken_) {

require(nftContract.ownerOf(tokenId_) == _msgSender(), "Marketplace: sender is not the owner of the token");

require(

nftContract.getApproved(tokenId_) == address(this) ||

nftContract.isApprovedForAll(_msgSender(), address(this)),

"Marketplace: the contract is unauthorized to manage this token"

);

require(price_ > 0, "Marketplace: price must be greater than 0");

  

uint256 orderId = _orderIdCount.current();

orders[orderId] = Order(

_msgSender(),

address(0),

tokenId_,

paymentToken_,

price_

);

_orderIdCount.increment();

  

nftContract.transferFrom(_msgSender(), address(this), tokenId_);

  

emit OrderAdded(orderId, _msgSender(), tokenId_, paymentToken_, price_);

}

  

function cancelOrder(uint256 orderId_) external {

Order storage order = orders[orderId_];

require(order.buyer == address(0), "Marketplace: order has a buyer");

require(order.seller == _msgSender(), "Marketplace: sender is not the seller");

  

uint256 tokenId = order.tokenId;

delete orders[orderId_];

  

nftContract.transferFrom(address(this), _msgSender(), tokenId);

  

emit OrderCanceled(orderId_);

}

  

function executeOrder(uint256 orderId_) external {

Order storage order = orders[orderId_];

require(order.price > 0, "Marketplace: order has been canceled");

require(!isSeller(orderId_, _msgSender()), "Marketplace: buyer must be different from seller");

require(order.buyer == address(0), "Marketplace: order has a buyer");

  

order.buyer = _msgSender();

  

uint256 feeAmount = _calculateFee(orderId_);

if (feeAmount > 0) {

IERC20(order.paymentToken).transferFrom(_msgSender(), feeRecipient, feeAmount);

}

  

IERC20(order.paymentToken).transferFrom(_msgSender(), order.seller, order.price - feeAmount);

  

nftContract.transferFrom(address(this), _msgSender(), order.tokenId);

  

emit OrderMatched(orderId_, order.seller, order.buyer, order.tokenId, order.paymentToken, order.price);

}

  

function getOrderInfo(uint256 orderId_) public view returns (address, uint256, address, uint256) {

Order storage order = orders[orderId_];

return (order.seller, order.tokenId, order.paymentToken, order.price);

}

  

// Other
```
Explain Function:

addOrder:

-   This function allows a seller to add a new order to the marketplace.
    
-   The seller specifies the tokenId of the NFT they want to sell, the paymentToken address (the token that buyers will use to pay), and the price of the NFT.
    
-   The function checks that the seller is the owner of the NFT, and that the contract is authorized to manage the NFT (either through approval or operator status).
    
-   It transfers the ownership of the NFT from the seller to the marketplace contract.
    
-   Finally, it emits the OrderAdded event with the relevant details of the newly added order.
    

executeOrder:

-   This function allows a buyer to execute an order, indicating their intention to purchase the NFT.
    
-   The buyer specifies the orderId of the order they want to execute.
    
-   The function checks that the order has not been canceled, the buyer is different from the seller, and the order does not already have a buyer.
    
-   It calculates the fee amount based on the order price and the fee rate.
    
-   If a fee is applicable, it transfers the fee amount from the buyer to the fee recipient.
    
-   It transfers the remaining payment amount from the buyer to the seller.
    
-   Finally, it transfers the ownership of the NFT from the marketplace contract to the buyer and emits the OrderMatched event.
    

cancelOrder:

-   This function allows a seller to cancel an existing order.
    
-   The seller specifies the orderId of the order they want to cancel.
    
-   The function checks that the order does not have a buyer and that the caller is the seller of the order.
    
-   It transfers the ownership of the NFT back to the seller.
    
-   Finally, it emits the OrderCanceled event to indicate the cancellation of the order.
    

These functions are crucial for the basic functionality of your NFT marketplace contract, enabling users to add orders, execute purchases, and cancel orders as needed.

### Full Source code

[https://github.com/cuongpo/klaytn_nft_market_place](https://github.com/cuongpo/klaytn_nft_market_place)

## Conclusion

Congratulations! You have successfully created your own NFT marketplace smart contract on the Klaytn blockchain. By following this tutorial, you have learned how to structure your contract, import dependencies, define the Order struct, declare important variables, implement events, and create essential functions for managing orders within the marketplace. This smart contract can serve as the foundation for a secure, decentralized, and efficient NFT marketplace where users can engage in buying, selling, and trading unique digital assets.