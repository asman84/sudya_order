<script setup>
import {ref, onMounted, watch} from "vue";
import {renderAsync} from "docx-preview"; // .docx faylni render qilish uchun

// ✅ Foydalanuvchi kiritadigan qiymat
const form = ref({
  firstname: "kukuk",
});

const container = ref(null); // `.docx` faylni chiqarish uchun HTML konteyner

// ✅ `.docx` faylni bir marta yuklash va render qilish
const loadDocx = async () => {
  try {
    const response = await fetch(new URL("@/assets/word_files/sample2.docx", import.meta.url));
    const blob = await response.blob();

    // `.docx` faylni render qilish
    await renderAsync(blob, container.value, null);

    // ✅ Render qilingan HTML ichidagi `{{first_name}}` joylarni belgilash
    updateDocxContent();
  } catch (error) {
    console.error("❌ DOCX yuklashda xatolik:", error);
  }
};

let debounceTimer = ref(null);
watch(() => form.value.firstname, () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    await loadDocx();
  }, 500); // Adjust debounce time as needed
});

// ✅ **Matnni `.docx` ichida dinamik o‘zgartirish**
const updateDocxContent = () => {
  if (!container.value) return;

  // `.docx` fayl ichidagi `{{first_name}}` joylarni topish
  const elements = container.value.querySelectorAll("*");

  elements.forEach((el) => {
    console.log(el.innerHTML);
    if (el.innerHTML.includes("firstname")) {
      console.log(22222);
      el.innerHTML = el.innerHTML.replace("firstname", form.value.firstname || "firstname");
      console.log(el.innerHTML)
    }
  });
};

// ✅ Foydalanuvchi inputga yozganda `.docx` ichidagi matnni darhol o‘zgartirish
watch(() => form.value.firstname, updateDocxContent);

// ✅ Komponent yuklanishi bilan `.docx` faylni yuklash
onMounted(loadDocx);
</script>

<template>
  <div class="container-xl">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg">
      <!-- 📝 Forma -->
      <div class="form-section">
        <form @submit.prevent>
          <div>
            <label for="name">Ism:</label>
            <input id="name" v-model="form.firstname" type="text" placeholder="Ismingizni kiriting"/>
          </div>
        </form>
      </div>

      <!-- 📄 `.docx` faylni render qilish -->
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
