declare namespace SweetMeSoft {
    export function setDefaults(options: any, defaults: any): any;
    /**
     * Basic options to generate a Select
     * This method uses Bootstrap Select. You can see more info at https://developer.snapappointments.com/bootstrap-select/
     */
    export interface OptionsSelect {
        /**
         * Url to get the data
         * @mandatory
         */
        url: string;
        /**
         * Params to send to the url
         * @default {}
         */
        data?: string | Object | FormData;
        /**
         * JQuery objects where the select will be generated
         * @mandatory
         * @example [$('#select')]
         */
        dropDowns: JQuery[];
        /**
         * If true and there is only one option, it will be selected automatically
         * @default true
         */
        autoSelect?: boolean;
        /**
         * Callback called when the options are loaded in the selects
         * @param list data returned by the Api called in URL
         * @returns
         */
        callback?: (list: any) => void;
        /**
         * If true and the select is disabled, it will be enabled automatically
         * @default true
         */
        enable?: boolean;
        /**
         * Allow you define one extra option in the select tag. This will be showed in select like data-extraOption=''
         * @default ''
         */
        extraOption?: string;
        /**
         * Allow you define one extra option in the select tag. This will be showed in select like data-extraOption2=''
         * @default ''
         */
        extraOption2?: string;
        /**
         * Allow you define one extra option in the select tag. This will be showed in select like data-extraOption3=''
         * @default ''
         */
        extraOption3?: string;
        /**
         * Text showed in the first disbled option
         * @default 'Select',
         */
        firstText?: string;
        /**
         * Max lenght of characters in the subtext
         * @default 20
         */
        limitSubTextOption?: number;
        /**
         * Object property to show in the subtext
         * For more information look this https://developer.snapappointments.com/bootstrap-select/examples/#subtext
         * @default ''
         */
        subTextOption?: string;
        /**
         * Object property to show in the main text
         * @default 'name'
         */
        text?: string;
        /**
         * Object property to add in the value for each option
         * @default 'id'
         */
        internal?: string;
        /**
         * Url for service where you will get the preselected options
         * @default ''
         */
        urlValues?: string;
        /**
         * Preselected option. This should match with values in the property 'internal'
         */
        value?: number | string | string[];
        /**
         * Allow you add flags for each country
         * This uses the flags api. you can see more info at https://flagsapi.com
         * @default false
         */
        isCountries?: boolean;
    }
    /**
     * Basic options to generate a Square cropper.
     * This method uses cropperjs. You can see more info at https://fengyuanchen.github.io/cropperjs/
     * Also, the Cropper is loaded in a Swal modal. You can see more info at https://sweetalert2.github.io/
     */
    export interface OptionsCropper {
        /**
         * JQuery object where the user will upload the image
         * @mandatory
         */
        uploadControl: JQuery;
        /**
         * JQuery object where it will be painted the cropped image
         * @mandatory
         */
        imgControl: JQuery;
        /**
         * The cropper will be circle
         * @default false
        circleCrop?: boolean;
         */
        /**
         * Callback function for execute something when the image is cropped
         * @default square
         */
        aspectRatio?: 'square' | '2/3' | '3/2' | '4/3' | '3/4' | '16/9' | '9/16' | '20/9' | '9/20';
        /**
         * Callback function for execute something when the image is cropped
         * @param blob
         * @returns
         */
        callback?: (blob: any) => void;
    }
    /**
     * Basic options to generate a modal.
     * This method uses bootstrap modal. You can see more info at https://getbootstrap.com/docs/5.3/components/modal/
     * You need to add the modal to the html in the body tag with the id 'modal'
     */
    export interface OptionsModal {
        /**
         * Title of the modal
         * @mandatory
         */
        title: string;
        /**
         * Where the modal will get the render view
         * @view is for load the view from a service. You will need to send the URL of service
         * @html is for load static html
         * @mandatory
         */
        type: 'view' | 'html';
        /**
         * Event fired when the view is loaded in DOM
         * @default undefined
         */
        loadCallback?: Function;
        /**
         * Event fired when the modal is closed. Does not matter the way the modal was closed.
         * @default undefined
         */
        closeCallback?: Function;
        /**
         * Event fired when the primary button is clicked. If undefined the primary button is not showed.
         * @default undefined
         */
        primaryCallback?(): Promise<boolean>;
        /**
         * Event fired when the secondary button is clicked. If undefined, the secondary button is not showed.
         */
        cancelCallback?: Function;
        /**
         * Static HTML to bind in the modal when @type option is selected in 'html'
         * @mandatory when @type = 'html'
         * @default ''
         */
        html?: string;
        /**
         * Url where the page will loaded to render it in the modal when @type option is selected in 'view'
         * @mandatory when @type = 'view'
         * @default ''
         */
        viewUrl?: string;
        /**
         * Parameters to send to @viewUrl
         * @default ''
         */
        viewData?: string | Object;
        /**
         * Width size for modal. Small is for default bootstrap modal width, big is for 80% width screen
         * @default 'small'
         */
        size?: 'small' | 'big';
        /**
         * Height of the modal measured in Screen Height percentage.
         * @default 'auto'
         */
        height?: 'auto' | '20%' | '30%' | '40%' | '50%' | '60%' | '70%' | '80%';
        /**
         * Text for the primary button
         * @default 'Save'
         */
        primaryText?: string;
        /**
         * Text for the secondary button
         * @default 'Cancel'
         */
        cancelText?: string;
    }
    /**
     * Basic options to generate a table
     * This method uses DataTables. You can see more info at https://datatables.net/
     */
    export interface OptionsTable {
        /**
         * Table to generate
         * @mandatory
         */
        table: JQuery;
        /**
         * Way to get information
         */
        type?: 'url' | 'list';
        /**
         * List of objects to create the table
         * If 'type' is list, this field is mandatory
         */
        data?: any[];
        /**
         * Url to get the data
         * If 'type' is url, this field is mandatory
         */
        url?: string;
        /**
         * Params to get the data
         */
        urlParams?: Object;
        /**
         * Text
         * @default No info
         */
        noDataText?: string;
        /**
         * Number of rows per page
         */
        rowsPerPage?: number;
        /**
         * Name of columns to hide.
         * @default []
         */
        hiddenColumns?: string[];
        /**
         * Column name to default order. This would be written at lowercase
         * @default First column
         */
        defaultOrderColumn?: string;
        /**
         * It's ordered by ascendent or descendent
         * @default asc
         */
        defaultOrderType?: 'asc' | 'desc';
        /**
         * Name of columns to add. These would be written at lowercase
         * @default []
         */
        additionalColumns?: string[];
        /**
         * Allow you define if you want to show/hide the header
         * @default true
         */
        showHeader?: boolean;
        /**
         * Allow you define if you want to show/hide the footer
         * @default true
         */
        showFooter?: boolean;
        /**
         * Name of columns to filter by column.
         * @default true
         */
        filterColumns?: string[];
        /**
         * Edit the format for specific columns
         * @default true
         */
        customColumns?: CustomColumn[];
        /**
         * Hieght of the table. Allow px, vn or auto
         * @default auto
         */
        height?: string;
        /**
         * Enable or disable the ordering in table
         * @default true
         */
        canOrder?: boolean;
        /**
         * Enable or disable the checkbox at the first column
         * @default false
         */
        showCheckbox?: boolean;
        /**
         * Allow you define the buttons to show at last column of table
         * @default []
         */
        buttons?: TableButton[];
        /**
         * Event fired when the user double click on a row
         * @rowData data for row double clicked
         * @return
         */
        onDblClick?: (rowData: any) => void;
    }
    /**
     * Button for last column in table
     */
    interface TableButton {
        /**
         * Type of button
         * @update is predefined blue edit button
         * @delete is predefined red delete button
         * @download is predefined blue download button
         * @custom is for a customized button
         */
        type: 'update' | 'delete' | 'custom' | 'download';
        /**
         * Icon for button. You can use bootstrap icons. See more info at https://icons.getbootstrap.com/
         * @default ''
         */
        icon?: string;
        /**
         * Color for button. You can use HTML color name or hex color.
         * @default for @update button is btn-primary, for @delete button is btn-danger, for @custom button is ''
         */
        color?: string;
        /**
         * Event fired when the button is clicked
         * @param rowData row data where the button was clicked
         * @returns
         */
        callback?: (rowData: any) => void;
        /**
         * Function to show or hide the button
         * @param rowData row data where the button was clicked
         * @default return true
         * @returns boolean
         */
        showButton?: (rowData: any) => boolean;
    }
    /**
     * Object for customize columns in the table
     */
    interface CustomColumn {
        /**
         * Original title of the column
         * @mandatory
         */
        originalTitle: string;
        /**
         * Format for the data in the column
         * @mandatory
         * @text is the default format.
         * @currency is for format the data as currency (ex: $ 1,000.00) and align to right
         * @percentage is for format the data as percentage (ex: 10.00%) and align to right
         * @right is for align to right the data
         * @image is for show a circle image in the column
         * @date is for format the data as date (ex: yyyy-MM-dd HH:mm)
         * @boolean is for format the data as disabled checkbox. See more info at https://getbootstrap.com/docs/5.3/forms/checks-radios/#switches
         */
        format?: 'text' | 'currency' | 'percentage' | 'right' | 'image' | 'date' | 'datetime' | 'boolean' | 'link';
        /**
         * New title for the column
         * @default ''
         */
        title?: string;
        /**
         * Background color for the cells in the column
         * @default '' You can use HTML color name or hex color.
         */
        backgroundColor?: string;
        /**
         * Function to show or hide the button
         * @param rowData row data where the button was clicked
         * @default return true
         * @returns boolean
         */
        show?: (data: any) => boolean;
        /**
         * Enable or disable the popover in each cell
         */
        popover?: boolean;
    }
    export interface OptionsRequest {
        url: string;
        filename?: string;
        data?: string | Object;
        uploadControl?: JQuery;
        successCallback?: (response: any) => void;
        successMessage?: string;
        errorCallback?: (response: any) => void;
        errorMessage?: string;
        showError?: boolean;
        showSuccess?: boolean;
    }
    export interface OptionsConsecutive {
        documentId: number;
        businessUnitId?: number;
        serviceTypeId?: number;
        executionCityId?: number;
        companyId?: number;
        saveOp?: boolean;
        successEvent?: Function;
    }
    export interface ItemDropDown {
        id: string;
        text: string;
        callback: (item: Item) => void;
        hasDivider?: boolean;
    }
    export interface OptionsPostObject {
        /**
         * Complete url address for Service to call
         */
        url: string;
        /**
         * Object to save
         */
        object?: Object;
        /**
         * Method to call in case of success. Gets the response of the service
         * @param response
         */
        callback?: (response: any) => void;
        /**
         * Method to call in case of error. Gets the response of the service in string, status and the jquery object
         * @param response
         * @param status
         * @param jqXhr
         */
        errorCallback?: (response: string, status: any, jqXhr: any) => void;
        /**
         * Custom text for the popup initial validation when deleting an object
         */
        text?: string;
        /**
         * Custom text of response in case of success (200) and that doesn't have callback.
         */
        successMessage?: string;
        /**
         * Custom text of response in case of error (400, 500, etc) and that doesn't have callback.
         */
        errorMessage?: string;
        /**
         * If it's true, it will show a message if the response was success. This message will be taken from successMessage. In case of not defining it, it will show a default message.
         */
        showConfirmMessage?: boolean;
        /**
         * If it's true, it will show a message if the response was error. This message will be taken from errorMessage. In case of not defining it, it will show a default message.
         */
        showErrorMessage?: boolean;
    }
    export interface Item {
        id: number;
        divId: string;
        html: string;
        item: any;
    }
    export interface OptionsChart {
        /**
         * canvas where the chart will be painted
         * @mandatory
         */
        chart: JQuery;
        /**
         * Endpoint where the info will be got
         * @mandatory
         */
        url: string;
        /**
         * Parameters of get request
         * @default null
         */
        data?: string | Object;
        /**
         * List of datasets to show in chart
         * @default []
         * @mandatory if url is empty or null
         */
        lists?: ChartDataset[];
        /**
         * @daily show a view since 1-31 in the X axis
         * @monthly show a bar since jan-dec in the X axis
         */
        interval?: 'daily' | 'monthly';
        /**
         * Field name of data response taken to split info in same interval
         */
        subFilter?: string;
    }
    export interface OptionsMap {
        /**
         * Current latitude
         */
        edtLatitude: JQuery;
        /**
         * Current longitude
         */
        edtLongitude: JQuery;
        /**
         * If the map must show in a modal. If this is @true the property divId will be ignored
         * @default true
         */
        modal?: boolean;
        /**
         * Show an autocomplete field above of the map
         * @default false
         */
        showAutocomplete?: boolean;
        /**
         * divId where the map will be shown. If modal is @true this property will be ignored. If modal is @false this property is mandatory
         */
        divId?: string;
    }
    export interface ChartDataset {
        /**
         * Data with the info that will be painted in the chart
         * @default []
         */
        data: any[];
        /**
         * Field name of data response taken to split info in same interval
         * @default ''
         */
        fieldToFilter: string;
        /**
         * Field name of data response taken to show in the chart
         * @default ''
         */
        fieldToShow: string;
        /**
         * Kind of chart to show
         * @default 'line'
         */
        kindChart: 'bar' | 'line' | 'pie' | 'doughnut' | 'polarArea' | 'radar';
        /**
         * If you want to show the chart stacked
         * @default false
         */
        stacked: boolean;
    }
    export const defaultsSelect: {
        url: string;
        data: {};
        dropDowns: any[];
        autoSelect: boolean;
        callback: () => void;
        enable: boolean;
        extraOption: string;
        extraOption2: string;
        extraOption3: string;
        firstText: string;
        limitSubTextOption: number;
        subTextOption: string;
        text: string;
        internal: string;
        urlValues: string;
        value: number;
        isCountries: boolean;
    };
    export const defaultCropper: {
        circleCrop: boolean;
        aspectRatio: string;
        callback: (blob: any) => void;
    };
    export const defaultsModal: {
        title: string;
        type: string;
        loadData: {};
        loadCallback: any;
        closeCallback: any;
        primaryCallback: any;
        cancelCallback: any;
        html: string;
        viewUrl: string;
        gridOptions: {};
        size: string;
        height: string;
        primaryText: string;
        cancelText: string;
    };
    export const defaultsTable: {
        type: string;
        data: any[];
        url: string;
        urlParams: {};
        rowsPerPage: number;
        noDataText: string;
        hiddenColumns: any[];
        additionalColumns: any[];
        defaultOrderColumn: string;
        defaultOrderType: string;
        showHeader: boolean;
        showFooter: boolean;
        filterColumns: any[];
        customColumns: any[];
        buttons: any[];
        height: string;
        canOrder: boolean;
        showCheckbox: boolean;
        onDblClick: (rowData: any) => void;
    };
    export const defaultsConsecutive: {
        documentId: number;
        businessUnitId: number;
        serviceTypeId: number;
        executionCityId: number;
        companyId: number;
        saveOp: boolean;
        successEvent: (data: any) => void;
    };
    export const defaultsRequest: OptionsRequest;
    export const defaultsChart: OptionsChart;
    export const defaultMap: OptionsMap;
    export interface AutocompleteExtendedItem {
        id: string;
        text: string;
        img?: string;
    }
    export interface DateTimePickerOptions {
        /**
         * Min date to allow select
         * @default null
         */
        minDate?: Date;
        /**
         * Max date to allow select
         * @default null
         */
        maxDate?: Date;
    }
    export const defaultDateTimePickerOptions: DateTimePickerOptions;
    export {};
}
