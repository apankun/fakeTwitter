import { getUsersMap, getTwittersMap } from '@/services'
import { Twitter, User, TwittersMap } from '@/types'
import { setLocalStorage } from '@/hooks/storage'
type ResponseData<T> = T | undefined | null

class Response<ResponseData> {
  code: number
  msg: string
  data: ResponseData

  constructor(code: number, msg: string, data: ResponseData) {
    this.code = code
    this.msg = msg
    this.data = data
  }
  mock() {
    // mock async request
    return Promise.resolve(this)
  }
}
type Data<T> = Response<ResponseData<T>>

/**
 * login func
 */
export async function login(user: User): Promise<Data<User>> {
  const usersMap = getUsersMap()
  if (user?.username) {
    if (usersMap?.[user.username]) {
      const item = usersMap[user.username]
      if (item.password === user.password) {
        return new Response(200, `${user.username} login success`, user).mock()
      } else {
        return new Response(400, `wrong password !!`, user).mock()
      }
    }
    return new Response(400, `${user.username} has not registed`, user).mock()
  }
  return new Response(400, `login error`, user).mock()
}
/**
 * register func
 */
export async function register(user: User): Promise<Data<User>> {
  const usersMap = getUsersMap()
  if (user?.username) {
    if (usersMap[user.username]) {
      return new Response(
        400,
        `${user.username} has already registed`,
        null
      ).mock()
    } else {
      usersMap[user.username] = user
      setLocalStorage('usersMap', usersMap)
      return new Response(200, `success`, user).mock()
    }
  }
  return new Response(400, `register error`, user).mock()
}

/**
 *
 * get all twitters
 */
export async function getTwittersList(): Promise<Data<TwittersMap>> {
  try {
    return new Response(200, `success`, getTwittersMap()).mock()
  } catch (error) {
    return new Response(400, `failed: ${error}`, {}).mock()
  }
}

/**
 * add one twi
 */
export async function addTwitter(post: Twitter): Promise<Data<Twitter>> {
  try {
    const list = getTwittersMap()
    list[post.id] = post
    setLocalStorage('twittersMap', list)
    return new Response(200, `success`, null).mock()
  } catch (error) {
    return new Response(400, `failed: ${error}`, post).mock()
  }
}

/**
 * edit twi detail
 */
export async function editTwitter(post: Twitter): Promise<Data<Twitter>> {
  try {
    const list = getTwittersMap()
    list[post.id] = post
    setLocalStorage('twittersMap', list)
    return new Response(200, `success`, null).mock()
  } catch (error) {
    return new Response(400, `failed: ${error}`, post).mock()
  }
}
/**
 * delete twitter
 */
export async function deleteTwitter(id: number): Promise<Data<string>> {
  try {
    const list = getTwittersMap()
    // remove the kv
    delete list[id]
    setLocalStorage('twittersMap', list)
    return new Response(200, `success`, 'ok').mock()
  } catch (error) {
    return new Response(400, `failed: ${error}`, 'ok').mock()
  }
}

/** get twitter detail by id */
export async function getTwitterDetail(id: number): Promise<Data<Twitter>> {
  try {
    const list = getTwittersMap()
    if (list?.[id]) {
      return new Response(200, `success`, list[id] as Twitter).mock()
    }
    return new Response(400, `twitter[${id}] get failed`, null).mock()
  } catch (error) {
    return new Response(400, `failed: ${error}`, null).mock()
  }
}
