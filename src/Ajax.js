var SweetMeSoft;
(function (SweetMeSoft) {
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
    async function getOptions(options) {
        options = (SweetMeSoft.setDefaults(options, SweetMeSoft.defaultsSelect));
        let extraText = '';
        return get({
            url: options.url,
            data: options.data,
            showSuccess: false,
            jwt: options.jwt,
            lang: options.lang,
            successCallback: data => {
                for (let dropDown of options.dropDowns) {
                    let firstText = options.firstText;
                    let closeOnSelect = false;
                    let allowClear = false;
                    if (options.enable) {
                        dropDown.removeAttr('disabled');
                    }
                    dropDown.empty();
                    if (dropDown.attr('multiple') === undefined) {
                        dropDown.append('<option value="" disabled selected>' + firstText + '</option>');
                        closeOnSelect = true;
                    }
                    else {
                        dropDown.append('<option value="" disabled>' + firstText + '</option>');
                        allowClear = true;
                    }
                    $.each(data, (key, val) => {
                        extraText = '';
                        if (!options.extraOption.isNullOrEmpty()) {
                            extraText += ' data-' + options.extraOption + '="' + val[options.extraOption] + '"';
                        }
                        if (!options.extraOption2.isNullOrEmpty()) {
                            extraText += ' data-' + options.extraOption2 + '="' + val[options.extraOption2] + '"';
                        }
                        if (!options.extraOption3.isNullOrEmpty()) {
                            extraText += ' data-' + options.extraOption3 + '="' + val[options.extraOption3] + '"';
                        }
                        if (!options.subTextOption.isNullOrEmpty()) {
                            extraText += ' data-subtext="' + val[options.subTextOption].slice(0, options.limitSubTextOption) + '"';
                        }
                        if (val != null && options.text == '') {
                            dropDown.append('<option value="' + val + '"' + extraText + '>' + val + '</option>');
                        }
                        else {
                            if (val != null && options.text != undefined) {
                                const route = options.text.split('.');
                                let text = '';
                                let copy = val;
                                for (let item of route) {
                                    text = copy[item];
                                    copy = val[item];
                                }
                                let smallText = '';
                                if (!options.subTextOption.isNullOrEmpty()) {
                                    smallText = '<small class=\'text-muted\'>' + val[options.subTextOption].slice(0, options.limitSubTextOption) + '</small>';
                                }
                                let flag = options.isCountries ? 'data-content="<img src=\'https://flagsapi.com/' + val.code + '/flat/24.png\' style=\'margin-right: .7rem;\'>' + text + " " + smallText + ' "' : '';
                                dropDown.append('<option ' + flag + ' value="' + val[options.internal] + '"' + extraText + '>' + text + '</option>');
                            }
                        }
                    });
                    if (options.urlValues != undefined && options.urlValues !== '') {
                        get({
                            url: options.urlValues,
                            showSuccess: false,
                            successCallback: response => {
                                const array = [];
                                if (response != null) {
                                    for (let i = 0; i < response.length; i++) {
                                        array.push(response[i]['id']);
                                    }
                                }
                                dropDown.val(array);
                                dropDown.initializeSelect();
                            }
                        });
                    }
                    else {
                        if (options.value != null && options.value !== 0 && options.value !== '') {
                            dropDown.val(options.value);
                        }
                        else {
                            if (data.length === 1 && options.autoSelect) {
                                let uniqueOption = dropDown.find(':not([disabled]):first').val();
                                dropDown.val(uniqueOption);
                                dropDown.trigger('change');
                            }
                        }
                        if (options.value != null && options.value !== 0 && options.value !== '') {
                            dropDown.val(options.value);
                        }
                    }
                    dropDown.initializeSelect();
                }
                if (options.callback != undefined) {
                    options.callback(data);
                }
            }
        });
    }
    SweetMeSoft.getOptions = getOptions;
    /**
     *
     * @param options
     */
    async function get(options) {
        SweetMeSoft.on();
        options = (SweetMeSoft.setDefaults(options, SweetMeSoft.defaultsRequest));
        return $.ajax({
            url: options.url,
            data: options.data,
            traditional: true,
            contentType: options.contentType,
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
                xhr.setRequestHeader('Accept-Language', options.lang);
                if (options.jwt && options.jwt !== '') {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + options.jwt);
                }
            }
        }).then((response) => {
            handleAjaxSuccess(options, response);
            return true;
        }).catch((jqXhr) => {
            handleAjaxError(options, jqXhr);
            return false;
        });
    }
    SweetMeSoft.get = get;
    /**
     *
     * @param options
     */
    async function post(options) {
        SweetMeSoft.on();
        options = (SweetMeSoft.setDefaults(options, SweetMeSoft.defaultsRequest));
        return $.ajax({
            url: options.url,
            data: options.data,
            contentType: options.contentType,
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
                xhr.setRequestHeader('Accept-Language', options.lang);
                if (options.jwt && options.jwt !== '') {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + options.jwt);
                }
            }
        }).then((response) => {
            handleAjaxSuccess(options, response);
            return true;
        }).catch((jqXhr) => {
            handleAjaxError(options, jqXhr);
            return false;
        });
    }
    SweetMeSoft.post = post;
    /**
     *
     * @param options
     */
    async function put(options) {
        SweetMeSoft.on();
        options = (SweetMeSoft.setDefaults(options, SweetMeSoft.defaultsRequest));
        return $.ajax({
            url: options.url,
            data: options.data,
            contentType: options.contentType,
            type: 'PUT',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
                xhr.setRequestHeader('Accept-Language', options.lang);
                if (options.jwt && options.jwt !== '') {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + options.jwt);
                }
            }
        }).then((response) => {
            handleAjaxSuccess(options, response);
            return true;
        }).catch((jqXhr) => {
            handleAjaxError(options, jqXhr);
            return false;
        });
    }
    SweetMeSoft.put = put;
    /**
     *
     * @param options
     */
    async function del(options) {
        SweetMeSoft.on();
        options = (SweetMeSoft.setDefaults(options, SweetMeSoft.defaultsRequest));
        return $.ajax({
            url: options.url,
            data: options.data,
            contentType: options.contentType,
            type: 'DELETE',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
                xhr.setRequestHeader('Accept-Language', options.lang);
                if (options.jwt && options.jwt !== '') {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + options.jwt);
                }
            }
        }).then((response) => {
            handleAjaxSuccess(options, response);
            return true;
        }).catch((jqXhr) => {
            handleAjaxError(options, jqXhr);
            return false;
        });
    }
    SweetMeSoft.del = del;
    async function downloadFile(options) {
        SweetMeSoft.on();
        options = (SweetMeSoft.setDefaults(options, SweetMeSoft.defaultsRequest));
        let form = new FormData();
        for (let key of Object.keys(options.data)) {
            if (Object.prototype.toString.call(options.data[key]) === '[object Array]') {
                for (let obj of options.data[key]) {
                    form.append(key, obj);
                }
            }
            else {
                form.append(key, options.data[key]);
            }
        }
        return $.ajax({
            type: 'POST',
            url: options.url,
            processData: false,
            contentType: false,
            data: form,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
                xhr.setRequestHeader('Accept-Language', options.lang);
                if (options.jwt && options.jwt !== '') {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + options.jwt);
                }
            },
            xhrFields: {
                responseType: 'blob'
            }
        }).then((response) => {
            const a = document.createElement('a');
            const url = window.URL.createObjectURL(response);
            a.href = url;
            a.download = options.filename;
            a.click();
            window.URL.revokeObjectURL(url);
            handleAjaxSuccess(options, response);
            return true;
        }).catch((jqXhr) => {
            handleAjaxError(options, jqXhr);
            return false;
        });
    }
    SweetMeSoft.downloadFile = downloadFile;
    async function uploadFile(options) {
        SweetMeSoft.on();
        options = (SweetMeSoft.setDefaults(options, SweetMeSoft.defaultsRequest));
        var form = new FormData();
        if (options.uploadControl != null) {
            const files = options.uploadControl.get(0).files;
            if (files != null) {
                for (let i = 0; i < files.length; i++) {
                    form.append('files', files[i]);
                }
            }
            else {
                swal.fire('Error', 'There is no files selected.', 'error');
            }
        }
        for (const item of Object.keys(options.data)) {
            if (Array.isArray(options.data[item])) {
                for (const item2 of options.data[item]) {
                    form.append(item, item2);
                }
            }
            else {
                form.append(item, options.data[item]);
            }
        }
        return $.ajax({
            type: 'POST',
            url: options.url,
            dataType: 'json',
            contentType: false,
            processData: false,
            data: form,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
                xhr.setRequestHeader('Accept-Language', options.lang);
                if (options.jwt && options.jwt !== '') {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + options.jwt);
                }
            }
        }).then((response) => {
            handleAjaxSuccess(options, response);
            return true;
        }).catch((jqXhr) => {
            handleAjaxError(options, jqXhr);
            return false;
        });
    }
    SweetMeSoft.uploadFile = uploadFile;
    function handleAjaxError(options, jqXhr) {
        SweetMeSoft.off();
        if (options.showError) {
            if (options.errorMessage === undefined || options.errorMessage === null || options.errorMessage === '') {
                console.error(jqXhr.responseJSON != undefined ? jqXhr.responseJSON.detail : jqXhr.responseText);
                swal.fire('Error', jqXhr.responseJSON != undefined ? jqXhr.responseJSON.title : jqXhr.responseText, 'error');
            }
            else {
                console.error(options.errorMessage);
                swal.fire('Error', options.errorMessage, 'error');
            }
        }
        if (options.errorCallback != undefined) {
            options.errorCallback(jqXhr);
        }
    }
    function handleAjaxSuccess(options, response) {
        if (options.showSuccess) {
            swal.fire({
                title: options.successTitle,
                text: options.successMessage != '' ? options.successMessage : 'Request made successfully',
                icon: 'success',
                onAfterClose: () => {
                    if (options.successCallback != undefined) {
                        options.successCallback(response);
                    }
                }
            });
        }
        else {
            if (options.successCallback != undefined) {
                options.successCallback(response);
            }
        }
        SweetMeSoft.off();
    }
})(SweetMeSoft || (SweetMeSoft = {}));
