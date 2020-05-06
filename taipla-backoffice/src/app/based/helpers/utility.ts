export { }

declare global {
    interface String {
        _trim(pattern: string): string;
        _startTrim(pattern: string)
        _endTrim(pattern: string)
    }
}

function _trim(pattern: string = ' '): string {

    const patternStr = `(^\\${pattern}+|\\${pattern}+$)`;
    const regex = new RegExp(patternStr, 'mg');

    return this.replace(regex, '');
}

function _startTrim(pattern: string = ' '): string {

    const patternStr = `(^\\${pattern}+)`;
    const regex = new RegExp(patternStr, 'mg');

    return this.replace(regex, '');
}

function _endTrim(pattern: string = ' '): string {

    const patternStr = `(\\${pattern}+$)`;
    const regex = new RegExp(patternStr, 'mg');

    return this.replace(regex, '');
}

//=>Defined function
String.prototype._trim = _trim;
String.prototype._startTrim = _startTrim;
String.prototype._endTrim = _endTrim;