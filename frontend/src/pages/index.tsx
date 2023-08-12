import { useContext, FormEvent, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/home.module.scss';

import logoImg from '../../public/logo.svg';

import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

import {AuthContext } from '../contexts/AuthContext';

import Link from 'next/link';
import { toast } from 'react-toastify';

import { canSSRGuest } from '../utils/canSSRGuest';

export default function Home(){
  const { signIn } = useContext(AuthContext)
  // armazena email
  const [ email, setEmail] = useState('');
  // armazena senha
  const [password, setPassword] = useState('');
  // efeito loading button acessar
  const [loading, setLoading] = useState(false);


  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if(email === '' || password === ''){
      return toast.warning("Preecha todos os campos!");
    }

    setLoading(true)

    let data ={
      email,
      password
    }

    await signIn(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Sujeito Pizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt='Logo Sujeito Programador' />

        <div className={styles.login}>
          <h1>Faça seu login</h1>
          <form onSubmit={handleLogin}>
            <Input
              placeholder='Digite seu email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='Digite sua senha'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              loading={loading}
            >
              Acessar
            </Button>
          </form>
          
          <Link href="/signup">
            <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
          </Link>

        </div>

      </div>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props:{}
  }
})