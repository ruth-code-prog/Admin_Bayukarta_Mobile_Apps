import { tambahJadwal } from "actions/JadwalAction";
import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Input,
  Button,
  Spinner,
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import DefaultImage from "../../assets/img/default-image.jpg";

class TambahJadwal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: DefaultImage,
      imageToDB: false,
      title: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      const gambar = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(gambar),
        imageToDB: gambar,
      });
    }
  };

  handleSubmit = (event) => {
    const { imageToDB, title } = this.state;
    event.preventDefault();
    if (imageToDB && title) {
      //proses lanjut ke action firebase
      this.props.dispatch(tambahJadwal(this.state));
    } else {
      //alert
      swal("Failed!", "Maaf Nama Dokter dan Foto Dokter harus diisi", "error");
    }
  };

// Stack di array random & uid ke jadwal db
// componentDidUpdate(prevProps) {
//  const { tambahJadwalResult } = this.props;
//
//    if (tambahJadwalResult && prevProps.tambahJadwalResult !== tambahJadwalResult) {
//     swal("Sukses", "Tambah Jadwal Dokter Berhasil", "success");
//     this.props.history.push("/admin/jadwal");
//   }
// }

  render() {
    const { image, title } = this.state;
    console.log("Image : ", this.state.imageToDB);
    const {tambahJadwalLoading} = this.props
    return (
      <div className="content">
        <Row>
          <Col>
            <Link to="/admin/jadwal" className="btn btn-primary">
              Kembali
            </Link>
          </Col>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">
                  Tambah Jadwal Dokter RS.Bayukarta from Mobile App
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <img src={image} width="200" alt="Foto Dokter" />
                  </Col>
                </Row>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>Foto Dokter</label>
                        <Input
                          type="file"
                          onChange={(event) => this.handleImage(event)}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <label>Nama Dokter</label>
                        <Input
                          type="text"
                          value={title}
                          name="title"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                  <Col>
                      {tambahJadwalLoading ? (
                        <Button color="primary" type="submit" disabled>
                          <Spinner size="sm" color="light" /> Loading
                        </Button>
                      ) : (
                        <Button color="primary" type="submit">
                          Submit
                        </Button>
                      )}
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tambahJadwalLoading: state.JadwalReducer.tambahJadwalLoading,
  tambahJadwalResult: state.JadwalReducer.tambahJadwalResult,
  tambahJadwalError: state.JadwalReducer.tambahJadwalError,
});

export default connect(mapStateToProps, null)(TambahJadwal);
