import { createContext } from 'react';

export const AuthorBreadcrumbContext = createContext<{
  setBreadcrumbs: (items: { label: string; onClick?: () => void }[]) => void;
  onNavigate: (menu: string) => void;
}>({
  setBreadcrumbs: () => {},
  onNavigate: () => {},
});
