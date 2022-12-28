import { Container, Grid, Typography } from '@mui/material';
import { FormContainerProps } from '../../models/FormContainerProps.model';
import Navbar from '../Navbar/Navbar';
import formStyles from './Forms.module.scss';

export default function FormContainer(prop: FormContainerProps) {
  return (
    <div className={formStyles.backdrop}>

      {/* Control Navbar showing */}
      {prop.useNavbar ? <Navbar /> : null}

      <Container
        maxWidth="sm"
        sx={{
          mt: 2,
          p: 5,
          boxSizing: "border-box"
        }}
        className={formStyles.formContainer}
      >

        {/* Page Title */}
        <Grid container>
          {prop.customTitleNode ?
            prop.customTitleNode :
            <Grid lg={12}>
              <div className={formStyles.gridItemRegion}>
                <Typography variant="h3" textAlign="center">
                  {prop.formTitle}
                </Typography>
              </div>
            </Grid>
          }
        </Grid>

        {/* Form region */}
        <form>
          <Grid container sx={{ mt: 3 }}>
            {prop.children}
          </Grid>
        </form>


      </Container>

    </div>
  )
}