---
layout: post
title:  "Blockchain và Web Development"
author: sal
categories: [ Lifestyle ]
image: assets/images/dodge.jpg
rating: 4.5
---

Blockchain và Web Development
=============================


Khi tôi bắt đầu học blockchain tôi đã rất bối rối về việc kết nối các trang web với blockchain. Ban đầu, để xây dựng một DAPP với blockchain, tôi đã sử dụng truffle, ganache, meta-mask và web3-js.

Bài viết này là về việc thiết lập một trang web để tương tác với blockchain (bao gồm cả code) và luồng kiến trúc của nó. Vì vậy, nếu bạn quan tâm đến việc tìm hiểu luồng kiến trúc khi blockchain tương tác với các trang web. Xin vui lòng tiếp tục :-)

Là người mới bắt đầu, tôi chỉ biết về phát triển web cơ bản như HTML, CSS, JS, NodeJS. Vì vậy, tôi không có nhiều lựa chọn khi chọn một truffle box để phát triển ứng dụng của mình.

> Truffle là một công trình khung nổi tiếng với cách gọi “con dao quân đội Thụy Sĩ của blockchain”. Về cơ bản truffle là một template giúp chúng ta viết code solidity, test code, triển khai và tương tác code với front-end của web development.

**_Ví dụ:_** Nếu bạn đang làm việc trên một ứng dụng web bao gồm reactJs và blockchain. Truffle sẽ cung cấp một truffle box với một số mẫu tương tác của reactjs với blockchain, một thiết lập kiểm tra thích hợp cho code solidity của bạn và nhiều chức năng khác.

> Ganache là một ứng dụng, thiết lập thử nghiệm kết nối mạng Ethereum với 10 tài khoản ban đầu, mỗi tài khoản có 100 ETH và được lập trình sẵn để chạy mining (đào) một cách tự động.

Dù Truffle box cung cấp các chức năng trực tiếp để bạn kết hợp Blockchain với web development, nhưng điều quan trọng là bạn phải hiểu được toàn bộ quy trình trong cách mà Blockchain tương tác với web development, vì sẽ không có nghĩa lý gì trong việc tạo ra một ứng dụng chỉ để tìm hiểu về Blockchain. Và bởi vì tất cả các công trình khung trong Truffle box làm cho mọi thứ dễ dàng hơn bằng việc cung cấp một sự khái quát để phát triển các ứng dụng blockchain. Nên tôi đã quyết định tìm ra cách mọi thứ hoạt động chính xác bằng cách tránh sử dụng các khung công cụ và công cụ này.

Chúng ta hãy xem cách chúng hoạt động.

Quan sát hình bên dưới. Toàn bộ lời giải thích của nằm trong hình này. Nó trình bày cách blockchain tương tác với các trang web.

