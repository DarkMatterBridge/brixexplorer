import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  useCorsProxy = true;



  dbURL = ''
  dbToken = ''

  resultConditionTest = false;

  constructor() { }

  getFromLocalStorag() {

  }

  setTolocalStorage() {

  }


  testConditioningParser() {

  }


}
