import {useToast} from "vue-toast-notification";
const toast = useToast()

export default {
  actions: {
    // eslint-disable-next-line no-unused-vars
    toastSuccess({state, commit, dispatch}, message) {
      toast.success(message)
    },
    // eslint-disable-next-line no-unused-vars
    toastInfo({state, commit, dispatch}, message) {
      toast.info(message)
    }
  },
}
