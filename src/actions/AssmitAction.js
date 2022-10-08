import FIREBASE from '../config/FIREBASE'
import { dispatchError, dispatchLoading, dispatchSuccess } from '../utils'

export const GET_LIST_ASSMIT = 'GET_LIST_ASSMIT'
export const TAMBAH_ASSMIT = 'TAMBAH_ASSMIT'
export const GET_DETAIL_ASSMIT = 'GET_DETAIL_ASSMIT'
export const UPDATE_ASSMIT = 'UPDATE_ASSMIT'
export const DELETE_ASSMIT = 'DELETE_ASSMIT'
export const UPDATE_UNREAD_ASSMIT = 'UPDATE_UNREAD_ASSMIT'

export const getListAssmit = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_ASSMIT)

    FIREBASE.database()
      .ref('assMit')
      .once('value', (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val()

        dispatchSuccess(dispatch, GET_LIST_ASSMIT, data)

        const updatedData = []

        Object.keys(data).map((key) => updatedData.push(data[key]))

        const unread = updatedData.filter(
          (item) => item.isRead === false
        ).length

        dispatch({
          type: UPDATE_UNREAD_ASSMIT,
          payload: unread,
        })
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_ASSMIT, error)
        alert(error)
      })
  }
}

export const tambahAssmit = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, TAMBAH_ASSMIT)

    //upload ke storage firebase
    var uploadTask = FIREBASE.storage()
      .ref('Foto Assmit')
      .child(data.imageToDB.name)
      .put(data.imageToDB)

    uploadTask.on(
      'state_changed',
      function (snapshot) {
        console.log(snapshot)
      },
      function (error) {
        console.log(error)
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('File available at', downloadURL)
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
        })
      }
    )
  }
}

export const getDetailAssmit = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_ASSMIT)

    FIREBASE.database()
      .ref('assMit/' + id)
      .once('value', (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val()

        dispatchSuccess(dispatch, GET_DETAIL_ASSMIT, data)
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_ASSMIT, error)
        alert(error)
      })
  }
}

export const searchListAssmit = (keyword) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_ASSMIT)

    FIREBASE.database()
      .ref('assMit')
      .once('value', (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val()
        Object.keys(data).map((key) => {
          if (
            !data[key]?.dokter?.toLowerCase()?.includes(keyword?.toLowerCase())
          ) {
            delete data[key]
          }
        })
        dispatchSuccess(dispatch, GET_LIST_ASSMIT, data)
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_ASSMIT, error)
        alert(error)
      })
  }
}

export const updateAssmit = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, UPDATE_ASSMIT)

    //Cek apakah gambar diganti
    if (data.imageToDB) {
      //ambil file gambar lama dari firebase storage
      var desertRef = FIREBASE.storage().refFromURL(data.imageLama)

      // hapus gambar lama dari firebase storage
      desertRef
        .delete()
        .then(function () {
          //upload gambar yang baru
          var uploadTask = FIREBASE.storage()
            .ref('assMit')
            .child(data.photoToDB.name)
            .put(data.imageToDB)

          uploadTask.on(
            'state_changed',
            function (snapshot) {
              console.log(snapshot)
            },
            function (error) {
              console.log(error)
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
                    noAss: data.noAss,
                    bagian: data.bagian,
                    klinik: data.klinik,
                    dokter: data.dokter,
                    tanggalKehadiran: data.tanggalKehadiran,
                    jamKehadiran: data.jamKehadiran,
                    image: downloadURL,
                  }

                  FIREBASE.database()
                    .ref('assMit/' + data.id)
                    .update(dataBaru)
                    .then((response) => {
                      dispatchSuccess(
                        dispatch,
                        UPDATE_ASSMIT,
                        response ? response : []
                      )
                    })
                    .catch((error) => {
                      dispatchError(dispatch, UPDATE_ASSMIT, error)
                      alert(error)
                    })
                })
            }
          )
        })
        .catch(function (error) {
          dispatchError(dispatch, UPDATE_ASSMIT, error)
          alert(error)
        })
    } else {
      const dataBaru = {
        namaAkun: data.namaAkun,
        nama: data.nama,
        noWa: data.noWa,
        tanggalLahir: data.tanggalLahir,
        penjamin: data.penjamin,
        noAss: data.noAss,
        bagian: data.bagian,
        klinik: data.klinik,
        dokter: data.dokter,
        tanggalKehadiran: data.tanggalKehadiran,
        jamKehadiran: data.jamKehadiran,
        image: data.image,
      }

      FIREBASE.database()
        .ref('assMit/' + data.id)
        .update(dataBaru)
        .then((response) => {
          dispatchSuccess(dispatch, UPDATE_ASSMIT, response ? response : [])
        })
        .catch((error) => {
          dispatchError(dispatch, UPDATE_ASSMIT, error)
          alert(error)
        })
    }
  }
}

export const deleteAssmit = (id, image) => {
  return async (dispatch) => {
    dispatchLoading(dispatch, DELETE_ASSMIT)

    // Delete the file
    try {
      if (image) {
        var desertRef = FIREBASE.storage().refFromURL(image ?? '')
        await desertRef.delete()
      }

      await FIREBASE.database()
        .ref('assMit/' + id)
        .remove()
        .then(() => {
          dispatchSuccess(
            dispatch,
            DELETE_ASSMIT,
            'List Assmititment Sukses Dihapus'
          )
        })
        .catch((error) => {
          dispatchError(dispatch, DELETE_ASSMIT, error)
          alert(error)
        })
    } catch (error) {
      // Uh-oh, an error occurred!
      dispatchError(dispatch, DELETE_ASSMIT, error)
      alert(error)
    }
  }
}

export const activateAssMit = (data) => (dispatch) => {
  FIREBASE.database()
    .ref('assMit/' + data.id)
    .update(data)
    .then((response) => {
      console.log('berhasil update status mitra/ass')
    })
    .catch((error) => {
      console.log('gagal update status mitra/ass')
      alert(error)
    })
}