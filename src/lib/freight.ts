export const FREIGHT_BASE_PRICES_KZ = {
  Bengo: 7000,
  Benguela: 7000,
  "Bié": 5000,
  Cabinda: 7000,
  Cuando: 7000,
  "Cuanza Norte": 7000,
  "Cuanza Sul": 7000,
  Cubango: 7000,
  Cunene: 7000,
  Huambo: 1500,
  "Huíla": 7000,
  "Icolo e Bengo": 7000,
  Luanda: 7000,
  "Lunda Norte": 7000,
  "Lunda Sul": 7000,
  Malanje: 7000,
  Moxico: 7000,
  "Moxico Leste": 7000,
  Namibe: 7000,
  "Uíge": 7000,
  Zaire: 7000,
} as const;

export type AngolaProvince = keyof typeof FREIGHT_BASE_PRICES_KZ;
export type FreightItemType = "NORMAL" | "FRAGIL" | "VOLUMOSO";

const ITEM_TYPE_MULTIPLIERS: Record<FreightItemType, number> = {
  NORMAL: 1,
  FRAGIL: 1.2,
  VOLUMOSO: 1.5,
};

export function calculateFreight(
  province: AngolaProvince,
  weightKg = 1,
  itemType: FreightItemType = "NORMAL",
): number {
  const validWeight = Number.isFinite(weightKg) && weightKg > 0 ? weightKg : 0.1;
  const amount =
    FREIGHT_BASE_PRICES_KZ[province] *
    validWeight *
    ITEM_TYPE_MULTIPLIERS[itemType];

  return Math.ceil(amount / 100) * 100;
}