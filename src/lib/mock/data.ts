import { User, Author, Book, Chapter, Activity, AppNotification, Comment, WriterAnalytics } from '../../types';

export const CURRENT_USER: User = {
  id: 'usr_me',
  name: 'Alexander Vance',
  username: 'alexvance',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
  bio: 'Fantasy author, avid fiction reader, and dark academia enthusiast. Writing the Aethelgard Saga.',
  followerCount: 3420,
  followingCount: 184,
  isVerified: true,
  joinedDate: '2024-03-15',
};

export const MOCK_AUTHORS: Author[] = [
  {
    id: 'auth_1',
    name: 'Elena Rostova',
    username: 'elena_rostova',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    bio: 'Bestselling author of epic fantasy & high-stakes romance. Coffee lover and mythology researcher.',
    followerCount: 28400,
    followingCount: 92,
    isFollowing: true,
    isVerified: true,
    totalBooks: 4,
    totalReads: 1420000,
    featuredGenres: ['Fantasy', 'Romance', 'Mythology'],
  },
  {
    id: 'auth_2',
    name: 'Marcus Sterling',
    username: 'msterling_sci',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    bio: 'Cyberpunk & hard Sci-Fi writer exploring the intersection of AI, human conscience, and deep space.',
    followerCount: 15200,
    followingCount: 210,
    isFollowing: false,
    isVerified: true,
    totalBooks: 3,
    totalReads: 890000,
    featuredGenres: ['Sci-Fi', 'Cyberpunk', 'Thriller'],
  },
  {
    id: 'auth_3',
    name: 'Sophia Thorne',
    username: 'sophiathorne',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300',
    bio: 'Mystery novelist, former forensic psychologist. Telling stories of dark secrets in quiet towns.',
    followerCount: 9800,
    followingCount: 145,
    isFollowing: true,
    isVerified: false,
    totalBooks: 2,
    totalReads: 540000,
    featuredGenres: ['Mystery', 'Psychological Thriller', 'Crime'],
  },
];

export const MOCK_BOOKS: Book[] = [
  {
    id: 'book_1',
    title: 'The Glass Whisperer',
    tagline: 'In a kingdom where silence is deadly, her voice shatters stone.',
    description: 'Lysandra was born in the obsidian city of Val-Varna, where speaking aloud is punishable by exile. But when the High Arcanist uncovers her ancient ability to shape raw glass with spoken incantations, she becomes the crown\'s most dangerous weapon — or its inevitable downfall.',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600',
    author: MOCK_AUTHORS[0],
    genres: ['Fantasy', 'Magic', 'Adventure', 'YA'],
    rating: 4.8,
    readsCount: 482000,
    likesCount: 39400,
    commentsCount: 2840,
    totalChapters: 24,
    publishedChaptersCount: 18,
    status: 'ongoing',
    createdAt: '2025-11-01',
    updatedAt: '2026-08-25',
    isSaved: true,
    userProgress: {
      currentChapterId: 'chap_1_3',
      currentChapterNumber: 3,
      percentage: 65,
      lastReadAt: '2026-08-26T18:30:00Z',
    },
  },
  {
    id: 'book_2',
    title: 'The Algorithm of Fate',
    tagline: 'When code dictates destiny, one human defect changes everything.',
    description: 'In Neo-Geneva, 2098, the Zenith System predicts every citizen\'s career, life partner, and date of death down to the second. Kaelen, a junior system debugger, stumbles upon a deleted branch containing his own execution order — dated three days from now.',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
    author: MOCK_AUTHORS[1],
    genres: ['Sci-Fi', 'Cyberpunk', 'Dystopian'],
    rating: 4.7,
    readsCount: 310000,
    likesCount: 28100,
    commentsCount: 1950,
    totalChapters: 30,
    publishedChaptersCount: 30,
    status: 'completed',
    createdAt: '2025-06-12',
    updatedAt: '2026-04-10',
    isSaved: false,
  },
  {
    id: 'book_3',
    title: 'Whispers at Willow Creek',
    tagline: 'Some family inheritances are buried five feet under.',
    description: 'When investigative historian Clara Vance inherits her estranged grandmother\'s Victorian estate in rural Vermont, she expects dust and antique furniture. Instead, she finds a locked cellar full of sealed letters detailing unsolved disappearances spanning fifty years.',
    coverImage: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&q=80&w=600',
    author: MOCK_AUTHORS[2],
    genres: ['Mystery', 'Thriller', 'Horror'],
    rating: 4.6,
    readsCount: 195000,
    likesCount: 16400,
    commentsCount: 1120,
    totalChapters: 20,
    publishedChaptersCount: 14,
    status: 'ongoing',
    createdAt: '2026-01-15',
    updatedAt: '2026-08-20',
    isSaved: true,
    userProgress: {
      currentChapterId: 'chap_3_1',
      currentChapterNumber: 1,
      percentage: 20,
      lastReadAt: '2026-08-24T12:00:00Z',
    },
  },
  {
    id: 'book_4',
    title: 'Starlight & Ashes',
    tagline: 'Two shattered kingdoms. One forbidden covenant.',
    description: 'Prince Julian of Aethelgard and Commander Vesper of the Sunken Isles were trained to slay each other on sight. But when an ancient shadow consumes their borderlands, survival demands an alliance that could ignite a continent-wide rebellion.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600',
    author: CURRENT_USER,
    genres: ['High Fantasy', 'Romance', 'Epic'],
    rating: 4.9,
    readsCount: 88500,
    likesCount: 9200,
    commentsCount: 780,
    totalChapters: 16,
    publishedChaptersCount: 12,
    status: 'ongoing',
    createdAt: '2026-02-10',
    updatedAt: '2026-08-27',
    isSaved: false,
  },
];

