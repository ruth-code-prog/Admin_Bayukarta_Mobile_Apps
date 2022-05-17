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
      appo1: "",
      appo2: "",
      appo3: "",
      appo4: "",
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
        appo1: getDetailUserResult.appo1,
        appo2: getDetailUserResult.appo2,
        appo3: getDetailUserResult.appo3,
        appo4: getDetailUserResult.appo4,
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
      appo1,
      appo2,
      appo3,
      appo4,
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
      appo1,
      appo2,
      appo3,
      appo4,
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
                        <label>Nama User</label>
                        <Input
                          type="text"
                          value={fullName}
                          name="fullName"
                          onChange={(event) => this.handleChange(event)}
                        />
                        <label>Mobile Number</label>
                        <Input
                          type="text"
                          value={mobileNumber}
                          name="mobileNumber"
                          onChange={(event) => this.handleChange(event)}
                        />
                        <label>penunjangPassword</label>
                        <Input
                          type="text"
                          value={penunjangPassword}
                          name="penunjangPassword"
                          onChange={(event) => this.handleChange(event)}
                        />
                        <label>Appoitmen 1</label>
                        <Input
                          type="text"
                          value={appo1}
                          name="appo1"
                          onChange={(event) => this.handleChange(event)}
                        />
                        <label>Appoitmen 2</label>
                        <Input
                          type="text"
                          value={appo2}
                          name="appo2"
                          onChange={(event) => this.handleChange(event)}
                        />
                        <label>Appoitmen 3</label>
                        <Input
                          type="text"
                          value={appo3}
                          name="appo3"
                          onChange={(event) => this.handleChange(event)}
                        />
                        <label>Appoitmen 4</label>
                        <Input
                          type="text"
                          value={appo4}
                          name="appo4"
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