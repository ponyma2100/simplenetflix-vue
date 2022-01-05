<template>
  <div class="backdrop" @click.self="close">
    <div class="modal-detail">
      <div class="modal-img">
        <img
          :src="`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`"
          alt=""
        />
      </div>
      <div class="modal-info">
        <div class="modal-button">
          <div class="btn-add">
            <div v-show="!movie.isFav" @click="addFav(movie.id)">
              <i class="fas fa-plus-circle"></i>
            </div>
            <div
              v-show="movie.isFav"
              @click="removeFav(movie.uid ? movie.uid : movie.id)"
              :class="{ fav: movie.isFav }"
            >
              <i class="far fa-check-circle"></i>
            </div>
          </div>
          <div
            class="btn-like"
            v-show="!movie.isLike"
            @click="addLike(movie.uid ? movie.uid : movie.id)"
          >
            <!-- :class="{ like: movie.isLike }" -->
            <i class="fas fa-thumbs-up"></i>
          </div>
          <div
            v-show="movie.isLike"
            @click="removeLike(movie.uid ? movie.uid : movie.id)"
            :class="{ like: movie.isLike }"
          >
            <i class="fas fa-thumbs-up"></i>
          </div>
        </div>
        <div class="modal-description">
          <div class="movie-about">
            <div class="title">
              <p>{{ movie.title ? movie.title : movie.name }}</p>
            </div>
            <div class="vote">
              <p>{{ movie.vote_average }} 平均評分</p>
            </div>
            <div class="releasedate">
              {{
                movieInfo.release_date
                  ? movieInfo.release_date
                  : movieInfo.first_air_date
              }}
            </div>
            <div class="overview">
              {{ movie.overview }}
            </div>
          </div>
          <div class="movie-intro">
            <div class="casts">
              <p>Casts:</p>
              <div class="cast" v-for="cast in movieCast" :key="cast.cast_id">
                {{ cast.name }}
              </div>
            </div>
            <div class="genreses">
              <p>Genres:</p>
              <div
                class="genres"
                v-for="genres in movieInfo.genres"
                :key="genres.id"
              >
                {{ genres.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2>Recommends</h2>
      <div class="modal-recommend">
        <div
          class="recommend"
          v-for="recommend in movieRecommend"
          :key="recommend.id"
        >
          <div class="recommend-img">
            <img
              :src="`https://image.tmdb.org/t/p/w300${recommend.poster_path}`"
              alt=""
            />
          </div>
          <div class="recommend-title">
            {{ recommend.title ? recommend.title : recommend.name }}
          </div>
          <div class="recommend-vote">
            <p>{{ recommend.vote_average.toFixed(1) }} 平均評分</p>
          </div>
          <div class="recommend-overview">
            <p>{{ recommend.overview.substring(0, 100) + "..." }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getMovie from "../composables/getMovie";
import useCollection from "@/composables/useCollection";
import useDocument from "../composables/useDocument";
import getUser from "../composables/getUser";

export default {
  props: ["movie"],
  setup(props, { emit }) {
    const { error, addDoc } = useCollection("movielists");
    const { deleteDoc, updateDoc, getMovieId, movieId } =
      useDocument("movielists");
    const { user } = getUser();
    const { loadMovie, loadTv, movieInfo, movieCast, movieRecommend } =
      getMovie(props.movie.uid ? props.movie.uid : props.movie.id);

    if (props.movie.isTv) {
      loadTv();
    } else {
      loadMovie();
    }

    const close = () => {
      emit("closeDetail");
    };

    const addFav = async (id) => {
      if (props.movie.isTv) {
        await loadTv();
      } else {
        await loadMovie();
      }
      props.movie.isFav = !props.movie.isFav;

      let favMovies = JSON.parse(localStorage.getItem("favMovieList")) || [];

      const movie = {
        poster_path: movieInfo.value.poster_path,
        backdrop_path: movieInfo.value.backdrop_path,
        title: movieInfo.value.title
          ? movieInfo.value.title
          : movieInfo.value.name,
        name: movieInfo.value.name
          ? movieInfo.value.name
          : movieInfo.value.title,
        vote: movieInfo.value.vote_average,
        release_date: movieInfo.value.release_date
          ? movieInfo.value.release_date
          : movieInfo.value.first_air_date,
        cast: movieCast.value,
        genres: movieInfo.value.genres,
        movieRecommend: movieRecommend.value,
        userId: user.value.uid,
        uid: movieInfo.value.id,
        isFav: props.movie.isFav,
        isLike: props.movie.isLike,
        isTv: props.movie.isTv,
      };

      favMovies.push(movie);
      localStorage.setItem("favMovieList", JSON.stringify(favMovies));

      const res = await addDoc(movie);

      if (!error.value) {
        console.log("Movie added");
      }
    };

    const removeFav = async (id) => {
      props.movie.isFav = !props.movie.isFav;

      const { deleteDoc, getMovieId, movieId } = useDocument("movielists");

      let favMovies = JSON.parse(localStorage.getItem("favMovieList"));

      const removeIndex = favMovies.findIndex((movie) => movie.uid === id);

      if (removeIndex === -1) return;
      favMovies.splice(removeIndex, 1);

      localStorage.removeItem("favMovieList");
      localStorage.setItem("favMovieList", JSON.stringify(favMovies));

      await getMovieId(["uid", "==", id]);
      await deleteDoc(movieId.value);
      if (!error.value) {
        console.log("Movie removed");
      }
    };

    const addLike = async (id) => {
      const { updateDoc, getMovieId, movieId } = useDocument("movielists");
      if (props.movie.isTv) {
        await loadTv();
      } else {
        await loadMovie();
      }
      props.movie.isLike = !props.movie.isLike;

      let likeMovies = JSON.parse(localStorage.getItem("likeMovieList")) || [];

      const movie = {
        poster_path: movieInfo.value.poster_path,
        backdrop_path: movieInfo.value.backdrop_path,
        title: movieInfo.value.title
          ? movieInfo.value.title
          : movieInfo.value.name,
        name: movieInfo.value.name
          ? movieInfo.value.name
          : movieInfo.value.title,
        vote: movieInfo.value.vote_average,
        release_date: movieInfo.value.release_date
          ? movieInfo.value.release_date
          : movieInfo.value.first_air_date,
        cast: movieCast.value,
        genres: movieInfo.value.genres,
        movieRecommend: movieRecommend.value,
        userId: user.value.uid,
        uid: movieInfo.value.id,
        isFav: props.movie.isFav,
        isLike: props.movie.isLike,
        isTv: props.movie.isTv,
      };

      likeMovies.push(movie);
      localStorage.setItem("likeMovieList", JSON.stringify(likeMovies));

      if (props.movie.isFav) {
        await getMovieId(["uid", "==", id]);
        await updateDoc(movieId.value, movie);
      }
      if (!error.value) {
        console.log("Movie liked");
      }
      // emit("addLike", props.movie.id);
    };

    const removeLike = async (id) => {
      props.movie.isLike = !props.movie.isLike;
      let likeMovies = JSON.parse(localStorage.getItem("likeMovieList"));

      const removeIndex = likeMovies.findIndex((movie) => movie.uid === id);

      if (removeIndex === -1) return;
      likeMovies.splice(removeIndex, 1);

      localStorage.removeItem("likeMovieList");
      localStorage.setItem("likeMovieList", JSON.stringify(likeMovies));

      const movie = {
        isLike: props.movie.isLike,
      };

      if (props.movie.isFav) {
        await getMovieId(["uid", "==", id]);
        await updateDoc(movieId.value, movie);
      }

      if (!error.value) {
        console.log("Movie unliked");
      }
    };

    return {
      close,
      movieInfo,
      movieCast,
      movieRecommend,
      addLike,
      removeLike,
      addFav,
      removeFav,
    };
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  overflow-y: auto;
  z-index: 999;
}

.modal-detail {
  display: flex;
  flex-direction: column;
  top: 120px;
  margin: 100px auto;
  width: 800px;
  border-radius: 8px;
  transform: translateX(-39px) translateY(-50px) scaleX(1) scaleY(1)
    translateZ(0px);
  z-index: 999;
  opacity: 1;
  background: #222222;
  box-shadow: rgb(0 0 0 / 75%) 0px 3px 10px;
  cursor: pointer;
}

.modal-description {
  display: flex;
}

.modal-button {
  display: flex;
  font-size: 1.5rem;
  padding-top: 5px;
}

.modal-info {
  padding: 5px 20px;
}
.modal-img {
  display: flex;
  justify-content: center;
  /* align-items: center; */
  /* overflow: hidden; */
  border-radius: 8px;
}

.modal-img img {
  flex-shrink: 0;
  min-width: 100%;
  min-height: 100%;
}
.title {
  font-size: 1.5rem;
  font-weight: bolder;
}

.vote p,
.recommend-vote p {
  color: #46d369;
  font-weight: bold;
}

.like,
.fav {
  color: #46d369;
}

.movie-about {
  width: 70%;
  margin-right: 20px;
}

.movie-intro p {
  color: #777;
  font-weight: bold;
}

.modal-recommend {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 10px;
}

.recommend {
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 245px;
  border-radius: 5px;
  opacity: 1;
  background: #2f2f2f;
  margin: 5px 5px;
}

.recommend-img {
  display: flex;
  height: 45%;
  width: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  /* border-radius: 8px; */
}

.modal-detail h2 {
  margin-left: 20px;
}
</style>