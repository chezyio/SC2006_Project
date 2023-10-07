import Image from "next/image";
import Link from "next/link";
const HawkerCard = ({ hawker }) => {
    return (
        <div className="py-16">
            <p className="text-xl font-bold">{hawker.name}</p>
            <p>Q1 start date</p>
            <p>{hawker.q1_cleaningstartdate}</p>
            <p>Q1 end date</p>
            <p>{hawker.q1_cleaningenddate}</p>
            <p>{hawker.latitude_hc}</p>
            <p>{hawker.longitude_hc}</p>
            <p>{hawker.address_myenv}</p>
            <p>{hawker.no_of_market_stalls}</p>
            <p>{hawker.no_of_food_stalls}</p>
            <p>{hawker.description_myenv}</p>
            <p>{hawker.status}</p>
            <Image
                src={hawker.photourl}
                alt={hawker.name}
                width={500}
                height={500}
            />

        </div>
    );
};

export default HawkerCard;
