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
import { AddItemComponent } from './add-item/add-item.component';



@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemSearchComponent,
    MessagesComponent,
    ItemDetailComponent,
    AddItemComponent,
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
