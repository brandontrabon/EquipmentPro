/**
 * @description The main entry point for the angular application.
 */

'use strict';

define(['angular', 'angular-material', 'ui-router'], function(ng) {
    return ng.module('equipmentPro', ['ngMaterial', 'ui.router']);
});