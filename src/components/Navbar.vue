<script setup>
import {RouterLink, useRoute} from 'vue-router';
import logoqq from '@/assets/images/logo.png'

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
}

</script>

<template>
  <nav class="bg-green-700 border-b border-green-500">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div
            class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
        >
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="index.html">
            <img class="h-10 w-auto" :src="logoqq" alt="Vue Jobs"/>
            <span class="hidden md:block text-white text-2xl font-bold ml-2"
            >Qarorlar</span
            >
          </RouterLink>
          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                  to="/splitview2"
                  :class="[isActiveLink('/add-jobs') ? 'bg-green-900 text-white, text-white':'text-white', 'hover:bg-green-900', 'hover:text-white', 'rounded-md' ,'px-3' ,'py-2']"
              >Word
              </RouterLink
              ><RouterLink
                  to="/replace-word"
                  :class="[isActiveLink('/add-jobs') ? 'bg-green-900 text-white, text-white':'text-white', 'hover:bg-green-900', 'hover:text-white', 'rounded-md' ,'px-3' ,'py-2']"
              >Word 2
              </RouterLink
              >
              <RouterLink to="/word3"
                :class="[isActiveLink('/word3') ? 'bg-green-900 text-white, text-white':'text-white', 'hover:bg-green-900', 'hover:text-white', 'rounded-md' ,'px-3' ,'py-2']"
              >Word 3</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>