import { Button, Container, FormGroup, Typography } from "@mui/material";
import { ButtonContainer, CheckboxContainer, ConsentsLabel, TextFieldsContainer } from "./GiveConsent.styles";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { TextField, CheckboxWithLabel } from "formik-mui";
import { checkboxOptions } from "./config";
import {
  EMAIL_REG_EXP,
  ERROR_COLOR,
  fieldConsentsErrorRequiredMsg,
  fieldEmailErrorFormatMsg,
  fieldEmailErrorRequiredMsg,
  fieldNameErrorRequiredMsg,
} from "../../constants";
import { Consent, ConsentFormErrors } from "../../interfaces/consents";
import { useNavigate } from "react-router-dom";
import { usePostConsent } from "../../hooks/use-post-consent";

const GiveConsent = () => {
  const navigate = useNavigate();
  const { mutateAsync: postConsent } = usePostConsent();
  const initialValues: Consent = { name: "", email: "", consents: [] };
  const dangerStyle = { borderColor: ERROR_COLOR, color: ERROR_COLOR };

  const validate = (values: Consent) => {
    const errors: Partial<ConsentFormErrors> = {};

    if (!values.email) {
      errors.email = fieldEmailErrorRequiredMsg;
    } else if (!EMAIL_REG_EXP.test(values.email)) {
      errors.email = fieldEmailErrorFormatMsg;
    }

    if (!values.name) {
      errors.name = fieldNameErrorRequiredMsg;
    }

    if (!values.consents.length) {
      errors.consents = fieldConsentsErrorRequiredMsg;
    }

    return errors;
  };

  const handleSubmit = async (values: Consent, formikHelpers: FormikHelpers<Consent>) => {
    const { setSubmitting } = formikHelpers;
    setSubmitting(true);
    await postConsent(values);
    setSubmitting(false);
    navigate("../consents");
  };

  return (
    <Container>
      <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
        {({ values, submitForm, isSubmitting, errors, touched }) => (
          <Form>
            <TextFieldsContainer>
              <Field component={TextField} label="Name" name="name" />
              <Field component={TextField} label="Email address" name="email" type="email" />
            </TextFieldsContainer>
            <ConsentsLabel>
              <Typography variant="body1">I agree to:</Typography>
            </ConsentsLabel>
            <CheckboxContainer style={touched.consents && errors.consents ? dangerStyle : {}}>
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
            <ErrorMessage name="consents" component="p" className={errors.consents ? "error" : ""} />
            <ButtonContainer>
              <Button data-cy="submit" variant="contained" color="primary" disabled={isSubmitting} onClick={submitForm}>
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
