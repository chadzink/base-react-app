// primary api context for current application data
import { createContext, useState, FC } from "react";
import * as Api from '../api';

// map api types
type IRole = Api.IRole;
type IRoleResult = Api.IFetchResult<IRole>;

export type IRolesContextState = {
  roles: IRole[]|null;
  roleIds: string[]|null;
  currentPage: number|null;
  pageSize: number|null;
  totalPages: number|null;
  totalRecords: number|null;
  loading: boolean;
  loadPage: (pageNumber: number, pageSize: number, onError: (errors: any[]) => void) => Promise<IRole[]|null>|null;
};

export const rolesContextDefaultValues = (): IRolesContextState => {
  return {
    roles: [],
    roleIds: [],
    currentPage: -1,
    pageSize: 25,
    totalPages: -1,
    totalRecords: -1,
    loading: false,
    loadPage: () => null,
  }
};

export const RolesContext = createContext<IRolesContextState>(rolesContextDefaultValues());

const RolesProvider: FC = ({ children }) => {
  const defaults = rolesContextDefaultValues();
  const [roles, setRoles] = useState<IRole[]|null>(defaults.roles);
  const [roleIds, setRoleIds] = useState<string[]|null>(defaults.roleIds);
  const [currentPage, setCurrentPage] = useState<number|null>(defaults.currentPage);
  const [pageSize, setPageSize] = useState<number|null>(defaults.pageSize);
  const [totalPages, setTotalPages] = useState<number|null>(defaults.totalPages);
  const [totalRecords, setTotalRecords] = useState<number|null>(defaults.totalPages);
  const [loading, setLoading] = useState<boolean>(defaults.loading);
  
  const loadPage = async (pageNumber: number, pageSize: number, onError = (errors:any[]) => {}): Promise<IRole[]|null> => {
    setLoading(true);

    console.log({ message: 'HERE', currentPage, pageNumber, pageSize});

    if (currentPage !== pageNumber) {
      const rolesResult: IRoleResult|null = await Api.Roles.getAll(pageNumber, pageSize);

      if (rolesResult && rolesResult.errors && rolesResult.errors.length) {
        onError(rolesResult.errors);
      }

      setRoles(rolesResult ? rolesResult.data : []);
      setCurrentPage(rolesResult && rolesResult.page_meta ? rolesResult.page_meta.page : 0);
      setPageSize(rolesResult && rolesResult.page_meta ? rolesResult.page_meta.size : 0);
      setTotalPages(rolesResult && rolesResult.page_meta ? rolesResult.page_meta.pages : 0);
      setTotalRecords(rolesResult && rolesResult.page_meta ? rolesResult.page_meta.total : 0);
    }

    setLoading(false);

    return roles;
  };

  return (
    <RolesContext.Provider
      value={{
        roles,
        roleIds,
        currentPage,
        pageSize,
        totalPages,
        totalRecords,
        loading,
        loadPage
      }}>
      {children}
    </RolesContext.Provider>
  );
};

export default RolesProvider;