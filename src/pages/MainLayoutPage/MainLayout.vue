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
      <FadeContent
        :blur="true"
        :duration="1000"
        :delay="200"
        :threshold="0.1"
        :initial-opacity="0"
        easing="ease-out"
        class-name="my-fade-content"
      >
        <StarBorder
          @click="CreateSheetRedirect"
          color="white"
          speed="2s"
          :thickness="10"
          style="width: 350px; margin-top: 20vh"
        >
          <h2>Novo personagem</h2>
          <p>Criar um personagem para uma nova campanha</p>
        </StarBorder>
      </FadeContent>
      <FadeContent
        :blur="true"
        :duration="1000"
        :delay="200"
        :threshold="0.1"
        :initial-opacity="0"
        easing="ease-out"
        class-name="my-fade-content"
      >
        <StarBorder color="white" speed="2s" :thickness="10" style="width: 350px; margin-top: 20vh">
          <h2>Meus Personagens</h2>
          <p>Visualizar lista e gerenciar personagens já criados</p>
        </StarBorder>
      </FadeContent>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PillNav from '@/component/PillNav/PillNav.vue'
import LightPillar from '@/component/LightPillar/LightPillar.vue'
import FadeContent from '@/component/FadeContent/FadeContent.vue'
import StarBorder from '@/component/StarBorder/StarBorder.vue'

const navItems = ref([
  { label: 'Home', href: '/main' },
  { label: 'Personagens', href: '/main' },
  { label: 'Downloads', href: '/downloads' },
  { label: 'Sair', href: '/' },
])

const router = useRouter()

function CreateSheetRedirect() {
  router.push('/createSheet')
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
  grid-template-columns: repeat(2, auto);
  justify-content: center;
  gap: 6rem;
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
