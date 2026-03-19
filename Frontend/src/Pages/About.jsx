import React from "react";

function About() {
    return (
        <div className="bg-gray-100 py-16 px-6 mt-20">
            <section className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-1">
                        <img src="https://picsum.photos/600/800?random=1" alt="" className="w-full h-full object-cover rounded-2xl" />
                    </div>
                    <div className="flex flex-col gap-6">
                        <img src="https://picsum.photos/600/400?random=2" alt="" className="w-full h-1/2 object-cover rounded-2xl" />
                        <img src="https://picsum.photos/600/400?random=3" alt="" className="w-full h-1/2 object-cover rounded-2xl" />
                    </div>
                    <div className="flex flex-col gap-6">
                        <img src="https://picsum.photos/600/400?random=4" alt="" className="w-full h-1/2 object-cover rounded-2xl" />
                        <img src="https://picsum.photos/600/400?random=5" alt="" className="w-full h-1/2 object-cover rounded-2xl" />
                    </div>
                    <div className="md:col-span-1">
                        <img src="https://picsum.photos/600/800?random=6" alt="" className="w-full h-full object-cover rounded-2xl" />
                    </div>
                </div>
            </section>
            <section className="bg-white py-16">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

                    <div className="p-6 rounded-2xl shadow-sm hover:shadow-lg transition">
                        <h3 className="text-4xl font-bold text-blue-600 mb-2">4M</h3>
                        <p className="text-gray-600">
                            4 million daily active users
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl shadow-sm hover:shadow-lg transition">
                        <h3 className="text-4xl font-bold text-blue-600 mb-2">12K</h3>
                        <p className="text-gray-600">
                            Over 12k open job positions
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl shadow-sm hover:shadow-lg transition">
                        <h3 className="text-4xl font-bold text-blue-600 mb-2">20M</h3>
                        <p className="text-gray-600">
                            Over 20 million stories shared
                        </p>
                    </div>

                </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                    <div>
                        <h3 className="text-4xl font-bold mb-6">
                            About <span className="text-blue-600">Superio</span>
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Far much that one rank beheld bluebird after outside ignobly allegedly
                            more when oh arrogantly vehement irresistibly fussy penguin insect
                            additionally wow absolutely crud meretriciously hastily dalmatian.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Repeatedly dreamed alas opossum but dramatically despite
                            expeditiously that jeepers loosely yikes that as or eel underneath
                            kept and slept compactly far purred sure abidingly up above fitting.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-3xl shadow-sm">
                        <h4 className="text-2xl font-semibold mb-4">
                            Why Choose Us?
                        </h4>
                        <ul className="space-y-4 text-gray-600">
                            <li>✔ Trusted by millions of users</li>
                            <li>✔ Thousands of verified job listings</li>
                            <li>✔ Easy application process</li>
                            <li>✔ Secure and fast platform</li>
                        </ul>
                    </div>

                </div>
            </section>

        </div>
    );
}

export default About;