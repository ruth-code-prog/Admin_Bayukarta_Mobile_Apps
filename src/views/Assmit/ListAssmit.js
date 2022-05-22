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
  getListAssmit,
  deleteAssmit,
  searchListAssmit,
} from "actions/AssmitAction";
import swal from "sweetalert";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'


class ListAssmit extends Component {
  componentDidMount() {
    this.props.dispatch(getListAssmit());
  }

  removeData = (id, image) => {
    //akses ke action
    this.props.dispatch(deleteAssmit(id, image));
  };

  componentDidUpdate(prevProps) {
    const { deleteAssmitResult } = this.props;

    if (
      deleteAssmitResult &&
      prevProps.deleteAssmitResult !== deleteAssmitResult
    ) {
      swal("Sukses!", deleteAssmitResult, "success");
      this.props.dispatch(getListAssmit());
    }
  }

  handleSearch = (e) => {
    this.props.dispatch(searchListAssmit(e.target.value));
  };

  render() {
    const { getListAssmitError, getListAssmitLoading, getListAssmitResult } =
      this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <Row className="px-4 align-items-center justify-content-between">
                <CardHeader>
                  <CardTitle tag="h4">List appoitments Pasien Asuransi & Mitra</CardTitle>
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
                      <th>Kartu Peserta</th> 
                      <th>Account Name</th>
                      <th>Nama Pasien</th>
                      <th>No Wa</th>
                      <th>tanggal Lahir</th>
                      <th>Penjamin</th>
                      <th>Klinik</th>
                      <th>Dokter</th>
                      <th>tanggal Kehadiran</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {getListAssmitResult ? (
                      Object.keys(getListAssmitResult).map((key) => (
                        <tr key={key}>
                          <td>
                          <Zoom>
                            <img
                              src={getListAssmitResult[key].photo}
                              width="440"
                              alt={getListAssmitResult[key].namaAkun}
                            />
                            </Zoom>
                          </td>
                          <td>{getListAssmitResult[key].namaAkun}</td>
                          <td>{getListAssmitResult[key].nama}</td>
                          <td>{getListAssmitResult[key].noWa}</td>
                          <td>{getListAssmitResult[key].tanggalLahir}</td>
                          <td>{getListAssmitResult[key].penjamin}</td>
                          <td>{getListAssmitResult[key].klinik}</td>
                          <td>{getListAssmitResult[key].dokter}</td>
                          <td>{getListAssmitResult[key].tanggalKehadiran}</td>
                          <td>
                            <Button
                              color="danger"
                              className="ml-2"
                              onClick={() =>
                                this.removeData(
                                  key,
                                  getListAssmitResult[key]?.image
                                )
                              }
                            >
                              Hapus
                            </Button>
                          </td>
                          <td></td>
                        </tr>
                      ))
                    ) : getListAssmitLoading ? (
                      <tr>
                        <td colSpan="3" align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : getListAssmitError ? (
                      <tr>
                        <td colSpan="3" align="center">
                          {getListAssmitError}
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
  getListAssmitLoading: state.AssmitReducer.getListAssmitLoading,
  getListAssmitResult: state.AssmitReducer.getListAssmitResult,
  getListAssmitError: state.AssmitReducer.getListAssmitError,

  deleteAssmitLoading: state.AssmitReducer.deleteAssmitLoading,
  deleteAssmitResult: state.AssmitReducer.deleteAssmitResult,
  deleteAssmitError: state.AssmitReducer.deleteAssmitError,
});

export default connect(mapStateToProps, null)(ListAssmit);
