<template>
  <div>
    <h1>MS Word Hujjatini Formatlash</h1>
    <button @click="loadDocx">Faylni Yuklash</button>
    <div class="docx-render" v-html="docContent"></div> <!-- Render qilingan HTML -->
  </div>
</template>

<script>
import mammoth from "mammoth";
import { ref } from "vue";

export default {
  setup() {
    const docContent = ref("");

    const loadDocx = async () => {
      try {
        const response = await fetch(new URL("@/assets/word_files/sample2.docx", import.meta.url));
        const arrayBuffer = await response.arrayBuffer();

        const result = await mammoth.convertToHtml({ arrayBuffer });
        docContent.value = result.value;
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    };

    return {
      docContent,
      loadDocx,
    };
  },
};
</script>

<style>
/* Paragrafni Word’ga yaqinlashtirish */
.docx-render p {
  margin: 1em 0; /* Paragraflar orasidagi bo‘sh joy */
  text-indent: 2em; /* Satr boshidagi bo‘sh joy */
  line-height: 1.6; /* Qatorlar orasidagi masofa */
  font-family: Arial, sans-serif; /* Oddiy shrift */
  font-size: 16px; /* Matn o‘lchami */
}

/* Qatorlar orasidagi bo‘sh joy */
.docx-render br {
  display: block;
  margin: 0.5em 0;
}

/* Jadval yoki boshqa elementlar uchun umumiy formatlash */
.docx-render table {
  border-collapse: collapse;
  width: 100%;
}

.docx-render th,
.docx-render td {
  border: 1px solid #ddd;
  padding: 8px;
}

.docx-render th {
  background-color: #f4f4f4;
  font-weight: bold;
}
</style>
