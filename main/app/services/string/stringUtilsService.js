/**
 * Created by SZA on 28/06/2016.
 */

IteSoft
    .factory('itStringUtilsService', [function () {
        return {
            getLower: _getLower,
            removeAccent: _removeAccent,
            clear: _clear,
            cleanDomRef: {
                _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                encode: function (e) {
                    if (e) {
                        var t = "";
                        {
                        }
                        var n, r, i, s, o, u, a;
                        var f = 0;
                        e = this._utf8_encode(e);
                        while (f < e.length) {
                            n = e.charCodeAt(f++);
                            r = e.charCodeAt(f++);
                            i = e.charCodeAt(f++);
                            s = n >> 2;
                            o = (n & 3) << 4 | r >> 4;
                            u = (r & 15) << 2 | i >> 6;
                            a = i & 63;
                            if (isNaN(r)) {
                                u = a = 64
                            } else if (isNaN(i)) {
                                a = 64
                            }
                            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
                        }
                        return t
                    }
                },
                decode: function (e) {
                    var t = "";
                    var n, r, i;
                    var s, o, u, a;
                    var f = 0;
                    if (e.replace) {
                        e = e.replace(/[^A-Za-z0-9+/=]/g, "");
                        while (f < e.length) {
                            s = this._keyStr.indexOf(e.charAt(f++));
                            o = this._keyStr.indexOf(e.charAt(f++));
                            u = this._keyStr.indexOf(e.charAt(f++));
                            a = this._keyStr.indexOf(e.charAt(f++));
                            n = s << 2 | o >> 4;
                            r = (o & 15) << 4 | u >> 2;
                            i = (u & 3) << 6 | a;
                            t = t + String.fromCharCode(n);
                            if (u != 64) {
                                t = t + String.fromCharCode(r)
                            }
                            if (a != 64) {
                                t = t + String.fromCharCode(i)
                            }
                        }
                    }
                    t = this._utf8_decode(t);
                    return t
                },
                _utf8_encode: function (e) {
                    var t = "";
                    if (e.replace) {
                        e = e.replace(/rn/g, "n");
                        for (var n = 0; n < e.length; n++) {
                            var r = e.charCodeAt(n);
                            if (r < 128) {
                                t += String.fromCharCode(r)
                            } else if (r > 127 && r < 2048) {
                                t += String.fromCharCode(r >> 6 | 192);
                                t += String.fromCharCode(r & 63 | 128)
                            } else {
                                t += String.fromCharCode(r >> 12 | 224);
                                t += String.fromCharCode(r >> 6 & 63 | 128);
                                t += String.fromCharCode(r & 63 | 128)
                            }
                        }
                    }
                    return t
                },
                _utf8_decode: function (e) {
                    var t = "";
                    var n = 0;
                    var r = c1 = c2 = 0;
                    while (n < e.length) {
                        r = e.charCodeAt(n);
                        if (r < 128) {
                            t += String.fromCharCode(r);
                            n++
                        } else if (r > 191 && r < 224) {
                            c2 = e.charCodeAt(n + 1);
                            t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                            n += 2
                        } else {
                            c2 = e.charCodeAt(n + 1);
                            c3 = e.charCodeAt(n + 2);
                            t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                            n += 3
                        }
                    }
                    return t
                }
            }
        };

        /**
         * Clear content by removing accent and case
         * @param value
         * @returns {string}
         * @private
         */
        function _clear(value) {
            var result = "";
            result = _getLower(value);
            result = _removeAccent(result);
            return result;
        }

        /**
         *
         * @param value
         * @returns {string}
         * @private
         */
        function _getLower(value) {
            var result = "";
            if (angular.isDefined(value) && value.toLowerCase) {
                result += value.toLowerCase();
            } else {
                result += value;
            }
            return result;
        }

        /**
         *
         * @param value
         * @returns {string}
         * @private
         */
        function _removeAccent(value) {
            var diacritics = [
                {char: 'A', base: /[\300-\306]/g},
                {char: 'a', base: /[\340-\346]/g},
                {char: 'E', base: /[\310-\313]/g},
                {char: 'e', base: /[\350-\353]/g},
                {char: 'I', base: /[\314-\317]/g},
                {char: 'i', base: /[\354-\357]/g},
                {char: 'O', base: /[\322-\330]/g},
                {char: 'o', base: /[\362-\370]/g},
                {char: 'U', base: /[\331-\334]/g},
                {char: 'u', base: /[\371-\374]/g},
                {char: 'N', base: /[\321]/g},
                {char: 'n', base: /[\361]/g},
                {char: 'C', base: /[\307]/g},
                {char: 'c', base: /[\347]/g}
            ];
            var result = value;
            diacritics.forEach(function (letter) {
                result = result.replace(letter.base, letter.char);
            });
            return result;
        }


    }])