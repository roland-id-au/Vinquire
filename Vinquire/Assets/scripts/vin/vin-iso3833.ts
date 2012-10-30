/// <reference path="vin-format.ts"/>
/// <reference path="vin-wmi.ts"/>

module Vin.Format {
    export var ISO3833: string = "ISO 3833";
    var ISO3833Factory = function() { return new ISO3833Format(); }
    Factories.push(ISO3833Factory);

    class ISO3833Format implements Format {
        private lastMatch : string;

        getName() { return ISO3833; }
        getValidator() : FormatValidator {
            return new ISO3833Validator();
        }

        match(value: string)
        {
            var wmi = value.substr(0, 3).toUpperCase();

            if(wmi.length < 3)
                return false;

            if(wmi == this.lastMatch)
                return true;

            if(WMI.indexOf(wmi) != -1){
                this.lastMatch = wmi;
                return true;
            }
            
            return false;
        }
    }

    class ISO3833Validator implements FormatValidator {
        private invalidChars: RegExp = /[^A-z0-9]/;
        private illegalChars: RegExp = /[iIoOQq ]/;
        private valid: bool = false;

        validate(value: string) : FormatError {
            var error: FormatError;
            var value = value.replace(/[^\w]/g, '');
            var valid = false;

            if (this.invalidChars.test(value) || this.illegalChars.test(value)) {
                error = this.createFormatError(value);
            } else {
                valid = true;
            }

            this.valid = valid;

            return error;
        }

        private createFormatError(value: string) : FormatError {
            var error = new ISO3833Error("Hmm, that doesn't seem right...");
            var content = '';
            content += 'Try checking the letters highligted below to make sure they exactly match your <i>VIN</i>.';
            content += '<div class="vin-display">';
            content += '<ul>';

            for (var i = 0; i < value.length; i++) {
                var char = value.charAt(i);

                if (this.invalidChars.test(char) || this.illegalChars.test(char)) {
                    content += '<li class="vin-display-char invalid">' + char + '</li>';
                } else {
                    content += '<li class="vin-display-char">' + char + '</li>';
                }
            }

            content += '</ul>';
            content += '</div>';

            error.description = content;

            return error;
        }
    }

    class ISO3833Error implements FormatError {
        description:string;

        constructor (public title: string) { }

        getTitle() { return this.title; }
        getDescription() { return this.description; }
    }
}