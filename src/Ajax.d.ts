declare namespace SweetMeSoft {
    /**
     *
     * @param options
     */
    function getOptions(options: OptionsSelect): void;
    /**
     *
     * @param options
     */
    function get(options: OptionsRequest): void;
    /**
     *
     * @param options
     */
    function post(options: OptionsRequest): void;
    function downloadFile(options: OptionsRequest): void;
    function uploadFile(options: OptionsRequest): void;
}
