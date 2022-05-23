<template>
	<div class="add-contact">
		<img src="../assets/images/b.webp">
		<form action="" class="form-wrapper">
			<label>
				First Name
				<input type="text" v-model.trim="$v.firstName.$model" @input="delayTouch($v.firstName)">
            <transition-group tag="div" name="error-msg">  
              <div class="error" :key="1" v-if="!$v.firstName.required && $v.firstName.$dirty">Field is required</div>
              <div class="error" :key="2" v-if="!$v.firstName.alpha && $v.firstName.$dirty">Only letters are allowed!</div>
              <div class="error" :key="3" v-if="!$v.firstName.minLength && $v.firstName.$dirty">Name must have at least {{$v.firstName.$params.minLength.min}} letters.</div>
              <div class="error" v-if="!$v.firstName.maxLength && $v.firstName.$dirty">Name must have at most {{$v.firstName.$params.maxLength.max}} letters.</div>
            </transition-group>
			</label>
			<label>
				Last Name
        <input type="text" v-model.trim="$v.lastName.$model" @input="delayTouch($v.lastName)">
            <transition-group tag="div" name="error-msg">  
              <div class="error" :key="1" v-if="!$v.lastName.required && $v.lastName.$dirty">Field is required</div>
              <div class="error" :key="2" v-if="!$v.lastName.alpha && $v.lastName.$dirty">Only letters are allowed!</div>
              <div class="error" :key="3" v-if="!$v.lastName.minLength && $v.lastName.$dirty">Name must have at least {{$v.lastName.$params.minLength.min}} letters.</div>
              <div class="error" v-if="!$v.lastName.maxLength && $v.lastName.$dirty">Name must have at most {{$v.lastName.$params.maxLength.max}} letters.</div>
            </transition-group>
			</label>
			<label>
				Phone Number
				<input type="text" v-model.trim="$v.phone.$model" @input="delayTouch($v.phone)">
            <transition-group tag="div" name="error-msg">  
              <div class="error" :key="1" v-if="!$v.phone.required && $v.phone.$dirty">Field is required</div>
              <div class="error" :key="2" v-if="!$v.phone.numeric && $v.phone.$dirty">Only Numbers are allowed!</div>
              <div class="error" :key="3" v-if="!$v.phone.minLength && $v.phone.$dirty">Phone can't be less than a  {{$v.phone.$params.minLength.min}} digits.</div>
              <div class="error" v-if="!$v.phone.maxLength && $v.phone.$dirty">Phone can't have more than {{$v.phone.$params.maxLength.max}} digits.</div>
            </transition-group>
			</label>
			<label>
				Email Address
        <input type="text" v-model.trim="$v.email.$model" @keyup.enter="upload" @input="delayTouch($v.email)">
          <transition-group name="error-msg" tag="div">  
            <div class="error" :key="1" v-if="!$v.email.required && $v.email.$dirty">Field is required</div>
            <div class="error" :key="2" v-if="!$v.email.email && $v.email.$dirty">Wrong Email Format!</div>
          </transition-group>
			</label>
		</form>
    <p class="submit-status">{{submitStatus}}</p>
	</div>
</template>
<script type="text/javascript">
const touchMap = new WeakMap()
import axios from "axios";
import {
    required,
    minLength,
    maxLength,
    alpha,
    numeric,
    email
} from 'vuelidate/lib/validators'
export default {
    name: "AddContact",
    data() {
        return {
            firstName: "",
            lastName : "",
            phone : "",
            email : "",
            submitStatus : ""
        }
    },
    methods: {
        upload : function(){
            this.$emit('upload');
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
              axios.post('https://628652dcf0e8f0bb7c145932.mockapi.io/api/v1/contacts/', {
                firstName : this.firstName,
                lastName : this.lastName,
                phone : this.phone,
                email : this.email,
              })
              .then(function() {
                  that.submitStatus = "Added new contact!";
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
</script>