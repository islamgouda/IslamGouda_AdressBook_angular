export  interface pagination<T>{
    pageIndex:number,
    pageSize:number,
    count:number,
    data:T,
}

export interface paginatorFilters {
    page: number;
    pageSize: number;
    data: any | null;
}
export interface PageResultList<T> {
    pageSize: number;
    currentPage: number;
    totalCount: number;
    data: T[];
}