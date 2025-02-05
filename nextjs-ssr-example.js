// pages/index.js (or any page in your pages directory)
import React from 'react';

function HomePage({ data }) {
  return (
    <div>
      <h1>Server-Side Rendered Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getServerSideProps(context) {
  // Fetch data from external API
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default HomePage;