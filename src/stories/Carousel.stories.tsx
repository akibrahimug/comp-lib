import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Carousel, CarouselSlide, CarouselImage } from '../components/Carousel';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Carousel component for displaying content in a slideshow. Supports auto-play, navigation arrows, dots, and keyboard navigation. Uses placeholder images from Picsum Photos.'
      }
    }
  }
};
export default meta;
type Story = StoryObj<typeof Carousel>;

/**
 * Playground
 */
export const Playground: Story = {
  args: {
    autoPlay: false,
    interval: 3000,
    showDots: true,
    showArrows: true,
    loop: true,
  },
  render: (args) => (
    <Carousel {...args}>
      <CarouselImage
        src="https://picsum.photos/seed/carousel1/1200/600"
        alt="Slide 1"
      />
      <CarouselImage
        src="https://picsum.photos/seed/carousel2/1200/600"
        alt="Slide 2"
      />
      <CarouselImage
        src="https://picsum.photos/seed/carousel3/1200/600"
        alt="Slide 3"
      />
    </Carousel>
  ),
};

/**
 * Basic Carousel
 * Simple image carousel with navigation
 */
export const Basic: Story = {
  render: () => (
    <Carousel>
      <CarouselImage
        src="https://picsum.photos/seed/basic1/1200/600"
        alt="Mountain landscape"
      />
      <CarouselImage
        src="https://picsum.photos/seed/basic2/1200/600"
        alt="Ocean view"
      />
      <CarouselImage
        src="https://picsum.photos/seed/basic3/1200/600"
        alt="City skyline"
      />
    </Carousel>
  ),
};

/**
 * Auto-Play Carousel
 * Automatically cycles through slides
 */
export const AutoPlay: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">Carousel auto-plays every 3 seconds. Hover to pause.</p>
      <Carousel autoPlay interval={3000}>
        <CarouselImage
          src="https://picsum.photos/seed/auto1/1200/600"
          alt="Slide 1"
        />
        <CarouselImage
          src="https://picsum.photos/seed/auto2/1200/600"
          alt="Slide 2"
        />
        <CarouselImage
          src="https://picsum.photos/seed/auto3/1200/600"
          alt="Slide 3"
        />
        <CarouselImage
          src="https://picsum.photos/seed/auto4/1200/600"
          alt="Slide 4"
        />
      </Carousel>
    </div>
  ),
};

/**
 * Without Arrows
 * Carousel with only dot navigation
 */
export const WithoutArrows: Story = {
  render: () => (
    <Carousel showArrows={false}>
      <CarouselImage
        src="https://picsum.photos/seed/noarrow1/1200/600"
        alt="Slide 1"
      />
      <CarouselImage
        src="https://picsum.photos/seed/noarrow2/1200/600"
        alt="Slide 2"
      />
      <CarouselImage
        src="https://picsum.photos/seed/noarrow3/1200/600"
        alt="Slide 3"
      />
    </Carousel>
  ),
};

/**
 * Without Dots
 * Carousel with only arrow navigation
 */
export const WithoutDots: Story = {
  render: () => (
    <Carousel showDots={false}>
      <CarouselImage
        src="https://picsum.photos/seed/nodots1/1200/600"
        alt="Slide 1"
      />
      <CarouselImage
        src="https://picsum.photos/seed/nodots2/1200/600"
        alt="Slide 2"
      />
      <CarouselImage
        src="https://picsum.photos/seed/nodots3/1200/600"
        alt="Slide 3"
      />
    </Carousel>
  ),
};

/**
 * No Loop
 * Carousel that stops at first and last slide
 */
export const NoLoop: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">Arrows disappear at the first and last slides.</p>
      <Carousel loop={false}>
        <CarouselImage
          src="https://picsum.photos/seed/noloop1/1200/600"
          alt="First slide"
        />
        <CarouselImage
          src="https://picsum.photos/seed/noloop2/1200/600"
          alt="Middle slide"
        />
        <CarouselImage
          src="https://picsum.photos/seed/noloop3/1200/600"
          alt="Last slide"
        />
      </Carousel>
    </div>
  ),
};

