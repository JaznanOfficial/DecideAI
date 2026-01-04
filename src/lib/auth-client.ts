import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";

export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_APP_URL, // Make sure this env var is set
    fetchOptions: {
        onError(e) {
			console.log(e);
            
        },
    }
});

export const { useSession, signIn, signOut, signUp } = authClient;
