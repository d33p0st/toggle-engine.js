function enableDarkMode(startHour, startMinute, startSecond, endHour, endMinute, endSecond, refreshRate, optCallable=null, ...optArgs) {
    // Parameter validation
    if (typeof startHour !== "number" || startHour < 0 || startHour > 23)
        throw new TypeError("startHour param must be a number between 0 and 23.");
    if (typeof startMinute !== "number" || startMinute < 0 || startMinute > 59)
        throw new TypeError("startMinute param must be a number between 0 and 59.");
    if (typeof startSecond !== "number" || startSecond < 0 || startSecond > 59)
        throw new TypeError("startSecond param must be a number between 0 and 59.");
    if (typeof endHour !== "number" || endHour < 0 || endHour > 23)
        throw new TypeError("endHour param must be a number between 0 and 23.");
    if (typeof endMinute !== "number" || endMinute < 0 || endMinute > 59)
        throw new TypeError("endMinute param must be a number between 0 and 59.");
    if (typeof endSecond !== "number" || endSecond < 0 || endSecond > 59)
        throw new TypeError("endSecond param must be a number between 0 and 59.");
    if (typeof refreshRate !== "number" || refreshRate <= 0)
        throw new TypeError("refreshRate param must be a positive number.");
    if (optCallable !== null && typeof optCallable !== "function")
        throw new TypeError("optCallable param must be a function.");

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();
    const body = document.body;

    // Helper function to convert time to comparable number
    const timeToNumber = (h, m, s) => h * 3600 + m * 60 + s;
    
    const currentTime = timeToNumber(currentHour, currentMinute, currentSecond);
    const startTime = timeToNumber(startHour, startMinute, startSecond);
    const endTime = timeToNumber(endHour, endMinute, endSecond);
    
    // Check if dark mode should be active
    const isDarkMode = startTime <= endTime 
        ? currentTime >= startTime && currentTime < endTime
        : currentTime >= startTime || currentTime < endTime;

    // Apply changes
    if (isDarkMode) {
        body.classList.add("dark-mode");
        if (optCallable) {
            optArgs.length ? optCallable("dark", ...optArgs) : optCallable("dark");
        }
    } else {
        body.classList.remove("dark-mode");
        if (optCallable) {
            optArgs.length ? optCallable("light", ...optArgs) : optCallable("light");
        }
    }

    // Schedule next check
    setTimeout(function() {
        enableDarkMode(startHour, startMinute, startSecond, endHour, endMinute, endSecond, refreshRate, optCallable, ...optArgs);
    }, refreshRate);
}

export default enableDarkMode;