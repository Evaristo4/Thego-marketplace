export const FREIGHT_BASE_PRICES_KZ = {
  Bengo: 2500,
  Benguela: 7000,
  "Bié": 8000,
  Cabinda: 10000,
  Cuando: 11500,
  "Cuanza Norte": 3500,
  "Cuanza Sul": 4500,
  Cubango: 10000,
  Cunene: 9500,
  Huambo: 7500,
  "Huíla": 8500,
  "Icolo e Bengo": 2000,
  Luanda: 1500,
  "Lunda Norte": 9000,
  "Lunda Sul": 9500,
  Malanje: 4500,
  Moxico: 10000,
  "Moxico Leste": 12000,
  Namibe: 8500,
  "Uíge": 5500,
  Zaire: 6000,
} as const;

export type AngolaProvince = keyof typeof FREIGHT_BASE_PRICES_KZ;

export function calculateFreight(province: AngolaProvince): number {
  return FREIGHT_BASE_PRICES_KZ[province];
}