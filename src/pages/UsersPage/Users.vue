<template>
  <section class="main-layout">
    <div class="pillar-fixed">
      <LightPillar
        topColor="#2106a7ff"
        bottomColor="#fff"
        :intensity="1.0"
        :rotationSpeed="0.3"
        :glowAmount="0.005"
        :pillarWidth="3.0"
        :pillarHeight="0.4"
        :noiseIntensity="0.5"
        :pillarRotation="0"
        :interactive="false"
        mixBlendMode="normal"
      />
    </div>
    <PillNav logo="/favicon.ico" :items="navItems" className="pill-nav" />
    <div class="content">
      <BlurText
        text="Configurações"
        :delay="130"
        class-name="page-title"
        animate-by="letters"
        direction="top"
        :threshold="0.1"
        root-margin="0px"
        :step-duration="0.35"
      />
      <FadeContent
        :blur="true"
        :duration="1000"
        :delay="200"
        :threshold="0.1"
        :initial-opacity="0"
        easing="ease-out"
        class-name="my-fade-content"
      >
        <div class="downloads-table-wrap">
          <form class="settings-form" @submit.prevent="submitForm">
            <div class="form-row">
              <div class="avatar">
                <img v-if="avatarPreview" :src="avatarPreview" alt="Avatar" />
                <div v-else class="avatar-placeholder">Foto</div>
              </div>
              <div class="avatar-actions">
                <label class="file-btn">
                  Selecionar foto
                  <input type="file" accept="image/*" @change="onAvatarChange" />
                </label>
                <button type="button" class="action-btn" @click="removeAvatar">Remover</button>
              </div>
            </div>
            <div class="form-row">
              <label class="label">Nome de exibição</label>
              <input
                v-model="displayName"
                class="input"
                type="text"
                placeholder="Seu nome"
                required
              />
            </div>
            <div class="form-row">
              <label class="label">Senha atual</label>
              <input
                v-model="currentPassword"
                class="input"
                type="password"
                placeholder="Senha atual"
              />
            </div>
            <div class="form-row split">
              <div>
                <label class="label">Nova senha</label>
                <input
                  v-model="newPassword"
                  class="input"
                  type="password"
                  placeholder="Nova senha"
                />
              </div>
              <div>
                <label class="label">Confirmar senha</label>
                <input
                  v-model="confirmPassword"
                  class="input"
                  type="password"
                  placeholder="Confirmar senha"
                />
              </div>
            </div>
            <div v-if="errorMsg" class="error">{{ errorMsg }}</div>
            <div class="actions">
              <button class="action-btn" type="submit" :disabled="isSubmitting">
                {{ isSubmitting ? 'Salvando...' : 'Salvar alterações' }}
              </button>
            </div>
          </form>
        </div>
      </FadeContent>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import PillNav from '@/component/PillNav/PillNav.vue'
import LightPillar from '@/component/LightPillar/LightPillar.vue'
import FadeContent from '@/component/FadeContent/FadeContent.vue'
import BlurText from '@/component/BlurText/BlurText.vue'

const navItems = ref([
  { label: 'Home', href: '/main' },
  { label: 'Personagens', href: '/main' },
  { label: 'Downloads', href: '/downloads' },
  { label: 'Configurações', href: '/userConfig' },
  { label: 'Sair', href: '/' },
])

const displayName = ref('')
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const avatarPreview = ref('')
const isSubmitting = ref(false)
const errorMsg = ref('')

function onAvatarChange(e) {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    avatarPreview.value = String(reader.result || '')
  }
  reader.readAsDataURL(file)
}

function removeAvatar() {
  avatarPreview.value = ''
}

function submitForm() {
  errorMsg.value = ''
  if (newPassword.value || confirmPassword.value || currentPassword.value) {
    if (!currentPassword.value) {
      errorMsg.value = 'Informe a senha atual.'
      return
    }
    if (newPassword.value.length < 6) {
      errorMsg.value = 'A nova senha deve ter pelo menos 6 caracteres.'
      return
    }
    if (newPassword.value !== confirmPassword.value) {
      errorMsg.value = 'A confirmação de senha não confere.'
      return
    }
  }
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
  }, 800)
}
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  position: relative;
  overflow: visible;
}

.pillar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
}

.pill-nav {
  position: relative;
  z-index: 2;
}

.content {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  gap: 2rem;
  padding: 2rem 1rem;
  justify-items: center;
}

.card {
  width: 20%;
  margin: 0 auto;
}

.my-fade-content {
  width: auto;
}

.page-title {
  display: block;
  margin: 100px 0px 0px 0px;
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  color: #000;
}
.content[data-v-33b4df09] {
  height: 0;
  min-height: 0;
}

:where(.downloads-table-wrap) {
  width: min(900px, 92%);
  margin: 0 auto;
  background: rgba(8, 8, 12, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(6px) saturate(120%);
  overflow: hidden;
}

:where(.downloads-table) {
  width: 100%;
  border-collapse: collapse;
  color: #eaeaea;
  font-size: 0.95rem;
}

.downloads-table thead tr {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.03));
}

.downloads-table th,
.downloads-table td {
  padding: 14px 16px;
  text-align: left;
}

.downloads-table thead th {
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #fafafa;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.downloads-table tbody tr {
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  transition: background 180ms ease;
}

.downloads-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.04);
}

.downloads-table .desc-cell {
  color: #cfcfcf;
}

.settings-form {
  display: grid;
  gap: 16px;
  padding: 18px;
  color: #eaeaea;
}
.form-row {
  display: grid;
  gap: 8px;
}
.form-row.split {
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.label {
  font-size: 0.9rem;
  color: #fafafa;
}
.input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(16, 16, 20, 0.7);
  color: #eaeaea;
  outline: none;
}
.input::placeholder {
  color: #9e9e9e;
}
.avatar {
  display: flex;
  align-items: center;
  gap: 12px;
}
.avatar img,
.avatar-placeholder {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  background: rgba(255, 255, 255, 0.08);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #cfcfcf;
  font-weight: 600;
}
.avatar-actions {
  display: flex;
  gap: 10px;
}
.file-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  color: #0a0a0e;
  background: linear-gradient(180deg, #ffffff, #d8d8d8);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  position: relative;
  overflow: hidden;
}
.file-btn input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}
.error {
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(255, 95, 95, 0.12);
  color: #ff9090;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  color: #0a0a0e;
  background: linear-gradient(180deg, #ffffff, #d8d8d8);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  transition:
    transform 120ms ease,
    box-shadow 120ms ease,
    filter 120ms ease;
}

.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.3);
  filter: brightness(1.05);
}

.action-btn:active {
  transform: translateY(0);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
}

:deep(.star-border) {
  display: block;
  width: 350px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr;
  }
}
</style>
