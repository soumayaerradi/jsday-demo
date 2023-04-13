import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ChainId, ContractService, NETWORK_INFO} from "@scalingparrots/dapp-angular-lib";
import {NftService} from "../../service/nft.service";

const collectionAbi = require('../../../../../assets/abi/GenericERC721.json');

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.scss']
})
export class ContractDetailComponent implements OnInit {
  primary_network = NETWORK_INFO[ChainId.BSC];
  collectionAddress: string;
  name: string | undefined;
  nfts: any[] = [];

  constructor(private _route: ActivatedRoute,
              private _contractService: ContractService,
              private _nftService: NftService
  ) {
    this.collectionAddress = _route.snapshot.params['collectionAddress']
  }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    this.name = await this._contractService
      .readContract(this.collectionAddress, this.primary_network.rpcUrls[0], collectionAbi, 'name');

    const totalSupply = await this._contractService
      .readContract(this.collectionAddress, this.primary_network.rpcUrls[0], collectionAbi, 'totalSupply');

    for (let i = 0; i < +totalSupply; i++) {
      const tokenURI = await this._contractService
        .readContract(this.collectionAddress, this.primary_network.rpcUrls[0], collectionAbi, 'tokenURI', [i])

      this._nftService.getMetadata(tokenURI).subscribe({
        next: (metadata) => {
          this.nfts.push({
            name: metadata.name,
            description: metadata.description,
            imageUrl: metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/'),
          })
        },
      });
    }
  }
}
