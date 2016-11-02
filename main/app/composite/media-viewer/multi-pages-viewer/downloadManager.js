'use strict';
/**
 * TODO DownloadManager desc
 */
itMultiPagesViewer
    .factory('DownloadManager', ['$log', function ($log) {
        var digits =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        function dataURItoBlob(dataURI, base64) {
            if(base64 != null && !dataURI.startsWith(base64)) {
                dataURI = base64 + dataURI;
            }
            // convert base64 to raw binary data held in a string
            // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
            var byteString = atob(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

            // write the bytes of the string to an ArrayBuffer
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            // write the ArrayBuffer to a blob, and you're done
            var blob = new Blob([ab], {type: mimeString});
            return blob;

            // Old code
            // var bb = new BlobBuilder();
            // bb.append(ab);
            // return bb.getBlob(mimeString);
        }

        function isValidUrl(url, allowRelative) {
            if (!url || typeof url !== 'string') {
                return false;
            }
            // RFC 3986 (http://tools.ietf.org/html/rfc3986#section-3.1)
            // scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
            var protocol = /^[a-z][a-z0-9+\-.]*(?=:)/i.exec(url);
            if (!protocol) {
                return allowRelative;
            }
            protocol = protocol[0].toLowerCase();
            switch (protocol) {
                case 'http':
                case 'https':
                case 'ftp':
                case 'mailto':
                case 'tel':
                    return true;
                default:
                    return false;
            }
        };

        function download(blobUrl, filename) {
            var a = document.createElement('a');
            if (a.click) {
                // Use a.click() if available. Otherwise, Chrome might show
                // "Unsafe JavaScript attempt to initiate a navigation change
                //  for frame with URL" and not open the PDF at all.
                // Supported by (not mentioned = untested):
                // - Firefox 6 - 19 (4- does not support a.click, 5 ignores a.click)
                // - Chrome 19 - 26 (18- does not support a.click)
                // - Opera 9 - 12.15
                // - Internet Explorer 6 - 10
                // - Safari 6 (5.1- does not support a.click)
                a.href = blobUrl;
                a.target = '_parent';
                // Use a.download if available. This increases the likelihood that
                // the file is downloaded instead of opened by another PDF plugin.
                if ('download' in a) {
                    a.download = filename;
                }
                // <a> must be in the document for IE and recent Firefox versions.
                // (otherwise .click() is ignored)
                (document.body || document.documentElement).appendChild(a);
                a.click();
                a.parentNode.removeChild(a);
            } else {
                if (window.top === window &&
                    blobUrl.split('#')[0] === window.location.href.split('#')[0]) {
                    // If _parent == self, then opening an identical URL with different
                    // location hash will only cause a navigation, not a download.
                    var padCharacter = blobUrl.indexOf('?') === -1 ? '?' : '&';
                    blobUrl = blobUrl.replace(/#|$/, padCharacter + '$&');
                }
                window.open(blobUrl, '_parent');
            }
        };

        function createBlob(data, contentType) {
            if (typeof Blob !== 'undefined') {
                return new Blob([data], { type: contentType });
            }
            $log.log('The "Blob" constructor is not supported.');
        };

        function createObjectURL(data, contentType, forceDataSchema) {
            if (!forceDataSchema &&
                typeof URL !== 'undefined' && URL.createObjectURL) {
                var blob = createBlob(data, contentType);
                return URL.createObjectURL(blob);
            }

            var buffer = 'data:' + contentType + ';base64,';
            for (var i = 0, ii = data.length; i < ii; i += 3) {
                var b1 = data[i] & 0xFF;
                var b2 = data[i + 1] & 0xFF;
                var b3 = data[i + 2] & 0xFF;
                var d1 = b1 >> 2, d2 = ((b1 & 3) << 4) | (b2 >> 4);
                var d3 = i + 1 < ii ? ((b2 & 0xF) << 2) | (b3 >> 6) : 64;
                var d4 = i + 2 < ii ? (b3 & 0x3F) : 64;
                buffer += digits[d1] + digits[d2] + digits[d3] + digits[d4];
            }
            return buffer;
        }

        return {
            dataURItoBlob : dataURItoBlob,
            isValidUrl: isValidUrl,
            downloadUrl: function (url, filename) {
                if (!isValidUrl(url, true)) {
                    return; // restricted/invalid URL
                }

                download(url + '#pdfjs.action=download', filename);
            },
            downloadData: function (data, filename,
                                    contentType) {
                if (navigator.msSaveBlob) { // IE10 and above
                    return navigator.msSaveBlob(new Blob([data], { type: contentType }),
                        filename);
                }

                var blobUrl = createObjectURL(data, contentType,
                    PDFJS.disableCreateObjectURL);
                download(blobUrl, filename);
            },
            download: function (blob, url, filename) {
                if(filename == null && url != null) {
                    var words = url.split('.');
                    filename =  "document." + words[words.length - 1];
                }
                if (!URL || blob == null) {
                    // URL.createObjectURL is not supported
                    this.downloadUrl(url, filename);
                    return;
                }

                if (navigator.msSaveBlob) {
                    // IE10 / IE11
                    if (!navigator.msSaveBlob(blob, filename)) {
                        this.downloadUrl(url, filename);
                    }
                    return;
                }

                var blobUrl = typeof blob == typeof "" ? blob : createObjectURL(blob);
                download(blobUrl, filename);
            },
            createBlob :createBlob
        };
    }]);
