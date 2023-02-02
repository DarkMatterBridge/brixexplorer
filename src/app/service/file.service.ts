import {Injectable} from '@angular/core';
// import {HttpClient} from '@angular/common/http';
import {BNode} from '../model/BNode';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from "@angular/common/http";
// import {BiddingSequence} from '../model/BiddingSequence';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  bridgeSystemUrl = 'assets/bridgePrecision.json';
  public systemHierarchy: { [index: string]: any } = {};
  public bnode!: BNode;

  private newSystem!: BNode;
  // public $subject: Subject<BiddingSequence> = new Subject<BiddingSequence>();

  constructor(private http: HttpClient) {
  }

  // loadSystem() {
  //   var getter = this.getLocalBridgeSystem();
  //   getter.subscribe(
  //     (data: {}) => {
  //       this.systemHierarchy = data;
  //       const l = new LegacyBiddingSystem();
  //       this.bnode = l.parseToNew(this.systemHierarchy);
  //     }
  //   );
  //   return getter;
  // }

  getLocalBridgeSystem(): Observable<string> {
    return this.http.get<string>(this.bridgeSystemUrl);
  }

  saveIntoLocalStorage(name: string, bnode: BNode): void {
    const json = this.transformToJson(bnode);
    localStorage.setItem(name, json.toString());
  }

  loadFromLocalStorage(name: string): BNode | undefined {
    const json = localStorage.getItem(name);
    if (json) {
      return JSON.parse(json) as BNode;
    }
    return undefined;
  }

  transformToJson(bnode: BNode): string {
    return JSON.stringify(bnode, ['id', 'bid', 'con', 'desc', 'nodes', 'ob', 'linkedId']);
  }

  showRawSystem(name: string, bnode: BNode): void {
    const json = this.transformToJson(bnode);
    this.showInNewWindow('RAW', json );
  }

  showInNewWindow(target: string, content: string): void {
    const wea = window.open('', target);
    if (wea) {
      wea.document.write(content);
    }
  }

  downloadSystem(name: string, bnode: BNode): void {
    const json = this.transformToJson(bnode);
    const wea = window.open('', 'hallo');
    if (wea) {
      wea.document.write(json);
    }
    const text = json;
    const blob = new Blob([text], {type: 'text/plain'});
    const anchor = document.createElement('a');

    anchor.download = bnode.bid + '_' + (new Date()) + '.json';
//    anchor.download = "bs.json";
    anchor.href = (window.URL).createObjectURL(blob);
    anchor.dataset['downloadurl'] = ['text/plain', anchor.download, anchor.href].join(':');
    anchor.click();
  }

  uploadSystem(file: File, uploadSubject: Subject<BNode>): void {

    const fileReader = new FileReader();
    fileReader.onload = fileLoadedEvent => {
      let datae: string | ArrayBuffer | null;
      datae = fileReader.result;
      if (datae) {
        const bn = JSON.parse(datae.toString()) as BNode;
        bn.linkedNode = new BNode('1x', new Array<BNode>(), '');
        uploadSubject.next(bn);
      }
    };
    fileReader.readAsText(file);

  }

  uploadLinFile(file: File, uploadSubject: Subject<string>): void {

    const fileReader = new FileReader();
    fileReader.onload = fileLoadedEvent => {
      let data: string | ArrayBuffer | null;
      data = fileReader.result;
      if (data) {
        uploadSubject.next(data.toString());
      }
    };
    fileReader.readAsText(file);

  }
  //
  // public emitBiddingSequence(biddingSequence: BiddingSequence): void {
  //   this.$subject.next(biddingSequence);
  // }

  //
  // getLinExample() {
  //   return this.http.get("https://www.bridgebase.com/myhands/fetchlin.php?id=1022970755&when_played=1616782848");
  // }


}
