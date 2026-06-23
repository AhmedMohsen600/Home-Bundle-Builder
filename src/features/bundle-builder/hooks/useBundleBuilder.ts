import { useCallback, useMemo, useState } from 'react'
import {
  CHECKOUT_READY_MESSAGE,
  SAVED_SYSTEM_MESSAGE,
} from '../constants/bundleConstants'
import type { BundleCatalog, BundleProduct } from '../types/bundle.types'
import { getReviewGroups, getTotals } from '../utils/bundleCalculations'
import {
  getProductSelection as selectProduct,
  getStepSelectedCount as selectStepSelectedCount,
} from '../utils/bundleSelection'
import {
  setActiveStep as activateStep,
  setActiveVariant,
  setLineQuantity,
} from '../utils/bundleState'
import { useBundlePersistence } from './useBundlePersistence'

export function useBundleBuilder(catalog: BundleCatalog) {
  const { readStoredState, hasStoredState, saveState } =
    useBundlePersistence(catalog)
  const [state, setState] = useState(() => readStoredState())
  const [saveMessage, setSaveMessage] = useState(() =>
    hasStoredState() ? SAVED_SYSTEM_MESSAGE : '',
  )
  const [checkoutMessage, setCheckoutMessage] = useState('')

  const groups = useMemo(() => getReviewGroups(catalog, state), [catalog, state])
  const totals = useMemo(() => getTotals(groups), [groups])

  const setActiveStep = useCallback((stepId: string) => {
    setState((current) =>
      activateStep(current, current.activeStepId === stepId ? '' : stepId),
    )
  }, [])

  const goToNextStep = useCallback(
    (currentStepId: string) => {
      const currentIndex = catalog.steps.findIndex(
        (step) => step.id === currentStepId,
      )
      const nextStep = catalog.steps[currentIndex + 1]

      if (nextStep) {
        setState((current) => activateStep(current, nextStep.id))
      }
    },
    [catalog],
  )

  const setVariant = useCallback((productId: string, variantId: string) => {
    setState((current) => setActiveVariant(current, productId, variantId))
  }, [])

  const setQuantity = useCallback(
    (productId: string, variantId: string | undefined, quantity: number) => {
      setState((current) =>
        setLineQuantity(current, productId, variantId, quantity),
      )
      setSaveMessage('')
    },
    [],
  )

  const saveSystem = useCallback(() => {
    setSaveMessage(saveState(state))
  }, [saveState, state])

  const checkout = useCallback(() => {
    setCheckoutMessage(CHECKOUT_READY_MESSAGE)
  }, [])

  const getStepSelectedCount = useCallback(
    (stepId: string) => selectStepSelectedCount(catalog, state, stepId),
    [catalog, state],
  )

  const getProductSelection = useCallback(
    (product: BundleProduct) => selectProduct(product, state),
    [state],
  )

  return {
    state,
    groups,
    totals,
    saveMessage,
    checkoutMessage,
    setActiveStep,
    goToNextStep,
    setVariant,
    setQuantity,
    saveSystem,
    checkout,
    getStepSelectedCount,
    getProductSelection,
  }
}
