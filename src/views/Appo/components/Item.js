import React from 'react'
import { Route } from 'react-router-dom'
import { Button, ButtonGroup } from 'reactstrap'
import { useDispatch } from 'react-redux'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { activateAppo } from 'actions/AppoAction'

export default function Item({
  itemKey,
  index,
  getListAppoResult,
  removeData,
}) {
  const dispatch = useDispatch()

  const [active, setActive] = React.useState(
    getListAppoResult[itemKey]?.active ? true : false
  )

  const handleActivate = () => {
    const data = { ...getListAppoResult[itemKey] }
    data.active = active ? false : true
    data.id = itemKey

    dispatch(activateAppo(data))
    setActive((old) => !old)
  }

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <Zoom>
          <img
            src={getListAppoResult[itemKey]?.gambar}
            width='180'
            alt={getListAppoResult[itemKey]?.namaAkun}
          />
        </Zoom>
      </td>
      <td>{getListAppoResult[itemKey]?.namaAkun}</td>
      <td>{getListAppoResult[itemKey]?.nama}</td>
      <td>{getListAppoResult[itemKey]?.noWa}</td>
      <td>{getListAppoResult[itemKey]?.tanggalLahir}</td>
      <td>{getListAppoResult[itemKey]?.penjamin}</td>
      <td>{getListAppoResult[itemKey]?.klinik}</td>
      <td>{getListAppoResult[itemKey]?.dokter}</td>
      <td>{getListAppoResult[itemKey]?.tanggalKehadiran}</td>
      <td>{getListAppoResult[itemKey]?.jamKehadiran}</td>
      <td>
        <ButtonGroup>
          <Route
            render={({ history }) => {
              return (
                <Button
                  color='warning'
                  onClick={() => {
                    history.push(
                      '/admin/user/edit/' + getListAppoResult[itemKey]?.uid
                    )
                  }}
                >
                  Edit
                </Button>
              )
            }}
          />
          <Button
            color='danger'
            onClick={() =>
              removeData(itemKey, getListAppoResult[itemKey]?.image)
            }
          >
            Hapus
          </Button>
          <Button
            color={active ? 'success' : 'secondary'}
            onClick={handleActivate}
          >
            {active ? 'Aktif' : 'Non-Aktif'}
          </Button>
        </ButtonGroup>
      </td>
      <td></td>
    </tr>
  )
}