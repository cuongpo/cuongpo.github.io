---
title: Sending Payment Transactions using Algorand JavaScript SDK
author: Henry Pham
date: 2023-06-24 11:33:00 +0800
categories: [Coding]
tags: [Smart Contract,Algorand, Algokit]
pin: false
math: true
mermaid: true
---
## Introduction

## Introduction

In a [previous article](https://cuongpo.github.io/posts/algorand-bootcamp-1/), we learned how to create an account in Algorand and obtain its associated information. In this article, we will delve into sending payment transactions using the Algorand JavaScript SDK. Sending transactions requires gathering essential information called "Suggested params" and signing the transaction before it can be sent to the network. We will explore the necessary steps to accomplish this using the Algorand JavaScript SDK.

## Step 1: Obtaining Suggested Params

Before sending any transaction to the network, we need to gather basic information that our node requires. This information is commonly referred to as "Suggested params." Using the Algorand JavaScript SDK, we can retrieve this information by calling `algoClient.getTransactionParams().do()`. This function returns the necessary data to be included in the transactions we want to send.

    const suggestedParams = await algodClient.getTransactionParams().do();
    console.log('suggestedParams:', suggestedParams); 

The retrieved object contains details about the fee, the round, and the network we are connecting to. Running this code will display the "Suggested params" object, allowing us to examine its contents.

## Step 2: Forming and Signing the Transaction

Once we have obtained the "Suggested params," we can proceed to create the transaction and set all the required information. Using the `algosdk.makePaymentTxnWithSuggestedParamsFromObject()` method, we can form the payment transaction.

    const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        suggestedParams,
        from: account.addr,
        to: dispenserAddress,
        amount: 0.5 * 1e6, // * 1e6 to convert from ALGO to microALGO
    });

Here, we specify the sender (`from`), the recipient (`to`), and the amount to be sent (`amount`). The transaction is created with the provided suggested parameters.

Before sending the transaction, we need to sign it. We can achieve this by calling `paymentTxn.signTxn(private_key)` and passing the private key of the sender's account.

    const signedPaymentTxn = paymentTxn.signTxn(account.sk);

## Step 3: Sending and Confirming the Transaction

To send the signed transaction to the network, we utilize `algodClient.sendRawTransaction(signedPaymentTxn).do()`. This method sends the transaction and awaits its confirmation.

    await algodClient.sendRawTransaction(signedPaymentTxn).do();
    console.log(`Sending payment transaction ${paymentTxn.txID()}...`);

To ensure that the transaction is successfully sent and confirmed, we use the `algosdk.waitForConfirmation()` function. This function waits for the specified number of rounds to confirm the transaction's inclusion in the blockchain.

    const roundsToWait = 3;
    await algosdk.waitForConfirmation(algodClient, paymentTxn.txID(), roundsToWait);
    console.log(`Payment transaction ${paymentTxn.txID()} confirmed! See it at [AlgoScan](https://testnet.algoscan.app/tx/${paymentTxn.txID()})`);

In the case of the testnet, it is recommended to wait for at least three rounds before considering the transaction confirmed. However, in production (Mainnet), it is advised to use a higher number, such as 12 rounds, as it takes longer for transactions to be confirmed. Each round on Algorand takes approximately 3.5 seconds, so waiting for three rounds results in roughly a 12-second wait. If the transaction is not confirmed within the specified rounds, an error will be thrown.

## Conclusion

By following the steps outlined above, we can send payment transactions using the Algorand JavaScript SDK. Gathering the suggested parameters, forming the transaction, signing it, and confirming its inclusion in the blockchain are crucial steps in ensuring the successful execution of transactions on the Algorand network. With the Algorand JavaScript SDK, developers have a powerful toolset to interact with the Algorand blockchain and build innovative decentralized applications.