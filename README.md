# Overview

`toggle-engine.js` provides a mechanism that can be used to add or remove a specific class from your website page. This class must be defined in your stylesheet.

The working of `toggle-engine.js` is time specific and it can be explained with a test use case: Suppose you have a `dark-mode` class that changes background and foreground color of a bunch of elements/parts and it must be enabled between 7p.m. and 7a.m. The `toggle-engine.js` can be easily used for this purpose.

Note: This is just an example use case, the actual use of this javascript feature depends entirely on the user.

## Usage

Choose any CDN of your choice. I recommend using `jsdelivr` as it is open source and free and enables users to deliver the js to your website directly from github.

The basic format for `jsdelivr` for github:

```html
<script src="https://github.com/<username>/<repository>@<version>/<path-to-file>"></script>
```

In our case the code for `toggle-engine.js` would be:

```html
<script src="https://github.com/d33p0st/toggle-engine.js@latest/dist/toggle-engine.js"></script>
```

Let the script load successfully and use a different `script` tag for calling the internal mechanism:

```html
<script src="https://github.com/d33p0st/toggle-engine.js@latest/dist/toggle-engine.js"></script>
<script>
    toggle(19, 0, 0, 7, 0, 0, 'dark-mode', 3600000);
</script>
```

The function signature is as follows:

```javascript
/**
 * Toggles a given class based on time.
 * 
 * This function sets 'className' param to the document body 
 * and therefore you need to define a 'className' param class selector 
 * in your css for every part you want to change with the 'className'
 * 
 * @param {number} startHour - The hour value when to enable the class such as 19 (for 7 p.m.). 0..23
 * @param {number} startMinute - The Minute value when to enable the class such as 45 (for 45th minute). 0..59
 * @param {number} startSecond - The Second value when to enable the class such as 10 (for 10th second). 0..59
 * @param {number} endHour - The hour value to disable the class. 0..23
 * @param {number} endMinute - The minute value to disable the class. 0..59
 * @param {number} endSecond - The second value to disable the class. 0..59
 * @param {string} className - The class name to add to the entire document
 * @param {number} [refreshRate=null] - The interval after which it refreshes (in ms). If it is null, it wont restart.
 * @param {Function} [optCallable=null] - Optional Callable to do some extra task. It should at least accept one string param which 'toggle' function will provide. It is basically either 'added' or 'removed'.
 * @param {Iterable} optArgs - The optional other args of the function.
 */
```

The `startHour/Minute/Second` marks the time when the class will be active whereas the `endHour/Minute/Second` marks the time when it will be disabled.

The `className` is the name of the class selector that you have to define in your css that will actually be the style which will be toggled in general.

The `refreshRate` marks the amount of time to wait before calling the function itself such that it does not encounter any error on server refresh or disconnect. If it is not provided, the `toggle` function will run only once.

The `optCallable` takes a `function` type value. This can be any user function that carries out some user/page specific task. Considering our earlier example of enabling dark mode. This function could be changing some image from its light version to dark version.

The function must at least take one parameter of string type. The `toggle` function calls this user defined function and will pass `'added'` as the first parameter when the `className` is enabled and again calls it with `'removed'` as the first parameter when the `className` is removed.

The `optArgs` can contain other parameters of the user defined function or none.

## Detailed working with codes and example

Let us follow our earlier example of dark mode. I will create a new class selector in my css, say, `dark-mode` and I already have some code say:

```html
<!-- html upper part -->
 <body>
    <div class="div-class">
        <!-- some content here -->
    </div>
    <img src="<src>" id="body-image">
    <!-- rest of the body -->
<!-- other html code -->
```

In the dark mode I want the `div-class` to have black background with white text.

```css

/* default div class (light) */
.div-class {
    color: black;
    background-color: white;
}

/* body image */
.body-image {
    width: 100px;
}

/* dark mode for div class */
.dark-mode .div-class {
    color: white;
    background-color: black;
}
```

Now we are all set with our css.

Additionally I want that when dark mode is enabled, the `img` should use a different image. Let us create a user function for that:

```javascript
// as I mentioned, it should take at least one param which is string (status)
function imageChanger(status) {
    // get the body image
    const imageElement = document.getElementById('body-image');
    
    // set the src to something else when the dark mode class is added.
    // toggle function will pass 'added' when enabled or 'removed'
    // when disabled.
    if (status === "added") {
        // dark mode is enabled
        imageElement.src = "<src2>";
    } else {
        // switch the image back
        imageElement.src = "<src>";
    }
}
```

You can either define the above function in the script tag or import it from a `.js` file as src.

Now that we have everything let us use the `toggle` function from `toggle-engine.js`:

```html
<script src="https://github.com/d33p0st/toggle-engine.js@latest/dist/toggle-engine.js"></script>
<script>
    // as I mentioned, it should take at least one param which is string (status)
    function imageChanger(status) {
        // get the body image
        const imageElement = document.getElementById('body-image');
        
        // set the src to something else when the dark mode class is added
        // toggle function will pass 'added' when enabled or 'removed'
        // when disabled.
        if (status === "added") {
            // dark mode is enabled
            imageElement.src = "<src2>";
        } else {
            // switch the image back
            imageElement.src = "<src>";
        }
    }

    // toggle
    toggle(19, 0, 0, 7, 0, 0, 'dark-mode', 3600000, imageChanger);

    // here the time needs to be in 24 hour format
    // therefore, 19, 0, 0 represents 7 p.m.
    // and 7, 0, 0 represents 7 a.m.
    // 'dark-mode' is the class name I want to toggle.
    // 3600000 is one hour in (ms) (refreshRate) (the toggle function will be called each hour)
    // imageChanger is the function we want to call at each toggle.
</script>
```

The above html code toggles changes to dark mode from 7 p.m. to 7 a.m.
However, if your function needs to have more parameters make sure
```function imageElement(status, <param1>, <param2>, ...)``` that the first
parameter must be a string type. And while calling toggle:

```html
<script>
    toggle(19, 0, 0, 7, 0, 0, 'dark-mode', 1000, imageChanger, '<param1>', '<param2>', ...);
</script>
```