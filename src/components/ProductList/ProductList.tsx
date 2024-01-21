import React, { useEffect, useState } from "react";

import styles from "./ProductList.module.scss";
import { FilterConditionsType, Product } from "../../models/model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownAZ, faArrowDownZA, faXmark } from "@fortawesome/free-solid-svg-icons";

const NUMBER_RESULTS_PER_PAGE = 6;

interface PropTypes {
    products: Product[];
    filterConditions: FilterConditionsType;
}

interface SortingCriteria {
    sortingCategory: string;
    sortingDirection: number;
}

interface PaginationStatus {
    pageNumber: number;
    maximumPageNumber: number;
}

const ProductList = ({ products, filterConditions }: PropTypes) => {
    // Variable holding the currently sorted category and the sorting direction
    const [sortingCriteria, setSortingCriteria] = useState<SortingCriteria>({
        sortingCategory: "",
        sortingDirection: -1,
    });

    // Array that will hold the hidden columns
    const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);

    const [paginationStatus, setPaginationStatus] = useState<PaginationStatus>({
        pageNumber: 0,
        maximumPageNumber: Math.ceil(products.length / NUMBER_RESULTS_PER_PAGE),
    });

    // Whenever new product items are loaded, the pagination also needs to be updated
    useEffect(() => {
        setPaginationStatus({
            pageNumber: 0,
            maximumPageNumber: Math.ceil(products.length / NUMBER_RESULTS_PER_PAGE),
        });
    }, [products]);

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

    // Add product characteristic <keyString> to hiddenColumns variable to hide column, or remove the characteristic if it is already present in the array (to re-show column)
    const handleToggleColumn = (keyString: string) => {
        setHiddenColumns((prevHiddenColumns) =>
            !prevHiddenColumns.includes(keyString)
                ? [...prevHiddenColumns, keyString]
                : prevHiddenColumns.filter((property) => property !== keyString)
        );
    };

    // Whenever the <filteredConditions> change and products items are filtered, the pagination also needs to be updated TODO: complete this
    useEffect(() => {
        // If there are any filters to apply (any checkboxes checked), apply them
        if (Object.values(filterConditions).some((array) => array.length !== 0)) {
            
            const filteredProducts = products.filter((product) =>
                Object.keys(filterConditions).some((property) =>
                    filterConditions[property as keyof FilterConditionsType].includes(
                        product[property as keyof FilterConditionsType]
                    )
                )
            );

            // Get resulting number of items after filtering
            let numberFilteredItems = filteredProducts.length;
            setPaginationStatus((prevPaginationStatus) => ({
                pageNumber: 0,
                maximumPageNumber: Math.ceil(numberFilteredItems / NUMBER_RESULTS_PER_PAGE),
            }));
        } else {    // If there are no filters, build pagination using the <products> variable instead
            // Get resulting number of items after filtering
            let numberFilteredItems = products.length;
            setPaginationStatus((prevPaginationStatus) => ({
                pageNumber: 0,
                maximumPageNumber: Math.ceil(numberFilteredItems / NUMBER_RESULTS_PER_PAGE),
            }));
        }
    }, [filterConditions, products]);

    return (
        <div className={styles.productslist_container}>
            <div className={styles.hidden_columns_container}>
                {/* Map through the hiddenColunms array to display each hidden column here */}
                {hiddenColumns.map((property) => (
                    <p key={property} title="Show Column" onClick={() => handleToggleColumn(property)}>
                        {property}
                    </p>
                ))}
            </div>

            <section className={styles.productslist_wrapper}>
                {products.length !== 0 ? (
                    <table aria-label="product_table">
                        <thead aria-label="table_head">
                            <tr data-testid="table_head_row">
                                {/* Set up table headers using the first product characteristics (all products must have same characteristic order) */}
                                {Object.keys(products[0]).map((key) =>
                                    key !== "id" && !hiddenColumns.includes(key) ? (
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
                                                <FontAwesomeIcon
                                                    onClick={() => handleToggleColumn(key)}
                                                    icon={faXmark}
                                                />
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
                                sortingCriteria.sortingCategory !== "" &&
                                Object.values(filterConditions).some((array) => array.length !== 0) // Only filter the results if there's any checkbox checked
                                    ? products
                                          .filter((product) =>
                                              Object.keys(filterConditions).some((property) =>
                                                  filterConditions[property as keyof FilterConditionsType].includes(
                                                      product[property as keyof FilterConditionsType]
                                                  )
                                              )
                                          )
                                          .slice()
                                          .sort((a, b) => sortArray(a, b))
                                          .map((product) => (
                                              <tr key={product.id} aria-label="table_body_row">
                                                  {Object.entries(product).map(([key, value], index) =>
                                                      key !== "id" && !hiddenColumns.includes(key) ? (
                                                          <td key={index}>{value}</td>
                                                      ) : (
                                                          ""
                                                      )
                                                  )}
                                              </tr>
                                          ))
                                          .slice(
                                              paginationStatus.pageNumber * NUMBER_RESULTS_PER_PAGE,
                                              (paginationStatus.pageNumber + 1) * NUMBER_RESULTS_PER_PAGE
                                          )
                                    : sortingCriteria.sortingCategory !== ""
                                    ? products
                                          .slice()
                                          .sort((a, b) => sortArray(a, b))
                                          .map((product) => (
                                              <tr key={product.id} aria-label="table_body_row">
                                                  {Object.entries(product).map(([key, value], index) =>
                                                      key !== "id" && !hiddenColumns.includes(key) ? (
                                                          <td key={index}>{value}</td>
                                                      ) : (
                                                          ""
                                                      )
                                                  )}
                                              </tr>
                                          ))
                                          .slice(
                                              paginationStatus.pageNumber * NUMBER_RESULTS_PER_PAGE,
                                              (paginationStatus.pageNumber + 1) * NUMBER_RESULTS_PER_PAGE
                                          )
                                    : // Only filter the results if there's any checkbox checked
                                    Object.values(filterConditions).some((array) => array.length !== 0)
                                    ? products
                                          .filter((product) =>
                                              Object.keys(filterConditions).some((property) =>
                                                  filterConditions[property as keyof FilterConditionsType].includes(
                                                      product[property as keyof FilterConditionsType]
                                                  )
                                              )
                                          )
                                          .map((product) => (
                                              <tr key={product.id} aria-label="table_body_row">
                                                  {Object.entries(product).map(([key, value], index) =>
                                                      key !== "id" && !hiddenColumns.includes(key) ? (
                                                          <td key={index}>{value}</td>
                                                      ) : (
                                                          ""
                                                      )
                                                  )}
                                              </tr>
                                          ))
                                          .slice(
                                              paginationStatus.pageNumber * NUMBER_RESULTS_PER_PAGE,
                                              (paginationStatus.pageNumber + 1) * NUMBER_RESULTS_PER_PAGE
                                          )
                                    : products
                                          .map((product) => (
                                              <tr key={product.id} aria-label="table_body_row">
                                                  {Object.entries(product).map(([key, value], index) =>
                                                      key !== "id" && !hiddenColumns.includes(key) ? (
                                                          <td key={index}>{value}</td>
                                                      ) : (
                                                          ""
                                                      )
                                                  )}
                                              </tr>
                                          ))
                                          .slice(
                                              paginationStatus.pageNumber * NUMBER_RESULTS_PER_PAGE,
                                              (paginationStatus.pageNumber + 1) * NUMBER_RESULTS_PER_PAGE
                                          )
                            }
                        </tbody>
                    </table>
                ) : (
                    // If there are no products, display informative message
                    <div className={styles.empty_projects_list}>No Products yet. Import some!</div>
                )}
            </section>

            {/* // Pagination element. If there's no products, dont show anything */}
            {paginationStatus.maximumPageNumber >= 1 ? (
                <div className={styles.pagination_container}>
                    <button
                        onClick={() =>
                            setPaginationStatus((prevPaginationStatus) => ({
                                ...prevPaginationStatus,
                                pageNumber: prevPaginationStatus.pageNumber - 1,
                            }))
                        }
                        disabled={paginationStatus.pageNumber <= 0}
                    >
                        &lt;
                    </button>
                    <span>Page {paginationStatus.pageNumber + 1}</span>
                    <button
                        onClick={() =>
                            setPaginationStatus((prevPaginationStatus) => ({
                                ...prevPaginationStatus,
                                pageNumber: prevPaginationStatus.pageNumber + 1,
                            }))
                        }
                        disabled={paginationStatus.pageNumber + 1 >= paginationStatus.maximumPageNumber}
                    >
                        &gt;
                    </button>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default ProductList;
