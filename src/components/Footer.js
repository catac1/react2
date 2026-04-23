import React from 'react';

const Footer = (props) => {
    console.log(props);
    const { title, copyright, handleClick } = props;

    
    return (
        <div>
            <hr />
            <p> {title}</p>
            <p> {copyright} </p>
            <button onClick={handleClick}>Click</button>
        </div>
    );
};

export default Footer;