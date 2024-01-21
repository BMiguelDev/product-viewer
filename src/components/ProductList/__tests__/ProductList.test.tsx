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
    const hiddenColumns: string[] = [];
    render(<ProductList products={products} filterConditions={filterConditions} hiddenColumns={hiddenColumns} />);

    // const tableBodyElement = screen.getByLabelText(/table_body/i);
    // const tableBodyRowElement = screen.getAllByLabelText(/table_body_row/i);
    const tableBodyRowElement = screen.queryAllByLabelText(/table_body_row/i);
    const emptyProductsText = screen.queryByText(/No Products yet. Import some!/);

    // expect(tableBodyRowElement.childElementCount).toEqual(0);
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
    const hiddenColumns: string[] = [];
    render(<ProductList products={products} filterConditions={filterConditions} hiddenColumns={hiddenColumns} />);

    // const tableBodyElement = screen.getByLabelText(/table_body/i);
    const tableBodyRowElement = screen.getAllByLabelText(/table_body_row/i);

    // expect(tableBodyRowElement.childElementCount).toEqual(0);
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
    const hiddenColumns: string[] = [];
    render(<ProductList products={products} filterConditions={filterConditions} hiddenColumns={hiddenColumns} />);

    let listOfCharacterists: string[] = [];

    for(let i = 0; i < products.length; i++) {
        Object.keys(products[i]).forEach(property => {
            if(property !== "id") {
                if(!listOfCharacterists.includes(property)) listOfCharacterists.push(property);
            }
        })
    }
    // console.log(listOfCharacterists);

    // const tableHeadRowElement = screen.getByTestId('table_head_row');
    // const tableHeadRowCellElement = screen.getAllByLabelText('table_head_row_cell');

    expect(listOfCharacterists).toHaveLength(6);

    listOfCharacterists.forEach((characteristic) => {
        const characteristicText = screen.getByText(characteristic);
        expect(characteristicText).toBeInTheDocument();
    })
    // expect(tableHeadRowCellElement.length).toEqual(2);
});