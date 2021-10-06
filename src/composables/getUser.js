import { projectAuth } from "../firebase/config";
import { ref } from 'vue'

const user = ref(projectAuth.currentUser)

projectAuth.onAuthStateChanged(currentUser => {
  console.log("🚀 ~ file: getUser.js ~ line 7 ~ currentUser", currentUser)
  user.value = currentUser
})

const getUser = () => {
  return { user }
}

export default getUser