export type TName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrder =
  | {
      productName: string;
      price: number;
      quantity: number;
    }[]
  | null;

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrder;
};
