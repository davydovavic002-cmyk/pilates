export interface PricingSuggestion {
  planId: string;
  planName: string;
  totalLabel: string;
  perClass?: string;
  savings?: string;
  hint: string;
  compareDropIn: number;
}

const DROP_IN = 28;

/** Maps saved class count → best-matching studio pricing (semantic, not checkout). */
export function suggestPricing(classCount: number): PricingSuggestion | null {
  if (classCount <= 0) return null;

  const dropInTotal = classCount * DROP_IN;

  if (classCount === 1) {
    return {
      planId: 'drop-in',
      planName: 'Drop-in',
      totalLabel: '€28',
      perClass: '€28 / class',
      hint: 'Perfect for a single visit — equipment and tea included.',
      compareDropIn: dropInTotal,
    };
  }

  if (classCount === 2) {
    return {
      planId: 'drop-in',
      planName: 'Drop-in × 2',
      totalLabel: '€56',
      perClass: '€28 / class',
      hint: 'Save with Intro Bloom — 3 classes for €60 if you add one more.',
      compareDropIn: dropInTotal,
    };
  }

  if (classCount === 3) {
    return {
      planId: 'intro',
      planName: 'Intro Bloom',
      totalLabel: '€60',
      perClass: '€20 / class',
      savings: `You save €${dropInTotal - 60} vs drop-in`,
      hint: 'Three classes picked — Intro Bloom fits your plan exactly.',
      compareDropIn: dropInTotal,
    };
  }

  if (classCount <= 5) {
    const savings = dropInTotal - 125;
    return {
      planId: 'pack-5',
      planName: '5-Class Pack',
      totalLabel: '€125',
      perClass: '€25 / class',
      savings: savings > 0 ? `You save €${savings} vs drop-in` : undefined,
      hint: `${classCount} classes saved — a 5-pack covers your week with room to grow.`,
      compareDropIn: dropInTotal,
    };
  }

  if (classCount <= 9) {
    const savings = dropInTotal - 230;
    return {
      planId: 'pack-10',
      planName: '10-Class Pack',
      totalLabel: '€230',
      perClass: '€23 / class',
      savings: savings > 0 ? `You save €${savings} vs drop-in` : undefined,
      hint: `${classCount} classes — the 10-pack is our sweet spot for regular practice.`,
      compareDropIn: dropInTotal,
    };
  }

  return {
    planId: 'unlimited',
    planName: 'Unlimited Monthly',
    totalLabel: '€180',
    perClass: 'Unlimited visits',
    savings: `Drop-in would be €${dropInTotal}+`,
    hint: `${classCount} classes this week? Unlimited pays for itself.`,
    compareDropIn: dropInTotal,
  };
}
