import { ReviewPanel } from "./components/ReviewPanel";
import { StepSection } from "./components/StepSection";
import catalogData from "./data/catalog.json";
import { useBundleBuilder } from "./hooks/useBundleBuilder";
import type { BundleCatalog } from "./types/bundle.types";

const defaultCatalog = catalogData as BundleCatalog;

interface BundleBuilderProps {
  catalog?: BundleCatalog;
}

export function BundleBuilder({
  catalog = defaultCatalog,
}: BundleBuilderProps) {
  const {
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
  } = useBundleBuilder(catalog);

  return (
    <main className="min-h-svh bg-white px-3 py-8 font-sans text-wyze-text sm:px-6 lg:px-7 lg:py-[46px]">
      <div className="mx-auto grid w-full max-w-[1094px] items-start gap-6 lg:grid-cols-[minmax(0,702px)_365px] lg:gap-[27px]">
        <section className="min-w-0" aria-label="Bundle builder">
          <div>
            {catalog.steps.map((step, index) => (
              <StepSection
                key={step.id}
                step={step}
                stepIndex={index}
                totalSteps={catalog.steps.length}
                selectedCount={getStepSelectedCount(step.id)}
                isOpen={state.activeStepId === step.id}
                getProductSelection={getProductSelection}
                onToggle={() => setActiveStep(step.id)}
                onNext={() => goToNextStep(step.id)}
                onSetVariant={setVariant}
                onSetQuantity={setQuantity}
              />
            ))}
          </div>
        </section>

        <ReviewPanel
          groups={groups}
          totals={totals}
          onSetQuantity={setQuantity}
          onSave={saveSystem}
          saveMessage={saveMessage}
          checkoutMessage={checkoutMessage}
          onCheckout={checkout}
        />
      </div>
    </main>
  );
}
