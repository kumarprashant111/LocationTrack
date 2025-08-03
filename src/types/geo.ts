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
  region: string;
  category: string;
  address?: string;
  iconUrl?: string;
  link?: string;
  visitors: number;
  visitsLast7Days: number[];
};
