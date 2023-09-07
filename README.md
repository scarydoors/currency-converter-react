# Simple Currency Converter

Currency converter based on [Google's currency converter](https://www.google.com/search?q=google+currency+converter). \

Supports conversions for USD, GBP, CAD, AUD, and JPY. Uses Redux for
state management and managing form state to ensure both input boxes
are synced with each other.

Uses `yup` for validations and performs a series of checks: 
* checking if field is invalid or empty
* checking if field has negative numbers (akin to Google)
* checking if field exceeds 2 decimal places
* allows scientific notation similar to Google
* checking if the select contains invalid values (unsupported currencies)

Adding support for more currencies is supported by updating the
constants located at `constants/currencies`.

There is also an `api` layer which defines some functions for
interfacing with the floatrates API. The API uses Axios to transform
the response into data that the application expects, the reason for
this is the fact that the application should not care about the
implementation of the API which helps with adding support for new APIs
in the future.

The styling of the app depends on TailwindCSS. I chose TailwindCSS
because it allows for fast prototyping and styling of HTML elements,
instead of writing stylesheets manually.

The `ListContainer` primarily provides responsiveness to the app by
bottom aligning the children because mobile users would prefer UI
elements which are closer to their thumb for ease of use.

## Redux

I found out quite recently about Redux Toolkit and it looks great in
regards to reducing boilerplate and ease of development however I have
used the technically deprecated version of Redux where you'd manually
roll all the immutable state logic and such, but if Redux Toolkit is
preferred it will be easy to pick up.

Redux is used in this app to store 2 different types of data:
* The results from the API
  * Provides a reducer which stores 3 variables `loading`, `error`,
    and `data`.
  * The reducer supports the actions: `REQUEST_SUCCESS`,
    `REQUEST_FAILURE`, and `REQUEST_BEGIN`.
* The form's state
  * Provides a reducer which stores 2 variables `from` and `to`.
  * The reducer supports only one action: `UPDATE` performs operations
    based on which field was updated.
    
The main action defined for fetching the `exchangeRates` uses
`redux-thunk` to dispatch from an asynchronous function. The other
actions are not exported and 

## Reusable Components
This project has a components folder which stores components that
build upon components in the `ui` and `form` folders.

The list of reusable components are as follows:
* ui/ListContainer
* ui/Card
* ui/Spinner
* form/CurrencyInput
* form/Error
* CurrencyConversionForm

The `ui/ListContainer` component center aligns all children and
displays them in a stack. On smaller screens it bottom aligns instead.

The `ui/Card` component is a simple reusable UI element that can be
used to display Card-style layouts.

The `ui/Spinner` component is a simple reusable spinner element that
can be used to indicate loading. Currently it takes in a className to
allow the user of the component to specify certain styles to allow for
better reusability.

The `form/CurrencyInput` component is specially tailored to currency
input; it automatically displays the symbol of the active currency and
includes a select inside the field to allow the user to select a
currency. Additionally, the field also has a red ring which indicates
to the user that the input is invalid, along with displaying an error
message underneath using `form/Error`.

If I opted for a different design of the form CurrencyInput would most
likely be split up into two more versatile components, an input
component and a select component.

`form/Error` is a simple reusable component to display errors, the
reason I turned it into a component is because in a bigger codebase it
would be helpful to have component like this to make sure all errors
look standardized and the styling of all of them can be adjusted by
editing 1 file.

`CurrencyConversionForm` is a component which represents a form, it
does not take in any properties because instead it relies on Redux
state management as per the spec of the project. It provides a HOC
onChange function to two `form/CurrencyInput` components which allows
them to update Redux state and differentiate from which field onChange
events originate.


## Design Decisions

The validations are carried out in the `CurrencyInput` component
itself instead of the form, the reason for this choice is the fact
that this component would always carry out those validations if used
elsewhere and this also simplifies implementation by not making the
user worry about implementing validation for the component on each
use.

Alternatively, if this project was bigger instead of storing the
validation in the component I would provide a library of reusable
validations which would ease development. 

Without the constraint of using Redux for forms, I would develop a
Form system which provides methods such as `Form.init` which would
take in a `validationSchema` and initial field values and return an
object, with functions such as `Form.update` and `Form.validate` which
would perform the appropriate operations and return objects with new
state.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
