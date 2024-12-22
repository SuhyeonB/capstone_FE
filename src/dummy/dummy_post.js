const dummy_post = [
  {
    post_id: 1,
    title: "A Wonderful Day",
    content: "Today was a really wonderful day. I took a long walk through the park,enjoying the fresh air and beautiful weather. I also read a couple of chapters from a great book I recently started. The peace and quiet were exactly what I needed to recharge for the week ahead.",
    createdAt: "2024-10-10",
    public: 1,
    user_id: 101, // 홍길동
    weather: "sunny",
    imageUrl:null,
    likeCount: 0
  },
  {
    post_id: 2,
    title: "Rainy Day",
    content: "It rained a lot today, so I stayed home and rested. Although it was gloomy outside, I spent the day binge-watching my favorite TV series. There's something comforting about the sound of rain tapping against the window while you're wrapped up in a cozy blanket.",
    createdAt: "2024-10-09",
    public: 1,
    user_id: 102, // 최승미
    weather: "rainy",
    imageUrl:null,
    likeCount: 0
  },
  {
    post_id: 3,
    title: "Weekend Fun",
    content: "I spent the weekend hanging out with friends. We went to the beach, played volleyball, and later had a barbecue in the evening. It was a perfect way to end a long week, laughing, sharing stories, and enjoying each other's company.",
    createdAt: "2024-10-08",
    public: 0,
    user_id: 103, // 봉수현
    weather: "cloudy",
    imageUrl:null,
    likeCount: 0
  },
  {
    post_id: 4,
    title: "Busy Monday",
    content: "Work was incredibly hectic today, but I managed to get through it all. From back-to-back meetings to tight deadlines, it was nonstop. However, the sense of accomplishment I felt at the end of the day made it all worth it.",
    createdAt: "2024-10-07",
    public: 1,
    user_id: 104, // 배해리
    weather: "partly cloudy",
    imageUrl:null,
    likeCount: 0
  },
  {
    post_id: 5,
    title: "Exercise Routine",
    content: "I started a new exercise routine today, focusing on strength training. The session was tough but rewarding. It's been a while since I felt this motivated to take care of my health, and I'm determined to stick with it this time.",
    createdAt: "2024-10-06",
    public: 0,
    user_id: 105, // 대지니
    weather: "sunny",
    imageUrl:null,
    likeCount: 0
  },
  {
    post_id: 6,
    title: "Morning Jog",
    content: "Went for a morning jog today. The cool breeze made it an ideal run. It felt refreshing to start the day with some exercise and get my body moving.",
    createdAt: "2024-10-05",
    public: 1,
    user_id: 101, // 홍길동
    weather: "sunny",
    imageUrl:null,
    likeCount: 0
  },
  {
    post_id: 7,
    title: "Relaxing Afternoon",
    content: "Spent the afternoon at a cafe, sipping coffee and reading a book. It was the perfect way to unwind after a busy week. The atmosphere was calm, and the coffee was great.",
    createdAt: "2024-10-04",
    public: 1,
    user_id: 102, // 최승미
    weather: "cloudy",
    imageUrl:null,
    likeCount: 0
  },
  {
    post_id: 8,
    title: "Busy at Work",
    content: "Had a very busy day at work today. Meetings after meetings and tight deadlines made it a stressful day, but I managed to push through.",
    createdAt: "2024-10-03",
    public: 1,
    user_id: 103, // 봉수현
    weather: "rainy",
    imageUrl:null,
    likeCount: 0
  },
  {
    post_id: 9,
    title: "New Recipe",
    content: "Tried out a new recipe today. It was a bit tricky, but the result was worth it! The food turned out delicious, and I'm definitely going to make it again.",
    createdAt: "2024-10-02",
    public: 1,
    user_id: 104, // 배해리
    weather: "sunny",
    imageUrl:null,
    likeCount: 0
  },
  {
    post_id: 10,
    title: "Movie Night",
    content: "Watched a thrilling movie tonight. It had a gripping plot and kept me on the edge of my seat. Definitely one of the best movies I've seen this year.",
    createdAt: "2024-10-01",
    public: 0,
    user_id: 105, // 대지니
    weather: "cloudy",
    imageUrl:null,
    likeCount: 0
  },
  {
    post_id: 11,
    title: "Coffee with a Friend",
    content: "Met up with an old friend today for coffee. We talked about everything from work to personal life, and it was really nice to catch up.",
    createdAt: "2024-09-30",
    public: 1,
    user_id: 101, // 홍길동
    weather: "partly cloudy",
    imageUrl:null,
    likeCount: 0
  },
  {
    post_id: 12,
    title: "Reading a New Book",
    content: "Started reading a new book today. The storyline is intriguing, and the characters are well-developed. I can't wait to read more!",
    createdAt: "2024-09-29",
    public: 1,
    user_id: 102, // 최승미
    weather: "sunny",
    imageUrl:null,
    likeCount: 0
  },
  {
    post_id: 13,
    title: "Long Drive",
    content: "Went for a long drive today. The weather was perfect, and the scenery was beautiful. It was the perfect way to clear my mind and relax.",
    createdAt: "2024-09-28",
    public: 0,
    user_id: 103, // 봉수현
    weather: "cloudy",
    imageUrl:null,
    likeCount: 0
  },
  {
    post_id: 14,
    title: "Family Dinner",
    content: "Had a family dinner today. It was great to spend time with my loved ones and catch up on each other's lives. The food was amazing as always.",
    createdAt: "2024-09-27",
    public: 0,
    user_id: 104, // 배해리
    weather: "rainy",
    imageUrl:null,
    likeCount: 0
  },
  {
    post_id: 15,
    title: "Exercise Progress",
    content: "Made some good progress in my workout routine today. I'm getting stronger, and it feels great. I'm determined to keep pushing forward.",
    createdAt: "2024-09-26",
    public: 1,
    user_id: 105, // 대지니
    weather: "sunny",
    imageUrl:null,
    likeCount: 0
  },
  {
    post_id: 16,
    title: "Cleaning Day",
    content: "Spent the day cleaning and organizing my house. It feels so good to have everything neat and tidy. The hard work was definitely worth it.",
    createdAt: "2024-09-25",
    public: 0,
    user_id: 101, // 홍길동
    weather: "partly cloudy",
    imageUrl:null,
    likeCount: 0
  },
  {
    post_id: 17,
    title: "New Hobby",
    content: "Started a new hobby today—painting! It was a lot of fun, and I think I’m going to stick with it. It's a great way to relax and be creative.",
    createdAt: "2024-09-24",
    public: 1,
    user_id: 102, // 최승미
    weather: "cloudy",
    imageUrl:null,
    likeCount: 0
  },
  {
    post_id: 18,
    title: "Visiting Family",
    content: "Went to visit my family today. We had a great time talking, laughing, and enjoying each other's company. It was a really heartwarming day.",
    createdAt: "2024-09-23",
    public: 1,
    user_id: 103, // 봉수현
    weather: "sunny",
    imageUrl:null,
    likeCount: 0
  },
  {
    post_id: 19,
    title: "Cooking Experiment",
    content: "Tried experimenting with a new dish today. It didn’t turn out exactly as I planned, but it was still pretty tasty. I’ll improve it next time.",
    createdAt: "2024-09-22",
    public: 1,
    user_id: 104, // 배해리
    weather: "partly cloudy",
    imageUrl:null,
    likeCount: 0
  },
  {
    post_id: 20,
    title: "Relaxing Evening",
    content: "Spent the evening relaxing with a good book and a cup of tea. It was the perfect way to unwind after a busy day.",
    createdAt: "2024-09-21",
    public: 0,
    user_id: 105, // 대지니
    weather: "rainy",
    imageUrl:null,
    likeCount: 0
  },
  {
    post_id: 21,
    title: "travel",
    content: `Today was a peaceful day in Boracay. I felt lucky to visit during a time when there were less tourists, especially no large crowds of Chinese visitors. The streets were quieter, allowing me to enjoy the island's charm at a leisurely pace. While my parents went off to enjoy a massage session, I decided to take a walk and explore the surroundings.

Initially, I thought about taking one of the electric tricycles that are common here, but the weather was so perfect that walking seemed like a better choice. The bright sunshine and gentle breeze made it an ideal day to wander around on foot. I strolled through narrow streets, observing the local shops, vibrant houses, and friendly people going about there day. The slower pace allowed me to appreciate the small details of the island, like the rustling palm trees and the faint smell of the ocean in the air.

This simple walk turned out to be one of the most enjoyable moments of the trip. It reminded me of how relaxing it is to slow down.`,
    createdAt: "2024-11-21",
    public: 0,
    user_id: 101, // 대지니
    weather: "sunny",
    imageUrl:'/images/보라카이.jpg',
    likeCount: 4
  }
];

export default dummy_post;
