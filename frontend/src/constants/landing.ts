import { CaptchaDemoProps } from 'src/component/captcha/demo';

export const LandingData: (Omit<CaptchaDemoProps, 'goNext' | 'index'> & {
  title: string;
  color: string;
})[] = [
  {
    title: 'Creative Tastes',
    color: '#fecc1b',
    quiz: {
      image: {
        url: '/static/images/cute.webp',
        width: 640,
        height: 960,
      },
      tags: ['bright eye', 'fluffy', 'sunny', 'castle', 'rabbit'],
    },
    trues: ['bright eye', 'fluffy', 'rabbit'],
  },

  {
    title: 'Modern Characteristics',
    color: '#6bd968',
    quiz: {
      image: {
        url: '/static/images/modern.png',
        width: 640,
        height: 640,
      },
      tags: ['fashion', 'kittens', 'skeleton', 'factory', 'deco shoes'],
    },
    trues: ['fashion', 'skeleton', 'deco shoes'],
  },

  {
    title: 'Antique Manners',
    color: '#3defe9',
    quiz: {
      image: {
        url: '/static/images/traditional.webp',
        width: 640,
        height: 640,
      },

      tags: ['quilt', 'pillow', 'colourful', 'homemade', 'glass'],
    },
    trues: ['quilt', 'homemade', 'colourful'],
  },

  {
    title: 'Gamers',
    color: '#d83bd2',
    quiz: {
      image: {
        url: '/static/images/game.webp',
        width: 640,
        height: 640,
      },
      tags: ['woman', 'Cyberpunk', 'pretty', 'dark hair', 'game'],
    },
    trues: ['woman', 'pretty', 'game'],
  },

  {
    title: 'Anime Lovers',
    color: '#8BC34A',
    quiz: {
      image: {
        url: '/static/images/window-1.webp',
        width: 640,
        height: 960,
      },
      tags: ['Marilyn Monroe', 'cathedral window', 'muscular', 'backlit'],
    },
    trues: ['cathedral window', 'backlit'],
  },
  {
    title: 'Unique Visitors',
    color: '#8BC34A',
    quiz: {
      image: {
        url: '/static/images/window-2.webp',
        width: 640,
        height: 960,
      },
      tags: ['Marilyn Monroe', 'cathedral window', 'muscular', 'backlit'],
    },
    trues: ['cathedral window', 'backlit'],
  },
  {
    title: 'Future',
    color: '#ff9800',
    quiz: {
      image: {
        url: '/static/images/future.webp',
        width: 640,
        height: 960,
      },
      tags: ['space', '80s', 'helmet', 'pilot', 'dancing'],
    },
    trues: ['helmet', 'space', 'pilot'],
  },
];
