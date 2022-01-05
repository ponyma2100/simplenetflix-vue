import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const error = ref(null)

const useDocument = (collection) => {
  const movieId = ref(null)
  let collectionRef = projectFirestore.collection(collection)

  const getMovieId = async (query) => {

    try {
      if (query) {
        let docRef = collectionRef.where(...query)
        const res = await docRef.get()
        movieId.value = res.docs[0].id
      }

      return movieId
    } catch (err) {
      console.log(err.message)
    }
  }

  const deleteDoc = (id) => {
    let docRef = collectionRef.doc(id)
    error.value = null

    try {
      const res = docRef.delete()
      return res
    } catch (err) {
      console.log(err.message)
      error.value = 'could not delete the document'
    }
  }

  const updateDoc = async (id, updates) => {
    let docRef = collectionRef.doc(id)
    error.value = null

    try {
      const res = await docRef.update(updates)
      return res
    } catch (err) {
      console.log(err.message)
      error.value = 'could not update the document'
    }
  }

  return { getMovieId, deleteDoc, updateDoc, movieId }
}


export default useDocument
