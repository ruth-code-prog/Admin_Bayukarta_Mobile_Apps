import React from "react";
import { Route } from "react-router-dom";
import {
  ButtonGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
} from 'reactstrap'
import { useDispatch } from "react-redux";
import Zoom from "react-medium-image-zoom";
import axios from 'axios';
import Swal from 'sweetalert'
import "react-medium-image-zoom/dist/styles.css";
import { activateAppo } from "actions/AppoAction";

export default function Item({
  itemKey,
  index,
  getListAppoResult,
  removeData,
}) {
  const dispatch = useDispatch();

  const [active, setActive] = React.useState(
    getListAppoResult[itemKey]?.active ? true : false
  );

  const [showModal, setShowModal] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleActivate = () => {
    const data = { ...getListAppoResult[itemKey] };
    data.active = active ? false : true;
    data.id = itemKey;

    dispatch(activateAppo(data));
    setActive((old) => !old);
  };

  const toggle = () => setShowModal(!showModal);

  const handleSubmit = () => {
    if (title.length > 0 && body.length > 0) {
      setLoading(true);

      axios
        .post(
          "https://fcm.googleapis.com/fcm/send",
          {
            to: getListAppoResult[itemKey]?.token,
            notification: {
              title,
              body,
            },
            data: {
              category: "appointment",
              page: "appo",
            },
            priority: "high",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "key=AAAAQV_Cb4g:APA91bH0vGL4W5Q3y8vDNY0tPR2EWI5-3WSh8e1bhvCR8PMU47krSby68ohyJuYcvTmIa9r3Z9GUDWv0n-nJ4gmcYSii0c_AOHFH6ZGpavkT-p3iBBew08yC8rOpP0QqyNbtxyMUIL9w",
            },
          }
        )
        .then((res) => {
          console.log("push notificatin berhasil terkirim: ", res);
          Swal("Sukses!", "Notifikasi berhasil terkirim", "success");
        })
        .catch((err) => {
          console.log("push notification gagal terkirim: ", err);
          Swal("Gagal!", "Notifikasi gagal terkirim!", "error");
        })
        .finally(() => {
          setLoading(false);
          setShowModal(false);
        });
    }
  };

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>
          <Zoom>
            <img
              src={getListAppoResult[itemKey]?.gambar}
              width="180"
              alt={getListAppoResult[itemKey]?.namaAkun}
            />
          </Zoom>
        </td>
        <td>{getListAppoResult[itemKey]?.namaAkun}</td>
        <td>{getListAppoResult[itemKey]?.nama}</td>
        <td>{getListAppoResult[itemKey]?.noRm}</td>
        <td>{getListAppoResult[itemKey]?.tanggalLahir}</td>
        <td>{getListAppoResult[itemKey]?.alamat}</td>
        <td>{getListAppoResult[itemKey]?.noWa}</td>
        <td>{getListAppoResult[itemKey]?.penjamin}</td>
        <td>{getListAppoResult[itemKey]?.klinik}</td>
        <td>{getListAppoResult[itemKey]?.dokter}</td>
        <td>{getListAppoResult[itemKey]?.tanggalKehadiran}</td>
        <td>{getListAppoResult[itemKey]?.jamKehadiran}</td>
        <td>
          <ButtonGroup>
            {getListAppoResult[itemKey]?.token && (
              <Button color="info" onClick={toggle}>
                Notifikasi
              </Button>
            )}
            <Route
              render={({ history }) => {
                return (
                  <Button
                    color="warning"
                    onClick={() => {
                      history.push(
                        "/admin/user/edit/" + getListAppoResult[itemKey]?.uid
                      );
                    }}
                  >
                    Edit
                  </Button>
                );
              }}
            />
            <Button
              color="danger"
              onClick={() =>
                removeData(itemKey, getListAppoResult[itemKey]?.image)
              }
            >
              Hapus
            </Button>
            <Button
              color={active ? "success" : "secondary"}
              onClick={handleActivate}
            >
              {active ? "HaveQue" : "No-Que"}
            </Button>
          </ButtonGroup>
        </td>
        <td></td>
      </tr>

      <Modal isOpen={showModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Kirim Notifikasi ke {getListAppoResult[itemKey]?.namaAkun}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Masukkan title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="body">Body</Label>
              <Input
                id="body"
                name="body"
                placeholder="Masukkan body"
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Batal
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            {loading ? (
              <Spinner color="light" size="sm">
                Loading...
              </Spinner>
            ) : (
              "Kirim"
            )}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
