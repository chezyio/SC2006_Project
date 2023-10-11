import Image from "next/image";
import Link from "next/link";
const HawkerCard = ({ hawker }) => {
    return (
        <div className="py-16">
            <p className="text-xl font-bold">{hawker.name}</p>
            <p className="text-base">{hawker.address_myenv}</p>

            <div className="h-64">
                <Image
                    src={hawker.photourl}
                    alt={hawker.name}
                    className="rounded-t-xl max-h-64 relative"
                    width={500}
                    height={500}
                    objectFit="cover"
                />
            </div>
        </div>
    );
};

export default HawkerCard;
