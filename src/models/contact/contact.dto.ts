export interface ContactDto {
  id?: string;
  naam: string;
  email: string;
  bedrijf?: string;
  bericht: string;
  website?: string;
  created_at?: Date;
}
