declare namespace SweetMeSoft {
    /**
     *
     * @param options
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
    function downloadFile(options: OptionsRequest): Promise<boolean>;
    function uploadFile(options: OptionsRequest): Promise<boolean>;
}
