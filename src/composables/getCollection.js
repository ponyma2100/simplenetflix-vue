import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getCollection = (collection, query) => {
  const error = ref(null)
  const documents = ref(null)

  let collectionRef = projectFirestore.collection(collection)
  if (query) {
    console.log("🚀 ~ file: getCollection.js ~ line 11 ~ getCollection ~ query", ...query)
    collectionRef = collectionRef.where(...query)
  }

  const unsub = collectionRef.onSnapshot(snap => {
    let results = []

    snap.docs.forEach(doc => {
      results.push({
        ...doc.data(),
        id: doc.id
      })
    })

    documents.value = results
    error.value = null
  }, (err) => {
    console.log(err.message)
    documents.value = null
    error.value = err.message
  })

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub())
  })

  return { documents, error }

}
export default getCollection