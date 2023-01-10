export function convertDate(iso: string | number) {
    const d = new Date(iso);
    const convertDate = d.toLocaleDateString('pt-BR'); 
    return convertDate
}