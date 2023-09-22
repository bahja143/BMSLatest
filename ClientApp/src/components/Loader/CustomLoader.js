import { MDBSpinner } from "mdb-react-ui-kit";

const CustomLoader = ({ children, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <MDBSpinner color="primary" size="lg" />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default CustomLoader;
