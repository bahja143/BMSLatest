import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

import Logo from "../../assets/images/Shebelle.jpg";

const PrintReceiptModel = ({ show, setShow, receipt }) => {
  const inputEl = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => inputEl.current,
  });
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

  return (
    <Modal show={show} size="xl">
      <div className="container" id="printTable">
        <div ref={inputEl}>
          <div className="card">
            <div className="row invoice-contact">
              <div className="col-9">
                <div className="invoice-box row">
                  <div className="col-sm-12">
                    <table className="table table-responsive invoice-table table-borderless p-l-20">
                      <tbody>
                        <tr>
                          <td>
                            <h4 style={{ fontWeight: "bold" }}>
                              SHABELLE BANK BUILDING
                            </h4>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Ethopia - Jijiga, Dudahide, Qabelle 06, Zone 01 Main
                            Road
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a
                              className="text-secondary"
                              href="mailto:shabellerealestate@gmail.com"
                              target="_top"
                            >
                              shabellerealestate@gmail.com
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>+251929256446</td>
                        </tr>
                        <tr>
                          <td>+251915059099</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <Link to="#" className="b-brand">
                  <img
                    src={Logo}
                    width={275}
                    height={275}
                    className="img-fluid"
                    alt="Gradient Able Logo"
                  />
                </Link>
              </div>
            </div>
            <div className="card-body">
              <div className="row invoive-info">
                <div className="col-4 invoice-client-info">
                  <h6>Tenant Information :</h6>
                  <h6 className="m-0">{receipt?.tenant?.name}</h6>
                  <p className="m-2 m-t-10">{receipt?.tenant?.address}</p>
                  <p className="mb-3">{receipt?.tenant?.telephone}</p>
                </div>
                <div className="col-4">
                  {" "}
                  <h6>Receipt Information :</h6>
                  <table
                    style={{ marginTop: -5 }}
                    className="table table-responsive invoice-table invoice-order table-borderless"
                  >
                    <tbody>
                      <tr>
                        <th>Date :</th>
                        <td>{receipt?.receipt?.date}</td>
                      </tr>

                      <tr>
                        <th>Paid by :</th>
                        <td>{receipt?.receipt?.payerName}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-4">
                  <h6 className="m-b-20">
                    Receipt Number <span>#12{receipt?.tenant?.id}</span>
                  </h6>
                  <h6 className="text-uppercase text-primary">
                    Total Due :{" "}
                    <span>
                      {formatNumber(
                        receipt?.bills
                          ?.map((b) => b.amount)
                          .reduce((a, b) => a + b)
                      )}
                      .00 Birr
                    </span>
                  </h6>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <h5 style={{ position: "relative", top: -7.5 }}>
                    Paid Bills
                  </h5>

                  <div className="table-responsive">
                    <table className="table invoice-detail-table">
                      <thead>
                        <tr className="thead-default">
                          <th className="text-center">Description</th>
                          <th className="text-center">Due Date</th>
                          <th className="text-center">Due Amount</th>
                          <th className="text-center">Paid Amount</th>
                          <th className="text-center">Remaining Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {receipt?.bills?.map((b) => (
                          <tr key={b.id}>
                            <td className="text-center">
                              <h6>{b.room}</h6>
                              <p className="m-0">{b.description}</p>
                            </td>
                            <td className="text-center">
                              {new Date(b.dueDate).toLocaleDateString()}
                            </td>
                            <td className="text-center">
                              {formatNumber(b.amount)}.00 BIRR
                            </td>
                            <td className="text-center">
                              {" "}
                              {formatNumber(b.paidAmount)}.00 BIRR
                            </td>
                            <td className="text-center">
                              {" "}
                              {formatNumber(b.amount - b.paidAmount)}.00 BIRR
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <table className="table table-responsive invoice-table invoice-total">
                    <tbody>
                      <tr className="text-info">
                        <td>
                          <hr />
                          <h5 className="text-primary m-r-10">Total Paid :</h5>
                        </td>
                        <td>
                          <hr />
                          <h5 className="text-primary">
                            {formatNumber(
                              receipt?.bills
                                ?.map((b) => b.paidAmount)
                                .reduce((a, b) => a + b)
                            )}
                            .00 Birr
                          </h5>
                        </td>
                      </tr>
                      <tr className="text-info">
                        <td>
                          <hr />
                          <h5 className="text-primary m-r-10">
                            Remaining Balance :
                          </h5>
                        </td>
                        <td>
                          <hr />
                          <h5 className="text-primary">
                            {formatNumber(
                              receipt?.bills
                                ?.map((b) => {
                                  return b.amount - b.paidAmount;
                                })
                                .reduce((a, b) => a + b)
                            )}
                            .00 Birr
                          </h5>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row text-center btn-page">
          <div className="col-sm-12 invoice-btn-group text-center">
            <button
              type="button"
              className="btn btn-primary btn-print-invoice m-b-10"
              onClick={handlePrint}
            >
              Print
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-print-invoice m-b-10"
              onClick={() => setShow(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PrintReceiptModel;
