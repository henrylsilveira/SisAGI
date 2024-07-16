import { Stack } from "@chakra-ui/react";
import {
  RiDashboardLine,
  RiContactsLine,
  RiDraftLine,
  RiSearchLine,
  RiBook2Line,
  RiShieldKeyholeLine,
} from "react-icons/ri";
import { GiTrade, GiAmmoBox, GiOilDrum } from "react-icons/gi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlinePersonSearch } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { FaPeopleCarry } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
// import { GoSettings } from "react-icons/go";
import { BsPeople } from "react-icons/bs";
import { BsFillPersonLinesFill, BsPersonPlus } from "react-icons/bs";
import { GiTruck } from "react-icons/gi";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";
// import { useSession } from "next-auth/react";
import { BiNotepad } from "react-icons/bi";
import { useSession } from "../../services/context/auth";

export function SidebarNav() {
  const { user: session } = useSession();
  
  return (
    <Stack spacing="12" align="flex-start">
      {session?.Funcao?.find((func) => func.funcao === "super admin") ? (
        <NavSection title="SUPER ADMIN">
          <NavLink href="/superAdmin/usuarios" icon={IoIosPeople}>
            Usuários
          </NavLink>
          <NavLink href="/superAdmin/funcoes" icon={RiShieldKeyholeLine}>
            Funções
          </NavLink>
          <NavLink href="/superAdmin/sessoes" icon={RiShieldKeyholeLine}>
            Sessões
          </NavLink>
        </NavSection>
      ) : null}

{session?.Funcao?.find((func) => func.funcao === "comum") ? (
        <NavSection title="PAINEL DO MILITAR">
          <NavLink href="/painel/perfil" icon={RiContactsLine}>
            Perfil
          </NavLink>
          <NavLink href="/painel/minhasCautelas" icon={RiBook2Line}>
            Cautelas
          </NavLink>
          <NavLink href="/painel/minhaFracao" icon={HiOutlineUserGroup}>
            Minha Fração
          </NavLink>
        </NavSection>
      ) : null}

      {session?.Funcao?.find((func) => func.funcao === "s2" && func.status === "ativo") ? (
        //DESENVOLVER AS PAGINAS
        <NavSection title="S/2">
          <NavLink href="/s2/dbq" icon={IoIosPeople}>
            DBQ
          </NavLink>
          <NavLink href="/s2/lea" icon={RiShieldKeyholeLine}>
            LEA
          </NavLink>
          <NavLink href="/s2/mi" icon={RiShieldKeyholeLine}>
            MI
          </NavLink>
        </NavSection>
      ) : null}

{session?.Funcao?.find((func) => func.funcao === "s4" && func.status === "ativo") ? (
        //DESENVOLVER AS PAGINAS
        <NavSection title="S/4">
          <NavLink href="/s4/viaturas" icon={GiTruck}>
            Viaturas
          </NavLink>
          {/* <NavLink href="/s4/lea" icon={RiShieldKeyholeLine}>
            LEA
          </NavLink>
          <NavLink href="/s4/mi" icon={RiShieldKeyholeLine}>
            MI
          </NavLink> */}
          <NavLink href="/s4/relatorio" icon={MdOutlinePersonSearch}>
            Relatório
          </NavLink>
        </NavSection>
      ) : null}

      

      {session?.Funcao?.find(
        (func) => (func.funcao === "enc mat" || func.funcao === "cmt pel") && func.status === "ativo"
      ) ? (
        <NavSection title="MATERIAL">
          <NavLink href="/material/geral" icon={RiDashboardLine}>
            Geral
          </NavLink>
          <NavLink href="/material/cadastro" icon={RiDraftLine}>
            Cadastrar
          </NavLink>
          <NavLink href="/material/cautela" icon={GiTrade}>
            Cautelar
          </NavLink>
          <NavLink href="/material/busca" icon={RiSearchLine}>
            Buscar
          </NavLink>
        </NavSection>
      ) : null}

      {session?.Funcao?.find((func) => func.funcao === "armeiro" && func.status === "ativo") ? (
        <NavSection title="ARMAMENTO">
          {/* <NavLink href="/armamento/geral" icon={RiDashboardLine}>
            Geral
          </NavLink> */}
          <NavLink href="/armamento/cadastro" icon={RiDraftLine}>
            Cadastrar
          </NavLink>
          <NavLink href="/armamento/manutencao" icon={FaTools}>
            Manutenção
          </NavLink>
          <NavLink href="/armamento/vinculos" icon={FaPeopleCarry}>
            Vínculos
          </NavLink>
          <NavLink href="/armamento/cautela" icon={GiTrade}>
            Cautelar
          </NavLink>
          <NavLink href="/armamento/busca" icon={RiSearchLine}>
            Buscar
          </NavLink>
        </NavSection>
      ) : null}

      {session?.Funcao?.find((func) => func.funcao === "furriel" && func.status === "ativo") ? (
        <NavSection title="FURRIEL">
          {/* <NavLink href="/furriel/geral" icon={RiDashboardLine}>
            Geral
          </NavLink> */}
          {/* <NavLink href="/furriel/municao" icon={GiAmmoBox}>
            Munição
          </NavLink>
          <NavLink href="/furriel/combustivel" icon={GiOilDrum}>
            Combustível
          </NavLink> */}
          <NavLink href="/furriel/pedidoViatura" icon={GiTruck}>
            Viatura
          </NavLink>
        </NavSection>
      ) : null}

      {session?.Funcao?.find((func) => func.funcao === "sgte" && func.status === "ativo") ? (
        <NavSection title="PESSOAL">
          <NavLink href="/pessoal/geral" icon={RiDashboardLine}>
            Geral
          </NavLink>
          <NavLink href="/pessoal/gerenciamento" icon={MdOutlinePersonSearch}>
            Gerenciar
          </NavLink>
        </NavSection>
      ) : null}

      {session?.Funcao?.find((func) => func.funcao === "enc pmt" && func.status === "ativo") ? (
        <NavSection title="PMT">
          {/* <NavLink href="/encPmt/geral" icon={RiDashboardLine}>
            Geral
          </NavLink> */}
          <NavLink href="/encPmt/cadastro" icon={GiTruck}>
            Viaturas
          </NavLink>
          {/* <NavLink href="/encPmt/gerenciamento" icon={MdOutlinePersonSearch}>
            Pedido
          </NavLink> */}
          <NavLink href="/encPmt/cautela" icon={BiNotepad}>
            Pedidos
          </NavLink>
          <NavLink href="/encPmt/relatorio" icon={MdOutlinePersonSearch}>
            Relatório
          </NavLink>
        </NavSection>
      ) : null}

      {session?.Funcao?.find((func) => func.funcao === "cmt gda" && func.status === "ativo") ? (
        <NavSection title="CMT DA GDA">
          <NavLink href="/cmtGda/controle" icon={BsPeople}>
            Controle
          </NavLink>
          <NavLink href="/cmtGda/cadastro" icon={BsPersonPlus}>
            Cadastro
          </NavLink>
          {/* <NavLink href="/cmtGda/civil" icon={BsFillPersonLinesFill}>
            Civil
          </NavLink> */}
          {/* <NavLink href="/cmtGda/viatura" icon={GiTruck}>
            Viatura
          </NavLink> */}
        </NavSection>
      ) : null}
    </Stack>
  );
}
