import FIREBASE from "../config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils";

export const GET_LIST_PASIEN = "GET_LIST_PASIEN";
export const TAMBAH_PASIEN = "TAMBAH_PASIEN";
export const GET_DETAIL_PASIEN = "GET_DETAIL_PASIEN";
export const UPDATE_PASIEN = "UPDATE_PASIEN";
export const DELETE_PASIEN = "DELETE_PASIEN";

export const getListPasien = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_PASIEN);

    FIREBASE.database()
      .ref("cardSolved")
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_PASIEN, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_PASIEN, error);
        alert(error);
      });
  };
};

export const searchListPasien = (keyword) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_PASIEN);

    FIREBASE.database()
      .ref("cardSolved")
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();
        Object.keys(data).map((key) => {
          if (
            !data[key]?.title
              ?.toLowerCase()
              ?.includes(keyword?.toLowerCase())
          ) {
            delete data[key];
          }
        });
        dispatchSuccess(dispatch, GET_LIST_PASIEN, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_PASIEN, error);
        alert(error);
      });
  };
};

export const tambahPasien = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, TAMBAH_PASIEN);

    //upload ke storage firebase
    var uploadTask = FIREBASE.storage()
      .ref("Foto Pasien")
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


export const getDetailPasien = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_PASIEN);

    FIREBASE.database()
      .ref("cardSolved/" + id)
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_DETAIL_PASIEN, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_PASIEN, error);
        alert(error);
      });
  };
};

export const updatePasien = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_PASIEN);

    //Cek apakah gambar diganti
    if (data.imageToDB) {
      //ambil file gambar lama dari firebase storage
      var desertRef = FIREBASE.storage().refFromURL(data.imageLama);

      // hapus gambar lama dari firebase storage
      desertRef
        .delete()
        .then(function () {
          //upload gambar yang baru
          var uploadTask = FIREBASE.storage()
            .ref("cardSolved")
            .child(data.photoToDB.name)
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
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then(function (downloadURL) {
                  const dataBaru = {
                    title: data.title,
                    body: data.body,
                    image: downloadURL,
                  };

                  FIREBASE.database()
                    .ref("cardSolved/" + data.id)
                    .update(dataBaru)
                    .then((response) => {
                      dispatchSuccess(
                        dispatch,
                        UPDATE_PASIEN,
                        response ? response : []
                      );
                    })
                    .catch((error) => {
                      dispatchError(dispatch, UPDATE_PASIEN, error);
                      alert(error);
                    });
                });
            }
          );
        })
        .catch(function (error) {
          dispatchError(dispatch, UPDATE_PASIEN, error);
          alert(error);
        });
    } else {
      const dataBaru = {
        title: data.title,
        body: data.body,
        image: data.image,
      };

      FIREBASE.database()
        .ref("cardSolved/" + data.id)
        .update(dataBaru)
        .then((response) => {
          dispatchSuccess(dispatch, UPDATE_PASIEN, response ? response : []);
        })
        .catch((error) => {
          dispatchError(dispatch, UPDATE_PASIEN, error);
          alert(error);
        });
    }
  };
};

export const deletePasien = (image, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_PASIEN);

    //Hapus gambar dari storage
    var desertRef = FIREBASE.storage().refFromURL(image);

    // Delete the file
    desertRef
      .delete()
      .then(function () {
        //hapus juga data di realtime database
        FIREBASE.database()
          .ref("cardSolved/" + id)
          .remove()
          .then(() => {
            dispatchSuccess(dispatch, DELETE_PASIEN, "Pasien terlayani Sukses Dihapus");
          })
          .catch((error) => {
            dispatchError(dispatch, DELETE_PASIEN, error);
            alert(error);
          });
      })
      .catch(function (error) {
        // Uh-oh, an error occurred!
        dispatchError(dispatch, DELETE_PASIEN, error);
        alert(error);
      });
  };
};