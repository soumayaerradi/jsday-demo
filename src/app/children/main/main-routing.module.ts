import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContractComponent} from './contract/contract.component';
import {BackendComponent} from "./backend/backend.component";
import {ContractDetailComponent} from "./contract/contract-detail/contract-detail.component";
import {BackendDetailComponent} from "./backend/backend-detail/backend-detail.component";

const routes: Routes = [
  {
    path: 'backend',
    component: BackendComponent,
  },
  {
    path: 'backend/:collectionAddress',
    component: BackendDetailComponent,
  },
  {
    path: 'contract',
    component: ContractComponent,
  },
  {
    path: 'contract/:collectionAddress',
    component: ContractDetailComponent,
  },
  {
    path: '',
    redirectTo: 'contract',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {
}
