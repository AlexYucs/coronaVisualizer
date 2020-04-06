<template>
  <div class="landing">
    <h1>{{ msg }}</h1>
    <p>
      Select your state:
    </p>
    <label for="state"></label><select id="state">
      <option value="MA">Massachusetts</option>
    </select>
    <h3>Chart</h3>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
