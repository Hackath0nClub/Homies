export default function EventEdit() {
  return (
    <div className="flex justify-center">
      <div className="w-5/6 grid md:grid-cols-10 sm:grid-cols-1">
        <div className="md:col-span-6">
          <div className="bg-gray-500">1</div>
          <div className="bg-red-500">2</div>
          <div className="bg-orange-500">3</div>
          <div className="bg-amber-500">4</div>
          <div className="bg-yellow-500">5</div>
          <div className="bg-lime-500">6</div>
        </div>
        <div className="md:col-span-4">
          <div className="bg-green-500">7</div>
          <div className="bg-emerald-500">8</div>
          <div className="bg-teal-500">9</div>
          <div className="bg-cyan-500">10</div>
          <div className="bg-sky-500">11</div>
          <div className="bg-blue-500">12</div>
        </div>
      </div>
    </div>
  )
}
