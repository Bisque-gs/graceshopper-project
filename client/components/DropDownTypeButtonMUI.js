import * as React from "react"
import { styled, alpha } from "@mui/material/styles"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import EditIcon from "@mui/icons-material/Edit"
import Divider from "@mui/material/Divider"
import ArchiveIcon from "@mui/icons-material/Archive"
import FileCopyIcon from "@mui/icons-material/FileCopy"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment"
import GrassIcon from "@mui/icons-material/Grass"
import BugReportIcon from "@mui/icons-material/BugReport"
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive"
import ScienceIcon from "@mui/icons-material/Science"
import ShieldIcon from "@mui/icons-material/Shield"
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt"
import WavesIcon from "@mui/icons-material/Waves"
import LandscapeIcon from "@mui/icons-material/Landscape"
import AllInclusiveIcon from "@mui/icons-material/AllInclusive"

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}))

export default function CustomizedMenus(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (evt) => {
    setAnchorEl(null)
    
    
    let { myValue } = evt.currentTarget.dataset
    if (myValue === undefined) myValue = "";
    console.log('why' , myValue)
    props.handleChange(myValue)
  }

  const selectAType = (evt) => {
    console.log("ebk", evt)
    props.handleChange(evt)
  }

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Pick a Type!
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={handleClose}
          data-my-value="grass"
          onChange={selectAType}
          disableRipple
        >
          <GrassIcon />
          Grass
        </MenuItem>
        <MenuItem onClick={handleClose} data-my-value="fire" disableRipple>
          <LocalFireDepartmentIcon />
          Fire
        </MenuItem>
        <MenuItem onClick={handleClose} data-my-value="bug" disableRipple>
          <BugReportIcon />
          Bug
        </MenuItem>
        <MenuItem onClick={handleClose} data-my-value="flying" disableRipple>
          <AirplanemodeActiveIcon />
          Flying
        </MenuItem>
        <MenuItem onClick={handleClose} data-my-value="poison" disableRipple>
          <ScienceIcon />
          Poison
        </MenuItem>
        <MenuItem onClick={handleClose} data-my-value="normal" disableRipple>
          <ShieldIcon />
          Normal
        </MenuItem>
        <MenuItem onClick={handleClose} data-my-value="electric" disableRipple>
          <ElectricBoltIcon />
          Electric
        </MenuItem>
        <MenuItem onClick={handleClose} data-my-value="water" disableRipple>
          <WavesIcon />
          Water
        </MenuItem>
        <MenuItem onClick={handleClose} data-my-value="ground" disableRipple>
          <LandscapeIcon />
          Ground
        </MenuItem>
        <MenuItem onClick={handleClose} data-my-value="" disableRipple>
          <AllInclusiveIcon />
          All
        </MenuItem>
      </StyledMenu>
    </div>
  )
}
