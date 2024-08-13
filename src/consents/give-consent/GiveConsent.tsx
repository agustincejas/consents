import { Button, Container, FormGroup, Typography } from "@mui/material";
import { ButtonContainer, CheckboxContainer, ConsentsLabel, TextFieldsContainer } from "./GiveConsent.styles";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { TextField, CheckboxWithLabel } from "formik-mui";
import { checkboxOptions } from "./config";
import { fieldEmailErrorRequiredMsg, fieldNameErrorRequiredMsg } from "../../constants";

interface FormValues {
  email: string;
  name: string;
  consents: string[] | string;
}

const GiveConsent = () => {
  const initialValues: FormValues = { name: "", email: "", consents: [] };
  const dangerStyle = { borderColor: "#d32f2f", color: "#d32f2f" };
  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (!values.email) {
      errors.email = fieldEmailErrorRequiredMsg;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.name) {
      errors.name = fieldNameErrorRequiredMsg;
    }

    if (!values.consents.length) {
      errors.consents = "One option must be selected";
    }

    return errors;
  };

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
      >
        {({ values, submitForm, isSubmitting, errors }) => (
          <Form>
            <TextFieldsContainer>
              <Field component={TextField} label="Name" name="name" />
              <Field component={TextField} label="Email address" name="email" type="email" />
            </TextFieldsContainer>
            <ConsentsLabel>
              <Typography variant="body1">I agree to:</Typography>
            </ConsentsLabel>
            <CheckboxContainer style={errors.consents ? dangerStyle : {}}>
              <FormGroup>
                {checkboxOptions.map(({ label, value }) => {
                  return (
                    <Field
                      key={value}
                      component={CheckboxWithLabel}
                      type="checkbox"
                      name="consents"
                      value={value}
                      checked={values.consents.includes(value)}
                      Label={{ label }}
                    />
                  );
                })}
              </FormGroup>
            </CheckboxContainer>
            <ErrorMessage name="consents" component="div" className={errors.consents ? "error" : ""} />
            <ButtonContainer>
              <Button variant="contained" color="primary" disabled={isSubmitting} onClick={submitForm}>
                Give consent
              </Button>
            </ButtonContainer>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export { GiveConsent };
