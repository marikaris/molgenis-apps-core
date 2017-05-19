<template>
  <div v-if="package_">
    <!-- FIXME code duplication with MgExplorer.vue -->
    <!-- FIXME search not working -->
    <div class="row header">
      <div class="col-4 offset-4">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search"
                 @input="onSearchQueryChange($event.target.value)" value="search">
          <span class="input-group-addon"><i class="fa fa-search"></i></span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <package-table v-if=" package_" :package_="package_" :sortDirection="sortDirection"
                       v-on:selectPackage="handleSelectPackage" v-on:selectEntityType="handleSelectEntityType"
                       v-on:sort="handleSort"></package-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import PackageTable from './PackageTable.vue'

  export default {
    name: 'Navigator',
    components: {PackageTable},
    computed: {
      ...mapGetters({
        'package_': 'package_'
      }),
      sortDirection: function () {
        return this.$store.state.route.query.sortDirection
      }
    },
    methods: {
      handleSort: function (headerId, sortDirection) {
        const sortDirectionQueryParam = sortDirection === 'descending' ? 'descending' : undefined
        this.$router.push({query: Object.assign({}, this.$router.currentRoute.query, {sortDirection: sortDirectionQueryParam})})
      },
      handleSelectPackage: function (packageId) {
        const packageIdQueryParam = packageId !== 'root' ? packageId : undefined
        this.$router.push({
          name: 'navigator',
          params: Object.assign({}, this.$route.params, {packageId: packageIdQueryParam})
        })
      },
      handleSelectEntityType: function (entityTypeId) {
        this.$router.push({name: 'explorer', params: {entityTypeId: entityTypeId}})
      },
      updatePackage: function () {
        this.$store.dispatch('getPackage_', this.$route.params.packageId)
      },
      onSearchQueryChange (value) {
        console.log(value)
      }
    },
    created () {
      this.updatePackage()
    },
    watch: {
      '$route' (to, from) {
        if (from.name === 'navigator' && to.name === 'navigator' && to.params.packageId !== from.params.packageId) {
          this.updatePackage(to.params.packageId)
        }
      }
    }
  }
</script>

<style scoped>
  /* FIXME code duplication with MgExplorer.vue */
  .header {
    background-color: #337ab7;
    padding: 0.5rem;
  }
</style>
