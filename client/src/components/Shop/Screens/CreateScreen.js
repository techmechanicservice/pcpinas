import React from "react";
import CreateProduct from "../../ProductForm";
import branchProdSchema from "../../../helpers/branchProdSchema";

const schema = branchProdSchema({});

export default () => (
  <CreateProduct
    mode="create"
    collection="screens"
    schema={schema}
    renderOtherInput={(getFieldError, watch, register) => {
      return null;
    }}
  />
);
