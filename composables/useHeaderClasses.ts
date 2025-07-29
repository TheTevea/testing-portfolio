
export function useHeaderClasses(isScrolled: Ref<boolean>, isNotHome: boolean, isMenuOpen: Ref<boolean>) {
  const headerClasses = computed(() => [
    'fixed top-0 left-0 w-full z-40 transition-all duration-300',
    isScrolled.value || isNotHome || isMenuOpen.value 
      ? 'py-3 bg-white/85 backdrop-blur-md shadow-md' 
      : 'py-5',
    isNotHome ? 'sticky' : ''
  ])

  const logoTextClasses = computed(() => [
    'max-sm:hidden sm:text-[22px] font-bold transition-all duration-300 tracking-tighter',
    isScrolled.value || isNotHome || isMenuOpen.value 
      ? 'text-primary' 
      : 'text-white'
  ])

  const navigationClasses = computed(() => [
    'xl:flex gap-4 md:gap-6 transition-all duration-300',
    isMenuOpen.value 
      ? 'flex absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-md flex-col opacity-100 p-5 shadow-lg rounded-b-2xl' 
      : 'max-xl:sr-only max-lg:opacity-0'
  ])

  const hamburgerClasses = computed(() => [
    'block h-0.5 w-full rounded-sm transition-all duration-300',
    isScrolled.value || isNotHome || isMenuOpen.value 
      ? 'bg-primary' 
      : 'bg-white'
  ])

  return {
    headerClasses,
    logoTextClasses,
    navigationClasses,
    hamburgerClasses
  }
}