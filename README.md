# Simple Currency Converter

## Feedback recieved!

The Tech Lead who reviewed this has given me some great feedback
(thank you). The main issue with my app was the fact that everything
was prefetched resulting in a ~15 second load time. I have also been
told that my use of the legacy version of Redux was acceptable, but I
wanted to set myself a challenge to learn the new version of Redux
with Redux Toolkit.

Most of the information is still accurate in the old README section if
not mentioned in this section.

### Redux

I have migrated from `react-redux` to React Toolkit and have used a
slice to represent my conversion form instead of handwritten actions
and reducers. I have also deprecated the former API implementation in
favor of using createAPI provided by Redux Toolkit to leverage the
Query system.

- `conversionFormSlice` - This mostly works the same as the old
  conversionForm reducer in terms of handling state, fields are still
  synced. However, many modifications had to be made to accomodate the
  new API implementation.

  - There are two actions `updateFrom` and `updateTo` which handle
    changes for both of the fields, I have broken it up into 2 actions
    to simplify the reducer's logic. `updateFrom` does not handle the
    currency of the from field changing because I rely on the
    matchFulfilled event from the `floatratesAPI` slice to return the
    new conversionRates.

    I also utilize the inverseRate which I previously have not, which
    means that I no longer have to run a request if the to field
    changes.

  - extraReducer `floatratesApi.endpoints.getExchangeRatesByCode` is
    used to get the newest `fromExchangeRates` in order to perform the
    calculation when the from field's currency changes which triggers
    the query to re-run. The caveat of relying on this action being
    handled is the fact that I cannot rely on caching because when a
    cached value is returned no promise is fired.

- `floatratesApi` - The implementation is a lot simpler compared to
  the deprecated one. There are two endpoints defined.
  - `getExchangeRatesByCode` - Takes in the `currencyCode` as a
    parameter, it also uses transformResponse to add the case where
    you convert something like `gbp` to `gbp` where the rates would be 1.
  - `getCurrencyInfo` - Akin to the previous implementation, uses a hack
    to determine the supported currencies and currency code to name map.

# CurrencyConversionForm

This component has changed quite a bit, I have moved the initial (and
now subsequent) fetching of exchangeRates from the App component into
this one.

Leveraging the Query API, instead of manually writing a thunk, I have
used useQuery hooks which basically work the same but without the
boilerplate.

As per the Lead Devs suggestion, the UX is greatly improved because
the data is not fetched all at once resulting in a very fast load time
compared to 15 seconds. Instead, I load the exchangeRates each time
from's currency is changed which results in small wait time between
changes which is completely fine in terms of UX as pointed out by the
Tech Lead.

Additionally, loading state and error state is no longer managed in
`App.js`, loading state is reflected by loading skeleton depictions of
the CurrencyInput components and error state is reflected by showing
the error message instead of the inputs. This achieves a more cleaner
look and is better for UX.

# CurrencyInput

Not much has changed in the CurrencyInput apart from including
support for a loading state and displaying an animated loading
skeleton to indicate to the user that some processing is happening.

# App component

The main entry point of the app, `App.js`, is a lot more cleaner now
as the Redux related logic has been fully moved to
CurrencyConversionForm.

# Additional Notes & Conclusion

Overall, this was a great learning experience, and will be useful as
the Tech Lead has recommended me to use Redux Toolkit instead of the
legacy system, and I find that Redux Toolkit is great in terms of
reducing boilerplate and preventing some bugs that could occur while
using the legacy system.

I am also quite happy that I've achieved a faster load time using the
Tech Lead's suggestions along with polishing up how loading state is
shown to the user.

The Redux Query part of Redux Toolkit is great because if used
correctly it can provide caching for endpoints which can speed up data
fetching for the user and also provides React Hooks for
mutating/quering data which is great for developer experience.

## Old Readme ahead, fully accurate for changes on and before commit [a11253](https://github.com/scarydoors/currency-converter-react/tree/a1125348ce019f4b238197f877283572044c84bd)

Currency converter based on [Google's currency
converter](https://www.google.com/search?q=google+currency+converter).

Supports conversions for all currencies on floatrates. Uses Redux for
state management and managing form state to ensure both input boxes
are synced with each other.

Uses `yup` for validations and performs a series of checks:

- checking if field is invalid or empty
- checking if field has negative numbers (akin to Google)
- checking if field exceeds 2 decimal places
- allows scientific notation similar to Google
- checking if the select contains invalid values (unsupported currencies)

There is also an `api` layer which defines some functions for
interfacing with the floatrates API. The API uses Axios to transform
the response into data that the application expects, the reason for
this is the fact that the application should not care about the
implementation of the API which helps with adding support for new APIs
in the future.

The implementation of the API contains a hack to scrape all of the
supported currencies on floatrates; a single daily expense rate json
file is fetched, then it is manipulated in order to gather all the
supported currencies and the human readable names of the currencies.

The styling of the app depends on TailwindCSS. I chose TailwindCSS
because it allows for fast prototyping and styling of HTML elements,
instead of writing stylesheets manually.

The `ListContainer` primarily provides responsiveness to the app by
bottom aligning the children because mobile users would prefer UI
elements which are closer to their thumb for ease of use.

### Redux

I found out quite recently about Redux Toolkit and it looks great in
regards to reducing boilerplate and ease of development however I have
used Redux without Redux Toolkit where you'd manually roll all the
immutable state logic and such, but if Redux Toolkit is preferred it
will be easy to pick up.

Redux is used in this app to store 2 different types of data:

- The results from the API `exchangeRatesReducer`
  - Provides a reducer which stores 4 variables `loading`, `error`,
    `exchangeRates`, and `codeNamesMap`.
  - `exchangeRates` is a map which maps the input currency to an
    output currency's exchange rate
  - `codeNamesMap` is a map which maps ISO4217 format currency names
    to human readable ones.
  - The reducer supports the actions: `REQUEST_SUCCESS`,
    `REQUEST_FAILURE`, and `REQUEST_BEGIN`.
- The form's state `conversionFormReducer`
  - Provides a reducer which stores 2 variables `from` and `to`.
  - The reducer supports only one action: `UPDATE` performs operations
    based on which field was updated.
  - All of the calculations run in the reducer because they should not
    happen in Redux actions. This makes the reducer easily testable as
    a good reducer is a pure function.

The main action defined for fetching the `exchangeRates` uses
`redux-thunk` to dispatch from an asynchronous function.

### Reusable Components

This project has a components folder which stores components that
build upon components in the `ui` and `form` folders.

The list of reusable components are as follows:

- ui/ListContainer
- ui/Card
- ui/Spinner
- form/CurrencyInput
- form/Error
- CurrencyConversionForm

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

### Design Decisions

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

### Code Style

I have used prettier as a dependency to ensure that the code style is
consistent even if there are multiple contributors.

Not every piece of code has comments because code should be expressive
and easy to read, writing documentation and comments for every piece
of code makes it so you have twice as much to maintain and could run
into inconsistency issues, therefore I have only left comments on a
discretionary basis.

I always try to avoid introducing magic behaviour into my solutions
because later on it always comes back to haunt you.

Also a pet-peeve of mine is when one developer runs a code formatter
and others don't so when you get to reviewing their PRs there is 50
changes files but only 2 files that actually have changes.

### Testing

```
npm run test
```

I have used Jest for tests and have written 2 basic test suites to
demonstrate my understanding of tests:

- Unit test - `src/redux/reducers/conversionForm.test.js`
- UI test - `src/components/form/CurrencyInput.test.js`

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
