function App() {
  return (
    <div className= "w-[384px] flex flex-col gap-10 p-10 items-center cursor-default">
      <h1 className="text-2xl text-primary font-bold">LinkedIn AI Reply</h1>
      <p className="about">
        Made by <a href="https://github.com/tanu-chahal" target="_blank" className="text-primary font-semibold text-lg">Tanu Chahal</a> using  <span className="text-green-500 text-md font-semibold">WXT</span> and <span className="text-sky-500 font-semibold text-md">React (+Typescript)</span>
      </p>
      <p className="srcCode flex flex-col gap-2">
        <span>Checkout out the source code at:</span><span className="bg-gray-600/10 px-2 py-1 rounded-md text-primary-gray"><a href="https://github.com/tanu-chahal/LinkedIn-AI-Reply" target="_blank">https://github.com/tanu-chahal/LinkedIn-AI-Reply</a></span>
      </p>
    </div>
  );
}

export default App;
