import {Quote} from '../types';

// Omit<Quote, 'id'>

interface IQuoteService {
  getList: () => Promise<Quote[]>;
  getOne: (id: string) => Promise<Quote>;
  new: (data: Quote) => Promise<Quote>;
  update: (data: Quote) => Promise<Quote>;
  delete: (id: string) => Promise<boolean>;
  path: string;
}

enum methods {
  'POST' = 'POST',
  'GET' = 'GET',
  'DELETE' = 'DELETE',
  'PUT' = 'PUT',
}

class QuoteService implements IQuoteService {
  path: string;

  constructor() {
    this.path = process.env.REACT_APP_BACKEND_HTTP_URI!;
  }

  getList = (): Promise<any> => {
    return fetch(`${this.path}/quote`, {method: methods.GET});
  }
  
  getOne = (id: string): Promise<any> => {
    return fetch(`${this.path}/quote/${id}`, {method: methods.GET});
  }

  delete = (id: string): Promise<any> => {
    return fetch(`${this.path}/quote/${id}`, {method: methods.DELETE});
  }

  new = (data: Quote): Promise<any> => {
    return fetch(`${this.path}/quote`, {headers: {"Content-Type": 'application/json'}, method: methods.POST, body: JSON.stringify(data)});
  }

  update = (data: Quote): Promise<any> => {
    return fetch(`${this.path}/quote`, {headers: {"Content-Type": 'application/json'}, method: methods.PUT, body: JSON.stringify(data)});
  }
}
export default new QuoteService();