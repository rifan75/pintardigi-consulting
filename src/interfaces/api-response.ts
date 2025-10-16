export interface ApiResponse<Result> {
    code: number;
    status: string;
    data?: Result;
}

interface Pagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}
export interface ApiResponseWithPagination<Result> {
    code: number;
    status: string;
    meta: Pagination;
    data?: Result;
}
