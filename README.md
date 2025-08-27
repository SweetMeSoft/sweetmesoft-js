# SweetMeSoft JS

A complete JavaScript/TypeScript library that provides utilities and components for modern web development, including AJAX functionality, charts, maps, tables, and user interface tools.

## Description

SweetMeSoft JS is a library that simplifies web development by providing a collection of reusable tools and components. It is built in TypeScript and designed to work with jQuery and other popular libraries such as Bootstrap, Chart.js, Google Maps, and SweetAlert2.

## Installation

### NPM
```bash
npm install sweetmesoft-js
```

### From repository
```bash
git clone https://github.com/SweetMeSoft/sweetmesoft-js.git
cd sweetmesoft-js
npm install
```

## File Structure

### `Ajax.ts`
Contains functions for simplified HTTP requests:
- **`getOptions()`**: Populates select/dropdown elements with options fetched from a URL
- **`get()`**: Performs GET requests with automatic error handling and loading
- **`post()`**: Performs POST requests with automatic header configuration
- **`put()`**: Performs PUT requests with automatic header configuration
- **`del()`**: Performs DELETE requests with automatic header configuration
- **`downloadFile()`**: Downloads files from the server
- **`uploadFile()`**: Uploads files to the server

### `Charts.ts`
Provides functionality for generating charts using Chart.js:
- **`generateChart()`**: Creates dynamic charts with data obtained from APIs
- Support for daily and monthly charts
- Automatic configuration of datasets and labels

### `Classes.ts`
Defines all TypeScript interfaces and types used in the library:
- **`OptionsSelect`**: Configuration for select elements
- **`OptionsCropper`**: Configuration for image cropping
- **`OptionsModal`**: Configuration for modals
- **`OptionsTable`**: Configuration for DataTables
- **`OptionsChart`**: Configuration for charts
- **`OptionsMap`**: Configuration for Google Maps
- **`OptionsRequest`**: Configuration for AJAX requests

### `Common.ts`
Contains constants and global variables used throughout the library:
- Arrays of abbreviated months and days
- State control variables

### `JQueryAddOns.ts`
Extends jQuery with additional methods:
- **`disable()`/`enable()`**: Enables/disables elements
- **`check()`/`uncheck()`**: Checks/unchecks checkboxes
- **`initializeSelect()`**: Initializes Bootstrap Select
- **`toBlob()`**: Converts images to Blob
- **`isNullOrEmpty()`**: String extension that checks if it's empty

### `Maps.ts`
Integration with Google Maps API:
- **`generateMap()`**: Creates interactive maps with markers
- Geolocation support
- Address autocomplete
- Maps in modals or specific containers
- Multiple marker handling

### `Tools.ts`
General utilities for development:
- **`on()`/`off()`**: Loading overlay control
- **`capitalizeFirstLetter()`**: Capitalizes the first letter of a string
- **`getFormatedDate()`**: Formats dates with custom patterns
- **`isValidDate()`**: Validates if an object is a valid date
- **`getUrlParameter()`**: Gets URL parameters
- **`generateCropper()`**: Creates an image cropper with Cropper.js

## Technologies Used

- **TypeScript**: Primary development language
- **jQuery**: DOM manipulation and AJAX
- **Bootstrap**: CSS framework and UI components
- **Bootstrap Select**: Enhanced select component
- **Chart.js**: Chart library
- **Google Maps API**: Map integration
- **SweetAlert2**: Elegant modals and alerts
- **Cropper.js**: Image cropping
- **DataTables**: Interactive tables

## Basic Usage

### AJAX Requests
```typescript
// GET request
SweetMeSoft.get({
    url: '/api/data',
    jwt: 'your-jwt-token',
    lang: 'en-US',
    successCallback: (data) => {
        console.log('Data received:', data);
    }
});

// POST request
SweetMeSoft.post({
    url: '/api/save',
    data: {name: 'John', email: 'john@example.com'},
    jwt: 'your-jwt-token',
    lang: 'en-US'
});

// PUT request
SweetMeSoft.put({
    url: '/api/users/123',
    data: {name: 'Updated Name'},
    jwt: 'your-jwt-token'
});

// DELETE request
SweetMeSoft.del({
    url: '/api/users/123',
    jwt: 'your-jwt-token'
});

// Populate a select
SweetMeSoft.getOptions({
    url: '/api/options',
    dropDowns: [$('#mySelect')],
    text: 'name',
    internal: 'id',
    jwt: 'your-jwt-token'
});
```

### Charts
```typescript
SweetMeSoft.generateChart({
    chart: $('#myChart'),
    url: '/api/chart-data',
    interval: 'monthly'
});
```

### Maps
```typescript
SweetMeSoft.generateMap({
    edtLatitude: $('#latitude'),
    edtLongitude: $('#longitude'),
    showCurrentLocation: true,
    modal: true
});
```

### jQuery Extensions
```typescript
// Initialize a select
$('#mySelect').initializeSelect();

// Check if a string is empty
if (myString.isNullOrEmpty()) {
    console.log('String is empty');
}
```

## Configuration

The library uses TypeScript with the following configuration:
- Target: ES2019
- Module: ES6
- Declarations included
- Automatic compilation enabled

## Deployment

### Local Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Compile TypeScript: `tsc`
4. Compiled files will be in the `src/` folder

### NPM Publication
The package is available on NPM as `sweetmesoft-js` and is updated regularly.

### Project Integration
```html
<!-- Include dependencies -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- Include SweetMeSoft JS -->
<script src="node_modules/sweetmesoft-js/src/Ajax.js"></script>
<script src="node_modules/sweetmesoft-js/src/Charts.js"></script>
<script src="node_modules/sweetmesoft-js/src/Maps.js"></script>
<script src="node_modules/sweetmesoft-js/src/Tools.js"></script>
<script src="node_modules/sweetmesoft-js/src/JQueryAddOns.js"></script>
```

## Contributing

Contributions are welcome. Please:
1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is under the MIT License. See the `LICENSE` file for more details.

## Author

**Erick Velasco** - [erickvelasco11@gmail.com](mailto:erickvelasco11@gmail.com)

## Links

- [GitHub Repository](https://github.com/SweetMeSoft/sweetmesoft-js)
- [NPM Package](https://www.npmjs.com/package/sweetmesoft-js)
- [Report Issues](https://github.com/SweetMeSoft/sweetmesoft-js/issues)

---

*Developed with love by SweetMeSoft*