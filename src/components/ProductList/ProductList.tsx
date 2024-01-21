import React from "react";

import styles from "./ProductList.module.scss";
import { FilterConditionsType, Product } from "../../models/model";

interface PropTypes {
    products: Product[];
    filterConditions: FilterConditionsType;
    hiddenColumns: string[];
}

const ProductList = ({ products, filterConditions, hiddenColumns }: PropTypes) => {
    return (
        <div className={styles.productslist_container}>
            <div className={styles.hidden_columns_container}>
                {/* Map through the hiddenColunms array to display each hidden column here */}
                Hidden Columns
            </div>

            <section className={styles.productslist_wrapper}>
                {products.length !== 0 ? (
                    <table aria-label="product_table">
                        <thead aria-label="table_head">
                            <tr data-testid="table_head_row">
                                {/* Set up table headers using the first product characteristics (all products must have same characteristic order) */}
                                {Object.keys(products[0]).map((key) => (
                                    // <th onClick={handleSort} key={key}>
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody aria-label="table_body">
                            {/* Map through the products list and, for each product, get each product's characteristic value for each cell*/}
                            {products.map((product) => (
                                <tr key={product.id} aria-label="table_body_row">
                                    {Object.values(product).map((value, index) => (
                                        <td key={index}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    // If there are no products, display informative message
                    <div className={styles.empty_projects_list}>No Products yet. Import some!</div>
                )}
            </section>
            <div className={styles.pagination_container}>
                {/* // Pagination here. If no products, dont show anything */}
                Page 1
            </div>
        </div>
    );
};

export default ProductList;
