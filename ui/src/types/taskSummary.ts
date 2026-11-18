export type SummaryCardType = {
    category: 'Total' | 'Completed' | 'Pending';
    count: number;
    icon?: string;
    iconColor?: string;
    bgColor?: string;
}