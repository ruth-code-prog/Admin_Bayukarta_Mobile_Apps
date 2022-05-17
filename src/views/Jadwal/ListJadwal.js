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
import { getListJadwal, deleteJadwal, searchListJadwal } from "actions/JadwalAction";
import { Link } from "react-router-dom";
import swal from "sweetalert";

class ListJadwal extends Component {
  componentDidMount() {
    this.props.dispatch(getListJadwal());
  }

  removeData = (image, id) => {
    //akses ke action
    this.props.dispatch(deleteJadwal(image, id));
  };

  componentDidUpdate(prevProps) {
    const { deleteJadwalResult } = this.props;

    if(deleteJadwalResult && prevProps.deleteJadwalResult !== deleteJadwalResult) {
      swal("Sukses!", deleteJadwalResult, "success");
      this.props.dispatch(getListJadwal());
    }
  }

   handleSearch = (e) => {
    this.props.dispatch(searchListJadwal(e.target.value));
  };

  render() {
    const { getListJadwalError, getListJadwalLoading, getListJadwalResult } =
      this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
            <Row className="px-4 align-items-center justify-content-between">
                <CardHeader>
                  <CardTitle tag="h4">Jadwal Dokter RS.Bayukarta from Mobile App</CardTitle>
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
                      <th>Dokter</th>
                      <th>Jadwal Praktek</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {getListJadwalResult ? (
                      Object.keys(getListJadwalResult).map((key) => (
                        <tr key={key}>
                          <td>
                            <img
                              src={getListJadwalResult[key].image}
                              width="100"
                              alt={getListJadwalResult[key].title}
                            />
                          </td>
                          <td>
                            {getListJadwalResult[key].title}
                            <p>{getListJadwalResult[key].senin} </p>
                            <p>{getListJadwalResult[key].selasa}</p>
                            <p>{getListJadwalResult[key].rabu}</p>
                            <p>{getListJadwalResult[key].kamis}</p>
                            <p>{getListJadwalResult[key].jumat}</p>
                            <p>{getListJadwalResult[key].sabtu}</p>
                          </td>
                          <td>
                            <Link
                              className="btn btn-warning"
                              to={"/admin/jadwal/edit/" + key}
                            >
                              <i className="nc-icon nc-ruler-pencil"></i> Edit
                            </Link>
                            <Button
                              color="danger"
                              className="ml-2"
                              onClick={() =>
                                this.removeData(
                                  getListJadwalResult[key].image,
                                  key
                                )
                              }
                            >
                              <i className="nc-icon nc-basket"></i> Hapus
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : getListJadwalLoading ? (
                      <tr>
                        <td colSpan="3" align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : getListJadwalError ? (
                      <tr>
                        <td colSpan="3" align="center">
                          {getListJadwalError}
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
  getListJadwalLoading: state.JadwalReducer.getListJadwalLoading,
  getListJadwalResult: state.JadwalReducer.getListJadwalResult,
  getListJadwalError: state.JadwalReducer.getListJadwalError,

  deleteJadwalLoading: state.JadwalReducer.deleteJadwalLoading,
  deleteJadwalResult: state.JadwalReducer.deleteJadwalResult,
  deleteJadwalError: state.JadwalReducer.deleteJadwalError,
});

export default connect(mapStateToProps, null)(ListJadwal);
