export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  disabled?: boolean;
  external?: boolean;
}

export const mainNav: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Transactions",
    href: "/transactions",
  },
  {
    title: "Budgets",
    href: "/budgets",
  },
  {
    title: "Reports",
    href: "/reports",
  },
];