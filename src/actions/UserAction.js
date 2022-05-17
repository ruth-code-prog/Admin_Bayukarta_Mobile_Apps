import swal from "sweetalert";
import FIREBASE from "../config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils";

export const GET_LIST_USER = "GET_LIST_USER";
export const TAMBAH_USER = "TAMBAH_USER";
export const GET_DETAIL_USER = "GET_DETAIL_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

export const getListUser = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_USER);

    FIREBASE.database()
      .ref("users")
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_USER, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_USER, error);
        alert(error);
      });
  };
};

export const searchListUser = (keyword) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_USER);

    FIREBASE.database()
      .ref("users")
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();
        Object.keys(data).map((key) => {
          if (
            !data[key]?.fullName
              ?.toLowerCase()
              ?.includes(keyword?.toLowerCase())
          ) {
            delete data[key];
          }
        });
        dispatchSuccess(dispatch, GET_LIST_USER, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_USER, error);
        alert(error);
      });
  };
};

export const tambahUser = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, TAMBAH_USER);

    //upload ke storage firebase
    var uploadTask = FIREBASE.storage()
      .ref("Foto User")
      .child(data.imageToDB.name)
      .put(data.imageToDB);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        console.log(snapshot);
      },
      function (error) {
        console.log(error);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log("File available at", downloadURL);
          // Stack di array random & uid jadwal db firebase
          //          const dataBaru = {
          //            title: data.title,
          //            image: downloadURL,
          //          };
          //
          //          FIREBASE.database()
          //            .ref("jadwal")
          //            .push(dataBaru)
          //            .then((response) => {
          //              dispatchSuccess(dispatch, TAMBAH_USER, response ? response : []);
          //            })
          //            .catch((error) => {
          //              dispatchError(dispatch, TAMBAH_USER, error);
          //              alert(error);
          //            });
        });
      }
    );
  };
};

export const getDetailUser = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_USER);

    FIREBASE.database()
      .ref("users/" + id)
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_DETAIL_USER, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_USER, error);
        alert(error);
      });
  };
};

export const updateUser = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_USER);

    //Cek apakah gambar diganti
    if (data.imageToDB) {
      //ambil file gambar lama dari firebase storage
      var desertRef = FIREBASE.storage().refFromURL(data.photoLama);

      // hapus gambar lama dari firebase storage
      desertRef
        .delete()
        .then(function () {
          //upload gambar yang baru
          var uploadTask = FIREBASE.storage()
            .ref("users")
            .child(data.photoToDB.name)
            .put(data.photoToDB);

          uploadTask.on(
            "state_changed",
            function (snapshot) {
              console.log(snapshot);
            },
            function (error) {
              console.log(error);
            },
            function () {
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then(function (downloadURL) {
                  const dataBaru = {
                    fullName: data.fullName,
                    email: data.email,
                    mobileNumber: data.mobileNumber,
                    password: data.password,
                    penunjangPassword: data.penunjangPassword,
                    appo1: data.appo1,
                    appo2: data.appo2,
                    appo3: data.appo3,
                    appo4: data.appo4,
                    image: downloadURL,
                  };

                  FIREBASE.database()
                    .ref("users/" + data.id)
                    .update(dataBaru)
                    .then((response) => {
                      dispatchSuccess(
                        dispatch,
                        UPDATE_USER,
                        response ? response : []
                      );
                    })
                    .catch((error) => {
                      dispatchError(dispatch, UPDATE_USER, error);
                      alert(error);
                    });
                });
            }
          );
        })
        .catch(function (error) {
          dispatchError(dispatch, UPDATE_USER, error);
          alert(error);
        });
    } else {
      const dataBaru = {
        fullName: data.fullName ?? "",
        email: data.email ?? "",
        mobileNumber: data.mobileNumber ?? "",
        password: data.password ?? "",
        penunjangPassword: data.penunjangPassword ?? "",
        appo1: data?.appo1 ?? "",
        appo2: data?.appo2 ?? "",
        appo3: data?.appo3 ?? "",
        appo4: data?.appo4 ?? "",
        photo: data.photo ?? "",
      };

      FIREBASE.database()
        .ref("users/" + data.id)
        .update(dataBaru)
        .then((response) => {
          console.log("res", response);
          dispatchSuccess(dispatch, UPDATE_USER, response ? response : []);
        })
        .catch((error) => {
          console.log("error", error);
          dispatchError(dispatch, UPDATE_USER, error);
          alert(error);
          swal("Failed!", "Terjadi kesalahan", "error");
        });
    }
  };
};

export const deleteUser = (image, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_USER);

    //Hapus gambar dari storage
    var desertRef = FIREBASE.storage().refFromURL(image);

    // Delete the file
    desertRef
      .delete()
      .then(function () {
        //hapus juga data di realtime database
        FIREBASE.database()
          .ref("jadwal/" + id)
          .remove()
          .then(() => {
            dispatchSuccess(
              dispatch,
              DELETE_USER,
              "User Dokter Sukses Dihapus"
            );
          })
          .catch((error) => {
            dispatchError(dispatch, DELETE_USER, error);
            alert(error);
          });
      })
      .catch(function (error) {
        // Uh-oh, an error occurred!
        dispatchError(dispatch, DELETE_USER, error);
        alert(error);
      });
  };
};