import { ref } from 'vue'

const apiUrl = 'https://api.themoviedb.org/3'
const apiKey = '304a9149a9088e1bb526b00111bc00a0'
// https://api.themoviedb.org/3/movie/157336?api_key={api_key}

const getMovie = (id) => {
  const movieInfo = ref([])
  const movieCast = ref([])
  const movieRecommend = ref([])

  const loadMovie = async () => {

    try {
      const res = await fetch(`${apiUrl}/movie/${id}?api_key=${apiKey}&append_to_response=casts,recommendations`)
      const data = await res.json()
      movieInfo.value = data
      movieCast.value = data.casts.cast.splice(0, 3)
      movieRecommend.value = data.recommendations.results.splice(0, 9)

      return movieInfo, movieCast, movieRecommend

    } catch (err) {
      console.log(err)
    }
  }

  const loadTv = async () => {

    try {
      const res = await fetch(`${apiUrl}/tv/${id}?api_key=${apiKey}&append_to_response=recommendations,aggregate_credits`)
      const data = await res.json()
      movieInfo.value = data
      movieCast.value = data.aggregate_credits.cast.splice(0, 3)
      movieRecommend.value = data.recommendations.results.splice(0, 9)

      return movieInfo, movieCast, movieRecommend

    } catch (err) {
      console.log(err)
    }
  }
  return { loadMovie, loadTv, movieInfo, movieCast, movieRecommend }
}

export default getMovie