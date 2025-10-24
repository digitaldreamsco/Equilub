export const generateCalificationOptions = (maxCalification) => {
    const options = [];
    for (let i = 0; i <= maxCalification; i++) {
        options.push(i);
    }
    return options;
};