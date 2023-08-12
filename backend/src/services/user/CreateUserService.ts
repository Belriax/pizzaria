import prismaClient from "../../prisma";
import { hash } from "bcryptjs"; 

interface UserRequest{
  name: string;
  email: string;
  password: string;
}

class CreateUserService{
  async execute({ name, email, password }: UserRequest){
    
    // verificar se email foi enviado
    if(!email){
      throw new Error("Email incorreto!");
    }

    // verificar se esse email já está cadastrado na plataforma
    const userAlreadyExists = await prismaClient.user.findFirst({
      where:{
        email: email
      }
    })

    if(userAlreadyExists){
      throw Error("Email já existe, use um email diferente!")
    }
    // criptografia da senha
    const passwordHash = await hash(password, 8)

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select:{
        id: true,
        name: true,
        email: true,
      }
    })

    return user;
  }
}

export { CreateUserService }