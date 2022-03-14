import axios, {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import {
  camelCase,
  snakeCase,
} from 'change-case';

import { caseConverter } from '../utils/case-converter';

export class Request {
  private instance!: AxiosInstance;

  constructor() {
    this.initConfig();
  }

  initConfig() {
    this.instance = axios.create({ baseURL: 'http://osp-ua-dev.xyz/api/' });

    this.instance.interceptors.request.use(async config => ({
      ...config,
      data: config.data ? caseConverter(config.data, snakeCase) : config.data,
      params: config.params ? caseConverter(config.params, snakeCase) : config.params,
    }));

    this.instance.interceptors.response.use(response => ({
      ...response,
      data: caseConverter(response.data, camelCase),
    }), async error => {
      if (!error.response) {
        return Promise.reject(new Error('Error do not have a response.'));
      }

      return Promise.reject(this.parseError(error));
    });
  }

  parseError(error: AxiosError): AxiosError {
    const { response } = error;

    const convertedData = caseConverter(response?.data || {}, camelCase);
    let data: unknown;

    if (typeof convertedData === 'string' || typeof convertedData === 'number' || typeof convertedData === 'boolean' || typeof convertedData === 'undefined') {
      data = convertedData;
    } else {
      const nonFieldErorrs: Array<string> = response?.data?.non_field_errors || [];

      data = {
        ...convertedData,
        _error: nonFieldErorrs,
      };
    }

    return {
      ...error,
      response: {
        ...response,
        data,
      } as AxiosResponse,
    };
  }

  get<P, QP = unknown>(
    url: string,
    config?: AxiosRequestConfig & { params?: QP }
  ): AxiosPromise<P> {
    return this.instance.get(url, config);
  }

  post<P>(url: string, data?: unknown, config?: AxiosRequestConfig): AxiosPromise<P> {
    return this.instance.post(url, data, config);
  }

  options<P>(url: string, config?: AxiosRequestConfig): AxiosPromise<P> {
    return this.instance.options(url, config);
  }

  patch<P>(url: string, data?: unknown, config?: AxiosRequestConfig): AxiosPromise<P> {
    return this.instance.patch(url, data, config);
  }

  put<P>(url: string, data?: unknown, config?: AxiosRequestConfig): AxiosPromise<P> {
    return this.instance.put(url, data, config);
  }

  delete<P>(url: string, config?: AxiosRequestConfig): AxiosPromise<P> {
    return this.instance.delete(url, config);
  }
}

export const request = new Request();
