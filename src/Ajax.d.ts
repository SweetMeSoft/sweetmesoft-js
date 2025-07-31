declare namespace SweetMeSoft {
    /**
     * Populates select/dropdown elements with options fetched from a URL
     * @param options Configuration object containing:
     * - url: API endpoint to fetch options data from
     * - dropDowns: Array of jQuery select elements to populate
     * - firstText: Text to show as first/placeholder option
     * - text: Property name to use as option text (can use dot notation for nested props)
     * - internal: Property name to use as option value
     * - value: Pre-selected value to set
     * - enable: Whether to enable the dropdown
     * - autoSelect: Auto-select first option if only one exists
     * - extraOption/extraOption2/extraOption3: Additional data attributes to add
     * - subTextOption: Property to use as subtext
     * - limitSubTextOption: Character limit for subtext
     * - isCountries: Whether to show country flags
     * - urlValues: URL to fetch pre-selected values from
     * - callback: Function to call after populating options
     */
    function getOptions(options: OptionsSelect): Promise<boolean>;
    /**
     *
     * @param options
     */
    function get(options: OptionsRequest): Promise<boolean>;
    /**
     *
     * @param options
     */
    function post(options: OptionsRequest): Promise<boolean>;
    /**
     *
     * @param options
     */
    function put(options: OptionsRequest): Promise<boolean>;
    /**
     *
     * @param options
     */
    function del(options: OptionsRequest): Promise<boolean>;
    function downloadFile(options: OptionsRequest): Promise<boolean>;
    function uploadFile(options: OptionsRequest): Promise<boolean>;
}
