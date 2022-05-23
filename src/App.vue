<template>
  <div id="app">
    <div class="content-wrapper">
      <h2 v-if="contactBook" class="contact-book-title">MY CONTACTS</h2>
<a v-else @click="{addContact ? (addContact = false, contactDetail = false, contactBook = true) : 
                  editContact ? ( contactBook = false, editContact = false, contactDetail = true) : (contactBook = true, contactDetail = false) ,showSaveBtn = false}" class="contact-book-title back-link"> &lt; BACK</a>
      <transition name="component" mode="out-in">
          <ContactBook v-if="contactBook" @openDetails="openDetails"/>
          <EditContact @saveData="showSaveBtn = true;" :uid="uid" ref="edit" v-if="editContact" @close="showSaveBtn = false;editContact = false;"/>
          <AddContact  ref="form" @upload="submit" v-if="addContact" @close="addContact = false;contactBook = true;"/>
          <ContactDetail v-if="contactDetail" :id="uid"  @close="addContact = false; deleteContact = false;contactDetail = false;contactBook = true;" :deleteContact="deleteContact" @declineDelete="deleteContact = false"/>
      </transition>
      <img src="./assets/images/add.png" 
        @click.prevent="addContact = true;contactBook = false;EditContact = false;ContactDetail = false" 
        class="add-contact-icon"
        title="Add new phone record"
        v-show="contactBook">
      <img src="./assets/images/save.png" 
        @click.prevent="submit" 
        class="add-contact-icon save"
        title="Add new phone record"
        v-show="addContact || (editContact && showSaveBtn)">
      <img src="./assets/images/edit.png" 
        @click.prevent="editContact = true" 
        class="add-contact-icon edit"
        title="Edit this contact"
        v-show="contactDetail && !editContact">
      <img src="./assets/images/delete.png" 
        @click.prevent="deleteContact = true;" 
        class="add-contact-icon delete"
        title="Delete this contact"
        v-show="contactDetail && !editContact">
    </div>

  </div>
</template>

<script>
import ContactBook from './components/ContactBook.vue'
import AddContact from './components/AddContact.vue'
import EditContact from './components/EditContact.vue'
import ContactDetail from './components/ContactDetail.vue'
export default {
  name: 'App',
  components: {
    ContactBook,
    AddContact,
    EditContact,
    ContactDetail
  },
  data(){
    return {
      contactBook : true,
      addContact : false,
      editContact : false,
      contactDetail : false,
      uid : null,
      deleteContact : false,
      showSaveBtn : false,
    }
  },
  mounted(){
    this.deleteContact = false;
  },
  methods : {
    submit : function(){
      this.$refs.form ? this.$refs.form.submit() : this.$refs.edit.submit();
    },
    openDetails: function(id){
      this.contactBook = false;
      this.contactDetail = true;
      this.uid = id;
    },
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
