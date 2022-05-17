import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
  Button,
  Spinner,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getListPasien,
  deletePasien,
  searchListPasien,
} from "actions/PasienAction";
import swal from "sweetalert";

class ListPasien extends Component {
  componentDidMount() {
    this.props.dispatch(getListPasien());
  }

  removeData = (image, id) => {
    //akses ke action
    this.props.dispatch(deletePasien(image, id));
  };

  componentDidUpdate(prevProps) {
    const { deletePasienResult } = this.props;

    if (
      deletePasienResult &&
      prevProps.deletePasienResult !== deletePasienResult
    ) {
      swal("Sukses!", deletePasienResult, "success");
      this.props.dispatch(getListPasien());
    }
  }

  handleSearch = (e) => {
    this.props.dispatch(searchListPasien(e.target.value));
  };

  render() {
    const { getListPasienError, getListPasienLoading, getListPasienResult } =
      this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <Row className="px-4 align-items-center justify-content-between">
                <CardHeader>
                  <CardTitle tag="h4">List Pasien Terlayani</CardTitle>
                </CardHeader>
                <form className="mt-4">
                  <InputGroup className="no-border">
                    <Input
                      onChange={this.handleSearch}
                      placeholder="Search..."
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <i className="nc-icon nc-zoom-split" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </form>
              </Row>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>Klinik</th>
                      <th>Pasien Terlayani</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {getListPasienResult ? (
                      Object.keys(getListPasienResult).map((key) => (
                        <tr key={key}>
                          <td>
                            <img
                              src={getListPasienResult[key].image}
                              width="50"
                              alt={getListPasienResult[key].title}
                            />
                            {getListPasienResult[key].title}
                          </td>
                          <td>
                            <p>Klinik: {getListPasienResult[key].title}</p>
                            <p>
                              Pasien Terlayani: {getListPasienResult[key].body}
                            </p>
                          </td>
                          <td>
                            <Link
                              className="btn btn-warning"
                              to={"/admin/pasien/edit/" + key}
                            >
                              <i className="nc-icon nc-ruler-pencil"></i> Edit
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : getListPasienLoading ? (
                      <tr>
                        <td colSpan="3" align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : getListPasienError ? (
                      <tr>
                        <td colSpan="3" align="center">
                          {getListPasienError}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="3" align="center">
                          Data Kosong
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getListPasienLoading: state.PasienReducer.getListPasienLoading,
  getListPasienResult: state.PasienReducer.getListPasienResult,
  getListPasienError: state.PasienReducer.getListPasienError,

  deletePasienLoading: state.PasienReducer.deletePasienLoading,
  deletePasienResult: state.PasienReducer.deletePasienResult,
  deletePasienError: state.PasienReducer.deletePasienError,
});

export default connect(mapStateToProps, null)(ListPasien);
