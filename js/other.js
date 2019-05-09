/**
 * @file
 * Other behaviors that are worth splitting into another file.
 *
 * Often times there is one page on a site that requires a lot of Javascript
 * that most other pages never use. In those cases, splitting into another file
 * could lead to performance benefits since less JS is sent to the client.
 */

import { sayGoodbye } from './utils.js';

(($, Drupal) => {

  /**
   * This example behavior shows a lot of the new useful syntax in ES6.
   */
  Drupal.behaviors.tsGridOtherExample = {
    attach(context, setings) {
      console.log(sayGoodbye('ThinkShout'));
    },
  };

})(jQuery, Drupal);
