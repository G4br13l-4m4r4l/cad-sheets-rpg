<template>
  <ClickSpark>
    <section class="login-page">
      <AnimatedContent className="login-card" :duration="2">
        <div class="nes-container with-title is-dark login-card">
          <p class="title">Login</p>
          <form @submit.prevent="onSubmit">
            <div class="nes-field">
              <label for="username">Usuário</label>
              <input
                id="username"
                type="text"
                v-model="username"
                class="nes-input"
                placeholder="Digite seu usuário"
                required
              />
            </div>
            <div class="nes-field">
              <label for="password">Senha</label>
              <input
                id="password"
                type="password"
                v-model="password"
                class="nes-input"
                placeholder="Digite sua senha"
                required
              />
            </div>
            <div class="actions">
              <button
                type="submit"
                class="nes-btn is-primary"
                :class="{ 'is-disabled': isLoading }"
                :disabled="isLoading"
              >
                <span v-if="!isLoading">Entrar</span>
                <span v-else class="btn-loading">
                  <span class="loader"></span>
                  Carregando...
                </span>
              </button>
            </div>
          </form>
        </div>
      </AnimatedContent>
    </section>
  </ClickSpark>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AnimatedContent from '@/component/AnimatedContent/AnimatedContent.vue'
import ClickSpark from '@/component/ClickSpark/ClickSpark.vue'

const username = ref('')
const password = ref('')
const isLoading = ref(false)
const router = useRouter()

async function onSubmit() {
  if (isLoading.value) return
  isLoading.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 800))
    if (username.value && password.value) {
      if (username.value == 'teste' && password.value == 'tes2301') {
        console.log('Login success')
        router.push({ name: 'MainLayout' })
      }
    }
  } catch (e) {
    console.error('Login error:', e)
  }
  // finally {
  //   isLoading.value = false
  // }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  padding: 1rem;
}

.login-card {
  width: 100%;
  max-width: 380px;
}

.actions {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.btn-loading {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.loader {
  width: 14px;
  height: 14px;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
