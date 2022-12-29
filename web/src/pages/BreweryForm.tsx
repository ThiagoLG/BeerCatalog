//#region IMPORTS
/*- Components -*/
import { useEffect, useState } from "react";
import { Grid, Switch, FormGroup, FormControlLabel, TextField, Autocomplete, Button, Box } from "@mui/material";
import Image from "next/image";
import InputFile from "../components/CustomFormsComponents/InputFile";
import FormContainer from "../components/CustomFormsComponents/FormContainer";
import Tooltip from "../components/CustomFormsComponents/Tooltip";
/*- Services -*/
import allCountries from "../data/countries.json";
import { FormUtils } from "../services/FormUtils";
import LanguageManager from "../services/LanguageManager";
import pageStrings from "../../public/internationalization/BreweriesCrud.json";
/*- Styles -*/
import styles from '../styles/InsertBreweryForm.module.scss';
import SaveIcon from '@mui/icons-material/Save';
/*- Models -*/
import { BreweryModel } from "../models/Brewery.model";
import { ContryModel } from "../models/Country.model";
import { LanguageTypes } from "../models/LanguageTypes.model";
import { FieldTypesEnum } from "../enums/FieldTypes.enum";
//#endregion

export default function BreweryForm() {
  //#region STATES - INSTANCES - VARIABLES
  const formUtils = new FormUtils();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageTypes>("pt-BR");
  const [item, setItem] = useState<BreweryModel>(
    {
      active: false,
      name: '',
      additionalInfos: '',
      countryOrigin: ''
    });
  const [countries, setCountries] = useState<ContryModel[]>([]);
  //#endregion 


  //#region CONTROL LANGUAGE
  /**
   * Function responsible for getCurrent selected language and define page strings
   */
  async function setLanguage() {
    setCurrentLanguage(new LanguageManager().getActiveLanguage());
  }
  //#endregion


  //#region INITIAL ACTIONS
  useEffect(() => {
    setLanguage();
    setCountries(allCountries[currentLanguage] as ContryModel[]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //#endregion


  //#region FORM ACTIONS
  /**
   * Function responsible for get state values and send to database
   */
  function sendItem() {
    console.log('item: ', item);
  }
  //#endregion

  
  //#region COMPONENT RENDER
  return (
    <FormContainer formTitle={pageStrings[currentLanguage].title.create} useNavbar>
      <>
        {/* Active Field */}
        <Grid lg={12} item>
          <div className={styles.colored}>
            <FormGroup>
              <Tooltip title={pageStrings[currentLanguage].form.active.description}>
                <FormControlLabel
                  control={<Switch checked={item.active}
                    name="active"
                    color="success"
                    value={item.active}
                    onChange={(e) => formUtils.getFieldValue(e, 'active', FieldTypesEnum.checkbox, setItem)} />}
                  label={pageStrings[currentLanguage].form.active.title}
                  sx={{ m: "auto" }}
                />
              </Tooltip>
            </FormGroup>
          </div>
        </Grid>
        {/* Name Field */}
        <Grid lg={7} item>
          <div className={styles.colored}>
            <Tooltip title={pageStrings[currentLanguage].form.name.description}>
              <TextField
                id="brewery-name"
                label={pageStrings[currentLanguage].form.name.title}
                variant="standard"
                fullWidth
                value={item.name}
                onChange={(e) => formUtils.getFieldValue(e, 'name', FieldTypesEnum.text, setItem)}
              />
            </Tooltip>

          </div>
        </Grid>
        {/* Country field */}
        <Grid lg={5} item>
          <div className={styles.colored}>
            <Tooltip title={pageStrings[currentLanguage].form.countryOrigin.description}>
              <Autocomplete
                getOptionLabel={(option: ContryModel) => option.name as string}
                options={countries}
                id="country-origin"
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
                  <TextField
                    {...params}
                    label={pageStrings[currentLanguage].form.countryOrigin.title}
                    variant="standard"
                    value={item.countryOrigin}
                  />
                )}
                onChange={(e, newValue) => formUtils.getFieldValue(e, 'countryOrigin', FieldTypesEnum.autoComplete, setItem, newValue)}
              />
            </Tooltip>

          </div>
        </Grid>
        {/* Additional Infos Field */}
        <Grid lg={12} item>
          <div className={styles.colored}>
            <Tooltip title={pageStrings[currentLanguage].form.additionalInfos.description}>
              <TextField
                id="additional-infos"
                label={pageStrings[currentLanguage].form.additionalInfos.title}
                fullWidth
                multiline
                maxRows={6}
                variant="standard"
                value={item.additionalInfos}
                onChange={(e) => formUtils.getFieldValue(e, 'additionalInfos', FieldTypesEnum.text, setItem)}
              />
            </Tooltip>
          </div>
        </Grid>
        {/* Upload Image Button */}
        <Grid lg={12} item>
          <div className={styles.colored}>
            <InputFile useCaptureButton showPreview />
          </div>
        </Grid>
        {/* Send Button */}
        <Grid lg={12} textAlign="center" mt={0} item>
          <div className={styles.colored}>

            <Button
              variant="contained"
              endIcon={<SaveIcon />}
              fullWidth
              onClick={sendItem}
              sx={{
                borderRadius: '5px 5px 55px 5px'
              }}
            >
              Save
            </Button>

          </div>
        </Grid>
      </>
    </FormContainer>
  )
  //#endregion
}