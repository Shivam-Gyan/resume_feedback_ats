

/**
 * Converts a size in bytes to a human-readable string with appropriate units.
 *
 * @param bytes - The size in bytes to format.
 * Checks if the input is zero and returns '0 Bytes' if true.
 * Defines an array of size units from Bytes to TB.
 * Calculates the index for the appropriate unit using logarithms.
 * Formats the size to two decimal places and appends the corresponding unit.
 * @returns A string representing the formatted size with units (e.g., '1.23 MB').
 */
export function formatSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
}


export function generate(){

    return crypto.randomUUID();
}