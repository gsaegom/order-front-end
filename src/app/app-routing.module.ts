import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ItemsComponent} from './items/items.component';
import {ItemDetailComponent} from './item-detail/item-detail.component';
import {AppComponent} from './app.component';
import {AddItemComponent} from './add-item/add-item.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'items', component: ItemsComponent},
  {path: 'newitem', component: AddItemComponent},
  {path: 'detail/:id', component: ItemDetailComponent}
  // Todo: fix this
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
