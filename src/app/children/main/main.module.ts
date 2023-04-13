import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainRoutingModule} from './main-routing.module';
import {ContractComponent} from './contract/contract.component';
import {ConnectWalletComponent} from './component/connect-wallet/connect-wallet.component';
import {SwitchNetworkComponent} from './component/switch-network/switch-network.component';
import {BackendComponent} from './backend/backend.component';
import {ContractDetailComponent} from './contract/contract-detail/contract-detail.component';
import {BackendDetailComponent} from './backend/backend-detail/backend-detail.component';

@NgModule({
  declarations: [
    ContractComponent,
    ConnectWalletComponent,
    SwitchNetworkComponent,
    BackendComponent,
    ContractDetailComponent,
    BackendDetailComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
  ],
  providers: [],
  bootstrap: [],
})
export class MainModule {
}
