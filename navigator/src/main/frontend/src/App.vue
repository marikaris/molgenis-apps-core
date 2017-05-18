<template>
  <div class="container">
    <p>
      <router-link :to="{ name: 'navigator' }">Navigator</router-link>
      <span> | </span>
      <router-link :to="{ name: 'explorer' }">Explorer</router-link>
      <span> | </span>
      <router-link :to="{ name: 'meta' }">Meta</router-link>
    </p>
    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    computed: {
      routeName: function () {
        return this.$store.state.route.name
      }
    },
    mounted: function () {
      // navigate to navigator component when app is mounted
      this.$router.push({name: 'navigator'})
    }
  }
</script>
