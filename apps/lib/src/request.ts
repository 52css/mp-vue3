// utils/request.ts

// 定义请求的回调类型
// interface RequestCallbacks<T> {
//   success?: (res: T) => void;
//   fail?: (err: any) => void;
//   complete?: (res: any) => void;
// }

// 定义请求选项，继承自微信小程序的 WechatMiniprogram.request 的参数
interface RequestOptions extends WechatMiniprogram.RequestOption {
  success?: (res: WechatMiniprogram.RequestSuccessCallbackResult) => void;
  fail?: (err: WechatMiniprogram.RequestFailCallbackErr | Error) => void;
  complete?: (res: any) => void;
}

// 定义请求函数的返回类型
// type RequestFunction = (
//   options: RequestOptions
// ) => Promise<WechatMiniprogram.RequestSuccessCallbackResult>;

// 拦截器类型
type RequestInterceptor = (
  options: RequestOptions
) => RequestOptions | Promise<RequestOptions>;

type ResponseInterceptor = (
  response: WechatMiniprogram.RequestSuccessCallbackResult
) =>
  | WechatMiniprogram.RequestSuccessCallbackResult
  | Promise<WechatMiniprogram.RequestSuccessCallbackResult>;

class Request {
  private requestInterceptor?: RequestInterceptor;
  private responseInterceptor?: ResponseInterceptor;
  private defaultOptions: Partial<WechatMiniprogram.RequestOption>;
  private baseUrl: string;

  constructor() {
    // 设置默认配置
    this.defaultOptions = {
      header: {
        "Content-Type": "application/json",
      },
    };
    // 设置默认 baseUrl
    this.baseUrl = "/api";
  }

