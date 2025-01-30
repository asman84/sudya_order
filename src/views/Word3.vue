<script setup>
import { ref, onMounted, watch } from "vue";
import { renderAsync } from "docx-preview";

const form = ref({
  varname: "", // Updated to match your docx variable name
});

const container = ref(null);
const docxBlob = ref(null); // Store the original DOCX blob

// ✅ Load `.docx` file
const loadDocx = async () => {
  try {
    const response = await fetch(new URL("@/assets/word_files/test2.docx", import.meta.url));
    docxBlob.value = await response.blob(); // Store the blob for re-rendering
    renderDocx();
  } catch (error) {
    console.error("❌ DOCX yuklashda xatolik:", error);
  }
};

// ✅ Render `.docx` file
const renderDocx = async () => {
  if (!docxBlob.value || !container.value) return;

  container.value.innerHTML = ""; // Clear previous content
  await renderAsync(docxBlob.value, container.value, null);
  
  // Ensure content update after rendering
  setTimeout(updateDocxContent, 500);
};

// ✅ Update text inside `.docx`
const updateDocxContent = () => {
  if (!container.value) return;

  const elements = container.value.querySelectorAll("*");

  elements.forEach((el) => {
    if (el.textContent.includes("{{varname}}")) {
      el.textContent = el.textContent.replace("{{varname}}", form.value.varname || "{}");
    }
  });
};

let debounceTimer = null;

// ✅ **Re-render on `varname` change**
watch(() => form.value.varname, () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    await renderDocx();
  }, 500); // Adjust debounce time as needed
});

onMounted(loadDocx);
</script>

<template>
  <div class="container-xl">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg">
      <div class="form-section">
        <form @submit.prevent>
          <label for="varname">Matn:</label>
          <input id="varname" v-model="form.varname" type="text" placeholder="Matnni kiriting" />
        </form>
      </div>

      <div class="viewer-section">
        <div ref="container" class="docx-container"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.docx-container {
  width: 100%;
  background-color: #fff;
  padding: 60px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  overflow: auto;
  display: flex;
  flex-direction: column;
  font-family: "Times New Roman", Times, serif;
  font-size: 14px;
  line-height: 1;
}
</style>
