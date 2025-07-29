import { useScroll, useWindowSize } from '@vueuse/core'
import { useClientMenu } from './useClientMenu'
import { useAuthModalStore } from '~/stores/authModalStore'
import { useUserStore } from '~/stores/userStore'
import { hasAuthMiddleware } from '~/utils/auth'
import { CircleCheck } from 'lucide-vue-next'
import { useToast } from '~/components/ui/toast'

export function useHeader() {
  // Composables
  const { toast } = useToast()
  const { logo, routes } = useClientMenu()
  const userStore = useUserStore()
  const authModalStore = useAuthModalStore()
  const route = useRoute()
  const router = useRouter()

  // Reactive state
  const isMyAccountOpen = ref(false)
  const isMenuOpen = ref(false)

  // Computed properties
  const isRegisterModalOpen = computed({
    get: () => authModalStore.isRegisterOpen,
    set: (val) => (authModalStore.isRegisterOpen = val)
  })

  const isLoginModalOpen = computed({
    get: () => authModalStore.isLoginOpen,
    set: (val) => (authModalStore.isLoginOpen = val)
  })

  const isForgotPasswordModalOpen = computed({
    get: () => authModalStore.isForgotPasswordOpen,
    set: (val) => (authModalStore.isForgotPasswordOpen = val)
  })

  // Window size handling
  const { width } = useWindowSize()

  watch(width, (newWidth) => {
    if (newWidth > 768) {
      isMenuOpen.value = false
    }
  })

  // Scroll handling
  const { y } = useScroll(document)
  const isScrolled = computed(() => y.value > 50)

  // Methods
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  const toggleRegisterModal = () => {
    isMenuOpen.value = false
    isRegisterModalOpen.value = !isRegisterModalOpen.value
  }

  const handleLogout = async () => {
    try {
      userStore.clearUser()
      if (isMenuOpen.value) {
        isMenuOpen.value = false
      }
      
      if (hasAuthMiddleware(route)) {
        await router.push('/')
      }
      
      toast({
        title: 'Sign out successful!',
        icon: h(CircleCheck, { class: 'w-5 h-5 text-green-600 mr-2' }),
        class: 'text-sm text-gray-700 py-3.5 px-5'
      })
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  // Modal preloading
  const preloadRegisterModal = () => import('~/components/page-partials/auth/RegisterModal.vue')
  const preloadLoginModal = () => import('~/components/page-partials/auth/LoginModal.vue')
  const preloadForgotPasswordModal = () => import('~/components/page-partials/auth/ForgotPasswordModal.vue')

  // Lifecycle
  onMounted(() => {
    preloadRegisterModal()
    preloadLoginModal()
    preloadForgotPasswordModal()
    
    if (route.query.openLoginModal === '1') {
      authModalStore.openLogin()
      router.replace({ query: { ...route.query, openLoginModal: undefined } })
    }
  })

  return {
    // State
    isMyAccountOpen,
    isMenuOpen,
    isScrolled,
    logo,
    routes,
    
    // Computed
    isRegisterModalOpen,
    isLoginModalOpen,
    isForgotPasswordModalOpen,
    
    // Methods
    toggleMenu,
    toggleRegisterModal,
    handleLogout,
    
    // Store
    userStore,
    authModalStore
  }
}