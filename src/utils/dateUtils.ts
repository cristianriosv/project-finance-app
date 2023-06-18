export const formatDateString = (date: string) => {
    try {
        return date?.split('T')[0];
    } catch(_) {
        return '';
    }
}