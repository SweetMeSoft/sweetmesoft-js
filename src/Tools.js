var SweetMeSoft;
(function (SweetMeSoft) {
    function on() {
        const overlay = document.getElementById('overlay');
        if (overlay != null) {
            overlay.style.display = 'block';
            onQuantity++;
        }
    }
    SweetMeSoft.on = on;
    function off() {
        if (onQuantity > 0) {
            onQuantity--;
            if (onQuantity === 0) {
                const overlay = document.getElementById('overlay');
                if (overlay != null) {
                    overlay.style.display = 'none';
                }
            }
        }
    }
    SweetMeSoft.off = off;
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    SweetMeSoft.capitalizeFirstLetter = capitalizeFirstLetter;
    /**
     *
     * @param date
     * @param format
     * @param withTime
     */
    function getFormatedDate(date, format, withTime) {
        const year = date.getFullYear().toString();
        let month = (date.getMonth() + 1).toString();
        let day = date.getDate().toString();
        if (date.getDate() < 10) {
            day = '0' + day;
        }
        if (date.getMonth() + 1 < 10) {
            month = '0' + month;
        }
        if (!withTime) {
            return format.replace('yyyy', year).replace('MM', month).replace('dd', day);
            //return monthsAbreviated[date.getMonth()] + ' ' + day + ', ' + year;
        }
        else {
            let hour = date.getHours().toString();
            let minutes = date.getMinutes().toString();
            let seconds = date.getSeconds().toString();
            if (date.getHours() < 10) {
                hour = '0' + hour;
            }
            if (date.getMinutes() < 10) {
                minutes = '0' + minutes;
            }
            if (date.getSeconds() < 10) {
                seconds = '0' + seconds;
            }
            return format.replace('yyyy', year).replace('MM', month).replace('dd', day).replace('HH', hour).replace('mm', minutes).replace('ss', seconds);
        }
    }
    SweetMeSoft.getFormatedDate = getFormatedDate;
    function isValidDate(date) {
        return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
    }
    SweetMeSoft.isValidDate = isValidDate;
    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1), sURLVariables = sPageURL.split('&'), sParameterName, i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam && sParameterName[1] !== undefined) {
                return decodeURIComponent(sParameterName[1]);
            }
        }
        return '';
    }
    SweetMeSoft.getUrlParameter = getUrlParameter;
    function generateCropper(options) {
        let cropper;
        options.uploadControl.hide();
        options.imgControl.addClass('animate-cropper');
        options.imgControl.on('click', () => {
            options.uploadControl.click();
        });
        options.uploadControl.on('change', event => {
            swal.fire({
                title: 'Crop image',
                allowOutsideClick: false,
                html: '<img id="imgUploadedImage" alt="" src="" style="width: 100%; height: 100%;"/>',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                onOpen: () => {
                    const upl = $('#imgUploadedImage');
                    upl.attr('src', URL.createObjectURL(event.target.files[0]));
                    cropper = new Cropper(upl[0], {
                        initialAspectRatio: getAspectRatio(options.aspectRatio),
                        aspectRatio: getAspectRatio(options.aspectRatio),
                        modal: true,
                        autoCropArea: 1
                    });
                },
            }).then(value => {
                if (value.value === true) {
                    options.imgControl.attr('src', cropper.getCroppedCanvas().toDataURL());
                    cropper.getCroppedCanvas().toBlob(blob => {
                        options.callback(blob);
                    });
                }
            });
        });
    }
    SweetMeSoft.generateCropper = generateCropper;
    function generateModal(options) {
        options = (SweetMeSoft.setDefaults(options, SweetMeSoft.defaultsModal));
        const modal = new bootstrap.Modal(document.getElementById('modal'), { backdrop: true });
        const body = $('#divModalBody');
        const title = $('#txtModalTitle');
        const modalDialog = $('.modal-dialog');
        const btnModalPrimary = $('#btnModalPrimary');
        const btnModalSecondary = $('#btnModalCancel');
        btnModalPrimary.text(options.primaryText);
        btnModalSecondary.text(options.cancelText);
        body.html('');
        title.text(options.title);
        switch (options.type) {
            case 'view':
                on();
                body.load(options.viewUrl, options.viewData, () => {
                    if (options.loadCallback != undefined) {
                        options.loadCallback();
                        off();
                    }
                    else {
                        off();
                    }
                });
                break;
            case 'html':
                body.html(options.html);
                if (options.loadCallback != undefined) {
                    options.loadCallback();
                }
                break;
        }
        if (options.primaryCallback != undefined) {
            btnModalPrimary.show();
            btnModalPrimary.off('click');
            btnModalPrimary.on('click', () => {
                options.primaryCallback().then((success) => {
                    if (success) {
                        modal.hide();
                    }
                });
            });
        }
        else {
            btnModalPrimary.hide();
        }
        if (options.cancelCallback != undefined) {
            btnModalSecondary.show();
            btnModalSecondary.off('click');
            btnModalSecondary.on('click', () => {
                options.cancelCallback();
            });
        }
        else {
            btnModalSecondary.hide();
        }
        switch (options.size) {
            case 'big':
                modalDialog.css('max-width', '80%');
                break;
            case 'small':
                modalDialog.css('max-width', '500px');
                break;
        }
        modalDialog.css('height', options.height);
        modal.show();
    }
    SweetMeSoft.generateModal = generateModal;
    function generateTable(options) {
        options = (SweetMeSoft.setDefaults(options, SweetMeSoft.defaultsTable));
        if (options.type == 'url') {
            SweetMeSoft.get({
                url: options.url,
                data: options.urlParams,
                showSuccess: false,
                jwt: options.jwt,
                successCallback: data => createTable(options, data)
            });
        }
        else {
            createTable(options, options.data);
        }
    }
    SweetMeSoft.generateTable = generateTable;
    function getSelectedRows(table) {
        return table.DataTable().rows({ selected: true }).data().toArray();
    }
    SweetMeSoft.getSelectedRows = getSelectedRows;
    function createTable(options, data) {
        const tableId = options.table.attr('id');
        options.hiddenColumns.forEach((column, index) => {
            options.hiddenColumns[index] = column.toLowerCase();
        });
        options.filterColumns.forEach((column, index) => {
            options.filterColumns[index] = column.toLowerCase();
        });
        let columns = [];
        if (options.showCheckbox) {
            columns.push({
                targets: 0,
                data: '',
                defaultContent: '',
                orderable: false,
                className: 'select-checkbox'
            });
        }
        let index = 0;
        if (data.length > 0) {
            const keys = Object.keys(data[0]);
            for (const key of keys) {
                const customFormat = options.customColumns.find(model => model.originalTitle.toLowerCase() == key.toLowerCase());
                let showColumn = customFormat != undefined && customFormat.show != undefined ? customFormat.show(data) : true;
                columns.push({
                    targets: index,
                    data: key,
                    title: customFormat != undefined ? customFormat.title == undefined ? customFormat.originalTitle : customFormat.title : capitalizeFirstLetter(key),
                    visible: !options.hiddenColumns.includes(key.toLowerCase()) && showColumn,
                    className: customFormat != undefined && (customFormat.format == 'currency' || customFormat.format == 'right' || customFormat.format == 'percentage') ? 'dt-body-right' : '',
                    createdCell: (cell, cellData, rowData, rowIndex, colIndex) => {
                        if (customFormat != undefined) {
                            if (customFormat.popover) {
                                $(cell).addClass('popoverclass').attr('data-bs-toggle', 'popover').attr('data-bs-container', 'body').attr('data-bs-placement', 'top').attr('tabindex', '0').attr('data-bs-trigger', 'focus').attr('data-bs-content', cellData);
                            }
                            if (customFormat.backgroundColor != undefined) {
                                $(cell).css('background-color', customFormat.backgroundColor);
                            }
                            switch (customFormat.format) {
                                case 'currency':
                                case 'percentage':
                                    if (+cellData > 0) {
                                        $(cell).css('color', 'green');
                                    }
                                    else {
                                        if (+cellData < 0) {
                                            $(cell).css('color', 'red');
                                        }
                                    }
                                    break;
                            }
                        }
                        return data;
                    },
                    render: (data, type, row, meta) => {
                        if (customFormat != undefined) {
                            switch (customFormat.format) {
                                case 'right':
                                case 'text':
                                    break;
                                case 'currency':
                                    const dollar = new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 2,
                                    });
                                    if (+data < 0) {
                                        $(row).css('background-color', '#ffbaba');
                                    }
                                    else {
                                        $(row).css('background-color', '#d7fcdf');
                                    }
                                    return dollar.format(data);
                                case 'image':
                                    if (data == null || data == '') {
                                        return '<img src="https://cdn.jsdelivr.net/npm/sweetmesoft-js@latest/src/images/default.png" class="rounded-circle" style="height:40px; width: 40px;" alt=""/>';
                                    }
                                    return '<img src="' + data + '" class="rounded-circle" style="height:40px; width: 40px;" alt=""/>';
                                case 'percentage':
                                    if (data == null) {
                                        return '0.00%';
                                    }
                                    if (data.toString().indexOf('%') == -1) {
                                        return data + '%';
                                    }
                                    return data;
                                case 'boolean':
                                    const isChecked = (data == 'true' || data == 'True' || data == 'TRUE' || data == true || data == 1 || data == '1') ? 'checked' : '';
                                    return '<div class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" id="chk" disabled ' + isChecked + '><label class="form-check-label" for="chk"></label></div>';
                                case 'date':
                                    return SweetMeSoft.getFormatedDate(new Date(data.replace('Z', '')), 'yyyy-MM-dd', false);
                                case 'datetime':
                                    return SweetMeSoft.getFormatedDate(new Date(data.replace('Z', '')), 'yyyy-MM-dd HH:mm:ss', true);
                                case 'link':
                                    return '<a target="_blank" href="' + data + '">' + data + '</a>';
                            }
                        }
                        return data;
                    }
                });
            }
            const regex = /^[a-zA-Z]/;
            for (const i in data) {
                const keys = Object.keys(data[i]);
                for (const key of keys) {
                    const date = new Date(data[i][key]);
                    if (data[i][key] != null && isValidDate(date) && !$.isNumeric(parseFloat(data[i][key])) && typeof data[i][key] != 'boolean' && !regex.test((data[i][key]).charAt(0))) {
                        data[i][key] = SweetMeSoft.getFormatedDate(date, 'yyyy-MM-dd', true);
                    }
                }
            }
            index++;
        }
        else {
            data = [];
            columns = [{
                    targets: index,
                    data: options.noDataText,
                    title: options.noDataText
                }];
            index++;
        }
        for (const additionalColumn of options.additionalColumns) {
            columns.push({
                targets: index,
                data: additionalColumn,
                title: capitalizeFirstLetter(additionalColumn)
            });
            index++;
        }
        let indexButton = 0;
        let callbacks = [];
        if (options.buttons.length > 0) {
            columns.push({
                targets: index,
                data: '',
                title: 'Actions',
                className: 'action-row',
                render: (data, type, row) => {
                    let htmlButtons = '';
                    for (let button of options.buttons) {
                        const showButton = button.showButton == undefined ? true : button.showButton(row);
                        const popoverClass = button.popover == '' || button.popover == undefined ? '"' : ' popoverclass" data-bs-toggle="popover" data-bs-container="body" data-bs-placement="top" tabindex="0" data-bs-trigger="hover focus" data-bs-content="' + button.popover;
                        if (showButton) {
                            switch (button.type) {
                                case 'update':
                                    htmlButtons += '<a id="btn' + tableId + indexButton + '" class="btn btn-primary btn-table' + popoverClass + '"><i class="bi-pencil-fill icn-table" style="color: white;"></i></a>';
                                    break;
                                case 'delete':
                                    htmlButtons += '<a id="btn' + tableId + indexButton + '" class="btn btn-danger btn-table' + popoverClass + '"><i class="bi-trash3-fill icn-table" style="color: white;"></i></a>';
                                    break;
                                case 'download':
                                    htmlButtons += '<a id="btn' + tableId + indexButton + '" class="btn btn-primary btn-table' + popoverClass + '"><i class="bi-download icn-table" style="color: white;"></i></a>';
                                    break;
                                case 'custom':
                                    htmlButtons += '<a id="btn' + tableId + indexButton + '" class="btn btn-table' + popoverClass + '" style="background-color: ' + button.color + '"><i class="bi-' + button.icon + ' icn-table" style="color: white;"></i></a>';
                                    break;
                            }
                            callbacks.push({
                                id: indexButton,
                                button: button,
                                row: row
                            });
                            indexButton++;
                        }
                    }
                    return htmlButtons;
                }
            });
            index++;
        }
        if ($.fn.dataTable.isDataTable(options.table)) {
            const table = options.table.DataTable();
            table.destroy();
            options.table.html('');
        }
        const indexColumn = columns.findIndex(model => model.data.toString().toLowerCase() == options.defaultOrderColumn.toLowerCase());
        const lang = window.navigator.languages[0].substring(0, 2);
        let table = options.table.DataTable({
            data: data,
            columns: columns,
            scrollX: true,
            scrollY: options.height,
            stateSave: true,
            retrieve: true,
            ordering: options.canOrder,
            paging: options.showFooter,
            info: options.showFooter,
            autoWidth: options.autoWidth,
            rowCallback: (row, data, index) => {
                options.rowStyle(row, data, index);
            },
            select: options.showCheckbox ? {
                style: 'multi',
                selector: 'td:first-child'
            } : false,
            initComplete: function () {
                this.api()
                    .columns()
                    .every(function () {
                    let column = this;
                    let title = column.header().textContent;
                    if (options.filterColumns.indexOf(title.toLowerCase()) != -1) {
                        let input = document.createElement('input');
                        input.placeholder = title;
                        column.header().replaceChildren(input);
                        input.addEventListener('keyup', () => {
                            if (column.search() !== this.value) {
                                column.search(input.value).draw();
                            }
                        });
                    }
                });
                const state = table.state.loaded();
                if (state) {
                    this.api().columns().eq(0).each(function (colIdx) {
                        const colSearch = state.columns[colIdx].search;
                        if (colSearch.search) {
                            $('input', table.column(colIdx).header()).val(colSearch.search);
                        }
                    });
                    table.draw();
                }
            },
            drawCallback: () => {
                const buttons = options.table.find('.btn-table');
                buttons.off('click');
                buttons.each((index, button) => {
                    $(button).on('click', () => {
                        const id = $(button).attr('id').replace('btn' + tableId, '');
                        const callback = callbacks.find(model => model.id == id);
                        if (callback.button.type == 'delete') {
                            swal.fire({
                                title: 'Delete item',
                                text: 'Are you sure you want to delete this item? This action cannot be undone',
                                icon: 'warning',
                                showCancelButton: true,
                                cancelButtonText: 'No',
                                confirmButtonText: 'Yes'
                            }).then(result => {
                                if (result.value) {
                                    callback.button.callback(callback.row);
                                }
                            });
                        }
                        else {
                            callback.button.callback(callback.row);
                        }
                    });
                });
                const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
                popoverTriggerList.map(function (popoverTriggerEl) {
                    return new bootstrap.Popover(popoverTriggerEl);
                });
            },
            searching: options.showHeader,
            pageLength: options.rowsPerPage,
            order: [[indexColumn == -1 ? 0 : indexColumn, options.defaultOrderType]],
            language: {
                url: 'https://cdn.jsdelivr.net/npm/sweetmesoft-js@latest/src/i18n/' + lang + '.json'
            }
        });
        options.table.off('dblclick');
        options.table.on('dblclick', 'tr', function () {
            options.onDblClick(table.row(this).data());
        });
        delay(500).then(() => {
            table.page(1).draw(true);
            table.page(0).draw(true);
        });
        $("[name='" + tableId + "_length']").removeClass('form-select');
    }
    function getAspectRatio(aspectRatio) {
        if (aspectRatio == 'square') {
            return 1;
        }
        const [numerador, denominador] = aspectRatio.split('/').map(parseFloat);
        return (isNaN(numerador) || isNaN(denominador) || denominador === 0) ? undefined : numerador / denominador;
    }
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
})(SweetMeSoft || (SweetMeSoft = {}));
