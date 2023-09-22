import { Component } from "react";
import { Card, Table } from "react-bootstrap";

import Logo from "../assets/images/Shebelle.jpg";
import "../custom.css";

class PrinTible extends Component {
  state = {
    count: 1,
  };

  render() {
    const date = new Date();
    const { title, data, theaders } = this.props;

    return (
      <Card>
        <Card.Header>
          <Card.Title>
            <div className="row">
              <div className="col-12">
                <img src={Logo} height="120" alt="Logo" />
                <h3 className="mt-2">
                  <p className="float-right">{date.toDateString()}</p>
                </h3>
                <h5>
                  <h3>{title}</h3>
                </h5>
              </div>
            </div>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Table striped hover ref="tbl" className="table table-condensed">
            <thead>
              <tr>
                <th>#</th>
                {theaders?.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>{this.handleTableBody(data)}</tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }

  handleTableBody = (data) => {
    let id = 1;
    for (let c of data) {
      c.id = id;
      id++;
    }

    return data?.map((d) => (
      <tr key={d.id}>
        {this.handleRowData(d).map((c) => (
          <td
            style={{
              height: "12",
              padding: "6 24",
              border: "1px solid #eaeaea",
            }}
            key={c}
          >
            {c}
          </td>
        ))}
      </tr>
    ));
  };
  handleRowData = (row) => {
    const colomns = [];

    for (let col in row) {
      colomns.push(row[col]);
    }

    return colomns;
  };
}

export default PrinTible;
