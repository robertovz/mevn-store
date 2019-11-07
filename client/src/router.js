import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Menu from '@/components/Menu/Menu'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'
import ProfileUser from '@/components/Menu/Profile'
import Product from '@/components/Menu/Products'
import UserBoard from '@/components/Menu/UserBoard'
import ProductList from '@/components/Products/ProductList/ProductList'
import details from '@/components/Products/Details'
import Checkout from '@/components/Cart/Checkout'
import Profile from '@/components/Profile'
import Posts from '@/components/Menu/Posts'
import Users from '@/components/Menu/Users'

Vue.use(Router)

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/products',
      name: 'ProductList',
      component: ProductList
    },
    {
      path: '/details/:p_name/:p_id',
      name: 'details',
      component: details
    },
    {
      path: '/profile/:u_name/:u_id',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout
    },
    {
      path: '',
      name: 'menu',
      component: Menu,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'user',
          name: 'User',
          component: Users
        },
        {
          path: 'post',
          name: 'Post',
          component: Posts
        },
        {
          path: 'product',
          name: 'Product',
          component: Product
        },
        {
          path: 'profile',
          name: 'ProfileUser',
          component: ProfileUser
        },
        {
          path: 'userboard',
          name: 'UserBoard',
          component: UserBoard
        },
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
})


Vue.component('Navbar', require('./components/Navbar.vue').default);
Vue.component('Hero', require('./components/Hero.vue').default);
Vue.component('products-component', require('./components/Products/ProductList/Products.vue').default);
Vue.component('productsCategory', require('./components/Products//ProductsCategory.vue').default);
Vue.component('add-to-cart', require('./components/Cart/AddToCart.vue').default);
Vue.component('add-to-compare', require('./components/Compare/AddToCompare.vue').default);
Vue.component('miniCart', require('./components/Cart/MiniCart.vue').default);
Vue.component('compareList', require('./components/Compare/CompareList.vue').default);
Vue.component('miniList', require('./components/Compare/MiniList.vue').default);
Vue.component('Footer', require('./components/Footer.vue').default);

router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = localStorage.usertoken == undefined ? false : true
  if (requiresAuth && !currentUser) {
    next('/')
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }

})


export default router;