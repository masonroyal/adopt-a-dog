'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';

import { UserContext, loginUser } from '@/providers/UserProvider';
import Input from '@/components/Input/Input';

function LoginPage() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const { user, isLoggedIn, setLogin } = React.useContext(UserContext);
  const { push } = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    await loginUser(event, name, email, setLogin);
    setName('');
    setEmail('');
    push('/');
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input label="name" value={name} setter={setName} />
      <Input label="email" value={email} setter={setEmail} />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;
