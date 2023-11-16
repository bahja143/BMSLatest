import * as Yup from "yup";
import { Formik } from "formik";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import FontAwesome from "react-fontawesome";
import { useState, useEffect } from "react";
import { Card, Row, Col, Table, Button } from "react-bootstrap";

import { TextField, SubmitBtn, SelectField } from "../../components/Form";

import PrintReceiptModel from "./PrintReceiptModel";

import receiptsApi from "../../api/receiptsApi";
import tenantsApi from "../../api/tenantsApi";
import billsApi from "../../api/billsApi";

const schema = Yup.object({
  id: Yup.number(),
  payerName: Yup.string().label("Payer name"),
  description: Yup.string().label("Description"),
  tenantId: Yup.string().required().label("Tenant"),
  methodOfPayment: Yup.string().required().label("Method of payment"),
  details: Yup.array().min(1, "You must select at least 1 Bill").label("Bills"),
});

export default function ReceiptForm(props) {
  const [receipt, setReceipt] = useState({
    id: 0,
    details: [],
    tenantId: "",
    payerName: "",
    description: "",
    methodOfPayment: "",
  });
  const [tenants, setTenants] = useState([]);
  const [bills, setBills] = useState([]);
  const [paymentMethods] = useState([
    { label: "Bank Account", value: "Bank Account" },
    { label: "Hello Cash", value: "Hello Cash" },
    { label: "Cash", value: "Cash" },
  ]);
  const [bill, setBill] = useState({});
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [printibleReceipt, setPrintibleReceipt] = useState({});

  const handleLoad = async () => {
    setIsLoading(true);
    const { data: tenants } = await tenantsApi.getAll();
    const { data: bills } = await billsApi.getAll();
    setIsLoading(false);

    setTenants([...tenants]);
    setBills((b) => [...bills, ...b]);
  };
  const handleSubmit = async (receipt, { resetForm }) => {
    const paidBillsId = [...receipt.details.map((d) => d.value)];
    const allBils = bills
      .filter((b) => b.tenantId === receipt.tenantId)
      .map((b) => ({ tenantId: b.tenantId, billId: b.id }));

    const isSomethingWrong = paidBillsId.every((id) =>
      allBils.map((b) => b.billId).includes(id)
    );

    if (!isSomethingWrong && receipt.id === 0) {
      toast.error("Something went wrong");
      setReceipt({
        id: 0,
        details: [],
        tenantId: "",
        payerName: "",
        description: "",
        methodOfPayment: "",
      });
      return resetForm();
    }

    const obj = { ...receipt };
    delete obj.tenantId;
    obj.details = obj.details.map((b) => ({
      id: 0,
      receiptId: 0,
      billId: b.value,
      amount: b.paidAmount,
    }));

    setIsLoading(true);
    if (obj.id === 0) {
      const response = await receiptsApi.add({
        ...obj,
        payerName: obj.payerName
          ? obj.payerName
          : tenants?.find((t) => t.id === receipt.tenantId)?.name,
      });

      setIsLoading(false);

      if (response.ok) {
        toast.info("Success");
        setPrintibleReceipt({
          receipt: { ...receipt, date: new Date().toDateString() },
          tenant: tenants.find((t) => t.id === receipt.tenantId),
          bills: bills
            .filter((b) =>
              bills
                .filter((b) => paidBillsId.includes(b.id))
                .map((b) => b.id)
                .includes(b.id)
            )
            .map((b) => {
              b.paidAmount = receipt.details?.find(
                (r) => r.value === b.id
              ).paidAmount;

              return b;
            }),
        });

        resetForm();
        setShow(true);
        setReceipt({
          id: 0,
          details: [],
          tenantId: "",
          payerName: "",
          description: "",
          methodOfPayment: "",
        });

        return setBills([...response.data.value]);
      }

      toast.error("Something went wrong");
    } else {
      const response = await receiptsApi.update(obj.id, obj);
      setIsLoading(false);

      if (response.ok) {
        return props.history.goBack();
      }

      toast.error("Something went wrong");
    }
  };
  const formatNumber = (inputNumber) => {
    let formetedNumber = Number(inputNumber)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    let splitArray = formetedNumber.split(".");
    if (splitArray.length > 1) {
      formetedNumber = splitArray[0];
    }
    return formetedNumber;
  };
  const handleFilterBills = (id) => {
    return bills.filter((b) => b.tenantId === id);
  };
  const handleUpdate = async () => {
    const { id } = props.match.params;

    if (id) {
      setIsLoading(true);
      const { data } = await receiptsApi.getById(id);
      setIsLoading(false);

      setBills((b) => [...data.bills, ...b]);
      setReceipt({
        ...data,
        methodOfPayment: data.paymentMethod,
        details: data.bills.map((b) => ({
          label: (
            <span>
              {formatNumber(b.amount)} Birr : {b.room} :
              {new Date(b.dueDate) > new Date() ? (
                <span className="badge badge-success ml-2">
                  {new Date(b.dueDate).toDateString()}
                </span>
              ) : (
                <span className="badge badge-danger ml-2">
                  {new Date(b.dueDate).toDateString()}
                </span>
              )}
            </span>
          ),
          value: b.id,
          paidAmount: b.paidAmount,
        })),
      });
    }
  };
  const handleAddBill = (values) => {
    const bil = bills.find((b) => b.id === bill.value);
    setError(false);

    if (bill.paidAmount > bil.amount || bill.paidAmount === 0)
      return setError(true);

    setBill({ paidAmount: 0 });
    setReceipt((r) => ({ ...values, details: [bill, ...r.details] }));
  };
  const handleBillView = (bills) => {
    return bills.map((b) => ({
      label: (
        <span>
          {formatNumber(b.amount)} Birr : {b.room} :
          {new Date(b.dueDate) > new Date() ? (
            <span className="badge badge-success ml-2">
              {new Date(b.dueDate).toDateString()}
            </span>
          ) : (
            <span className="badge badge-danger ml-2">
              {new Date(b.dueDate).toDateString()}
            </span>
          )}
        </span>
      ),
      value: b.id,
      amount: 0,
    }));
  };
  const handleOnChange = (value) => {
    setBill((b) => ({ ...b, paidAmount: parseInt(value) }));
  };
  const handleDelete = (value) => {
    setReceipt((r) => ({
      ...r,
      details: r.details.filter((d) => d.value !== value),
    }));
  };
  const handleEditBill = (value) => {
    setBill({ ...value });
    setReceipt((r) => ({
      ...r,
      details: r.details.filter((d) => d.value !== value.value),
    }));
  };

  useEffect(() => {
    handleLoad();
    handleUpdate();
  }, []);

  return (
    <>
      <PrintReceiptModel
        show={show}
        setShow={setShow}
        receipt={printibleReceipt}
      />
      <Card>
        <Card.Header>
          <Card.Title>
            {receipt.id === 0 ? "Bill Receipt" : "Update Receipt"}
          </Card.Title>
        </Card.Header>
        <Formik
          enableReinitialize
          initialValues={receipt}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <>
              <Card.Body>
                <Row>
                  <Col>
                    <SelectField
                      isDisabled={receipt.id !== 0}
                      options={tenants.map((t) => ({
                        label: `${t.name} (${t.telephone})`,
                        value: t.id,
                      }))}
                      isLoading={isLoading}
                      name="tenantId"
                      label="Tenant"
                      required
                    />
                  </Col>
                  <Col>
                    <SelectField
                      options={paymentMethods}
                      name="methodOfPayment"
                      label="Payment Method"
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextField
                      defaultValue={
                        tenants?.find((t) => t.id === values["tenantId"])?.name
                      }
                      label="Who's paying"
                      name="payerName"
                    />
                  </Col>
                  <Col>
                    <TextField
                      label="Remark"
                      name="description"
                      placeholder="Extra information"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Table className="mt-4 mb-4">
                      <thead>
                        <tr>
                          <th>Bill</th>
                          <th>Amount</th>
                          <th>Due date</th>
                          <th></th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td className="col-4">
                            <ReactSelect
                              isLoading={isLoading}
                              options={handleBillView(
                                handleFilterBills(values["tenantId"]).filter(
                                  (b) =>
                                    !values["details"]
                                      .map((d) => d.value)
                                      .includes(b.id)
                                )
                              )}
                              value={bill}
                              onChange={(e) => setBill(e)}
                            />
                          </td>
                          <td className="col-4">
                            <input
                              className={`form-control ${
                                error ? "is-invalid" : ""
                              }`}
                              placeholder="0.000"
                              name="amount"
                              value={bill.paidAmount}
                              type="number"
                              onChange={(e) => handleOnChange(e.target.value)}
                            />
                          </td>
                          <td className="col-4">
                            <input
                              name="duedate"
                              className="form-control"
                              value={
                                bill.value
                                  ? new Date(
                                      bills.find(
                                        (b) => b.id === bill.value
                                      )?.dueDate
                                    ).toDateString()
                                  : ""
                              }
                              disabled
                            />
                          </td>
                          <td>
                            <Button
                              size="sm"
                              variant="primary"
                              disabled={!bill.value}
                              onClick={() => handleAddBill(values)}
                            >
                              {" "}
                              <FontAwesome name="fas fa-plus-circle text-white" />
                            </Button>
                          </td>
                        </tr>
                        {receipt.details?.map((r) => (
                          <tr key={r.value}>
                            <td>
                              <ReactSelect
                                isDisabled={true}
                                value={r}
                                options={r}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control"
                                name="amount"
                                value={`${formatNumber(r.paidAmount)} Birr`}
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                className="form-control"
                                value={new Date(
                                  bills.find((b) => b.id === r.value)?.dueDate
                                ).toDateString()}
                                disabled
                              />
                            </td>
                            <td>
                              <Button
                                size="sm"
                                variant="primary"
                                onClick={() => handleEditBill(r)}
                              >
                                {" "}
                                <FontAwesome
                                  className="fas fa-edit text-white"
                                  name="edit"
                                />
                              </Button>
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => handleDelete(r.value)}
                              >
                                {" "}
                                <FontAwesome
                                  className="fas fa-trash text-white"
                                  name="trash-can"
                                />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="text-center">
                <SubmitBtn
                  size="lg"
                  title={
                    isLoading
                      ? "...Loading"
                      : receipt.id === 0
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
    </>
  );
}
