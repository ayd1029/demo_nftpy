export const required = (val, msg) => !!val || msg;
export const requiredNumber = (val, msg) => val = val > 0 || msg;
export const minLength = (val, msg, length) => val = val.length >= length || msg;
export const maxLength = (val, msg, length) => val = val.length <= length || msg;
export const minValue = (val, msg, value) => val = val >= value || msg;
export const maxValue = (val, msg, value) => val = val <= value || msg;
export const test = 'test value';