# Setup

Choose node version

```
nvm use
```

Install dependencies

```
npm i
```

Start dev server on port 3000. --host flag was added to start script to enable cypress accessing the website

```
npm run start
```

# Unit tests

```
npm run test
```

Unit test setup is vitest with React Testing Library. This was chosen because it resembles the way users navigate through the application.
Following approach

# E2e tests

Run tests in console

```
npm run e2e
```

Opens cypress ui

```
npm run e2e:open
```

Cypress setup with testing library selectors to test as close as the users as possible

# MUI Components

- Pagination: https://mui.com/material-ui/react-pagination/
- Drawer: https://mui.com/material-ui/react-drawer/
- Button: https://mui.com/material-ui/react-button/
- Text field: https://mui.com/material-ui/react-text-field/
- Checkbox: https://mui.com/material-ui/react-checkbox/
- Table: https://mui.com/material-ui/react-table/
- Container: https://mui.com/material-ui/react-container/

# Decisions

- Project follows feature based approach. In this case there is only one: consents. Inside /consents are the sibling routes corresponding to this feature
- Formik and Formik MUI to handle the form and its fields.
- Application state tied to API calls using React query.
- Submit button is enabled and shows error on click to help users see what they need to fill.
- Local Storage is used as backend.
- Since there is no backend, no API calls were made in consents service. Otherwise, axios would be included in the project to perform them. This would continue working with react query hooks specified in /hooks
- Initial data is located in /consents/ConsentList/data
- Error Page for not found routes

# Possible extensions

- Change text to keys for translations, include something like i18n. Add Language picker
- Implement ErrorBoundary
- Loading states (Spinners, Skeletons)
- Create pipeline to have at least following steps: lint, build, unit test, e2e test, deployment
- Make ConsentsDataTable more generic by adding columns names and properties as props
