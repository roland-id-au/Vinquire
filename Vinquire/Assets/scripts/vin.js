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
}(window.jQuery);




var invalidChars = /[^A-z0-9]/;
var blockChars = /[iIoOQq ]/;

$(document).ready(function () {
    //$("#vin").mask("vvv-vvvvvv-vvvvvvvv");
    $('#vin').bind('keydown', function(e){
        var key = e.keyCode | e.charCode;

        if (
            (key == 32) ||
            (key >= 48 && key <= 57 && event.shiftKey) || 
            (key >= 91 && key <= 93) || // Alphanumeric
            (key > 106)
        ) {
            event.preventDefault();
            event.stopPropagation();
        }
    });

    $('#vin').bind('propertychange keyup paste', function (e) {
        var el = $(this);
        var wrapper = el.parent();
        var old = el.data('old');
        var value = el.val().replace(/[^\w]/g, '');
        var hasPopover = wrapper.data('popover') != null || false;
        var formattedValue = '';

        //for (var i = 0; i < value.length; i++) {
        //    formattedValue += value.charAt(i);
            
        //    if ((i == 2 || i == 8) && i < value.length - 1)
        //        formattedValue += '-';
        //}

        //if (old != formattedValue && && ) {
        //    el.data('old', formattedValue);
        //    el.val(formattedValue);
        //}

        if (invalidChars.test(value) || blockChars.test(value)) {
            var content = '';
            content += 'Try checking the letters highligted below to make sure they exactly match your <i>VIN</i>.';
            content += '<div class="vin-display">';
            content += '<ul>';

            for(var i = 0; i < value.length; i++){
                var char = value.charAt(i);

                if (invalidChars.test(char) || blockChars.test(char)) {
                    content += '<li class="vin-display-char invalid">' + char + '</li>';
                } else {
                    content += '<li class="vin-display-char">' + char + '</li>';
                }
            }

            content += '</ul>';
            content += '</div>';

            if (!hasPopover) {
                wrapper.popover({
                    animation: true,
                    placement: 'inside bottom',
                    trigger: 'manual',
                    title: 'Hmm, that doesn\'t seem right...',
                    //content: function () { return content; }
                    content: content
                });

                wrapper.popover('show');

            } else {
                wrapper.data('popover').update(content);
            }

        } else {
            if (hasPopover) {
                wrapper.popover('destroy')
            }
        }
    });
});