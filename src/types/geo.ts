export type Location = {
  id: string;
  name: string;
  coords: [number, number];
  visitors: number;
  region: string;
  category: string;
};

export type ExternalLocation = {
  id: string;
  name: string;
  coords: [number, number];
  visitors: number;
  region: string;
  category: string;
  visitsLast7Days: number[]; // ✅ Add this field
};

