/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EnglishWord } from '../types';

// 31 Predefined high-quality English words (Level B1 to C1) for daily offline study
export const ENGLISH_WORDS_BY_DAY: Record<number, EnglishWord> = {
  1: {
    word: 'Resilient',
    level: 'B2',
    partOfSpeech: 'adjective',
    pronunciation: '/rɪˈzɪliənt/',
    translation: 'پذیرنده تغییر، سرسخت و باانگیزه، مقاوم',
    definition: 'Able to quickly recover from difficult conditions or setbacks.',
    example: 'Even after failing the exam, she remained resilient and studied harder.',
    exampleTranslation: 'حتی بعد از مردود شدن در امتحان، او مقاوم و باانگیزه باقی ماند و سخت‌تر درس خواند.'
  },
  2: {
    word: 'Evaluate',
    level: 'B1',
    partOfSpeech: 'verb',
    pronunciation: '/ɪˈvæljueɪt/',
    translation: 'ارزیابی کردن، سنجیدن ارزش چیزی',
    definition: 'To form an idea of the amount, number, or value of something.',
    example: 'We need to evaluate our progress at the end of every week.',
    exampleTranslation: 'نیاز داریم که در پایان هر هفته میزان پیشرفت خود را ارزیابی کنیم.'
  },
  3: {
    word: 'Incorporate',
    level: 'B2',
    partOfSpeech: 'verb',
    pronunciation: '/ɪnˈkɔːrpəreɪt/',
    translation: 'ادغام کردن، درون‌کشی کردن، گنجاندن',
    definition: 'To include or integrate something as part of a whole.',
    example: 'You should incorporate helper routines into your daily programming workflow.',
    exampleTranslation: 'شما باید روتین‌های کمکی را در جریان کار برنامه‌نویسی روزانه خود بگنجانید.'
  },
  4: {
    word: 'Acquire',
    level: 'B2',
    partOfSpeech: 'verb',
    pronunciation: '/əˈkwaɪər/',
    translation: 'به دست آوردن، کسب کردن دانش یا مهارت',
    definition: 'To buy or obtain an asset, object, or to learn a new skill.',
    example: 'Learning a foreign language is a great way to acquire new perspectives.',
    exampleTranslation: 'یادگیری یک زبان خارجی راهی عالی برای کسب دیدگاه‌های جدید است.'
  },
  5: {
    word: 'Persist',
    level: 'B2',
    partOfSpeech: 'verb',
    pronunciation: '/pərˈsɪst/',
    translation: 'پافشاری کردن، استمرار ورزیدن بر انجام کاری',
    definition: 'To continue firmly in an opinion or a course of action despite difficulty or opposition.',
    example: 'If you persist in your efforts, you will eventually achieve your goals.',
    exampleTranslation: 'اگر در تلاش‌هایت استمرار داشته باشی، سرانجام به اهدافت دست خواهی یافت.'
  },
  6: {
    word: 'Consequence',
    level: 'B1',
    partOfSpeech: 'noun',
    pronunciation: '/ˈkɑːnsəkwens/',
    translation: 'پیامد، اثر و نتیجه (اغلب ناخوشایند)',
    definition: 'A result or effect of an action or condition, often an unwelcome one.',
    example: 'Your health in the future is a direct consequence of your lifestyle today.',
    exampleTranslation: 'سلامتی شما در آینده پیامد مستقیم سبک زندگی امروز شماست.'
  },
  7: {
    word: 'Collaborate',
    level: 'B2',
    partOfSpeech: 'verb',
    pronunciation: '/kəˈlæbəreɪt/',
    translation: 'همکاری کردن جهت دستیابی به هدفی مشترک',
    definition: 'To work jointly on an activity or project, especially to produce or create something.',
    example: 'Our team hopes to collaborate with experts on this dynamic interface.',
    exampleTranslation: 'تیم ما امیدوار است که در این رابط کاربری پویا با متخصصان همکاری کند.'
  },
  8: {
    word: 'Advocate',
    level: 'C1',
    partOfSpeech: 'noun / verb',
    pronunciation: '/ˈædvəkeɪt/',
    translation: 'حامی، طرفداری کردن، مدافع بودن',
    definition: 'A person who publicly supports or recommends a particular cause or policy.',
    example: 'She is a strong advocate for daily reading and personal development.',
    exampleTranslation: 'او یکی از حامیان سرسخت مطالعه روزانه و توسعه فردی است.'
  },
  9: {
    word: 'Feasible',
    level: 'B2',
    partOfSpeech: 'adjective',
    pronunciation: '/ˈfiːzəbl/',
    translation: 'امکان‌پذیر، شدنی، عملی',
    definition: 'Possible and practical to do easily or conveniently.',
    example: 'With proper planning, finishing this project in three weeks is feasible.',
    exampleTranslation: 'با برنامه‌ریزی مناسب، تمام کردن این پروژه در سه هفته شدنی است.'
  },
  10: {
    word: 'Ambiguous',
    level: 'B2',
    partOfSpeech: 'adjective',
    pronunciation: '/æmˈbɪɡjuəs/',
    translation: 'مبهم، چندپهلو، گنگ',
    definition: 'Open to more than one interpretation; having a double meaning.',
    example: 'Her answer was ambiguous, leaving us unsure what she meant.',
    exampleTranslation: 'پاسخ او مبهم بود و ما را درباره منظورش مطمئن نساخت.'
  },
  11: {
    word: 'Consistent',
    level: 'B1',
    partOfSpeech: 'adjective',
    pronunciation: '/kənˈsɪstənt/',
    translation: 'یکدست، مستمر، باثبات',
    definition: 'Acting or done in the same way over time, especially so as to be fair or accurate.',
    example: 'Consistent practice is key to mastering any complex skills.',
    exampleTranslation: 'تمرین مستمر کلید اصلی تسلط بر هر مهارت پیچیده‌ای است.'
  },
  12: {
    word: 'Analyze',
    level: 'B1',
    partOfSpeech: 'verb',
    pronunciation: '/ˈænəlaɪz/',
    translation: 'تحلیل کردن، بررسی دقیق ساختار چیزی',
    definition: 'To examine methodically and in detail the constitution or structure of something.',
    example: 'Scientists analyze the data to spot long-term weather behaviors.',
    exampleTranslation: 'دانشمندان برای شناسایی رفتارهای طولانی‌مدت آب و هوا، داده‌ها را تحلیل می‌کنند.'
  },
  13: {
    word: 'Crucial',
    level: 'B2',
    partOfSpeech: 'adjective',
    pronunciation: '/ˈkruːʃl/',
    translation: 'حیاتی، بسیار مهم و تعیين‌کننده',
    definition: 'Extremely important or necessary for the success or failure of something.',
    example: 'Regular exercise plays a crucial role in maintaining cardiovascular health.',
    exampleTranslation: 'ورزش منظم نقشحیاتی در حفظ سلامت قلب و عروق ایفا می‌کند.'
  },
  14: {
    word: 'Deviate',
    level: 'C1',
    partOfSpeech: 'verb',
    pronunciation: '/ˈdiːvieɪt/',
    translation: 'منحرف شدن، فاصله گرفتن از مسیر همیشگی',
    definition: 'To depart from an established course, standard, or expectation.',
    example: 'Do not deviate from the plan if you want to reach the goal strictly.',
    exampleTranslation: 'اگر می‌خواهید دقیقاً به هدف برسید، از برنامه منحرف نشوید.'
  },
  15: {
    word: 'Enhance',
    level: 'B2',
    partOfSpeech: 'verb',
    pronunciation: '/ɪnˈhæns/',
    translation: 'بهبود بخشیدن، تقویت کردن ارزش یا کیفیت',
    definition: 'To intensify, increase, or further improve the quality, value, or extent of something.',
    example: 'This upgrade will greatly enhance the performance of the local client.',
    exampleTranslation: 'این ارتقا کارایی واکشی محلی را به میزان قابلی تقویت خواهد کرد.'
  },
  16: {
    word: 'Fluctuate',
    level: 'B2',
    partOfSpeech: 'verb',
    pronunciation: '/ˈflʌktʃueɪt/',
    translation: 'نوسان داشتن، دائماً بین دو مقدار تغییر کردن',
    definition: 'To rise and fall irregularly in number or amount.',
    example: 'Your daily energy levels might fluctuate, but keep sticking to your rituals.',
    exampleTranslation: 'سطوح فرسایش روزانه شما ممکن است نوسان داشته باشد، اما همواره به آیین‌های خود پایبند بمانید.'
  },
  17: {
    word: 'Generate',
    level: 'B1',
    partOfSpeech: 'verb',
    pronunciation: '/ˈdʒenəreɪt/',
    translation: 'تولید کردن، به وجود آوردن، خلق کردن',
    definition: 'To cause something to arise or come about; to produce energy or ideas.',
    example: 'Our workshop aims to generate creative solutions for student schedules.',
    exampleTranslation: 'کارگاه ما با هدف تولید ایده‌های خلاقانه برای برنامه‌های درسی دانش‌آموزان برگزار می‌شود.'
  },
  18: {
    word: 'Hypothesis',
    level: 'C1',
    partOfSpeech: 'noun',
    pronunciation: '/haɪˈpɑːθəsɪs/',
    translation: 'فرضیه، تئوری ابتدایی و آزمایش‌نشده',
    definition: 'A proposed explanation made on the basis of limited evidence as a starting point for further investigation.',
    example: 'The team developed a promising hypothesis regarding the drop in solar metrics.',
    exampleTranslation: 'تیم فرضیه امیدوارکننده‌ای را درباره کاهش آمارهای خورشیدی توسعه داد.'
  },
  19: {
    word: 'Inevitably',
    level: 'B2',
    partOfSpeech: 'adverb',
    pronunciation: '/ɪnˈevɪtəbli/',
    translation: 'به ناچار، به طور اجتناب‌ناپذیر، قطعاً',
    definition: 'As is certain to happen; unavoidably.',
    example: 'Skipping your study routine will inevitably lead to poorer test scores.',
    exampleTranslation: 'نادیده گرفتن روتین مطالعه، به طور اجتناب‌ناپذیری منجر به نمرات ضعیف‌تر در آزمون خواهد شد.'
  },
  20: {
    word: 'Justify',
    level: 'B2',
    partOfSpeech: 'verb',
    pronunciation: '/ˈdʒʌstɪfaɪ/',
    translation: 'توجیه کردن، دلیلی موجه برای کاری آوردن',
    definition: 'To show or prove to be right, reasonable, or warranted.',
    example: 'You cannot justify wasting time when you have upcoming final goals.',
    exampleTranslation: 'وقتی اهداف نهایی در پیش رو دارید، نمی‌توانید تلف کردن وقت خود را توجیه کنید.'
  },
  21: {
    word: 'Liberate',
    level: 'B2',
    partOfSpeech: 'verb',
    pronunciation: '/ˈlɪbəreɪt/',
    translation: 'رها کردن، آزاد ساختن از بند چیزی',
    definition: 'To set someone or something free from imprisonment, restriction, or confinement.',
    example: 'Sticking to a solid calendar actually liberates you from decision-making fatigue.',
    exampleTranslation: 'پایبندی به یک تقویم مستحکم، در واقع شما را از خستگی تصمیم‌گیری‌های پشت سر هم رها می‌سازد.'
  },
  22: {
    word: 'Modify',
    level: 'B1',
    partOfSpeech: 'verb',
    pronunciation: '/ˈmɑːdɪfaɪ/',
    translation: 'تغییر دادن اصلاحی، تعدیل کردن جهت هماهنگی',
    definition: 'To make partial or minor changes to something, especially to improve it or make it more suitable.',
    example: 'You can modify the target day of your annual goal at any time.',
    exampleTranslation: 'شما می‌توانید روز مهلت دستیابی به هدف سالانه خود را در هر زمانی کمی تغییر دهید.'
  },
  23: {
    word: 'Novel',
    level: 'B2',
    partOfSpeech: 'adjective',
    pronunciation: '/ˈnɑːvl/',
    translation: 'نو، جدید، مبتکرانه و نوین',
    definition: 'Interestingly new, original, or unusual.',
    example: 'He suggested a novel theory to handle multi-tasking without getting confused.',
    exampleTranslation: 'او نظریه‌ای نوین را برای سازمان‌دهی چندکارگی بدون سردرگمی پیشنهاد کرد.'
  },
  24: {
    word: 'Objective',
    level: 'B2',
    partOfSpeech: 'noun / adjective',
    pronunciation: '/əbˈdʒektɪv/',
    translation: 'هدف، غایت / بی‌طرفانه، منطقی و واقع‌بین',
    definition: 'A goal or aim; or representation of facts without personal bias.',
    example: 'Our main objective is to establish consistent habits in 30 days.',
    exampleTranslation: 'هدف اصلی ما ایجاد عادت‌های مستمر در ۳۰ روز است.'
  },
  25: {
    word: 'Precise',
    level: 'B2',
    partOfSpeech: 'adjective',
    pronunciation: '/prɪˈsaɪs/',
    translation: 'دقیق، منظم و بدون کوچک‌ترین خطا',
    definition: 'Marked by accuracy of detail; exact.',
    example: 'The Jalali calendar algorithms provide a precise calculation of leap years.',
    exampleTranslation: 'الگوریتم‌های تقویم جلالی، محاسباتی دقیق از سال‌های کبیسه ارائه می‌دهند.'
  },
  26: {
    word: 'Acclimate',
    level: 'C2',
    partOfSpeech: 'verb',
    pronunciation: '/ˈækləmeɪt/',
    translation: 'خو گرفتن، عادت کردن به شرایط آب و هوا یا محیط جدید',
    definition: 'To respond and adjust to a new environment, temperature, or climate.',
    example: 'It took some time to acclimate to waking up early every day.',
    exampleTranslation: 'خو گرفتن به بیدار شدن زودهنگام در هر روز زمان‌بر بود.'
  },
  27: {
    word: 'Rigorous',
    level: 'C1',
    partOfSpeech: 'adjective',
    pronunciation: '/ˈrɪɡərəs/',
    translation: 'سخت‌گیرانه، جدی، فرساینده و بسیار دقیق',
    definition: 'Extremely thorough, exhaustive, or accurate; adhering strictly to guidelines.',
    example: 'The scientific papers underwent a rigorous revision process.',
    exampleTranslation: 'مقاله‌های علمی تحت یک فرآیند تجدید نظر بسیار سخت‌گیرانه قرار گرفتند.'
  },
  28: {
    word: 'Subtle',
    level: 'B2',
    partOfSpeech: 'adjective',
    pronunciation: '/ˈsʌtl/',
    translation: 'ظریف، نامحسوس، دقیق و باریک‌بین',
    definition: 'So delicate or precise as to be difficult to analyze or describe directly.',
    example: 'There was a subtle difference in her pronunciation that only a native speaker could realize.',
    exampleTranslation: 'تفاوت ظریفی در تلفظ او وجود داشت که تنها یک گویشور بومی می‌توانست آن را متوجه شود.'
  },
  29: {
    word: 'Transform',
    level: 'B1',
    partOfSpeech: 'verb',
    pronunciation: '/trænsˈfɔːrm/',
    translation: 'متحول کردن، چهره و هویت چیزی را تغییر مثبت دادن',
    definition: 'To make a thorough or dramatic change in the form, appearance, or character of.',
    example: 'Consistent discipline will transform your professional profile thoroughly.',
    exampleTranslation: 'انضباط مستمر پروفایل حرفه‌ای شما را به طور کامل متحول خواهد کرد.'
  },
  30: {
    word: 'Utilize',
    level: 'B2',
    partOfSpeech: 'verb',
    pronunciation: '/ˈjuːtəlaɪz/',
    translation: 'به کار گرفتن، استفاده سودمند کردن از ابزار',
    definition: 'To make practical and effective use of a resource or tool.',
    example: 'You must utilize all available calendar blocks for deep tasks.',
    exampleTranslation: 'شما باید از تمام بلاک‌های تقویم موجود برای کارهای عمیق استفاده سودمند کنید.'
  },
  31: {
    word: 'Vivid',
    level: 'B2',
    partOfSpeech: 'adjective',
    pronunciation: '/ˈvɪvɪd/',
    translation: 'واضح، شفاف، پررنگ، درخشان',
    definition: 'Producing powerful feelings or strong, clear images in the mind.',
    example: 'I still have a vivid memory of the day I wrote my first computer program.',
    exampleTranslation: 'من هنوز خاطره‌ای بسیار شفاف از روزی که اولین برنامه کامپیوتری‌ام را نوشتم دارم.'
  }
};

/**
 * Retrieves the English learning word predefined for the specified day of the month
 */
export function getEnglishWordForDay(day: number): EnglishWord {
  const normalizedDay = Math.max(1, Math.min(31, day));
  return ENGLISH_WORDS_BY_DAY[normalizedDay] || ENGLISH_WORDS_BY_DAY[1];
}
