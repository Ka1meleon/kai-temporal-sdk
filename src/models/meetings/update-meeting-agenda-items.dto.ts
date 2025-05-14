import { User } from '@supabase/supabase-js';

/**
 * Definition of a meeting agenda item
 */
export interface UpdateMeetingAgendaItem {
  id: string;
  title: string;
  discussed: boolean;
  order?: number;
}

/**
 * Input parameters for the updateMeetingAgendaItems workflow
 */
export interface UpdateMeetingAgendaItemsDto {
  transcript: string;
  items: UpdateMeetingAgendaItem[];
}

/**
 * Parameters for the updateMeetingAgendaItems workflow function
 */
export interface UpdateMeetingAgendaItemsParams {
  user: User;
  input: UpdateMeetingAgendaItemsDto;
}

/**
 * Result of the updateMeetingAgendaItems workflow
 */
export interface UpdateMeetingAgendaItemsResponseDto {
  discussedItemIds: string[];
}
