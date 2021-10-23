<template>
  <div class="modal">
    <div class="modal-img">
      <img
        :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
        alt=""
      />
    </div>
    <div class="modal-info">
      <div class="modal-button">
        <div class="btn-add">
          <i class="fas fa-plus-circle"></i>
          <i class="far fa-check-circle"></i>
        </div>
        <div class="btn-like" :class="{ like: isLike }" @click="clickLike">
          <i class="fas fa-thumbs-up"></i>
        </div>
        <div class="btn-info" @click="handleClick">
          <i class="fas fa-chevron-circle-down"></i>
        </div>
      </div>
      <div class="modal-description">
        <div class="title">
          <p>{{ movie.title }}</p>
          <p>{{ movie.name }}</p>
        </div>
        <div class="vote">
          <p>{{ movie.vote_average }} 平均評分</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["movie", "isLike"],

  setup(props, { emit }) {
    const handleClick = (e) => {
      emit("showDetail");
    };

    const clickLike = (e) => {
      emit("showLike");
    };
    return { handleClick, clickLike };
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 300px;
  width: 300px;
  border-radius: 8px;
  transform: translateX(-39px) translateY(-50px) scaleX(1) scaleY(1)
    translateZ(0px);
  z-index: 999;
  opacity: 1;
  background: #222222;
  box-shadow: rgb(0 0 0 / 75%) 0px 3px 10px;
  cursor: pointer;
}

.modal-button {
  display: flex;
  font-size: 1.5rem;
  padding-top: 5px;
}

.modal-info {
  padding: 5px;
}
.modal-img {
  display: flex;
  justify-content: center;
  align-items: center;
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

.like {
  color: #46d369;
}
</style>