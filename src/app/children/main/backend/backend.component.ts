import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {
  ChainId,
  NETWORK_INFO,
} from "@scalingparrots/dapp-angular-lib";
import {NftService} from "../service/nft.service";

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.scss']
})
export class BackendComponent implements OnInit {
  primary_network = NETWORK_INFO[ChainId.BSC];
  collections: any[] = [];

  constructor(
    private _router: Router,
    private _nftService: NftService,
  ) {
  }

  ngOnInit(): void {
    this._nftService.getCollections().subscribe(collections => {
      this.collections = collections
    })
  }

  goToCollection(collection: any) {
    this._router.navigate([`/backend/${collection.collection}`])
  }
}
