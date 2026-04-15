import { FaInstagram } from 'react-icons/fa';

const instagramPosts = [
  {
    src: '/lovable-uploads/6fb5e738-39ab-438e-80aa-8c990abb3866.png',
    alt: 'Working at 813 Cafe with iced coffee',
    link: 'https://www.instagram.com/813.cafe/',
  },
  {
    src: '/lovable-uploads/f14be507-5ba4-4f71-87e4-c2943549abcf.png',
    alt: '813 Cafe interior coworking space',
    link: 'https://www.instagram.com/813.cafe/',
  },
  {
    src: '/lovable-uploads/e9b661e6-257a-4eac-afb1-3eb063488565.png',
    alt: 'Delicious food at 813 Cafe',
    link: 'https://www.instagram.com/813.cafe/',
  },
  {
    src: '/lovable-uploads/514cf0cc-81f4-402d-9b01-74c48c4bf1ca.png',
    alt: '813 Cafe brand and community',
    link: 'https://www.instagram.com/813.cafe/',
  },
  {
    src: '/lovable-uploads/b5915cf5-79c3-44c9-8158-de5a8d709a90.png',
    alt: 'Eight Thirteen Cafe logo and ambiance',
    link: 'https://www.instagram.com/813.cafe/',
  },
  {
    src: '/lovable-uploads/33fb7cc1-5128-4c8c-a81f-9658f1523f1a.png',
    alt: '813 Cafe moments',
    link: 'https://www.instagram.com/813.cafe/',
  },
];

const InstagramFeed = () => {
  return (
    <section className="bg-background">
      {/* Header */}
      <div className="text-center py-16 px-6">
        <a
          href="https://www.instagram.com/813.cafe/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 group"
        >
          <FaInstagram className="w-6 h-6 text-foreground group-hover:text-muted-foreground transition-colors" />
          <span className="text-xs tracking-[0.3em] uppercase font-medium text-foreground group-hover:text-muted-foreground transition-colors">
            Follow @813.cafe
          </span>
        </a>
      </div>

      {/* Full-width image grid — edge to edge */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {instagramPosts.map((post, i) => (
          <a
            key={i}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="aspect-square overflow-hidden relative group"
          >
            <img
              src={post.src}
              alt={post.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-all duration-300 flex items-center justify-center">
              <FaInstagram className="w-8 h-8 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default InstagramFeed;