/**
 * Hero Banner Carousel
 * Full-width hero carousel with content overlay
 */
export const HeroBanner: Story = {
  render: () => (
    <Carousel autoPlay interval={5000}>
      <CarouselSlide>
        <div className="relative">
          <CarouselImage
            src="https://picsum.photos/seed/hero1/1920/600"
            alt="Hero 1"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white space-y-4 px-4">
              <h1 className="text-4xl md:text-6xl font-bold">Welcome to Our Store</h1>
              <p className="text-xl">Discover amazing products</p>
              <Button size="lg" tw="bg-white text-gray-900 hover:bg-gray-100">
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </CarouselSlide>

      <CarouselSlide>
        <div className="relative">
          <CarouselImage
            src="https://picsum.photos/seed/hero2/1920/600"
            alt="Hero 2"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white space-y-4 px-4">
              <h1 className="text-4xl md:text-6xl font-bold">New Collection</h1>
              <p className="text-xl">Summer 2024 is here</p>
              <Button size="lg" tw="bg-white text-gray-900 hover:bg-gray-100">
                Explore
              </Button>
            </div>
          </div>
        </div>
      </CarouselSlide>

      <CarouselSlide>
        <div className="relative">
          <CarouselImage
            src="https://picsum.photos/seed/hero3/1920/600"
            alt="Hero 3"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white space-y-4 px-4">
              <h1 className="text-4xl md:text-6xl font-bold">Special Offer</h1>
              <p className="text-xl">Up to 50% off selected items</p>
              <Button size="lg" tw="bg-white text-gray-900 hover:bg-gray-100">
                View Deals
              </Button>
            </div>
          </div>
        </div>
      </CarouselSlide>
    </Carousel>
  ),
};

/**
 * Product Showcase
 * Carousel showcasing products with details
 */
export const ProductShowcase: Story = {
  render: () => {
    const products = [
      { name: 'Premium Headphones', price: '$299', image: 'product1' },
      { name: 'Wireless Speaker', price: '$199', image: 'product2' },
      { name: 'Smart Watch', price: '$399', image: 'product3' },
      { name: 'Laptop Stand', price: '$99', image: 'product4' },
    ];

    return (
      <Carousel autoPlay interval={4000}>
        {products.map((product, index) => (
          <CarouselSlide key={index}>
            <div className="grid md:grid-cols-2 gap-8 p-8 bg-gray-50">
              <CarouselImage
                src={`https://picsum.photos/seed/${product.image}/800/800`}
                alt={product.name}
                aspectRatio="square"
              />
              <div className="flex flex-col justify-center space-y-4">
                <Badge variant="primary">New Arrival</Badge>
                <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
                <p className="text-2xl text-brand-600 font-bold">{product.price}</p>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="flex gap-3">
                  <Button size="lg">Add to Cart</Button>
                  <Button size="lg" intent="secondary">Learn More</Button>
                </div>
              </div>
            </div>
          </CarouselSlide>
        ))}
      </Carousel>
    );
  },
};

/**
 * Testimonial Carousel
 * Customer testimonials carousel
 */
export const TestimonialCarousel: Story = {
  render: () => {
    const testimonials = [
      {
        quote: "This product changed my life! Highly recommend to everyone.",
        author: "Sarah Johnson",
        role: "Designer",
        avatar: "avatar1"
      },
      {
        quote: "Excellent quality and customer service. Will buy again!",
        author: "Mike Chen",
        role: "Developer",
        avatar: "avatar2"
      },
      {
        quote: "Best purchase I've made this year. Absolutely love it!",
        author: "Emily Davis",
        role: "Marketing Manager",
        avatar: "avatar3"
      },
    ];

    return (
      <Carousel autoPlay interval={5000} showArrows={false}>
        {testimonials.map((testimonial, index) => (
          <CarouselSlide key={index}>
            <div className="bg-white p-12 text-center max-w-3xl mx-auto">
              <div className="mb-6">
                <svg className="w-12 h-12 text-brand-600 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-xl text-gray-700 mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <img
                  src={`https://i.pravatar.cc/150?img=${index + 10}`}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full"
                />
                <div className="text-left">
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          </CarouselSlide>
        ))}
      </Carousel>
    );
  },
};

