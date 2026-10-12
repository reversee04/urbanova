import { Head } from '@inertiajs/react';
import { HeroCarousel } from '@/components/herocarousel';
import { OurExpertise } from '@/components/ourexpertise';
import { LatestNewsGrid } from '@/components/latestnewsgrid';

export default function Welcome() {
    return (
        <>
            <Head title="Urbanova | Better places for people and communities" />
            <HeroCarousel/>
            <OurExpertise/>
            <LatestNewsGrid/>
        </>
    );
}
