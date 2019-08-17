import { NativeModules } from 'react-native';
var NativeAlipay = NativeModules.Alipay;
/**
 * 快速登录授权
 *
 * @param {string} infoStr 授权请求信息字串
 * @returns {Promise<IResult>}
 */
function authWithInfo(infoStr) {
    if (!NativeAlipay)
        return Promise.reject();
    return NativeAlipay.authWithInfo(infoStr);
}
/**
 * 设置沙箱模式
 *
 * @platform Android
 */
function setAlipaySandbox(isSandbox) {
    if (NativeAlipay) {
        NativeAlipay.setAlipaySandbox(isSandbox);
    }
}
/**
 * 支付接口
 *
 * @param {string} infoStr 支付订单信息字串
 */
function pay(infoStr) {
    if (!NativeAlipay)
        return Promise.reject();
    return NativeAlipay.pay(infoStr);
}
/**
 * 从h5链接中获取订单串并支付接口
 *
 * @param urlStr 拦截的 url string
 */
function payInterceptorWithUrl(urlStr) {
    if (!NativeAlipay)
        return Promise.reject();
    return NativeAlipay.payInterceptorWithUrl(urlStr);
}
var Alipay = {
    authWithInfo: authWithInfo,
    setAlipaySandbox: setAlipaySandbox,
    pay: pay,
    payInterceptorWithUrl: payInterceptorWithUrl
};
export default Alipay;
