/**
 * Enables Dark mode settings at given time.
 * 
 * This function sets '.dark-mode' class to document body 
 * and therefore you need to define a '.dark-mode' class selector 
 * in your css for every part you want to change with dark mode.
 * 
 * @param {number} startHour - The hour value when to start dark mode such as 19 (for 7 p.m.). 0..24
 * @param {number} startMinute - The Minute value when to start dark mode such as 45 (for 45th minute). 0..60
 * @param {number} startSecond - The Second value when to start dark mode such as 10 (for 10th second). 0..60
 * @param {number} endHour - The hour value to stop dark mode.
 * @param {number} endMinute - The minute value to stop dark mode.
 * @param {number} endSecond - The second value to stop dark mode.
 * @param {number} refreshRate - The interval after which it refreshes (in ms).
 * @param {Function} [optCallable=null] - Optional Callable to do some extra task. It should at least accept one string param which 'enableDarkMode' function will provide. It is basically either 'dark' or 'light'. Your callback function must handle scenarios such that when 'dark' is passed, it should carry out tasks related to dark mode and vice versa. It can take more params too but the first param must be the string one.
 * @param {Iterable} optArgs - The optional other args of the function.
 */
function enableDarkMode(startHour, startMinute, startSecond, endHour, endMinute, endSecond, refreshRate, optCallable=null, ...optArgs) {
    // Check parameters...
    if (typeof startHour !== "number") {
        throw new TypeError("startHour param must be a number.");
    }
    if (typeof startMinute !== "number") {
        throw new TypeError("startMinute param must be a number.");
    }
    if (typeof startSecond !== "number") {
        throw new TypeError("startSecond param must be a number.");
    }
    if (typeof endHour !== "number") {
        throw new TypeError("endHour param must be a number.");
    }
    if (typeof endMinute !== "number") {
        throw new TypeError("endMinute param must be a number.");
    }
    if (typeof endSecond !== "number") {
        throw new TypeError("endSecond param must be a number.");
    }
    if (typeof refreshRate !== "number") {
        throw new TypeError("refreshRate param must be a number.");
    }
    if (optCallable !==null && typeof optCallable !== "function") {
        throw new TypeError("optCallable param must be a function.");
    }

    // get current date
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    // get body
    const body = document.body;

    // condition
    const isInTimeFrame = (
        (hour > startHour || (hour === startHour && minute > startMinute) || (hour === startHour && minute === startMinute && second >= startSecond)) && 
        (hour < endHour || (hour === endHour && minute < endMinute) || (hour === endHour && minute === endMinute && second < endSecond))
    );
    if (isInTimeFrame) {
        // dark mode here

        // add dark-mode to body
        body.classList.add('dark-mode');

        // run callable if it is not null
        if (optCallable !== null) {
            // if args is provided
            if (optArgs.length !== 0) {
                optCallable('dark', ...optArgs);
            } else {
                optCallable('dark');
            }
        }
    } else {
        // light mode here

        // remove dark-mode from body
        body.classList.remove('dark-mode');

        // run callable if it is not null
        if (optCallable !== null) {
            // if args is provided
            if (optArgs.length !== 0) {
                optCallable('light', ...optArgs);
            } else {
                optCallable('light');
            }
        }
    }

    setTimeout(() => {
        enableDarkMode(startHour, startMinute, startSecond, endHour, endMinute, endSecond, refreshRate, optCallable, ...optArgs);
    }, refreshRate);
}

// export 
export default enableDarkMode;