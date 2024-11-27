var SweetMeSoft;
(function (SweetMeSoft) {
    function setDefaults(options, defaults) {
        return Object.assign({}, defaults, options);
    }
    SweetMeSoft.setDefaults = setDefaults;
    SweetMeSoft.defaultsSelect = {
        url: '',
        data: {},
        dropDowns: [],
        autoSelect: true,
        callback: () => {
        },
        enable: false,
        extraOption: '',
        extraOption2: '',
        extraOption3: '',
        firstText: 'Select',
        limitSubTextOption: 20,
        subTextOption: '',
        text: 'description',
        internal: 'id',
        urlValues: '',
        value: 0,
        isCountries: false
    };
    SweetMeSoft.defaultCropper = {
        circleCrop: false,
        aspectRatio: 'square',
        callback: (blob) => {
        }
    };
    SweetMeSoft.defaultsModal = {
        title: 'Modal',
        type: 'html',
        loadData: {},
        loadCallback: undefined,
        closeCallback: undefined,
        primaryCallback: undefined,
        cancelCallback: undefined,
        html: 'You need to define html code',
        viewUrl: '',
        gridOptions: {},
        size: 'small',
        height: 'auto',
        primaryText: 'Thanks',
        cancelText: 'Cancel'
    };
    SweetMeSoft.defaultsTable = {
        type: 'url',
        data: [],
        url: '',
        urlParams: {},
        rowsPerPage: 10,
        noDataText: 'No info',
        hiddenColumns: [],
        additionalColumns: [],
        defaultOrderColumn: '',
        defaultOrderType: 'asc',
        showHeader: true,
        showFooter: true,
        filterColumns: [],
        customColumns: [],
        buttons: [],
        height: 'auto',
        canOrder: true,
        showCheckbox: false,
        onDblClick: (rowData) => {
        }
    };
    SweetMeSoft.defaultsConsecutive = {
        documentId: 0,
        businessUnitId: 0,
        serviceTypeId: 0,
        executionCityId: 0,
        companyId: 1,
        saveOp: false,
        successEvent: (data) => {
        }
    };
    SweetMeSoft.defaultsRequest = {
        url: '',
        filename: '',
        data: '',
        uploadControl: null,
        successCallback: (response) => {
        },
        errorCallback: (response) => {
        },
        errorMessage: '',
        successMessage: '',
        showError: true,
        showSuccess: true
    };
    SweetMeSoft.defaultsChart = {
        url: "",
        chart: undefined,
        data: '',
        interval: 'daily'
    };
    SweetMeSoft.defaultMap = {
        showCurrentLocation: true,
        divId: "",
        modal: true,
        showAutocomplete: false,
        coordinates: [],
        edtLatitude: undefined,
        edtLongitude: undefined,
        isUnique: false,
        isClickableMap: false,
        showCoordinates: false
    };
    SweetMeSoft.defaultDateTimePickerOptions = {
        minDate: null,
        maxDate: null
    };
})(SweetMeSoft || (SweetMeSoft = {}));