export const MOCK_CHAPTERS: Record<string, Chapter[]> = {
  book_1: [
    {
      id: 'chap_1_1',
      bookId: 'book_1',
      chapterNumber: 1,
      title: 'Chapter 1 — The Sound of Shattered Silence',
      wordCount: 2450,
      publishedAt: '2025-11-01',
      likesCount: 3120,
      commentsCount: 420,
      content: `The fog over Val-Varna tasted like iron and cold seawater.

Lysandra leaned against the damp granite balustrade of the Grand Viaduct, her fingertips tracing the faint, crystalline hairline fracture in the baluster. Down in the Low Ring, thousands of chimneys breathed black ribbons into the dusk, but no voices rose to meet them.

In the City of Glass, sound was a currency spent only by the Crown.

"Keep your veil drawn, child," whispered Master Corvus without turning his head. He adjusted his heavy velvet mantle, the silver embroidery of the Arcanum winking beneath the streetlamps. "The Warden patrol passes every quarter bell. If they catch your lips moving, even in prayer, you will be in the obsidian cells before dawn."

Lysandra pressed her teeth into her lower lip until the metallic tang of blood bloomed on her tongue. She didn't need to speak to feel the vibration. Deep within the stones beneath her boots, the ancient silicate ley lines hummed like trapped bees.

She closed her eyes and inhaled slowly. The air was thick with the scent of melted sand and forgotten prayers. When she exhaled, she did not utter a word. Instead, she pushed her thought into the micro-fissure in the balustrade.

*Rise.*

The fracture gasped. For a fraction of a second, a blade of luminescent ice-blue glass shot upward from the stone, reflecting the silver moon before collapsing back into fine dust.

Master Corvus spun around, his knuckles going white on his polished oak cane. "What did I tell you?" he hissed, his eyes darting frantically toward the watchtowers hovering over the harbor.

"I didn't speak," Lysandra murmured beneath her veil.

"You don't have to," Corvus whispered fiercely, grabbing her shoulder. "The glass remembers."`,
    },
    {
      id: 'chap_1_2',
      bookId: 'book_1',
      chapterNumber: 2,
      title: 'Chapter 2 — The Arcanum Vaults',
      wordCount: 2890,
      publishedAt: '2025-11-08',
      likesCount: 2890,
      commentsCount: 310,
      content: `The descent into the Great Vaults was measured in three hundred steps of spiral obsidian stairs.

Lysandra kept her gaze on the heels of Master Corvus's boots. With every ten steps downward, the temperature plummeted by five degrees, until her breath bloomed in faint white clouds against the darkness.

"Below the three-hundredth step," Corvus instructed softly, his voice muffled by his thick wool neckpiece, "the Crown's law does not apply. Here, we do not silence the world. We preserve its echo."

They reached a massive iron door reinforced with bands of cold-tempered bronze. Corvus pressed his signet ring into a recessed crest. A series of heavy brass tumblers clicked into place inside the stone walls like clockwork armor.

Beyond lay an infinite corridor lined with illuminated glass columns. Inside each column floated a memory — swirling vapors of amber, violet, and cobalt light.

"These are the Lost Sermons," Corvus said, stopping before a column containing a violent tempest of red light. "Recorded before the Silence. When human voices could sunder mountains and command the tides."

Lysandra reached out a gloved hand. As her fingertips hovered an inch from the surface of the glass, the red light surged forward, forming the silhouette of an ancient warrior crying out in silent defiance.`,
    },
    {
      id: 'chap_1_3',
      bookId: 'book_1',
      chapterNumber: 3,
      title: 'Chapter 3 — The Spark in the Dark',
      wordCount: 3100,
      publishedAt: '2025-11-15',
      likesCount: 3450,
      commentsCount: 480,
      content: `Night fell hard over the High District, casting long, razor-sharp shadows across the marble courtyards.

Lysandra sat at the small writing desk in her chamber, a single tallow candle sputtering beside a stack of forbidden manuscripts. Her fingers were stained with indigo ink from transcribing the ancient runes Corvus had shown her in the Vaults.

A sudden tap on the stained-glass window made her jump.

She froze, covering the parchment with a sheet of blank vellum. Another knock echoed softly — rhythmic, deliberate. Three fast taps, followed by two slow ones.

The signal of the Whispering Resistance.

She stood slowly, slipping her silver-handled stylus into her sleeve. As she unlatched the heavy brass latch of the balcony window, the icy sea breeze swept into the room, threatening to extinguish the candle flame.

Standing on the narrow stone ledge three stories above the courtyard was a tall figure cloaked in dark grey wool. Beneath his hood, bright hazel eyes gleamed with cautious amusement.

"You're late, Rowan," Lysandra whispered, letting him slip inside.

"The Warden guards doubled their patrol along the harbor wall," Rowan replied, pulling back his hood to reveal messy amber hair and a sharp jawline marked by a faint scar. "The High Arcanist knows someone opened a vault column tonight."

Lysandra's heart skipped a beat. "They suspect Corvus?"

"No," Rowan said, stepping closer until she could smell the cold mountain rain on his cloak. "They suspect a prodigy."`,
    },
  ],
};

