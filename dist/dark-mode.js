(function () {
    'use strict';

    /**
     * Enables Dark mode settings at given time.
     * 
     * This function sets '.dark-mode' class to document body 
     * and therefore you need to define a '.dark-mode' class selector 
     * in your css for every part you want to change with dark mode.
     * 
     * @param {number} startHour - The hour value when to start dark mode such as 19 (for 7 p.m.). 0..23
     * @param {number} startMinute - The Minute value when to start dark mode such as 45 (for 45th minute). 0..59
     * @param {number} startSecond - The Second value when to start dark mode such as 10 (for 10th second). 0..59
     * @param {number} endHour - The hour value to stop dark mode. 0..23
     * @param {number} endMinute - The minute value to stop dark mode. 0..59
     * @param {number} endSecond - The second value to stop dark mode. 0..59
     * @param {number} refreshRate - The interval after which it refreshes (in ms).
     * @param {Function} [optCallable=null] - Optional Callable to do some extra task. It should at least accept one string param which 'enableDarkMode' function will provide. It is basically either 'dark' or 'light'.
     * @param {Iterable} optArgs - The optional other args of the function.
     */
    function enableDarkMode(startHour, startMinute, startSecond, endHour, endMinute, endSecond, refreshRate, optCallable=null, ...optArgs) {
        // Check parameters...
        if (typeof startHour !== "number" || startHour < 0 || startHour > 23) {
            throw new TypeError("startHour param must be a number between 0 and 23.");
        }
        if (typeof startMinute !== "number" || startMinute < 0 || startMinute > 59) {
            throw new TypeError("startMinute param must be a number between 0 and 59.");
        }
        if (typeof startSecond !== "number" || startSecond < 0 || startSecond > 59) {
            throw new TypeError("startSecond param must be a number between 0 and 59.");
        }
        if (typeof endHour !== "number" || endHour < 0 || endHour > 23) {
            throw new TypeError("endHour param must be a number between 0 and 23.");
        }
        if (typeof endMinute !== "number" || endMinute < 0 || endMinute > 59) {
            throw new TypeError("endMinute param must be a number between 0 and 59.");
        }
        if (typeof endSecond !== "number" || endSecond < 0 || endSecond > 59) {
            throw new TypeError("endSecond param must be a number between 0 and 59.");
        }
        if (typeof refreshRate !== "number" || refreshRate <= 0) {
            throw new TypeError("refreshRate param must be a positive number.");
        }
        if (optCallable !== null && typeof optCallable !== "function") {
            throw new TypeError("optCallable param must be a function.");
        }

        // get current date
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentSecond = now.getSeconds();

        // get body
        const body = document.body;

        // Check if dark mode should be active
        let isDarkMode;
        
        // First compare hours
        if (startHour < endHour) {
            // Normal case: e.g., 7:00 to 16:00
            isDarkMode = (currentHour > startHour && currentHour < endHour) || 
                        (currentHour === startHour && (
                            currentMinute > startMinute || 
                            (currentMinute === startMinute && currentSecond >= startSecond)
                        )) ||
                        (currentHour === endHour && (
                            currentMinute < endMinute || 
                            (currentMinute === endMinute && currentSecond < endSecond)
                        ));
        } else if (startHour > endHour) {
            // Spans midnight case: e.g., 19:00 to 6:00
            isDarkMode = (currentHour > startHour || currentHour < endHour) ||
                        (currentHour === startHour && (
                            currentMinute > startMinute || 
                            (currentMinute === startMinute && currentSecond >= startSecond)
                        )) ||
                        (currentHour === endHour && (
                            currentMinute < endMinute || 
                            (currentMinute === endMinute && currentSecond < endSecond)
                        ));
        } else {
            // Same hour: need to check minutes and seconds
            if (startMinute < endMinute) {
                isDarkMode = currentHour === startHour && (
                    (currentMinute > startMinute && currentMinute < endMinute) ||
                    (currentMinute === startMinute && currentSecond >= startSecond) ||
                    (currentMinute === endMinute && currentSecond < endSecond)
                );
            } else if (startMinute > endMinute) {
                isDarkMode = currentHour === startHour && (
                    (currentMinute > startMinute || currentMinute < endMinute) ||
                    (currentMinute === startMinute && currentSecond >= startSecond) ||
                    (currentMinute === endMinute && currentSecond < endSecond)
                );
            } else {
                // Same minute: just compare seconds
                isDarkMode = currentHour === startHour && 
                            currentMinute === startMinute &&
                            currentSecond >= startSecond && 
                            currentSecond < endSecond;
            }
        }

        if (isDarkMode) {
            // dark mode here
            body.classList.add('dark-mode');

            // run callable if it is not null
            if (optCallable !== null) {
                if (optArgs.length !== 0) {
                    optCallable('dark', ...optArgs);
                } else {
                    optCallable('dark');
                }
            }
        } else {
            // light mode here
            body.classList.remove('dark-mode');

            // run callable if it is not null
            if (optCallable !== null) {
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

    window.enableDarkMode = enableDarkMode;
    globalThis.enableDarkMode = enableDarkMode;

})();
