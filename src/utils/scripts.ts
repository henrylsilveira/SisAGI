export function convertDate(iso: string | number | Date) {
    const d = new Date(iso);
    const convertDate = d.toLocaleDateString('pt-BR'); 
    return convertDate
}

export function generateNowISOTime() {
    const time = new Date();
    return time.toISOString();
}
