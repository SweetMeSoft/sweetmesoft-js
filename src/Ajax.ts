namespace SweetMeSoft {
    /**
     *
     * @param options
     */
    export async function getOptions(options: OptionsSelect): Promise<boolean> {
        options = <OptionsSelect>(setDefaults(options, defaultsSelect));
        let extraText = '';
        return get({
            url: options.url,
            data: options.data,
            showSuccess: false,
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
                    } else {
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
                        } else {
                            if (val != null && options.text != undefined) {
                                const route = options.text.split('.');
                                let text = '';
                                let copy = val;
                                for (let item of route) {
                                    text = copy[item]
                                    copy = val[item]
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
                        })
                    } else {
                        if (options.value != null && options.value !== 0 && options.value !== '') {
                            dropDown.val(options.value);
                        } else {
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
        })
    }

    /**
     *
     * @param options
     */
    export async function get(options: OptionsRequest): Promise<boolean> {
        on();
        options = <OptionsRequest>(setDefaults(options, defaultsRequest));
        return $.ajax({
            url: options.url,
            data: options.data,
            traditional: true,
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
            }
        }).then((response) => {
            handleAjaxSuccess(options, response);
            return true;
        }).catch((jqXhr) => {
            handleAjaxError(options, jqXhr)
            return false;
        });
    }

    /**
     *
     * @param options
     */
    export async function post(options: OptionsRequest): Promise<boolean> {
        on();
        options = <OptionsRequest>(setDefaults(options, defaultsRequest));
        return $.ajax({
            url: options.url,
            data: options.data,
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
            }
        }).then((response) => {
            handleAjaxSuccess(options, response);
            return true;
        }).catch((jqXhr) => {
            handleAjaxError(options, jqXhr)
            return false;
        });
    }

    export async function downloadFile(options: OptionsRequest): Promise<boolean> {
        on();
        options = <OptionsRequest>(setDefaults(options, defaultsRequest));
        let form = new FormData();
        for (let key of Object.keys(options.data)) {
            if (Object.prototype.toString.call(options.data[key]) === '[object Array]') {
                for (let obj of options.data[key]) {
                    form.append(key, obj);
                }
            } else {
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
            handleAjaxError(options, jqXhr)
            return false;
        });
    }

    export async function uploadFile(options: OptionsRequest): Promise<boolean> {
        on();
        options = <OptionsRequest>(setDefaults(options, defaultsRequest));
        var form = new FormData();
        if (options.uploadControl != null) {
            const files = (options.uploadControl.get(0) as HTMLInputElement).files;
            if (files != null) {
                for (let i = 0; i < files.length; i++) {
                    form.append('files', files[i]);
                }
            } else {
                swal.fire('Error', 'There is no files selected.', 'error')
            }
        }

        for (const item of Object.keys(options.data)) {
            if (Array.isArray(options.data[item])) {
                for (const item2 of options.data[item]) {
                    form.append(item, item2);
                }
            } else {
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
            }
        }).then((response) => {
            handleAjaxSuccess(options, response);
            return true;
        }).catch((jqXhr) => {
            handleAjaxError(options, jqXhr)
            return false;
        });
    }

    function handleAjaxError(options: OptionsRequest, jqXhr) {
        off()
        if (options.showError) {
            if (options.errorMessage === undefined || options.errorMessage === null || options.errorMessage === '') {
                console.error(jqXhr.responseJSON != undefined ? jqXhr.responseJSON.detail : jqXhr.responseText)
                swal.fire('Error', jqXhr.responseJSON != undefined ? jqXhr.responseJSON.title : jqXhr.responseText, 'error');
            } else {
                console.error(options.errorMessage)
                swal.fire('Error', options.errorMessage, 'error');
            }
        }

        if (options.errorCallback != undefined) {
            options.errorCallback(jqXhr);
        }
    }

    function handleAjaxSuccess(options: OptionsRequest, response: any) {
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
        } else {
            if (options.successCallback != undefined) {
                options.successCallback(response);
            }
        }

        off();
    }
}
