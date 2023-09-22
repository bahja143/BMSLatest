import React from "react";
import { useFormikContext } from "formik";

import { Button } from "react-bootstrap";

const SubmitBtn = ({ title, ...otherProps }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <Button type="submit" onClick={() => handleSubmit()} {...otherProps}>
      {title ? title : " Submit"}
    </Button>
  );
};

export default SubmitBtn;
