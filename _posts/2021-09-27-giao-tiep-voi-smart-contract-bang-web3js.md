---
layout: post
title:  "Giao tiếp với Smart Contract bằng web3js"
author: sal
categories: [ Lifestyle ]
image: assets/images/dodge.jpg
rating: 4.5
---

1. Tạo mới
	truffle init
2. Build 
	truffle build
3. Chỉnh solidity version truffle
	truffle-config.js

Sau khi build xong -> buid\contracts có chứa các file json
Để tương tác với contract có 2 cái quan trong nhất là address của contract và abi

Khi mình build mình có abi, còn khi deploy sẽ có địa chỉ

4. Bật ganache
	truffle develop

5. Migrate
	migrate --reset

6. Tạo thư mục chứa front-end --> đặt tên là client
	mình cần sử dụng thư viện web3 để tương tác với contract -> 
	npm install web3