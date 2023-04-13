import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFireDatabase} from "@angular/fire/compat/database";

interface TokenUri {
  name: string;
  description: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class NftService {
  constructor(private _http: HttpClient,
              private _fireDatabase: AngularFireDatabase) {
  }

  getMetadata(tokenUri: string) {
    return this._http.get<TokenUri>(tokenUri.replace("ipfs://", "https://ipfs.io/ipfs/"));
  }

  getCollections() {
    return this._fireDatabase.list('collections').valueChanges()
  }

  getCollectionNfts(collectionAddress: string) {
    return this._fireDatabase.list(`nfts/${collectionAddress}`).valueChanges()
  }
}
