import React, { useEffect, useState } from "react";

import styles from "./ProductList.module.scss";
import { FilterConditionsType, Product } from "../../models/model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownAZ, faArrowDownZA, faXmark } from "@fortawesome/free-solid-svg-icons";

interface PropTypes {
    products: Product[];
    filterConditions: FilterConditionsType;
    // hiddenColumns: string[];
}

interface SortingCriteria {
    sortingCategory: string;
    sortingDirection: number;
}

const ProductList = ({ products, filterConditions /*, hiddenColumns */ }: PropTypes) => {
    // Variable holding the currently sorted category and the sorting direction
    const [sortingCriteria, setSortingCriteria] = useState<SortingCriteria>({
        sortingCategory: "",
        sortingDirection: -1,
    });

    // Array that will hold the hidden columns
    const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);

    const handleSort = (keyString: string) => {
        setSortingCriteria((prevSortingCriteria) => {
            if (keyString === prevSortingCriteria.sortingCategory) {
                if (prevSortingCriteria.sortingDirection === -1)
                    return {
                        ...prevSortingCriteria,
                        sortingDirection: prevSortingCriteria.sortingDirection * -1,
                    };
                else
                    return {
                        sortingCategory: "",
                        sortingDirection: -1,
                    };
            } else
                return {
                    sortingCategory: keyString,
                    sortingDirection: -1,
                };
        });
    };

    const sortArray = (a: Product, b: Product) => {
        let aValue = a[sortingCriteria.sortingCategory as keyof Product];
        let bValue = b[sortingCriteria.sortingCategory as keyof Product];

        // Convert string values to lower case in order to sort coherently (number values shouldn't be converted to string)
        if (typeof aValue === "string") {
            aValue = aValue.toString().toLocaleLowerCase();
            bValue = bValue.toString().toLocaleLowerCase();
        }
        if (aValue < bValue) return sortingCriteria.sortingDirection;
        else if (aValue > bValue) return sortingCriteria.sortingDirection * -1;
        else return 0;
    };

    // Add product characteristic <keyString> to hiddenColumns variable, so that it won't be shown in the table
    const handleHideColumn = (keyString: string) => {
        setHiddenColumns(prevHiddenColumns => !prevHiddenColumns.includes(keyString) ? [...prevHiddenColumns, keyString] : prevHiddenColumns);
    }

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
                                {Object.keys(products[0]).map((key) =>
                                    (key !== "id" && !hiddenColumns.includes(key)) ? (
                                        <th key={key}>
                                            <div className={styles.table_header_cell_wrapper}>
                                                <h4>{key}</h4>
                                                {
                                                    // Show correct icon and styles based on sorting status
                                                    sortingCriteria.sortingCategory === key &&
                                                    sortingCriteria.sortingDirection === 1 ? (
                                                        <FontAwesomeIcon
                                                            className={styles.sort_selected}
                                                            onClick={() => handleSort(key)}
                                                            icon={faArrowDownZA}
                                                        />
                                                    ) : sortingCriteria.sortingCategory === key &&
                                                      sortingCriteria.sortingDirection === -1 ? (
                                                        <FontAwesomeIcon
                                                            className={styles.sort_selected}
                                                            onClick={() => handleSort(key)}
                                                            icon={faArrowDownAZ}
                                                        />
                                                    ) : (
                                                        <FontAwesomeIcon
                                                            onClick={() => handleSort(key)}
                                                            icon={faArrowDownAZ}
                                                        />
                                                    )
                                                }
                                                <FontAwesomeIcon onClick={() => handleHideColumn(key)} icon={faXmark} />
                                            </div>
                                        </th>
                                    ) : (
                                        ""
                                    )
                                )}
                            </tr>
                        </thead>
                        <tbody aria-label="table_body">
                            {/* Map through the products list and, for each product, get each product's characteristic value for each cell*/}
                            {
                                // Sort products array using the <sortingCriteria> variable, and never changing the <products> variable, so that we can efficiently go back to unsorted
                                sortingCriteria.sortingCategory !== ""
                                    ? products
                                          .slice()
                                          .sort((a, b) => sortArray(a, b))
                                          .map((product) => (
                                              <tr key={product.id} aria-label="table_body_row">
                                                  {Object.entries(product).map(([key, value], index) =>
                                                      (key !== "id" && !hiddenColumns.includes(key)) ? <td key={index}>{value}</td> : ""
                                                  )}
                                              </tr>
                                          ))
                                    : products.map((product) => (
                                          <tr key={product.id} aria-label="table_body_row">
                                              {Object.entries(product).map(([key, value], index) => (
                                                  (key !== "id" && !hiddenColumns.includes(key)) ? <td key={index}>{value}</td> : ""
                                              ))}
                                          </tr>
                                      ))
                            }
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
