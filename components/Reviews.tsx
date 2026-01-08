import { Star, Quote } from 'lucide-react';

export default function Reviews() {
    const reviews = [
        {
            id: 1,
            name: "Rahul Srivastava",
            location: "Muzaffarpur Town",
            rating: 5,
            date: "2 months ago",
            review: "Greeja Organic Solar Energy installed a 5kW system at my home. The electricity bill reduction is incredible. Professional team and seamless installation.",
            systemSize: "5kW Residential"
        },
        {
            id: 2,
            name: "Anjali Kumari",
            location: "Pokhraira, Muzaffarpur",
            rating: 5,
            date: "1 month ago",
            review: "Best solar service in Bihar! Reliable, affordable, and very supportive team. They explained everything clearly and the system is working perfectly.",
            systemSize: "3kW Residential"
        },
        {
            id: 3,
            name: "Sanjay Kumar",
            location: "Krishna Chowk Area",
            rating: 5,
            date: "3 weeks ago",
            review: "Installed commercial solar for my shop. Very happy with the service excellence and high-quality setup provided by Greeja Organic.",
            systemSize: "10kW Commercial"
        },
        {
            id: 4,
            name: "Meena Devi",
            location: "Motipur, Muzaffarpur",
            rating: 5,
            date: "1 month ago",
            review: "As a first-time user, I was worried about maintenance, but Greeja Organic's focus on service excellence made everything easy. Highly recommend!",
            systemSize: "2kW Residential"
        },
        {
            id: 5,
            name: "Rajiv Ranjan",
            location: "Kanti, Bihar",
            rating: 5,
            date: "2 weeks ago",
            review: "Premium quality solar panels and very efficient setup. The Muzaffarpur team is technically very sound and helpful.",
            systemSize: "7kW Residential"
        },
        {
            id: 6,
            name: "Pooja Singh",
            location: "Muzaffarpur City",
            rating: 5,
            date: "3 months ago",
            review: "Transitioned to clean energy with Greeja Organic. Affordable pricing and top-notch customer satisfaction. Very happy with the results.",
            systemSize: "4kW Residential"
        }
    ];

    return (
        <section className="py-24 lg:py-32 bg-gradient-to-b from-[#0B1120] to-bg-deep" id="testimonials">
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">

                {/* Section Header */}
                <div className="text-center mb-16 lg:mb-20">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm lg:text-base mb-3 block">Customer Reviews</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 lg:mb-8">
                        What Our <span className="text-gradient">Customers Say</span>
                    </h2>
                    <p className="text-slate-400 max-w-4xl mx-auto text-lg lg:text-xl xl:text-2xl leading-relaxed">
                        Real experiences from 500+ happy solar customers across Bihar. Join the renewable energy revolution today.
                    </p>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] lg:rounded-[2.5rem] p-8 lg:p-10 hover:bg-white/10 transition-all group hover:-translate-y-2"
                        >
                            {/* Quote Icon */}
                            <div className="mb-6">
                                <Quote className="w-10 h-10 lg:w-12 lg:h-12 text-primary/40" />
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>

                            {/* Review Text */}
                            <p className="text-slate-300 leading-relaxed mb-6 text-base lg:text-lg">
                                &quot;{review.review}&quot;
                            </p>

                            {/* System Size Badge */}
                            <div className="mb-4">
                                <span className="inline-block px-4 py-1.5 bg-primary/20 border border-primary/30 rounded-full text-primary text-sm font-semibold">
                                    {review.systemSize}
                                </span>
                            </div>

                            {/* Author Info */}
                            <div className="pt-4 border-t border-white/10">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white font-bold text-lg">{review.name}</p>
                                        <p className="text-slate-400 text-sm">{review.location}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-slate-500 text-xs">{review.date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats Summary */}
                <div className="mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div className="text-center">
                        <div className="text-5xl lg:text-6xl font-bold text-white mb-2">500+</div>
                        <p className="text-slate-400 text-lg">Happy Customers</p>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl lg:text-6xl font-bold text-white mb-2">98%</div>
                        <p className="text-slate-400 text-lg">Satisfaction Rate</p>
                    </div>
                    <div className="text-center">
                        <div className="text-5xl lg:text-6xl font-bold text-white mb-2">4.9★</div>
                        <p className="text-slate-400 text-lg">Average Rating</p>
                    </div>
                </div>

            </div>
        </section>
    );
}
