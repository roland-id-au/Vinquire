/// <reference path="vin-format.ts"/>
/// <reference path="vin-wmi.ts"/>

module Vin.Format {
    export var PRE1981: string = "Pre 1981";
    var PRE1981Factory = function() { return new PRE1981Format(); }
    Factories.push(PRE1981Factory);

    class PRE1981Format implements Format {
        private lastMatch : string;

        getName() { return PRE1981; }

        getValidator() : FormatValidator {
            return new NullValidator();
        }

        match(value: string)
        {
            var wmi = value.substr(0, 3).toUpperCase();

            if(wmi.length < 3)
                return false;

            if(wmi == this.lastMatch)
                return true;

            if(WMI.indexOf(wmi) == -1){
                this.lastMatch = wmi;
                return true;
            }
            
            return false;
        }
    }
}