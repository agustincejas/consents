import { CheckboxProps } from "@mui/material";

interface CheckboxField extends CheckboxProps {
  label: string;
  value: string;
}

export const checkboxOptions: CheckboxField[] = [
  {
    label: "Receive newsletter",
    value: "newsletter",
  },
  {
    label: "Be shown targeted ads",
    value: "ads",
  },
  {
    label: "Contribute to anonymous visit statistics",
    value: "statistics",
  },
];

export const ConsentsLabels = {
  newsletter: "Receive newsletter",
  ads: "Be shown targeted ads",
  statistics: "Contribute to anonymous visit statistics",
};
