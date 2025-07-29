<script setup lang="ts">
interface HeaderModalsProps {
  isRegisterModalOpen: boolean
  isLoginModalOpen: boolean
  isForgotPasswordModalOpen: boolean
  authModalStore: any
}

defineProps<HeaderModalsProps>()
</script>

<template>
  <!-- Register Modal -->
  <Suspense>
    <template #default>
      <Transition name="modal-fade" appear>
        <LazyRegisterModal
          v-if="isRegisterModalOpen"
          :is-open="isRegisterModalOpen"
          @switch-to-login="authModalStore.openLogin()"
          @close="authModalStore.closeAll()"
        />
      </Transition>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>

  <!-- Login Modal -->
  <Suspense>
    <template #default>
      <Transition name="modal-fade" appear>
        <LazyLoginModal
          v-if="isLoginModalOpen"
          :is-open="isLoginModalOpen"
          @switch-to-forgot-password="authModalStore.openForgotPassword()"
          @switch-to-register="authModalStore.openRegister()"
          @close="authModalStore.closeAll()"
        />
      </Transition>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>

  <!-- Forgot Password Modal -->
  <Suspense>
    <template #default>
      <Transition name="modal-fade" appear>
        <LazyForgotPasswordModal
          v-if="isForgotPasswordModalOpen"
          :is-open="isForgotPasswordModalOpen"
          @switch-to-login="authModalStore.openLogin()"
          @close="authModalStore.closeAll()"
        />
      </Transition>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>