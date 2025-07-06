import { ContactDto } from '../../models/contact';

export interface ContactTableRow {
  id: string;
  naam: string;
  email: string;
  bedrijf?: string | null;
  bericht: string;
  website?: string | null;
  created_at: Date;
}

export interface IContactRepository {
  create(data: Omit<ContactDto, 'id' | 'created_at'>): Promise<ContactDto>;
  findById(id: string): Promise<ContactDto | null>;
  listAll(limit?: number, offset?: number): Promise<{ data: ContactDto[]; total: number }>;
}
