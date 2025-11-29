"use client";

export default function Header() {
  return (
    <>
      <header className="w-full bg-black shadow-lg border-b border-blue-500 sticky top-0">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center h-16">
            {/*titulo*/}
              <h1 className="text-2xl text-blue-500 tracking-widest">
                TO-DO-LIST
              </h1>

            {/*outros botoes*/}
            <div className="flex items-center ">teste</div>
          </div>
        </div>
      </header>
    </>
  );
}
