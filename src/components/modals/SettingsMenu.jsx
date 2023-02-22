import { Menu, MenuItem } from '@mui/material'
import React from 'react'

const SettingsMenu = (props) => {
  const {setOpenAdvertisementModal, ...otherProps} = props
  return (
    <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        {...otherProps}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => setOpenAdvertisementModal(true)}>Editar Curs</MenuItem>
      </Menu>
  )
}

export default SettingsMenu