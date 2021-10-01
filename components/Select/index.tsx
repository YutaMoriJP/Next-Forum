import SelectStyled from "../../styles/Select";

type OptionsProps = {
  value: string;
  name: string;
  id: string;
};

type SelectProps = {
  label: string;
  labelName: string;
  options: OptionsProps[];
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
} & React.ComponentProps<"select">;

const Select = ({
  label,
  options,
  labelName,
  handleChange,
  ...rest
}: SelectProps): JSX.Element => {
  return (
    <>
      <label
        htmlFor={label}
        style={{ textAlign: "center", fontSize: "0.9rem", color: "#656f79" }}
      >
        {labelName}
      </label>
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
