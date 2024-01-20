import React from "react";

import styles from "./ProductList.module.scss";
import Button from "../Button/Button";

const ProductList = () => {
    const handleLoadTestData = () => {
        return null;
    };

    const handleUploadProducts = () => {
        return null;
    };

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
                    <Button buttonTitle="Upload" buttonBgColor="#008C99" handleClick={handleUploadProducts}></Button>
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
