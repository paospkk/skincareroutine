export const getExpertAdvice = (skinType, skinConcerns) => {
  const advice = {
    general: [
      'Always cleanse your face twice daily to remove dirt, oil, and impurities.',
      'Use sunscreen with at least SPF 30 every day, even when indoors.',
      'Stay hydrated and maintain a balanced diet for overall skin health.',
    ],
    skinType: {
      Oily: [
        'ใช้คลีนเซอร์ที่อ่อนโยนและเป็นฟองเพื่อขจัดน้ำมันส่วนเกินโดยไม่ทำให้ผิวแห้ง',
        'เลือกผลิตภัณฑ์ที่ไม่มีน้ำมันหรือนอน-คอมมิโดเจนิกเพื่อหลีกเลี่ยงการอุดตันของรูขุมขน',
        'พิจารณาใช้มาสก์ดินเหนียวสัปดาห์ละครั้งเพื่อดูดซับน้ำมันส่วนเกิน',
        'หลีกเลี่ยงการล้างหน้าบ่อยเกินไปเพราะอาจทำให้ผิวมันมากขึ้น',
        'ใช้โทนเนอร์ที่มีส่วนผสมของกรดซาลิไซลิกเพื่อควบคุมความมันและป้องกันสิว',
      ],
      Dry: [
        'ใช้คลีนเซอร์ที่มีความชุ่มชื้นและเป็นครีมที่ไม่ทำให้ผิวสูญเสียน้ำมันตามธรรมชาติ',
        'ทามอยส์เจอไรเซอร์ที่มีความชุ่มชื้นสูงขณะที่ผิวยังชื้นเพื่อกักเก็บความชุ่มชื้น',
        'พิจารณาใช้เครื่องทำความชื้นเพื่อเพิ่มความชุ่มชื้นในอากาศโดยเฉพาะในเวลากลางคืน',
        'เลือกมอยส์เจอไรเซอร์ที่มีส่วนผสมของกรดไฮยาลูโรนิคและเซราไมด์',
        'หลีกเลี่ยงผลิตภัณฑ์ที่มีแอลกอฮอล์เพราะจะทำให้ผิวแห้งมากขึ้น',
      ],
      Combination: [
        'ใช้ผลิตภัณฑ์ที่แตกต่างกันสำหรับบริเวณต่างๆ ของใบหน้า - ผลิตภัณฑ์เบาสำหรับบริเวณที่มีน้ำมัน ผลิตภัณฑ์ที่มีความชุ่มชื้นสูงสำหรับบริเวณที่แห้ง',
        'พิจารณาล้างหน้า 2 ขั้นตอนเพื่อทำความสะอาดผิวอย่างทั่วถึงโดยไม่ทำให้แห้งเกินไป',
        'ใช้โทนเนอร์ที่สมดุลเพื่อช่วยปรับสมดุล pH ของผิว',
        'ใช้มาสก์หน้าที่แตกต่างกันในบริเวณที่ต้องการ เช่น มาสก์ดินเหนียวใน T-zone และมาสก์ให้ความชุ่มชื้นในบริเวณแก้ม',
        'ใช้เซรั่มที่มีส่วนผสมของวิตามินซีเพื่อปรับสภาพผิวให้ดูสม่ำเสมอ',
      ],
      Normal: [
        'รักษาสมดุลของผิวด้วยผลิตภัณฑ์ที่อ่อนโยนและมีค่า pH ที่สมดุล',
        'อย่าลืมใช้มอยส์เจอไรเซอร์ – แม้แต่ผิวธรรมดาก็ต้องการความชุ่มชื้น',
        'ผลัดเซลล์ผิวสัปดาห์ละครั้งหรือสองครั้งเพื่อรักษาผิวให้เรียบเนียนและเปล่งปลั่ง',
        'ใช้ครีมกันแดดทุกวันเพื่อปกป้องผิวจากรังสี UV',
      ],
    },
  };

  const concernAdvice = {
    'Acne': [
      'Use products containing salicylic acid or benzoyl peroxide to target acne.',
      'Avoid touching your face throughout the day to prevent spreading bacteria.',
      'Change your pillowcase frequently to avoid reintroducing bacteria to your skin.',
    ],
    'Clogged pores': [
      'Incorporate chemical exfoliants like BHAs to unclog pores.',
      'Use non-comedogenic products to avoid further clogging.',
      'Consider professional extractions or clay masks for stubborn clogs.',
    ],
    'Skin Texture': [
      'Use products with AHAs like glycolic acid to promote cell turnover.',
      'Incorporate a vitamin C serum to boost collagen production and improve overall texture.',
      'Consider microneedling or chemical peels for more dramatic texture improvement.',
    ],
    'Wrinkles': [
      'Use retinol or retinoids to boost collagen production and reduce fine lines.',
      'Apply products with peptides to support skin structure and firmness.',
      "Don't forget your neck and hands - they often show signs of aging first.",
    ],
    'Dark spots': [
      'Use products with niacinamide, vitamin C, or kojic acid to brighten dark spots.',
      'Always wear sunscreen to prevent further darkening of spots.',
      'Consider professional treatments like chemical peels or laser therapy for stubborn spots.',
    ],
    'Improve complexion': [
      'Incorporate brightening ingredients like vitamin C or niacinamide into your routine.',
      'Exfoliate regularly to remove dead skin cells and reveal brighter skin.',
      'Stay hydrated and get enough sleep to promote a healthy, glowing complexion.',
    ],
  };

  return {
    general: advice.general,
    skinType: advice.skinType[skinType] || [],
    concerns: skinConcerns.map(concern => ({
      concern,
      advice: concernAdvice[concern] || [],
    })),
  };
};
