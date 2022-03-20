import React from "react";
import { Button } from "reactstrap";

const AddVariantForm = ({ keys, value, EditVariant, DeleteVariant }) => {
  return (
    <div className="variant_list">
      <div className="variant_item_title">
        {keys === "id" ? "Action" : keys}
      </div>
      <div className="variant_item_value">
        {keys === "id" ? (
          <>
            <Button
              color="warning"
              size="sm"
              type="button"
              className="btn-rounded ml-2"
              onClick={(e) => EditVariant(e, value)}
            >
              <i className="far fa-edit" />
            </Button>
            <Button
              color="danger"
              size="sm"
              type="button"
              className="btn-rounded ml-2"
              onClick={(e) => DeleteVariant(e, value)}
            >
              <i className="fas fa-trash" />
            </Button>
          </>
        ) : (
          value
        )}
      </div>
    </div>
  );
};
export default AddVariantForm;
