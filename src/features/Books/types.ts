export type Book = {
    id: number;
    title: string;
    description?: string;
    total_number_of_pages: number;
    number_of_pages_read: number;
    user_id: number;
    created_at: string;
    updated_at: string;
}


export type CreateBookRequest = Omit<Book,'id'|'number_of_pages_read'|'created_at'|'updated_at'>;

export type GetAllBooksByUserIdRequest = {
    user_id: number;
}

export type GetAllBooksByUserIdResponse = Book[]

export type EditBookRequest = Partial<Omit<CreateBookRequest, 'user_id'|'total_number_of_pages'>> & {
    number_of_pages_read: Book['number_of_pages_read'];
}