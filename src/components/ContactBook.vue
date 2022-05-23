<template>
  <div class="contact-book-wrapper">
    <div class="search-wrapper">
      <input v-model="searchQuery" type="text" name="" placeholder="Type a name or number" >
      <img src="../assets/images/search.png" >
    </div>
    <div class="contact-book-list">
      <p class="no-records">{{loading}}</p>
      <p v-if="resultQuery.length <= 0 && loading === ''" class="no-records">Ups! No records found...</p>
      <transition-group v-else tag="ul" name="list" > 
        <ContactPerson v-for="(c, i) in resultQuery" :key="i" @click.native="emitContactInfo(c.id)">
          <template #name>
            {{c.firstName + " " + c.lastName}}
          </template>
          <template #phone>
            {{c.phone}}
          </template>
        </ContactPerson>
      </transition-group>
    </div>
  </div>
</template>

<script>
import ContactPerson from './ContactPerson.vue'
import axios from "axios";

export default {
  name: 'ContactBook',
  components: {
      ContactPerson,
  },
  data() {
      return {
          data: [],
          searchQuery: null,
          loading : "",
      }
  },
  mounted() {
      let self = this;
      self.loading = "Loading..."
      axios.get('https://628652dcf0e8f0bb7c145932.mockapi.io/api/v1/contacts/')
          .then(function(response) {
              self.data = response.data.reverse();
              self.loading = '';
          })
          .catch(function(error) {
              console.log(error);
              self.loading = 'Error while loading data...'
          })
  },
  methods : {
    emitContactInfo : function(id){
      this.$emit("openDetails", id)
    }
  },
  computed: {
      //returns search results, but if not searching - all data.
      resultQuery() {
          if (this.searchQuery) {
              return this.data.filter(item => {
                  return this.searchQuery.toLowerCase().split("")
                  .every(v => item.firstName.concat(" ", item.lastName).toLowerCase().includes(v))
                  || this.searchQuery.split("").every(v => item.phone.includes(v))
              });
          } else {
              return this.data;
          }
      }
  }

}
</script>

