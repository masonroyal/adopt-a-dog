'use client';
import * as React from 'react';
import { redirect, useRouter } from 'next/navigation';

import { UserContext, loginUser } from '@/providers/UserProvider';
import Input from '@/components/Input/Input';

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

    push('/');
  }

  return (
    <form onSubmit={handleSubmit} data-testid="login-form">
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
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;
