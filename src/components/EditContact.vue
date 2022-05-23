<template>
<div class="add-contact" v-if="data">
<img src="../assets/images/b.webp">
<form action="" class="form-wrapper">
<label>
First Name
<input type="text"  v-model.trim="$v.data.firstName.$model" @input="delayTouch($v.data.firstName); saveData()">
<transition-group tag="div" name="error-msg">  
<div class="error" :key="1" v-if="!$v.data.firstName.required && $v.data.firstName.$dirty">Field is required</div>
<div class="error" :key="2" v-if="!$v.data.firstName.alpha && $v.data.firstName.$dirty">Only letters are allowed!</div>
<div class="error" :key="3" v-if="!$v.data.firstName.minLength && $v.data.firstName.$dirty">Name must have at least {{$v.data.firstName.$params.minLength.min}} letters.</div>
<div class="error" v-if="!$v.data.firstName.maxLength && $v.data.firstName.$dirty">Name must have at most {{$v.data.firstName.$params.maxLength.max}} letters.</div>
</transition-group>
</label>

<label>
Last Name
<input type="text"  v-model.trim="$v.data.lastName.$model" @input="delayTouch($v.data.lastName); saveData()">
<transition-group tag="div" name="error-msg">  
<div class="error" :key="1" v-if="!$v.data.lastName.required && $v.data.lastName.$dirty">Field is required</div>
<div class="error" :key="2" v-if="!$v.data.lastName.alpha && $v.data.lastName.$dirty">Only letters are allowed!</div>
<div class="error" :key="3" v-if="!$v.data.lastName.minLength && $v.data.lastName.$dirty">Name must have at least {{$v.data.lastName.$params.minLength.min}} letters.</div>
<div class="error" v-if="!$v.data.lastName.maxLength && $v.data.lastName.$dirty">Name must have at most {{$v.data.lastName.$params.maxLength.max}} letters.</div>
</transition-group>
</label>
 
<label>
Phone Number
<input type="text"  v-model.trim="$v.data.phone.$model" @input="delayTouch($v.data.phone); saveData()">
<transition-group tag="div" name="error-msg">  
<div class="error" :key="1" v-if="!$v.data.phone.required && $v.data.phone.$dirty">Field is required</div>
<div class="error" :key="2" v-if="!$v.data.phone.numeric && $v.data.phone.$dirty">Only Numbers are allowed!</div>
<div class="error" :key="3" v-if="!$v.data.phone.minLength && $v.data.phone.$dirty">Phone can't be less than a  {{$v.data.phone.$params.minLength.min}} digits.</div>
<div class="error" v-if="!$v.data.phone.maxLength && $v.data.phone.$dirty">Phone can't have more than {{$v.phone.$params.maxLength.max}} digits.</div>
</transition-group>
</label>

<label>
Email Address
<input type="text"  v-model.trim="$v.data.email.$model" @input="delayTouch($v.data.email); saveData()">
<transition-group name="error-msg" tag="div">  
<div class="error" :key="1" v-if="!$v.data.email.required && $v.data.email.$dirty">Field is required</div>
<div class="error" :key="2" v-if="!$v.data.email.email && $v.data.email.$dirty">Wrong Email Format!</div>
</transition-group>
</label>
</form>
<p class="submit-status" v-if="noInfo.length > 1">{{noInfo}}</p>
<p class="submit-status" v-if="submitStatus.length > 1">{{submitStatus}}</p>
</div>
</template>
<script type="text/javascript">
import axios from "axios";
const touchMap = new WeakMap()
import {
required,
minLength,
maxLength,
alpha,
numeric,
email
} from 'vuelidate/lib/validators'
export default {
name :"EditContact",
props : ['uid'],
data(){
return {
serverData : null,
noInfo : "",
submitStatus : "",
dataChanged : false,
data : {
firstName : "",
lastName: "",
phone : "",
email : "",
}
}
},
mounted(){
if (this.uid) {
let that = this;
axios.get(`https://628652dcf0e8f0bb7c145932.mockapi.io/api/v1/contacts/${this.uid}`)
.then(function(response) {
that.data = response.data;
})
.catch(function(error) {
console.log(error);
})
}
},
methods: {
	saveData : function(){
		this.$emit("saveData")
	},
//delayed field validation
delayTouch($v) {
$v.$reset()
if (touchMap.has($v)) {
clearTimeout(touchMap.get($v))
}
touchMap.set($v, setTimeout($v.$touch, 700))
},
			submit: function(){
				this.$v.$touch()
				if (this.$v.$invalid) {
				this.submitStatus = 'ERROR'
				} else {
				let that = this;
				this.submitStatus = 'PENDING'
				axios.put(`https://628652dcf0e8f0bb7c145932.mockapi.io/api/v1/contacts/${this.uid}`, {
				firstName : this.data.firstName,
				lastName : this.data.lastName,
				phone : this.data.phone,
				email : this.data.email,
				})
				.then(function() {
				that.submitStatus = "Contact Details Updated!";
				setTimeout(() => {
				that.$emit("close");
				}, 1000)
				})
				.catch(function(error) {
				console.log(error);
				})
				}	
				}
				},
validations: {
	data : {

firstName: {
required: required,
alpha,
minLength: minLength(2),
maxLength: maxLength(10)
},
lastName: {
required: required,
alpha,
minLength: minLength(3),
maxLength: maxLength(15)
},
phone: {
required: required,
numeric,
minLength: minLength(6),
maxLength: maxLength(17)
},
email : {
required,
email
}
	}
}
}
</script>