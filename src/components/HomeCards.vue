<script setup>
import Card from '@/components/Card.vue'
</script>

<template>
  <section class="py-4">
    <div class="container-xl lg:container m-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
         <Card>
            <h2 class="text-2xl font-bold">1  Developers</h2>
            <p class="mt-2 mb-4">
              Browse our Vue jobs and start your career today
            </p>
            <RouterLink
              to="/jobs"
              class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Browse Jobs
            </RouterLink>
          </Card>
        <Card bg="bg-green-100">
           <h2 class="text-2xl font-bold">2 Developers</h2>
            <p class="mt-2 mb-4">
              Browse our Vue jobs and start your career today
            </p>
            <RouterLink
              to="/add-jobs"
              class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Add Jobs
            </RouterLink>
        </Card>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>