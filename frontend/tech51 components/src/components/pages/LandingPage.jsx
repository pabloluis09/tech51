import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

const LandingPage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    // Simulated API call to fetch featured products
    setFeaturedProducts([
      {
        id: "1",
        name: "Tech51 Pro Laptop",
        price: 1999.99,
        image:
          "https://img.freepik.com/free-photo/person-working-html-computer_23-2150038840.jpg?w=1380&t=st=1688486343~exp=1688486943~hmac=2a2f5c9e7c6f1b0f6f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f",
      },
      {
        id: "2",
        name: "4K Streaming Camera",
        image:
          "https://img.freepik.com/free-photo/professional-camera-blurred-background_169016-10249.jpg?w=1380&t=st=1688486391~exp=1688486991~hmac=3a3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f",
        price: 299.99,
      },
      {
        id: "3",
        name: "Wireless Gaming Headset",
        price: 149.99,
        image:
          "https://img.freepik.com/free-photo/wireless-headphones-levitating-white-background_1419-2214.jpg?w=1380&t=st=1688486425~exp=1688487025~hmac=4a4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f4f",
      },
    ])
  }, [])

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/workplace-with-smartphone-laptop-black-table-top-view-copyspace-background_144627-24860.jpg?w=1380&t=st=1688486467~exp=1688487067~hmac=5a5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-purple-500">Tech51</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Elevate your content creation with cutting-edge tech and exclusive perks.
          </p>
          <Link
            to="/shop"
            className="bg-purple-500 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-purple-600 transition duration-300"
          >
            Explore Products
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Tech</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
              >
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-purple-500 font-bold mb-4">${product.price.toFixed(2)}</p>
                  <Link
                    to={`/product/${product.id}`}
                    className="inline-block bg-purple-500 text-white px-4 py-2 rounded-full font-bold hover:bg-purple-600 transition duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscriptions & Giveaways */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Join the Tech51 Community</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Exclusive Subscriptions</h3>
              <p className="mb-4">Get early access to new products, exclusive content, and more!</p>
              <Link
                to="/subscriptions"
                className="inline-block bg-purple-500 text-white px-6 py-2 rounded-full font-bold hover:bg-purple-600 transition duration-300"
              >
                Subscribe Now
              </Link>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Monthly Giveaways</h3>
              <p className="mb-4">Win amazing tech prizes every month!</p>
              <Link
                to="/giveaways"
                className="inline-block bg-purple-500 text-white px-6 py-2 rounded-full font-bold hover:bg-purple-600 transition duration-300"
              >
                Enter Giveaways
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Upgrade Your Tech Game?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join Tech51 today and transform your content creation experience.
          </p>
          <Link
            to="/register"
            className="bg-white text-purple-600 px-8 py-3 rounded-full text-lg font-bold hover:bg-gray-100 transition duration-300"
          >
            Get Started <ChevronRight className="inline-block ml-2" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
