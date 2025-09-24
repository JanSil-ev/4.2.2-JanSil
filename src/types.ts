export interface CardsItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  map?: any; 
}


export interface CartItem extends CardsItem {
  count: number;
}