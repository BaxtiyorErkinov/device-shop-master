type RequestMethods = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface ICrudTemplateMethods {
  getAll(queryParams: any): Promise<any>;
  get(id: number): Promise<any>;
  update(
    id: number,
    payload: any,
    method: Extract<RequestMethods, 'put' | 'patch'>,
  ): Promise<any>;
  create(payload: any): Promise<any>;
  delete(id: number): Promise<any>;
}
