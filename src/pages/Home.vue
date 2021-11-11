<template>
  <div class="home">
    <img v-if="posts.length === 0" class="loader" src="../../chargement.gif" />
    <div v-if="posts.length > 0" class="container">
      <router-link
        class="block my-6 text-lg"
        v-for="post in posts"
        :key="post.id"
        :to="`/news/${post.id}`"
        ><div class="card cardhome" style="width: 18rem">
          <img class="card-img-top" :src="post.image" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">
              <p class="text-gray-400 text-base">{{ post.publishDate }}</p>
              <p>
                <img
                  class="rounded-full"
                  width="40px"
                  :src="post.owner.picture"
                />
                {{ post.owner.title }} {{ post.owner.firstName }}
                {{ post.owner.lastName }}
              </p>
            </h5>
            <p class="card-text">{{ post.text }}</p>
          </div>
        </div>
      </router-link>
      <button class="btn btn-outline-info" @click="showMore" v-if="!isLast">
        Voir plus
      </button>
    </div>
  </div>
</template>

<script>
import * as API from "../core/api";
export default {
  name: "Home",
  data() {
    return {
      posts: [],
      limit: 50,
      page: 16,
      total: 0,
    };
  },
  async created() {
    this.getData();
  },
  methods: {
    async getData() {
      const json = await API.getArticles({
        limit: this.limit,
        page: this.page,
      });
      this.posts.push(...json.data);
      this.total = json.total;
      console.log(this.posts);
    },
    showMore() {
      this.page++;
      this.getData();
    },
  },
  computed: {
    isLast() {
      const lastPage = Math.round(this.total / this.limit);
      return this.page >= lastPage;
    },
  },
};
</script>
