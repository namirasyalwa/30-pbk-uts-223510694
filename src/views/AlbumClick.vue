<template>
    <q-page class="q-pa-md">
      <q-spinner v-if="isLoading" size="lg" color="primary" />
      <q-card v-else-if="photo" class="q-pa-md">
        <q-img v-if="photo.url" :src="photo.url" class="q-mb-md" :alt="photo.title" @click="showModal = true" />
        <div v-if="photo.title">{{ photo.title }}</div>
        <q-btn @click="goBack" color="primary" class="q-mt-md">
          Kembali ke Album
        </q-btn>
      </q-card>
  
      <q-dialog v-model="showModal" persistent>
        <q-card class="q-pa-md">
          <q-img v-if="photo.url" :src="photo.url" :alt="photo.title" style="max-width: 100%; max-height: 80vh;" />
          <q-card-section>
            <div class="text-h6" v-if="photo.title">{{ photo.title }}</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Close" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  
  const route = useRoute();
  const router = useRouter();
  const photo = ref(null);
  const isLoading = ref(false);
  const showModal = ref(false);
  
  const fetchPhoto = async (id) => {
    try {
      isLoading.value = true;
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      photo.value = await response.json();
    } catch (error) {
      console.error("Error fetching photo:", error);
    } finally {
      isLoading.value = false;
    }
  };
  
  const goBack = () => {
    router.push("/albums");
  };
  
  onMounted(() => {
    fetchPhoto(route.params.photoId);
  });
  </script>
  
  <style scoped>
  .q-page {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  
  .q-img {
    max-width: 100%;
    max-height: 80vh;
    cursor: pointer;
  }
  
  .q-card {
    width: 90%;
    max-width: 600px;
  }
  
  .q-dialog .q-card {
    width: auto;
  }
  </style>
  