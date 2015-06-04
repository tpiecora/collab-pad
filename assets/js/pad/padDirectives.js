/**
 * Created by michaelpiecora on 6/4/15.
 */
angular.module('collabPad')
  .directive('caret', function() {

    function setCaretPosition(elem, caretPos) {
      if (elem != null) {
        if (elem.createTextRange) {
          var range = elem.createTextRange();
          range.move('character', caretPos);
          range.select();
        } else {
          if (elem.selectionStart) {
            elem.focus();
            elem.setSelectionRange(caretPos, caretPos);
          } else
            elem.focus();
        }
      }
    }

    return {
      link: function(scope, element, attrs) {
        scope.$watch('val', function(newValue, oldValue) {
          if (newValue != oldValue && !isNaN(newValue) && newValue.length > 3) {
            setCaretPosition(element[0], attrs.caret);
          }
        });
      }
    };
  });
