<template>
  <section>
    <div class="image_block">
      <img :src="require(`../assets/images${shownWord.url}`)" width="300" />
    </div>
    <h2 v-if="shownEnglish">{{ shownWord.English }}</h2>
    <h2 v-if="!shownEnglish">{{ shownWord.Serbian }}</h2>
    <input type="text" v-model="wordInput" @keyup.enter="checkWord" />
    <button class="btn_check" @click="checkWord">Let's see</button>
    <p v-if="emptyWords">You learned everything!</p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      wordsToLearn: this.words.length,
      emptyWords: false,
      shownEnglish: true,
      wordInput: "",
    };
  },
  props: {
    shownWord: {
      type: Object,
      required: true,
    },
    words: {
      type: Array,
      required: true,
    },
  },
  methods: {
    /* Main function to check the word from user's input:
    to  change the word when correct/incorrect to a new random in a random language, add points to statictics */
    checkWord() {
      let inputWord = this.wordInput.trim().toLowerCase();
      let correctWord = this.shownEnglish ? this.shownWord.Serbian.toLowerCase() : this.shownWord.English.toLowerCase();

      if (inputWord === correctWord) {
        this.changeCorrectWord();
      } else {
        this.changeFalseWord();
      }
      
      this._randomiseLanguage();
      this._clearInput();
    },

    // Change a word for showing, add point to CORRECT statistics, remove this word from showing
    changeCorrectWord() {
      this._removeWord();
      this.$emit("changeWord", this.shownWord);
    },
    // Change a word for showing, leave statistics as is
    changeFalseWord() {
      this.$emit("changeWord", this.shownWord);
    },

    // Change the language for showing
    _randomiseLanguage() {
      if(Math.floor(Math.random() * 2) === 0) {
        return this.shownEnglish = false;
      } else {
        return this.shownEnglish = true;
      }
    },

    // Check for the words left for learning in the array of data
    _calculateWords() {
      if (this.shownWord.answered === true || this.wordsToLearn <= 0) {
        return (this.emptyWords = true);
      } else {
        return;
      }
    },

    // Change the word status to 'answered' & remove it from the learning array
    _removeWord() {
      this.shownWord.answered = true;
      this.wordsToLearn--;
    },

    // Clear the input's text
    _clearInput() {
      return this.wordInput = "";
    }
  },
  beforeUpdate() {
    this._calculateWords();
  },
  created() {
    this._randomiseLanguage();
  }
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  height: 80%;
}
.image_block {
  height: 464px;
}
img {
  max-height: 464px;
  width: 700px;
  filter: drop-shadow(-6px 6px 10px rgba(255, 103, 0, 0.12));
  border-radius: 10px;
}
h2 {
  font-weight: 600;
}
input {
  width: 54.68%;
  height: 50px;
  padding: 0;
  border-width: 0;
  box-shadow: -6px 6px 10px rgba(255, 103, 0, 0.3), 6px -6px 10px rgba(231, 190, 163, 0.3);
  border-radius: 10px;
  border-color: transparent;
  font-family: inherit;
  font-size: inherit;
  text-align: center;
}
.btn_check {
  background-color: #FF6700;
  color: #fff;
  font-weight: 900;
  font-family: inherit;
  font-size: inherit;
  padding: 1rem 7.125rem;
  margin-top: 1.563rem;
  box-sizing: border-box;
  border-radius: 10px;
  border-color: transparent;
}

/* Adaptive & responsive design for 1920px, 1280px, 380px */
@media screen and (max-width: 1280px) {
  .image_block {
    height: 266px;
  }
  img {
    width: 400px;
    object-fit: contain;
  }
  h2 {
    font-size: 1.25rem;
  }
  input {
    width: 42.37%;
  }
  .btn_check {
    padding: 0.875rem 5.375rem;
    font-size: 1.25rem;
    margin-top: 1.875rem;
  }
}

@media screen and (max-width: 660px) {
  input {
    width: 60%;
  }
  .image_block {
    height: 61vw;
  }
  img {
    width: 88.5%;
    height: 100%;
  }
}

@media screen and (max-width: 380px) {
  h2 {
    font-size: 1rem;
  }
  .btn_check {
    font-size: 1rem;
    padding: 0.625rem 4.5rem;
  }
}
</style>
