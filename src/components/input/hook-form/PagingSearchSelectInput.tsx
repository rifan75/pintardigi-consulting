import { FormControl, FormHelperText } from "@mui/material";
import { useController } from "react-hook-form";
import { GroupBase, StylesConfig  } from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";
import { FormInputProps } from ".";

interface SearchableSelectInputProps extends FormInputProps {
  options: ReadonlyArray<any>;
  isFetching?: boolean;
  onInputChange?: (v: any) => void;
  styles?: StylesConfig<any, false, GroupBase<any>> | undefined;
  page: number;
  hasMore: boolean;
}

export const PagingSearchSelectInput = ({
  options,
  control,
  name,
  placeHolder,
  isFetching,
  onInputChange,
  styles,
  page,
  hasMore,
}: SearchableSelectInputProps) => {
  const { field, fieldState } = useController({ name, control });
  const { error } = fieldState;

  const loadOptions = async (search:string, loadedOptions:ReadonlyArray<any>, additional: { page: number } = { page: 1 }) => {
    return {
      options: options,
      hasMore: hasMore,
    //   additional: {
    //     page: search ? 2 : page + 1,
    //   },
    };
  };

  return (
    <FormControl fullWidth error={Boolean(error)}>
      <AsyncPaginate
        // key={JSON.stringify(regionName)}
        // styles={styles}
        value={field.value}
        loadOptions={loadOptions}
        getOptionValue={(option) => option.name}
        getOptionLabel={(option) => option.name+' - '+option.procurement_name}
        onChange={field.onChange}
        onInputChange={onInputChange}
        isSearchable={true}
        isLoading={isFetching}
        loadingMessage={() => {
          return "Sedang Mencari...";
        }}
        noOptionsMessage={() => {
          return "Data Tidak Ditemukan";
        }}
        placeholder={placeHolder}
        additional={{
          page: 1,
        }}
      />
      {Boolean(error) && <FormHelperText sx={{ color: "red", mx: 0 }}>{error?.message}</FormHelperText>}
    </FormControl>
  );
};

// export default SearchableSelectInput;
