import React from "react";
import "./address.css";
import Header from "../../ReusableComp/Header";
import Footer from "../../ReusableComp/footer";

const Adress = () => {
  return (
    <div>
      <Header />
      <div className="container address-cont">
        <h2 className="your-address">Your Address</h2>
        <div className="flex align-center space-bw">
          <div className="col-33 address-card-top text-center">
            <div className="address-card-plus">+</div>
            <p className="add-address">Add Address</p>
          </div>
          <div className="col-33 address-card-second">
            <div className="card-name">Lorem Ipsum</div>
            <p className="card-para">
              Lorem ipsum is a dummy or placeholder text commonly used in Lorem
              ipsum is a dummy or placeholder text commonly used in
            </p>
            <div className="card-para-no">Phone Number: +971 9874521223</div>
            <div className="flex align-center card-edit-remove">
              <div className="edit">Edit</div>
              <div className="edit-remove-mid">|</div>
              <div className="remove">Remove</div>
            </div>
          </div>
          <div className="col-33 address-card-second">
            <div className="card-name">Lorem Ipsum</div>
            <p className="card-para">
              Lorem ipsum is a dummy or placeholder text commonly used in Lorem
              ipsum is a dummy or placeholder text commonly used in
            </p>
            <div className="card-para-no">Phone Number: +971 9874521223</div>
            <div className="flex align-center card-edit-remove">
              <div className="edit">Edit</div>
              <div className="edit-remove-mid">|</div>
              <div className="remove">Remove</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Adress;
