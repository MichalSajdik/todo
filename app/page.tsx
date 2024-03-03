import React from 'react';

export default function Home() {
  return (
    <main>
      <div>
        <h1>Welcome to the Todo App</h1>
        <p>
                    This is a simple todo app built with Next.js and TypeScript.
        </p>
        <p>
                    Please continue to <a href='/login'>log in</a> or <a href='/register'>register</a>
        </p>
      </div>
    </main>
  );
}
