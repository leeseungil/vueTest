import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import http from '@/api/http'

// eslint-disable-next-line import/no-cycle
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    isLogin: false,
    isLoginError: false,
  },
  mutations: {
    // state 상태 변경
    loginSuccess(state, payload) {
      state.isLogin = true
      state.isLoginError = false
      state.userInfo = payload
    },
    loginError(state) {
      state.isLogin = false
      state.isLoginError = true
    },
    logOut(state) {
      state.isLogin = false
      state.isLoginError = false
      state.userInfo = null
    },
  },
  actions: {
    // 로그인 시도
    login({ dispatch, commit }, loginObj) {
      // 로그인 파라미터 확인

      console.log('Start Login')
      console.log(loginObj)

      // 로그인 -> 토큰 반환
      http
        .post('api/user/idpwLogin', loginObj) // 파라미터 (body)
        .then(response => {
          console.log(response)
          console.log(response.data.resultData.accessToken)

          // 토큰 및 user 정보 로컬스토리지 저장
          localStorage.setItem('X-Auth-Token', response.data.resultData.accessToken)
          localStorage.setItem('userId', response.data.resultData.loginId)

          // 사용자 권한 조회
          dispatch('getMemberInfo') // : disPathch 사용법 - Actions 내에 함수 호출
        })
        .catch(() => {
          // eslint-disable-next-line no-alert
          alert('아이디와 비밀번호를 확인하세요.')
          commit('loginError')
          // eslint-disable-next-line no-undef
        })
    },
    logOut({ commit }) {
      localStorage.setItem('X-Auth-Token', null)
      localStorage.setItem('userId', null)
      localStorage.setItem('managerStatus', null)
      localStorage.clear()
      commit('logOut')
      router.push({ name: 'pages-login' })
    },
    getMemberInfo({ commit }) {
      // 로컬 스토리지에 저장된 토큰 활용
      const token = localStorage.getItem('X-Auth-Token')
      const header = {
        'X-Auth-Token': token,
      }
      const id = localStorage.getItem('userId')
      const values = {
        userId: 'seungil', // seongki
      }

      console.log('getMemberInfo')
      console.log(token)
      console.log(id)

      if (token === 'null' && token === null) {
        return
      }

      // 토큰 -> 반환된 토큰으로 멤버 정보를 반환
      // 새로 고침 -> 토큰만 가지고 멤버정보 요청
      http
        .post('api/systemAuthUser/SearchSystemAuthUser', values, { headers: header }) // 파라미터 (body)
        .then(response => {
          console.log(response)

          const userInfo = {
            loginId: response.data.resultData[0].userId,
            userName: response.data.resultData[0].userName,
            managerStatus: response.data.resultData[0].managerStatus,
          }

          localStorage.setItem('managerStatus', userInfo.managerStatus)
          console.log(userInfo)
          commit('loginSuccess', userInfo)

          router.push({ name: 'dashboard' }).catch(() => {})
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
  modules: {},
  plugins: [createPersistedState({
  }),
  ],

})
