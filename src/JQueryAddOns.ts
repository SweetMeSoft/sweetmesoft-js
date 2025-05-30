﻿jQuery.fn.extend({
    disable: function () {
        return this.each(function () {
            this.disabled = true;
        });
    },
    enable: function () {
        return this.each(function () {
            this.disabled = false;
        });
    },
    check: function () {
        return this.each(function () {
            this.parent().addClass('checked');
            return this.prop('checked', true);
        });
    },
    uncheck: function () {
        return this.each(function () {
            $(this).parent().removeClass('checked');
            return this.prop('checked', false);
        });
    },
    checkValidity: function () {
        return this[0].checkValidity();
    },
    initializeSelect: function () {
        return this.each(function () {
            const dropDown = $(this);
            dropDown.selectpicker({
                width: 'auto'
            });
            dropDown.selectpicker('refresh');
        });
    },
    toBlob: function () {
        const img = $(this);
        const imgElement = img[0];
        // Crear un objeto Canvas para dibujar la imagen
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;
        context.drawImage(imgElement, 0, 0);
        // Obtener el objeto Blob de la imagen dibujada en el Canvas
        canvas.toBlob(blob => {
            this.blob = blob;
        });
    }
});

String.prototype.isNullOrEmpty = function () {
    return this == undefined || this === null || this.toString() === '';
}

interface JQuery {
    enable(): JQuery;
    disable(): JQuery;
    check(): JQuery;
    checkValidity(): JQuery;
    initializeSelect(): JQuery;
    toBlob(): JQuery;
}

interface String {
    isNullOrEmpty(): boolean;
}