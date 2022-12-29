import { ChangeEvent, SyntheticEvent } from "react";
import { FieldTypesEnum } from "../enums/FieldTypes.enum";
import { FieldTypes } from "../models/FieldTypes.model";

export class FormUtils {

  /**
   * Function responsible for get value of specific field and set the value to state
   * @param event HTML event of value change
   * @param field Name of specific field to get value (it advisable to use the same name as the Value property)
   * @param type Type of field (use FieldTypesEnum to set)
   * @param setFunction Set function of state that will store the data
   * @param newValue Optional new value (used in case of autocomplete fields)
   */
  getFieldValue(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SyntheticEvent<Element, Event>,
    field: string,
    type: FieldTypesEnum,
    setFunction: any,
    newValue?: any) {

    /*- Init current value as undefined -*/
    let value: FieldTypes = undefined;
    console.log(event);

    /*- Get value of changed field -*/
    switch (type) {
      case FieldTypesEnum.checkbox:
        value = (event.target as HTMLInputElement).checked;
        break;
      case FieldTypesEnum.text:
        value = (event.target as HTMLInputElement).value;
        break;
      case FieldTypesEnum.autoComplete:
        value = newValue
        break;
      default:
        console.error('nenhum tipo de campo definido');
        break;
    }

    /*- Set the value to field -*/
    setFunction((i: any) => {
      let newObject: any = i; //clone object
      newObject[field] = value; //set new prop value to object

      return ({ ...newObject }); //set the object to state
    });
  }
}