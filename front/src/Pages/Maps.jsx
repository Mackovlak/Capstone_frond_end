import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import Swal from 'sweetalert2';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
});

function UserLocationMarker({ setUserPosition }) {
  const map = useMap();
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLatLng = [position.coords.latitude, position.coords.longitude];
        map.setView(userLatLng, 14);
        setPosition(userLatLng);
        setUserPosition(userLatLng);
      },
      (err) => {
        console.error('Unable to retrieve your location', err);
      }
    );
  }, [map, setUserPosition]);

  return position ? (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;
}

const getDistance = ([lat1, lon1], [lat2, lon2]) => {
  const toRad = (value) => (value * Math.PI) / 100;
  const R = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const formatDistance = (km) => {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(2)} km`;
};

export const NearbyClinics = () => {
  const mapRef = useRef(null);
  const markerRefs = useRef({});

  const [userPosition, setUserPosition] = useState(null);
  const [clinics, setClinics] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false); // State for loading
  const [selectedClinic, setSelectedClinic] = useState(null);

  const fetchClinics = async (radius = 10000) => {
    if (!userPosition) return;
    const [lat, lon] = userPosition;

    // Show SweetAlert loading
    const getZoomLevel = (radius) => {
      if (radius <= 5000) return 14;
      if (radius <= 10000) return 13;
      if (radius <= 15000) return 12;
      if (radius <= 20000) return 11;
      return 10;
    };
    Swal.fire({
      title: 'Menunggu klinik...',
      html: `Mencari di dalam ${radius / 1000} radius km...`,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const zoom = getZoomLevel(radius);
    mapRef.current.flyTo([lat, lon], zoom, {
      animate: true,
      duration: 1.2,
    });
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="clinic"](around:${radius},${lat},${lon});
        node["amenity"="hospital"](around:${radius},${lat},${lon});
        node["amenity"="doctors"](around:${radius},${lat},${lon});
        node["amenity"="pharmacy"](around:${radius},${lat},${lon});
      );
      out body;
      >;
      out skel qt;
    `;

    try {
      const res = await axios.post('https://overpass-api.de/api/interpreter', query, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      const elements = res.data.elements || [];
      if (elements.length === 0) {
        fetchClinics(radius + 5000);
      } else {
        const clinicsData = elements
          .filter((el) => el.lat && el.lon)
          .map((el, idx) => ({
            id: el.id || idx,
            name: el.tags.name || 'Unnamed Clinic',
            position: [el.lat, el.lon],
            description: el.tags.amenity || 'Clinic/Health service',
            distance: getDistance(userPosition, [el.lat, el.lon]),
            address: el.tags['addr:full'] || null,
            city: el.tags['addr:city'] || null,
            operatorType: el.tags['operator:type'] || null,
            healthcare: el.tags['healthcare'] || null,
            source: el.tags['source'] || null,
          }))
          .sort((a, b) => a.distance - b.distance);
        setClinics(clinicsData);
        Swal.close();
      }
    } catch (err) {
      console.error('Error fetching clinic data', err);
    } finally {
      // Close the SweetAlert loading after the data is fetched
    }
  };
  useEffect(() => {
    if (userPosition) fetchClinics();
  }, [userPosition]);

  const filteredClinics = clinics.filter((clinic) => clinic.name.toLowerCase().includes(search.toLowerCase()));

  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row items-stretch justify-center min-h-screen  p-4 lg:p-6 gap-4 lg:gap-6 bg-gray-100">
      <Card className="w-full lg:w-[400px] flex-shrink-0 flex flex-col border-t-5 border-t-sky-400 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl font-bold text-gray-800">Klinik Terdekat</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Temukan klinik, rumah sakit, dan apotek di dekat Anda.</p>
        </CardHeader>
        <CardContent className="flex-grow pt-2">
          <Input placeholder="Mencari Klinik..." className="mb-3 border-gray-300 focus-visible:ring-sky-400" value={search} onChange={(e) => setSearch(e.target.value)} />

          {filteredClinics.length > 0 ? (
            <ScrollArea className="h-[calc(100vh-350px)] lg:h-[400px] pr-2">
              <ul className="space-y-3">
                {filteredClinics.map((clinic) => (
                  <li
                    key={clinic.id}
                    className={`p-3 border rounded-lg transition-all duration-200 ease-in-out cursor-pointer
                           ${selectedClinic?.id === clinic.id ? 'bg-blue-50 border-blue-400 shadow-md' : 'hover:bg-gray-50 border-gray-200'}`}
                    onClick={() => {
                      setSelectedClinic(clinic);
                      if (mapRef.current) {
                        mapRef.current.flyTo(clinic.position, 14, {
                          animate: true,
                          duration: 1.5,
                        });
                      }
                      const marker = markerRefs.current[clinic.id];
                      if (marker) {
                        marker.openPopup();
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-base text-gray-700">{clinic.name}</strong>
                      <span className="text-sm font-semibold text-blue-600">{formatDistance(clinic.distance)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{clinic.description}</p>
                    {clinic.address && <p className="text-xs text-gray-400 mt-1 truncate">{clinic.address}</p>}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          ) : (
            <div className="text-center text-gray-500 py-10">
              <p>Tidak ada klinik yang ditemukan. Coba perluas pencarian Anda atau sesuaikan radiusnya.</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-3 pt-4">
          <Button variant="secondary" className="w-full text-blue-700 border-blue-700 hover:bg-blue-50" onClick={() => navigate('/dashboard')}>
            Pergi ke Dasbor
          </Button>
          <Button variant="outline" className="w-full text-gray-700 border-gray-300 hover:bg-gray-50" onClick={() => navigate('/')}>
            Pergi ke Beranda
          </Button>
        </CardFooter>
      </Card>

      <Card className="flex-1 w-full flex flex-col border-t-5 border-t-sky-400 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-4xl text-center text-gray-800">Peta Klinik</CardTitle>
        </CardHeader>
        <CardContent className="relative flex-grow p-0 overflow-hidden rounded-b-lg">
          <div className="absolute bottom-4 right-4 z-[1000] space-y-2">
            <button
              onClick={() => {
                if (userPosition && mapRef.current) {
                  mapRef.current.flyTo(userPosition, 14, { animate: true, duration: 1.2 });
                }
              }}
              className="bg-white border border-gray-300 px-4 py-2 rounded-full shadow-lg hover:bg-gray-100 transition-all text-gray-700 flex items-center gap-2"
            >
              <span className="text-lg">📍</span> Pusatkan pada saya
            </button>
          </div>

          <MapContainer ref={mapRef} center={userPosition || [0, 0]} zoom={13} scrollWheelZoom={true} className="h-[400px] lg:h-[600px] w-full z-0">
            <UserLocationMarker setUserPosition={setUserPosition} />

            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="OpenStreetMap Default">
                <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              </LayersControl.BaseLayer>

              <LayersControl.BaseLayer name="Topographic View">
                <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors' />
              </LayersControl.BaseLayer>

              <LayersControl.BaseLayer name="Humanitarian View">
                <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, Humanitarian style' />
              </LayersControl.BaseLayer>

              {filteredClinics.map((clinic) => (
                <Marker
                  key={clinic.id}
                  position={clinic.position}
                  icon={customIcon}
                  ref={(ref) => {
                    if (ref) markerRefs.current[clinic.id] = ref;
                  }}
                >
                  <Popup>
                    <div className="text-sm">
                      <strong className="text-base text-blue-700">{clinic.name}</strong>
                      <br />
                      {clinic.address && <div className="text-gray-600">{clinic.address}</div>}
                      {clinic.city && <div className="text-gray-600">📍 {clinic.city}</div>}
                      <div className="text-gray-600">🏥 {clinic.description}</div>
                      {clinic.healthcare && <div className="text-gray-600">🩺 Healthcare: {clinic.healthcare}</div>}
                      {clinic.operatorType && <div className="text-gray-600">🏷️ Operator: {clinic.operatorType}</div>}
                      {clinic.source && <div className="text-gray-600">🔍 Source: {clinic.source}</div>}
                      <div className="font-semibold text-blue-600 mt-1">📏 {formatDistance(clinic.distance)}</div>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {userPosition && (
                <Marker position={userPosition}>
                  <Popup>You are here</Popup>
                </Marker>
              )}
            </LayersControl>
          </MapContainer>
        </CardContent>
      </Card>
    </div>
  );
};
