import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage, useDark } from '@vueuse/core'
import { themes, codeThemes, applyCustomThemeSettings, THEME_KEY, CODE_THEME_KEY, LAST_LIGHT_THEME_KEY } from '@/config/themes'
import type { Theme, CodeTheme } from '@/types'

export const useThemeStore = defineStore('theme', () => {
  const storedTheme = useStorage(THEME_KEY, 'classic')
  const storedCodeTheme = useStorage(CODE_THEME_KEY, 'light')
  const lastLightTheme = useStorage(LAST_LIGHT_THEME_KEY, 'classic')
  const isDark = useDark()

  const currentThemeKey = computed({
    get: () => {
      const key = storedTheme.value
      return themes[key] ? key : 'classic'
    },
    set: (key: string) => {
      if (key !== 'night') {
        lastLightTheme.value = key
      }
      storedTheme.value = key
      isDark.value = key === 'night'
    },
  })

  const currentCodeThemeKey = computed({
    get: () => (codeThemes[storedCodeTheme.value] ? storedCodeTheme.value : 'light'),
    set: (key: string) => {
      storedCodeTheme.value = key
    },
  })

  const customTheme = ref<Theme>(applyCustomThemeSettings())

  const allThemes = computed(() => {
    const result: Record<string, Theme> = { ...themes }
    result.custom = customTheme.value
    return result
  })

  const currentTheme = computed(() => allThemes.value[currentThemeKey.value] || allThemes.value.classic)
  const currentCodeTheme = computed(() => codeThemes[currentCodeThemeKey.value] || codeThemes.light)
  const themeBase = computed(() => currentTheme.value.base)

  const setCustomTheme = (settings: Theme['base']) => {
    customTheme.value = {
      name: '我的主题',
      description: '根据你的配色、字号和行高保存。',
      base: settings,
    }
  }

  const resetCustomTheme = () => {
    customTheme.value = applyCustomThemeSettings()
  }

  const toggleDarkMode = () => {
    if (currentThemeKey.value === 'night') {
      const last = lastLightTheme.value
      currentThemeKey.value = themes[last] ? last : 'classic'
    } else {
      lastLightTheme.value = currentThemeKey.value
      currentThemeKey.value = 'night'
    }
  }

  return {
    currentThemeKey,
    currentCodeThemeKey,
    currentTheme,
    currentCodeTheme,
    themeBase,
    customTheme,
    allThemes,
    isDark,
    setCustomTheme,
    resetCustomTheme,
    toggleDarkMode,
  }
})
