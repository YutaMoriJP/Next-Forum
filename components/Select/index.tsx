import SelectStyled, { Label } from "../../styles/Select";

type OptionsProps = {
  value: string;
  name: string;
  id: string;
};

type SelectProps = {
  label: string;
  labelName: string;
  options: OptionsProps[];
  name?: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = ({ label, options, labelName, handleChange, ...rest }: SelectProps): JSX.Element => {
  return (
    <>
      <Label htmlFor={label}>{labelName}</Label>

      <SelectStyled id={label} onChange={handleChange} {...rest}>
        {options.map(
          ({ value, name, id }): JSX.Element => (
            <option key={id} value={value}>
              {name}
            </option>
          )
        )}
      </SelectStyled>
    </>
  );
};

export default Select;
