declare module 'time-toggle' {
    /**
     * Toggles a given class based on time.
     * 
     * This function sets 'className' param to the document body 
     * and therefore you need to define a 'className' param class selector 
     * in your css for every part you want to change with the 'className'
     * 
     * @param startHour - The hour value when to enable the class such as 19 (for 7 p.m.). 0..23
     * @param startMinute - The Minute value when to enable the class such as 45 (for 45th minute). 0..59
     * @param startSecond - The Second value when to enable the class such as 10 (for 10th second). 0..59
     * @param endHour - The hour value to disable the class. 0..23
     * @param endMinute - The minute value to disable the class. 0..59
     * @param endSecond - The second value to disable the class. 0..59
     * @param className - The class name to add to the entire document
     * @param refreshRate - The interval after which it refreshes (in ms). If it is null, it wont restart.
     * @param optCallable - Optional Callable to do some extra task. It should accept one string param which will be either 'added' or 'removed'.
     * @param optArgs - The optional other args of the function.
     */
    export function toggle(
        startHour: number,
        startMinute: number,
        startSecond: number,
        endHour: number,
        endMinute: number,
        endSecond: number,
        className: string,
        refreshRate?: number | null,
        optCallable?: ((status: 'added' | 'removed', ...args: any[]) => void) | null,
        ...optArgs: any[]
    ): void;

    // Add to global scope
    global {
        interface Window {
            toggle: typeof toggle;
        }
        var toggle: typeof toggle;
    }
}