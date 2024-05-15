import { Injectable } from '@angular/core';
import {ResponseData} from './response-data-interface'; // Import the interface

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private responseData?: ResponseData; // Use the interface

  constructor() { }

  setResponseData(data: ResponseData): void { // Use the interface
    this.responseData = data;
  }

  getResponseData(): ResponseData | undefined { // Use the interface
    return this.responseData;
  }
}
