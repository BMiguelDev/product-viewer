import React from "react";

import styles from './FilterTab.module.scss';
import { FilterConditionsType, Product } from "../../models/model";

interface PropTypes {
    products: Product[];
    filterConditions: FilterConditionsType;
}

const FilterTab = ({ products, filterConditions }: PropTypes) => {
    return (
        <div className={styles.filters_container}>
            <h5>Filters</h5>
            {/* //Map through all existing characteristics in the products array and render a "div" for each */}
        </div>
    );
};

export default FilterTab;
