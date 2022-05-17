import FIREBASE from "../config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils";

export const GET_LIST_JADWAL = "GET_LIST_JADWAL";
export const TAMBAH_JADWAL = "TAMBAH_JADWAL";
export const GET_DETAIL_JADWAL = "GET_DETAIL_JADWAL";
export const UPDATE_JADWAL = "UPDATE_JADWAL";
export const DELETE_JADWAL = "DELETE_JADWAL";

export const getListJadwal = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_JADWAL);

    FIREBASE.database()
      .ref("jadwal")
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_JADWAL, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_JADWAL, error);
        alert(error);
      });
  };
};

export const searchListJadwal = (keyword) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_JADWAL);

    FIREBASE.database()
      .ref("jadwal")
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
        dispatchSuccess(dispatch, GET_LIST_JADWAL, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_JADWAL, error);
        alert(error);
      });
  };
};

export const getDetailJadwal = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_JADWAL);

    FIREBASE.database()
      .ref("jadwal/" + id)
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_DETAIL_JADWAL, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_JADWAL, error);
        alert(error);
      });
  };
};

export const tambahJadwal = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, TAMBAH_JADWAL);

    //upload ke storage firebase
    var uploadTask = FIREBASE.storage()
      .ref("Foto Dokter")
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
          //              dispatchSuccess(dispatch, TAMBAH_JADWAL, response ? response : []);
          //            })
          //            .catch((error) => {
          //              dispatchError(dispatch, TAMBAH_JADWAL, error);
          //              alert(error);
          //            });
        });
      }
    );
  };
};

export const updateJadwal = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_JADWAL);

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
            .ref("jadwal")
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
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then(function (downloadURL) {
                  const dataBaru = {
                    title: data.title,
                    senin: data.senin,
                    selasa: data.selasa,
                    rabu: data.rabu,
                    kamis: data.kamis,
                    jumat: data.jumat,
                    sabtu: data.sabtu,
                    image: downloadURL,
                  };

                  FIREBASE.database()
                    .ref("jadwal/" + data.id)
                    .update(dataBaru)
                    .then((response) => {
                      dispatchSuccess(
                        dispatch,
                        UPDATE_JADWAL,
                        response ? response : []
                      );
                    })
                    .catch((error) => {
                      dispatchError(dispatch, UPDATE_JADWAL, error);
                      alert(error);
                    });
                });
            }
          );
        })
        .catch(function (error) {
          dispatchError(dispatch, UPDATE_JADWAL, error);
          alert(error);
        });
    } else {
      const dataBaru = {
        title: data.title,
        senin: data.senin,
        selasa: data.selasa,
        rabu: data.rabu,
        kamis: data.kamis,
        jumat: data.jumat,
        sabtu: data.sabtu,
        image: data.image,
      };

      FIREBASE.database()
        .ref("jadwal/" + data.id)
        .update(dataBaru)
        .then((response) => {
          dispatchSuccess(dispatch, UPDATE_JADWAL, response ? response : []);
        })
        .catch((error) => {
          dispatchError(dispatch, UPDATE_JADWAL, error);
          alert(error);
        });
    }
  };
};

export const deleteJadwal = (image, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_JADWAL);

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
            dispatchSuccess(dispatch, DELETE_JADWAL, "Jadwal Dokter Sukses Dihapus");
          })
          .catch((error) => {
            dispatchError(dispatch, DELETE_JADWAL, error);
            alert(error);
          });
      })
      .catch(function (error) {
        // Uh-oh, an error occurred!
        dispatchError(dispatch, DELETE_JADWAL, error);
        alert(error);
      });
  };
};

