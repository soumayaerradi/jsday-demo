import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NftService} from "../../service/nft.service";

@Component({
  selector: 'app-backend-detail',
  templateUrl: './backend-detail.component.html',
  styleUrls: ['./backend-detail.component.scss']
})
export class BackendDetailComponent implements OnInit {
  collectionAddress: string;
  name: string | undefined;
  nfts: any[] = [];

  constructor(private _route: ActivatedRoute,
              private _nftService: NftService
  ) {
    this.collectionAddress = _route.snapshot.params['collectionAddress']
  }

  ngOnInit() {
    this._nftService.getCollectionNfts(this.collectionAddress).subscribe(nfts => {
      this.nfts = nfts
    })
  }
}
