export function convertDate(iso: string | number | Date) {
    const d = new Date(iso);
    const convertDate = d.toLocaleDateString('pt-BR'); 
    return convertDate
}

export function generateNowISOTime() {
    const time = new Date();
    return time.toISOString();
}

export function convertDateInputToISODate(iso: string) {
    const d = new Date(iso)
    return d.toISOString()
}

export function convertISODateToInputValue(iso: String | Date){
    if(typeof(iso) !== "string"){
       return String(iso).split("T")[0]
    }
    return iso.split("T")[0]
}