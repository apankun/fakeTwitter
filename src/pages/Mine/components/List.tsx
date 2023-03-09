import { Container, Col, Row, Button, Modal } from 'react-bootstrap'
import { Twitter } from '@/types'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Dispatch, State } from '@/store'
import { useEffect, useState } from 'react'
import { actions } from '@/store/modules/post'
import { useDispatch } from 'react-redux'
interface IList {
  twiList: Twitter[]
}

function List({ twiList }: IList) {
  const dispatch = useDispatch<Dispatch>()
  const userState = useSelector((state: State) => state.userState)
  const twiState = useSelector((state: State) => state.twiState)
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [currId, setCurrId] = useState<number>(-1)
  const goDetail = (e: any, id: number) => {
    navigate(`/tweet/${id}`)
  }
  const edit = (e: any, id: number) => {
    e?.stopPropagation()
    navigate(`/tweet/${id}?action=edit`)
  }
  const remove = (e: any, id: number) => {
    e?.stopPropagation()
    setShow(true)
    setCurrId(id)
  }
  const submitRemove = () => {
    dispatch(actions.twiDelete(currId))
  }
  useEffect(() => {
    setShow(false)
  }, [twiState])

  return (
    <Container className="overflow-y-scroll">
      <Row className="px-3 flex justify-between">
        {twiList.map((item) => (
          <Col
            md={5}
            key={item.id}
            onClick={(e) => goDetail(e, item.id)}
            className=" my-2 border-black border rounded p-2 flex-grow"
          >
            <div className="text-xs mb-2">Author:{item.author}</div>
            <div className="mb-2">{item.content}</div>

            <div className="text-xs">
              Time:{new Date(item.createTime).toUTCString()}
            </div>
            {item.author === userState.username && (
              <div className="border-t mt-2 pt-2 flex justify-end">
                <>
                  <Button
                    size="sm"
                    variant="light"
                    onClick={(e) => edit(e, item.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    className="ml-1"
                    variant="light"
                    onClick={(e) => remove(e, item.id)}
                  >
                    Delete
                  </Button>
                </>
              </div>
            )}
          </Col>
        ))}
      </Row>
      {
        <Modal show={show} centered>
          <Modal.Body>
            <p>Confirm to delete tweet #{currId}?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={submitRemove}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </Container>
  )
}
export default List
