/// <reference path="../jquery.d.ts" />
/// <reference path="vin-format.ts" />

module Vin {
    export class Input {
        private formatSelector: Format.FormatSelector;
        private formatValidator: Format.FormatValidator;
        private errorRenderer: ErrorRenderer;

        constructor (private inputEl: HTMLInputElement) {
            this.formatSelector = Format.FormatSelector.createDefault();
            this.errorRenderer = new ErrorRenderer(inputEl.parentElement);

            var jQuery = $(inputEl);
            jQuery.bind('keydown', this.filterInput.bind(this));
            jQuery.bind('propertychange keyup paste', this.input.bind(this));
        }

        private filterInput(e: JQueryEventObject) {
            this.onFilterInput(e);
        }

        onFilterInput(e: JQueryEventObject) {
            var key = e.which;

            if (
                (key == 32) ||
                (key >= 48 && key <= 57 && event.shiftKey) ||
                (key >= 91 && key <= 93) || // Alphanumeric
                (key > 106)
            ) {
                e.preventDefault();
                e.stopPropagation();
            }
        }

        private input(e: JQueryEventObject) {
            if (this.formatSelector.update(this.inputEl.value)) {
                var currentFormat = this.formatSelector.getCurrent();
                this.formatValidator = currentFormat.getValidator();
                this.onFormatChanged(<string>currentFormat.getName());
            }

            if (!this.inputEl.disabled)
                this.onInput(e);
        }

        onInput(e: JQueryEventObject) {
            if (this.formatValidator) {
                var error = this.formatValidator.validate(this.inputEl.value);
                this.onRenderError(error);
            }
        }

        onFormatChanged(formatName: string) {
        }

        onRenderError(error: Format.FormatError) {
            this.errorRenderer.render(error);
        }
    }

    export class ErrorRenderer {
        error: Format.FormatError;

        constructor (private targetEl: Element) { }

        render(error: Format.FormatError = null) {
            var jQuery = <any>$(this.targetEl);
            if (error && this.error && error.getTitle() == this.error.getTitle()) {
                this.error = error;
                jQuery.data('popover').update(error.getDescription());
            } else {
                if (this.error) {
                    this.error = null;
                    jQuery.popover('destroy');
                }
                if (error) {
                    this.error = error;

                    jQuery.popover({
                        animation: true,
                        placement: 'inside bottom',
                        trigger: 'manual',
                        title: error.getTitle(),
                        content: error.getDescription()
                    });
                    jQuery.popover('show');
                }
            }
        }
    }
}