<script setup>
import jobData from '@/jobs.json';
import {reactive, defineProps, onMounted} from 'vue';
import JobListing from "@/components/JobListing.vue";
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'


const props = defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false
  }
})

const state = reactive({
  jobs: [],
  isLoading: true
})

onMounted(async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/v1/playground/job/list/');
    state.jobs = response.data;
  } catch (error) {
    console.log('Error fetching data');
  } finally {
    state.isLoading = false;
  }
})

</script>

<template>

  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
        Browse jobs
      </h2>
      <!-- Show loading spinner-->
      <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader />

      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <JobListing v-for="job in state.jobs.slice(0,limit || state.jobs.length)" :key="job.id" :job="job"/>
      </div>
    </div>

  </section>

  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink
        to="/jobs"
        class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
    >View All Jobs
    </RouterLink
    >
  </section>

</template>

<style scoped>

</style>