export const formatDateToString = (date: Date) => {
    try {
        return date?.toISOString().split('T')[0];
    } catch(_) {
        return undefined;
    }
}