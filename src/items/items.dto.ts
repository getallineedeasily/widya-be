export type CreateItemRequestDto = {
  name: string;
  description: string;
  stock: number;
  price: number;
};

export type UpdateItemRequestDto = {
  name: string;
  description: string;
  stock: number;
  price: number;
};

export type GetItemsResponseDto = {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: number;
};
