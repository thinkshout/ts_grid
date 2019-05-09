# ThinkBase - Grid
A base theme for a Drupal 8 site using CSS Grid Layout. 
Requires Ruby to run locally and the 
[components](https://www.drupal.org/project/components) module to be added to 
the project build.

## Setup
- Update `Rakefile` to have the correct site path
- Run `rake install` to install dependencies
- Run `rake update` to copy the CSS Grid polyfill file to a place that can be 
used for theming. This is important for IE browser compatibility issues.

## Compiling assets
This project uses Browsersync, Sass and Browserify
- Run `rake serve`

## Blog Post
For a full writeup on this theme see the blog post, 
[The 2017 ThinkShout Front-End Stack](https://bit.ly/2Iq6Xop)

## Template Files and Structure
We customize templates a lot when theming in order to get the markup we need. 
When doing so, create directories using the same logic applied to the original 
template. Example: `/core/themes/classy/templates/layout/html.html.twig` becomes
`/thinkbase/templates/layout/html.html.twig`. Both files are placed in the same 
`layout` directory, however the thinkbase file is the one being overridden and 
will ultimately be rendered on the page. 

## Sass Files and Structure
**Config** - these files consists of tools that are used globally throughout the
site:
* `_01.vars.scss` - contains global sass variables such as colors, fonts, 
breakpoints, grid and layout specs.
* `_02.mixins.scss` - contains our TS library of common project mixins.
* `_03.extends.scss` - global extends go here. Use sparingly as they can be 
heavy.
* `_04.base.scss` - contains much of the text related styling, such as headers,
paragraph tags, lists, and wysiwyg elements.
* `_05.buttons.scss` - global button styling can get complex, so it got its own
file.
* `06.forms.scss` - the same can be said for buttons as can be said for forms.

**Layout** - these files serve to create a framework for the site to be built 
upon:
* `_page.scss` - this is where the layout is established. This includes the 
grid, [visual grid helper](https://bit.ly/2Sz9Kpi), non-grid tools (.container 
and .content-side-padding), and establishing the outer limits of the site width.
* `_vertical-spacing.scss` - our designers plan their elements with consistent
 vertical spacing. This is why this file has been created. See the comments in 
 the file itself for a better understanding.
 
**Components** - this is where the bulk of the theming work takes place. For 
example, the `global` directory is where all the globally shared files ought to 
go. Directories and files are to be organized by component being worked on. 
Additional directories can be but are not limited to: `blocks`, `heroes`, 
`nodes`, `paragraphs`, and `views`. 

## Fonts (ToDo: Add project fonts here)

We are using three custom fonts under one umbrella font called Halyard:
1. Halyard Display
2. Halyard Micro
3. Halyard Text

They are TypeKit fonts and can be downloaded via Creative Suite. You can 
implement them using the custom mixin below.

### Font mixin (ToDo: Add project fonts here)
This mixin takes three arguments, only one of which is required:

1. **$family**: either `display`, `micro` or `text` (required)
2. **$weight**: `normal` (default). All three family options have the following 
possible weight assignments: `black`, `bold`, `semibold`, `regular` and `italic`.
3. **$style**: either `normal` (default) or `italic`.

If other fonts are represented in the design, check in with the designer first.

Here are a few examples of how to use this mixin:

```
// Font: Halyard Micro, Semibold, Normal
h1 {
    @include font(micro, semibold);
}

// Font: Halyard Text Italic, Italic
i {
    @include font(text, italic, italic);
}


```

## Working with the layout

### Containers & Grid Layout
This project uses CSS Grid Layout with a Polyfill to support IE. The grid has 
been designed to be mostly 12 columns across, with the exceptions of 16 columns
at a min-width of 1441px, and 4 columns at a max-width of 401px. Please see the
Sketch file for more details.

![image](https://bit.ly/2E1gdBt)

* The **pink** area indicates the `<html>` area, i.e. the full width of the 
browser screen.
* The **light orange** area dictates where the `<body>` tag starts and ends from 
left to right. This is often a limitation set by the designer specifying the 
max-width for the project itself. This width can be set via the 
`$site-max-width` variable.
* Since left and right padding between content and the edge of the browser 
must be present at all times, particularly for mobile devices, the 
`.content-side-padding` class (in **green**) was created to do just that. Just 
be sure to nest it within a `.container` wrapper (**green and blue**), like in 
the example below. **Note: not needed if adding the grid parent wrapper**
* The **blue** area indicates where the grid exists. 4-columns on mobile, 
12-columns from phablet on up to extra large screens, and 16-columns and the 
largest screens. 
* Full-width blocks are very common with ThinkShout designs. They often 
consist of either a background color/image with content that needs to fit 
within the x-column grid, but also allow side padding for mobile devices. 
Here's an example of what that markup would look like in order to achieve this:

    * No grid necessary:
    ```
    <div class="full-site-width-element"> // Set background image/color here.
      <div class="container"> // Sets the site's content container.
        <div class="content-side-padding"> // Allows side padding for mobile.
          <p>Full Site Width</p> // Apply grid columns styles on child items.
        </div>
      </div>
    </div>
    ```
    * Grid necessary:
    ```
    <div class="full-site-width-element"> // Set background image/color here.
      <div class="grid"> // Set the grid w/ built in content-side-padding.
        <p>Full Site Width</p> // Apply grid columns styles on child items.
      </div>
    </div>
    ```
    
* Centered elements are quite common as well. The mixin `center-columns` was 
created to make centering grid elements easy peasy. Here's an example of what
that looks like:
```
.item-to-be-centered {
  @include center-columns(8, 12); // Item centered 8-col wide on a 12-col grid.
}
``` 
**Note: The "12" in the instance above should be replaced with the corresponding
`$grid-columns` variable.**

* Here's an example of when to use elements are not centered. This uses the 
`column-width` mixin that assigns a `grid-column` property that is also IE 
compliant. To use this, simply specify which child elements go where and they'll
 know what to do - example:
```
.sidebar {
    @include column-width(1,4); // Starts at beginning of 1 and ends before 4.
}

.content-with-sidebar {
    @include column-width(4,13); // Starts at beginning of 4 and ends before 12.
}
```

* If you'd like to create a grid of similar elements inside of the `.grid`
class, use the mixin `grid-equal-items($items-in-row)`. Simply indicate how many
items make up a row in the grid you're creating. Here's an example:

```
// 2-Up
  .field--name-field-ctas.x-up-items-2 {
    @include grid-equal-items(2);
  }
  // 3-Up
  .field--name-field-ctas.x-up-items-3 {
    @include grid-equal-items(3);
  }
```

* If you don't want the grid gaps, just add the class `no-gaps` to the same
container as the `grid` class.

### Visual grid helper

The TS Custom `ts-grid-checker` template file has been created in order to 
provide Grid guidelines while theming. To turn it on, simply add `?show-grid=1`
to the end of your project's url.

## Center aligned grid elements with Flexbox

In the case where a themer is asked to center-align remaining grid row elements,
flexbox is the way to go. Using the grid mixins above are great if the goal is 
to left-align remaining odd row items. Here's an example of a time to use these 
flexbox mixins:

![image](https://bit.ly/2TYuGSJ)

The `flex-grid-wrapper()` mixin is to be applied on the parent wrapper to the 
grid items and takes two parameters: 1. $justify (justify-content) and 2. 
$bp-start which determines when to apply `display: flex`.

`flex-grid-wrapper` uses another mixin called `margin-gutter` which handles the
spaces between these elements and takes three parameters: 1. $side which side of
the element to apply the gutter, 2. $half if the themer wants to cut the 
$grid-gutter px value in half, and 3. $minus which allows for negative margin
application.

If adding padding between the flexed items, use the `flex-grid-item()` mixin as 
is. All the parameters for this mixin are breakpoints, which can be altered if
necessary, but should be standard to our designers visions out-of-the-box. This
mixin uses the `padding-gutter` mixin to keep items from getting to close to
each other.

All of these mixins can be found in the 
[`_02.mixins.scss`](https://bit.ly/2DhfVVm).


## Vertical Spacing
Check out the [`layout/_vertical-spacing.scss`](https://bit.ly/2Q1Wt74) for a 
full description indicating options for global vertical spacing.

 
## Background Images

This project is using the 
[Picture Background Formatter](https://bit.ly/2tCViOp)
 module, which is a much simpler and easier to implement approach.

If an inline image is needed, particularly for mobile versions, use the Twig
Tweak module to add the image via the `drupal_entity()` function in the
template. Example:

```
{% set imageId = node.field_hero_image.target_id %}

<div class="mobile-inline-image">
  {{ drupal_entity('media', imageId, 'heroes') }}
</div>
```

## Accessibility

### Mixins
**Font and Line Height** - this helps make text zoom-friendly. For example, if the 
`$baseFontSize` is set to 16px, `@include font-line-height(20, 28);` will set 
the `font-size` of the element to `1.25rem` and apply the correct ratio for the 
`line-height` like so: `line-height: (28/20)` (also represented as 
`line-height: 1.75`). 

**Combined Active, Focus, and Hover States** - if a hover state is themed, 
chances are the focus and active states ought to be themed the same. Here's a 
mixin to assist with that.
`@include hocus {
  // Insert styles here
}
`

**Hide** - often we are tasked with replacing text with an image. This mixin 
allows us to hide the text while still leaving it accessible for screenreaders 
and other web accessible tools. Example: `@include hide;`


### Making accessible clickable cards

This theme provides Javascript which allows you to proxy clicks between
children of a parent element.

This is useful with cards that need their image clickable without duplicating
`a` elements.

To use this feature, add the following attributes to any parent container:

* `data-href-target` - The selector to the child `a` element that contains the
correct `href` attribute. For example, `.field--name-node-title a` would select
a node title's `a` element.

* `data-href-trigger` - The selector to the child element that, when clicked,
will redirect the page to the `data-href-target`'s `href` attribute.

Any valid jQuery selector can be used for `data-href-trigger`, including
multiple selectors separated by commas if you have many clickable elements.

Here's a full example of valid markup that uses this feature:

```html
<div data-href-target=".title a" data-href-trigger=".image">
  <div class="image">
    <img src="cats.png">
  </div>
  <h2 class="title">
    <a href="/home">Click me</a>
  </h2>
</div>
```
