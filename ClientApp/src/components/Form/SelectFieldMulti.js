import { useFormikContext } from "formik";
import Select from "react-select";
import FontAwesome from "react-fontawesome";

import { FormGroup, FormLabel } from "react-bootstrap";

const SelectFieldMulti = ({
  show,
  name,
  label,
  onShow,
  options,
  required,
  ...otherProps
}) => {
  const { setFieldTouched, touched, errors, values, setFieldValue } =
    useFormikContext();

  return (
    <FormGroup>
      <FormLabel>
        {label} {required && <span className="text-danger">*</span>}
      </FormLabel>
      <Select
        isMulti
        options={options}
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        onChange={(e) => setFieldValue(name, e)}
        {...otherProps}
      />
      {show && (
        <a className="link mb-5" onClick={onShow}>
          <FontAwesome name="fas fa-plus-circle" />
          New customer
        </a>
      )}
      {errors[name] && touched[name] ? (
        <div className="text-danger">{errors[name]}</div>
      ) : null}
    </FormGroup>
  );
};

export default SelectFieldMulti;
