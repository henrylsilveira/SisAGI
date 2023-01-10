export interface Militar {
  id: string;
  identidade: string;
  nome_completo: string;
  nome_guerra: string;
  senha: string;
  permissao: string;
  local?: string;
  pelotao?: string;
  funcao_local: string;
  status: string;
  cautelas?: [];
  Session?: [];
  CautelaArmamento?: [];
}

export interface Material {
  id: string;
  nome: string;
  condicoes?: string;
  quantidade?: number;
  local: string;
  codigo?: string;
  sub_unidade?: string;
  dependencia?: string;
  categoria?: string;
}

export interface Armamento {
  id: string;
  nome: string;
  nr_serie: string;
  tipo?: number;
  emprego?: string;
  condicoes?: string;
  status: 'disponivel' | 'indisponivel';
  local: string;
  cabide?: string;
}

export type Cautela = {
  id: string;
  data_cautela: string;
  observacao: string;
  local: string;
  validado: boolean;
  resp_cautela: string;
  status: string;
  data_fechamento_cautela?: DateTime;
  cautelouId: string;
  materialId: string;
  cautelou: Militar;
  material: Material;
}[];

interface CautelaProps {
  Cautelas: Cautela[];
}

export type CautelaArmamento = {
  id: string;
  data_cautela: string;
  observacao?: string;
  local: string;
  validado: boolean;
  resp_cautela: string;
  status: string;
  data_fechamento_cautela: string;
  cautelouId: string;
  armamentoId: string;
  cautelou: Militar;
  armamento: Armamento;
};

export type CautelaArmamentoArray = CautelaArmamento[]