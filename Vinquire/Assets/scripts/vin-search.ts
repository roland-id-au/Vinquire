/// <reference path="vin/vin-pre1981.ts" />
/// <reference path="vin/vin-iso3833.ts" />
/// <reference path="vin/vin-input.ts" />

class SearchInput extends Vin.Input {
    constructor (private inputEl: HTMLInputElement) {
        super(inputEl);
    }

    onFormatChanged(formatName: string) {
        switch (formatName) {
            case Vin.Format.PRE1981:
                this.notifyUnsupportedFormat();
                break;
            case Vin.Format.ISO3833:
                alert('ISO3833');
                break;
            default:
                // Unknown format
                break;
        }
    }

    private notifyUnsupportedFormat() {
        document.getElementById('search-button').disabled = true;

        var title = "That looks like a very old VIN...";
        var message = "There is no standard format for VINs prior to 1981, so we'll have to make some enquiries.";

        var jQuery = <any>$(this.inputEl.parentElement);
        jQuery.popover({
            animation: true,
            placement: 'inside bottom',
            trigger: 'manual',
            title: title,
            content: message
        });
        jQuery.popover('show');
    }

    private acnknowledgeUnknownFormat() {
    }
}

!function ($) {
    $.extend(true, $.fn.popover.Constructor.prototype, {
        update: function () {
            if (arguments.length == 1 && typeof (arguments[0]) == 'string')
                this.options.content = arguments[0];

            var $tip = this.tip(), content = this.getContent();

            $tip.find('.popover-content > *')[this.options.html ? 'html' : 'text'](content)

            //$tip.removeClass('fade top bottom left right in')
        }
    });
}(jQuery);

$(document).ready(function () {
    var inputEl = <HTMLInputElement>document.getElementById("search-input");
    var vinInput = new SearchInput(inputEl);
});