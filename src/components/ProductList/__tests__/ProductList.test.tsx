import * as React from "react";
import { cleanup, render, screen } from "@testing-library/react";

import ProductList from "../ProductList";
import { Product } from "../../../models/model";

afterEach(() => {
    cleanup();
});

test("On first component mount product list should display empty", () => {
    const products: Product[] = [];
    const filterConditions = {};
    render(<ProductList products={products} filterConditions={filterConditions} />);

    const tableBodyRowElement = screen.queryAllByLabelText(/table_body_row/i);
    const emptyProductsText = screen.queryByText(/No Products yet. Import some!/);

    expect(tableBodyRowElement.length).toEqual(0);
    expect(emptyProductsText).toBeInTheDocument();
});

test("When there's products on the list there's as many table rows as the loaded number of products", () => {
    const products: Product[] = [
        {
            id: 1,
            name: "iPhone 15 pro max",
            price: 1000,
            condition: "New",
            date: "2023/12/10",
            category: "Phones",
            place: "Porto",
        },
        {
            id: 2,
            name: "Samsung galaxy S24",
            price: 1000,
            condition: "New",
            date: "2023/12/20",
            category: "Phones",
            place: "Lisbon",
        },
    ];
    const filterConditions = {};
    render(<ProductList products={products} filterConditions={filterConditions} />);

    const tableBodyRowElement = screen.getAllByLabelText("table_body_row");
    expect(tableBodyRowElement.length).toEqual(2);
});

test("When there's products on the list, there's as many table columns as the number of total product characteristics", () => {
    const products: Product[] = [
        {
            id: 1,
            name: "iPhone 15 pro max",
            price: 1000,
            condition: "New",
            date: "2023/12/10",
            category: "Phones",
            place: "Porto",
        },
        {
            id: 2,
            name: "Samsung galaxy S24",
            price: 1000,
            condition: "New",
            date: "2023/12/20",
            category: "Phones",
            place: "Lisbon",
        },
    ];
    const filterConditions = {};
    render(<ProductList products={products} filterConditions={filterConditions} />);

    let listOfCharacterists: string[] = [];

    for (let i = 0; i < products.length; i++) {
        Object.keys(products[i]).forEach((property) => {
            if (property !== "id") {
                if (!listOfCharacterists.includes(property)) listOfCharacterists.push(property);
            }
        });
    }

    expect(listOfCharacterists).toHaveLength(6);

    listOfCharacterists.forEach((characteristic) => {
        const characteristicText = screen.getByText(characteristic);
        expect(characteristicText).toBeInTheDocument();
    });
});
