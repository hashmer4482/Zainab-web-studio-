import { ServiceItem, PortfolioProject, Testimonial, FAQItem } from '../types';

export const AGENCY_SERVICES: ServiceItem[] = [
  {
    id: 'seo',
    title: 'Search Engine Optimization (SEO)',
    shortDesc: 'Get organic, high-converting traffic to Google’s top rankings.',
    fullDesc: 'We optimize your website’s technical foundation, content architecture, and authority backlink profile to secure sustainable #1 rankings on Google and capture high-intent buyers.',
    iconName: 'Search',
    badge: 'High ROI',
    features: [
      'Technical SEO & Core Web Vitals Optimization',
      'High-Intent Keyword & Topic Cluster Strategy',
      'On-Page Optimization & Schema Markup',
      'Authority Backlink Building & Digital PR'
    ],
    deliverables: [
      'Monthly Ranking & Organic Growth Reports',
      'Comprehensive Technical SEO Health Audit',
      'Keyword Mapping & Content Calendar',
      'Competitor Keyword Gap Analysis'
    ],
    platforms: ['Google Search', 'Google Search Console', 'Ahrefs', 'Semrush'],
    impactMetric: 'Average 285% Increase in Organic Traffic',
    basePrice: 850
  },
  {
    id: 'smm',
    title: 'Social Media Marketing (SMM)',
    shortDesc: 'Increase engagement and brand awareness on Facebook, Instagram, and LinkedIn.',
    fullDesc: 'Build a passionate online community and boost brand authority. We engineer custom content strategies, interactive reels, and targeted multi-platform campaigns that turn casual scrollers into brand advocates.',
    iconName: 'Share2',
    badge: 'Popular',
    features: [
      'Custom Branded Content & Carousel Design',
      'Short-Form Video Reels & Story Campaigns',
      'Community Management & Organic Outreach',
      'LinkedIn Thought Leadership Strategy'
    ],
    deliverables: [
      'Monthly Content Calendar (16+ Posts/Reels)',
      'Custom Branded Asset Kit & Story Templates',
      'Audience Demographics & Growth Analytics',
      'Direct Message Lead Qualification Scripts'
    ],
    platforms: ['Facebook', 'Instagram', 'LinkedIn', 'TikTok'],
    impactMetric: '3.8x High-Engagement Community Growth',
    basePrice: 750
  },  {
    id: 'web-design',
    title: 'Website Design & Optimization',
    shortDesc: 'Custom web development, sleek responsive design, high performance & conversion optimization.',
    fullDesc: 'We craft high-converting, lightning-fast custom websites that captivate visitors immediately. Engineered with ultra-responsive UX, elegant visual typography, and frictionless lead conversion funnels.',
    iconName: 'Layout',
    badge: 'Core Service',
    features: [
      'Custom Full-Stack Web Development & Design',
      'Mobile-First Responsive Layout Architecture',
      'Sub-Second Page Load Speed Acceleration',
      'Conversion Rate Optimization (CRO) & CTA Heatmaps'
    ],
    deliverables: [
      'Complete Custom Developed Website',
      'Interactive Lead capture & Booking Funnels',
      'SEO-Optimized Speed & Asset Compression',
      'Full Content Management & Analytics Integration'
    ],
    platforms: ['React / Vite', 'Tailwind CSS', 'WordPress', 'Shopify', 'Node.js'],
    impactMetric: '99/100 Mobile Speed & +240% Lead Conversion',
    basePrice: 1200
  },
  {
    id: 'ppc',
    title: 'Pay-Per-Click (PPC) Advertising',
    shortDesc: 'Generate instant leads and sales through Google Ads and Meta Ads.',
    fullDesc: 'Stop wasting ad spend. We launch laser-targeted Google Search Ads and Meta Paid Social campaigns engineered for maximum Return On Ad Spend (ROAS) and predictable client lead pipelines.',
    iconName: 'Target',
    badge: 'Instant Results',
    features: [
      'Google Search, Display & Shopping Ad Campaigns',
      'Meta (Facebook & Instagram) Retargeting Funnels',
      'Custom Conversion Landing Page Creation',
      'A/B Creative & Audience Copy Testing'
    ],
    deliverables: [
      'Real-Time Live PPC Performance Dashboard',
      'A/B Tested High-Converting Ad Copy & Visuals',
      'Pixel Tracking & Conversion Setup',
      'Weekly ROAS & Lead Cost Optimization'
    ],
    platforms: ['Google Ads', 'Meta Ads Manager', 'Instagram Ads', 'LinkedIn Ads'],
    impactMetric: '4.2x Average Return On Ad Spend (ROAS)',
    basePrice: 950
  },
  {
    id: 'content',
    title: 'Content Creation & Copywriting',
    shortDesc: 'Content that engages and keeps your target audience engaged.',
    fullDesc: 'Words that sell and stories that connect. We craft persuasive website copy, high-converting ad scripts, email marketing sequences, and thought-leadership articles tailored to your ideal customer.',
    iconName: 'PenTool',
    badge: 'High Conversion',
    features: [
      'High-Converting Landing Page & Website Copy',
      'Persuasive Ad Copy for Meta & Google',
      'In-Depth SEO Blog Articles & E-books',
      'Automated Email Welcome & Nurture Flows'
    ],
    deliverables: [
      'Brand Voice & Style Messaging Guide',
      'Monthly High-Intent Blog Content Package',
      'Ad Creative Copy Scripts (Variations)',
      'Email Sales Sequence Workflows'
    ],
    platforms: ['Email Automation', 'Medium', 'WordPress', 'Substack'],
    impactMetric: '+190% Email Open & Click-Through Rate',
    basePrice: 600
  },
  {
    id: 'video',
    title: 'Canva Ads & Video Making',
    shortDesc: 'High-converting social media ads, promos, and video content for Facebook, Instagram, and LinkedIn.',
    fullDesc: 'Capture attention in 3 seconds. We design eye-catching graphic ads, dynamic animated promos, and high-converting video ads using Canva Pro & professional video suite tools tailored for social feeds.',
    iconName: 'Video',
    badge: 'Creative Visuals',
    features: [
      'Custom Canva Pro Animated Social Banners',
      'High-Energy Product Showcase Promos',
      'Vertical Video Reels & TikTok/IG Ads',
      'Brand Visual Template Libraries'
    ],
    deliverables: [
      'Package of 10+ High-Res Ad Creatives',
      'Raw Canva Editable Template Files',
      '30s Motion Graphic Promo Videos',
      'Multi-Ratio Formats (1:1, 9:16, 16:9)'
    ],
    platforms: ['Canva Pro', 'CapCut Pro', 'Adobe After Effects', 'Figma'],
    impactMetric: '+310% Video View Retention & Click Rate',
    basePrice: 650
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: '1',
    title: 'E-Commerce Organic Scaling & Web Redesign',
    client: 'LuxeLiving Home Decor',
    industry: 'E-Commerce & Retail',
    serviceCategory: 'SEO',
    keyMetricLabel: 'Organic Revenue',
    keyMetricValue: '+340%',
    summary: 'Complete custom website rebuild with high-converting speed, followed by technical SEO and targeted Google Shopping campaigns.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    tags: ['Web Design', 'SEO', 'Google Shopping'],
    challenge: 'High bounce rate on slow legacy website with zero organic Google rankings.',
    solution: 'Designed a sub-second React storefront, structured schema markup, and scaled high-intent keyword pages.',
    testimonial: {
      quote: 'Zainab Web Studio completely transformed our online presence. Our organic traffic and sales hit record highs within 4 months!',
      author: 'Ayesha Rahman',
      role: 'Founder & CEO, LuxeLiving'
    }
  },
  {
    id: '2',
    title: 'Multi-Channel Meta & Google Ads Funnel',
    client: 'Apex SaaS Solutions',
    industry: 'B2B Software',
    serviceCategory: 'PPC',
    keyMetricLabel: 'Average ROAS',
    keyMetricValue: '4.8x ROAS',
    summary: 'Designed high-converting PPC landing pages and hyper-targeted Google Search & Meta retargeting video ads.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    tags: ['PPC Ads', 'Canva Video Ads', 'CRO'],
    challenge: 'High cost-per-lead ($120/lead) on generic ad campaigns with poor conversion rates.',
    solution: 'Built dedicated conversion landing pages and high-impact Canva video ads targeting decision makers on LinkedIn and Facebook.',
    testimonial: {
      quote: 'Our cost per lead dropped by 62% while lead volume tripled. The ROI from Zainab Web Studio is unmatched.',
      author: 'Tariq Mahmood',
      role: 'Growth Director, Apex SaaS'
    }
  },
  {
    id: '3',
    title: 'Social Media Growth & Brand Authority Campaign',
    client: 'Nourish Organic Skincare',
    industry: 'Health & Beauty',
    serviceCategory: 'SMM',
    keyMetricLabel: 'Engagement Rate',
    keyMetricValue: '12,500+',
    summary: 'Executed custom Canva video reels, Instagram aesthetic branding, and influencer collaboration workflows.',
    imageUrl: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80',
    tags: ['SMM', 'Canva Ads', 'Copywriting'],
    challenge: 'Inconsistent visual identity and stagnant social follower engagement across Instagram and Facebook.',
    solution: 'Created a cohesive aesthetic color theme, weekly interactive reels, and automated messenger lead flows.',
    testimonial: {
      quote: 'Every post looks stunning and professional! Our inbox is now flooded daily with enthusiastic customer inquiries.',
      author: 'Zara Khan',
      role: 'Brand Manager, Nourish Skincare'
    }
  },
  {
    id: '4',
    title: 'Custom Corporate Web Studio & Content Engine',
    client: 'Vanguard Legal & Financial',
    industry: 'Professional Services',
    serviceCategory: 'Web Design',
    keyMetricLabel: 'Inbound Consultations',
    keyMetricValue: '+210%',
    summary: 'Crafted a sleek, high-trust corporate web studio platform with integrated appointment booking and SEO content portal.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    tags: ['Web Design', 'Content Creation', 'SEO'],
    challenge: 'Outdated website failed to build trust with corporate clients looking for premium legal services.',
    solution: 'Built an elegant dark-luxury responsive portal with high-converting client discovery forms and SEO guides.',
    testimonial: {
      quote: 'The team at Zainab Web Studio understood our luxury brand positioning instantly. The new site brings in top-tier clients weekly.',
      author: 'Haris Vance',
      role: 'Managing Partner, Vanguard'
    }
  }
];

