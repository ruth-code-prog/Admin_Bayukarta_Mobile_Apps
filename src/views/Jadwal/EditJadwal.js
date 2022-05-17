import { updateJadwal, getDetailJadwal } from "actions/JadwalAction";
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

class EditJadwal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      imageLama: DefaultImage,
      image: DefaultImage,
      imageToDB: false,
      title: "",
      senin: "",
      selasa: "",
      rabu: "",
      kamis: "",
      jumat: "",
      sabtu: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(getDetailJadwal(this.props.match.params.id));
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
    const {title, senin, selasa, rabu, kamis, jumat, sabtu } = this.state;
    event.preventDefault();
      //proses lanjut ke action firebase
      this.props.dispatch(updateJadwal(this.state));
  };

  componentDidUpdate(prevProps) {
    const { updateJadwalResult, getDetailJadwalResult } = this.props;

    // Stack di array random & uid ke jadwal db
    if (updateJadwalResult && prevProps.updateJadwalResult !== updateJadwalResult) {
     swal("Sukses", "Jadwal Dokter Sukses DiUpdate", "success");
     this.props.history.push("/admin/jadwal");
   }

    if (getDetailJadwalResult && prevProps.getDetailJadwalResult !== getDetailJadwalResult) {
    this.setState({
      image: getDetailJadwalResult.image,
      title: getDetailJadwalResult.title,
      senin: getDetailJadwalResult.senin,
      selasa: getDetailJadwalResult.selasa,
      rabu: getDetailJadwalResult.rabu,
      kamis: getDetailJadwalResult.kamis,
      jumat: getDetailJadwalResult.jumat,
      sabtu: getDetailJadwalResult.sabtu,
      imageLama: getDetailJadwalResult.image,
    })
  }
}


  render() {
    const { image, title, senin, selasa, rabu, kamis, jumat, sabtu } = this.state;
    console.log("Image : ", this.state.imageToDB);
    const {updateJadwalLoading} = this.props
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
                  Edit Jadwal Dokter RS.Bayukarta from Mobile App
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
                        <label>Senin</label>
                        <Input
                          type="text"
                          value={senin}
                          name="senin"
                          onChange={(event) => this.handleChange(event)}
                        />
                        <label>Selasa</label>
                        <Input
                          type="text"
                          value={selasa}
                          name="selasa"
                          onChange={(event) => this.handleChange(event)}
                        />
                        <label>Rabu</label>
                        <Input
                          type="text"
                          value={rabu}
                          name="rabu"
                          onChange={(event) => this.handleChange(event)}
                        />
                        <label>Kamis</label>
                        <Input
                          type="text"
                          value={kamis}
                          name="kamis"
                          onChange={(event) => this.handleChange(event)}
                        />
                        <label>Jumat</label>
                        <Input
                          type="text"
                          value={jumat}
                          name="jumat"
                          onChange={(event) => this.handleChange(event)}
                        />
                        <label>Sabtu</label>
                        <Input
                          type="text"
                          value={sabtu}
                          name="sabtu"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                  <Col>
                      {updateJadwalLoading ? (
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
  updateJadwalLoading: state.JadwalReducer.updateJadwalLoading,
  updateJadwalResult: state.JadwalReducer.updateJadwalResult,
  updateJadwalError: state.JadwalReducer.updateJadwalError,

  getDetailJadwalLoading: state.JadwalReducer.getDetailJadwalLoading,
  getDetailJadwalResult: state.JadwalReducer.getDetailJadwalResult,
  getDetailJadwalError: state.JadwalReducer.getDetailJadwalError,
});

export default connect(mapStateToProps, null)(EditJadwal);
