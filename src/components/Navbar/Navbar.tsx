import React from "react";

import styles from "./Navbar.module.scss";

function Navbar() {
    return (
        <header>
            <nav className={styles.navbar_container}>
                <h4>Product Viewer</h4>
            </nav>
        </header>
    );
}

export default Navbar;
