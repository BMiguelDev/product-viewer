import React, { useEffect, useState } from "react";

import styles from "./FilterTab.module.scss";
import { FilterConditionsType, Product } from "../../models/model";

interface PropTypes {
    products: Product[];
    filterConditions: FilterConditionsType;
    setFilterConditions: React.Dispatch<React.SetStateAction<FilterConditionsType>>;
}

const FilterTab = ({ products, filterConditions, setFilterConditions }: PropTypes) => {
    const [possibleFilters, setPossibleFilters] = useState<FilterConditionsType>({
        category: [],
        condition: [],
        place: [],
    });

    // Whenever new products are loaded, build <possibleFilters> variable, which will hold all the possible checkbox content
    useEffect(() => {
        products.forEach((product) =>
            Object.entries(product).forEach(([key, value]) => {
                setPossibleFilters((prevPossibleFilters) => {
                    if (
                        (key === "condition" || key === "category" || key === "place") &&
                        !prevPossibleFilters[key]?.includes(value)
                    )
                        return { ...prevPossibleFilters, [key]: [...prevPossibleFilters[key], value] };
                    else return prevPossibleFilters;
                });
            })
        );
    }, [products]);

    const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
        if (event.target.checked) {     // If checked box's value isn't in <filteredConditons> array yet, add it
            if (!filterConditions[key as keyof FilterConditionsType].includes(event.target.value)) {
                setFilterConditions((prevFilterConditions) => ({
                    ...prevFilterConditions,
                    [key]: [...prevFilterConditions[key as keyof FilterConditionsType], event.target.value],
                }));
            }
        } else {    // If checked box's value already is in <filteredConditons> array yet, remove it
            if (filterConditions[key as keyof FilterConditionsType].includes(event.target.value)) {
                setFilterConditions((prevFilterConditions) => ({
                    ...prevFilterConditions,
                    [key]: prevFilterConditions[key as keyof FilterConditionsType].filter(
                        (value) => value !== event.target.value
                    ),
                }));
            }
        }
    };

    return (
        <div className={styles.filters_container}>
            <h5>Filters</h5>
            {/* //Map through all possible filters in the products and render a checkbox for each */}
            <div className={styles.filter_list}>
                {Object.keys(possibleFilters).map((key) => (
                    <div key={key}>
                        <h5>{key}</h5>
                        <div className={styles.checkbox_list}>
                            {possibleFilters[key as keyof FilterConditionsType].map((value) => (
                                <div key={value}>
                                    <input
                                        type="checkbox"
                                        id={value}
                                        name={value}
                                        value={value}
                                        checked={filterConditions[key as keyof FilterConditionsType].includes(value)}
                                        onChange={(event) => handleChangeCheckbox(event, key)}
                                    />
                                    <label htmlFor={value}>{value}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterTab;
