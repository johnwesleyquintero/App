function HomePage({ data }) {
  return (
    <div>
      <h1>Server-Side Rendering Example</h1>
      <p>Data fetched from server:</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export async function getServerSideProps(context) {
  const data = { message: 'Hello from the server!' };
  return {
    props: { data },
  };
}

export default HomePage;