export const AGENCY_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Farooq',
    role: 'Founder',
    company: 'Silk & Stone Boutique',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    quote: 'Zainab Web Studio took our store from zero online visibility to ranking #1 on Google for our top 5 revenue keywords. Our revenue expanded 3x in 6 months.',
    metric: '+320% Revenue',
    serviceUsed: 'SEO & Web Design',
    rating: 5
  },
  {
    id: 't2',
    name: 'Bilal Ahmed',
    role: 'Marketing Head',
    company: 'Horizon Real Estate',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    quote: 'The Meta ad creatives and video ads designed by Zainab Web Studio generated over 150 qualified buyer leads in our very first month running PPC.',
    metric: '150+ Buyer Leads',
    serviceUsed: 'PPC & Video Ads',
    rating: 5
  },
  {
    id: 't3',
    name: 'Dr. Mariam Siddiqui',
    role: 'Clinic Director',
    company: 'Aesthetic Dental Studio',
    avatar: 'https://images.unsplash.com/photo-1594824813566-88855ce78347?auto=format&fit=crop&w=200&q=80',
    quote: 'Our new custom website built by Zainab Web Studio looks world-class! Patient online bookings increased dramatically right after launch.',
    metric: '+180% Bookings',
    serviceUsed: 'Website Design',
    rating: 5
  }
];

