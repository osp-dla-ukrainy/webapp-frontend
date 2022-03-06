import React, { ChangeEvent } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField as MUITextField,
  AutocompleteRenderInputParams,
  FormControlLabel,
  FormLabel,
  Radio,
} from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import {Formik, FormikErrors, FormikTouched, Form, Field} from 'formik';
import * as Yup from 'yup';
import {
  Autocomplete,
  RadioGroup,
  TextField,
} from 'formik-mui';

import { OtherInput } from '../../core/components/OtherRadioInput/OtherRadioInput';

type SelectOption = {
  label: string;
  value?: string | number;
}

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
  voivodeship: null,
  phone: '',
  email: '',
  facebook: '',
  organization: '',
  qualifications: [],
  helpType: [],
  travelTimeAvailable: null,
  canGoToUkraine: null,
}

const VOIVODESHIP_OPTIONS = [
 { label: 'dolnośląskie', value: 'PL-DS' },
 { label: 'kujawsko-pomorskie', value: 'PL-KP' },
 { label: 'lubelskie', value: 'PL-LU' },
 { label: 'lubuskie', value: 'PL-LB' },
 { label: 'łódzkie', value: 'PL-LD' },
 { label: 'małopolskie', value: 'PL-MA' },
 { label: 'mazowieckie', value: 'PL-MZ' },
 { label: 'opolskie', value: 'PL-OP' },
 { label: 'podkarpackie', value: 'PL-PK'},
 { label: 'podlaskie', value: 'PL-PD'},
 { label: 'pomorskie', value: 'PL-PM'},
 { label: 'śląskie', value: 'PL-SL'},
 { label: 'świętokrzyskie', value: 'PL-SK'},
 { label: 'wielkopolskie', value: 'PL-WP'},
 { label: 'warmińsko-mazurskie', value: 'PL-WN'},
 { label: 'zachodniopomorskie', value: 'PL-ZP'},
];

const QUALIFICATIONS_OPTIONS = [
 { label: 'KPP', value: 'firstAid' },
 { label: 'Ratownik medyczny / Pielęgniarz', value: 'medicNurse' },
 { label: 'Lekarz', value: 'doctor' },
 { label: 'Prawo jazdy kat. B', value: 'drivingB' },
 { label: 'Prawo jazdy kat. C', value: 'drivingC' },
 { label: 'Uprawnienia wózka widłowego', value: 'forklift' },
 { label: 'Grafik komputerowy', value: 'computerGraphics' },
 { label: 'Obsługa stron internetowych', value: 'websites' },
 { label: 'Media marketing', value: 'mediaMarketing'},
 { label: 'Prawnik', value: 'lawyer'},
 { label: 'Pedagog/psycholog', value: 'psychotherapy'},
 { label: 'Zarządzanie/logistyka', value: 'managmentLogistics'},
 { label: 'j. angielski', value: 'english'},
 { label: 'j. rosyjski', value: 'russian'},
 { label: 'j. ukraiński', value: 'ukrainian'},
];

const HELP_TYPE_OPTIONS = [
 { label: 'ORGANIZACYJNIE: prowadzenie strony, facebooka', value: 'organisational' },
 { label: 'OPERACYJNIE: koordynacja działań', value: 'operational' },
 { label: 'TRANSPORT OSÓB/ RZECZY', value: 'transport' },
];

const TRAVEL_TIME_AVAILABLE_OPTIONS = [
 { label: 'do 12 h', value: '12hrsMax' },
 { label: 'do 24 h', value: '24hrsMax' },
 { label: '1-2 dni', value: '2daysMax' },
 { label: 'Pomagam głównie w swoim rejonie', value: 'localOnly' },
];
const GO_TO_UKRAINE_OPTIONS = [
 { label: 'Tak', value: 'yes' },
 { label: 'Nie', value: 'no' },
];

type FormValues = typeof initialValues;

type FieldNames = keyof FormValues;

