'use strict';

angular.module('fates.version', [
  'fates.version.interpolate-filter',
  'fates.version.version-directive'
])

.value('version', '0.1');
