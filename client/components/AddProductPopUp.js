import React from 'react';
import { useState } from 'react';

const AddProductPopUp = (props) => {


    //if popup trigger is true, then render the following 
    return (props.trigger) ? (
        <div className="popup">
            <div className = "popup-inner"> 
            <button className = "close-btn" onClick= {() => {props.setTrigger(false)}}> close </button>    
                {props.children}        
            </div>
        </div>
    ): "";
};

export default AddProductPopUp;
