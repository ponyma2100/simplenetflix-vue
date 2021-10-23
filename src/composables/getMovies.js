import { ref } from 'vue'


const apiUrl = 'https://api.themoviedb.org/3'
const apiKey = '304a9149a9088e1bb526b00111bc00a0'


const getMovies = () => {
  const trend = ref([])
  const origin = ref([])
  const action = ref([])
  const comedy = ref([])
  const top = ref([])
  const romance = ref([])

  const getTrend = async () => {
    try {
      const res = await fetch(`${apiUrl}/trending/movie/week?api_key=${apiKey}`)
      const data = await res.json()
      trend.value = data.results
      trend.value.map(movie => {
        movie.isLike = false
        movie.isFav = false
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  const getNetflixOrigin = async () => {
    try {
      const res = await fetch(`${apiUrl}/discover/tv?api_key=${apiKey}&with_network=213`)
      const data = await res.json()
      origin.value = data.results
      origin.value.map(movie => {
        movie.isLike = false
        movie.isFav = false
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  const getTop = async () => {
    try {
      const res = await fetch(`${apiUrl}/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`)
      const data = await res.json()
      top.value = data.results.slice(10)
      top.value.map(movie => {
        movie.isLike = false
        movie.isFav = false
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  const getAction = async () => {
    try {
      const res = await fetch(`${apiUrl}/discover/movie?api_key=${apiKey}&with_genres=28`)
      const data = await res.json()
      action.value = data.results
      action.value.map(movie => {
        movie.isLike = false
        movie.isFav = false
      })

    }
    catch (err) {
      console.log(err)
    }
  }
  const getComedy = async () => {
    try {
      const res = await fetch(`${apiUrl}/discover/movie?api_key=${apiKey}&with_genres=35`)
      const data = await res.json()
      comedy.value = data.results
      comedy.value.map(movie => {
        movie.isLike = false
        movie.isFav = false
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  const getRomance = async () => {
    try {
      const res = await fetch(`${apiUrl}/discover/movie?api_key=${apiKey}&with_genres=10749`)
      const data = await res.json()
      romance.value = data.results
      romance.value.map(movie => {
        movie.isLike = false
        movie.isFav = false
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  return { getTrend, trend, getNetflixOrigin, origin, getAction, action, getComedy, comedy, getTop, top, getRomance, romance }

}

export default getMovies