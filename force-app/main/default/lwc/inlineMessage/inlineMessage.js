import { LightningElement, api, track } from 'lwc';

const VARIANTS = {
    info: 'utility:info',
    success: 'utility:success',
    warning: 'utility:warning',
    error: 'utility:error',
};

export default class InlineMessage extends LightningElement {
    /** Generic / user-friendly message */
    @api message;

    @track iconName = VARIANTS.info;

    _variant = 'info';
    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        if (VARIANTS[value]) {
            this._variant = value;
            this.iconName = VARIANTS[value];
        }
    }

    @track viewDetails = false;

    _errors = [];

    @api
    get errors() {
        return this._errors;
    }
    /** Single error object or array of error objects */
    set errors(value) {
        if (!Array.isArray(value)) {
            value = [value];
        }
        // Filter out null items and error objects that don't have a message attribute.
        // As a convenience, a component can pass all its @wired properties .error references even if they are null,
        // moving the burden of filtering from each individual component to this central location.

        // TODO: Uncomment line below and remove workaround when W-5644412 is fixed
        // this._errors = value.filter(error => error && error.message);
        // W-5644412 workaround
        this._errors = value
            .filter(error => error && error.body && error.body.message)
            .map(error => ({ message: error.body.message }));
    }

    handleCheckboxChange(event) {
        this.viewDetails = event.target.checked;
    }
}
