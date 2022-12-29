import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { InputFilePros } from "../../models/InputFileProps.model";
import Image from "next/image";
import { useState } from "react";
import styles from './InputFile.module.scss';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function InputFile(prop: InputFilePros) {
  //#region STATES
  const [selectedFile, setSelectedFile] = useState<File>();
  const [keys, setKeys] = useState<string[]>([Math.random().toString(36), Math.random().toString(36)])
  //#endregion

  function handleInputFile(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedFile(event?.target?.files?.length ? event.target.files[0] : undefined);
  }

  function removeSelectedImage() {
    setSelectedFile(undefined);
    resetInputFile();
  }

  function resetInputFile() {
    setKeys([
      Math.random().toString(36),
      Math.random().toString(36)
    ])
  }

  return (
    <Stack>
      {/* Buttons */}
      <Box sx={{ textAlign: 'center' }}>
        <Button variant="contained" component="label" endIcon={<AddPhotoAlternateIcon />}>
          Upload Image
          <input hidden accept="image/*" type="file" id='normal-button' onChange={handleInputFile} key={keys[0]} />
        </Button>
        {
          !prop.useCaptureButton ?
            null :
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              size="large">
              <input hidden accept="image/*" type="file" id='camera-button' onChange={handleInputFile} key={keys[1]} />
              <PhotoCamera />
            </IconButton>
        }
      </Box>

      {/* Image Preview */}
      {prop.showPreview ?
        <Box className={`${styles.imagePreview} ${selectedFile?.name ? styles.expanded : null}`}>
          <HighlightOffIcon className={styles.closeIcon} onClick={removeSelectedImage} />
          <Image
            alt={selectedFile?.name || ''}
            src={selectedFile ? URL.createObjectURL(selectedFile) : ''}
            width={150}
            height={150}
            style={{ opacity: selectedFile ? 1 : 0 }}
          />
        </Box>
        : null}

      {/* Filename Preview */}
      {prop.showPreview ?
        <Box className={`${styles.fileNamePreview} ${selectedFile?.name ? styles.expanded : null}`}>

          <Typography variant="body1" fontWeight={700} textAlign="center" mt={0}>
            {/* Selected File: <strong>{selectedFile?.name}</strong> */}
            {selectedFile?.name}
          </Typography>

        </Box>
        : null}

    </Stack>
  )
}