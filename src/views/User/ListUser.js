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
import { getListUser, deleteUser, searchListUser } from "actions/UserAction";
import swal from "sweetalert";

class ListUser extends Component {
  componentDidMount() {
    this.props.dispatch(getListUser());
  }

  removeData = (photo, id) => {
    //akses ke action
    this.props.dispatch(deleteUser(photo, id));
  };

  componentDidUpdate(prevProps) {
    const { deleteUserResult } = this.props;

    if (deleteUserResult && prevProps.deleteUserResult !== deleteUserResult) {
      swal("Sukses!", deleteUserResult, "success");
      this.props.dispatch(getListUser());
    }
  }

  handleSearch = (e) => {
    this.props.dispatch(searchListUser(e.target.value));
  };

  render() {
    const { getListUserError, getListUserLoading, getListUserResult } =
      this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <Row className="px-4 align-items-center justify-content-between">
                <CardHeader>
                  <CardTitle tag="h4">List User</CardTitle>
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
                      <th>Nama User</th>
                      <th>Keterangan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {getListUserResult ? (
                      Object.keys(getListUserResult).map((key) => (
                        <tr>
                          <td>
                            <img
                              src={getListUserResult[key].photo}
                              width="440"
                              alt={getListUserResult[key].fullName}
                            />
                            <p>{getListUserResult[key].fullName}</p>
                            <p>email: {getListUserResult[key].email} </p>
                          </td>
                          <td style={{ maxWidth: 450 }}>
                            <p>
                              No. Handphone:{" "}
                              {getListUserResult[key].mobileNumber}
                            </p>
                            <p>UID user: {getListUserResult[key].uid}</p>
                            <p>Token: {getListUserResult[key].fcmToken}</p>
                            <p>
                              Pasword login: {getListUserResult[key].password}
                            </p>
                            <p>
                              Password User Penunjang:{" "}
                              {getListUserResult[key].penunjangPassword}
                            </p>
                            <p>appoitment1: {getListUserResult[key].appo1}</p>
                            <p>appoitment2: {getListUserResult[key].appo2}</p>
                            <p>appoitment3: {getListUserResult[key].appo3}</p>
                            <p>appoitment4: {getListUserResult[key].appo4}</p>
                          </td>
                          <td>
                            <Link
                              className="btn btn-warning"
                              to={"/admin/user/edit/" + key}
                            >
                              <i className="nc-icon nc-ruler-pencil"></i> Edit
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : getListUserLoading ? (
                      <tr>
                        <td colSpan="3" align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : getListUserError ? (
                      <tr>
                        <td colSpan="3" align="center">
                          {getListUserError}
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
  getListUserLoading: state.UserReducer.getListUserLoading,
  getListUserResult: state.UserReducer.getListUserResult,
  getListUserError: state.UserReducer.getListUserError,

  deleteUserLoading: state.UserReducer.deleteUserLoading,
  deleteUserResult: state.UserReducer.deleteUserResult,
  deleteUserError: state.UserReducer.deleteUserError,
});

export default connect(mapStateToProps, null)(ListUser);