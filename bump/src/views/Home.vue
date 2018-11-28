<template>
  <div class="Home">
    <img src="../assets/BUMP.png" class="logo">
    <Notes/>
  </div>
</template>
<script>
import Notes from '../components/Notes'
export default {
  name: 'Home',
  components: {
    Notes
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.logo {
  display: block;
  margin: auto;
  padding-top: 60px;
  height: 100px;
}

</style>
