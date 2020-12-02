import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemService} from '../item.service';
import {CreateItem} from '../create-item';
import {StockUrgency} from '../stockUrgency';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {
  item: CreateItem;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService) {
    this.item = new CreateItem();
  }

  onSubmit(): void {
    this.itemService.addItem(this.item).subscribe(
      result => this.gotoItemList()
    );
  }


  gotoItemList(): void {
    this.router.navigate(['/items']);
  }

  @Input()
  maxNumberOfCharacters = 255;
  counter = true;

  numberOfCharacters = 0;
  interaction = {
    textValue: ''
  };

  onModelChange(textValue: string): void {
    this.numberOfCharacters = textValue.length;
  }
}
