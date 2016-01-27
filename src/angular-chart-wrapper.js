'use strict';
(function() {
    angular.module('angularChartWrapper', [])
        .factory('cdaChartService', function($injector) {
            var s = {
                populateScopeDefination: function (scopeDefination, optionKeys) {
                    optionKeys.forEach(function(item){
                        scopeDefination[item] = '=';
                    });
                    return scopeDefination;
                },
                populateOptions : function (optionKeys, scope, elem) {
                    var options = {
                        element: elem,
                        lineColors: scope.lineColors || ['#0b62a4', '#7a92a3', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed'],
                        barColors: scope.barColors || ['#0b62a4', '#7a92a3', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed'],
                        colors: scope.colors || ['#0b62a4', '#7a92a3', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed']
                    };
                    angular.forEach(optionKeys, function(key) {
                        if (scope.hasOwnProperty(key) && typeof scope[key] !== 'undefined') {

                            options[key] = scope[key];
                        }
                    });
                    return options;
                },
            };
            return s;
        })
        .directive('cdaChart',['cdaChartService', function (cdaChartService) {
            var OPTION_KEYS = [
                'data', 'xkey', 'ykeys', 'labels', 'lineColors', 'barColors', 'colors', 'lineWidth', 'pointSize',
                'pointFillColors', 'pointStrokeColors', 'ymax', 'ymin', 'smooth', 'hideHover',
                'hoverCallback', 'parseTime', 'units', 'postUnits', 'preUnits', 'dateFormat',
                'xLabels', 'xLabelFormat', 'xLabelAngle', 'yLabelFormat', 'goals', 'goalStrokeWidth',
                'goalLineColors', 'events', 'eventStrokeWidth', 'eventLineColors', 'continuousLine',
                'axes', 'grid', 'gridTextColor', 'gridTextSize', 'gridTextFamily', 'gridTextWeight',
                'fillOpacity', 'resize', 'behaveLikeLine'
            ];

            return {
                restrict: 'A',
                scope: cdaChartService.populateScopeDefination({}, OPTION_KEYS),
                link: function(scope, elem, attrs, ngModel) {
                    scope.$watch('data', function() {
                        if(scope.data){
                            var options = cdaChartService.populateOptions(OPTION_KEYS, scope, elem);
                            switch(attrs.cdaChart){
                                case 'line':
                                    scope.lineInstance = new Morris.Line(options);
                                    break;
                                case 'bar':
                                    scope.barInstance = new Morris.Bar(options);
                                    break;
                                case 'area':
                                    scope.areaInstance = new Morris.Area(options);
                                    break;
                                case 'line':
                                    scope.donutInstance = new Morris.Donut(options);
                                    break;
                            }
                        }
                        
                    });
                }
            }
        }])
})();
