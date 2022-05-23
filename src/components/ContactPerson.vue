<template>
  <transition name="list"> 
  <div class="contact-person-wrapper">
    <img src="../assets/images/b.webp" class="contact-person-img">
    <div class="contact-person-info">
      <h2 class="contact-person-name">
        <slot name="name"></slot>
      </h2>
      <a class="contact-person-phone" href="tel:+91 1234567890">
        <slot name="phone"></slot>
      </a>
    </div>
  </div>
  </transition>
</template>

<script>

export default {

  name: 'ContactPerson',
}
</script>

