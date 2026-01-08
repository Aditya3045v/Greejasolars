import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Greeja Organic Solar Energy Private Limited',
        short_name: 'Greeja Organic',
        description: 'Reliable and affordable solar power solutions in Muzaffarpur.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0B1120',
        theme_color: '#0056D2',
        icons: [
            {
                src: '/assets/logo.png',
                sizes: 'any',
                type: 'image/png',
            },
        ],
    }
}
