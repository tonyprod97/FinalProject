import React from 'react';

export function ErrorMessage(props) {
    if(!props.message) {
        return null;
    }
    return(<div style= {
        {
            position: "relative",
            color: "red",
            textAlign: "center",
            margin: "5px"
        }
    }>{props.message}</div>)
    
}