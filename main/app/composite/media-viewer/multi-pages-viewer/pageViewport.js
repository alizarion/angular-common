'use strict';
/**
 * TODO PageViewport desc
 */
itMultiPagesViewer.factory('PageViewport', [function() {
    function PageViewport(viewBox, scale, rotation, offsetX, offsetY, dontFlip) {
        this.viewBox = viewBox;
        this.scale = scale;
        this.rotation = rotation;
        this.offsetX = offsetX;
        this.offsetY = offsetY;

        // creating transform to convert pdf coordinate system to the normal
        // canvas like coordinates taking in account scale and rotation
        var centerX = (viewBox[2] + viewBox[0]) / 2;
        var centerY = (viewBox[3] + viewBox[1]) / 2;
        var rotateA, rotateB, rotateC, rotateD;
        rotation = rotation % 360;
        rotation = rotation < 0 ? rotation + 360 : rotation;
        switch (rotation) {
            case 180:
                rotateA = -1; rotateB = 0; rotateC = 0; rotateD = 1;
                break;
            case 90:
                rotateA = 0; rotateB = 1; rotateC = 1; rotateD = 0;
                break;
            case 270:
                rotateA = 0; rotateB = -1; rotateC = -1; rotateD = 0;
                break;
            //case 0:
            default:
                rotateA = 1; rotateB = 0; rotateC = 0; rotateD = -1;
                break;
        }

        if (dontFlip) {
            rotateC = -rotateC; rotateD = -rotateD;
        }

        var offsetCanvasX, offsetCanvasY;
        var width, height;
        if (rotateA === 0) {
            offsetCanvasX = Math.abs(centerY - viewBox[1]) * scale + offsetX;
            offsetCanvasY = Math.abs(centerX - viewBox[0]) * scale + offsetY;
            width = Math.abs(viewBox[3] - viewBox[1]) * scale;
            height = Math.abs(viewBox[2] - viewBox[0]) * scale;
        } else {
            offsetCanvasX = Math.abs(centerX - viewBox[0]) * scale + offsetX;
            offsetCanvasY = Math.abs(centerY - viewBox[1]) * scale + offsetY;
            width = Math.abs(viewBox[2] - viewBox[0]) * scale;
            height = Math.abs(viewBox[3] - viewBox[1]) * scale;
        }
        // creating transform for the following operations:
        // translate(-centerX, -centerY), rotate and flip vertically,
        // scale, and translate(offsetCanvasX, offsetCanvasY)
        this.transform = [
            rotateA * scale,
            rotateB * scale,
            rotateC * scale,
            rotateD * scale,
            offsetCanvasX - rotateA * scale * centerX - rotateC * scale * centerY,
            offsetCanvasY - rotateB * scale * centerX - rotateD * scale * centerY
        ];

        this.width = width;
        this.height = height;
        this.fontScale = scale;
    }
    PageViewport.prototype = /** @lends PDFJS.PageViewport.prototype */ {
        /**
         * Clones viewport with additional properties.
         * @param args {Object} (optional) If specified, may contain the 'scale' or
         * 'rotation' properties to override the corresponding properties in
         * the cloned viewport.
         * @returns {PDFJS.PageViewport} Cloned viewport.
         */
        clone: function PageViewPort_clone(args) {
            args = args || {};
            var scale = 'scale' in args ? args.scale : this.scale;
            var rotation = 'rotation' in args ? args.rotation : this.rotation;
            return new PageViewport(this.viewBox.slice(), scale, rotation,
                this.offsetX, this.offsetY, args.dontFlip);
        },
        /**
         * Converts PDF point to the viewport coordinates. For examples, useful for
         * converting PDF location into canvas pixel coordinates.
         * @param x {number} X coordinate.
         * @param y {number} Y coordinate.
         * @returns {Object} Object that contains 'x' and 'y' properties of the
         * point in the viewport coordinate space.
         * @see {@link convertToPdfPoint}
         * @see {@link convertToViewportRectangle}
         */
        convertToViewportPoint: function PageViewport_convertToViewportPoint(x, y) {
            return Util.applyTransform([x, y], this.transform);
        },
        /**
         * Converts PDF rectangle to the viewport coordinates.
         * @param rect {Array} xMin, yMin, xMax and yMax coordinates.
         * @returns {Array} Contains corresponding coordinates of the rectangle
         * in the viewport coordinate space.
         * @see {@link convertToViewportPoint}
         */
        convertToViewportRectangle:
            function PageViewport_convertToViewportRectangle(rect) {
                var tl = Util.applyTransform([rect[0], rect[1]], this.transform);
                var br = Util.applyTransform([rect[2], rect[3]], this.transform);
                return [tl[0], tl[1], br[0], br[1]];
            },
        /**
         * Converts viewport coordinates to the PDF location. For examples, useful
         * for converting canvas pixel location into PDF one.
         * @param x {number} X coordinate.
         * @param y {number} Y coordinate.
         * @returns {Object} Object that contains 'x' and 'y' properties of the
         * point in the PDF coordinate space.
         * @see {@link convertToViewportPoint}
         */
        convertToPdfPoint: function PageViewport_convertToPdfPoint(x, y) {
            return Util.applyInverseTransform([x, y], this.transform);
        }
    };

    return (PageViewport);
}]);
