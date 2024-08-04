
//import { signIn } from '@/app/_lib/auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

//export {GET,POST} from '@/app/_lib/auth'

const authOptions={
    providers:[
        CredentialsProvider({
            name:'credentials',
            credentials:{},
            async authorize(credentials){
                const user={_id:'1'}
                return user;
            }
        })
    ],
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:'/login'
    }
}

const handler=NextAuth(authOptions)

export {handler as GET,handler as POST};

