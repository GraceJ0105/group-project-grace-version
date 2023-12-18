import React from 'react';
import './Button.css';


function Button(props) {

    const buttonStyle = {
        backgroundColor: props.backgroundColor || '#FAC710',
    };

    return (
        <button className='buttonMain' onClick={props.onClick} style={buttonStyle}>{props.text}</button>
    )
}

export default Button;