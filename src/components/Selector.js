import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";

const Selector = ({ holder, items }) => {
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };
  return (
    <Box style={{ marginLeft: "6%" }} sx={{ minWidth: 80, maxWidth: 160 }}>
      <FormControl fullWidth>
        <InputLabel id="simple-select-label">{holder}</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={value}
          label={holder}
          onChange={handleChange}
        >
          {items &&
            items.map((value) => (
              <MenuItem key={value} value={value.toLowerCase()}>
                {value}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Selector;
