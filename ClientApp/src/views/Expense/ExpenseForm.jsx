import { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

import {
  TextField,
  SubmitBtn,
  SelectField,
  TextAreaField,
} from "../../components/Form";

import expenseCategoryApi from "../../api/expenseCategoryApi";
import expensesApi from "../../api/expensesApi";

const schema = Yup.object({
  id: Yup.number(),
  amount: Yup.number().required().min(1000).max(100000).label("Amount"),
  description: Yup.string().required().label("Description"),
  expenseCategoryId: Yup.string().required().label("Category"),
});

export default function ExpenseForm(props) {
  const [expense] = useState({
    id: 0,
    amount: "",
    description: "",
    expenseCategoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = async () => {
    setIsLoading(true);
    const { data: categories } = await expenseCategoryApi.getAll();
    setIsLoading(false);

    setCategories([...categories]);
  };
  const handleSubmit = async (expense, { resetForm }) => {
    setIsLoading(true);
    if (expense.id === 0) {
      const response = await expensesApi.add({
        ...expense,
      });
      setIsLoading(false);

      if (response.ok) {
        toast.info("Success");
        return resetForm();
      }

      toast.error("Something went wrong");
    } else {
      const response = await expensesApi.update(expense.id, expense);
      setIsLoading(false);

      if (response.ok) {
        return props.history.goBack();
      }
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <Card>
      <Card.Header>
        <Card.Title>
          {expense.id === 0 ? "Expenses Form" : "Update Expense"}
        </Card.Title>
      </Card.Header>
      <Formik
        enableReinitialize
        initialValues={expense}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <>
            <Card.Body>
              <Row>
                <Col>
                  <SelectField
                    isLoading={isLoading}
                    options={categories.map((c) => ({
                      label: c.name,
                      value: c.id,
                    }))}
                    name="expenseCategoryId"
                    label="Expense Category"
                    required
                  />
                </Col>
                <Col>
                  <TextField
                    rows="5"
                    name="amount"
                    type="number"
                    label="Amount"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <TextAreaField
                    rows="5"
                    placeholder="Extra information"
                    name="description"
                    label="Description"
                  />
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="text-center">
              <SubmitBtn
                size="lg"
                title={
                  isLoading
                    ? "...Loading"
                    : expense.id === 0
                    ? "Submit"
                    : "Update"
                }
                disabled={isLoading}
              />
            </Card.Footer>
          </>
        )}
      </Formik>
    </Card>
  );
}
