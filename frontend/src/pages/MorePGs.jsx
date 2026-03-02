import { useState } from 'react';
import PGCard from '../components/PGCardMore';

const pgs = [
  {
    id: 1,
    name: "Blue Heaven PG",
    price: 8000,
    location: "Near MUJ Gate 2",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=250&fit=crop",
    gender: "Boys",
    occupancy: "Double",
    amenities: ["WiFi", "AC"],
    rating: 4.6
  },
  {
    id: 2,
    name: "Green Valley PG",
    price: 7000,
    location: "Near Campus",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=250&fit=crop",
    gender: "Girls",
    occupancy: "Single",
    amenities: ["WiFi", "Food Included"],
    rating: 4.4
  },
  {
    id: 3,
    name: "Sunrise Hostel",
    price: 6000,
    location: "Downtown Area",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop",
    gender: "Co-Living",
    occupancy: "Triple",
    amenities: ["Parking", "Laundry"],
    rating: 4.2
  },
  {
    id: 4,
    name: "Comfort Zone PG",
    price: 9000,
    location: "Near Shopping Mall",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=250&fit=crop",
    gender: "Boys",
    occupancy: "Single",
    amenities: ["WiFi", "AC", "Food Included"],
    rating: 4.8
  },
  {
    id: 5,
    name: "Elite Living PG",
    price: 10000,
    location: "Prime Location",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop",
    gender: "Girls",
    occupancy: "Double",
    amenities: ["WiFi", "AC", "Parking"],
    rating: 5.0
  },
  {
    id: 6,
    name: "Budget Stay PG",
    price: 5500,
    location: "Suburban Area",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop",
    gender: "Co-Living",
    occupancy: "Triple",
    amenities: ["WiFi", "Laundry"],
    rating: 4.0
  }
];

const MorePGs = () => {
  const [priceMin, setPriceMin] = useState(2000);
  const [priceMax, setPriceMax] = useState(15000);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedOccupancy, setSelectedOccupancy] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleOccupancyChange = (occ) => {
    setSelectedOccupancy(prev =>
      prev.includes(occ)
        ? prev.filter(o => o !== occ)
        : [...prev, occ]
    );
  };

  const handleGenderChange = (gen) => {
    setSelectedGender(prev =>
      prev.includes(gen)
        ? prev.filter(g => g !== gen)
        : [...prev, gen]
    );
  };

  const filteredPGs = pgs.filter(pg =>
    pg.price >= priceMin &&
    pg.price <= priceMax &&
    (selectedAmenities.length === 0 || selectedAmenities.every(amenity => pg.amenities.includes(amenity))) &&
    (selectedOccupancy.length === 0 || selectedOccupancy.includes(pg.occupancy)) &&
    (selectedGender.length === 0 || selectedGender.includes(pg.gender))
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&h=400&fit=crop')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-white text-center py-2.5">Find Your Perfect PG</h1>
        </div>
      </section>
      <div className="flex flex-col lg:flex-row gap-8 p-8 mt-8">
        {/* Filters Panel */}
        <div className="w-full md:w-1/4">
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Price Range</label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="2000"
                  max="15000"
                  value={priceMin}
                  onChange={(e) => setPriceMin(Number(e.target.value))}
                  className="w-full"
                />
                <input
                  type="range"
                  min="2000"
                  max="15000"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="text-sm text-gray-600 mt-2">
                ₹{priceMin} - ₹{priceMax}
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Amenities</label>
              {['WiFi', 'AC', 'Food Included', 'Parking', 'Laundry'].map(amenity => (
                <label key={amenity} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                    className="mr-2"
                  />
                  {amenity}
                </label>
              ))}
            </div>

            {/* Occupancy */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Occupancy</label>
              {['Single', 'Double', 'Triple'].map(occ => (
                <label key={occ} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={selectedOccupancy.includes(occ)}
                    onChange={() => handleOccupancyChange(occ)}
                    className="mr-2"
                  />
                  {occ}
                </label>
              ))}
            </div>

            {/* Gender */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Gender</label>
              {['Boys', 'Girls', 'Co-Living'].map(gen => (
                <label key={gen} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={selectedGender.includes(gen)}
                    onChange={() => handleGenderChange(gen)}
                    className="mr-2"
                  />
                  {gen}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* PG Cards Grid */}
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPGs.map(pg => (
              <PGCard key={pg.id} pg={pg} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MorePGs;
