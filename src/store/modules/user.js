import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import dynamicRoutes from '@/router/dynamicRoutes'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { info, info: { name, avatar }, routes = [] } = data
        const mergedRoutes = generateRoutes(dynamicRoutes, routes)

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_ROUTES', mergedRoutes)
        resolve(info)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

// 路由生成
function generateRoutes(localRoutes, userRoutes) {
  const routes = []
  for (let iIndex = 0; iIndex < userRoutes.length; iIndex++) {
    const userRoute = userRoutes[iIndex]
    for (let jIndex = 0; jIndex < localRoutes.length; jIndex++) {
      const dynamicRoute = localRoutes[jIndex]
      if (dynamicRoute.meta && userRoute.name === dynamicRoute.meta.name) {
        const route = {
          ...dynamicRoute
        }

        if (userRoute.children) {
          route.children = generateRoutes(dynamicRoute.children, userRoute.children)
        }
        routes.push(route)
        break
      }
    }
  }
  return routes
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

