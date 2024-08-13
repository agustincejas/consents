import { CheckboxProps } from "@mui/material";

//TODO: can be moved to other place
interface CheckboxField extends CheckboxProps {
  label: string;
  value: string;
}
//TODO: can be moved to other place
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
