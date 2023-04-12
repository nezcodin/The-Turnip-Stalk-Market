export const Footer = () => {
  return (
    <div className="fixed w-screen bottom-0 p-2 mt-12 md:text-lg text-sm">
      <div className="bg-mintgreen h-48 text-white flex justify-center items-center rounded-2xl flex-col px-2">
        <p className="text-center">The Stalk Market is a full-stack app that is powered by ReactJS and Django.</p>
        <div className="flex flex-row space-x-1">
          <p className="text-center">The Turnip Stalk Market</p>
          <p className="text-lg font-motivasansregular text-center">{'\u00A9'}</p>
          <p className="text-center">2023</p>
        </div>

      </div>
    </div>
  )
}