  /**
   * 设置全局的基础 URL
   * @param url 基础 URL
   */
  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  // 设置请求拦截器
  setRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptor = interceptor;
  }

  // 设置响应拦截器
  setResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptor = interceptor;
  }

  /**
   * 核心请求方法
   * @param options 请求选项
   * @returns Promise
   */
  async request(
    options: RequestOptions
  ): Promise<WechatMiniprogram.RequestSuccessCallbackResult> {
    // 合并基础 URL 和请求 URL
    const finalUrl = /^http/.test(options.url)
      ? options.url
      : this.baseUrl.endsWith("/") || options.url.startsWith("/")
      ? `${this.baseUrl}${options.url}`
      : `${this.baseUrl}/${options.url}`;

    let finalOptions: RequestOptions = {
      ...this.defaultOptions,
      ...options,
      url: finalUrl,
    };

    if (this.requestInterceptor) {
      finalOptions = await this.requestInterceptor(finalOptions);
    }

    return new Promise((resolve, reject) => {
      const { success, fail, complete, ...rest } = finalOptions;

      wx.request({
        ...rest,
        success: async (
          res: WechatMiniprogram.RequestSuccessCallbackResult
        ) => {
          try {
            if (this.responseInterceptor) {
              res = await this.responseInterceptor(res);
            }

            if (res.statusCode >= 200 && res.statusCode < 300) {
              if (typeof success === "function") {
                success(res);
              }
              resolve(res);
            } else {
              const error = new Error(`请求失败，状态码：${res.statusCode}`);
              if (typeof fail === "function") {
                fail(error);
              }
              reject(error);
            }
          } catch (error) {
            if (typeof fail === "function") {
              fail(error as Error);
            }
            reject(error);
          }
        },
        fail: (err: WechatMiniprogram.RequestFailCallbackErr) => {
          if (typeof fail === "function") {
            fail(err);
          }
          reject(err);
        },
        complete: (res: any) => {
          if (typeof complete === "function") {
            complete(res);
          }
        },
      });
    });
  }

  /**
   * 将参数对象序列化为查询字符串
   * @param params 参数对象
   * @returns 查询字符串
   */
  private serializeParams(params: Record<string, any>): string {
    const query = Object.keys(params)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join("&");
    return query;
  }

  /**
   * GET 方法
   * @param url 请求 URL
   * @param params 查询参数
   * @param options 请求选项
   * @returns Promise
   */
  get(
    url: string,
    params?: Record<string, any>,
    options?: Omit<RequestOptions, "method" | "url">
  ): Promise<WechatMiniprogram.RequestSuccessCallbackResult> {
    let finalUrl = url;
    if (params && Object.keys(params).length > 0) {
      const queryString = this.serializeParams(params);
      finalUrl += url.includes("?") ? `&${queryString}` : `?${queryString}`;
    }
    return this.request({ ...options, method: "GET", url: finalUrl });
  }

  /**
   * POST 方法
   * @param url 请求 URL
   * @param data 请求体数据
   * @param options 请求选项
   * @returns Promise
   */
  post(
    url: string,
    data?: any,
    options?: Omit<RequestOptions, "method" | "url" | "data">
  ): Promise<WechatMiniprogram.RequestSuccessCallbackResult> {
    return this.request({ ...options, method: "POST", url, data });
  }

  /**
   * OPTIONS 方法
   * @param url 请求 URL
   * @param params 查询参数
   * @param options 请求选项
   * @returns Promise
   */
  options(
    url: string,
    params?: Record<string, any>,
    options?: Omit<RequestOptions, "method" | "url">
  ): Promise<WechatMiniprogram.RequestSuccessCallbackResult> {
    let finalUrl = url;
    if (params && Object.keys(params).length > 0) {
      const queryString = this.serializeParams(params);
      finalUrl += url.includes("?") ? `&${queryString}` : `?${queryString}`;
    }
    return this.request({ ...options, method: "OPTIONS", url: finalUrl });
  }

  /**
   * HEAD 方法
   * @param url 请求 URL
   * @param params 查询参数
   * @param options 请求选项
   * @returns Promise
   */
  head(
    url: string,
    params?: Record<string, any>,
    options?: Omit<RequestOptions, "method" | "url">
  ): Promise<WechatMiniprogram.RequestSuccessCallbackResult> {
    let finalUrl = url;
    if (params && Object.keys(params).length > 0) {
      const queryString = this.serializeParams(params);
      finalUrl += url.includes("?") ? `&${queryString}` : `?${queryString}`;
    }
    return this.request({ ...options, method: "HEAD", url: finalUrl });
  }

  /**
   * PUT 方法
   * @param url 请求 URL
   * @param data 请求体数据
   * @param options 请求选项
   * @returns Promise
   */
  put(
    url: string,
    data?: any,
    options?: Omit<RequestOptions, "method" | "url" | "data">
  ): Promise<WechatMiniprogram.RequestSuccessCallbackResult> {
    return this.request({ ...options, method: "PUT", url, data });
  }

  /**
   * DELETE 方法
   * @param url 请求 URL
   * @param data 请求体数据
   * @param options 请求选项
   * @returns Promise
   */
  delete(
    url: string,
    data?: any,
    options?: Omit<RequestOptions, "method" | "url" | "data">
  ): Promise<WechatMiniprogram.RequestSuccessCallbackResult> {
    return this.request({ ...options, method: "DELETE", url, data });
  }

  /**
   * TRACE 方法
   * @param url 请求 URL
   * @param params 查询参数
   * @param options 请求选项
   * @returns Promise
   */
  trace(
    url: string,
    params?: Record<string, any>,
    options?: Omit<RequestOptions, "method" | "url">
  ): Promise<WechatMiniprogram.RequestSuccessCallbackResult> {
    let finalUrl = url;
    if (params && Object.keys(params).length > 0) {
      const queryString = this.serializeParams(params);
      finalUrl += url.includes("?") ? `&${queryString}` : `?${queryString}`;
    }
    return this.request({ ...options, method: "TRACE", url: finalUrl });
  }

  /**
   * CONNECT 方法
   * @param url 请求 URL
   * @param data 请求体数据
   * @param options 请求选项
   * @returns Promise
   */
  connect(
    url: string,
    data?: any,
    options?: Omit<RequestOptions, "method" | "url" | "data">
  ): Promise<WechatMiniprogram.RequestSuccessCallbackResult> {
    return this.request({ ...options, method: "CONNECT", url, data });
  }
}

// 创建 Request 实例
export const request = new Request();
