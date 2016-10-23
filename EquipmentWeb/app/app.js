/**
 * @description The main entry point for the angular application.
 */

'use strict';

define(['angular', 'angular-material', 'ui-router', 'angular-paging'], function(ng) {
    return ng.module('equipmentPro', ['ngMaterial', 'ui.router', 'cl.paging']);
});