import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient(
            environment.supabaseUrl,
            environment.supabaseKey,
            {
                auth: {
                    lock: async (name: string, acquireTimeout: number, fn: () => Promise<any>) => {
                        return await fn();
                    }
                }
            }
        );
    }

    get client(): SupabaseClient {
        return this.supabase;
    }

    async getCurrentUser(): Promise<User | null> {
        const { data: { user } } = await this.supabase.auth.getUser();
        return user;
    }

    async isAuthenticated(): Promise<boolean> {
        const { data: { session } } = await this.supabase.auth.getSession();
        return session !== null;
    }
}
