// Categorical colors are the dataviz skill's validated dark-mode slots 1-5,
// assigned in fixed order and reused for the same category across every bar.
export interface FocusCategory {
  id: string;
  label: string;
  color: string;
}

export const focusCategories: FocusCategory[] = [
  { id: 'pm', label: 'Project Managing', color: '#3987e5' },
  { id: 'swe', label: 'Software Engineering', color: '#d95926' },
  { id: 'analytics', label: 'Data Analytics', color: '#199e70' },
  { id: 'de', label: 'Data Engineering', color: '#c98500' },
  { id: 'ds', label: 'Data Science', color: '#d55181' },
];
