import { ref } from 'vue'


const apiUrl = 'https://api.themoviedb.org/3'
const apiKey = '304a9149a9088e1bb526b00111bc00a0'


const getMovie = () => {
  const trend = ref([])

  const getTrend = async () => {
    try {
      const res = await fetch(`${apiUrl}/trending/movie/week?api_key=${apiKey}`)
      const data = await res.json()
      trend.value = data.results
      console.log('trending.value', trend.value)
      return trend
    }
    catch (err) {
      console.log(err)
    }
  }


  return { getTrend, trend }

}

export default getMovie