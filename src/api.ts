import axios from 'axios'

function authHeaders(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

const apiUrl = process.env.VUE_APP_API_URL

export const api = {
  async logInGetToken(username: string, password: string) {
    const params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)

    return axios.post(`${apiUrl}/api/login/access-token`, params)
  },
  async registerAccount(username: string, password: string, email: string, firstName: string, lastName: string) {
    const params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)
    params.append('email', email)
    params.append('first_name', firstName)
    params.append('last_name', lastName)

    return axios.post(`${apiUrl}/api/register`, params)
  },
  async getMe(token: string) {
    return axios.get(`${apiUrl}/api/users/me`, authHeaders(token))
  },
  async getUsers(token: string) {
    return axios.get(`${apiUrl}/api/users/`, authHeaders(token))
  }
}
