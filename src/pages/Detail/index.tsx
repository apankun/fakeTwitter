import { Button, Card, Stack } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, State } from '@/store'
import { useEffect, useState } from 'react'
import { actions } from '@/store/modules/post'
import { Twitter } from '@/types'
import { useParams, useSearchParams } from 'react-router-dom'
import Header from '@/components/Header'
function Detail() {
  const dispatch = useDispatch<Dispatch>()
  const detail = useSelector((state: State) => state.twiState.currTwi)
  const [isEdit, setIsEdit] = useState(false)
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [content, setContent] = useState(detail.content || '')
  const handleTextInput = (e: any) => {
    setContent(e.target.value)
  }
  useEffect(() => {
    if (id) {
      dispatch(actions.twiGet(parseInt(id)))
    }
    if (searchParams.get('action') === 'edit') {
      // to fit edit mode
      setIsEdit(true)
    } else {
      setIsEdit(false)
    }
  }, [searchParams])

  useEffect(() => {
    // to fit the newest content
    setContent(detail.content)
  }, [detail])

  const handleSave = async () => {
    const t: Twitter = {
      ...detail,
      content
    }
    await dispatch(actions.twiEdit(t))
    setSearchParams({
      // remove all
    })
  }

  return (
    <div className="h-screen flex flex-col" style={{ overflow: 'hidden' }}>
      <Header />
      <Card className="mx-2 mt-8">
        <Card.Body>
          <Card.Title>ID:{detail.id}</Card.Title>
          {isEdit ? (
            <Stack direction="vertical" style={{ flex: 'none' }}>
              <textarea
                value={content}
                className="mt-2 bg-white"
                onChange={handleTextInput}
              />
              <hr />
              <Button
                disabled={!content}
                variant="primary"
                onClick={handleSave}
              >
                Save
              </Button>
            </Stack>
          ) : (
            <Card.Text>{content}</Card.Text>
          )}
        </Card.Body>
        <Card.Footer className="text-xs flex justify-bwtween w-full items-center">
          Author:{detail.author}{' '}
          <span className="ml-4">
            {new Date(detail.createTime).toUTCString()}
          </span>
        </Card.Footer>
      </Card>
    </div>
  )
}

export default Detail
