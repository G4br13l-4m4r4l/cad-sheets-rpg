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
        text="Meus Personagens"
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
          <table class="downloads-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Classe</th>
                <th>Nível</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="file in files" :key="file.id">
                <td>{{ file.name }}</td>
                <td class="desc-cell">{{ file.class }}</td>
                <td>{{ file.lvl }}</td>
                <td>
                  <button class="action-btn" aria-label="Visualizar" title="Visualizar">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      aria-hidden="true"
                    >
                      <path
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                  <button class="action-btn success" aria-label="Baixar" title="Baixar">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      aria-hidden="true"
                    >
                      <path d="M12 3v11" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M8 12l4 4 4-4" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M5 21h14" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>
                  <button class="action-btn danger" aria-label="Deletar" title="Deletar">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      aria-hidden="true"
                    >
                      <path d="M3 6h18" stroke-linecap="round" stroke-linejoin="round" />
                      <path
                        d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path d="M10 11v6" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M14 11v6" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M9 6V4h6v2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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

const files = ref([
  { id: 1, name: 'Classy', class: 'Mago', lvl: '1' },
  { id: 2, name: 'Fulaninho', class: 'Guerreiro', lvl: '1' },
  { id: 3, name: 'Sneaky', class: 'Bruxo', lvl: '5' },
])

function handleDownload(file) {
  console.log('Baixar:', file.name)
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
  width: min(1200px, 100%);
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

.downloads-table thead th:nth-child(3),
.downloads-table tbody td:nth-child(3) {
  text-align: center;
}

.downloads-table thead th:nth-child(4),
.downloads-table tbody td:nth-child(4) {
  text-align: center;
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

.action-btn.danger {
  color: #fff;
  background: linear-gradient(180deg, #ff5b5b, #d94b4b);
}

.action-btn.success {
  color: #fff;
  background: linear-gradient(180deg, #59c36a, #44a85a);
}

.action-btn:not(:last-child) {
  margin-right: 10px;
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
