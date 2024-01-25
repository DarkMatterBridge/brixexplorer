import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpCallService {

  urlBridgewebs = 'https://dds.bridgewebs.com/cgi-bin/bsol2/ddummy?request=m&dealstr=';
  postfix = '&vul=None';

  constructor(private httpClient: HttpClient) {
  }

  getDDA(dealString: string):  Observable<any>  {
    const url = this.urlBridgewebs + dealString + this.postfix;
    alert(url)
    return this.httpClient.get(url, {responseType: 'text'});
  }


}
