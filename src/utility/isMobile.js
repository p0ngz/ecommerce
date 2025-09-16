export const isNotMobileScreen = () => {
  if (typeof window === 'undefined') return true; 
  return window.innerWidth >= 640; 
}

