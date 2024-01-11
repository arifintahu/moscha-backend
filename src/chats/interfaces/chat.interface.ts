export interface ActionItem {
  field: string;
  value: string | number | null;
}
export interface CreateChatResponse {
  id: number | null;
  message: string | null;
  actionItems: ActionItem[];
}
