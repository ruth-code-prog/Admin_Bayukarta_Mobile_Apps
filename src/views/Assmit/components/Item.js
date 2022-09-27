import React from 'react'
import { Route } from 'react-router-dom'
import { Button, ButtonGroup } from 'reactstrap'
import { useDispatch } from 'react-redux'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { activateAssMit } from 'actions/AssmitAction'

export default function Item({
  itemKey,
  index,
  getListAssmitResult,
  removeData,
}) {
  const dispatch = useDispatch()

  const [active, setActive] = React.useState(
    getListAssmitResult[itemKey]?.active ? true : false
  )

  const handleActivate = () => {
    const data = { ...getListAssmitResult[itemKey] }
    data.active = active ? false : true
    data.id = itemKey

    dispatch(activateAssMit(data))
    setActive((old) => !old)
  }

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <Zoom>
          <img
            src={getListAssmitResult[itemKey]?.photo}
            width='180'
            alt={getListAssmitResult[itemKey]?.namaAkun}
          />
        </Zoom>
      </td>
      <td>{getListAssmitResult[itemKey]?.namaAkun}</td>
      <td>{getListAssmitResult[itemKey]?.nama}</td>
      <td>{getListAssmitResult[itemKey]?.noWa}</td>
      <td>{getListAssmitResult[itemKey]?.tanggalLahir}</td>
      <td>{getListAssmitResult[itemKey]?.penjamin}</td>
      <td>{getListAssmitResult[itemKey]?.klinik}</td>
      <td>{getListAssmitResult[itemKey]?.dokter}</td>
      <td>{getListAssmitResult[itemKey]?.tanggalKehadiran}</td>
      <td>{getListAssmitResult[itemKey]?.jamKehadiran}</td>
      <td>
        <ButtonGroup>
          <Route
            render={({ history }) => {
              return (
                <Button
                  color='warning'
                  onClick={() => {
                    history.push(
                      '/admin/user/edit/' + getListAssmitResult[itemKey]?.uid
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
              removeData(itemKey, getListAssmitResult[itemKey]?.image)
            }
          >
            Hapus
          </Button>
          <Button
            color={active ? 'success' : 'secondary'}
            onClick={handleActivate}
          >
            {active ? 'HaveQue' : 'Non-Que'}
          </Button>
        </ButtonGroup>
      </td>
      <td></td>
    </tr>
  )
}