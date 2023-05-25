'use client';
import * as React from 'react';
import { redirect, useRouter } from 'next/navigation';

import { UserContext, loginUser } from '@/providers/UserProvider';
import Input from '@/components/Input/Input';
import { toast } from 'react-hot-toast';

import styles from './LoginPage.module.scss';
import Button from '@/components/Button/Button';
import { type } from 'os';

function LoginPage() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const { user, isLoggedIn, setLogin } = React.useContext(UserContext);
  const router = useRouter();
  const { push } = router;

  async function handleSubmit(event: React.FormEvent) {
    const res = await loginUser(event, name, email, setLogin);

    setName('');
    setEmail('');
    toast.success('Login successful');

    push('/');
  }

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Log In</h1>
        <form
          onSubmit={handleSubmit}
          data-testid="login-form"
          className={styles.form}
        >
          <Input
            label="Name: "
            id="name"
            value={name}
            setter={setName}
            placeholder="Name"
            required={true}
            pattern="^[a-zA-Z]+$"
            title="Only letters are accepted"
          />
          <Input
            label="Email: "
            type="email"
            id="email"
            value={email}
            setter={setEmail}
            placeholder="Email"
            required={true}
          />
          <Button type="submit">Log In</Button>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
