/**
 * @file
 * Main theme behaviors.
 */
// You can import a default behavior to distinguish blocks of code from each
// other. Here's an example of how to add the accessible card link component.
import tsCardLink from "./components/ts_card_link.js";

// You can use imports with aliases now!
// Webpack also uses tree shaking here, meaning only sayHello will be imported.
import { sayHello as sH } from "./utils.js";

(($, Drupal) => {
  /**
   * This calls the tsCardLink behavior into the main.js global file.
   **/
  Drupal.behaviors.tsCardLink = {
    attach: tsCardLink
  };

  /**
   * This example behavior shows a lot of the new useful syntax in ES6.
   */
  Drupal.behaviors.tsGridES6Example = {
    // You can use this short syntax for object literals, instead of:
    // attach: function [...]
    attach(context, settings) {
      // Use "const" for variables that can not be changed or re-assigned.
      const exampleArray = ["foo", "bar", "baz"];
      // Use arrow functions wherever possible to avoid "this" confusion.
      $("body")
        .once("ts-grid-example")
        .each((index, element) => {
          // Use "let" for variables that can be changed or re-assigned.
          // Use "for...of" to iterate over array values.
          for (let value of exampleArray) {
            console.log("for...of: " + value);
          }
          // Arrow functions can also do fun one-liners.
          const addFoo = className => "foo" + className;
          console.log("Arrow function: " + addFoo("bar"));
          // Use the spread operator to expand arrays into arguments.
          const numbers = [1, 2, 3, 4];
          console.log("Spread operator: " + Math.max(...numbers));
          // Use destructuring to get variables out of objects or arrays.
          const [first, second, ...rest] = [1, 2, 3, 4, 5];
          const { specifickey } = { specifickey: "foo", otherkey: "bar" };
          // Use template literals to make string concatenation easy.
          console.log(
            `Destructuring/template literals: ${first}, ${second}, ${specifickey}`
          );
          // Use imported variables/functions/objects when needed.
          console.log(sH("ThinkShout"));
        });
    }
  };
})(jQuery, Drupal);
