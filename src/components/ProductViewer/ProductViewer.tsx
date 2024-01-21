import React, { useEffect, useState } from "react";

import styles from "./ProductViewer.module.scss";
import { FilterConditionsType, Product } from "../../models/model";
import DummyProductsData from "./../../data/ProductsDataExample.json";
import Button from "../Button/Button";
import ProductList from "../ProductList/ProductList";
import FilterTab from "../FilterTab/FilterTab";

const ProductViewer = () => {

    // Array that will hold the product list. 
    // Products must have specific characteristics. We could use type "any" to allow the user to import files with any kind of data, but we opted for a defined type since we're using typescript
    const [products, setProducts] = useState<Product[]>([]);

    // Object that will hold the filters defined by the user Its possible to filter by condition, category and place
    const [filterConditions, setFilterConditions] = useState<FilterConditionsType>({});

    // Array that will hold the hidden columns
    const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);

    const handleLoadTestData = () => {
        setProducts(DummyProductsData);
    };

    // const handleUploadProducts = () => {
    //     return null;
    // };

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        let file = event.target.files ? event.target.files[0] : null;

        // Read file and get products
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsText(file, "UTF-8");
            fileReader.onload = (event) => {
                if (event.target && event.target.result) {  // If uploaded file contains valid products, set state variable with uploaded products
                    setProducts(JSON.parse(event.target.result as string));
                }
                else {  // If uploaded file is empty, alert user
                    alert("No products available in that file!");
                }
            };
        }
    };

    return (
        <main className={styles.main_container}>
            <FilterTab products={products} filterConditions={filterConditions} />
            <div className={styles.products_container}>
                <h3>Products</h3>
                <div className={styles.buttons_container}>
                    <Button
                        buttonTitle="Load Test Data"
                        buttonBgColor="#009325"
                        handleClick={handleLoadTestData}
                    ></Button>
                    {/* <Button buttonTitle="Upload" buttonBgColor="#008C99" handleClick={handleUploadProducts}></Button> */}
                    <label className="button_container" htmlFor="fileInput" style={{ backgroundColor: "#008C99" }}>
                        Upload
                        <input
                            id="fileInput"
                            type="file"
                            className={styles.file_input_button}
                            onChange={handleChangeFile}
                        />
                    </label>
                </div>
                <ProductList products={products} filterConditions={filterConditions} hiddenColumns={hiddenColumns} />
            </div>
        </main>
    );
};

export default ProductViewer;
