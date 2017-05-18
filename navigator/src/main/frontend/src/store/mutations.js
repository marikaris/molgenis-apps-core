export const SET_PACKAGE = 'SET_PACKAGE'
export const SET_TOKEN = 'SET_TOKEN'

export default {
  [SET_PACKAGE] (state, package_) {
    state.package_ = package_
  },
  [SET_TOKEN] (state, token) {
    state.token = token
  }
}