export const MOCK_FEED_ACTIVITIES: Activity[] = [
  {
    id: 'act_1',
    user: MOCK_AUTHORS[0],
    type: 'publish_chapter',
    book: MOCK_BOOKS[0],
    chapter: {
      id: 'chap_1_3',
      chapterNumber: 3,
      title: 'Chapter 3 — The Spark in the Dark',
    },
    timestamp: '2 hours ago',
    likesCount: 124,
    commentsCount: 31,
    userLiked: true,
  },
  {
    id: 'act_2',
    user: MOCK_AUTHORS[1],
    type: 'publish_book',
    book: MOCK_BOOKS[1],
    timestamp: '5 hours ago',
    likesCount: 450,
    commentsCount: 89,
    userLiked: false,
  },
  {
    id: 'act_3',
    user: {
      id: 'usr_reader1',
      name: 'Maya Lin',
      username: 'mayareads',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
      followerCount: 420,
      followingCount: 180,
    },
    type: 'comment',
    book: MOCK_BOOKS[0],
    commentText: 'Lysandra and Rowan\'s tension in Chapter 3 is absolutely unmatched! Elena Rostova has done it again.',
    timestamp: '1 day ago',
    likesCount: 42,
    commentsCount: 8,
    userLiked: true,
  },
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 'cmt_1',
    author: {
      id: 'usr_reader2',
      name: 'Julian Vance',
      username: 'julianvance',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
      followerCount: 230,
      followingCount: 95,
    },
    content: 'The world-building in this chapter blew me away! The concept of silica ley lines humming under stone is so uniquely visceral.',
    createdAt: '3 hours ago',
    likesCount: 28,
    userLiked: true,
    replies: [
      {
        id: 'reply_1',
        author: MOCK_AUTHORS[0],
        content: 'Thank you Julian! Wait until you see what happens when Lysandra reaches the Grand Spire in Chapter 5!',
        createdAt: '2 hours ago',
        likesCount: 19,
        userLiked: false,
      },
    ],
  },
  {
    id: 'cmt_2',
    author: {
      id: 'usr_reader3',
      name: 'Claire Bennett',
      username: 'claire_b',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300',
      followerCount: 540,
      followingCount: 210,
    },
    content: 'I need Chapter 4 immediately! You can\'t just leave us hanging right as Rowan shows up on the balcony!',
    createdAt: '5 hours ago',
    likesCount: 45,
    userLiked: false,
  },
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    type: 'publish',
    sender: MOCK_AUTHORS[0],
    targetBook: {
      id: 'book_1',
      title: 'The Glass Whisperer',
      coverImage: MOCK_BOOKS[0].coverImage,
    },
    targetChapter: {
      id: 'chap_1_3',
      chapterNumber: 3,
      title: 'Chapter 3 — The Spark in the Dark',
    },
    text: 'published a new chapter: Chapter 3 — The Spark in the Dark',
    createdAt: '2h ago',
    read: false,
  },
  {
    id: 'notif_2',
    type: 'follow',
    sender: MOCK_AUTHORS[2],
    text: 'started following your author profile.',
    createdAt: '5h ago',
    read: false,
  },
  {
    id: 'notif_3',
    type: 'comment',
    sender: {
      id: 'usr_reader2',
      name: 'Julian Vance',
      username: 'julianvance',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
      followerCount: 230,
      followingCount: 95,
    },
    targetBook: {
      id: 'book_4',
      title: 'Starlight & Ashes',
      coverImage: MOCK_BOOKS[3].coverImage,
    },
    text: 'commented on your book Starlight & Ashes: "Phenomenal prologue!"',
    createdAt: '1d ago',
    read: true,
  },
];

export const MOCK_WRITER_ANALYTICS: WriterAnalytics = {
  totalReads: 88500,
  totalLikes: 9200,
  totalFollowers: 3420,
  totalEarnings: '$1,240.50',
  monthlyReads: [
    { month: 'Mar', reads: 4200 },
    { month: 'Apr', reads: 7800 },
    { month: 'May', reads: 12400 },
    { month: 'Jun', reads: 18900 },
    { month: 'Jul', reads: 21500 },
    { month: 'Aug', reads: 23700 },
  ],
  topBooks: [
    { id: 'book_4', title: 'Starlight & Ashes', readsCount: 88500, likesCount: 9200 },
  ],
};
