---
layout: post
title:  "Những khái niệm cơ bản của Blockchain"
author: sal
categories: [ Lifestyle ]
image: assets/images/dodge.jpg
rating: 4.5
---

Những khái niệm cơ bản của Blockchain

![](https://miro.medium.com/max/4800/1*oG1PT1RbSxhSnQh_JWvmhQ.png)

Trong loạt bài này, mình sẽ gợi ý một số bước ban đầu để bạn tiếp cận với nghề Blockchain Developer. Để dễ theo dõi, mình sẽ chia bài này các nhiều phần và cung cấp các hướng dẫn cụ thể ở mỗi phần.

Bước 1: [Tìm hiểu những khái niệm cơ bản](https://medium.com/genesis-block-lab/trở-thành-blockchain-developer-p-1-khái-niệm-cơ-bản-fa835601233b)

Bước 2: [Làm quen với Blockchain thông qua tiền điện tử](https://medium.com/genesis-block-lab/cách-thức-hoạt-động-của-blockchain-53f168e61047)

Bước 3: Tìm hiểu về Blockchain, Crytography và Consensus

Bước 4: Tự tạo cho mình một Blockchain

Bước 5: Tìm hiểu Ethereum, EVM và Smart Contract

Bước 6: Tự viết một DApp đơn giản và deploy lên Testnet

Bước 7: Xây dựng môi trường làm việc chuyên nghiệp với Truffle

Let’s rock & roll.

**Bước 1: Tìm hiểu những khái niệm cơ bản**

Blockchain được gọi là cách mạng công nghệ bởi vì thế giới của nó quá rộng lớn, và thay đổi rất nhiều lĩnh vực trong cuộc sống, chính vì thế trong trong thế giới Blockchain bạn phải học rất nhiều khái niệm mới, đây cũng là rào cản đầu tiên trên con đường tiếp cận Blockchain. Nếu bạn là người mới bắt đầu, mình nghĩ dưới đây là một số thuật ngữ mà bạn cần phải làm quen:

*   Blockchain: là một chuỗi các khối, dữ liệu được lưu trữ trong mỗi khối mà không có bất kỳ sự giám sát và quản lý của một bên thư ba nào. Dữ liệu này được mã hóa và không thể bị thay đổi (cryptographically secure and immutable)
*   Decentralized: Phi tập trung — Blockchain là một hệ thống phi tập trung vì không có cơ quan trung ương giám sát bất cứ điều gì, mọi người trong hệ thống đều có quyền nắm giữ thông tin trong mạng.
*   Consensus: Cơ chế đồng thuận — Cơ chế mà theo đó mạng lưới phi tập trung đi đến sự đồng thuận trên một số điều kiện nhất định.
*   Miners: Thợ mỏ — Người dùng sử dụng sức mạnh, khả năng tính toán của họ để đóng các khối. (use computational power to mine for blocks)
*   Peer to Peer (P2P): Mạng ngang hàng, còn gọi là mạng đồng đẳng, là một mạng máy tính trong đó hoạt động của mạng chủ yếu dựa vào khả năng tính toán và băng thông của các máy tham gia chứ không tập trung vào một số nhỏ các máy chủ trung tâm như các mạng thông thường.
*   Address hoặc Public address: Địa chỉ công khai là một hash của public key. Nó đóng vai trò đại diện cho địa chỉ liên lạc của bạn, bạn có thể chia sẻ địa chỉ này cho người khác mà không cần phải giữ bí mật như Private key.
*   Private Key: Là một chuỗi bí mật dùng để truy cập vào một ví. Hãy giữ bí mật nó như là giữ bí mật password tài khoản ngân hàng của mình.
*   Proof of Work (PoW): Bằng chứng công việc — Là một thuật toán đồng thuận (consensus distribution algorithm) của blockchain, thuật toán này sử dụng để xác thực 1 block trước khi gắn nó vào sổ cái. Với PoW, khi một miner (thợ đào) hoàn thành 1 block và được network chấp nhận, miner này sẽ nhận được phần thưởng là 1 lượng coin do blokchain quy định.
*   Confirmation: Hành động hash các giao dịch để tạo thành một block và thêm vào sổ cái.
*   Wallet: Một nơi lưu trữ các [private keys.](https://blockgeeks.com/guides/cryptocurrency-wallet-guide/) Thường thì một wallet là một phần mềm có thể xem các giao dịch cũng như tạo ra các giao dịch cho một (hoặc một vài) blockchain xác định.
*   Cryptocurrency: Tiền mã hóa được coi như 1 phương tiện trao đổi. Nó dùng cryptography (mật mã hóa) để bảo mật và xác minh các giao dịch, kiểm soát việc tạo ra các đơn vị mới của 1 loại tiền điện tử riêng biệt.
*   Ethereum: là một nền tảng phi tập trung dự trên blockchain dùng để thực thi các smart contracts.
*   EVM (The Ethereum Virtual Machine): Là một máy ảo (Turing complete) cho phép thực thi EVM Byte Code. Mỗi node của Ethereum chạy một EVM để tạo nên sự đồng thuận cho mạng Ethereum
*   Dapp (D[ecentralised application](https://blockgeeks.com/guides/dapps-the-decentralized-future/)): Là một ứng dụng opensource được tự vận hành và lưu trữ trên blockchain, vì opensource nên Dapp rất minh bạch và có tính phân quyền cao.

Thực hành:

*   Hãy tìm hiểu thêm nhiều khái niệm khác trong thế giới Blockchain: 51% Attack, Block Explorer, Block Height, Block Reward, DAO, Distributed Ledger, Distributed Network, Difficulty, Double Spending, Fork, Genesis Block, Hard Fork, Hash, Multi-Signature, Node, Smart Contracts, Soft Fork, Testnet, Transaction Fee, Turing Complete.
