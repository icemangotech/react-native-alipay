import { NativeModules } from 'react-native';
const { Alipay: NativeAlipay } = NativeModules;

type TStatus = '9000' | '8000' | '4000' | '5000' | '6001' | '6002';

interface IResult {
  resultStatus: TStatus;
  result: string;
  memo: string;
}

/**
 * 快速登录授权
 *
 * @param {string} infoStr 授权请求信息字串
 * @returns {Promise<IResult>}
 */
function authWithInfo(infoStr: string): Promise<IResult> {
  if (!NativeAlipay) return Promise.reject();
  return NativeAlipay.authWithInfo(infoStr);
}

/**
 * 设置沙箱模式
 *
 * @platform Android
 */
function setAlipaySandbox(isSandbox: boolean): void {
  if (NativeAlipay) {
    NativeAlipay.setAlipaySandbox(isSandbox);
  }
}

/**
 * 支付接口
 *
 * @param {string} infoStr 支付订单信息字串
 */
function pay(infoStr: string): Promise<IResult> {
  if (!NativeAlipay) return Promise.reject();
  return NativeAlipay.pay(infoStr);
}

/**
 * 从h5链接中获取订单串并支付接口
 *
 * @param urlStr 拦截的 url string
 */
function payInterceptorWithUrl(
  urlStr: string
): Promise<{
  resultCode: TStatus;
  returnUrl: string;
}> {
  if (!NativeAlipay) return Promise.reject();
  return NativeAlipay.payInterceptorWithUrl(urlStr);
}

const Alipay = {
  authWithInfo,
  setAlipaySandbox,
  pay,
  payInterceptorWithUrl,
};

export default Alipay;
