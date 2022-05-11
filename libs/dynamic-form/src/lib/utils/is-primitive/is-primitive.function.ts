export function isPrimitive(obj): boolean {
    switch (typeof obj) {
        case 'bigint':
        case 'boolean':
        case 'number':
        case 'string':
        case 'symbol':
            return true;
        default: return false;
    }
}