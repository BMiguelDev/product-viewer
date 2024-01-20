import React, { useEffect, useState } from "react";

import styles from "./ProductList.module.scss";
import Button from "../Button/Button";
import { Product } from "../../models/model";
import DummyProductsData from "./../../data/ProductsDataExample.json";

const ProductList = () => {

    const [products, setProducts] = useState<Product[]>([]);    // Products must have specific characteristics. We could use type "any" to allow the user to import files with any kind of data, but we opted for a defined type since we're using typescript

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
                    // const productsJSON = JSON.parse(event.target.result as string);
                    // TODO: check what happens when products with wrong characteristics are uploaded
                    setProducts(JSON.parse(event.target.result as string));
                }
                else {  // If uploaded file is empty, alert user
                    alert("No products available in that file!");
                }
            };
        }
    };

    // Temporary debug logging TODO: remove this
    useEffect(() => {
        console.log(products);
    }, [products])

    return (
        <main className={styles.main_container}>
            <div className={styles.filters_container}>
                <h5>Filters</h5>
                {/* //Map through all existing characteristics in the products array and render a "div" for each */}
            </div>
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
                <section className={styles.productslist_container}>
                    <table>
                        <thead>
                            <tr>
                                {/* // Map through the first products' properties as a <th>. If there are no products, display "No products meet criteria or "No products yet, Import some!" if products array is empty*/}
                            </tr>
                        </thead>
                        <tbody>
                            {/* // Map through the products list and, for each product, get each product's property as a <td> */}
                        </tbody>
                    </table>
                </section>
                <div className={styles.pagination_container}>
                    {/* // Pagination here. If no products, dont show anything */}
                    Page 1
                </div>
            </div>
        </main>
    );
};

export default ProductList;