/**
 * Content Cards Carousel
 * Carousel with card-style content
 */
export const ContentCards: Story = {
  render: () => {
    const cards = [
      { title: 'Getting Started', image: 'content1', category: 'Tutorial' },
      { title: 'Advanced Techniques', image: 'content2', category: 'Guide' },
      { title: 'Best Practices', image: 'content3', category: 'Article' },
      { title: 'Case Studies', image: 'content4', category: 'Research' },
    ];

    return (
      <Carousel>
        {cards.map((card, index) => (
          <CarouselSlide key={index}>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto">
              <CarouselImage
                src={`https://picsum.photos/seed/${card.image}/1200/600`}
                alt={card.title}
                aspectRatio="video"
              />
              <div className="p-6">
                <Badge variant="primary" size="sm">{card.category}</Badge>
                <h3 className="text-2xl font-bold text-gray-900 mt-3">{card.title}</h3>
                <p className="text-gray-600 mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore.
                </p>
                <Button tw="mt-4">Read More</Button>
              </div>
            </div>
          </CarouselSlide>
        ))}
      </Carousel>
    );
  },
};

/**
 * Image Gallery Carousel
 * Simple image slideshow
 */
export const ImageGallery: Story = {
  render: () => (
    <Carousel autoPlay interval={3000} tw="max-w-4xl mx-auto">
      {Array.from({ length: 6 }, (_, i) => (
        <CarouselImage
          key={i}
          src={`https://picsum.photos/seed/gallery${i + 1}/1200/600`}
          alt={`Image ${i + 1}`}
        />
      ))}
    </Carousel>
  ),
};

/**
 * Square Aspect Ratio
 * Carousel with square images
 */
export const SquareAspect: Story = {
  render: () => (
    <Carousel tw="max-w-2xl mx-auto">
      {Array.from({ length: 4 }, (_, i) => (
        <CarouselImage
          key={i}
          src={`https://picsum.photos/seed/square${i + 1}/800/800`}
          alt={`Square ${i + 1}`}
          aspectRatio="square"
        />
      ))}
    </Carousel>
  ),
};

/**
 * Portrait Aspect Ratio
 * Carousel with portrait images
 */
export const PortraitAspect: Story = {
  render: () => (
    <Carousel tw="max-w-xl mx-auto">
      {Array.from({ length: 4 }, (_, i) => (
        <CarouselImage
          key={i}
          src={`https://picsum.photos/seed/portrait${i + 1}/600/800`}
          alt={`Portrait ${i + 1}`}
          aspectRatio="portrait"
        />
      ))}
    </Carousel>
  ),
};

/**
 * Multiple Carousels
 * Multiple carousels on the same page
 */
export const MultipleCarousels: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Featured Products</h3>
        <Carousel autoPlay interval={3000}>
          {Array.from({ length: 3 }, (_, i) => (
            <CarouselImage
              key={i}
              src={`https://picsum.photos/seed/featured${i + 1}/1200/400`}
              alt={`Featured ${i + 1}`}
              aspectRatio="video"
            />
          ))}
        </Carousel>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Customer Favorites</h3>
        <Carousel autoPlay interval={4000}>
          {Array.from({ length: 3 }, (_, i) => (
            <CarouselImage
              key={i}
              src={`https://picsum.photos/seed/favorite${i + 1}/1200/400`}
              alt={`Favorite ${i + 1}`}
              aspectRatio="video"
            />
          ))}
        </Carousel>
      </div>
    </div>
  ),
};