type FormField = {
  name: FieldNames;
  label: string;
  helper?: string;
  type: 'text' | 'number' | 'autocomplete' | 'radiogroup';
  required?: boolean;
  multiple?: boolean;
  options?: Array<SelectOption>;
  freeSolo?: boolean;
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
    type: 'autocomplete',
    required: true,
    options: VOIVODESHIP_OPTIONS,
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
    type: 'autocomplete',
    helper: 'można wybrać kilka i/lub wpisać własne',
    required: true,
    multiple: true,
    freeSolo: true,
    options: QUALIFICATIONS_OPTIONS,
  },
  {
    name:   'helpType',
    label: 'Mogę pomagać jako',
    type: 'autocomplete',
    helper: 'można wybrać kilka i/lub wpisać własne',
    required: true,
    multiple: true,
    freeSolo: true,
    options: HELP_TYPE_OPTIONS,
  },
  {
    name:   'travelTimeAvailable',
    label: 'Mogę wyjechać poza miejsce zamieszkania',
    type: 'radiogroup',
    options: TRAVEL_TIME_AVAILABLE_OPTIONS,
    required: true,
  },
  {
    name:   'canGoToUkraine',
    label: 'Czy mógł byś się zdecydować na wyjazd humanitarny na Ukrainę?',
    type: 'radiogroup',
    options: GO_TO_UKRAINE_OPTIONS,
    required: true,
  },
];

const renderField = (
  field: FormField,
  touched: FormikTouched<FormValues>,
  errors: FormikErrors<FormValues>,
  handleChange: (event: ChangeEvent<any>) => void
) => {
  if (field.type === 'autocomplete' && field.options) {
      return (
        <Field
          key={field.name}
          component={Autocomplete}
          name={field.name}
          disablePortal
          id={field.name}
          options={field.options}
          multiple={field.multiple}
          freeSolo={field.freeSolo}
          renderInput={(params: AutocompleteRenderInputParams) => (
            <MUITextField
              {...params}
              name={field.name}
              error={touched[field.name] && !!errors[field.name]}
              label={field.label}
              required={field.required}
              type={field.type}
              fullWidth
              margin="normal"
              helperText={!errors[field.name] && field.helper}
            />
          )}
        />
      )
    }

    if (field.type === 'radiogroup' && field.options) {
      return (
        <Box mt={2}>
          <FormLabel component="legend">{field.label}</FormLabel>
          <Field
            component={RadioGroup}
            name={field.name}
          >
            {field.options.map(option => (
               <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
            <OtherInput
              label="Inne:"
              name={field.name}
              onChange={handleChange}
            />
          </Field>
        </Box>
      )
    }

    return (
      <Field
        key={field.name}
        component={TextField}
        name={field.name}
        label={field.label}
        required={field.required}
        type={field.type}
        fullWidth
        margin="dense"
        helperText={!errors[field.name] && field.helper}
      />
    )
}

const ValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required(validationMessages.required),
  age: Yup.number().min(18).max(150).required(validationMessages.required),
  zipCode: Yup.string().length(6, validationMessages.zipCode).required(validationMessages.required),
  city: Yup.string().required(validationMessages.required),
  commune: Yup.string().required(validationMessages.required),
  district: Yup.string().required(validationMessages.required),
  voivodeship: Yup.object().shape({
    label: Yup.string(),
    value: Yup.string(),
  }).nullable().required(validationMessages.required),
  phone: Yup.string().required(validationMessages.required),
  facebook: Yup.string().url(validationMessages.url).optional(),
  organization: Yup.string().optional(),
  email: Yup.string().email(validationMessages.email).required(validationMessages.required),
  qualifications: Yup.array().nullable().required(validationMessages.required).min(1),
  helpType: Yup.array().nullable().required(validationMessages.required).min(1),
  travelTimeAvailable: Yup.string().required(validationMessages.required),
  canGoToUkraine: Yup.string().required(validationMessages.required),
});

export const PersonSignup = () => {
  return (
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
          {({submitForm, isSubmitting, touched, errors, handleChange}) => (
              <Form>
                {formFields.map(field => renderField(field, touched, errors, handleChange))}
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
  )
}
