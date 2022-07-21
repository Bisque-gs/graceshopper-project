import React from 'react';
import { useState } from 'react';
import SignUp from './AddProductMUI';
import AddProduct from './AddProductMUI';

const AddProductPopUp = (props) => {


    //if popup trigger is true, then render the following 
    return props.trigger ? (
      <div className="popup">
        <div className="popup-inner">
          {/* <AddProduct
            addProduct={props.addProduct}
            isAddVisible={props.isAddVisibleToggle}
          /> */}
          <AddProduct addProduct={props.addProduct} />
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
