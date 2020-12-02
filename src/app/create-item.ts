import {StockUrgency} from './stockUrgency';

export class CreateItem {
  id: string;
  name: string;
  description: string;
  price: number;
  amountOfStock: number;
  stockUrgency: StockUrgency;
}
