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
    );
};

export default ProductList;
