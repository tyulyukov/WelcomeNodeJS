export default {
  // namespace: true,
  state: {
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    isAgree: false,
    loginError: null,
    emailError: null,
    passwordError: null,
  },
  getters: {
    username: (state) => state.username,
    email: (state) => state.email,
    password: (state) => state.password,
    repeatPassword: (state) => state.repeatPassword,
    isAgree: (state) => state.isAgree,
    loginError: (state) => state.loginError,
    emailError: (state) => state.emailError,
    passwordError: (state) => state.passwordError
  },
  mutations: {
    username: (state, data) => { state.username = data },
    email: (state, data) => { state.email = data },
    password: (state, data) => { state.password = data },
    repeatPassword: (state, data) => { state.repeatPassword = data },
    isAgree: (state, data) => { state.isAgree = data },
    loginError: (state, data) => { state.loginError = data },
    emailError: (state, data) => { state.emailError = data },
    passwordError: (state, data) => { state.passwordError = data }
  },
  actions: {
    username ({ commit, dispatch }, data) {
      if (!data)
        data = ''

      commit('username', data)
      dispatch('validateForm')
    },
    email ({ commit, dispatch }, data) {
      if (!data)
        data = ''

      commit('email', data)
      dispatch('validateForm')
    },
    password ({ commit, dispatch }, data) {
      if (!data)
        data = ''

      commit('password', data)
      dispatch('validateForm')
    },
    repeatPassword ({ commit, dispatch }, data) {
      if (!data)
        data = ''

      commit('repeatPassword', data)
      dispatch('validateForm')
    },
    isAgree ({ commit, dispatch }, data) {
      commit('isAgree', data)
      dispatch('validateForm')
    },
    // eslint-disable-next-line no-unused-vars
    validateForm ({state, commit, dispatch}) {
      commit('loginError', null)
      commit('emailError', null)
      commit('passwordError', null)

      let emailValidRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      // let passwordValidRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
      let validated = true

      if (!state.email.toLowerCase().match(emailValidRegex)) {
        commit('emailError', 'Invalid email')
        validated = false
      }

      if (state.password.length < 8) {
        commit('passwordError', 'Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase')
        validated = false
      }

      if (!validated)
        return;

      if (state.password != state.repeatPassword) {
        commit('passwordError', 'Passwords don`t match')
        return;
      }
    },
    // eslint-disable-next-line no-unused-vars
    apiRegister ({ state, commit, dispatch }, data = null) {
      const user = {
        username: state.username,
        email: state.email,
        password: state.password
      }
      fetch('http://localhost:3000/api/register', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(user) // body data type must match "Content-Type" header
      })
          .then(res => res.json())
          .then(json => {
            console.log(json)
          })
          .catch(err => {
            dispatch('logError', err)
          })
    },
    // eslint-disable-next-line no-unused-vars
    apiLogin ({ state, commit, dispatch }) {
      const user = {
        email: state.email,
        password: state.password
      }
      fetch('http://localhost:3000/api/auth', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(user) // body data type must match "Content-Type" header
      })
          .then(res => {
                if (res.status === 200) {
                  return res.json()
                }
                else {
                  dispatch('toastInfo', 'JWT Not Ready')
                }
              }
          )
          .then(json => {
            console.log(json)

            dispatch('toastSuccess', ' JWT Ready ')
            // TODO  уйти на другой маршрут, сообщить что все хорошо
          })
          .catch(err => {
            dispatch('logError', err)
          })
    }
  }
}