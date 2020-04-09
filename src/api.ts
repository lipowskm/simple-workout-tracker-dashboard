import axios from 'axios'

function authHeaders(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

export const api = {
  logInGetToken(username: string, password: string) {
    const params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)

    return axios.post('http://127.0.0.1:8000/api/login/access-token', params)
  },
  getUsers(token: string) {
    return axios.get('http://127.0.0.1:8000/api/users/', authHeaders(token))
  }
}
