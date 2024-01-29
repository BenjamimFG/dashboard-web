import { useState } from "react";
import { Button, Popover } from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import './ButtonPopover.css';

export default function ButtonPopover({ children, id, buttonLabel, sx }) {
  const [anchorPopover, setAnchorPopover] = useState(null);

  const handleClickPopover = (event) => {
    setAnchorPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorPopover(null);
  };

  const open = Boolean(anchorPopover);

  return (<>
    <Button
      aria-describedby={open ? 'simple-popover' : undefined}
      variant="contained"
      onClick={handleClickPopover}
      className='button-popover'
      id={id}
      sx={sx}
    >
      {buttonLabel}
      {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
    </Button>
    <Popover
      className='popover'
      id={open ? 'simple-popover' : undefined}
      open={open}
      anchorEl={anchorPopover}
      onClose={handleClosePopover}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      {children}
    </Popover>
  </>);
}