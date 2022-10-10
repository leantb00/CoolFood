import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../initSupabase';
import { Session } from '@supabase/supabase-js';
import Storage from '../utils/Storage';
type ContextProps = {
	user: null | boolean;
	setUser: any;
};

const AuthContext = createContext<Partial<ContextProps>>({});

interface Props {
	children: React.ReactNode;
}

const AuthProvider = (props: Props) => {
	// user null = loading
	const [user, setUser] = useState<null | boolean>(false);
	const [session, setSession] = useState<Session | null>(null);

	async function checkSigned() {
		let token = await Storage.getToken()
		setUser(token ? true : false);
	}

	useEffect(() => {
		// const session = supabase.auth.session();
		// setSession(session);
		// Storage.getToken()
		// setUser(session ? true : false);
		checkSigned()
		// const { data: authListener } = supabase.auth.onAuthStateChange(
		// 	async (event, session) => {
		// 		console.log(`Supabase auth event: ${event}`);
		// 		setSession(session);
		// 		setUser(session ? true : false);
		// 	}
		// );
		// return () => {
		// 	authListener!.unsubscribe();
		// };
	}, [user]);

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
