import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectOption } from "@/interfaces/input";
import { Typography } from "@mui/material";

interface ISortFilterInputProps {
  onChange: (e: any) => void;
  options: SelectOption[];
  width: number | any;
  height?: number | any;
  value: string | any;
  label: string;
}

const SortFilterInput = ({ onChange, options, width, value, label, height }: Partial<ISortFilterInputProps>) => {
  return (
    <FormControl sx={{ width: width, height: height }}>
      <InputLabel
        id="sort-filter-input"
        sx={{ color: "text.primary" }} // Change text color to primary text color
      >
        {label}
      </InputLabel>
      <Select label={label} labelId="sort-filter-input" onChange={onChange} value={value} sx={{ height: height }}>
        {options?.map((value: any, i) => {
          return (
            <MenuItem key={i} value={value.value}>
              {value.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SortFilterInput;
