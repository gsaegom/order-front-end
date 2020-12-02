import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ItemsComponent} from './items/items.component';
import {ItemDetailComponent} from './item-detail/item-detail.component';
import {AppComponent} from './app.component';
import {ItemAddComponent} from './item-add/item-add.component';
import {ItemUpdateComponent} from './item-update/item-update.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'items', component: ItemsComponent},
  {path: 'newitem', component: ItemAddComponent},
  {path: 'detail/:id', component: ItemDetailComponent},
  {path: 'update/:id', component: ItemUpdateComponent}

  // Todo: fix this
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
