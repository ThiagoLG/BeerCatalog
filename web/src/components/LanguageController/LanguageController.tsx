import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import LanguageManager from "../../services/LanguageManager"
import Tooltip from "../CustomFormsComponents/Tooltip";
import { LanguageTypes } from '../../models/LanguageTypes.model';
import siteParams from '../../configs/params.json';

export default function LanguageController() {
  const [langFlag, setLangFlag] = useState<String>('');

  useEffect(() => {
    const lm = new LanguageManager().getActiveLanguage();

    console.log('lm ====> ', lm);

    setLangFlag(lm === 'pt-BR' ? '/intl_flag_usa.png' : '/intl_flag_brazil.png');
  }, [])

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function setLanguage(lang: LanguageTypes){
    sessionStorage.setItem(siteParams.localStorageKey, lang);
    location.reload;
      console.log('TEste', lang);
  }
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Image
              alt="Change language"
              src={langFlag as string || '/no-image.png'}
              width={30}
              height={30}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => setLanguage('en-US')}>
          <Image alt="Change language" src={'/intl_flag_usa.png'}
            width={15}
            height={15}
            style={{ marginRight: '10px' }}
          />English
        </MenuItem>
        <MenuItem onClick={() => setLanguage('pt-BR')}>
          <Image alt="Change language" src={'/intl_flag_brazil.png'}
            width={15}
            height={15}
            style={{ marginRight: '10px' }}
          />Portuguese
        </MenuItem>
      </Menu>
    </>
  );
}