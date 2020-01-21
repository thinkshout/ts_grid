/**
 * @file
 * TS Hamburger Menu custom JS.
 */

export default function (context) {
  // Alias global jQuery object.
  const $ = jQuery;
  let tabbingContext = null;
  if (context == document) {

    function toggleMenu() {
      var toggle = $(".menu-toggle");
      var target = $(".mobile-menu-target");
      toggle.toggleClass("active");
      if (toggle.hasClass("active")) {
        toggle.attr("aria-label", "Close mobile menu");
      }
      else {
        toggle.attr("aria-label", "Open mobile menu");
      }
      target.toggleClass("expanded");
      target
        .closest(".region")
        .toggleClass("mobile-menu-open");
      if (
        target.hasClass("expanded") &&
        window.outerWidth <= 500
      ) {
        tabbingContext = Drupal.tabbingManager.constrain(
          $(".mobile-menu-target,.menu-toggle")
        );
        Drupal.announce(
          Drupal.t(
            "Tabbing is constrained to the mobile nav. Press Close the mobile menu to exit."
          )
        );
      }
      else {
        if (tabbingContext) {
          tabbingContext.release();
          Drupal.announce(
            Drupal.t("Mobile menu closed. Tabbing is no longer constrained")
          );
        }
      }
    }
    // Mobile m enu toggle behavior.
    $(".menu-toggle", context)
      .once("ts-menu-toggle")
      .on("click", function (e) {
        toggleMenu();
      });
    // Close the menu when clicking off of it.
    $(document)
      .once("ts-collapse-menu")
      .on("click", function (e) {
        if (
          !$(e.target).closest(".mobile-menu-target").length &&
          !$(e.target).closest(".menu-toggle").length &&
          target.hasClass("expanded")
        ) {
          toggleMenu();
        }
      });
  }
}
