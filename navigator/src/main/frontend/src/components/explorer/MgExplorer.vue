<template>
  <div v-if="entityType">
    <div class="row header">
      <div class="col-4 offset-4">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search"
                 @input="onSearchQueryChange($event.target.value)" :value="search">
          <span class="input-group-addon"><i class="fa fa-search"></i></span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link :to="{ name: 'navigator' }">Home</router-link>
          </li>
          <li v-for="package in entityTypePath" :key="package.id" class="breadcrumb-item">
            <router-link :to="{ name: 'navigator', params: {packageId: package.id}}">{{ package.label }}</router-link>
          </li>
          <li class="breadcrumb-item active">{{ entityType.label }}</li>
        </ol>
      </div>
    </div>
    <div class="row">
      <div class="col-2">
        <mg-filter-sidebar :entityType="entityType" :query="query"
                           @queryChange="onFilterQueryChange"></mg-filter-sidebar>
      </div>
      <div class="col-10">
        <mg-data-view :entityType="entityType" :query="query"></mg-data-view>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import MgFilterSidebar from './MgFilterSidebar.vue'
  import MgDataView from './MgDataView.vue'
  import RsqlMixin from '../../mixins/RsqlMixin'

  export default {
    name: 'mg-explorer',
    components: {MgFilterSidebar, MgDataView},
    mixins: [RsqlMixin],
    props: {
      search: {
        type: String
      },
      filter: {
        type: String
      }
    },
    computed: {
      ...mapGetters({
        entityType: 'entityType'
      }),
      searchQuery () {
        return this.search ? {type: 'search', value: this.search} : null
      },
      filterQuery () {
        return this.entityType && this.filter ? this.convertRsqlToQuery(this.entityType, this.filter) : null
      },
      query () {
        let query
        if (this.searchQuery && this.filterQuery) {
          query = {type: 'and', value: [this.searchQuery, this.filterQuery]}
        } else if (this.searchQuery) {
          query = this.searchQuery
        } else {
          query = this.filterQuery
        }
        return query
      },
      entityTypePath () {
        if (this.entityType) {
          let path = []
          let package_ = this.entityType.package_
          while (package_ != null) {
            path.push({id: package_.id, label: package_.label})
            package_ = package_.parent
          }
          return path.reverse()
        } else {
          return null
        }
      }
    },
    methods: {
      onFilterQueryChange: function (e) {
        const newQuery = {search: this.search, filter: this.convertQueryToRsql(e.query)}
        this.$router.replace({query: newQuery})
      },
      onSearchQueryChange: function (value) {
        const newQuery = value ? {search: value, filter: this.filter} : {search: undefined, filter: this.filter}
        this.$router.replace({query: newQuery})
      },
      updateEntityType: function (entityTypeId) {
        this.$store.dispatch('getEntityType', entityTypeId, this.query)
      }
    },
    created () {
      this.updateEntityType(this.$route.params.entityTypeId)
    },
    watch: {
      '$route' (to, from) {
        if (from.name === 'explorer' && to.name === 'explorer' && to.params.entityTypeId !== from.params.entityTypeId) {
          this.updateEntityType(to.params.entityTypeId)
        }
      }
    }
  }
</script>

<style scoped>
  .header {
    background-color: #337ab7;
    padding: 0.5rem;
  }

  .breadcrumb {
    margin-bottom: 0rem;
    background-color: white;
  }
</style>
