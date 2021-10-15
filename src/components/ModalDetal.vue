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
          <div class="add">
            <i class="fas fa-plus-circle"></i>
            <i class="far fa-check-circle"></i>
          </div>
          <div class="like">
            <i class="far fa-thumbs-up"></i>
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
            <div class="overview">
              {{ movie.overview }}
            </div>
          </div>
          <div class="movie-intro">
            <p>Casts:</p>
            <div class="casts" v-for="cast in movieCast" :key="cast.cast_id">
              {{ cast.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import getMovie from "../composables/getMovie";

export default {
  props: ["movie"],
  setup(props, { emit }) {
    const { loadMovie, movieInfo, movieCast } = getMovie(props.movie.id);
    loadMovie();
    console.log("🚀movieInfo", movieCast);

    const close = () => {
      emit("closeDetail");
    };

    return { close, movieInfo, movieCast };
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
}

.modal-detail {
  display: flex;
  flex-direction: column;
  top: 120px;
  margin: 100px auto;
  height: 90%;
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
  overflow: hidden;
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

.vote p {
  color: #46d369;
  font-weight: bold;
}

.movie-about {
  width: 70%;
  margin-right: 20px;
}
</style>