export const AGENCY_FAQS: FAQItem[] = [
  {
    id: 'f1',
    question: 'What makes Zainab Web Studio different from other digital marketing agencies?',
    answer: 'We focus strictly on measurable growth, ROI, and seamless execution. Instead of vanity metrics, we align custom web development, SEO, PPC ads, and social media directly with your bottom-line sales and lead generation.',
    category: 'General'
  },
  {
    id: 'f2',
    question: 'How long does a custom website design project take?',
    answer: 'Most custom website development projects take between 2 to 4 weeks depending on feature requirements. We build fast, responsive, SEO-ready platforms with continuous feedback rounds.',
    category: 'Services'
  },
  {
    id: 'f3',
    question: 'How quickly will I see results from Search Engine Optimization (SEO)?',
    answer: 'While technical SEO improvements show immediate performance gains, organic keyword ranking growth typically accelerates significantly within 60 to 90 days. For instant leads, we combine SEO with PPC advertising.',
    category: 'Services'
  },
  {
    id: 'f4',
    question: 'Do you create custom Canva ads and promotional videos for SMM campaigns?',
    answer: 'Yes! Our dedicated creative unit produces high-converting Canva ads, animated story templates, and vertical promotional video reels optimized specifically for Facebook, Instagram, and LinkedIn.',
    category: 'Services'
  },
  {
    id: 'f5',
    question: 'How do I discuss pricing and get a custom proposal for my project?',
    answer: 'Every business has unique growth targets. Contact us via WhatsApp (+92 332 4357459) or Email (shakeelammar59@gmail.com) to discuss your project scope and receive a custom strategy proposal.',
    category: 'Pricing'
  }
];

export const AGENCY_STATS = [
  { value: '150+', label: 'Websites Built & Scaled', icon: 'Globe' },
  { value: '$4.8M+', label: 'Client Revenue Generated', icon: 'TrendingUp' },
  { value: '98.5%', label: 'Client Satisfaction & Retention', icon: 'Users' },
  { value: '4.5x', label: 'Average Campaign ROAS', icon: 'Zap' }
];
