import { tambahUser } from "actions/UserAction";
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

class TambahUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: DefaultImage,
      imageToDB: false,
      fullName: "",
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
    const { imageToDB, fullName } = this.state;
    event.preventDefault();
    if (imageToDB && fullName) {
      //proses lanjut ke action firebase
      this.props.dispatch(tambahUser(this.state));
    } else {
      //alert
      swal("Failed!", "Maaf Nama User dan Foto Foto User harus diisi", "error");
    }
  };

// Stack di array random & uid ke jadwal db
// componentDidUpdate(prevProps) {
//  const { tambahUserResult } = this.props;
//
//    if (tambahUserResult && prevProps.tambahUserResult !== tambahUserResult) {
//     swal("Sukses", "Tambah User Dokter Berhasil", "success");
//     this.props.history.push("/admin/jadwal");
//   }
// }

  render() {
    const { image, fullName } = this.state;
    console.log("Image : ", this.state.imageToDB);
    const {tambahUserLoading} = this.props
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
                  Tambah User RS.Bayukarta from Mobile App
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
                        <label>Foto User</label>
                        <Input
                          type="file"
                          onChange={(event) => this.handleImage(event)}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <label>Nama User</label>
                        <Input
                          type="text"
                          value={fullName}
                          name="fullName"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                  <Col>
                      {tambahUserLoading ? (
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
  tambahUserLoading: state.UserReducer.tambahUserLoading,
  tambahUserResult: state.UserReducer.tambahUserResult,
  tambahUserError: state.UserReducer.tambahUserError,
});

export default connect(mapStateToProps, null)(TambahUser);
