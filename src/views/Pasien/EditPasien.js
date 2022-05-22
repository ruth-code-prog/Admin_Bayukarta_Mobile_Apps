import { updatePasien, getDetailPasien } from "actions/PasienAction";
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

class EditPasien extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      imageLama: DefaultImage,
      image: DefaultImage,
      photoToDB: false,
      title: "",
      body: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(getDetailPasien(this.props.match.params.id));
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
      title,
      body
    } = this.state;
    event.preventDefault();
    if (
      (title, body)
    ) {
      //proses lanjut ke action firebase
      this.props.dispatch(updatePasien(this.state));
    } else {
      //alert
      swal("Failed!", "Maaf Data Wajib harus diisi Lengkap", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const { updatePasienResult, getDetailPasienResult } = this.props;

    // Stack di array random & uid ke User db
    if (updatePasienResult && prevProps.updatePasienResult !== updatePasienResult) {
      swal("Sukses", "Nomor Antrian Pasien Terlayani Sukses DiUpdate", "success");
      this.props.history.push("/admin/Pasien");
    }

    if (
      getDetailPasienResult &&
      prevProps.getDetailPasienResult !== getDetailPasienResult
    ) {
      this.setState({
        image: getDetailPasienResult.image,
        title: getDetailPasienResult.title,
        body: getDetailPasienResult.body,
      });
    }
  }

  render() {
    const {
      image,
      title,
      body,
    } = this.state;
    console.log("Image : ", this.state.photoToDB);
    const { updateUserLoading } = this.props;
    return (
      <div className="content">
        <Row>
          <Col>
            <Link to="/admin/Pasien" className="btn btn-primary">
              Kembali
            </Link>
          </Col>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">
                  Edit Nomor Antrian Pasien sedang diLayani
                </CardTitle>
              </CardHeader>
              <CardBody>
              <Row>
                </Row>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>    
                    <Col md={6}>
                      <FormGroup>
                        <label>Nama Klinik</label>
                        <Input
                          type="text"
                          value={title}
                          name="title"
                          onChange={(event) => this.handleChange(event)}
                        />
                        <label>Nomor Antrian Pasien sedang diLayani</label>
                        <Input
                          type="text"
                          value={body}
                          name="body"
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
  updatePasienLoading: state.PasienReducer.updatePasienLoading,
  updatePasienResult: state.PasienReducer.updatePasienResult,
  updatePasienError: state.PasienReducer.updatePasienError,

  getDetailPasienLoading: state.PasienReducer.getDetailPasienLoading,
  getDetailPasienResult: state.PasienReducer.getDetailPasienResult,
  getDetailPasienError: state.PasienReducer.getDetailPasienError,
});

export default connect(mapStateToProps, null)(EditPasien);
