import { Manutencao } from "./types.d";
export interface Militar {
  //DADOS BÁSICOS
  id: string;
  identidade: string;
  avatar_url?: string;
  post_grad: string;
  nome_completo: string;
  nome_guerra: string;
  senha: string;
  companhia?: string;
  pelotao?: string;
  fracao?: string;
  funcao_fracao?: string;
  funcao_local: string;
  status: 'ativo' | 'inativo' | 'transferido';
  situacao_med: 'apto' | 'apto A' | 'incapaz B1'| 'incapaz B2'| 'incapaz C'| 'encostado'| 'reintegrado'| 'adido'
  //DADOS COMPLEMENTARES
  cpf?: string; 
  nome_pai?: string;
  nome_mae?: string;
  naturalidade?: string;
  data_nascimento?: Date;	
  data_praca?: Date;	
  qmg_qmp?: string;	
  sexo?: string;
  cidade?: string;
  estado?: string;
  bairro?: string;
  nr_rua?: string;	
  complemento?: string;
  cep?: string;
  telefone?: string;
  email?: string;
  cargo_qcp?: string;	
  tipo_sanguineo?: string;
  prec_cp?: string;
  local_cumpre_expediente?: string;	
  motocarro?: string;
  hab_militar?: string;
  indigena?: string;

  //GEOLOCALIZAÇÃO
  longitude?: string;
  latitude?: string;
  //RELACIONAMENTOS DE TABELAS
  cautelas?: CautelaArray;
  Session?: [];
  CautelaArmamento?: CautelaArmamentoArray;
  ArmamentoMilitar?: VinculoArmamentoMilitarArray;
  Municao?: MunicaoArray;
  Combustivel?: CombustivelArray;
  Funcao?: FuncaoMilitarArray;
  Feedback?: FeedbackArray;
  _count?: Object;
  //SESSION
  token?: string;
}

export type MilitarArray = Militar[];


export type FeedbackArray = Feedback[];

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
  cautelas?: CautelaArray;
}

export type MaterialArray = Material[];

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
  cautelaArmamento?: CautelaArmamento[];
  ArmamentoMilitar?: ArmamentoMilitar;
  Manutencao?: Manutencao;
}

export type ArmamentoArray = Armamento[];

export type Cautela = {
  id: string;
  data_cautela: string;
  observacao: string;
  sub_unidade: string;
  dependencia: string;
  quantidade?: number;
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
  quantidade?: number;
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
  funcao: 'sgte' | 'super admin' | 'cmt cia' | 'enc mat' | 'armeiro' | 'cmt pel' | 'cmt gda' | 'furriel' | 'comum';
  created_at: Date;
  data_inicio:  Date;
  data_termino: Date;
  status: 'ativo' | 'inativo'
  militarId: Militar
}

export type FuncaoMilitarArray = FuncaoMilitar[];

export type Session = {
  id: string;
  access: Date;
  expires: Date;
  ipAccess: string;
  militar: Militar;
}

export type SessionArray = Session[]; 



export interface Feedback {
  id: string;
  dateFeedback: Date;
  imageFeedback_url: string;
  informacao: string;
  militarId: string;
}

export type FeedbackArray = Feedback[]; 

export interface Missao {
  id?: string;
  created_at?: Date;
  data_finalizacao: Date | string;
  descricao: string;
  situacao?: "atrasado" | "concluída" | "andamento" | "ativa";
  militar_origem: string;
  militar_destino: string;
  militar?: Militar;
}

export type MissaoArray = Missao[]; 
