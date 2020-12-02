import {StockUrgency} from './stockUrgency';
import {UUID} from 'angular2-uuid';

export interface Item {
  id: UUID;
  name: string;
  description: string;
  price: number;
  amountOfStock: number;
  // TODO:Include box
  // box: ;
  stockUrgency: StockUrgency;
}
