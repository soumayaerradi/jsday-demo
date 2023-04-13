import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {
  ChainId,
  ContractService,
  MessageService,
  NETWORK_INFO,
  NetworkService,
  WalletService,
} from '@scalingparrots/dapp-angular-lib';
import {NftService} from "../service/nft.service";

const marketplaceFactoryAbi = require('../../../../assets/abi/MarketplaceFactory.json');
const marketplaceAbi = require('../../../../assets/abi/Marketplace.json');
const collectionAbi = require('../../../../assets/abi/GenericERC721.json');

@Component({
  selector: 'app-home',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss'],
})
export class ContractComponent implements OnInit {
  primary_network = NETWORK_INFO[ChainId.BSC]; // add your correct network

  marketplaceFactory: string = ''; // add a marketplace factory address
  collections: any[] = [];

  constructor(
    private _router: Router,
    private _walletService: WalletService,
    private _networkService: NetworkService,
    private _contractService: ContractService,
    private _messageService: MessageService,
    private _nftService: NftService
  ) {
  }

  ngOnInit(): void {
    this.getCollections()
  }

  async getCollections() {
    const marketplaceCounter = await this._contractService
      .readContract(this.marketplaceFactory, this.primary_network.rpcUrls[0], marketplaceFactoryAbi, 'marketplacesCounter')

    for (let i = 0; i < +marketplaceCounter; i++) {
      const marketplaces = await this._contractService
        .readContract(this.marketplaceFactory, this.primary_network.rpcUrls[0], marketplaceFactoryAbi, 'marketplaces', [i]);

      const collection = await this._contractService
        .readContract(marketplaces, this.primary_network.rpcUrls[0], marketplaceAbi, 'nft')

      const totalSupply = await this._contractService
        .readContract(collection, this.primary_network.rpcUrls[0], collectionAbi, 'totalSupply')

      const name = await this._contractService
        .readContract(collection, this.primary_network.rpcUrls[0], collectionAbi, 'name')

      const tokenURI = await this._contractService
        .readContract(collection, this.primary_network.rpcUrls[0], collectionAbi, 'tokenURI', [0])

      this._nftService.getMetadata(tokenURI).subscribe({
        next: (metadata) => {
          this.collections.push({
            marketplace: marketplaces,
            collection,
            totalSupply: +totalSupply,
            name,
            imageUrl: metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/'),
          })
        },
      });
    }
  }

  goToCollection(collection: any) {
    this._router.navigate([`/contract/${collection.collection}`])
  }
}
