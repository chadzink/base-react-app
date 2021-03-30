// primary api context for current application data
import { createContext, useState, FC } from "react";
import * as Api from '../api';

// map api types
type IRole = Api.IRole;
type IRoleResult = Api.IFetchResult<IRole>;

export type IRolesContextState = {
  roles: IRole[]|null;
  currentPage: number|null;
  pageSize: number|null;
  totalPages: number|null;
  totalRecords: number|null;
  loading: boolean;
  loadAll: (onError: (errors: any[]) => void) => Promise<IRole[]|null>|null;
  loadPage: (pageNumber: number, pageSize: number, onError: (errors: any[]) => void) => Promise<IRole[]|null>|null;
  findById: (id: string, onError: (errors: any[]) => void) => Promise<IRole|null>|null;
  addNew: (role: IRole, onError: (errors: any[]) => void) => Promise<IRole|null>|null;
  removeById: (id: string, onError: (errors: any[]) => void) => Promise<void>|null;
  updateById: (id: string, role: IRole, onError: (errors: any[]) => void) => Promise<IRole|null>|null;
};

export const rolesContextDefaultValues = (): IRolesContextState => {
  return {
    roles: [],
    currentPage: -1,
    pageSize: 25,
    totalPages: -1,
    totalRecords: -1,
    loading: false,
    loadAll: () => null,
    loadPage: () => null,
    findById: () => null,
    addNew: () => null,
    removeById: () => null,
    updateById: () => null,
  }
};

export const RolesContext = createContext<IRolesContextState>(rolesContextDefaultValues());

const RolesProvider: FC = ({ children }) => {
  const defaults = rolesContextDefaultValues();
  const [roles, setRoles] = useState<IRole[]|null>(defaults.roles);
  const [currentPage, setCurrentPage] = useState<number|null>(defaults.currentPage);
  const [pageSize, setPageSize] = useState<number|null>(defaults.pageSize);
  const [totalPages, setTotalPages] = useState<number|null>(defaults.totalPages);
  const [totalRecords, setTotalRecords] = useState<number|null>(defaults.totalPages);
  const [loading, setLoading] = useState<boolean>(defaults.loading);
  
  const loadAll = async (onError = (errors:any[]) => {}): Promise<IRole[]|null> => {
    setLoading(true);

    const rolesResult: IRoleResult|null = await Api.Roles.all();

    if (rolesResult && rolesResult.errors && rolesResult.errors.length) {
      onError(rolesResult.errors);
    }
    else {
      setRoles(rolesResult ? rolesResult.data : []);

      setCurrentPage(0); setPageSize(0); setTotalPages(0);
      setTotalRecords(rolesResult && rolesResult.page_meta ? rolesResult.page_meta.total : 0);
    }

    setLoading(false);

    return roles;
  };

  const loadPage = async (pageNumber: number, pageSize: number, onError = (errors:any[]) => {}): Promise<IRole[]|null> => {
    setLoading(true);

    if (currentPage !== pageNumber) {
      const rolesResult: IRoleResult|null = await Api.Roles.page(pageNumber, pageSize);

      if (rolesResult && rolesResult.errors && rolesResult.errors.length) {
        onError(rolesResult.errors);
      }
      else {
        setRoles(rolesResult ? rolesResult.data : []);
        setCurrentPage(rolesResult && rolesResult.page_meta ? rolesResult.page_meta.page : 0);
        setPageSize(rolesResult && rolesResult.page_meta ? rolesResult.page_meta.size : 0);
        setTotalPages(rolesResult && rolesResult.page_meta ? rolesResult.page_meta.pages : 0);
        setTotalRecords(rolesResult && rolesResult.page_meta ? rolesResult.page_meta.total : 0);
      }
    }

    setLoading(false);

    return roles;
  };

  const findById = async (id: string, onError = (errors:any[]) => {}): Promise<IRole|null> => {
    setLoading(true);

    const roleResult: IRoleResult|null = await Api.Roles.find(id);
    let role: IRole|null = roleResult && roleResult.data && roleResult.data.length > 0 ? roleResult.data[0] : null;

    if (roleResult && roleResult.errors && roleResult.errors.length) {
      onError(roleResult.errors);
    }

    setLoading(false);

    return role;
  };

  const addNew = async (role: IRole, onError = (errors:any[]) => {}): Promise<IRole|null> => {
    setLoading(true);

    const roleResult: IRoleResult|null = await Api.Roles.add(role);
    let newRole: IRole|null = roleResult && roleResult.data && roleResult.data.length > 0 ? roleResult.data[0] : null;

    if (roleResult && roleResult.errors && roleResult.errors.length) {
      onError(roleResult.errors);
    }
    else {
      if (newRole !== null)
      {
        const prevRoles: IRole[] = roles ? roles : [];
        setRoles([newRole, ...prevRoles]);
        if (totalRecords) setTotalRecords(totalRecords + 1);
      }
    }

    setLoading(false);

    return roles && roles.length > 0 ? roles[0] : null;
  };

  const removeById = async (id: string, onError = (errors:any[]) => {}): Promise<void> => {
    setLoading(true);

    try {
      await Api.Roles.remove(id);

      // check if the role removed was part of the loaded roles
      const existingRole: IRole|undefined = roles ? roles.find((role: IRole) => role.id === id) : undefined;
      if (existingRole !== undefined) {
        // remove the role from the current role collection
        const rolesWithRemoved: IRole[]|null = roles ? roles.filter((role: IRole) => role.id !== existingRole.id) : null;
        setRoles(rolesWithRemoved);
        // reduce total count by 1
        if (totalRecords) setTotalRecords(totalRecords - 1);
      }
    }
    catch(e) {
      onError([e]);
    }
    
    setLoading(false);
  };

  const updateById = async (id: string, role: IRole, onError = (errors:any[]) => {}): Promise<IRole|null> => {
    setLoading(true);

    const roleResult: IRoleResult|null = await Api.Roles.update(id, role);
    let updatedRole: IRole|null = roleResult && roleResult.data && roleResult.data.length > 0 ? roleResult.data[0] : null;

    if (roleResult && roleResult.errors && roleResult.errors.length) {
      onError(roleResult.errors);
    }
    else {
      // check if the role removed was part of the loaded roles
      const existingRoleIndex: number = roles ? roles.findIndex((role: IRole) => role.id === id) : -1;

      if (existingRoleIndex !== -1)
      {
        let rolesUpdate: IRole[] = roles ? [...roles] : [];
        if (updatedRole !== null) {
          rolesUpdate[existingRoleIndex] = updatedRole;
          setRoles(rolesUpdate);
        }
      }
    }

    setLoading(false);

    return roles && roles.length > 0 ? roles[0] : null;
  };

  return (
    <RolesContext.Provider
      value={{
        roles,
        currentPage,
        pageSize,
        totalPages,
        totalRecords,
        loading,
        loadAll,
        loadPage,
        findById,
        addNew,
        removeById,
        updateById,
      }}>
      {children}
    </RolesContext.Provider>
  );
};

export default RolesProvider;