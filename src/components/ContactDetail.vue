<template>
		<div class="add-contact" v-if="data">
		<img src="../assets/images/b.webp">
		<ul class="contact-detail">
			<li>
				<span class="label">First Name</span>
				<span class="contact-name">{{data.firstName}}</span>
			</li>
			<li>
				<span class="label">Last Name</span>
				<span class="contact-name">{{data.lastName}}</span>
			</li>
			<li>
				<span class="label">Phone Number</span>
				<span class="contact-name">{{data.phone}}</span>
			</li>
			<li>
				<span class="label">Email</span>
				<span class="contact-name">{{data.email}}</span>
			</li>
		</ul>
    <div v-if="deleteContact && loading == ''" class="approve-delete"><p> Are you sure you want to delete the selected contact ?</p>
		<div>
	<span @click="approveDelete">YES</span>
	<span @click="declineDelete">NO</span>
</div>

    </div>
			<p class="label loading-label">{{loading}}</p>
	</div>
</template>
<script type="text/javascript">
import axios from "axios";
export default {
	name :"ContactDetail",
	props : 
		['id', 'deleteContact']
	,
	data(){
		return {
			data : null,
			loading : '',
		}
	},
	methods : {
		declineDelete : function(){
			this.$emit("declineDelete")
		},
		approveDelete : function(){
let that = this;
this.loading = 'Processing...'
axios.delete(`https://628652dcf0e8f0bb7c145932.mockapi.io/api/v1/contacts/${this.id}`)
.then(function() {
setTimeout(() => {
that.$emit("close");
}, 1000)
})
.catch(function(error) {
console.log(error);
})
}
},
	mounted(){
		let self = this;
    axios.get(`https://628652dcf0e8f0bb7c145932.mockapi.io/api/v1/contacts/${this.id}`)
      .then(function(response) {
          self.data = response.data;
      })
      .catch(function(error) {
          console.log(error);
      })
	}
	}
</script>