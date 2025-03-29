/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @about
 * HTTP Service Facade
 *
 * This class provides a low-level abstraction over the Axios HTTP client,
 * offering a simplified interface for making HTTP requests.
 *
 * Key Features:
 * - Encapsulates Axios configuration and request methods
 * - Supports both authenticated and non-authenticated requests
 * - Provides type-safe methods for common HTTP operations (GET, POST, PUT, PATCH, DELETE)
 *
 * Usage Notes:
 * 1. Replace 'TOKEN_STORAGE_KEY' with your actual token storage mechanism.
 * 2. Update the 'baseURL' in the constructor to point to your API's base URL.
 * 3. Customize the error handling and request/response interceptors as needed.
 *
 * @example
 * const privateApi = new HttpService();
 * const publicApi = new HttpService(false);
 *
 * // Making a GET request
 * const data = await privateApi.httpGetRequest<ResponseType>('/endpoint');
 *
 * @template ResponseType - The expected type of the API response
 * @template RequestDataType - The type of data sent in POST, PUT, and PATCH requests
 */

import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from "axios";

interface IResponse<T = unknown> {
    data: T;
    status: number;
    message?: string;
}

interface IResponseError {
    statusCode: number;
    message: string;
}

class ResponseError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
        this.name = 'ResponseError';
    }
}

class HttpService {
    private _axiosService: AxiosInstance;

    constructor(
        authRequest = false,
        baseUrl = 'https://b8m9hzhr75.execute-api.ap-southeast-1.amazonaws.com/dev/',
    ) {
        this._axiosService = axios.create({
            baseURL: baseUrl,
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    public httpGetRequest<ResponseType = unknown, Config = unknown>(
        url: string,
        queryParams?: Record<string, any>,
        config?: AxiosRequestConfig<Config>,
    ) {
        const finalConfig: AxiosRequestConfig<Config> = {
            ...config,
            params: queryParams,
        };

        return this.handleResponse<ResponseType, Config>(
            this._axiosService.get(url, finalConfig),
        );
    }

    public httpPostRequest<
        Data = Record<string, unknown>,
        ResponseType = unknown,
        Config = unknown,
    >(
        url: string,
        data: Data,
        config?: AxiosRequestConfig<Config extends Data ? any : any>,
    ) {
        return this.handleResponse<ResponseType, Config>(
            this._axiosService.post(url, data, config),
        );
    }

    public httpPutRequest<
        Data = Record<string, unknown>,
        ResponseType = unknown,
        Config = unknown,
    >(
        url: string,
        data: Data,
        config?: AxiosRequestConfig<Config extends Data ? any : any>,
    ) {
        return this.handleResponse<ResponseType, Config>(
            this._axiosService.put(url, data, config),
        );
    }

    public httpPatchRequest<
        Data = Record<string, unknown>,
        ResponseType = unknown,
        Config = unknown,
    >(
        url: string,
        data: Data,
        config?: AxiosRequestConfig<Config extends Data ? any : any>,
    ) {
        return this.handleResponse<ResponseType, Config>(
            this._axiosService.patch(url, data, config),
        );
    }

    public httpDeleteRequest<ResponseType = unknown, Config = unknown>(
        url: string,
        config?: AxiosRequestConfig<Config>,
    ) {
        return this.handleResponse<ResponseType, Config>(
            this._axiosService.delete(url, config),
        );
    }

    private async handleResponse<ResponseType = unknown, Config = unknown>(
        action: Promise<AxiosResponse<IResponse<ResponseType>, Config>>,
    ) {
        try {
            const response = await action;
            return response.data;
        } catch (_err) {
            if (_err instanceof AxiosError) {
                const errorResponseMessage = _err.response?.data as IResponseError;
                throw new ResponseError(
                    errorResponseMessage.statusCode,
                    errorResponseMessage.message,
                );
            }

            // Log chi tiết lỗi để dễ dàng gỡ lỗi
            console.error('HTTP Service Error:', _err);

            // Tạo thông báo lỗi chi tiết hơn nếu có thể
            const errorMessage = _err instanceof Error
                ? `An unexpected error occurred: ${_err.message}`
                : "An unexpected error occurred";

            throw new ResponseError(500, errorMessage);
        }
    }
}
// Export instances for different use cases
const publicAPIHttpServices = new HttpService();
const privateAPIHttpServices = new HttpService();

export {
    privateAPIHttpServices,
    publicAPIHttpServices,
    ResponseError,
    type IResponse,
    type IResponseError,
};