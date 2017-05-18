<template>
  <package-table v-if="package_" :package_="package_" :sortDirection="sortDirection"
                 v-on:selectPackage="handleSelectPackage" v-on:selectEntityType="handleSelectEntityType"
                 v-on:sort="handleSort"></package-table>
</template>

<script>
  import PackageTable from './PackageTable.vue'
  import { mapActions } from 'vuex'
  import { GET_PACKAGE, LOGIN } from '../store/actions'

  export default {
    name: 'Navigator',
    components: {PackageTable},
    computed: {
      sortDirection: function () {
        return this.$store.state.route.query.sortDirection
      },
      package_ () {
        return this.$store.state.package_
      }
    },
    methods: {
      ...mapActions({
        'getPackage': GET_PACKAGE
      }),
      handleSort: function (headerId, sortDirection) {
        const sortDirectionQueryParam = sortDirection === 'descending' ? 'descending' : undefined
        this.$router.push({query: Object.assign({}, this.$router.currentRoute.query, {sortDirection: sortDirectionQueryParam})})
      },
      handleSelectPackage: function (packageId) {
        const packageIdQueryParam = packageId !== 'root' ? packageId : undefined
        this.$router.push({query: Object.assign({}, {packageId: packageIdQueryParam})})
      },
      handleSelectEntityType: function (entityTypeId) {
        this.$router.push({name: 'explorer', params: {entityTypeId: entityTypeId}})
      }
    },
    mounted: function () {
      this.$store.state.token ? this.getPackage() : this.$store.dispatch(LOGIN)
    },
    watch: {
      '$route' (to, from) {
        if (to.name === 'navigator') {
          this.getPackage()
        }
      }
    }
  }
</script>
