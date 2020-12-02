import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ItemService} from './item.service';
import {ItemsComponent} from './items/items.component';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ItemSearchComponent} from './item-search/item-search.component';
import {MessagesComponent} from './messages/messages.component';
import {ItemDetailComponent} from './item-detail/item-detail.component';
import { ItemAddComponent } from './item-add/item-add.component';
import { ItemUpdateComponent } from './item-update/item-update.component';



@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemSearchComponent,
    MessagesComponent,
    ItemDetailComponent,
    ItemAddComponent,
    ItemUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
