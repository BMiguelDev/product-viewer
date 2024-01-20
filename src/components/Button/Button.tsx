import React from 'react';

import styles from "./Button.module.scss";

interface PropTypes {
    buttonTitle: string;
    buttonBgColor: string;
    handleClick: () => null;
}

const Button = ({ buttonTitle, buttonBgColor, handleClick } :PropTypes) => {
  return (
    <button 
        className={styles.button_container}
        onClick={handleClick}
        style={{ backgroundColor: buttonBgColor }}>
        {buttonTitle}
    </button>
  )
}

export default Button
