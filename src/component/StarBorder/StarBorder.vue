<template>
  <component
    :is="as"
    :class="['star-border', customClass]"
    v-bind="restAttrs"
    :style="componentStyle"
  >
    <div
      class="star-gradient star-gradient-bottom animate-star-movement-bottom"
      :style="{
        background: `radial-gradient(circle, ${color}, transparent 10%)`,
        animationDuration: speed,
      }"
    />

    <div
      class="star-gradient star-gradient-top animate-star-movement-top"
      :style="{
        background: `radial-gradient(circle, ${color}, transparent 10%)`,
        animationDuration: speed,
      }"
    />

    <div class="star-content">
      <slot />
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed, defineProps, useAttrs } from 'vue'

interface StarBorderProps {
  as?: string
  customClass?: string
  color?: string
  speed?: string
  thickness?: number
}

const props = withDefaults(defineProps<StarBorderProps>(), {
  as: 'button',
  customClass: '',
  color: 'white',
  speed: '6s',
  thickness: 1,
})

const restAttrs = useAttrs()

const componentStyle = computed(() => {
  const base = {
    padding: `${props.thickness}px 0`,
  }
  const userStyle = (restAttrs.style as Record<string, string>) || {}
  return { ...base, ...userStyle }
})
</script>

<style scoped>
.star-border {
  position: relative;
  display: inline-block;
  overflow: hidden;
  background: transparent;
  border: none;
  border-radius: 20px;
}

.star-gradient {
  position: absolute;
  width: 300%;
  height: 50%;
  opacity: 0.7;
  border-radius: 9999px;
  z-index: 0;
}
.star-gradient-bottom {
  bottom: -11px;
  right: -250%;
}
.star-gradient-top {
  top: -10px;
  left: -250%;
}

.star-content {
  position: relative;
  z-index: 10;
  border: 1px solid #333;
  background: #0b0b0b;
  color: #fff;
  font-size: 16px;
  text-align: center;
  padding: 24px 64px;
  border-radius: 20px;
}

@keyframes star-movement-bottom {
  0% {
    transform: translate(0%, 0%);
    opacity: 1;
  }

  100% {
    transform: translate(-100%, 0%);
    opacity: 0;
  }
}

@keyframes star-movement-top {
  0% {
    transform: translate(0%, 0%);
    opacity: 1;
  }

  100% {
    transform: translate(100%, 0%);
    opacity: 0;
  }
}

.animate-star-movement-bottom {
  animation: star-movement-bottom linear infinite alternate;
}

.animate-star-movement-top {
  animation: star-movement-top linear infinite alternate;
}
</style>
