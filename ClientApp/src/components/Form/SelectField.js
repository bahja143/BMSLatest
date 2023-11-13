import { useFormikContext } from "formik";
import Select from "react-select";

import { FormGroup, FormLabel } from "react-bootstrap";

const SelectField = ({
  show,
  name,
  label,
  onShow,
  options,
  subTitle,
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
        options={options}
        value={options.filter((f) => f.value === values[name])}
        onChange={(e) => setFieldValue(name, e.value)}
        onBlur={() => setFieldTouched(name)}
        {...otherProps}
      />
      {errors[name] && touched[name] ? (
        <div className="text-danger">{errors[name]}</div>
      ) : null}
      {show && (
        <div className="mt-2">
          <a className="link" onClick={onShow} href="#">
            <i className="fas fa-plus-circle"> {subTitle} </i>
          </a>
        </div>
      )}
    </FormGroup>
  );
};

export default SelectField;
