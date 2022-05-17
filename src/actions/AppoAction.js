import FIREBASE from "../config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils";

export const GET_LIST_APPO = "GET_LIST_APPO";
export const TAMBAH_APPO = "TAMBAH_APPO";
export const GET_DETAIL_APPO = "GET_DETAIL_APPO";
export const UPDATE_APPO = "UPDATE_APPO";
export const DELETE_APPO = "DELETE_APPO";

export const getListAppo = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_APPO);

    FIREBASE.database()
      .ref("appoitment")
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_APPO, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_APPO, error);
        alert(error);
      });
  };
};

export const tambahAppo = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, TAMBAH_APPO);

    //upload ke storage firebase
    var uploadTask = FIREBASE.storage()
      .ref("Foto Appo")
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

export const getDetailAppo = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_APPO);

    FIREBASE.database()
      .ref("appoitment/" + id)
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_DETAIL_APPO, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_APPO, error);
        alert(error);
      });
  };
};

export const searchListAppo = (keyword) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_APPO);

    FIREBASE.database()
      .ref("appoitment")
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val();
        Object.keys(data).map((key) => {
          if (
            !data[key]?.dokter
              ?.toLowerCase()
              ?.includes(keyword?.toLowerCase())
          ) {
            delete data[key];
          }
        });
        dispatchSuccess(dispatch, GET_LIST_APPO, data);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_APPO, error);
        alert(error);
      });
  };
};

export const updateAppo = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_APPO);

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
            .ref("appoitment")
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
                    namaAkun: data.namaAkun,
                    nama: data.nama,
                    noWa: data.noWa,
                    tanggalLahir: data.tanggalLahir,
                    penjamin: data.penjamin,
                    klinik: data.klinik,
                    dokter: data.dokter,
                    tanggalKehadiran: data.tanggalKehadiran,
                    image: downloadURL,
                  };

                  FIREBASE.database()
                    .ref("appoitment/" + data.id)
                    .update(dataBaru)
                    .then((response) => {
                      dispatchSuccess(
                        dispatch,
                        UPDATE_APPO,
                        response ? response : []
                      );
                    })
                    .catch((error) => {
                      dispatchError(dispatch, UPDATE_APPO, error);
                      alert(error);
                    });
                });
            }
          );
        })
        .catch(function (error) {
          dispatchError(dispatch, UPDATE_APPO, error);
          alert(error);
        });
    } else {
      const dataBaru = {
        namaAkun: data.namaAkun,
        nama: data.nama,
        noWa: data.noWa,
        tanggalLahir: data.tanggalLahir,
        penjamin: data.penjamin,
        klinik: data.klinik,
        dokter: data.dokter,
        tanggalKehadiran: data.tanggalKehadiran,
        image: data.image,
      };

      FIREBASE.database()
        .ref("appoitment/" + data.id)
        .update(dataBaru)
        .then((response) => {
          dispatchSuccess(dispatch, UPDATE_APPO, response ? response : []);
        })
        .catch((error) => {
          dispatchError(dispatch, UPDATE_APPO, error);
          alert(error);
        });
    }
  };
};

export const deleteAppo = (id, image) => {
  return async (dispatch) => {
    dispatchLoading(dispatch, DELETE_APPO);

    // Delete the file
    try {
      if (image) {
        var desertRef = FIREBASE.storage().refFromURL(image ?? "");
        await desertRef.delete();
      }

      await FIREBASE.database()
        .ref("appoitment/" + id)
        .remove()
        .then(() => {
          dispatchSuccess(
            dispatch,
            DELETE_APPO,
            "List Appoitment Sukses Dihapus"
          );
        })
        .catch((error) => {
          dispatchError(dispatch, DELETE_APPO, error);
          alert(error);
        });
    } catch (error) {
      // Uh-oh, an error occurred!
      dispatchError(dispatch, DELETE_APPO, error);
      alert(error);
    }
  };
};

