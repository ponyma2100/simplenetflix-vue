import { projectAuth, projectFirestore } from "../firebase/config";
import { ref } from 'vue'

const useCollection = (collection) => {

  const error = ref(null)

  const addDoc = async (doc) => {
    error.value = null

    try {
      const res = await projectFirestore.collection(collection).add(doc)
      // console.log('res.id', res.id)
      return res

    } catch (err) {
      console.log(err.message)
    }

  }
  return { error, addDoc }
}


export default useCollection