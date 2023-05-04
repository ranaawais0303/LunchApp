import React from "react";
import ContainerBasic from "../containerBasic/ContainerBasic";
import StarterContainer from "../UI/StarterContainer";

//=============// Data coming from addons or items //==========//
function Item({ id, name, price, description, update, deleteData }) {
  return (
    <StarterContainer
      style={{ width: "90%", marginHorizontal: 15, marginTop: 2 }}
    >
      <ContainerBasic
        id={id}
        name={name}
        price={price}
        description={description}
        updateData={update}
        deleteData={deleteData}
        items
      />
    </StarterContainer>
  );
}

export default Item;
