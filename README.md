# react-native-alipay

自用 React Native 版支付宝 SDK ，源自于 [0x5e/react-native-alipay](https://github.com/0x5e/react-native-alipay)

Native AlipaySDK library ([download page](https://docs.open.alipay.com/54/104509)):

- iOS: v15.5.9 (2018.11.26)
- Android: v15.5.9 (2018.11.26)

## Features

- [x] 快捷登录授权（ https://docs.open.alipay.com/218/105327/ ）
- [x] APP 支付（ https://docs.open.alipay.com/204/105465/ ）
- [x] 手机网站转 APP 支付（ https://docs.open.alipay.com/204/105695/ ）

## Getting started

```bash
yarn add https://github.com/icemangotech/react-native-alipay
```

### Native module installation

- [iOS Setup](./docs/ios-setup.md)
- [Android Setup](./docs/android-setup.md)

## API Documentation

### Alipay.authWithInfo(infoStr)

- `infoStr` {String} Auth request info in query string format. Must be signed before use. See [Auth request params description](https://docs.open.alipay.com/218/105327).

Returns object with following fields:

| field          | type   | description                                                 |
| :------------- | :----- | :---------------------------------------------------------- |
| `resultStatus` | String | See [Response code description](#response-code-description) |
| `result`       | String | Result data in query string format                          |
| `memo`         | String | Reserved field, nothing                                     |

The `result` data has following fields:

| field         | type    | description        |
| :------------ | :------ | :----------------- |
| `success`     | Boolean | `true` if succeed  |
| `result_code` | String  | Result code        |
| `auth_code`   | String  | Authorization code |
| `user_id`     | String  | User id            |

The `result_code` description:

| code | description                                |
| :--- | :----------------------------------------- |
| 200  | 业务处理成功，会返回 authCode              |
| 202  | 系统异常，请稍后再试或联系支付宝技术支持   |
| 1005 | 账户已冻结，如有疑问，请联系支付宝技术支持 |

Example code:

```javascript
import QueryString from 'query-string';
import Alipay from 'react-native-alipay';

// 快捷登录授权
try {
  let infoStr =
    'apiname=com.alipay.account.auth&method=alipay.open.auth.sdk.code.get&app_id=xxxx&app_name=mc&biz_type=openservice&pid=xxxx&product_id=APP_FAST_LOGIN&scope=kuaijie&target_id=xxxx&auth_type=AUTHACCOUNT&sign_type=RSA2&sign=xxxx'; // get from server, signed
  let response = await Alipay.authWithInfo(infoStr);
  console.info(response);

  let { resultStatus, result, memo } = response;
  let { success, result_code, auth_code, user_id } = QueryString.parse(result);

  // TODO: ...
} catch (error) {
  console.error(error);
}
```

### Alipay.setAlipaySandbox(isSandbox)

- `isSandbox` {boolean} Whether to open sandbox. Must be payed before use. See [使用沙箱环境](https://docs.open.alipay.com/200/105311)

### Alipay.pay(orderStr)

- `orderStr` {String} Order info in query string format. Must be signed before use. See [App payment request params description](https://docs.open.alipay.com/204/105465/).

Returns object with following fields:

| field          | type   | description                                                 |
| :------------- | :----- | :---------------------------------------------------------- |
| `resultStatus` | String | See [Response code description](#response-code-description) |
| `result`       | String | Result data in json string format                           |
| `memo`         | String | Reserved field, nothing                                     |

The `result` data has following fields:

| field          | type   | description                                                            |
| :------------- | :----- | :--------------------------------------------------------------------- |
| `code`         | String | 结果码，具体见[公共错误码](https://docs.open.alipay.com/common/105806) |
| `msg`          | String | 处理结果的描述，信息来自于 code 返回结果的描述                         |
| `app_id`       | String | 支付宝分配给开发者的应用 Id                                            |
| `out_trade_no` | String | 商户网站唯一订单号                                                     |
| `trade_no`     | String | 该交易在支付宝系统中的交易流水号                                       |
| `total_amount` | String | 该笔订单的资金总额，单位为 RMB-Yuan                                    |
| `seller_id`    | String | 收款支付宝账号对应的支付宝唯一用户号                                   |
| `charset`      | String | 编码格式                                                               |
| `timestamp`    | String | 时间                                                                   |

Example code:

```javascript
import Alipay from 'react-native-alipay';

// APP支付
try {
  // 打开沙箱
  Alipay.setAlipaySandbox(true);
  let orderStr =
    'app_id=xxxx&method=alipay.trade.app.pay&charset=utf-8&timestamp=2014-07-24 03:07:50&version=1.0&notify_url=https%3A%2F%2Fapi.xxx.com%2Fnotify&biz_content=%7B%22subject%22%3A%22%E5%A4%A7%E4%B9%90%E9%80%8F%22%2C%22out_trade_no%22%3A%22xxxx%22%2C%22total_amount%22%3A%229.00%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%7D&sign_type=RSA2&sign=xxxx'; // get from server, signed
  let response = await Alipay.pay(orderStr);
  console.info(response);

  let { resultStatus, result, memo } = response;
  let {
    code,
    msg,
    app_id,
    out_trade_no,
    trade_no,
    total_amount,
    seller_id,
    charset,
    timestamp,
  } = JSON.parse(result);

  // TODO: ...
} catch (error) {
  console.error(error);
}
```

### Alipay.payInterceptorWithUrl(h5PayUrl)

- `h5PayUrl` {String} The url string of mobile webpage payment. You may get it from webview. See [document](https://docs.open.alipay.com/204/105695/) for detail.

Returns object with following fields:

| field        | type   | description                          |
| :----------- | :----- | :----------------------------------- |
| `resultCode` | String | [返回码](#response-code-description) |
| `returnUrl`  | String | 支付结束后应当跳转的 url 地址        |

Example code:

```javascript
import Alipay from 'react-native-alipay';

// 手机网站转APP支付
try {
  let h5PayUrl = 'https://wappaygw.alipay.com/service/rest.htm?_input_charset=utf-8&format=xml&partner=xxxx&req_data=%3Cauth_and_execute_req%3E%3Crequest_token%3Exxxx%3C%2Frequest_token%3E%3C%2Fauth_and_execute_req%3E&sec_id=MD5&service=alipay.wap.auth.authAndExecute&v=2.0&sign=xxxx'; // get from webview, signed
  let { resultCode, returnUrl } = await Alipay.payInterceptorWithUrl(h5PayUrl);
  console.info(resultCode, returnUrl);
} catch (error) {
  console.error(error);
}
```

### Response code description

| code | description  |
| :--- | :----------- |
| 9000 | 操作成功     |
| 8000 | 正在处理中   |
| 4000 | 操作失败     |
| 5000 | 重复请求     |
| 6001 | 用户中途取消 |
| 6002 | 网络连接出错 |
