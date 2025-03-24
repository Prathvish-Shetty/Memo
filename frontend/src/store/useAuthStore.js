import { create } from "zustand"

const useAuthStore = create((set) => ({
  accessToken: localStorage.getItem('accessToken') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  // login method
  login: (accessToken, user) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('user', JSON.stringify(user))
    set({ accessToken, user })
  },
  // logout method
  logout: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    set({
      accessToken: null,
      user: null,
    })
  },
  // Refresh Token method
  refreshTokens: (accessToken) => {
    localStorage.setItem('accessToken', accessToken)
    set({
      accessToken,
    })
  },
}))
export default useAuthStore