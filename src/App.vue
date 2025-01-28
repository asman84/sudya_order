<script>
import {defineComponent} from "vue";
import Navbar from "@/components/Navbar.vue";
import {RouterView} from "vue-router";

export default defineComponent({
  components: {Navbar}
})

</script>
<template>
  <Navbar/>
  <RouterView/>
</template>