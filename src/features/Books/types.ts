export type Book = {
    id: number;
    title: string;
    description: string|null;
    total_number_of_pages: number;
    number_of_pages_read: number;
    user_id: number;
    created_at: string;
    updated_at: string;
}


export type CreateBookRequest = Omit<Book,'number_of_pages_read'|'created_at'|'updated_at'>;

export type GetAllBooksByUserIdRequest = {
    user_id: number;
}

export type GetAllBooksByUserIdResponse = Book[]