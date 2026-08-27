/* ============================================================
   DATA PROJECT — satu sumber untuk halaman Projects & ProjectDetail
   Ganti isinya dengan project aslimu.
   ============================================================ */

export const projects = [
    {
        slug: 'toga-pedia',
        tag: 'Web Development',
        title: 'Toga-Pedia',
        description:
            'A web-based encyclopedia and decision support system that recommends the best medicinal plants (TOGA).',
        image: '/Projects/TogaPed/TogaPed-1.png',

        // ---- Detail tambahan untuk halaman detail ----
        year: '2026',
        role: 'Fullstack Developer',
        scale: 'Individual',
        overview:
            'Toga-Pedia is my final-year project, an interactive platform that combines a digital encyclopedia of Indonesian medicinal plants (TOGA) with a decision support system. Users answer six questions about land size, care time, harvest target, processing preference, economic purpose, and health complaints, and the backend ranks 41 plants using a combination of SAW and TOPSIS to return the top 3 recommendations. Built with React and Flask on top of PostgreSQL, it also includes a full admin panel for managing plants, categories, cultivation guides, and the criteria weights that drive the recommendation engine.',
        tech: ['React', 'Vite', 'Tailwind CSS', 'Flask', 'PostgreSQL', 'Framer Motion', 'Axios'],
        features: [
            'Top 3 plant recommendations using SAW and TOPSIS multi-criteria decision making.',
            'Plant catalog with benefits, cultivation, and processing guides.',
            'Search by plant name or health complaint.',
            'Built-in chatbot assistant for quick questions.',
            'Protected admin dashboard with data summary and visitor feedback.',
            'Full CRUD management for plants, categories, criteria, and sub-criteria.',
        ],
        gallery: [
            '/Projects/TogaPed/TogaPed-1.png',
            '/Projects/TogaPed/TogaPed-2.png',
            '/Projects/TogaPed/TogaPed-3.png',
        ],
        links: {
            source: 'https://github.com/Rel28/toga-app.git',
        },
    },
    {
        slug: 'OTRA',
        tag: 'UI/UX Design',
        title: 'OTRA',
        description: 'A mobile app design that gives surplus food and second-hand goods a second chance',
        image: '/Projects/OTRA/OTRA-1.png',
        year: '2025',
        role: 'UI/UX Designer',
        scale: 'Team of 4',
        overview:
            'OTRA (Online Tracking for the Recycled App) is a mobile app concept designed to reduce waste by giving surplus food and still-usable items a second life. Built through the full Design Thinking process, the project started with pain-point analysis of existing marketplace apps, then moved through user personas, How Might We framing, Crazy 8s, and affinity mapping before wireframing and high-fidelity prototyping in Figma. I helped build the design system, including the color palette, typography, button and form states, and designed key flows such as onboarding, product discovery, cart and checkout, order tracking, and driver chat. The prototype was validated through task-based usability testing with a 100% success rate and a System Usability Scale score of 80.83 from 30 respondents.',
        tech: ['Figma', 'Maze', 'SPSS'],
        features: [
            'Complete UI kit with color palette, typography, icons, and component states.',
            'Product discovery with category filters, sorting, and nearby-seller map.',
            'Flash sale and personalized recommendations to move near-expiry items.',
            'Cart, checkout, and real-time order status with driver chat.',
            'Q&A between buyer and seller directly on the product page.',
        ],
        gallery: ['/Projects/OTRA/OTRA-1.png', '/Projects/OTRA/OTRA-2.png', '/Projects/OTRA/OTRA-3.png'],
        links: {
            demo: 'https://www.figma.com/design/NJtFfaogtJYEeqhP3DJYmw/OTRA?node-id=140-388&t=7P5fxquT6CWcnEAo-1',
        },
    },
    {
    slug: 'mango-ripeness-classifier',
    tag: 'Machine Learning',
    title: 'Mango Ripeness Classifier',
    description:
        'A CNN model with EfficientNetB0 transfer learning that classifies Arumanis mango ripeness from images into three stages.',
    image: '/Projects/MangoClassifier/MangoClassifier-1.png',

    year: '2025',
    role: 'Machine Learning Engineer',
    scale: 'Team of 4',
    overview:
        'Farmers and distributors still judge mango ripeness by eye, which is inconsistent and can lead to rejected harvests or unsellable fruit. For this Deep Learning course project, our team built an image classifier that sorts Arumanis mangoes into three classes: unripe, ripe, and overripe. I worked on the data and modeling side in Google Colab, from collecting and labeling 837 images across Kaggle and Roboflow datasets, background removal with rembg, augmentation, and building a two-stage transfer learning pipeline on EfficientNetB0 (feature extraction, then fine-tuning with early stopping). The model reached 88.9% validation accuracy with an average F1-score of 0.886, and was later wrapped by the team into a Streamlit web app for image upload and prediction.',
    tech: ['Python', 'TensorFlow', 'Keras', 'EfficientNetB0', 'rembg', 'Google Colab'],
    features: [
        'Three-class ripeness classification: unripe, ripe, and overripe.',
        'Transfer learning on ImageNet-pretrained EfficientNetB0 with a custom classification head.',
        'Two-stage training: frozen feature extraction, then fine-tuning with early stopping.',
        'Preprocessing pipeline with background removal, 224×224 resizing, and augmentation.',
        'Optimized tf.data pipeline with caching and prefetching.',
        '88.9% validation accuracy, evaluated with confusion matrix and per-class precision/recall.',
    ],
    gallery: [
        '/Projects/MangoClassifier/MangoClassifier-1.png',
        '/Projects/MangoClassifier/MangoClassifier-2.png',
    ],
    links: {
        source: 'https://github.com/Rel28/DataScience-MachineLearning/blob/cbb6d83062cb71a71fb2953ab7423a3518a228e9/MangoClassifier.ipynb',
        demo: 'https://colab.research.google.com/drive/1Mf2KWgGLLLvZVZs3-qgPT__yr-uO2aUR?usp=sharing', // link Colab notebook atau repo GitHub
    },
},
    {
    slug: 'bali-explore',
    tag: 'Frontend',
    title: 'Wander Whisper', // ganti dengan nama asli projeknya
    description:
        'My first responsive frontend project: a Bali tourism website for browsing destinations, built with Tailwind CSS.',
    image: '/Projects/WanderWhisper/WanderWhisper-1.png',

    year: '2024', // sesuaikan
    role: 'Frontend Developer',
    scale: 'Individual', // sesuaikan
    overview:
        'This is the project where I first learned to build a responsive website and my first time using Tailwind CSS. It is a tourism website for exploring destinations in Bali, with a home page, an explore page, and detail pages for each destination showing its description, location, entry price, opening hours, and a photo gallery. I focused on making every page adapt cleanly from mobile to desktop, using Tailwind\'s responsive utilities and a mobile hamburger menu. Looking back, it is the project that made me comfortable with utility-first styling and layout thinking, which I still use in every frontend project today.',
    tech: ['HTML', 'Tailwind CSS', 'JavaScript'],
    features: [
        'Fully responsive layout for mobile, tablet, and desktop.',
        'Destination detail page with description, location, price, contact, and hours.',
        'Photo gallery page for each destination.',
        'Hamburger navigation menu on mobile.',
        'Hero sections with image overlay and Google Maps link.',
    ],
    gallery: [
        '/Projects/WanderWhisper/WanderWhisper-1.png',
        '/Projects/WanderWhisper/WanderWhisper-2.png',
    ],
    links: {
        source: 'https://github.com/Rel28/Pariwisata.git', // link GitHub
    },
},
]

// Kategori diambil otomatis dari data
export const categories = ['All', ...new Set(projects.map((p) => p.tag))]

// Helper untuk halaman detail
export const getProjectBySlug = (slug) =>
    projects.find((p) => p.slug === slug)
