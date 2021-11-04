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
            <div v-show="!movie.isFav" @click="addFav">
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
            @click="clickLike"
            :class="{ like: movie.isLike }"
          >
            <i class="fas fa-thumbs-up"></i>
          </div>
        </div>
        <div class="modal-description">
          <div class="movie-about">
            <div class="title">
              <p>{{ movie.title }}</p>
              <p>{{ movie.name }}</p>
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

    const clickLike = (e) => {
      emit("addLike", props.movie.id);
    };

    const addFav = async (e) => {
      emit("addFav", props.movie.id);

      const movies = {
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
      };
      const res = await addDoc(movies);

      if (!error.value) {
        console.log("Movie added");
      }
    };

    const removeFav = async (id) => {
      const { deleteDoc, getMovieId, movieId } = useDocument("movielists");

      emit("removeFav", props.movie.id);
      await getMovieId(["uid", "==", id]);
      await deleteDoc(movieId.value);
      if (!error.value) {
        console.log("Movie removed");
      }
    };

    return {
      close,
      movieInfo,
      movieCast,
      movieRecommend,
      clickLike,
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