// Copyright 2012 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.require('axs.AuditRule');
goog.require('axs.AuditRules');
goog.require('axs.constants');

/**
 * @type {axs.AuditRule.Spec}
 */
axs.AuditRule.specs.requiredAriaAttributeMissing = {
    name: 'requiredAriaAttributeMissing',
    severity: axs.constants.Severity.SEVERE,
    relevantNodesSelector: function(scope) {
        return scope.querySelectorAll('[role]');
    },
    test: function(element) {
        var role = axs.utils.getRole(element);
        if (!role.valid)
            return false;  // That's a different error.
        var requiredProperties = role.details.requiredPropertiesSet;
        for (var property in requiredProperties) {
            var propertyKey = property.replace(/^aria-/, '');
            var propertyDetails = axs.constants.ARIA_PROPERTIES[propertyKey];
            if ('defaultValue' in propertyDetails)
                return false;
            if (!element.hasAttribute(property))
                return true;
        }
    },
    code: 'AX_ARIA_03'
};
