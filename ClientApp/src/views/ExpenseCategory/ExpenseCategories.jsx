import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { MDBDataTableV5 } from "mdbreact";
import FontAwesome from "react-fontawesome";
import * as Yup from "yup";
import jwt from "jwt-decode";

import CustomLoader from "../../components/Loader/CustomLoader";
import NewExpenseCategoriesModal from "./NewExpenseCategoriesModal";
import expenseCategoryApi from "../../api/expenseCategoryApi";

const schema = Yup.object({
  id: Yup.number(),
  name: Yup.string().required().label("Category Name"),
});

const ExpenseCategories = () => {
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    id: 0,
    name: "",
  });
  const [tableHeaders] = useState([
    { label: "Name", field: "name" },
    { label: "", field: "edit" },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const user = jwt(localStorage["token"]);

  const handleLoad = async () => {
    setIsLoading(true);
    const { status, data } = await expenseCategoryApi.getAll();
    setIsLoading(false);

    if (status !== 200) return toast.error("Network Error");

    setCategories([...data]);
  };
  const handleSubmit = async (category, { resetForm }) => {
    resetForm();
    setShow(false);
    setIsLoading(true);

    if (category.id === 0) {
      const response = await expenseCategoryApi.add({
        ...category,
      });
      setIsLoading(false);

      if (response.ok) {
        toast.info("Successful Registered.");
        setShow(false);
        return setCategories([response.data, ...categories]);
      }

      if (response.status === 400)
        return toast.error("This category is already exist!");

      toast.error("Something went wrong");
    } else {
      const response = await expenseCategoryApi.update(category.id, category);
      setIsLoading(false);

      if (response.ok) {
        toast.info("Successful Updates.");
        setShow(false);
        return setCategories([
          response.data,
          ...categories.filter((c) => c.id !== category.id),
        ]);
      }
      toast.error("Something went wrong");
    }
  };
  const handleEdit = (custom) => {
    const cust = { ...custom };
    delete cust.edit;
    setCategory(cust);
    setShow(true);
  };
  const handleShow = () => {
    setShow(true);
    setCategory({
      id: 0,
      name: "",
    });
  };

  useEffect(() => {
    handleLoad();
  }, [category]);

  return (
    <>
      <NewExpenseCategoriesModal
        show={show}
        setShow={setShow}
        category={category}
        schema={schema}
        handleSubmit={handleSubmit}
      />
      <Card>
        <Card.Header>
          {user.role === "admin" ? (
            <Button
              className="float-right"
              onClick={handleShow}
              disabled={isLoading}
            >
              <FontAwesome name="fas fa-plus-circle" /> New Category
            </Button>
          ) : null}
          <Card.Title>Expense Categories</Card.Title>
        </Card.Header>
        <Card.Body>
          <CustomLoader isLoading={isLoading}>
            <MDBDataTableV5
              hover
              entriesOptions={[10, 25, 50, 100, 250, 500, 1000]}
              entries={10}
              pagesAmount={10}
              data={{
                columns: tableHeaders,
                rows: categories.map((rom) => {
                  rom.edit = (
                    <>
                      {user.role === "admin" ? (
                        <Button
                          onClick={() => handleEdit(rom)}
                          className="btn-light btn-sm"
                        >
                          <FontAwesome
                            className="fas fa-edit text-primary"
                            style={{ fontSize: 17 }}
                            name="edit"
                          />
                        </Button>
                      ) : null}
                    </>
                  );
                  return rom;
                }),
              }}
              pagingTop
              searchTop
              searchBottom={false}
              fullPagination
            />
          </CustomLoader>
        </Card.Body>
      </Card>
    </>
  );
};

export default ExpenseCategories;
