export type IEntity = {
    id: string;
}

export interface IEntitySingleton<T> {
    // TO DO: Implement RESTful for role
    getAll: () => Promise<Array<T>|null>,
    // getById: (id:string) => Promise<T|null>,
    // add: (user:IUser) => Promise<T|null>,
    // remove: (id:string) => Promise<void>,
    // update: (user:IUser) => Promise<void>,
}