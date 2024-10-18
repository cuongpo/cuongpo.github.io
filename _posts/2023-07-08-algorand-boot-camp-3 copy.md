---
title: Alogrand Bootcamp Ep 3 | Create ASA, Send Asset Transfer
author: Henry Pham
date: 2023-07-08 11:33:00 +0800
categories: [Coding]
tags: [Smart Contract,Algorand, Algokit]
pin: false
math: true
mermaid: true
---
Algorand, the blockchain platform known for its decentralization and security, offers a simple yet powerful way to create and manage assets using its JavaScript SDK. Unlike other chains that require smart contracts to mint assets, Algorand allows you to mint assets directly using the SDK, providing a decentralized and secure alternative.

## Creating an Asset

When creating an asset, you start by calling the `makeAssetCreateTxnWithSuggestedParams` function and passing in the suggested parameters for the transaction. These parameters include the sender of the transaction (account that mints the asset), the asset name, unit name (ticker), total supply, decimals, and various optional fields.

For example, to create an asset called "My First Asset" with ticker "MFA" and a total supply of 100 units (with 1 decimal place), you would define the following parameters:

    const assetParams = {
      creator: sender, // Account that creates the asset
      name: "My First Asset",
      unitName: "MFA",
      total: 100,
      decimals: 1,
      // Optional fields (e.g., reserve, freeze, clawback, manager, etc.)
    };

The `total` parameter specifies the number of units of the asset to be created. In the example above, we have 100 units, which will be divided by 10 (1 decimal place) on the network. This means that when transferring 10 units, it will be considered as 1 unit by the network.

Additionally, you can set optional fields such as the reserve account (holding uncirculated supply), freeze address (authority to freeze assets), default frozen status, clawback address (ability to revoke assets), asset URL, and manager account.

Once you have defined the asset parameters, you create an unsigned transaction by calling `algosdk.makeAssetCreateTxnWithSuggestedParams(assetParams)`. To complete the transaction, sign it using the sender's private key:

`const signedTxn = assetTxn.signTxn(sender.sk);` 

## Sending the Asset Transfer

To send an asset transfer, you need to create an asset transfer transaction using the `makeAssetTransferTxnWithSuggestedParams` function. This transaction allows you to transfer assets from one account to another.

In the asset transfer transaction, you define the sender, receiver, asset index, and the amount of assets to be transferred. Remember that in Algorand, the receiver needs to opt-in to receive the asset by sending a zero asset transfer to itself.

Here's an example of how to create an asset transfer transaction:

    const assetTransferParams = {
      sender: sender.addr,
      recipient: receiver.addr,
      assetIndex: assetIndex,
      amount: 25, // 2.5 units (considering 1 decimal place)
    };
    
    const assetTransferTxn = algosdk.makeAssetTransferTxnWithSuggestedParams(assetTransferParams);

Once the transaction is created, sign it using the sender's private key:

`const signedTxn = assetTransferTxn.signTxn(sender.sk);` 

## Opting into the Asset

Before receiving an asset transfer, the receiving account needs to opt into the asset. This step ensures that the account reserves space on the ledger to keep track of the asset balance.

To opt into an asset, you can use an asset transfer transaction with a zero amount from the account to itself, including the asset index of the asset you want to opt into. The fee for this transaction can be set to zero to avoid additional charges.


    const optInParams = {
      sender: account.addr,
      recipient: account.addr,
      assetIndex: assetIndex, // Index of the asset to opt into
      amount: 0, // Zero amount for opting in
    };
    
    const optInTxn = algosdk.makeAssetTransferTxnWithSuggestedParams(optInParams);

Again, sign the transaction with the account's private key:

`const signedTxn = optInTxn.signTxn(account.sk);` 

## Atomic Transactions and Transaction Groups

To perform multiple transactions atomically, you can create a transaction group. A transaction group is a collection of transactions that are executed together, ensuring that all transactions in the group succeed or fail together.

To create a transaction group, you need to:

1.  Create an array of transactions.
2.  Assign a group ID to the transactions using `algosdk.assignGroupID`.
3.  Sign each transaction with the corresponding account's private key.
4.  Send the signed transactions as a group to the network using `algodClient.sendRawTransactions`.

Remember to set the correct sender for each transaction in the group to align with the account used for signing.

## Conclusion

The Algorand JavaScript SDK provides a straightforward and efficient way to create and manage assets on the Algorand blockchain. With simple functions and parameters, you can mint assets, send asset transfers, and even perform atomic transactions using transaction groups.

By leveraging the Algorand JavaScript SDK, developers can harness the power of Algorand's secure and decentralized network to build a variety of applications, from non-fungible tokens (NFTs) to decentralized finance (DeFi) platforms. The Algorand ecosystem offers endless possibilities for asset creation, transfer, and management, all backed by the robustness and efficiency of the Algorand blockchain.
