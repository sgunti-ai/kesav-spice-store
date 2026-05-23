export const CATALOG = {
  dryFruits: [
    { id: 'df1', name: 'Almonds (Premium)', priceKey: 'df1', image: 'https://placehold.co/600x500?text=Almonds', desc: 'Premium almonds sourced from best orchards.' },
    { id: 'df2', name: 'Cashew Nuts', priceKey: 'df2', image: 'https://placehold.co/600x500?text=Cashews', desc: 'Creamy cashews, fresh batch.' }
  ],
  spices: [
    { id: 'sp1', name: 'Premium High Quality Of Cloves', priceKey: 'sp1', image: 'https://placehold.co/600x500?text=Cloves', desc: 'Clove buds with powerful aroma.' },
    { id: 'sp2', name: 'Green Cardamom Elaichi', priceKey: 'sp2', image: 'https://placehold.co/600x500?text=Cardamom', desc: 'Aromatic green cardamom.' },
    { id: 'sp3', name: 'Black Cardamom Elaichi', priceKey: 'sp3', image: 'https://placehold.co/600x500?text=Black+Cardamom', desc: 'Smoky, robust black cardamom.' }
  ],
  seeds: [
    { id: 'sd1', name: 'Watermelon Seeds', priceKey: 'sd1', image: 'https://placehold.co/600x500?text=Seeds', desc: 'High-quality roasted seeds.' }
  ]
}

export const initialPrices = { df1: 1990, df2: 1850, sp1: 1990, sp2: 2100, sp3: 2790, sd1: 450 }

export async function fetchSimulatedPrices(){
  await new Promise(r => setTimeout(r, 120))
  const jitter = (base) => Math.max(50, Math.round(base * (1 + (Math.random()-0.5)*0.06)))
  const out = {}
  Object.keys(initialPrices).forEach(k => out[k] = jitter(initialPrices[k]))
  return out
}
