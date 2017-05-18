export const props = {
  id: {
    type: String,
    required: true
  },
  settings: {
    type: Object,
    'default': function () {
      return {}
    }
  },
  query: {
    type: Object,
    'default': null
  }
}
