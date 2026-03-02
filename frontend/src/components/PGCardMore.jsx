const PGCard = ({ pg }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition duration-300">
      <img src={pg.image} alt={pg.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{pg.name}</h3>
        <p className="text-gray-600">{pg.location}</p>
        <p className="text-blue-600 font-bold">₹{pg.price}/month</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {pg.amenities.map(amenity => (
            <span key={amenity} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
              {amenity}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">Gender: {pg.gender}</p>
        <p className="text-sm text-gray-500">Occupancy: {pg.occupancy}</p>
        <button className="mt-4 w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default PGCard;
