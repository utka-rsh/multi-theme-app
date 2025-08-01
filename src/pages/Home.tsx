import Products from "./Products";

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] p-4 text-center">
      {/* <div>
        <h2 className="text-2xl font-semibold mb-2">Welcome to the Home Page</h2>
        <p>This theme will persist and switch dynamically.</p>
      </div> */}

      <Products/>
    </div>
  );
};

export default Home;
