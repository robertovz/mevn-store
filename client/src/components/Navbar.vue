<template>
    <nav>
      <div class="nav-top">
        <div class="container">
          <ul class="navbar-top d-flex" v-if="auth=='loggedIn' || (user!=null || user!=undefined)">
            <li class="navtop-item">
              <a href="/profile" class="navtop-link">Profile</a>
            </li>
            <li class="navtop-item">
              <a href="#" class="navtop-link" @click="logout">Logout</a>
            </li>
          </ul>

          <ul class="navbar-top d-flex" v-else>
            <li class="navtop-item">
              <a href="/login" class="navtop-link">Login</a>
            </li>
            <li class="navtop-item">
              <a href="/register" class="navtop-link">Register</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="nav-center">
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <h1>LOGO</h1>
            </div>
            <div class="col-md-4">
              <form class="input-group my-lg-0 search-box">
                <input
                  type="text"
                  v-model="search"
                  class="form-control search"
                  placeholder="Search"
                  aria-label="Search"
                  @keyup="searchit"
                />
                <div class="input-group-prepend">
                  <routerLink
                    to="/products"
                    @click.native="searchit"
                    v-model="search"
                    class="btn btn-outline search-btn"
                    style="width: max-content!important;"
                  >
                    <i class="fa fa-search" style="font-size: 17px;"></i>
                  </routerLink>
                </div>
              </form>
            </div>
            <div class="col-md-4">
              <div class="float-right">
                <div class="cart-box" data-toggle="modal" data-target="#cart">
                  <a class="btn btn-outline lightblue">
                    <span style>CART / {{ this.$store.getters.totalPrice | currency }}</span>
                    <i class="fa fa-shopping-cart" style="font-size: 20px"></i>
                    <span class="badge badge-light ml-1">{{this.$store.state.cart.length}}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar navbar-expand-md nav-bottom">
        <div class="container">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon">
              <i class="fas fa-bars white" style="font-size: 20px"></i>
            </span>
          </button>
          <form class="form-inline my-lg-0 search-box-2">
            <input
              type="text"
              v-model="search"
              class="form-control search"
              placeholder="Search"
              aria-label="Search"
            />
            <div class="input-group-prepend">
              <button
                @click.prevent="searchProduct()"
                class="btn btn-outline-success search-btn"
                style="width: max-content!important;"
              >
                <i class="fa fa-search white" style="font-size: 17px"></i>
              </button>
            </div>
          </form>
          <div class="cart-box-2" data-toggle="modal" data-target="#cart">
            <div>
              <i class="fa fa-shopping-cart white" style="font-size: 20px;"></i>
              <span class="badge badge-light ml-1">{{this.$store.state.cart.length}}</span>
            </div>
          </div>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <router-link to="/" class="nav-link">
                  Home
                  <span class="sr-only">(current)</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/products" class="nav-link">Bike Parts</router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Services</a>
              </li>
            </ul>

            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <a
                  href="#"
                  class="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fas fa-user mr-2"></i>Account
                </a>
                <div
                  class="dropdown-menu dropdown-account"
                  aria-labelledby="navbarDropdown"
                  v-if="auth=='loggedIn' || (user!=null || user!=undefined)"
                >
                  <routerLink to="/userBoard" class="dropdown-item">Orders</routerLink>
                  <routerLink to="/profile" class="dropdown-item">Profile</routerLink>
                  <routerLink to="/userBoard" class="dropdown-item">UserBoard</routerLink>
                  <routerLink to="/profile" class="dropdown-item">Activities</routerLink>
                </div>
                <div class="dropdown-menu dropdown-account" aria-labelledby="navbarDropdown" v-else>
                  <a href="/login" class="dropdown-item">Login</a>
                  <a href="/register" class="dropdown-item">Register</a>
                </div>
              </li>

              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >Shopping History</a>
                <div class="dropdown-menu dropdown-history" aria-labelledby="navbarDropdown">
                  <h4 class="text-muted font-weight-bold">
                    <i class="fas fa-history ml-4 mr-2 my-3"></i>
                    <span>Shopping History</span>
                  </h4>
                  <div class="dropdown-divider"></div>

                  <div class="container">
                    <div class="row my-4" v-if="this.$store.state.viewProducts.length == 0">
                      <div class="col-12">
                        <div class="text-center">
                          <h3 class="text-muted font-weight-bold my-3">
                            Your shopping history is empty.
                            <span class="d-block">Let's fix that.</span>
                          </h3>
                          <router-link to="/products" class="btn bcustom-primary my-3">Shopping</router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li class="nav-item">
                <a href class="nav-link">About</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      auth: "",
      user: localStorage.usertoken,
      search: ""
    }
  },
  methods: {

    showCart() {
      $("#cart").modal("show");
    },
    handleScroll() {
      if (window.scrollY > 120 && window.innerWidth > 768) {
        $(".navbar").css("position", "fixed");
        $(".navbar").css("top", "0");
        $(".navbar").css("left", "0");
        $(".navbar").css("right", "0");
        $(".navbar").css("width", "100%");
        $(".navbar").css("background", "rgba(22, 34, 42, 0.9)");
        $(".navbar").css("transition", "all 0.3 ease-in-out");
        $(".navbar").css("box-shadow", "0 3px 5px rgba(0, 0, 0, 0.5)");
        $("body").css("padding-top", "60px");
      } else {
        $(".navbar").css("position", "relative");
        $(".navbar").css("box-shadow", "solid 1px 3px rgba(0, 0, 0, 0.5)");
        $(".nav-link").css("color", "#fff");
        $(".navbar").css("background", "#16222a");
        $("body").css("padding-top", "0px");
      }
    },


    searchit() {
      this.$store.commit("searchit", this.search);
    },

    logout() {
      this.$router.push("/");
      this.$router.go();
      localStorage.removeItem("usertoken");
    }
  },

  mounted() {
    Fire.$on("logged-in", status => {
      this.auth = status;
    });
  },

  created() {
    window.addEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="scss">
.navbar-slide {
  visibility: visible;
  flex-basis: 33.4%;
  width: 33.4%;
}
//Navtop
.nav-top {
  background: #f8f9fa !important;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 25px;
  .navbar-top {
    float: right;
    .navtop-item {
      list-style: none;
      .navtop-link {
        color: #636b6f;
        margin-left: 10px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
        font-size: 13px;
        margin-top: 3px;
        &:hover {
          color: #04a7bb;
        }
      }
    }
  }
}
@media only screen and (max-width: 767px) {
  .nav-top {
    margin-top: 55px;
  }
}
//End Of Navtop
//Navcenter
.nav-center {
  padding: 20px;
  margin-top: 15px;
}
@media only screen and (max-width: 767px) {
  .nav-center {
    margin-top: 75px;
    padding: 0;
    text-align: center;
  }
}
//End Of Navcenter
//Navbottom
@media only screen and (max-width: 1200px) {
  .navbar-slide {
    visibility: visible;
    flex-basis: 50%;
    width: 50%;
  }
}
.search-btn {
  color: #04a7bb;
  border-color: #04a7bb;
}
.search-btn:hover {
  color: #fff;
  background: #04a7bb;
  border-color: #04a7bb;
}
.navbar {
  background: #16222a;
  z-index: 15;
}
.nav-item {
  padding: 3px 5px;
}
.nav-bottom {
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.5);
}
.navbar-nav .nav-link {
  font-size: 14px !important;
  color: #fff;
  height: 35px;
  font-weight: bold;
  text-transform: uppercase;
}
.navbar .router-link-exact-active {
  color: #fff;
  border-bottom: 2px solid #fff;
}
.dropdown:hover > .dropdown-history,
.dropdown:hover > .dropdown-account {
  display: block;
  right: 0;
  left: auto;
}
.dropdown:hover > .dropdown-category {
  display: block;
}
.dropdown-history.show {
  right: 0;
  left: auto;
}
.dropdown-category {
  width: 402px;
}
.dropdown-item:hover {
  background: #eee;
}
.navbar-slide .card:hover {
  background: #eee;
}
@media (min-width: 768px) {
  .dropdown-category {
    width: 700px;
  }
  .dropdown-section {
    display: inline-block;
    width: 170px;
  }
  .dropdown-section-left {
    float: left;
  }
}
@media (min-width: 1200px) {
  .dropdown-history {
    width: 950px;
  }
  .navbar-slide img {
    margin-top: 25px;
    text-align: center;
  }
}
@media (max-width: 1200px) {
  .dropdown-history {
    width: 650px;
  }
  .navbar-slide img {
    margin-top: 25px;
    text-align: center;
  }
  .remove-history {
    float: right;
  }
}
@media (max-width: 767px) {
  .navbar-slide {
    visibility: visible;
    flex-basis: 100%;
    width: 100%;
  }
  .navbar-slide .card {
    text-align: center;
    height: 300px;
    width: 100%;
    overflow-y: auto;
  }
  .dropdown-category.show {
    width: 100%;
  }
  .dropdown-history {
    width: 100%;
    position: absolute !important;
    top: -100px;
    left: 0;
    height: 400px;
  }
  .dropdown-history img {
    width: 300px !important;
  }
}
.dropdown-icon {
  width: 35px;
  text-align: center;
  font-size: 15px;
}
.search-box-2,
.cart-box-2 {
  display: none;
}
.cart-box .btn {
  border: none !important;
}
.btn {
  width: max-content !important;
}
@media only screen and (max-width: 767px) {
  .navbar {
    top: 0;
    position: fixed !important;
    width: 100%;
    left: 0;
    right: 0;
  }
  .nav-link {
    margin: 1px 0 1px 25px;
  }
  .search-box,
  .cart-box {
    display: none;
  }
  .search-box-2,
  .cart-box-2 {
    display: block;
  }
  .form-control.search {
    width: 70%;
  }
  .form-control.search:focus {
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    height: 55px;
    top: 0;
    border-radius: 0;
  }
  .search-btn {
    z-index: -1 !important;
  }
  .search-box-2 {
    display: inherit;
    width: 50%;
  }
  .cart-box-2 .btn {
    border: none !important;
  }
}
//End Of Navbottom
</style>