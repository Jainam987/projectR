import axios from 'axios';
import {
  AxiosDeleteParams,
  AxiosGetParams,
  AxiosPatchParams,
  AxiosPostParams,
  AxiosPutParams,
} from './dto';


// url
// method
// baseURL
// headers
// params
// data
// timeout
// timeoutErrorMessage
// responseType
// responseEncoding
// auth
// proxy

export class AxiosService {
  async get({ url }: AxiosGetParams): Promise<any> {
    return await axios.get(url);
  }

  async post({ url, data }: AxiosPostParams): Promise<any> {
    return await axios.post(url, data);
  }

  async put({ url, data }: AxiosPutParams): Promise<any> {
    return await axios.put(url, data);
  }

  async delete({ url }: AxiosDeleteParams): Promise<any> {
    return await axios.delete(url, );
  }

  async patch({ url, data }: AxiosPatchParams): Promise<any> {
    return await axios.patch(url, data);
  }

  async axiosMethod({ method, url, data }: any): Promise<any> {
    return await axios[method](url, data);
  }
}
