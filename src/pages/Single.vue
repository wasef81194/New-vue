<template>
  <div class="single">
    <img v-if="!post" class="loader" src="../../chargement.gif" />
  
      <transition v-if="post" name="fade">
        <div class="card cardsingle" style="width: 18rem">
        <img class="card-img-top" :src="post.image" />
      

      <div class="card-body">
        <h5 class="card-title">
          <p class="text-gray-400 text-base">{{ post.publishDate }}</p>
            <p> <img class="rounded-full" width="40px" :src="post.owner.picture" />  
              {{ post.owner.title }} {{ post.owner.firstName }}
              {{ post.owner.lastName }}
            </p>
      
        </h5>

          <p class="card-text">
            {{ post.text }}
          </p>
          <p class="card-text inline">
           <img @click="like()"  v-if="!isLike" width="40px" src="../style/img/like.png" />  
           <img @click="like()"  v-if="isLike" width="40px" src="../style/img/like-click.png" /> 
           {{ post.likes }}
          </p>
        </transition>
      </div>
 
</template>

<script>
import * as API from "../core/api";
export default {
  name: "Single",
  methods:{
    like(){
      if(!this.isLike){
        this.post.likes += 1;
        this.isLike = true;
        console.log('like')
      }
      else{
        this.post.likes -= 1;
        this.isLike = false;
        console.log('not like')
      }

    }
  },
  data() {
    return {
      post: null,
      isLike: false,
    };
  },
  async created() {
    const data = await API.getArticleByID(this.$route.params.id);
    this.post = { ...data };
    console.log(data);
  },
};
//https://github.com/manudurgoni/vue-news
</script>
