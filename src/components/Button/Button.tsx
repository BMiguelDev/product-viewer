import React from 'react';

interface PropTypes {
    buttonTitle: string;
    buttonBgColor: string;
    handleClick: () => void;
}

const Button = ({ buttonTitle, buttonBgColor, handleClick } :PropTypes) => {
  return (
    <button 
        className='button_container'
        onClick={handleClick}
        style={{ backgroundColor: buttonBgColor }}>
        {buttonTitle}
    </button>
  )
}

export default Button
