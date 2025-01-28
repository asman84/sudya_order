<template>
  <div class="container">
    <!-- Forma uchun qism -->
    <div class="form-section">
      <h2>Forma</h2>
      <form>
        <div>
          <label for="name">Ism:</label>
          <input id="name" v-model="form.name" type="text" placeholder="Ismingizni kiriting" />
        </div>
        <div>
          <label for="email">Email:</label>
          <input id="email" v-model="form.email" type="email" placeholder="Emailingizni kiriting" />
        </div>
        <div>
          <label for="message">Xabar:</label>
          <textarea
            id="message"
            v-model="form.message"
            placeholder="Xabar yozing"
            rows="5"
          ></textarea>
        </div>
      </form>
    </div>

    <!-- Word fayl uchun qism -->
    <div class="viewer-section">
      <div class="docx-render" v-html="dynamicDocContent"></div>
    </div>
  </div>
</template>

<script>
import mammoth from "mammoth";
import { ref, computed, onMounted } from "vue";

export default {
  setup() {
    // Forma uchun reaktiv qiymatlar
    const form = ref({
      name: "",
      email: "",
      message: "",
    });

    // Yuklangan Word HTML
    const originalDocContent = ref(""); // Mammoth.js orqali olingan HTML
    const dynamicDocContent = computed(() => {
      // Forma ma'lumotlarini dinamik tarzda almashtirish
      return originalDocContent.value
        .replace(/{name}/g, form.value.name || "____")
        .replace(/{email}/g, form.value.email || "____")
        .replace(/{message}/g, form.value.message || "____");
    });

    // .docx faylni yuklash va HTMLga aylantirish
    const loadDocx = async () => {
      try {
        const response = await fetch(new URL("@/assets/word_files/sample2.docx", import.meta.url));
        const arrayBuffer = await response.arrayBuffer();

        const result = await mammoth.convertToHtml({ arrayBuffer });
        originalDocContent.value = result.value; // Hujjatni saqlash
      } catch (error) {
        console.error("Faylni yuklashda xatolik:", error);
      }
    };

    onMounted(() => {
      loadDocx();
    });

    return {
      form,
      dynamicDocContent,
    };
  },
};
</script>

<style>
/* Ekranni ikkiga bo‘lish */
.container {
  display: flex;
  height: 100vh;
}

.form-section,
.viewer-section {
  flex: 1;
  padding: 20px;
  overflow: auto;
}

.form-section {
  background-color: #f9f9f9;
  border-right: 1px solid #ddd;
}

.viewer-section {
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

/* Hujjat uchun maxsus dizayn */
.docx-render {
  font-family: "Times New Roman", Times, serif;
  font-size: 14px;
  line-height: 1.0;
  width: 25cm;
  background-color: #fff;
  padding: 2cm;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
}

.docx-render p {
  margin: 1em 0;
  text-align: justify;
}

.docx-render br {
  display: block;
  margin: 0.5em 0;
}

/* Forma inputlari uchun dizayn */
form div {
  margin-bottom: 15px;
}

form label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

form input,
form textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

form button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

form button:hover {
  background-color: #0056b3;
}
</style>
