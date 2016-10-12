'use strict';
/**
 * TODO TextLayerBuilder desc
 */
itPdfViewer.factory('TextLayerBuilder', ['CustomStyle' , 'EventBus', function (CustomStyle, EventBus) {
        function attachDOMEventsToEventBus(eventBus) {
            eventBus.on('documentload', function () {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('documentload', true, true, {});
                window.dispatchEvent(event);
            });
            eventBus.on('pagerendered', function (e) {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('pagerendered', true, true, {
                    pageNumber: e.pageNumber,
                    cssTransform: e.cssTransform,
                });
                e.source.div.dispatchEvent(event);
            });
            eventBus.on('textlayerrendered', function (e) {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('textlayerrendered', true, true, {
                    pageNumber: e.pageNumber
                });
                e.source.textLayerDiv.dispatchEvent(event);
            });
            eventBus.on('pagechange', function (e) {
                var event = document.createEvent('UIEvents');
                event.initUIEvent('pagechange', true, true, window, 0);
                event.pageNumber = e.pageNumber;
                e.source.container.dispatchEvent(event);
            });
            eventBus.on('pagesinit', function (e) {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('pagesinit', true, true, null);
                e.source.container.dispatchEvent(event);
            });
            eventBus.on('pagesloaded', function (e) {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('pagesloaded', true, true, {
                    pagesCount: e.pagesCount
                });
                e.source.container.dispatchEvent(event);
            });
            eventBus.on('scalechange', function (e) {
                var event = document.createEvent('UIEvents');
                event.initUIEvent('scalechange', true, true, window, 0);
                event.scale = e.scale;
                event.presetValue = e.presetValue;
                e.source.container.dispatchEvent(event);
            });
            eventBus.on('updateviewarea', function (e) {
                var event = document.createEvent('UIEvents');
                event.initUIEvent('updateviewarea', true, true, window, 0);
                event.location = e.location;
                e.source.container.dispatchEvent(event);
            });
            eventBus.on('find', function (e) {
                if (e.source === window) {
                    return; // event comes from FirefoxCom, no need to replicate
                }
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('find' + e.type, true, true, {
                    query: e.query,
                    phraseSearch: e.phraseSearch,
                    caseSensitive: e.caseSensitive,
                    highlightAll: e.highlightAll,
                    findPrevious: e.findPrevious
                });
                window.dispatchEvent(event);
            });
            eventBus.on('attachmentsloaded', function (e) {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('attachmentsloaded', true, true, {
                    attachmentsCount: e.attachmentsCount
                });
                e.source.container.dispatchEvent(event);
            });
            eventBus.on('sidebarviewchanged', function (e) {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('sidebarviewchanged', true, true, {
                    view: e.view,
                });
                e.source.outerContainer.dispatchEvent(event);
            });
            eventBus.on('pagemode', function (e) {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('pagemode', true, true, {
                    mode: e.mode,
                });
                e.source.pdfViewer.container.dispatchEvent(event);
            });
            eventBus.on('namedaction', function (e) {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('namedaction', true, true, {
                    action: e.action
                });
                e.source.pdfViewer.container.dispatchEvent(event);
            });
            eventBus.on('presentationmodechanged', function (e) {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('presentationmodechanged', true, true, {
                    active: e.active,
                    switchInProgress: e.switchInProgress
                });
                window.dispatchEvent(event);
            });
            eventBus.on('outlineloaded', function (e) {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent('outlineloaded', true, true, {
                    outlineCount: e.outlineCount
                });
                e.source.container.dispatchEvent(event);
            });
        }

        var globalEventBus = null;
        function getGlobalEventBus() {
            if (globalEventBus) {
                return globalEventBus;
            }
            globalEventBus = new EventBus();
            attachDOMEventsToEventBus(globalEventBus);
            return globalEventBus;
        }
        function TextLayerBuilder(options) {
            this.textLayerDiv = options.textLayerDiv;
            this.eventBus = options.eventBus || getGlobalEventBus();
            this.renderingDone = false;
            this.divContentDone = false;
            this.pageIdx = options.pageIndex;
            this.pageNumber = this.pageIdx + 1;
            this.matches = [];
            this.viewport = options.viewport;
            this.textDivs = [];
            this.findController = options.findController || null;
            this.textLayerRenderTask = null;
            this.enhanceTextSelection = options.enhanceTextSelection;
            this._bindMouse();
        }

        TextLayerBuilder.prototype = {
            _finishRendering: function TextLayerBuilder_finishRendering() {
                this.renderingDone = true;

                this.eventBus.dispatch('textlayerrendered', {
                    source: this,
                    pageNumber: this.pageNumber
                });
            },

            /**
             * Renders the text layer.
             * @param {number} timeout (optional) if specified, the rendering waits
             *   for specified amount of ms.
             */
            render: function TextLayerBuilder_render(timeout, callback) {
                if (!this.divContentDone || this.renderingDone) {
                    return;
                }

                if (this.textLayerRenderTask) {
                    this.textLayerRenderTask.cancel();
                    this.textLayerRenderTask = null;
                }

                this.textDivs = [];
                var textLayerFrag = document.createDocumentFragment();
                this.textLayerRenderTask = PDFJS.renderTextLayer({
                    textContent: this.textContent,
                    container: textLayerFrag,
                    viewport: this.viewport,
                    textDivs: this.textDivs,
                    timeout: timeout,
                    enhanceTextSelection: this.enhanceTextSelection,
                });
                this.textLayerRenderTask.promise.then(function () {
                    this.textLayerDiv.appendChild(textLayerFrag);
                    this._finishRendering();
                    this.updateMatches();
                    for (var i = 0; i < this.textDivs.length; i++) {
                        this.textDivs[i].setAttribute("class",  "word");
                    }

                    if(callback) {
                        callback();
                    }
                }.bind(this), function (reason) {
                    // canceled or failed to render text layer -- skipping errors
                });
            },

            setTextContent: function TextLayerBuilder_setTextContent(textContent) {
                if (this.textLayerRenderTask) {
                    this.textLayerRenderTask.cancel();
                    this.textLayerRenderTask = null;
                }
                this.textContent = textContent;
                this.divContentDone = true;
            },

            convertMatches: function TextLayerBuilder_convertMatches(matches,
                                                                     matchesLength) {
                var i = 0;
                var iIndex = 0;
                var bidiTexts = this.textContent.items;
                var end = bidiTexts.length - 1;
                var queryLen = (this.findController === null ?
                    0 : this.findController.state.query.length);
                var ret = [];
                if (!matches) {
                    return ret;
                }
                for (var m = 0, len = matches.length; m < len; m++) {
                    // Calculate the start position.
                    var matchIdx = matches[m];

                    // Loop over the divIdxs.
                    while (i !== end && matchIdx >= (iIndex + bidiTexts[i].str.length)) {
                        iIndex += bidiTexts[i].str.length;
                        i++;
                    }

                    if (i === bidiTexts.length) {
                        console.error('Could not find a matching mapping');
                    }

                    var match = {
                        begin: {
                            divIdx: i,
                            offset: matchIdx - iIndex
                        }
                    };

                    // Calculate the end position.
                    if (matchesLength) { // multiterm search
                        matchIdx += matchesLength[m];
                    } else { // phrase search
                        matchIdx += queryLen;
                    }

                    // Somewhat the same array as above, but use > instead of >= to get
                    // the end position right.
                    while (i !== end && matchIdx > (iIndex + bidiTexts[i].str.length)) {
                        iIndex += bidiTexts[i].str.length;
                        i++;
                    }

                    match.end = {
                        divIdx: i,
                        offset: matchIdx - iIndex
                    };
                    ret.push(match);
                }

                return ret;
            },

            renderMatches: function TextLayerBuilder_renderMatches(matches) {
                // Early exit if there is nothing to render.
                if (matches.length === 0) {
                    return;
                }

                var bidiTexts = this.textContent.items;
                var textDivs = this.textDivs;
                var prevEnd = null;
                var pageIdx = this.pageIdx;
                var isSelectedPage = (this.findController === null ?
                    false : (pageIdx === this.findController.selected.pageIdx));
                var selectedMatchIdx = (this.findController === null ?
                    -1 : this.findController.selected.matchIdx);
                var highlightAll = (this.findController === null ?
                    false : this.findController.state.highlightAll);
                var infinity = {
                    divIdx: -1,
                    offset: undefined
                };

                function beginText(begin, className) {
                    var divIdx = begin.divIdx;
                    textDivs[divIdx].textContent = '';
                    appendTextToDiv(divIdx, 0, begin.offset, className);
                }

                function appendTextToDiv(divIdx, fromOffset, toOffset, className) {
                    var div = textDivs[divIdx];
                    var content = bidiTexts[divIdx].str.substring(fromOffset, toOffset);
                    var node = document.createTextNode(content);
                    if (className) {
                        var span = document.createElement('span');
                        span.className = className;
                        span.appendChild(node);
                        div.appendChild(span);
                        return;
                    }
                    div.appendChild(node);
                }

                var i0 = selectedMatchIdx, i1 = i0 + 1;
                if (highlightAll) {
                    i0 = 0;
                    i1 = matches.length;
                } else if (!isSelectedPage) {
                    // Not highlighting all and this isn't the selected page, so do nothing.
                    return;
                }

                for (var i = i0; i < i1; i++) {
                    var match = matches[i];
                    var begin = match.begin;
                    var end = match.end;
                    var isSelected = (isSelectedPage && i === selectedMatchIdx);
                    var highlightSuffix = (isSelected ? ' selected' : '');

                    if (this.findController) {
                        this.findController.updateMatchPosition(pageIdx, i, textDivs,
                            begin.divIdx);
                    }

                    // Match inside new div.
                    if (!prevEnd || begin.divIdx !== prevEnd.divIdx) {
                        // If there was a previous div, then add the text at the end.
                        if (prevEnd !== null) {
                            appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
                        }
                        // Clear the divs and set the content until the starting point.
                        beginText(begin);
                    } else {
                        appendTextToDiv(prevEnd.divIdx, prevEnd.offset, begin.offset);
                    }

                    if (begin.divIdx === end.divIdx) {
                        appendTextToDiv(begin.divIdx, begin.offset, end.offset,
                            'highlight' + highlightSuffix);
                    } else {
                        appendTextToDiv(begin.divIdx, begin.offset, infinity.offset,
                            'highlight begin' + highlightSuffix);
                        for (var n0 = begin.divIdx + 1, n1 = end.divIdx; n0 < n1; n0++) {
                            textDivs[n0].className = 'highlight middle' + highlightSuffix;
                        }
                        beginText(end, 'highlight end' + highlightSuffix);
                    }
                    prevEnd = end;
                }

                if (prevEnd) {
                    appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
                }
            },

            updateMatches: function TextLayerBuilder_updateMatches() {
                // Only show matches when all rendering is done.
                if (!this.renderingDone) {
                    return;
                }

                // Clear all matches.
                var matches = this.matches;
                var textDivs = this.textDivs;
                var bidiTexts = this.textContent.items;
                var clearedUntilDivIdx = -1;

                // Clear all current matches.
                for (var i = 0, len = matches.length; i < len; i++) {
                    var match = matches[i];
                    var begin = Math.max(clearedUntilDivIdx, match.begin.divIdx);
                    for (var n = begin, end = match.end.divIdx; n <= end; n++) {
                        var div = textDivs[n];
                        div.textContent = bidiTexts[n].str;
                        div.className = '';
                    }
                    clearedUntilDivIdx = match.end.divIdx + 1;
                }

                if (this.findController === null || !this.findController.active) {
                    return;
                }

                // Convert the matches on the page controller into the match format
                // used for the textLayer.
                var pageMatches, pageMatchesLength;
                if (this.findController !== null) {
                    pageMatches = this.findController.pageMatches[this.pageIdx] || null;
                    pageMatchesLength = (this.findController.pageMatchesLength) ?
                    this.findController.pageMatchesLength[this.pageIdx] || null : null;
                }

                this.matches = this.convertMatches(pageMatches, pageMatchesLength);
                this.renderMatches(this.matches);
            },

            /**
             * Fixes text selection: adds additional div where mouse was clicked.
             * This reduces flickering of the content if mouse slowly dragged down/up.
             * @private
             */
            _bindMouse: function TextLayerBuilder_bindMouse() {
                var div = this.textLayerDiv;
                var self = this;
                div.addEventListener('mousedown', function (e) {
                    if (self.enhanceTextSelection && self.textLayerRenderTask) {
                        self.textLayerRenderTask.expandTextDivs(true);
                        return;
                    }
                    var end = div.querySelector('.endOfContent');
                    if (!end) {
                        return;
                    }
                    //#if !(MOZCENTRAL || FIREFOX)
                    // On non-Firefox browsers, the selection will feel better if the height
                    // of the endOfContent div will be adjusted to start at mouse click
                    // location -- this will avoid flickering when selections moves up.
                    // However it does not work when selection started on empty space.
                    var adjustTop = e.target !== div;
                    //#if GENERIC
                    adjustTop = adjustTop && window.getComputedStyle(end).
                        getPropertyValue('-moz-user-select') !== 'none';
                    //#endif
                    if (adjustTop) {
                        var divBounds = div.getBoundingClientRect();
                        var r = Math.max(0, (e.pageY - divBounds.top) / divBounds.height);
                        end.style.top = (r * 100).toFixed(2) + '%';
                    }
                    //#endif
                    end.classList.add('active');
                });
                div.addEventListener('mouseup', function (e) {
                    if (self.enhanceTextSelection && self.textLayerRenderTask) {
                        self.textLayerRenderTask.expandTextDivs(false);
                        return;
                    }
                    var end = div.querySelector('.endOfContent');
                    if (!end) {
                        return;
                    }
                    //#if !(MOZCENTRAL || FIREFOX)
                    end.style.top = '';
                    //#endif
                    end.classList.remove('active');
                });
            },
        };

        return (TextLayerBuilder);
    }]);
