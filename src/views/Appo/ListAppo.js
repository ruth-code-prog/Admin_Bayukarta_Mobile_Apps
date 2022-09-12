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
import { getListAppo, deleteAppo, searchListAppo } from "actions/AppoAction";
import swal from "sweetalert";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css'

class ListAppo extends Component {
  componentDidMount() {
    this.props.dispatch(getListAppo());
  }

  removeData = (id, image) => {
    //akses ke action
    this.props.dispatch(deleteAppo(id, image));
  };

  componentDidUpdate(prevProps) {
    const { deleteAppoResult } = this.props;

    if (deleteAppoResult && prevProps.deleteAppoResult !== deleteAppoResult) {
      swal("Sukses!", deleteAppoResult, "success");
      this.props.dispatch(getListAppo());
    }
  }

  handleSearch = (e) => {
    this.props.dispatch(searchListAppo(e.target.value));
  };

  render() {
    const { getListAppoError, getListAppoLoading, getListAppoResult } =
      this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
            <Row className="px-4 align-items-center justify-content-between">
                <CardHeader>
                  <CardTitle tag="h4">List appoitments Pasien Umum</CardTitle>
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
                      <th>KTP</th> 
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
                    {getListAppoResult ? (
                      Object.keys(getListAppoResult).map((key) => (
                        <tr key={key}>
                           <td>
                          <Zoom>
                            <img
                              src={getListAppoResult[key].gambar}
                              width="180"
                              alt={getListAppoResult[key].namaAkun}
                            />
                            </Zoom>
                          </td>
                        <td>{getListAppoResult[key].namaAkun}</td>
                          <td>{getListAppoResult[key].nama}</td>
                          <td>{getListAppoResult[key].noWa}</td>
                          <td>{getListAppoResult[key].tanggalLahir}</td>
                          <td>{getListAppoResult[key].penjamin}</td>
                          <td>{getListAppoResult[key].klinik}</td>
                          <td>{getListAppoResult[key].dokter}</td>
                          <td>{getListAppoResult[key].tanggalKehadiran}</td>
                          <td>
                            <Button
                            color="danger"
                             className="ml-2"
                              onClick={() =>
                                this.removeData(
                                  key,
                                  getListAppoResult[key]?.image
                                )
                              }
                            >
                              Hapus
                            </Button>
                          </td>
                          <td></td>
                        </tr>
                      ))
                    ) : getListAppoLoading ? (
                      <tr>
                        <td colSpan="3" align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : getListAppoError ? (
                      <tr>
                        <td colSpan="3" align="center">
                          {getListAppoError}
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
  getListAppoLoading: state.AppoReducer.getListAppoLoading,
  getListAppoResult: state.AppoReducer.getListAppoResult,
  getListAppoError: state.AppoReducer.getListAppoError,

  deleteAppoLoading: state.AppoReducer.deleteAppoLoading,
  deleteAppoResult: state.AppoReducer.deleteAppoResult,
  deleteAppoError: state.AppoReducer.deleteAppoError,
});

export default connect(mapStateToProps, null)(ListAppo);

