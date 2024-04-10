import axiosInstance from '@/plugins/axios';

export default abstract class Repository {
  public resource: string;
  protected httpCaller;

  protected constructor(resource?: string) {
    this.resource = resource ?? '';
    this.httpCaller = axiosInstance;
  }
}

export interface IRepository {
  resource: string;
  [key: string]: any;
}
