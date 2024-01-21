export interface Product {
    id: number;
    name: string;
    price: number;
    condition: string;
    date: string;
    category: string;
    place: string;
}

export interface FilterConditionsType {
    condition: string[];
    category: string[];
    place: string[];
}
