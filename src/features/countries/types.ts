export interface Country {
  slug: string;
  name: string;
  iso2: string;
  iso3: string;
  capital?: string;
  population?: number;
  gdpUsd?: number;
  region?: string;
}
