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
        text="Downloads"
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
                <th>Descrição</th>
                <th>Tamanho</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="file in files" :key="file.id">
                <td>{{ file.name }}</td>
                <td class="desc-cell">{{ file.desc }}</td>
                <td>{{ file.size }}</td>
                <td>
                  <button class="action-btn" @click="handleDownload(file)">Baixar</button>
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
  { label: 'Downloads', href: '/main' },
  { label: 'Sair', href: '/' },
])

const files = ref([
  { id: 1, name: 'Manual do Sistema', desc: 'Guia completo de uso e atalhos.', size: '1.2 MB' },
  { id: 2, name: 'Ficha de Personagem', desc: 'Modelo editável para campanhas.', size: '240 KB' },
  { id: 3, name: 'Mapa da Região', desc: 'Mapa detalhado em alta resolução.', size: '3.8 MB' },
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
