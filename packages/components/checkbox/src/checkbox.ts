export interface checkbox {
  disabled?: boolean;
  label?: string;
  indeterminate?: boolean;
  checked?: boolean;
}

export const checkboxEmits = {
  "update:checked": (value: boolean) => value,
  change: (value: boolean) => value,
};
