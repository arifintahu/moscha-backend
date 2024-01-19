export interface Action {
  name: string;
  url: string;
}
export interface ActionItem {
  field: string;
  value: string | number | null;
}
export interface CreateChatResponse {
  id: number | null;
  message: string | null;
  action: Action | null;
  actionItems: ActionItem[];
}
export interface Balance {
  denom: string;
  amount: number;
}
