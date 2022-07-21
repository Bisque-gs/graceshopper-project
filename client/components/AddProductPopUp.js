import React from 'react';
import { useState } from 'react';
import AddProduct from './AddProduct';

const AddProductPopUp = (props) => {


    //if popup trigger is true, then render the following 
    return props.trigger ? (
      <div className="popup">
        <div className="popup-inner">
          <AddProduct
            addProduct={props.addProduct}
            isAddVisible={props.isAddVisibleToggle}
          />
          <button
            className="close-btn"
            onClick={() => {
              props.setTrigger(false)
            }}
          >
            {" "}
            close{" "}
          </button>
          {props.children}
        </div>
      </div>
    ) : (
      ""
    )
};

export default AddProductPopUp;
