import { Stack } from "@chakra-ui/react";
import {
  RiDashboardLine,
  RiContactsLine,
  RiDraftLine,
  RiSearchLine,
} from "react-icons/ri";
import {
  GiTrade
} from "react-icons/gi";
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
        <NavLink href="/material/cadastro" icon={RiDraftLine}>Cadastrar</NavLink>
        <NavLink href="/material/cautela" icon={GiTrade}>Cautelar</NavLink>
        <NavLink href="/material/busca" icon={RiSearchLine}>Buscar</NavLink>
      </NavSection>

      <NavSection title="ARMAMENTO">
        <NavLink href="/armamento/cadastro" icon={RiDraftLine}>Cadastrar</NavLink>
        <NavLink href="/armamento/armamentoMilitar" icon={RiDraftLine}>Armamento/Militar</NavLink>
        <NavLink href="/armamento/cautela" icon={GiTrade}>Cautelar</NavLink>
        <NavLink href="/armamento/busca" icon={RiSearchLine}>Buscar</NavLink>
      </NavSection>
    </Stack>
  );
}
