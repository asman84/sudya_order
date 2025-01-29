<script setup>
import {renderAsync} from "docx-preview"; // docx-preview kutubxonasini import qilish
import {ref, onMounted} from "vue";



const form = ref({
  first_name: "",
  last_name: "",
  middle_name: "",
});


const renderDocx = async () => {
  try {
    const container = document.querySelector(".docx-container");

    // .docx faylni yuklash
    const response = await fetch(new URL("@/assets/word_files/sample2.docx", import.meta.url));
    const blob = await response.blob();


    // Hujjatni render qilish
    await renderAsync(blob, container, null);
  } catch (error) {
    console.error("Faylni render qilishda xatolik yuz berdi:", error);
  }
};

const submitForm = () => {
  alert(`Ism: ${form.value.first_name}, Email: ${form.value.email}, Xabar: ${form.value.message}`);
};

onMounted(() => {
  renderDocx(); // Komponent yuklanishi bilan render qilishni boshlash
});

const changeDocument = () => {

};

</script>

<template>
  <div class="container-xl">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4  rounded-lg">
      <!-- Forma uchun bo‘lim -->
      <div class="form-section">

        <form @submit.prevent="submitForm">
          <div>
            <label for="name">Ism:</label>
            <input id="name" v-model="form.first_name" @change="changeDocument()" type="text"
                   placeholder="Ismingizni kiriting"/>
          </div>
          <div>
            <label for="email">Email:</label>
            <input id="email" v-model="form.email" @change="changeDocument()" type="text"
                   placeholder="Emailingizni kiriting"/>
          </div>
          <div>
            <label for="message">Xabar:</label>
            <textarea
                id="message"
                v-model="form.message"
                @change="changeDocument()"
                placeholder="Xabar yozing"
                rows="5"
            ></textarea>
          </div>
          <button class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600" type="submit">
            Yuborish
          </button>
        </form>
      </div>

      <!-- .docx faylni render qilish uchun bo‘lim -->
      <div class="viewer-section">

        <div ref="docxContainer" class="docx-container"></div>
      </div>

    </div>
  </div>

</template>


<style scoped>


/* 🟢 Hujjatni Word hujjatiga o‘xshash qilib chiqarish */
.docx-container {
  width: 100%; /* A4 format kengligi */
  background-color: #fff;
  padding: 60px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  overflow: auto;
  display: flex;
  flex-direction: column;
  font-family: "Times New Roman", Times, serif; /* Word'dagi kabi shrift */
  font-size: 14px; /* Standart Word shrift hajmi */
  line-height: 1; /* Qatorlar orasidagi masofani tenglashtirish */
}

/* 🟢 Word formatiga yaqinlashtirish */
.docx-container p {
  text-align: justify;
  margin: 12px 0; /* Har doim bir xil bo‘sh joy */
  text-indent: 2em; /* Satr boshidagi bo‘shliq */
  line-height: 1.0; /* Qatorlar orasidagi masofa */
}

/* 🟢 Qatorlar ichidagi formatlashlarni to‘g‘rilash */
.docx-container span {
  line-height: inherit; /* Span elementlar qator balandligini saqlasin */
  display: inline; /* Harflarning noto‘g‘ri chiqishini oldini olish */
}

/* 🟢 Noto‘g‘ri chiqadigan elementlarni to‘g‘rilash */
.docx-container div {
  display: block;
  margin: 0;
  padding: 0;
  line-height: 1.0;
}

/* 🟢 Agar qatorlar orasida farq bo‘lsa, noto‘g‘ri ishlayotgan `<br>` elementlarni to‘g‘rilash */
.docx-container br {
  display: block;
  content: "";
  margin: 6px 0; /* Har doim bo‘sh joy bir xil bo‘lsin */
}

/* 🟢 Har xil shrift tushib qolishining oldini olish */
.docx-container * {
  font-family: "Times New Roman", Times, serif !important; /* Har doim bir xil shrift ishlatish */
}

/* 🟢 Hujjat ichidagi jadval formati */
.docx-container table {
  width: 100%;
  border-collapse: collapse;
}

.docx-container th,
.docx-container td {
  border: 1px solid #000;
  padding: 8px;
  text-align: left;
}


/* 🟢 Background rang va boshqa elementlar bo‘lsa, ularni tartibga solish */
.docx-container span[style*="background"] {
  padding: 2px;
  border-radius: 2px;
  line-height: 1.0;
}

/* 🟢 Print format (agar bosib chiqarish kerak bo‘lsa) */
@media print {
  .docx-container {
    width: 100%;
    height: auto;
    box-shadow: none;
    border: none;
    padding: 0;
  }
}


</style>
