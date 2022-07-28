import React from 'react';
import { useState } from 'react';
import SignUp from './AddProductMUI';
import AddProduct from './AddProductMUI';
import Button from "@mui/material/Button"

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
          <Button
            className="close-btn"
            onClick={() => {
              props.setTrigger(false)
            }}
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              // color: "white",
              textDecoration: "none",
              textTransform: "capitalize",
              backgroundColor: "#1976d2",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#344966",
                color: "#white",
              },
            }}
          >
            {" "}
            close{" "}
          </Button>
          {props.children}
        </div>
      </div>
    ) : (
      ""
    )
};

export default AddProductPopUp;
