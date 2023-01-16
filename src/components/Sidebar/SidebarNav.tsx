import { Stack } from "@chakra-ui/react";
import {
  RiDashboardLine,
  RiContactsLine,
  RiDraftLine,
  RiSearchLine,
} from "react-icons/ri";
import {
  GiTrade,
  GiAmmoBox,
  GiOilDrum
} from "react-icons/gi";
import {
  FaTools
} from "react-icons/fa";
import {
  FaPeopleCarry
} from "react-icons/fa";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="CONTROLE GERAL">
        <NavLink href="/dashboard" icon={RiDashboardLine}>Estatísticas</NavLink>
        {/* <NavLink href="/users" icon={RiContactsLine}>Usuários</NavLink> */}
      </NavSection>
      <NavSection title="MATERIAL">
        <NavLink href="/material/geral" icon={RiDashboardLine}>Geral</NavLink>
        <NavLink href="/material/cadastro" icon={RiDraftLine}>Cadastrar</NavLink>
        <NavLink href="/material/cautela" icon={GiTrade}>Cautelar</NavLink>
        <NavLink href="/material/busca" icon={RiSearchLine}>Buscar</NavLink>
      </NavSection>

      <NavSection title="ARMAMENTO">
        <NavLink href="/armamento/geral" icon={RiDashboardLine}>Geral</NavLink>
        <NavLink href="/armamento/cadastro" icon={RiDraftLine}>Cadastrar</NavLink>
        <NavLink href="/armamento/manutencao" icon={FaTools}>Manutenção</NavLink>
        <NavLink href="/armamento/vinculos" icon={FaPeopleCarry}>Vínculos</NavLink>
        <NavLink href="/armamento/cautela" icon={GiTrade}>Cautelar</NavLink>
        <NavLink href="/armamento/busca" icon={RiSearchLine}>Buscar</NavLink>
      </NavSection>
      <NavSection title="MUNIÇÃO / COMBUSTÍVEL">
        <NavLink href="/furriel/geral" icon={RiDashboardLine}>Geral</NavLink>
        <NavLink href="/furriel/municao" icon={GiAmmoBox}>Munição</NavLink>
        <NavLink href="/furriel/combustivel" icon={GiOilDrum}>Combustível</NavLink>
      </NavSection>
    </Stack>
  );
}
