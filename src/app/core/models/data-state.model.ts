export type LoadingStatus = 'loading' | 'success' | 'error' | 'idle';

export type DataState<T> = {
    status: LoadingStatus;
    data: T;
};
