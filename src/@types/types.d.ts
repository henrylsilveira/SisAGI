import { Manutencao } from "./types.d";
export interface Militar {
  id: string;
  identidade: string;
  post_grad: string;
  nome_completo: string;
  nome_guerra: string;
  senha: string;
  companhia?: string;
  pelotao?: string;
  funcao_local: string;
  status: string;
  longitude?: string;
  latitude?: string;

  cautelas?: [];
  Session?: [];
  CautelaArmamento?: CautelaArmamentoArray[];
  ArmamentoMilitar?: VinculoArmamentoMilitarArray[];
  Municao?: MunicaoArray[];
  Combustivel?: CombustivelArray[];
  FuncaoMilitar?: FuncaoMilitarArray[];
}

export type MilitarArray = Militar[];

export interface Material {
  id: string;
  nome: string;
  condicoes?: string;
  quantidade?: number;
  companhia: string;
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
  statusCautela: "disponivel" | "cautelado";
  status: "disponivel" | "indisponivel";
  companhia: string;
  cabide?: string;
  cautelaArmamento?: CautelaArmamento;
  ArmamentoMilitar?: ArmamentoMilitar;
  Manutencao?: Manutencao;
}

export type Cautela = {
  id: string;
  data_cautela: string;
  observacao: string;
  companhia: string;
  validado: boolean;
  resp_cautela: string;
  status: string;
  data_fechamento_cautela?: DateTime;
  cautelouId: string;
  materialId: string;
  cautelou: Militar;
  material: Material;
};

export type CautelaArray = Cautela[];

export type CautelaArmamento = {
  id: string;
  data_cautela: string;
  observacao?: string;
  companhia: string;
  validado: boolean;
  resp_cautela: string;
  status: string;
  data_fechamento_cautela: string;
  cautelouId: string;
  armamentoId: string;
  cautelou: Militar;
  armamento: Armamento;
};

export type CautelaArmamentoArray = CautelaArmamento[];

export type Manutencao = {
  id: string;
  tipoManutencao: string;
  dataManutencao: string;
  armamentoId: string;
  armamento: Armamento;
};

export type ManutencaoArray = Manutencao[];

export type VinculoArmamentoMilitar = {
  id: string;
  armamentoId: string;
  militarId: string;

  armamento: Armamento;
  militar: Militar;
};

export type VinculoArmamentoMilitarArray = VinculoArmamentoMilitar[];

export type Municao = {
  id: string;
  nr_pedido: string;
  municao_pedida: number;
  municao_usada: number;
  municao_devolvida: number;
  unidade: string;
  companhia: string;
  tipo_municao: string;
  data_instrucao: string;
  data_devolucao: string;
  instrucao: string;
  status: string;
  militarId: string;
};

export type MunicaoArray = Municao[];

export type Combustivel = {
  id: string;
  nr_pedido: string;
  combustivel_pedido: number;
  combustivel_usado: number;
  combustivel_devolvido: number;
  unidade: string;
  companhia: string;
  tipo_combustivel: string;
  data_missao: Date;
  data_devolucao: Date;
  missao: string;
  status: string;
  militar: Militar;
};

export type CombustivelArray = Combustivel[];

export type FuncaoMilitar = {
  id: string;
  funcao: string;
  created_at: Date;
  militarId: Militar
}

export type FuncaoMilitarArray = FuncaoMilitar[];