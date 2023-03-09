import { User, TwittersMap, UsersMap } from '@/types'
import { getLocalStorage, setLocalStorage } from '@/hooks/storage'
export const getUsersMap = (): UsersMap => {
  return getLocalStorage('usersMap')
}

export const getTwittersMap = (): TwittersMap => {
  return getLocalStorage('twittersMap')
}

// increment
export const getNewId = (): number => {
  const newerId = getLocalStorage('newerId') + 1
  setLocalStorage('newerId', String(newerId))
  return newerId
}

export const getCurrUser = (): User => {
  return getLocalStorage('user')
}

export const setCurrentUser = (user: User | null) => {
  if (user) {
    setLocalStorage('user', user)
  } else {
    // logout
    setLocalStorage('user', '')
  }
}
