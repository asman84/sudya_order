<script setup>

import HomeCards from "@/components/HomeCards.vue";
import Hero from "@/components/Hero.vue";
import JobListings from "@/components/JobListings.vue";
</script>

<template>
  <Hero/>
  <HomeCards/>
  <JobListings :limit="2" :showButton="true"/>
</template>

<style scoped>

</style>