![](https://miro.medium.com/max/3000/1\*BCiDdxRz34zBj7tRRV8psQ.png)

Tôi sẽ giả thuyết rằng các bạn đã biết về những thứ sau đây trước khi bắt đầu bài tập phát triển này:

*   Sử dụng HTML, CSS, Java Script và nodeJS để phát triển các ứng dụng web cơ bản
*   Sử dụng [Solidity](https://medium.com/@w_n1c01a5/hello-world-on-solidity-ethereum-b6a4de6a4258) để viết Smart Contract

Sử dụng Geth Console để tạo ra một vài tài khoản (cặp public và private key) và bắt đầu đào bằng cách tạo ra các Blockchain cục bộ. Nếu bạn muốn tìm hiểu cụ thể về vấn đề này, [xem ở đây](https://medium.com/@chim/ethereum-how-to-setup-a-local-test-node-with-initial-ether-balance-using-geth-974511ce712)

*   [web3Js](https://www.youtube.com/watch?v=t3wM5903ty0) được sử dụng để truy cập các chức năng và các biến trong code solidity từ trang web của tôi và thực hiện các giao dịch.

**Lưu ý:** Vui lòng xem qua blog ở trên. Vì toàn bộ blog này được dựa trên thiết lập geth từ blog ở trên.

Xem xét trường hợp ta có một trang web được lưu trữ trên máy chủ cục bộ và bây giờ ta cần phải thêm chức năng Blockchain vào trang web. Hãy tạo ra 1 trang web gọi hàm `renderHelloWorld()` trong solidity và in kết quả trả về trên trang web.

Đây là Solidity Contract của helloWorld:

*   Bây giờ chúng ta đã có code solidity, và hãy biên dịch nó bằng cách dùng nodejs script tùy chỉnh sử dụng solcJS module
*   Biên dịch code solidity cho chúng ta ABI (giao diện nhị phân ứng dụng) và mã byte.

> Giải thích về ABI và mã Byte:

> Trong c ++ hoặc java, ta biên dịch mã và nhận mã nhị phân để thực thi . Mã byte cũng tương tự như vậy. Nó được sử dụng để triển khai smart contract trên Blockchain  
> ABI giúp web3Js trong việc giao tiếp với Blockchain. Vì code của chúng ta không biết cấu trúc chính xác của Blockchain. Cấu trúc ở đây là tên, input, output và loại hàm.

![](https://miro.medium.com/max/1800/1\*8Uqjv-7cSc5H629wZv9BdQ.jpeg)

> ABI nói với frontent code: bất cứ khi nào bạn nói chuyện với Blockchain, hãy sử dụng tôi để truy cập bất kỳ đối tượng cụ thể nào trong code solidity được triển khai trong Blockchain đó.

Nếu bạn muốn tìm hiểu thêm về ABI, hãy click vào [đây](https://www.sitepoint.com/compiling-smart-contracts-abi/)

Giờ đã đủ lý thuyết, hãy tạo một vài ABI và mã Byte bằng cách sử dụng nodejs script. Vui lòng vào kho lưu trữ git-hub bên dưới và tải xuống mã.



abhilashreddyy/hello-world-webdev-with-blockchain
-------------------------------------------------

### repo supporting my medium blog. Contribute to abhilashreddyy/hello-world-webdev-with-blockchain development by creating…

github.com

https://github.com/abhilashreddyy/hello-world-webdev-with-blockchain

Trong đó, bạn có thể thấy cấu trúc dữ liệu như sau:

compile.js biên dịch solidity code để tạo mã ABI và byte.

Biên dịch solidity code
-----------------------

Đoạn trích code trên nhập vào module solc (solidity compiler), được dùng để biên dịch code solidity. Đối số command line đầu tiên `process.argv[2` diễn tả con đường của solidity code, đối số command line thứ 2 `process.argv[3]` diễn tả con đường của file output.

Đọc code solidity từ import và biên dịch:

Viết mã ABI và Byte được tạo ra vào files trong Hello\_world folder

Hãy biên dịch`compile.js` sử dụng command`node .\compile.js hello_world.sol ..\hello_world` .Giờ thì bạn sẽ có thể tìm thấy2 file `helloWorld.abi & helloWorld.code` trong **hello\_world** folder.

Bây giờ chúng tôi đã biên dịch mã solidity của chúng tôi và có được mã ABI và Byte.

Để truy cập các chức năng và các biến trong solidity từ trang web, chúng ta sử dụng web3JS. Có 2 điều cần lưu ý:

*   Địa chỉ của Blockchain: Bởi vì chúng ta triển khai ứng dụng của mìnhtrong mạng chính cùng với smart contract khác. Vì vậy, về cơ bản chúng ta cần một cái gì đó để xác định duy nhất ứng dụng của chúng ta được triển khai, địa chỉ ở đây là một định danh duy nhất của contract được triển khai của chúng ta trên Blockchain
*   ABI (giao diện nhị phân ứng dụng) như được thảo luận trước đó

Tạo địa chỉ:
------------

Bây giờ thì giao diện điều khiển của geth (go-ethereum) đã trở thành huyền thoại. Geth là một siêu anh hùng với nhiều sức mạnh siêu nhiên, và chúng ta sẽ sử dụng một số trong đó cho ứng dụng của mình:

*   Nó có thể tạo tài khoản, public key và private key với ETH giả
*   Nó có thể khởi tạo mạng blockchain thử nghiệm tại một cổng cụ thể trên máy chủ cục bộ dựa trên một khối genesis.
*   Nó có thể khai thác trên một mạng blockchain thể được triển khai trên một cổng cụ thể.

```
geth --identity “LocalTestNode” --rpc --rpcport 8080 --rpccorsdomain “\*” --datadir ~/mychain/data/ --port 30303 --nodiscover --rpcapi db,eth,net,web3,personal --networkid 1999 --maxpeers 0 console
```

Đây là 1 node Ethereum cục bộ được thiết lập trên cổng 8080. Điều này có nghĩa là nhà cung cấp mạng ethereum của chúng ta đang chạy tại “localhost: 8080”.

> Tạo một mạng Blockchain cục bộ được viết trong Blog [này](https://medium.com/@chim/ethereum-how-to-setup-a-local-test-node-with-initial-ether-balance-using-geth-974511ce712) blog và bắt đầu mining sử dụng `miner.start()`trong giao diện điều khiển geth. Hãy nhớ rằng blog này rất quan trọng trong việc hiểu những vấn đề về sau. Do đó, hãy đọc và thiết lập 1 blockchain với một vài ETH giả và bắt đầu giao diện điều khiển geth của bạn, bắt đầu mining như hướng dẫn trong blog này.

Giờ thì trở lại với phần địa chỉ, bây giờ hãy hiểu rõ `compile_and_deploy/deploy.js` để bắt đầu tạo ra địa chỉ bằng cách chạy đoạn code NodeJS này.

Nhập các mô-đun bắt buộc và đặt địa chỉ của nhà cung cấp. Hiện tại nhà cung cấp của chúng ta là giao diện điều khiển geth chạy trên **localhost:8080**

Đọc mã ABI và byte được tạo trong quá trình biên dịch và tạo một obbject để thực hiện một giao dịch mẫu và lấy địa chỉ.

Mở khóa tài khoản dùng để thực hiện giao dịch. Trong trường hợp này, ta sử dụng tài khoản đầu tiên của geth là:`web3.eth.accounts[0]`.

Triển khai một smart contract mới , để triển khai, ta gửi biến `code` — mã byte của smart contract, lượng gas tối đa và public key của tài khoản để thực hiện.

Trong mã bên dưới, chúng ta đang chờ nhận giao dịch và địa chỉ có thể được trả lại chỉ khi giao dịch của chúng ta được thêm thành công vào Blockchain.

Hãy xem tập tin deploy.js hoàn chỉnh

Biên dịch code trên trong terminal`node deploy.js`. Bằng cách này, địa chỉ sẽ được hiển thị trên giao diện điều khiển.

Ở giai đoạn này, chúng ta có ABI, mã byte và địa chỉ nơi smart contract được triển khai. Cho phép thiết lập web3 để tương tác với smart contract.

Javascript code trong front-end
-------------------------------

Đặt địa chỉ của nhà cung cấp web3, tạo đối tượng của lớp web3 và xác định tài khoản biến với `public key`

`print_hello()` gọi hàm solidity `renderHelloWorld`, sử dụng tài khoản đã đề cập trước đó:

Đây là đoạn code cuối cùng, code này sử dụng ABI và địa chỉ của smart contract để gọi hàm hello world. Nếu tài khoản bị khóa thì nó sẽ nhắc mật khẩu, nếu không thì hàm hello world sẽ được gọi trực tiếp. Bảo toàn đoạn code ở hàm `print_hello()` tương tác với solidity code.

Nếu mọi thứ ổn, bạn sẽ thấy hiển thị như sau trong trình duyệt web của bạn

![](https://miro.medium.com/max/1994/1\*h8Cq5V4jDlzckyBMPK-BHg.png)

**Lưu ý:** Bất kỳ lúc nào khi gọi 1 hàm hoặc thực hiện một giao dịch, hãy chắc chắn rằng node của bạn vẫn đang khai thác trên giao diện điều khiển Geth, bởi vì mọi giao dịch cần phải bao gồm trong đó Blockchain. Vì đó, mãi tới lúc ta bắt đầu khai thác, về cơ bản thì sẽ không có ai xác thực giao dịch của chúng ta và thêm vào Blockchain.

Xem lại bức ảnh dưới đây một lần nữa, sau khi đọc hết bài viết, bạn sẽ cảm thấy dễ tiếp thu hơn khi nhìn lại nó:

![](https://miro.medium.com/max/3000/1\*BCiDdxRz34zBj7tRRV8psQ.png)

**Kết luận:** Với những người vừa mới học Blockchain, vui lòng đừng sử dụng toàn bộ công cụ, lối tắt, công trình khung để phát triển dự án của mình. Hãy học mọi thứ từ gốc rễ vì điều đó sẽ tốt cho sự phát triển lâu dài của bạn. Một nền móng tốt sẽ là cơ sở vững chắc cho một công trình đồ sộ!

Nguồn: [abhilash reddy@Coinmock](https://medium.com/coinmonks/blockchain-with-web-development-dfb474508fb4)


