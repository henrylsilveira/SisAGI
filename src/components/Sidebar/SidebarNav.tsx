import { Stack } from "@chakra-ui/react";
import {
  RiDashboardLine,
  RiContactsLine,
  RiDraftLine,
  RiSearchLine,
  RiBook2Line,
} from "react-icons/ri";
import { GiTrade, GiAmmoBox, GiOilDrum } from "react-icons/gi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlinePersonSearch } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { FaPeopleCarry } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
// import { GoSettings } from "react-icons/go";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";
import { useSession } from "next-auth/react";

export function SidebarNav() {
  const { data: session } = useSession();
  
  return (
    <Stack spacing="12" align="flex-start">
      {session?.militar.Funcao.find((func) => func.funcao === "super admin") ? (
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

{session?.militar.Funcao.find((func) => func.funcao === "s2") ? (
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

      {session?.militar.Funcao.find((func) => func.funcao === "comum") ? (
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

      {session?.militar.Funcao.find(
        (func) => func.funcao === "enc mat" || func.funcao === "cmt pel"
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

      {session?.militar.Funcao.find((func) => func.funcao === "armeiro") ? (
        <NavSection title="ARMAMENTO">
          <NavLink href="/armamento/geral" icon={RiDashboardLine}>
            Geral
          </NavLink>
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

      {session?.militar.Funcao.find((func) => func.funcao === "furriel") ? (
        <NavSection title="MUNIÇÃO / COMBUSTÍVEL">
          <NavLink href="/furriel/geral" icon={RiDashboardLine}>
            Geral
          </NavLink>
          <NavLink href="/furriel/municao" icon={GiAmmoBox}>
            Munição
          </NavLink>
          <NavLink href="/furriel/combustivel" icon={GiOilDrum}>
            Combustível
          </NavLink>
        </NavSection>
      ) : null}

{session?.militar.Funcao.find((func) => func.funcao === "sgte") ? (
        <NavSection title="PESSOAL">
          <NavLink href="/pessoal/geral" icon={RiDashboardLine}>
            Geral
          </NavLink>
          <NavLink href="/pessoal/gerenciamento" icon={MdOutlinePersonSearch}>
            Gerenciar
          </NavLink>
        </NavSection>
      ) : null}

      {session?.militar.Funcao.find((func) => func.funcao === "cmt gda") ? (
        <NavSection title="CMT DA GDA">
          <NavLink href="#" icon={RiDashboardLine}>
            Geral
          </NavLink>
          <NavLink href="#" icon={GiAmmoBox}>
            Pessoal
          </NavLink>
          <NavLink href="#" icon={GiOilDrum}>
            Viatura
          </NavLink>
          <NavLink href="#" icon={GiOilDrum}>
            Civil
          </NavLink>
        </NavSection>
      ) : null}
    </Stack>
  );
}
