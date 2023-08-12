import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign} from 'jsonwebtoken';

interface AuthRequest{
  email: string;
  password: string;
}


class AuthUserService{
  async execute({email, password}: AuthRequest){

    const user = await prismaClient.user.findFirst({
      where:{
        email: email
      }
    })

    // verificar usuário existe
    if(!user){
      throw new Error( "Usuário/Senha incorreto, tente novamente." );
    }

    // verificar senha se está correta
    const passwordMatch = await compare(password, user.password);
    if(!passwordMatch){
      throw new Error("Usuário/Senha incorreto, tente novamente.");
    }

    // se deu certo, gerar um tokem jwt e devolver os dados do usuário como email, senha
    const token = sign(
      {
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d'
      }
    )
    return { 
      id: user.id,
      name: user.name,
      email: user.email,
      token: token
     }
  }
}


export { AuthUserService };