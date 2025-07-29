<script setup lang="ts">
import { ChevronRight, ChevronDown } from 'lucide-vue-next'
import { useHeader } from '~/composables/useHeader'
import { useHeaderClasses } from '~/composables/useHeaderClasses'

// Types
interface HeaderProps {
  rootStyle?: string
  mobileRootStyle?: string
  activeRoute?: string
  activeText?: string
  inactiveText?: string
  authLinkClass?: string
  isNotHome?: boolean
}

// Props with defaults
const props = withDefaults(defineProps<HeaderProps>(), {
  rootStyle: 'fixed top-0 left-0 w-full z-50 transition-all duration-300',
  mobileRootStyle: 'md:hidden sticky left-0 top-0 z-50',
  activeRoute: 'text-primary-500',
  activeText: 'text-gray-50',
  inactiveText: 'text-gray-400',
  authLinkClass: '',
  isNotHome: false
})

// Composables
const {
  isMyAccountOpen,
  isMenuOpen,
  isScrolled,
  logo,
  routes,
  isRegisterModalOpen,
  isLoginModalOpen,
  isForgotPasswordModalOpen,
  toggleMenu,
  toggleRegisterModal,
  handleLogout,
  userStore,
  authModalStore
} = useHeader()

const {
  headerClasses,
  logoTextClasses,
  navigationClasses,
  hamburgerClasses
} = useHeaderClasses(isScrolled, props.isNotHome, isMenuOpen)
</script>

<template>
  <header :class="headerClasses">
    <div class="container">
      <nav class="flex justify-between items-center h-[60px]">
        <!-- Logo Section -->
        <NuxtLink to="/" class="flex items-center">
          <BaseImage
            :src="logo"
            alt="Travel Logo"
            class="w-[38px] h-[38px] mr-2.5 transition-all duration-300"
          />
          <span :class="logoTextClasses">
            Olongpich Express
          </span>
        </NuxtLink>

        <!-- Navigation Section -->
        <div :class="navigationClasses">
          <ClientOnly>
            <NavigationLinks 
              @close-menu="isMenuOpen = false"
              :is-scrolled="isScrolled || props.isNotHome || isMenuOpen"
              :routes="routes"
            />
            
            <!-- Mobile Auth Buttons -->
            <Button
              v-if="!userStore.isAuthenticated"
              @click="toggleRegisterModal"
              class="flex md:hidden bg-transparent text-gray-800 hover:bg-primary/5 hover:text-primary justify-start items-center h-auto gap-1.5 font-medium text-sm rounded-full py-1.5 px-3.5 transition-all duration-300 shadow-md hover:-translate-y-0.5 shadow-none"
            >
              Register <i class="fas fa-arrow-right text-xs"></i>
            </Button>
            
            <!-- Mobile Account Menu -->
            <Collapsible v-model:open="isMyAccountOpen" class="md:hidden" v-else>
              <CollapsibleTrigger class="w-full mb-4 md:mb-6">
                <Button class="flex bg-transparent text-gray-800 hover:bg-primary/5 hover:text-primary justify-start items-center !w-full h-auto gap-1.5 font-medium text-sm rounded-full py-1.5 px-3.5 transition-all duration-300 shadow-md hover:-translate-y-0.5 shadow-none">
                  <ChevronRight v-if="!isMyAccountOpen" class="-ms-1" />
                  <ChevronDown v-else class="-ms-1" />
                  {{ $t('menu.my_account') }} <i class="fas fa-arrow-right text-xs"></i>
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent class="mb-4 md:mb-6">
                <NuxtLink
                  prefetch-on="interaction"
                  class="px-8 text-sm"
                  to="/account/profile"
                  @click="toggleMenu"
                >
                  {{ $t('menu.profile') }}
                </NuxtLink>
              </CollapsibleContent>
              
              <CollapsibleContent>
                <Button
                  @click="handleLogout"
                  prefetch-on="interaction"
                  class="px-8 text-sm h-auto bg-transparent text-gray-800 hover:bg-primary/5 hover:text-primary"
                >
                  {{ $t('menu.logout') }}
                </Button>
              </CollapsibleContent>
            </Collapsible>
          </ClientOnly>
        </div>

        <!-- Right Section -->
        <div class="flex items-center gap-4">
          <LanguageSwitcher :is-scrolled="isScrolled || props.isNotHome || isMenuOpen" />

          <ClientOnly>
            <AccountActions
              :is-scrolled="isScrolled"
              :is-not-home="props.isNotHome"
              :is-menu-open="isMenuOpen"
              :is-authenticated="userStore.isAuthenticated"
              @register="isRegisterModalOpen = true"
              @logout="handleLogout"
            />
          </ClientOnly>
          
          <!-- Hamburger Menu -->
          <div
            class="flex flex-col justify-between w-6 h-[18px] cursor-pointer xl:hidden"
            @click="toggleMenu"
          >
            <span
              v-for="i in 3"
              :key="i"
              :class="hamburgerClasses"
            />
          </div>
        </div>
      </nav>
    </div>

    <!-- Modal Components -->
    <HeaderModals
      :is-register-modal-open="isRegisterModalOpen"
      :is-login-modal-open="isLoginModalOpen"
      :is-forgot-password-modal-open="isForgotPasswordModalOpen"
      :auth-modal-store="authModalStore"
    />
  </header>
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