"use client"

import { PHONE_LINK } from "@/constants/links";
import { Icon, LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import FirstVisit from "../FirstVisit";
import { usePathname } from 'next/navigation';

const Footer: React.FC = () => {
    const position: LatLngExpression = [59.94041749831786, 30.323925288359895];
    const markerIcon: Icon = new Icon({iconUrl: "/images/logo.jpg", iconSize: [30, 30], iconAnchor: [0, 0], className: "rounded-full relative before:animate-pulse before:content-[''] before:absolute before:left-0 before:top-0 before:bg-[--red] before:w-[100%] before:h-[100%]"});
    const path = usePathname();
    return (
        <footer className={`flex flex-col items-center mt-10 py-5 gap-y-5 ${path === "/admin" ? "hidden" : null}`}>
            <MapContainer center={position} zoom={23} className="w-full h-[400px]">
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={markerIcon}>
                </Marker>
            </MapContainer>
            <div className="grid grid-cols-3 justify-items-center gap-x-20 max-lg:text-xs max-lg:gap-x-5">
                <span className="text-center">г.Санкт-Петербург,<br/>Большая Конюшенная ул., 5</span>
                <span className="text-center">© 2023 | Odyssey<br/>Все права защищены</span>
                <div className="flex flex-col text-center">
                    <span>Ежедневно с с 19:00 до 07:00</span>
                    <a href={PHONE_LINK}>+7(995)232-28-11</a>
                </div>
            </div>
            <FirstVisit />
        </footer>
    );
}

export default Footer;