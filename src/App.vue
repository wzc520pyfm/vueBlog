<template>
  <div id="app">
    <div class="nav">
      <Nav></Nav>
    </div>
    <router-view/>
    <div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
  import Nav from './components/Nav'
  import Footer from './components/Footer'

  export default {
    name: 'App',
    components: {
      Nav,
      Footer
    }
  }
</script>

<style>
  body{
    overflow-x:hidden
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .nav {
    padding: 0;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
