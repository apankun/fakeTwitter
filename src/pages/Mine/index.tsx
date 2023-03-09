import React, { useEffect } from 'react'
import { Dispatch, State } from '@/store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { getNewId } from '@/services'
import { Twitter } from '@/types'
import { actions } from '@/store/modules/post'
import List from './components/List'
function Mine() {
  const userState = useSelector((state: State) => state.userState)
  const twiList = useSelector((state: State) => state.twiState.twiList)
  const isLoading = useSelector((state: State) => state.twiState.isLoading)
  const dispatch = useDispatch<Dispatch>()

  const [content, setContent] = useState('')

  const handleChange = (e: Record<string, any>) => {
    setContent(e.target.value)
  }
  const handlePost = () => {
    const t: Twitter = {
      // get newest id
      id: getNewId(),
      author: userState.username,
      content,
      createTime: new Date().getTime()
    }
    dispatch(actions.twiAdd(t))
  }

  useEffect(() => {
    dispatch(actions.twiListGet())
  }, [])

  useEffect(() => {
    // posted twiiter and reset text-area
    if (!isLoading) {
      setContent('')
    }
  }, [isLoading])

  return (
    <div className="flex flex-col flex-grow overflow-y-hidden">
      <div className="m-2 px-4" style={{ flex: 'none' }}>
        <textarea
          placeholder="Enter your twitter..."
          className=" mt-2 bg-white w-full"
          onChange={handleChange}
          value={content}
        />
        <div className="px-4 mt-2">
          <Button
            className="w-full "
            disabled={!content}
            variant="primary"
            onClick={handlePost}
          >
            Post
          </Button>
        </div>
      </div>
      <List twiList={twiList}></List>
    </div>
  )
}

export default Mine
