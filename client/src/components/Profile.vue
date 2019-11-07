<template>
  <div>
    <Navbar />
    <div class="breadcrumb">
      <div class="breadcrumbs">
        <div class="container">
          <div class="row mx-auto">
            <div class="col-10 mx-auto">
              <div class="d-flex">
                <li>
                  <router-link to="/" class="black">Home</router-link>
                </li>
                <li class="ml-3">
                  <router-link to="/profile" class="black">
                    {{ user_name }}
                    <span class="ml-1">{{ user_name }}</span>
                  </router-link>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container py-3">
      <div class="row">
        <div class="col-md-9">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="createPost()">
                <div class="form-group">
                  <vue-editor
                    v-model="form.description"
                    placeholder="Enter Description"
                    :class="{ 'is-invalid': form.errors.has('description') }"
                  />
                  <has-error :form="form" field="description"></has-error>
                </div>
                <button type="submit" class="btn bcustom-primary bblue">Publish</button>
              </form>
            </div>
            <hr />
            <div class="card-body">
              <div class="ml-5 text-left">
                <span>Showing {{posts.length}} results.</span>
              </div>
            </div>
            <hr />
            <div v-for="post in posts" :key="post.id">
              <div class="card-body">
                <div class="card-user px-3">
                  <div class="row">
                    <div class="card-img mb-1">
                      <img
                        src="../assets/img/profile/profile.png"
                        class="card-img-top"
                        alt="User picture"
                        style="max-width: 60px;"
                      />
                    </div>
                    <div class="card-info">
                      <a
                        href="#"
                        class="font-weight-bold black dropdown-user"
                      >{{ post.name}} {{ post.last_name}}</a>
                      <router-link
                        :to="{ name: 'Details', 
                    params: { p_post: post, p_name: post.name, p_id: post.id }}"
                        class="ml-3 text-muted"
                      >{{ post.created }}</router-link>
                      <button
                        class="btn btn-outline float-right"
                        v-if="post.user_id == form.user_id || type == 'admin'"
                        @click="deletePost(post.id)"
                      >
                        <i class="fas fa-trash red"></i>
                      </button>
                      <div class="mb-3" v-html="post.description"></div>
                      <div class="float-left">
                        <span class="post-item mx-2" @click="setRating(post)">
                          <i class="far fa-heart"></i>
                          ({{ post.total_ratings }})
                        </span>
                        <span class="post-item" aria-placeholder="dwad">
                          <i class="far fa-comment"></i>
                          ({{ post.total_comments }})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="px-0" v-if="post.id !== posts[posts.length - 1].id" />
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
              <div class="card-img text-center">
                <img
                  src="../assets/img/profile/profile.png"
                  class="card-img-top"
                  alt="User picture"
                  style="max-width: 60px;"
                />
              </div>
              <div class="card-name font-weight-bold text-center">
                {{ form.name }}
                <span class="ml-1">{{ form.last_name }}</span>
              </div>
            </div>
            <hr class="px-0" />
            <div class="card-body">
              <div class="card-buttons">
                <a href="#" class="black d-block">Profile</a>
                <a href="#" class="black">Settings</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from "jwt-decode";
import axios from "axios";

export default {
  data() {
    return {
      user: localStorage.usertoken,
      user_id: "",
      user_name: "",
      posts: {},
      form: new Form({
        user_id: "",
        name: "",
        last_name: "",
        id: "",
        title: "",
        short_description: "",
        description: ""
      }),
      items: this.$route.params.posts,
      type: "",
      itemsPerPage: ""
    };
  },

  methods: {
    loadUser() {
      var id = this.$route.params.u_id;
      this.user_name = this.$route.params.u_name;
      axios.get("/users/profile/" + id).then(({ data }) => (this.form = data));
    },

    loadPosts() {
      var id = this.$route.params.u_id;
      axios.get("/api/posts/" + id).then(({ data }) => (this.posts = data));
    }
  },

  created() {
    this.loadPosts();
    this.loadUser();
  }
};
</script>