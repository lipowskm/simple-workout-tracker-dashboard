import axios from 'axios'

function authHeaders (token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

export const api = {
  async logInGetToken (username: string, password: string) {
    const params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)

    return axios.post('localhost:8000/api/login/access-token', params)
  },
  async getUsers (token: string) {
    return axios.get('localhost:8000/api/users/', authHeaders(token)).then(response => console.log(response))
  }
}
