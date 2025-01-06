export const questions = [
  {
    id: 1,
    question:
      'Tell me about your skin after you wash your face (before apply any skincare)',
    explanation:
      "Understanding your skin's natural state helps determine your skin type, which is crucial for recommending appropriate skincare products.",
    options: [
      {
        label: "It's usually pretty oily",
        value: 'Oily',
        description:
          'Excess sebum production can lead to a shiny appearance and potential acne issues.',
      },
      {
        label: "It's dry and feels tight to my body/face",
        value: 'Dry',
        description:
          'Lack of natural oils can cause discomfort and potential skin barrier issues.',
      },
      {
        label: 'I get a little oily in the T-zones but can also have dry areas',
        value: 'Combination',
        description:
          'A mix of oily and dry areas requires balanced care for different facial regions.',
      },
      {
        label: 'Pretty much feels good',
        value: 'Normal',
        description:
          "Well-balanced skin that doesn't experience extreme oiliness or dryness.",
      },
    ],
  },

  {
    id: 2,
    question: 'How sensitive is your skin?',
    explanation:
      "Skin sensitivity affects how your skin reacts to different ingredients and treatments. This information helps us recommend products that won't irritate your skin.",
    options: [
      {
        label: 'My skin is easily irritated',
        value: 'Sensitive',
        description:
          'Prone to redness, itching, or burning when using new products.',
      },
      {
        label: 'My skin is rarely irritated',
        value: 'Not Sensitive',
        description:
          'Can tolerate most skincare products without adverse reactions.',
      },
      {
        label: "I don't typically try new products",
        value: 'Unknown Sensitive',
        description:
          'Limited experience with various products makes sensitivity level uncertain.',
      },
    ],
  },
  {
    id: 3,
    question: 'Which skin goal is most important to you?',
    explanation:
      'Prioritizing your main skin concern helps us focus on the most crucial aspect of your skincare routine.',
    options: [
      {
        label: 'Clear acne',
        value: 'Acne',
        description:
          'If you have acne, this should be your primary concern as it affects overall skin health and appearance.',
        Ingredient: ['AAsdfdsA', 'BBB', '121545', '548ddsfsdfdf'],
      },
      {
        label: 'Treat clogged pores',
        value: 'Clogged pores',
        description:
          'Addressing clogged pores can prevent acne and improve skin texture.',
        Ingredient: ['AAA', 'BBdsfdsB', '121545', '548dfdf'],
      },
      {
        label: 'Improve skin texture',
        value: 'Skin Texture',
        description:
          'Enhancing skin texture can lead to smoother, more refined-looking skin.',
        Ingredient: ['AAA', 'BBB', '1215sdfds45', '548dfdf'],
      },
      {
        label: 'Fight wrinkles',
        value: 'Wrinkles',
        description:
          'Targeting wrinkles can help maintain a youthful appearance and skin elasticity.',
        Ingredient: ['AAA', 'BBdfsdB', '121545', '548dfdf'],
      },
      {
        label: 'Fade dark spots',
        value: 'Dark spots',
        description:
          'Reducing hyperpigmentation can lead to a more even skin tone.',
        Ingredient: ['AAA', 'BsdfdsBB', '121545', '548dfdf'],
      },
      {
        label: 'Complexion - My skin is so dull',
        value: 'Improve complexion',
        description:
          'Brightening dull skin can result in a more radiant and healthy-looking complexion.',
        Ingredient: ['fdfdAAA', 'BBB', '121545', '548dfdf'],
      },
    ],
  },
  {
    id: 4,
    question: 'Which are the rest of your skin goals?',
    explanation:
      'Addressing multiple skin concerns helps create a comprehensive skincare routine tailored to your needs.',
    options: [
      {
        label: 'Clear acne',
        value: 'Acne',
        description:
          'If you have acne, this should be your primary concern as it affects overall skin health and appearance.',
        Ingredient: ['AAsdfdsA', 'BBB', '121545', '548ddsfsdfdf'],
      },
      {
        label: 'Treat clogged pores',
        value: 'Clogged pores',
        description:
          'Addressing clogged pores can prevent acne and improve skin texture.',
        Ingredient: ['AAA', 'BBdsfdsB', '121545', '548dfdf'],
      },
      {
        label: 'Improve skin texture',
        value: 'Skin Texture',
        description:
          'Enhancing skin texture can lead to smoother, more refined-looking skin.',
        Ingredient: ['AAA', 'BBB', '1215sdfds45', '548dfdf'],
      },
      {
        label: 'Fight wrinkles',
        value: 'Wrinkles',
        description:
          'Targeting wrinkles can help maintain a youthful appearance and skin elasticity.',
        Ingredient: ['AAA', 'BBdfsdB', '121545', '548dfdf'],
      },
      {
        label: 'Fade dark spots',
        value: 'Dark spots',
        description:
          'Reducing hyperpigmentation can lead to a more even skin tone.',
        Ingredient: ['AAA', 'BsdfdsBB', '121545', '548dfdf'],
      },
      {
        label: 'Complexion - My skin is so dull',
        value: 'Improve complexion',
        description:
          'Brightening dull skin can result in a more radiant and healthy-looking complexion.',
        Ingredient: ['fdfdAAA', 'BBB', '121545', '548dfdf'],
      },
    ],
    multiSelect: true,
    maxSelect: 3,
  },
  {
    id: 5,
    question: 'How would you describe your acne?',
    explanation:
      'The severity of acne determines the appropriate treatment approach and product recommendations.',
    options: [
      {
        label: 'Mild',
        value: 'Mild',
        description:
          'Clogged pores or inflamed pimples on less than half your face',
      },
      {
        label: 'Moderate',
        value: 'Moderate',
        description:
          'Clogged pores or inflamed pimples on more than half your face',
      },
      {
        label: 'Severe',
        value: 'Severe',
        description: 'Inflamed pimples all over or painful bumps/cysts',
      },
    ],
    conditional: answers =>
      answers[3] === 'Acne' || 
            answers[3] === 'Clogged pores' ||
            (answers[4] && (answers[4].includes('Acne') || answers[4].includes('Clogged pores')))
  },


  {
    id: 6,
    question: 'How much makeup do you use on a daily basis?',
    options: [
      { label: 'None', value: 'none', description:
          'xsdsdsaddsfds' },
      { label: 'A little', value: 'a_little', description:
          'Cfgdgfdglogged pores or inflamed pimples on less than half your face'  },
      { label: 'A decent amount', value: 'a_decent_amount', description:
          'Clogged fgfdgfdpores or inflamed pimples on less than half your face'  },
      { label: 'Full coverage', value: 'full_coverage', description:
          'Clogged pores or inflamedfgdfgdf pimples on less than half your face'  },
    ],
  },

  {
    id: 7,
    question: 'How many skincare products are in your daily routine? ',
    explanation: 'ไม่รวมที่ล้างหน้าและกันแดด',

    options: [
      { label: 'Less than 4 products', value: 'less_than_4' },
      { label: '4-6 products', value: '4_6' },
      { label: '6+ products', value: '6_plus' },
    ],
  },

  {
    id: 8,
    question: 'What products do you use?',
    explanation:
      'Understanding your current routine helps us make personalized recommendations and identify any gaps in your skincare regimen.',
    options: [
      {
        label: 'ล้างหน้า : ไมเซล่าวอเตอร์',
        value: 'Micellar water',
        description: 'Micellar Water',
      },
      {
        label: 'ล้างหน้า : คลีนซิ่งออยล์/บาล์ม',
        value: 'Cleansing Oil/Balm',
        description: 'Cleansing Oil/Balm',
      },
      {
        label: 'ล้างหน้า : โฟมล้างหน้า',
        value: 'Cleanser',
        description: 'Cleanser',
      },
      {
        label: 'บำรุง : น้ำตบ / โทนเนอร์',
        value: 'Toner',
        description: 'Toner',
      },
      {
        label: 'บำรุง : เซรั่ม',
        value: 'Serum',
        description: 'Serum',
      },
      {
        label: 'มอยเจอร์ไรเซอร์',
        value: 'Moisturizer',
        description: 'Moisturizer',
      },
      {
        label: 'กันแดด',
        value: 'Sunscreen',
        description: 'Sunscreen',
      },
      {
        label: 'สลิปปิ้งมาส์ก',
        value: 'Sleeping Mask',
        description: 'Sleeping Mask',
      },
      {
        label: 'มาส์กชีท',
        value: 'Sheet Mask',
        description: 'Sheet Mask',
      },

      {
        label: 'ไม่ได้ทาสกินแคร์ / กันแดด',
        value: 'None of the above',
        description: 'None of the above',
      },
    ],
    multiSelect: true,
  },
  {
    id: 9,
    question: 'Have you ever used retinol?',
    explanation:
      'Retinol is a powerful anti-aging ingredient. Your experience with it helps us determine if and how to incorporate it into your routine.',
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
      { label: "I don't know", value: 'Unknown' },
    ],
  },
  {
    id: 10,
    question: 'ใช้ Retinol มานานเท่าไหร่',
    explanation:
      'The frequency of retinol use affects its efficacy and potential for skin irritation.',
    options: [
      { label: '< 1 เดือน', value: '1 เดือน' },
      { label: '1 - 3 เดือน', value: '1 - 3 เดือน' },
      { label: '4 - 6 เดือน', value: '4 - 6 เดือน' },
      { label: '> 6 เดือน', value: '> 6 เดือน' },
    ],
    conditional: answers => answers[9] === 'Yes',
  },

  {
    id: 11,
    question: 'When using retinol, how often do you apply it?',
    explanation:
      'The frequency of retinol use affects its efficacy and potential for skin irritation.',
    options: [
      { label: 'Daily', value: 'Daily' },
      { label: 'Every other day', value: 'Every other day' },
      { label: 'A few times a week', value: 'Few times a week' },
      { label: 'Once a week', value: 'Once a week' },
    ],
    conditional: answers => answers[9] === 'Yes',
  },
  {
    id: 12,
    question: 'How does your skin currently respond to retinol?',
    explanation:
      "Your skin's reaction to retinol helps us determine the appropriate concentration and frequency for your routine.",
    options: [
      { label: 'My skin responded well', value: 'Good response' },
      { label: 'My skin got irritated', value: 'Irritation' },
    ],
    conditional: answers => answers[9] === 'Yes',
  },
  {
    id: 13,
    question: 'Are you currently using AHA/BHA/LHA/PHA?',
    explanation:
      'These are exfoliating acids that can improve skin texture and unclog pores. Your experience with them helps us tailor your skincare routine.',
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
      { label: "I don't know", value: 'Unknown' },
    ],
  },
  {
    id: 14,
    question: 'When using AHA/BHA/LHA/PHA, how often do you apply it?',
    explanation:
      'The frequency of acid use affects its efficacy and potential for skin irritation.',
    options: [
      { label: 'Daily', value: 'Daily' },
      { label: 'Every other day', value: 'Every other day' },
      { label: 'A few times a week', value: 'Few times a week' },
      { label: 'Once a week', value: 'Once a week' },
    ],
    conditional: answers => answers[13] === 'Yes',
  },
  {
    id: 15,
    question:
      'กรุณาเลือกยาทา เช่น ยาทาสิว ยาทาฝ้า ยาสำหรับต้านแก่ ที่ท่านใช้อยู่?',
    explanation:
      'Prescription products can interact with over-the-counter skincare. This information helps us ensure our recommendations are safe and complementary to your current treatments.',
    options: [
      {
        label: 'Benzac',
        value: 'Benzoyl Peroxide',
        description: 'ตัวยา: Benzoyl Peroxide',
      },
      {
        label: 'Clinda-M',
        value: 'Clindamycin',
        description: 'ตัวยา: Clindamycin',
      },
      {
        label: 'Retacnyl / Acnetin-A / Retin-A',
        value: 'Tretinoin',
        description: 'ตัวยา: Tretinoin',
      },
      {
        label: 'Differin',
        value: 'Adapalene',
        description: 'ตัวยา: Adapalene',
      },
      {
        label: 'Duac',
        value: 'Benzoyl peroxide & Clindamycin',
        description: 'ตัวยา: Benzoyl Peroxide + Clindamycin',
      },
      {
        label: 'Epiduo',
        value: 'Benzoyl peroxide & Adapalene',
        description: 'ตัวยา: Adapalene + Benzoyl peroxide',
      },
      {
        label: 'Skinoren',
        value: 'Azelaic Acid',
        description: 'ตัวยา: Benzoyl Peroxide + Clindamycin',
      },
      { label: 'None of the above', value: 'None of the above' },
    ],
    multiSelect: true,
  },

  {
    id: 16,
    question: 'Are you pregnant, breastfeeding, or trying to conceive?',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
  },

  {
    id: 17,
    question: 'ปกติออกแดดจัดขนาดไหน',
    options: [
      { label: 'ทำงานออฟฟิส', value: 'indoor' },
      { label: 'ทำงานกลางแจ้ง', value: 'outdoor' },
      { label: 'เรียน', value: 'student' },
      { label: 'ไม่ค่อยเจอแดด', value: 'less' },
    ],
  },

  {
    id: 18,
    question: "งบสกินแคร์ 'ต่อชิ้น",
    explanation:
      'Understanding your budget helps us recommend products that are both effective and within your price range.',
    options: [
      { label: 'น้อยกว่า 499 💰', value: '<499' },
      { label: '500 - 999 💰💰', value: '500-999' },
      { label: '1,000 - 1,999 💰💰💰', value: '1000-1999' },
      { label: '2,000 - 2,999 💰💰💰💰', value: '2000-2999' },
      { label: 'มากกว่า 2,999 💰💰💰💰💰', value: '>2999' },
    ],
  },
];
