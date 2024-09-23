interface RequestOptions extends WechatMiniprogram.RequestOption {
    success?: (res: WechatMiniprogram.RequestSuccessCallbackResult) => void;
    fail?: (err: WechatMiniprogram.RequestFailCallbackErr | Error) => void;
    complete?: (res: any) => void;
}
type RequestInterceptor = (options: RequestOptions) => RequestOptions | Promise<RequestOptions>;
type ResponseInterceptor = (response: WechatMiniprogram.RequestSuccessCallbackResult) => WechatMiniprogram.RequestSuccessCallbackResult | Promise<WechatMiniprogram.RequestSuccessCallbackResult>;
declare class Request {
    private requestInterceptor?;
    private responseInterceptor?;
    private defaultOptions;
    private baseUrl;
    constructor();
    /**
     * 设置全局的基础 URL
     * @param url 基础 URL
     */
    setBaseUrl(url: string): void;
    setRequestInterceptor(interceptor: RequestInterceptor): void;
    setResponseInterceptor(interceptor: ResponseInterceptor): void;
    /**
     * 核心请求方法
     * @param options 请求选项
     * @returns Promise
     */
    request(options: RequestOptions): Promise<WechatMiniprogram.RequestSuccessCallbackResult>;
    /**
     * 将参数对象序列化为查询字符串
     * @param params 参数对象
     * @returns 查询字符串
     */
    private serializeParams;
    /**
     * GET 方法
     * @param url 请求 URL
     * @param params 查询参数
     * @param options 请求选项
     * @returns Promise
     */
    get(url: string, params?: Record<string, any>, options?: Omit<RequestOptions, "method" | "url">): Promise<WechatMiniprogram.RequestSuccessCallbackResult>;
    /**
     * POST 方法
     * @param url 请求 URL
     * @param data 请求体数据
     * @param options 请求选项
     * @returns Promise
     */
    post(url: string, data?: any, options?: Omit<RequestOptions, "method" | "url" | "data">): Promise<WechatMiniprogram.RequestSuccessCallbackResult>;
    /**
     * OPTIONS 方法
     * @param url 请求 URL
     * @param params 查询参数
     * @param options 请求选项
     * @returns Promise
     */
    options(url: string, params?: Record<string, any>, options?: Omit<RequestOptions, "method" | "url">): Promise<WechatMiniprogram.RequestSuccessCallbackResult>;
    /**
     * HEAD 方法
     * @param url 请求 URL
     * @param params 查询参数
     * @param options 请求选项
     * @returns Promise
     */
    head(url: string, params?: Record<string, any>, options?: Omit<RequestOptions, "method" | "url">): Promise<WechatMiniprogram.RequestSuccessCallbackResult>;
    /**
     * PUT 方法
     * @param url 请求 URL
     * @param data 请求体数据
     * @param options 请求选项
     * @returns Promise
     */
    put(url: string, data?: any, options?: Omit<RequestOptions, "method" | "url" | "data">): Promise<WechatMiniprogram.RequestSuccessCallbackResult>;
    /**
     * DELETE 方法
     * @param url 请求 URL
     * @param data 请求体数据
     * @param options 请求选项
     * @returns Promise
     */
    delete(url: string, data?: any, options?: Omit<RequestOptions, "method" | "url" | "data">): Promise<WechatMiniprogram.RequestSuccessCallbackResult>;
    /**
     * TRACE 方法
     * @param url 请求 URL
     * @param params 查询参数
     * @param options 请求选项
     * @returns Promise
     */
    trace(url: string, params?: Record<string, any>, options?: Omit<RequestOptions, "method" | "url">): Promise<WechatMiniprogram.RequestSuccessCallbackResult>;
    /**
     * CONNECT 方法
     * @param url 请求 URL
     * @param data 请求体数据
     * @param options 请求选项
     * @returns Promise
     */
    connect(url: string, data?: any, options?: Omit<RequestOptions, "method" | "url" | "data">): Promise<WechatMiniprogram.RequestSuccessCallbackResult>;
}
export declare const request: Request;
export {};
