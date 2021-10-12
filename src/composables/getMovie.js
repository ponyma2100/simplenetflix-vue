import { ref } from 'vue'

const apiUrl = 'https://api.themoviedb.org/3'
const apiKey = '304a9149a9088e1bb526b00111bc00a0'
// https://api.themoviedb.org/3/movie/157336?api_key={api_key}

const getMovie = (id) => {
  const movie = ref([])

  const loadMovie = async () => {

    try {
      const res = await fetch(`${apiUrl}/movie/${id}?api_key=${apiKey}`)
      const data = await res.json()
      movie.value = data
      console.log("🚀 ~ file: getMovie.js ~ line 17 ~ loadMovie ~ movie.value", movie.value)
      return movie

    } catch (err) {
      console.log(err)
    }
  }
  return { loadMovie, movie }
}

export default getMovie