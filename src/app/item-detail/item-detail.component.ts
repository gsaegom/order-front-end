import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Item} from '../item';
import {ItemService} from '../item.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  item!: Item | undefined;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getItem();
  }

  getItem(): void {
    // tslint:disable-next-line:no-non-null-assertion
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.itemService.getItem(id)
      .subscribe(item => this.item = item);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.itemService.updateItem(this.item)
      .subscribe(() => this.goBack());
  }
}

