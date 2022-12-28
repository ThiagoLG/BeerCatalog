import { useEffect, useState } from "react";
import {
  Grid, Container, Typography, Switch, FormGroup,
  FormControlLabel, TextField, Autocomplete, Button, Box, Tooltip, Zoom
} from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import LanguageManager from "../services/LanguageManager";
import styles from '../styles/InsertBreweryForm.module.scss';
import formStyles from '../styles/Forms.module.scss';
import pageStrings from "../../public/internationalization/BreweriesCrud.json";
import { LanguageTypes } from "../models/LanguageTypes.model";
import { BreweryModel } from "../models/Brewery.model";
import allCountries from "../data/countries.json";
import { ContryModel } from "../models/Country.model";
import SaveIcon from '@mui/icons-material/Save';
import Image from "next/image";


export default function InsertBreweryForm() {
  //#region STATES
  const [currentLanguage, setCurrentLanguage] = useState<LanguageTypes>("pt-BR");
  const [item, setItem] = useState<BreweryModel>({});
  const [countries, setCountries] = useState<ContryModel[]>([]);
  //#endregion 

  //#region CONTROL LANGUAGE
  async function setLanguage() {
    setCurrentLanguage(new LanguageManager().getActiveLanguage());
  }
  //#endregion

  /*- Initial Actions -*/
  useEffect(() => {
    setLanguage();
    setCountries(allCountries[currentLanguage] as ContryModel[]);
    console.log(countries);
  }, []);

  return (
    <div className={formStyles.backdrop}>
      <Navbar />
      <Container
        maxWidth="sm"
        sx={{
          mt: 2,
          p: 5,
          boxSizing: "border-box"
        }}
        className={formStyles.formContainer}>

        {/* Page Title */}
        <Grid container>
          <Grid lg={12}>
            <div className={styles.colored}>
              <Typography variant="h3" textAlign="center">
                {pageStrings[currentLanguage].title.create}
              </Typography>
            </div>
          </Grid>
        </Grid>

        {/* Form region */}
        <form>
          <Grid container sx={{ mt: 3 }}>
            {/* Active Field */}
            <Grid lg={12}>
              <div className={styles.colored}>

                <FormGroup>
                  <Tooltip
                    title={pageStrings[currentLanguage].form.active.description}
                    arrow
                    TransitionComponent={Zoom}
                    enterDelay={500} leaveDelay={200}>
                    <FormControlLabel
                      control={

                        <Switch checked={item.active} name="active" color="success" />
                      }
                      label={pageStrings[currentLanguage].form.active.title}
                    />
                  </Tooltip>
                </FormGroup>

              </div>
            </Grid>
            {/* Name Field */}
            <Grid lg={7}>
              <div className={styles.colored}>

                <TextField
                  id="brewery-name"
                  label={pageStrings[currentLanguage].form.name.title}
                  variant="standard"
                  fullWidth
                />

              </div>
            </Grid>
            {/* Country field */}
            <Grid lg={5}>
              <div className={styles.colored}>

                <Autocomplete
                  getOptionLabel={(option: ContryModel) => option.name as string}
                  options={countries}
                  id="clear-on-blur"
                  clearOnBlur
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <Image
                        alt={option.name as string}
                        src={`https://flagcdn.com/w20/${option.code?.toLowerCase()}.png`}
                        width={20}
                        height={12}
                      />
                      {option.code} - {option.name}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label={pageStrings[currentLanguage].form.countryOrigin.title} variant="standard" />
                  )}
                />

              </div>
            </Grid>
            {/* Additional Infos Field */}
            <Grid lg={12}>
              <div className={styles.colored}>
                <TextField
                  id="additional-infos"
                  label={pageStrings[currentLanguage].form.additionalInfos.title}
                  fullWidth
                  multiline
                  maxRows={6}
                  variant="standard"
                />
              </div>
            </Grid>
            {/* Send Button */}
            <Grid lg={12} textAlign="center">
              <div className={styles.colored}>

                <Button
                  variant="contained"
                  endIcon={<SaveIcon />}
                >
                  Save
                </Button>

              </div>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  )
}