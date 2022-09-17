import { updateUser, getDetailUser } from "actions/UserAction";
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

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      photoLama: DefaultImage,
      photo: DefaultImage,
      photoToDB: false,
      fullName: "",
      email: "",
      mobileNumber: "",
      password: "",
      penunjangPassword: "",
      os1: "",
      dokter1: "",
      klinik1: "",
      antrian1: "",
      os2: "",
      dokter2: "",
      klinik2: "",
      antrian2: "",
      os3: "",
      dokter3: "",
      klinik3: "",
      antrian3: "",
      os4: "",
      dokter4: "",
      klinik4: "",
      antrian4: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(getDetailUser(this.props.match.params.id));
  }

  componentDidUpdate(prevProps) {
    const { updateUserResult, getDetailUserResult } = this.props;

    // Stack di array random & uid ke User db
    if (updateUserResult && prevProps.updateUserResult !== updateUserResult) {
      swal("Sukses", "User Sukses DiUpdate", "success");
      this.props.history.push("/admin/User");
    }

    if (
      getDetailUserResult &&
      prevProps.getDetailUserResult !== getDetailUserResult
    ) {
      this.setState({
        photo: getDetailUserResult.photo,
        fullName: getDetailUserResult.fullName,
        email: getDetailUserResult.email,
        mobileNumber: getDetailUserResult.mobileNumber,
        password: getDetailUserResult.password,
        penunjangPassword: getDetailUserResult.penunjangPassword,
        os1: getDetailUserResult.os1,
        dokter1: getDetailUserResult.dokter1,
        klinik1: getDetailUserResult.klinik1,
        antrian1: getDetailUserResult.antrian1,
        os2: getDetailUserResult.os2,
        dokter2: getDetailUserResult.dokter2,
        klinik2: getDetailUserResult.klinik2,
        antrian2: getDetailUserResult.antrian2,
        os3: getDetailUserResult.os3,
        dokter3: getDetailUserResult.dokter3,
        klinik3: getDetailUserResult.klinik3,
        antrian3: getDetailUserResult.antrian3,
        os4: getDetailUserResult.os4,
        dokter4: getDetailUserResult.dokter4,
        klinik4: getDetailUserResult.klinik4,
        antrian4: getDetailUserResult.antrian4,
      });
    }
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
        photo: URL.createObjectURL(gambar),
        photoToDB: gambar,
      });
    }
  };

  handleSubmit = (event) => {
    const {
      fullName,
      email,
      mobileNumber,
      password,
      penunjangPassword,
      os1,
      dokter1,
      klinik1,
      antrian1,
      os2,
      dokter2,
      klinik2,
      antrian2,
      os3,
      dokter3,
      klinik3,
      antrian3,
      os4,
      dokter4,
      klinik4,
      antrian4,
    } = this.state;
    event.preventDefault();

    //proses lanjut ke action firebase
    this.props.dispatch(updateUser(this.state));
  };

  render() {
    const {
      photo,
      fullName,
      email,
      mobileNumber,
      password,
      penunjangPassword,
      os1,
      dokter1,
      klinik1,
      antrian1,
      os2,
      dokter2,
      klinik2,
      antrian2,
      os3,
      dokter3,
      klinik3,
      antrian3,
      os4,
      dokter4,
      klinik4,
      antrian4,
    } = this.state;
    console.log("Image : ", this.state.photoToDB);
    const { updateUserLoading } = this.props;
    return (
      <div className="content">
        <Row>
          <Col>
            <Link to="/admin/User" className="btn btn-primary">
              Kembali
            </Link>
          </Col>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">
                  Edit User RS.Bayukarta from Mobile App
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row></Row>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label style={{marginTop: 40, fontWeight: 'bold', fontSize: 22}}>Nama Akun (User)</label>
                        <Input
                          style={{fontWeight: 'bold', color: 'black'}}
                          type="text"
                          value={fullName}
                          name="fullName"
                          onChange={(event) => this.handleChange(event)}
                        />
                        <label style={{marginTop: 40, fontWeight: 'bold', fontSize: 22}}>Mobile Number</label>
                        <Input
                          style={{fontWeight: 'bold', color: 'black'}}
                          type="text"
                          value={mobileNumber}
                          name="mobileNumber"
                          onChange={(event) => this.handleChange(event)}
                        />
                        <label style={{marginTop: 40, fontWeight: 'bold', fontSize: 22}}>Pasien 1</label>
                        <h5>Os</h5>
                        <Input
                          style={{backgroundColor: '#E6E6FA', fontWeight: 'bold', color: 'black', fontSize: 14}}
                          type="text"
                          value={os1}
                          name="os1"
                          onChange={(event) => this.handleChange(event)}
                        />
                        <h5>Dokter</h5>
                        <Input
                          style={{backgroundColor: '#E6E6FA', fontWeight: 'bold', color: "black"}}
                          type="text"
                          value={dokter1}
                          name="dokter1"
                          onChange={(event) => this.handleChange(event)}
                        />
                        <h5>Klinik</h5>
                        <Input
                           style={{backgroundColor: '#E6E6FA', fontWeight: 'bold', color: "black"}}
                          type="text"
                          value={klinik1}
                          name="klinik1"
                          onChange={(event) => this.handleChange(event)}
                        />
                        <h5>Nomor Antrian</h5>
                        <Input
                          style={{backgroundColor: '#E6E6FA', fontWeight: 'bold', color: "black"}}
                          type="text"
                          value={antrian1}
                          name="antrian1"
                          onChange={(event) => this.handleChange(event)}
                        />


                        <label style={{marginTop: 50, fontWeight: 'bold', fontSize: 22}}>Pasien 2</label>
                        <h5>Os</h5>
                        <Input
                          style={{backgroundColor: ' 	#4B0082', color: "white", fontWeight: 'bold'}}
                          type="text"
                          value={os2}
                          name="os2"
                          onChange={(event) => this.handleChange(event)}
                        />
                        <h5>Dokter</h5>
                        <Input
                          style={{backgroundColor: ' 	#4B0082', color: "white", fontWeight: 'bold'}}
                          type="text"
                          value={dokter2}
                          name="dokter2"
                          onChange={(event) => this.handleChange(event)}
                        />
                        <h5>Klinik</h5>
                        <Input
                          style={{backgroundColor: ' 	#4B0082', color: "white", fontWeight: 'bold'}}
                          type="text"
                          value={klinik2}
                          name="klinik2"
                          onChange={(event) => this.handleChange(event)}
                        />
                        <h5>Nomor Antrian</h5>
                        <Input
                          style={{backgroundColor: ' 	#4B0082', color: "white", fontWeight: 'bold'}}
                          type="text"
                          value={antrian2}
                          name="antrian2"
                          onChange={(event) => this.handleChange(event)}
                        />

                        <label style={{marginTop: 50, fontWeight: 'bold', fontSize: 22}}>Pasien 3</label>
                        <h5>Os</h5>
                        <Input
                           style={{backgroundColor: '#E6E6FA', fontWeight: 'bold', color: "black"}}
                          type="text"
                          value={os3}
                          name="os3"
                          onChange={(event) => this.handleChange(event)}
                        />
                        <h5>Dokter</h5>
                        <Input
                           style={{backgroundColor: '#E6E6FA', fontWeight: 'bold', color: "black"}}
                          type="text"
                          value={dokter3}
                          name="dokter3"
                          onChange={(event) => this.handleChange(event)}
                        />
                        <h5>Klinik</h5>
                        <Input
                          style={{backgroundColor: '#E6E6FA', fontWeight: 'bold', color: "black"}}
                          type="text"
                          value={klinik3}
                          name="klinik3"
                          onChange={(event) => this.handleChange(event)}
                        />
                        <h5>Nomor Antrian</h5>
                        <Input
                           style={{backgroundColor: '#E6E6FA', fontWeight: 'bold', color: "black"}}
                          type="text"
                          value={antrian3}
                          name="antrian3"
                          onChange={(event) => this.handleChange(event)}
                        />

                        <label style={{marginTop: 50, fontWeight: 'bold', fontSize: 22}}>Pasien 4</label>
                        <h5>Os</h5>
                        <Input
                          style={{backgroundColor: ' 	#4B0082', color: "white", fontWeight: 'bold'}}
                          type="text"
                          value={os4}
                          name="os4"
                          onChange={(event) => this.handleChange(event)}
                        />
                        <h5>Dokter</h5>
                        <Input
                          style={{backgroundColor: ' 	#4B0082', color: "white", fontWeight: 'bold'}}
                          type="text"
                          value={dokter4}
                          name="dokter4"
                          onChange={(event) => this.handleChange(event)}
                        />
                        <h5>klinik1</h5>
                        <Input
                          style={{backgroundColor: ' 	#4B0082', color: "white", fontWeight: 'bold'}}
                          value={klinik4}
                          name="klinik4"
                          onChange={(event) => this.handleChange(event)}
                        />
                       <h5>Nomor Antrian</h5>
                        <Input
                          style={{backgroundColor: ' 	#4B0082', color: "white", fontWeight: 'bold'}}
                          type="text"
                          value={antrian4}
                          name="antrian4"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      {updateUserLoading ? (
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
  updateUserLoading: state.UserReducer.updateUserLoading,
  updateUserResult: state.UserReducer.updateUserResult,
  updateUserError: state.UserReducer.updateUserError,

  getDetailUserLoading: state.UserReducer.getDetailUserLoading,
  getDetailUserResult: state.UserReducer.getDetailUserResult,
  getDetailUserError: state.UserReducer.getDetailUserError,
});

export default connect(mapStateToProps, null)(EditUser);
