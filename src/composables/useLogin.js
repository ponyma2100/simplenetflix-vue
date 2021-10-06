import { projectAuth } from '../firebase/config'
import { ref } from 'vue'

const error = ref(null)
const isPending = ref(false)

const login = async (email, password) => {
  error.valur = null
  isPending.value = true

  try {
    const res = await projectAuth.signInWithEmailAndPassword(email, password)
    error.value = null
    isPending.value = false
    return res
  } catch (err) {
    console.log(err.message)
    error.value = err.message
    isPending.value = false

  }
}

const useLogin = () => {
  return { error, isPending, login }
}

export default useLogin