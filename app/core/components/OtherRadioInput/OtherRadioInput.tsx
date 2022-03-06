import React, { ChangeEvent, useState } from "react";
import {
  Box,
  FormControlLabel,
  FormLabel,
  Radio,
  TextField,
} from "@mui/material";

export type OtherInputProps = {
  name: string;
  onChange: (event: ChangeEvent<any>) => void;
  label: string;
}

export const OtherInput = ({
  name,
  onChange,
  label,
}: OtherInputProps) => {
  const [otherInfo, setOtherInfo] = useState('');

  return (
    <FormControlLabel
      control={
        <Radio
          name={name}
          onChange={onChange}
          value={otherInfo}
        />
      }
      label={(
        <Box
          display="flex"
          alignItems="center"
        >
          <FormLabel>{label}</FormLabel>
          <Box ml={2}>
            <TextField
              name={name}
              onClick={onChange}
              onChange={(event) => {
                setOtherInfo(event.currentTarget.value)
                onChange(event as ChangeEvent<HTMLInputElement>)
              }}
              variant="standard"
              margin="none"
            />
          </Box>
        </Box>
      )}
    />
  );
}
