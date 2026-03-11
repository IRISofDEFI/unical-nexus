export interface FeeItem {
  id: string;
  name: string;
  amount: number;
  description?: string;
}

const MOCK_FEE_ITEMS: FeeItem[] = [
  { id: "1", name: "Acceptance Fee", amount: 25000, description: "For new students" },
  { id: "2", name: "Tuition Fee - Science", amount: 45000, description: "Per session" },
  { id: "3", name: "Late Registration", amount: 5000, description: "Penalty for late registration" },
];

export const getFeeItems = async (): Promise<FeeItem[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_FEE_ITEMS;
};