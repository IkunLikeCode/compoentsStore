export interface checkbox {
  disabled?: boolean;
  label?: string;
  indeterminate?: boolean;
  checked?: boolean;
}

export const checkboxEmits = {
  "update:checked": (value: boolean) => typeof value === "boolean",
  change: (value: boolean) => typeof value === "boolean",
};
