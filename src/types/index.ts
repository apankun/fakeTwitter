export type User = {
  username: string
  password: string
}

export type Twitter = {
  id: number
  content: string
  author: string
  createTime: number
}

export type TwittersMap = {
  [props: string]: Twitter
}

export type UsersMap = {
  [props: string]: User
}
