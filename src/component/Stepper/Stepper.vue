<template>
  <div
    class="stepper-root"
    :style="{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: '100%',
      height: 'auto',
      boxSizing: 'border-box',
      overflow: 'visible',
    }"
    v-bind="$attrs"
  >
    <div :class="stepCircleContainerClassName" :style="getCardStyle()">
      <div
        :class="stepContainerClassName"
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '800px',
          marginBottom: isCompleted ? '0' : '2rem',
        }"
      >
        <template v-for="(_, index) in stepsArray" :key="index + 1">
          <div
            v-if="!renderStepIndicator"
            @click="() => handleStepClick(index + 1)"
            :style="getStepCircleStyle(index + 1)"
          >
            <svg
              v-if="getStepStatus(index + 1) === 'complete'"
              fill="none"
              stroke="currentColor"
              :stroke-width="2"
              viewBox="0 0 24 24"
            >
              <Motion
                as="path"
                d="M5 13l4 4L19 7"
                stroke-linecap="round"
                stroke-linejoin="round"
                :initial="{ pathLength: 0, opacity: 0 }"
                :animate="
                  getStepStatus(index + 1) === 'complete'
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                "
              />
            </svg>
            <div
              v-else-if="getStepStatus(index + 1) === 'active'"
              class="h-3 w-3 rounded-full bg-black"
            />
            <span v-else class="text-sm">{{ index + 1 }}</span>
          </div>

          <component
            v-else
            :is="renderStepIndicator"
            :step="index + 1"
            :current-step="currentStep"
            :on-step-click="handleCustomStepClick"
          />

          <div
            v-if="index < totalSteps - 1"
            :style="{
              position: 'relative',
              marginLeft: '8px',
              marginRight: '8px',
              height: '2px',
              flex: '1',
              overflow: 'hidden',
              borderRadius: '9999px',
              backgroundColor: '#52525b',
            }"
          >
            <Motion
              as="div"
              :style="{ position: 'absolute', left: 0, top: 0, height: '100%' }"
              :initial="{ width: 0, backgroundColor: '#52525b' }"
              :animate="
                currentStep > index + 1
                  ? { width: '100%', backgroundColor: '#2106a7ff' }
                  : { width: 0, backgroundColor: '#52525b' }
              "
              :transition="{ type: 'spring', stiffness: 100, damping: 15, duration: 0.4 }"
            />
          </div>
        </template>
      </div>

      <Motion
        as="div"
        :class="contentClassName"
        :style="{
          width: '100%',
          position: 'relative',
          overflow: 'visible',
          marginBottom: isCompleted ? '0' : '2rem',
          color: '#eaeaea',
        }"
        :animate="{ height: isCompleted ? 0 : `${parentHeight + 1}px` }"
        :transition="{ type: 'spring', stiffness: 200, damping: 25, duration: 0.4 }"
      >
        <AnimatePresence :initial="false" mode="sync" :custom="direction">
          <Motion
            v-if="!isCompleted"
            ref="containerRef"
            as="div"
            :key="currentStep"
            :initial="getStepContentInitial()"
            :animate="{ x: '0%', opacity: 1 }"
            :exit="getStepContentExit()"
            :transition="{ type: 'tween', stiffness: 300, damping: 30, duration: 0.4 }"
            :style="{ position: 'absolute', left: 0, right: 0, top: 0 }"
          >
            <div ref="contentRef" v-if="slots.default && slots.default()[currentStep - 1]">
              <component :is="slots.default()[currentStep - 1]" />
            </div>
          </Motion>
        </AnimatePresence>
      </Motion>

      <div v-if="!isCompleted" :class="`w-full ${footerClassName}`">
        <div
          :style="{
            display: 'flex',
            width: '100%',
            justifyContent: currentStep !== 1 ? 'space-between' : 'flex-end',
          }"
        >
          <button
            v-if="currentStep !== 1"
            @click="handleBack"
            :disabled="backButtonProps?.disabled"
            class="stepper-action-btn"
            v-bind="backButtonProps"
          >
            {{ backButtonText }}
          </button>
          <button
            @click="isLastStep ? handleComplete() : handleNext()"
            :disabled="nextButtonProps?.disabled"
            class="stepper-action-btn"
          >
            {{ isLastStep ? 'Complete' : nextButtonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  useSlots,
  watch,
  onMounted,
  nextTick,
  useTemplateRef,
  type VNode,
  type ButtonHTMLAttributes,
  type Component,
} from 'vue'
import { Motion, AnimatePresence } from 'motion-v'

interface StepperProps {
  children?: VNode[]
  initialStep?: number
  onStepChange?: (step: number) => void
  onFinalStepCompleted?: () => void
  bordered?: boolean
  maxWidth?: string
  stepCircleContainerClassName?: string
  stepContainerClassName?: string
  contentClassName?: string
  footerClassName?: string
  backButtonProps?: ButtonHTMLAttributes
  nextButtonProps?: ButtonHTMLAttributes
  backButtonText?: string
  nextButtonText?: string
  disableStepIndicators?: boolean
  renderStepIndicator?: Component
  lockOnComplete?: boolean
}

const props = withDefaults(defineProps<StepperProps>(), {
  initialStep: 1,
  onStepChange: () => {},
  onFinalStepCompleted: () => {},
  bordered: true,
  maxWidth: '900px',
  stepCircleContainerClassName: '',
  stepContainerClassName: '',
  contentClassName: '',
  footerClassName: '',
  backButtonProps: () => ({}),
  nextButtonProps: () => ({}),
  backButtonText: 'Back',
  nextButtonText: 'Continue',
  disableStepIndicators: false,
  renderStepIndicator: undefined,
  lockOnComplete: true,
})

const slots = useSlots()
const currentStep = ref(props.initialStep)
const direction = ref(1)
const isCompleted = ref(false)
const parentHeight = ref(0)
const containerRef = useTemplateRef<HTMLDivElement>('containerRef')
const contentRef = useTemplateRef<HTMLDivElement>('contentRef')

const getCardStyle = () => ({
  width: '100%',
  maxWidth: props.maxWidth,
  padding: '24px',
  borderRadius: '16px',
  ...(props.bordered ? { border: '1px solid #222' } : {}),
})

const stepsArray = computed(() => slots.default?.() || [])
const totalSteps = computed(() => stepsArray.value.length)
const isLastStep = computed(() => currentStep.value === totalSteps.value)

const getStepStatus = (step: number) => {
  if (isCompleted.value || currentStep.value > step) return 'complete'
  if (currentStep.value === step) return 'active'
  return 'inactive'
}

const getStepIndicatorStyle = (step: number) => {
  const status = getStepStatus(step)
  switch (status) {
    case 'active':
    case 'complete':
      return { backgroundColor: '#2106a7ff', color: '#fff' }
    default:
      return { backgroundColor: '#222', color: '#a3a3a3' }
  }
}

const getStepCircleStyle = (step: number) => ({
  position: 'relative',
  outline: 'none',
  display: 'flex',
  height: '32px',
  width: '32px',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  fontWeight: 600,
  cursor: isCompleted.value && props.lockOnComplete ? 'default' : 'pointer',
  ...getStepIndicatorStyle(step),
})

const getStepContentInitial = () => ({
  x: direction.value >= 0 ? '-100%' : '100%',
  opacity: 0,
})

const getStepContentExit = () => ({
  x: direction.value >= 0 ? '50%' : '-50%',
  opacity: 0,
})

const handleStepClick = (step: number) => {
  if (isCompleted.value && props.lockOnComplete) return
  if (!props.disableStepIndicators) {
    direction.value = step > currentStep.value ? 1 : -1
    updateStep(step)
  }
}

const handleCustomStepClick = (clicked: number) => {
  if (isCompleted.value && props.lockOnComplete) return
  if (clicked !== currentStep.value && !props.disableStepIndicators) {
    direction.value = clicked > currentStep.value ? 1 : -1
    updateStep(clicked)
  }
}

const measureHeight = () => {
  nextTick(() => {
    if (contentRef.value) {
      const el = contentRef.value
      const firstChild = el.firstElementChild as HTMLElement | null
      const lastChild = el.lastElementChild as HTMLElement | null
      const mt = firstChild ? parseFloat(getComputedStyle(firstChild).marginTop || '0') : 0
      const mb = lastChild ? parseFloat(getComputedStyle(lastChild).marginBottom || '0') : 0
      const height = el.scrollHeight + mt + mb
      if (height > 0 && height !== parentHeight.value) {
        parentHeight.value = height
      }
    }
  })
}

const updateStep = (newStep: number) => {
  if (newStep >= 1 && newStep <= totalSteps.value) {
    currentStep.value = newStep
  }
}

const handleBack = () => {
  direction.value = -1
  updateStep(currentStep.value - 1)
}

const handleNext = () => {
  direction.value = 1
  updateStep(currentStep.value + 1)
}

const handleComplete = () => {
  isCompleted.value = true
  props.onFinalStepCompleted?.()
}

watch(currentStep, (newStep, oldStep) => {
  props.onStepChange?.(newStep)
  if (newStep !== oldStep && !isCompleted.value) {
    nextTick(measureHeight)
  } else if (!props.lockOnComplete && isCompleted.value) {
    isCompleted.value = false
    nextTick(measureHeight)
  }
})

onMounted(() => {
  if (props.initialStep !== 1) {
    currentStep.value = props.initialStep
  }
  measureHeight()
})
</script>

<style scoped>
.stepper-action-btn {
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
.stepper-action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.3);
  filter: brightness(1.05);
}
.stepper-action-btn:active {
  transform: translateY(0);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
}
</style>
