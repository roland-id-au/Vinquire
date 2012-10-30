module Vin.Format {
    export var Factories: Function[] = [];

    export interface Format {
        getName(): string;
        getValidator(): FormatValidator;
        match(value: string): bool;
    }

    export class FormatSelector {
        private current: Format;

        constructor (private formats: Format[], private defaultFormat: Format) {
            if (defaultFormat == null)
                this.defaultFormat = new NullFormat();
        }

        getCurrent(): Format {
            return this.current;
        }

        update(value: string): bool {
            var match: bool = false;

            for (var i = 0; i < this.formats.length; i++) {
                if (this.formats[i].match(value)) {
                    if (this.formats[i] === this.current) {
                        return false;
                    } else {
                        this.current = this.formats[i];
                        return true;
                    }

                    match = true;
                }
            }

            if (!match && this.defaultFormat) {
                this.current = this.defaultFormat;
                return false;
            }

            return false;
        }

        static createDefault(): FormatSelector {
            return new FormatSelector(Factories.map((formatFactory) => formatFactory()), null);
        }
    }

    export interface FormatValidator {
        validate(value: string): FormatError;
    }

    export interface FormatError {
        getTitle(): string;
        getDescription(): string;
    }

    export class NullFormat implements Format {
        getName(): string { return null; }
        getValidator(): FormatValidator { return new NullValidator(); }
        match(value: string): bool { return true; }
    }

    export class NullValidator implements FormatValidator {
        validate(value: string): FormatError {
            return null;
        }
    }
}