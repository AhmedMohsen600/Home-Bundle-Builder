import { useCallback } from 'react'
import {
  BUNDLE_STORAGE_KEY,
  SAVED_SYSTEM_MESSAGE,
} from '../constants/bundleConstants'
import type { BundleCatalog, BundleState } from '../types/bundle.types'
import {
  createInitialBundleState,
  hydrateBundleState,
  serializeBundleState,
} from '../utils/bundleState'

export function useBundlePersistence(catalog: BundleCatalog) {
  const readStoredState = useCallback(() => {
    const storage = getStorage()
    const rawValue = storage?.getItem(BUNDLE_STORAGE_KEY)

    if (!rawValue) {
      return createInitialBundleState(catalog)
    }

    try {
      return hydrateBundleState(catalog, JSON.parse(rawValue))
    } catch {
      return createInitialBundleState(catalog)
    }
  }, [catalog])

  const hasStoredState = useCallback(() => {
    return Boolean(getStorage()?.getItem(BUNDLE_STORAGE_KEY))
  }, [])

  const saveState = useCallback((state: BundleState) => {
    getStorage()?.setItem(
      BUNDLE_STORAGE_KEY,
      JSON.stringify(serializeBundleState(state)),
    )

    return SAVED_SYSTEM_MESSAGE
  }, [])

  return {
    readStoredState,
    hasStoredState,
    saveState,
  }
}

function getStorage() {
  if (typeof window === 'undefined') {
    return undefined
  }

  return window.localStorage
}
