import {Child} from "pym.js";

;(function() {
    'use strict';
    window.pymChild = new Child();

    window.addEventListener('load', function () {
        window.pymChild.sendHeight();

        window.pymChild.sendMessage('pdfappready', true);
        var anchors = document.getElementsByTagName('a');
        Array.prototype.slice.call(anchors).forEach(function (el) {
            el.addEventListener('click', function (e) {
                if (this.href !== undefined &&
                    this.href !== "" &&
                    this.href[0] !== '#') {
                    e.preventDefault();
                    window.pymChild.sendMessage('location', this.href);
                }
            });
        });
    });

    window.addEventListener('resize', function () {
        window.pymChild.sendHeight();
    });

    window.pymChild.onMessage('resize', function () {
        window.pymChild.sendHeight();
    });

})();