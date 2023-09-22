import { useFormikContext } from "formik";
import Dropzone from "react-dropzone";

import { FormGroup, FormLabel } from "react-bootstrap";

const constainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
};
const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: "100%",
  height: 200,
  padding: 4,
  boxSizing: "border-box",
};
const title = {
  fontSize: 18,
};
const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const UploadFileDropZone = ({
  name,
  file,
  label,
  value,
  setFile,
  required,
  ...otherProps
}) => {
  const { setFieldTouched, touched, errors, setFieldError } =
    useFormikContext();

  const handleUploadFile = async (e) => {
    const file = e.target.files[0];

    if (
      (file.name &&
        file.name.substring(file.name.length - 3).toLocaleLowerCase() ===
          "png") ||
      (file.name &&
        file.name.substring(file.name.length - 3).toLocaleLowerCase() === "jpg")
    ) {
      const arrayBuffer = await file.arrayBuffer();
      const int8Array = new Uint8Array(arrayBuffer);
      setFile(int8Array.toString());
    } else {
      setFieldError(name, "File type must be JPG/PNG");
    }
  };
  const handleStringToArray = (str = "") => {
    const array = str.split(",");
    const buffer = [];

    for (let index = 0; index < array.length; index++) {
      buffer[index] = array[index];
    }

    const data = new Uint8Array(buffer);

    return data;
  };

  const fileImage = URL.createObjectURL(
    new Blob([handleStringToArray(value)], { type: "image/png" })
  );

  return (
    <FormGroup>
      <FormLabel>
        {label} {required && <span className="text-danger">*</span>}
      </FormLabel>
      {value ? (
        <Dropzone onDrop={(e) => handleUploadFile({ target: { files: e } })}>
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps({ className: "dropzone" })}
              style={constainer}
            >
              <input
                {...getInputProps()}
                {...otherProps}
                onBlur={() => setFieldTouched(name)}
              />
              {value ? (
                <aside style={thumbsContainer}>
                  <div style={thumb} key={file.name}>
                    <div style={thumbInner}>
                      <img
                        width="100%"
                        src={fileImage}
                        onLoad={() => {
                          URL.revokeObjectURL(fileImage);
                        }}
                      />
                    </div>
                  </div>
                </aside>
              ) : null}
              <p style={title}>Select {label}</p>
              {errors[name] && touched[name] ? (
                <div className="text-danger">{errors[name]}</div>
              ) : null}
            </div>
          )}
        </Dropzone>
      ) : (
        <>
          <input
            className="form-control"
            {...otherProps}
            onChange={(e) => handleUploadFile(e)}
            onBlur={() => setFieldTouched(name)}
            // value={values[name]}
          />
          {errors[name] && touched[name] ? (
            <div className="text-danger">{errors[name]}</div>
          ) : null}
        </>
      )}
    </FormGroup>
  );
};

export default UploadFileDropZone;
