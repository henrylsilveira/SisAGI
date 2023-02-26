import { Militar } from "../@types/types";
import { api } from "../services/api";

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
    // const d = new Date(iso)
    // const date = d.toISOString()+"T"+d.getUTCHours()
    let darr = iso.split("-");    // ["29", "1", "2016"]
    let isoDate = new Date(parseInt(darr[2]),parseInt(darr[1])-1,parseInt(darr[0]));
    return isoDate
}

export function convertISODateToInputValue(iso: String | Date){
    if(typeof(iso) !== "string"){
       return String(iso).split("T")[0]
    }
    return iso.split("T")[0]
}

export function convertDateFuncaoMilitar(militar: Militar, funcao: string){
    const date = militar.Funcao.find(fun => fun.funcao === funcao.toLowerCase()).data_inicio 
    if(typeof date !== "undefined") {
        return convertISODateToInputValue(date)
    }
    return 'undefined'
    
}

export async function getUserIP() {
    const response = await api.get("https://api.ipify.org/?format=json");
    return response.data.ip;
  }