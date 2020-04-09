<template>
  <div id="app">
    <div class="page-wrap">
      <Header />
      <LandingPage />
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Header from './components/Header'
  import Footer from './components/Footer'
  import LandingPage from './components/LandingPage'

  export default {
    name: 'App',
    components: {
      Header,
      LandingPage,
      Footer
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    width: 100%;
    height: 100%;
    color: #2c3e50;
  }

  body, html{
    margin: 0;
    height:100%;
    width: 100%;
  }

  .page-wrap{
    min-height: 100%;
    margin-bottom: -50px;
    padding-bottom: 100px;
  }

  .page-wrap:after{
    display: block;
  }

  .el-row {
    width: 100%;
  }

  hr{
    width: 200px;
  }
</style>
