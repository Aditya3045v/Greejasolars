import { Building, Award, Users, CheckCircle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Greeja Organic Solar Energy | Leading Solar Experts in Muzaffarpur',
    description: 'Greeja Organic Solar Energy Private Limited provides reliable and affordable solar power solutions. We deliver high-quality installations with a strong focus on service excellence.',
    keywords: 'about greeja organic, solar muzaffarpur, solar energy company muzaffarpur, affordable solar bihar, solar installations bihar',
    openGraph: {
        title: 'About Greeja Organic Solar Energy - Excellence in Solar Innovation',
        description: 'Delivering reliable solar power solutions with a focus on customer satisfaction and high-quality service.',
        type: 'website',
    },
    alternates: {
        canonical: 'https://greejaorganic.in/about',
    },
};

export default function AboutPage() {
    return (
        <div className="pt-32 pb-20 bg-bg-deep min-h-screen">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Pioneering <span className="text-primary">Sustainable Energy</span></h1>
                    <p className="text-xl text-slate-400">Greeja Organic Solar Energy Private Limited provides reliable and affordable solar power solutions in Bihar and beyond.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                        <Building className="w-12 h-12 text-primary mb-6" />
                        <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
                        <p className="text-slate-400">To deliver high-quality solar installations with a strong focus on service excellence and customer satisfaction.</p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                        <Award className="w-12 h-12 text-accent-green mb-6" />
                        <h3 className="text-xl font-bold text-white mb-3">Quality Focus</h3>
                        <p className="text-slate-400">We prioritize high-quality components and precise engineering to ensure maximum longevity and efficiency.</p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                        <Users className="w-12 h-12 text-yellow-500 mb-6" />
                        <h3 className="text-xl font-bold text-white mb-3">Customer First</h3>
                        <p className="text-slate-400">Our team is committed to making transition to clean energy reliable and affordable for every home and business.</p>
                    </div>
                </div>

                <div className="bg-primary/10 rounded-[2rem] p-8 md:p-12 border border-primary/20">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Core Solutions</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            "High-Quality Solar Installations",
                            "Reliable Residential Solar Power",
                            "Affordable Commercial Solar Systems",
                            "Complete Maintenance & Support",
                            "Technical Site Assessments",
                            "On-Grid & Hybrid Solar Solutions"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                                <span className="text-white font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
