declare type TStatus = '9000' | '8000' | '4000' | '5000' | '6001' | '6002';
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
declare function authWithInfo(infoStr: string): Promise<IResult>;
/**
 * 设置沙箱模式
 *
 * @platform Android
 */
declare function setAlipaySandbox(isSandbox: boolean): void;
/**
 * 支付接口
 *
 * @param {string} infoStr 支付订单信息字串
 */
declare function pay(infoStr: string): Promise<IResult>;
/**
 * 从h5链接中获取订单串并支付接口
 *
 * @param urlStr 拦截的 url string
 */
declare function payInterceptorWithUrl(urlStr: string): Promise<{
    resultCode: TStatus;
    returnUrl: string;
}>;
declare const Alipay: {
    authWithInfo: typeof authWithInfo;
    setAlipaySandbox: typeof setAlipaySandbox;
    pay: typeof pay;
    payInterceptorWithUrl: typeof payInterceptorWithUrl;
};
export default Alipay;
//# sourceMappingURL=index.d.ts.map