/**
 * @description Bootstraps the angular application using require.
 */

'use strict';

define(['require', 'angular', './index'], function(require, ng) {
    require(['domReady!'], function(document) {
        ng.bootstrap(document, ['equipmentPro']);
    });
});