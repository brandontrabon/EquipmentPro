/**
 * @description The setup file for RequireJS.
 */

require.config({
    paths: {
        'domReady': './bower_components/domReady/domReady',
        'angular': './bower_components/angular/angular',
        'angular-animate': './bower_components/angular-animate/angular-animate',
        'angular-aria': './bower_components/angular-aria/angular-aria',
        'angular-material': './bower_components/angular-material/angular-material',
        'angular-message': './bower_components/angular-messages/angular-messages',
        'ui-router': './bower_components/angular-ui-router/release/angular-ui-router',
        'angular-paging': './bower_components/material-angular-paging/build/dist.min'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angular-aria': {
            deps: ['angular']
        },
        'angular-message': {
            deps: ['angular']
        },
        'angular-material': {
            deps: ['angular-animate', 'angular-aria', 'angular-message']
        },
        'ui-router': {
            deps: ['angular']
        },
        'angular-paging': {
            deps: ['angular-material']
        }
    },
    deps: ['./bootstrap']
});