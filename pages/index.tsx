import type { NextPage } from 'next'
import Head from 'next/head'
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import {
  TextField,
} from 'formik-mui';

const validationMessages = {
  required: 'Pole wymagane',
  email: 'Nieprawidłowy email',
  zipCode: 'Kod pocztowy musi mieć format 00-000',
  url: 'Nieprawidłowy adres internetowy',
}

const initialValues = {
  fullName: '',
  age: '',
  zipCode: '',
  city: '',
  commune: '',
  district: '',
  voivodeship: '',
  phone: '',
  email: '',
  facebook: '',
  organization: '',
  qualifications: '',
  helpType: '',
  travelTimeAvailable: '',
  canGoToUkraine: '',
}

type FormValues = typeof initialValues;

type FieldNames = keyof FormValues;

type FormField = {
  name: FieldNames;
  label: string;
  type: 'text' | 'number';
  required?: boolean;
}

const formFields: Array<FormField> = [
  {
    name: 'fullName',
    label: 'Imię i nazwisko',
    type: 'text',
    required: true,
  },
  {
    name: 'age',
    label: 'Wiek',
    type: 'number',
    required: true,
  },
  {
    name: 'zipCode',
    label: 'Kod pocztowy',
    type: 'text',
    required: true,
  },
  {
    name: 'city',
    label: 'Miejscowość',
    type: 'text',
    required: true,
  },
  {
    name: 'commune',
    label: 'Gmina',
    type: 'text',
    required: true,
  },
  {
    name: 'district',
    label: 'Powiat',
    type: 'text',
    required: true,
  },
  {
    name: 'voivodeship',
    label: 'Województwo',
    type: 'text',
    required: true,
  },
  {
    name:  'phone',
    label: 'Nr telefonu',
    type: 'text',
    required: true,
  },
  {
    name:   'email',
    label: 'Adres email',
    type: 'text',
    required: true,
  },
  {
    name:   'facebook',
    label: 'Facebook - link do profilu (jeżeli posiadasz)',
    type: 'text',
    required: false,
  },
  {
    name:   'organization',
    label: 'OSP/organizacja (jeżeli dotyczy)',
    type: 'text',
    required: false,
  },
  {
    name:   'qualifications',
    label: 'Kwalifikacje',
    type: 'text',
    required: true,
  },
  {
    name:   'helpType',
    label: 'Mogę pomagać jako',
    type: 'text',
    required: true,
  },
  {
    name:   'travelTimeAvailable',
    label: 'Mogę wyjechać poza miejsce zamieszkania',
    type: 'text',
    required: true,
  },
  {
    name:   'canGoToUkraine',
    label: 'Czy mógł byś się zdecydować na wyjazd humanitarny na Ukrainę?',
    type: 'text',
    required: true,
  },
]

const ValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required(validationMessages.required),
  age: Yup.number().min(18).max(150).required(validationMessages.required),
  zipCode: Yup.string().length(6, validationMessages.zipCode).required(validationMessages.required),
  city: Yup.string().required(validationMessages.required),
  commune: Yup.string().required(validationMessages.required),
  district: Yup.string().required(validationMessages.required),
  voivodeship: Yup.string().required(validationMessages.required),
  phone: Yup.string().required(validationMessages.required),
  facebook: Yup.string().url(validationMessages.url).optional(),
  organization: Yup.string().optional(),
  email: Yup.string().email(validationMessages.email).required(validationMessages.required),
  qualifications: Yup.string().required(validationMessages.required),
  helpType: Yup.string().required(validationMessages.required),
  travelTimeAvailable: Yup.string().required(validationMessages.required),
  canGoToUkraine: Yup.string().required(validationMessages.required),
});

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>#OSPdlaUKRAINY</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{
        backgroundColor: '#d1d9df'
      }}>
        <Container
          maxWidth="lg"
        >
          <Box pt={2}>
            <Typography
              variant="h6"
              component="h1"
              mb={1}
            >
              #OSPdlaUKRAINY
            </Typography>
          </Box>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                variant="h3"
                component="h2"
                mb={4}
              >
                formularz dla osób
              </Typography>
              <Formik
                initialValues={initialValues}
                validationSchema={ValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    setSubmitting(false);
                    alert(JSON.stringify(values, null, 2));
                  }, 500);
                }}
              >
                {({values, submitForm, resetForm, isSubmitting, touched, errors}) => (
                    <Form>
                      {formFields.map(field => (
                        <Field
                          key={field.name}
                          component={TextField}
                          name={field.name}
                          label={field.label}
                          required={field.required}
                          type={field.type}
                          fullWidth
                          margin="dense"
                        />
                      ))}
                      <Box
                        mt={1}
                        mb={1}
                        display="flex"
                        justifyContent="flex-end"
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          disabled={isSubmitting}
                          onClick={submitForm}
                          endIcon={<NavigateNext />}
                        >
                          Prześlij 
                        </Button>
                      </Box>
                    </Form>
                    )}
              </Formik>
            </CardContent>
          </Card>
        </Container>
      </main>
    </div>
  )
}

export default Home
