import Image from "next/image";

export default function Home() {
  return (
    <main className="px-10 py-10 flex flex-col gap-6 h-screen">
      {/* Header */}
      <div
        className={`flex flex-col md:flex-row items-start md:items-center gap-6 justify-between`}
      >
        <div>
          <h1 className={`text-3xl font-bold text-primaryText`}>Dashboard</h1>
          <p className={`mt-2 text-secondaryText`}>Summary of all Data</p>
        </div>
      </div>
      <div className={`flex flex-col items-center justify-center h-full`}>
        <Image
          className={`flex object-cover shrink w-72 h-72 md:w-full md:h-full max-w-96 max-h-96`}
          alt={``}
          src={`/dashboard.png`}
          width={2500}
          height={2500}
        />
      </div>
    </main>
  );
}
