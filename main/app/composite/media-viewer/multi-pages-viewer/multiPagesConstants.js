'use strict';
/**
 * TODO MultiPagesConstants desc
 */
itMultiPagesViewer.constant("MultiPagesConstants", {
    PAGE_RENDER_FAILED : -1,
    PAGE_RENDER_CANCELLED : 0,
    PAGE_RENDERED : 1,
    PAGE_ALREADY_RENDERED : 2, 
    ZOOM_LEVELS_LUT : [
        0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9,
        1.0, 1.1, 1.3, 1.5, 1.7, 1.9,
        2.0, 2.2, 2.4, 2.6, 2.8,
        3.0, 3.3, 3.6, 3.9,
        4.0, 4.5,
        5.0],
    ZOOM_FIT_WIDTH : "fit_width",
    ZOOM_FIT_PAGE : "fit_page",
    ZOOM_FIT_HEIGHT : "fit_height",
    ORIENTATION_VERTICAL : "vertical",
    ORIENTATION_HORIZONTAL : "horizontal",
    MODE_HAND : "mode_hand",
    MODE_ZOOM_SELECTION : "mode_zoomSelection",
    MODE_TEXT: "mode_text"
})
