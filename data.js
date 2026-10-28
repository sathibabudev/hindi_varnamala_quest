// Hindi Varnamala Quest - Complete Educational & Mnemonic Dataset
// Specifically designed for 8-year-olds (especially South Indian & English-medium learners)

window.VARNAMALA_DATA = {
  bridgeLanguages: [
    { id: 'en', label: 'English Only', flag: '🇬🇧' },
    { id: 'ta', label: 'தமிழ் (Tamil)', flag: '🌴' },
    { id: 'te', label: 'తెలుగు (Telugu)', flag: '🌺' },
    { id: 'kn', label: 'ಕನ್ನಡ (Kannada)', flag: '🐘' },
    { id: 'ml', label: 'മലയാളം (Malayalam)', flag: '🥥' }
  ],

  avatars: [
    { id: 'peacock', emoji: '🦚', name: 'Mayur the Peacock' },
    { id: 'elephant', emoji: '🐘', name: 'Gaja the Baby Elephant' },
    { id: 'tiger', emoji: '🐯', name: 'Sheru the Cub' },
    { id: 'monkey', emoji: '🐒', name: 'Kapi the Explorer' },
    { id: 'rocket', emoji: '🚀', name: 'Arya the Space Kid' },
    { id: 'dolphin', emoji: '🐬', name: 'Neer the Dolphin' }
  ],

  // 13 SWAR (Vowels)
  swar: [
    {
      id: 'a',
      letter: 'अ',
      ttsText: 'अ',
      roman: 'a',
      soundHint: '"u" in cup / "a" in America',
      bridge: { ta: 'அ', te: 'అ', kn: 'ಅ', ml: 'അ' },
      wordHindi: 'अनार',
      wordRoman: 'Anaar',
      wordMeaning: 'Pomegranate',
      emoji: '🍎',
      shapeFamily: 'Number 3 Family',
      shapeTrick: 'Write number 3, give it a belly belt (-), a standing stick (|), and a roof on top!',
      breathType: 'Short Vowel (1 clap 👏)',
      mouthZone: 'Open Throat'
    },
    {
      id: 'aa',
      letter: 'आ',
      ttsText: 'आ',
      roman: 'aa',
      soundHint: '"aa" in father (open wide!)',
      bridge: { ta: 'ஆ', te: 'ఆ', kn: 'ಆ', ml: 'ആ' },
      wordHindi: 'आम',
      wordRoman: 'Aam',
      wordMeaning: 'Sweet Mango',
      emoji: '🥭',
      shapeFamily: 'Number 3 Family',
      shapeTrick: 'It is just "अ" holding an EXTRA stick (|) for a longer "Aaaa" sound!',
      breathType: 'Long Vowel (2 claps 👏👏)',
      mouthZone: 'Wide Open Mouth'
    },
    {
      id: 'i',
      letter: 'इ',
      ttsText: 'इ',
      roman: 'i',
      soundHint: '"i" in sit / idli',
      bridge: { ta: 'இ', te: 'ఇ', kn: 'ಇ', ml: 'ഇ' },
      wordHindi: 'इडली',
      wordRoman: 'Idli',
      wordMeaning: 'Fluffy Idli',
      emoji: '🍽️',
      shapeFamily: 'S-Snake Family',
      shapeTrick: 'Looks like a hanging S-snake with a little curly tail at the bottom!',
      breathType: 'Short Vowel (1 clap 👏)',
      mouthZone: 'Smile Mouth'
    },
    {
      id: 'ee',
      letter: 'ई',
      ttsText: 'ई',
      roman: 'ee',
      soundHint: '"ee" in see / jeep',
      bridge: { ta: 'ஈ', te: 'ఈ', kn: 'ಈ', ml: 'ഈ' },
      wordHindi: 'ईंट',
      wordRoman: 'Eent',
      wordMeaning: 'Red Brick (or ईद - Eid)',
      emoji: '🧱',
      shapeFamily: 'S-Snake Family',
      shapeTrick: 'Same S-snake as "इ", PLUS a curly crown feather on top of its roof!',
      breathType: 'Long Vowel (2 claps 👏👏)',
      mouthZone: 'Big Smile Mouth'
    },
    {
      id: 'u',
      letter: 'उ',
      ttsText: 'उ',
      roman: 'u',
      soundHint: '"u" in put / push',
      bridge: { ta: 'உ', te: 'ఉ', kn: 'ಉ', ml: 'ഉ' },
      wordHindi: 'उल्लू',
      wordRoman: 'Ullu',
      wordMeaning: 'Wise Owl',
      emoji: '🦉',
      shapeFamily: 'Number 3 Family',
      shapeTrick: 'Super easy! Just write number 3 and put a flat roof line over it!',
      breathType: 'Short Vowel (1 clap 👏)',
      mouthZone: 'Round Lips'
    },
    {
      id: 'oo',
      letter: 'ऊ',
      ttsText: 'ऊ',
      roman: 'oo',
      soundHint: '"oo" in moon / cool',
      bridge: { ta: 'ஊ', te: 'ఊ', kn: 'ಊ', ml: 'ഊ' },
      wordHindi: 'ऊँट',
      wordRoman: 'Oont',
      wordMeaning: 'Desert Camel',
      emoji: '🐪',
      shapeFamily: 'Number 3 Family',
      shapeTrick: 'It is number 3 ("उ") with a cute puppy tail sticking out of its middle!',
      breathType: 'Long Vowel (2 claps 👏👏)',
      mouthZone: 'Pushed Round Lips'
    },
    {
      id: 'ri',
      letter: 'ऋ',
      ttsText: 'ऋषि',
      roman: 'ri',
      soundHint: '"ri" in rishi / river',
      bridge: { ta: 'ரி (ऋ)', te: 'ఋ', kn: 'ಋ', ml: 'ഋ' },
      wordHindi: 'ऋषि',
      wordRoman: 'Rishi',
      wordMeaning: 'Wise Sage',
      emoji: '🧘',
      shapeFamily: 'Special Star',
      shapeTrick: 'Looks like someone sitting cross-legged doing yoga beside a tree!',
      breathType: 'Crystal Vowel',
      mouthZone: 'Tongue Tap'
    },
    {
      id: 'e',
      letter: 'ए',
      ttsText: 'ए',
      roman: 'ay / e',
      soundHint: '"ay" in play / एक (Ek = One)',
      bridge: { ta: 'ஏ', te: 'ఏ', kn: 'ಏ', ml: 'ഏ' },
      wordHindi: 'एक',
      wordRoman: 'Ek',
      wordMeaning: 'Number One (1)',
      emoji: '1️⃣',
      shapeFamily: 'Lightning Leg Family',
      shapeTrick: 'Two standing lines where the left leg kicks down diagonally like a slide!',
      breathType: 'Smooth Vowel',
      mouthZone: 'Mid Smile'
    },
    {
      id: 'ai',
      letter: 'ऐ',
      ttsText: 'ऐ',
      roman: 'ai',
      soundHint: '"ai" in ऐनक (Specs) / "a" in cat',
      bridge: { ta: 'ஐ', te: 'ఐ', kn: 'ಐ', ml: 'ഐ' },
      wordHindi: 'ऐनक',
      wordRoman: 'Ainak',
      wordMeaning: 'Cool Spectacles',
      emoji: '👓',
      shapeFamily: 'Lightning Leg Family',
      shapeTrick: 'It is "ए" wearing a single magic antenna balloon on top of its roof!',
      breathType: 'Wide Glide Vowel',
      mouthZone: 'Wide Smile'
    },
    {
      id: 'o',
      letter: 'ओ',
      ttsText: 'ओ',
      roman: 'o',
      soundHint: '"o" in go / boat',
      bridge: { ta: 'ஓ', te: 'ఓ', kn: 'ಓ', ml: 'ഓ' },
      wordHindi: 'ओस',
      wordRoman: 'Oas',
      wordMeaning: 'Morning Dewdrops',
      emoji: '💧',
      shapeFamily: 'Number 3 Family',
      shapeTrick: 'Take "आ" and pop ONE balloon antenna on top of the second stick!',
      breathType: 'Round Vowel',
      mouthZone: 'O-Shaped Lips'
    },
    {
      id: 'au',
      letter: 'औ',
      ttsText: 'औ',
      roman: 'au',
      soundHint: '"au" in auto /棒',
      bridge: { ta: 'ஔ', te: 'ఔ', kn: 'ಔ', ml: 'ഔ' },
      wordHindi: 'ऑटो / औज़ार',
      wordRoman: 'Auzaar',
      wordMeaning: 'Toolbox (sounds like Auto!)',
      emoji: '🛺',
      shapeFamily: 'Number 3 Family',
      shapeTrick: 'Take "आ" and pop TWO balloon antennas on top! More balloons = bigger sound!',
      breathType: 'Big Round Vowel',
      mouthZone: 'Big O-Mouth'
    },
    {
      id: 'am',
      letter: 'अं',
      ttsText: 'अंगूर',
      roman: 'am / an',
      soundHint: '"um" in umbrella / "an" in अंगूर',
      bridge: { ta: 'அம்', te: 'అం', kn: 'ಅಂ', ml: 'അം' },
      wordHindi: 'अंगूर',
      wordRoman: 'Angoor',
      wordMeaning: 'Juicy Grapes',
      emoji: '🍇',
      shapeFamily: 'Number 3 Family',
      shapeTrick: 'It is "अ" with a single Bindi (dot) floating like a grape above its head!',
      breathType: 'Nose Hum (Nasal)',
      mouthZone: 'Nose Hum 👃'
    },
    {
      id: 'aha',
      letter: 'अः',
      ttsText: 'अहा',
      roman: 'aha',
      soundHint: '"aha!" (laughing breath at the end)',
      bridge: { ta: 'அஃ', te: 'అః', kn: 'ಅಃ', ml: 'അഃ' },
      wordHindi: 'नमः / प्रातः',
      wordRoman: 'Namaha',
      wordMeaning: 'Morning Bow / Aha!',
      emoji: '🙏',
      shapeFamily: 'Number 3 Family',
      shapeTrick: 'It is "अ" with TWO dots (:) on its right side like two puffs of air!',
      breathType: 'Laughing Breath',
      mouthZone: 'Gentle Laugh 😄'
    }
  ],

  // VYANJAN (Consonants) grouped scientifically by Mouth Zone (Varga)
  vargas: [
    {
      id: 'ka_varga',
      title: 'Ka-Varga: The Throat Singers',
      subtitle: 'Put your hand on your throat — these sounds come right from the back of your throat!',
      color: '#FF6B6B',
      icon: '🦁',
      letters: [
        {
          id: 'ka',
          letter: 'क',
          ttsText: 'क',
          roman: 'ka',
          soundHint: '"k" in kite / kamal',
          bridge: { ta: 'க (k)', te: 'క', kn: 'ಕ', ml: 'ക' },
          wordHindi: 'कमल',
          wordRoman: 'Kamal',
          wordMeaning: 'Lotus Flower',
          emoji: '🪷',
          shapeTrick: 'Center stick with a round loop on the left (like a belly) and a curved tail on the right!',
          breathType: 'Soft Breath (No puff)',
          isDragon: false
        },
        {
          id: 'kha',
          letter: 'ख',
          ttsText: 'ख',
          roman: 'kha',
          soundHint: '"kh" with a strong puff of air!',
          bridge: { ta: 'க்+ஹ (kh)', te: 'ఖ', kn: 'ಖ', ml: 'ഖ' },
          wordHindi: 'खरगोश',
          wordRoman: 'Khargosh',
          wordMeaning: 'Bunny Rabbit',
          emoji: '🐰',
          shapeTrick: 'Looks like a curved bunny ear on the left hugging a round tummy next to a stick!',
          breathType: '🔥 Dragon Puff (Hold hand in front of mouth & feel air!)',
          isDragon: true
        },
        {
          id: 'ga',
          letter: 'ग',
          ttsText: 'ग',
          roman: 'ga',
          soundHint: '"g" in gate / garden',
          bridge: { ta: 'க (g)', te: 'గ', kn: 'ಗ', ml: 'ഗ' },
          wordHindi: 'गमला',
          wordRoman: 'Gamla',
          wordMeaning: 'Flower Pot',
          emoji: '🪴',
          shapeTrick: 'Left leg has a cute shoe (walking stick) and right leg stands tall next to it!',
          breathType: 'Soft Voice (No puff)',
          isDragon: false
        },
        {
          id: 'gha',
          letter: 'घ',
          ttsText: 'घ',
          roman: 'gha',
          soundHint: '"gh" in ghar (deep voice + puff of air!)',
          bridge: { ta: 'க்+ஹ (gh)', te: 'ఘ', kn: 'ಘ', ml: 'ഘ' },
          wordHindi: 'घर',
          wordRoman: 'Ghar',
          wordMeaning: 'Sweet Home',
          emoji: '🏠',
          shapeTrick: 'Looks like a backward 3 with a FULL roof over its head (like a house roof for Ghar!).',
          breathType: '🔥 Dragon Puff + Deep Voice',
          isDragon: true
        },
        {
          id: 'nga',
          letter: 'ङ',
          ttsText: 'अंग',
          roman: 'nga',
          soundHint: '"ng" in king / sing',
          bridge: { ta: 'ங', te: 'ఙ', kn: 'ಙ', ml: 'ങ' },
          wordHindi: 'रंग (ङ)',
          wordRoman: 'Rang',
          wordMeaning: 'Nasal "ng" sound',
          emoji: '🎨',
          shapeTrick: 'Looks like an S-curve with a tiny freckle dot (.) sitting beside its belly!',
          breathType: 'Nose Hum 👃',
          isDragon: false
        }
      ]
    },
    {
      id: 'cha_varga',
      title: 'Cha-Varga: The Roof-of-Mouth Whistlers',
      subtitle: 'Touch the flat middle of your tongue to the roof of your mouth (like saying Chai)!',
      color: '#FF9F43',
      icon: '🦚',
      letters: [
        {
          id: 'cha',
          letter: 'च',
          ttsText: 'च',
          roman: 'cha',
          soundHint: '"ch" in chai / चम्मच',
          bridge: { ta: 'ச (ch)', te: 'చ', kn: 'ಚ', ml: 'ച' },
          wordHindi: 'चाय / चम्मच',
          wordRoman: 'Chai / Chammach',
          wordMeaning: 'Hot Chai & Spoon',
          emoji: '☕',
          shapeTrick: 'Looks like a bird beak pointing left, scooped into a spoon bowl attached to a stick!',
          breathType: 'Soft Breath',
          isDragon: false
        },
        {
          id: 'chha',
          letter: 'छ',
          ttsText: 'छ',
          roman: 'chha',
          soundHint: '"chh" with a big sneeze puff!',
          bridge: { ta: 'ச்+ஹ (chh)', te: 'ఛ', kn: 'ಛ', ml: 'ഛ' },
          wordHindi: 'छतरी',
          wordRoman: 'Chhatri',
          wordMeaning: 'Rain Umbrella',
          emoji: '☂️',
          shapeTrick: 'Reverse 3 that curls up into a little loop at the top touching a tiny umbrella handle!',
          breathType: '🔥 Dragon Puff',
          isDragon: true
        },
        {
          id: 'ja',
          letter: 'ज',
          ttsText: 'ज',
          roman: 'ja',
          soundHint: '"j" in jam / ship (jahaaz)',
          bridge: { ta: 'ஜ', te: 'జ', kn: 'ಜ', ml: 'ജ' },
          wordHindi: 'जहाज़',
          wordRoman: 'Jahaaz',
          wordMeaning: 'Big Ship',
          emoji: '🚢',
          shapeTrick: 'Looks like the front prow of a ship sailing left, hooked to a straight mast!',
          breathType: 'Soft Voice',
          isDragon: false
        },
        {
          id: 'jha',
          letter: 'झ',
          ttsText: 'झ',
          roman: 'jha',
          soundHint: '"jh" with a deep windy puff!',
          bridge: { ta: 'ஜ்+ஹ (jh)', te: 'ఝ', kn: 'ಝ', ml: 'ഝ' },
          wordHindi: 'झंडा',
          wordRoman: 'Jhanda',
          wordMeaning: 'Indian Flag',
          emoji: '🇮🇳',
          shapeTrick: 'It is "इ" (S-snake) holding onto a flagpole (|) with a connector belt!',
          breathType: '🔥 Dragon Puff',
          isDragon: true
        },
        {
          id: 'nya',
          letter: 'ञ',
          ttsText: 'ञ',
          roman: 'nya',
          soundHint: '"ny" in canyon / मंच',
          bridge: { ta: 'ஞ', te: 'ఞ', kn: 'ಞ', ml: 'ഞ' },
          wordHindi: 'मंच (ञ)',
          wordRoman: 'Manch',
          wordMeaning: 'Stage (Nasal ny)',
          emoji: '🎭',
          shapeTrick: 'Looks like a backward C lobster claw connected to a standing stick!',
          breathType: 'Nose Hum 👃',
          isDragon: false
        }
      ]
    },
    {
      id: 'ta_retroflex',
      title: 'Ta-Varga: The Curled-Tongue Drum Beats',
      subtitle: 'Curl your tongue tip BACK to tap the roof of your mouth — just like South Indian ड/ट (Retroflex)!',
      color: '#10AC84',
      icon: '🥁',
      letters: [
        {
          id: 'ta_hard',
          letter: 'ट',
          ttsText: 'ट',
          roman: 'ṭa',
          soundHint: 'Hard "T" in Tomato / Auto',
          bridge: { ta: 'ட (t)', te: 'ట', kn: 'ಟ', ml: 'ട' },
          wordHindi: 'टमाटर',
          wordRoman: 'Tamatar',
          wordMeaning: 'Red Tomato',
          emoji: '🍅',
          shapeTrick: 'A tiny stem hanging down into a round C-shaped tomato!',
          breathType: 'Hard Tap (Curled Tongue)',
          isDragon: false
        },
        {
          id: 'tha_hard',
          letter: 'ठ',
          ttsText: 'ठ',
          roman: 'ṭha',
          soundHint: 'Hard "Th" with a puff of air!',
          bridge: { ta: 'ட்+ஹ', te: 'ఠ', kn: 'ಠ', ml: 'ഠ' },
          wordHindi: 'ठंडा',
          wordRoman: 'Thanda',
          wordMeaning: 'Ice Cold Drink',
          emoji: '🧊',
          shapeTrick: 'Start like "ट", but close the circle completely into a round ice ball (O)!',
          breathType: '🔥 Dragon Puff + Curled Tongue',
          isDragon: true
        },
        {
          id: 'da_hard',
          letter: 'ड',
          ttsText: 'ड',
          roman: 'ḍa',
          soundHint: 'Hard "D" in Dosa / Drum!',
          bridge: { ta: 'ட (d)', te: 'డ', kn: 'ಡ', ml: 'ഡ' },
          wordHindi: 'डोसा / डमरू',
          wordRoman: 'Dosa / Damru',
          wordMeaning: 'Crispy Dosa & Drum',
          emoji: '🥞',
          shapeTrick: 'Looks like a dancing S-snake WITHOUT a tail at the bottom (unlike इ)!',
          breathType: 'Hard Voice (Curled Tongue)',
          isDragon: false
        },
        {
          id: 'dha_hard',
          letter: 'ढ',
          ttsText: 'ढ',
          roman: 'ḍha',
          soundHint: 'Hard "Dh" in Dhokla / Drum lid!',
          bridge: { ta: 'ட்+ஹ (dh)', te: 'ఢ', kn: 'ಢ', ml: 'ഢ' },
          wordHindi: 'ढोल / ढक्कन',
          wordRoman: 'Dhol / Dhakkan',
          wordMeaning: 'Big Dhol Drum',
          emoji: '🥁',
          shapeTrick: 'Looks just like "ट" (Tomato), EXCEPT its bottom tip curls inside into a tiny dot loop!',
          breathType: '🔥 Dragon Puff + Curled Tongue',
          isDragon: true
        },
        {
          id: 'na_hard',
          letter: 'ण',
          ttsText: 'ण',
          roman: 'ṇa',
          soundHint: 'Curled-tongue "N" (like इन बाण / गणपति)',
          bridge: { ta: 'ண', te: 'ణ', kn: 'ಣ', ml: 'ണ' },
          wordHindi: 'गणपति (ण)',
          wordRoman: 'Ganapati',
          wordMeaning: 'Curled-tongue N in Ganapati',
          emoji: '🐘',
          shapeTrick: 'A U-cup hanging from the roof with a standing stick right beside it!',
          breathType: 'Curled Nose Hum 👃',
          isDragon: false
        }
      ]
    },
    {
      id: 'ta_dental',
      title: 'Tha-Varga: The Gentle Tooth Touchers',
      subtitle: 'Touch the tip of your tongue gently against the back of your TOP TEETH (like Tamil த / Telugu త)!',
      color: '#2E86DE',
      icon: '🍉',
      letters: [
        {
          id: 'ta_soft',
          letter: 'त',
          ttsText: 'त',
          roman: 'ta (soft)',
          soundHint: 'Soft tooth "t" in तितली / Thali',
          bridge: { ta: 'த (t)', te: 'త', kn: 'ತ', ml: 'ത' },
          wordHindi: 'तितली / तरबूज़',
          wordRoman: 'Titli',
          wordMeaning: 'Colorful Butterfly',
          emoji: '🦋',
          shapeTrick: 'A standing stick on the right with one curved butterfly leg kicking out on the left!',
          breathType: 'Soft Tooth Touch',
          isDragon: false
        },
        {
          id: 'tha_soft',
          letter: 'थ',
          ttsText: 'थ',
          roman: 'tha (soft)',
          soundHint: 'Soft tooth "th" + puff (like Thali / थरमस)',
          bridge: { ta: 'த்+ஹ', te: 'థ', kn: 'ಥ', ml: 'ഥ' },
          wordHindi: 'थाली',
          wordRoman: 'Thaali',
          wordMeaning: 'Lunch Thali Plate',
          emoji: '🍛',
          shapeTrick: 'Starts with a tiny circle loop at the top left, swings down, and hooks to a stick (gap in roof!).',
          breathType: '🔥 Dragon Puff + Tooth Touch',
          isDragon: true
        },
        {
          id: 'da_soft',
          letter: 'द',
          ttsText: 'द',
          roman: 'da (soft)',
          soundHint: '"th" in "this / mother" (Soft D in Dahi / Doodh)',
          bridge: { ta: 'த (d)', te: 'ద', kn: 'ದ', ml: 'ദ' },
          wordHindi: 'दूध / दही',
          wordRoman: 'Doodh / Dahi',
          wordMeaning: 'Milk & Curd',
          emoji: '🥛',
          shapeTrick: 'Looks like "ट" (Tomato) WITH a little tail kicking down at the bottom!',
          breathType: 'Soft Tooth Voice',
          isDragon: false
        },
        {
          id: 'dha_soft',
          letter: 'ध',
          ttsText: 'ध',
          roman: 'dha (soft)',
          soundHint: 'Soft "dh" + puff (like Dhanush / Dhaniya)',
          bridge: { ta: 'த்+ஹ (dh)', te: 'ధ', kn: 'ಧ', ml: 'ധ' },
          wordHindi: 'धनुष',
          wordRoman: 'Dhanush',
          wordMeaning: 'Golden Bow',
          emoji: '🏹',
          shapeTrick: 'CAREFUL! Looks like "घ" (Ghar), EXCEPT it has a curly loop on the left and a GAP in its roof!',
          breathType: '🔥 Dragon Puff + Tooth Voice',
          isDragon: true
        },
        {
          id: 'na_soft',
          letter: 'न',
          ttsText: 'न',
          roman: 'na',
          soundHint: '"n" in नारियल (Coconut) / Name',
          bridge: { ta: 'ந / ன', te: 'న', kn: 'ನ', ml: 'ന' },
          wordHindi: 'नारियल',
          wordRoman: 'Nariyal',
          wordMeaning: 'Fresh Coconut',
          emoji: '🥥',
          shapeTrick: 'Looks like a water tap faucet sticking out to the left with a round drop at the tip!',
          breathType: 'Tooth Nose Hum 👃',
          isDragon: false
        }
      ]
    },
    {
      id: 'pa_varga',
      title: 'Pa-Varga: The Lip Poppers',
      subtitle: 'Press both lips together and POP them open! Super fun and easy!',
      color: '#8854D0',
      icon: '🪁',
      letters: [
        {
          id: 'pa',
          letter: 'प',
          ttsText: 'प',
          roman: 'pa',
          soundHint: '"p" in पतंग / Pani (Water)',
          bridge: { ta: 'ப (p)', te: 'ప', kn: 'ಪ', ml: 'പ' },
          wordHindi: 'पतंग / पानी',
          wordRoman: 'Patang / Paani',
          wordMeaning: 'Flying Kite & Water',
          emoji: '🪁',
          shapeTrick: 'Looks like the English letter "U" hanging onto a straight stick on the right!',
          breathType: 'Soft Lip Pop',
          isDragon: false
        },
        {
          id: 'pha',
          letter: 'फ',
          ttsText: 'फ',
          roman: 'pha / fa',
          soundHint: '"ph" with lip puff (Phal = Fruit)',
          bridge: { ta: 'ஃப (ph)', te: 'ఫ', kn: 'ಫ', ml: 'ഫ' },
          wordHindi: 'फल / फूल',
          wordRoman: 'Phal / Phool',
          wordMeaning: 'Fruits & Flowers',
          emoji: '🍓',
          shapeTrick: 'It is just "प" (U + stick) with a drooping fruit tail hanging off the right side!',
          breathType: '🔥 Dragon Lip Puff',
          isDragon: true
        },
        {
          id: 'ba',
          letter: 'ब',
          ttsText: 'ब',
          roman: 'ba',
          soundHint: '"b" in बस (Bus) / बंदर (Monkey)',
          bridge: { ta: 'ப (b)', te: 'బ', kn: 'ಬ', ml: 'ബ' },
          wordHindi: 'बस / बंदर',
          wordRoman: 'Bus / Bandar',
          wordMeaning: 'School Bus & Monkey',
          emoji: '🚌',
          shapeTrick: 'A round belly on a stick WITH a seatbelt slash (/) across its tummy! (B for Bus = Seatbelt!)',
          breathType: 'Soft Lip Voice',
          isDragon: false
        },
        {
          id: 'bha',
          letter: 'भ',
          ttsText: 'भ',
          roman: 'bha',
          soundHint: '"bh" in Bhalu (Bear) / Bharat',
          bridge: { ta: 'ப்+ஹ (bh)', te: 'భ', kn: 'ಭ', ml: 'ഭ' },
          wordHindi: 'भालू',
          wordRoman: 'Bhalu',
          wordMeaning: 'Cuddly Bear',
          emoji: '🐻',
          shapeTrick: 'Looks like "म", EXCEPT it has a round bear-ear loop at the top-left and a GAP in its roof!',
          breathType: '🔥 Dragon Lip Puff',
          isDragon: true
        },
        {
          id: 'ma',
          letter: 'म',
          ttsText: 'म',
          roman: 'ma',
          soundHint: '"m" in मोर (Peacock) / Amma',
          bridge: { ta: 'ம', te: 'म/మ', kn: 'ಮ', ml: 'മ' },
          wordHindi: 'मोर / मछली',
          wordRoman: 'Mor / Machhli',
          wordMeaning: 'Dancing Peacock',
          emoji: '🦚',
          shapeTrick: 'Drop down, loop the corner, go across to the stick — with a FULL roof on top!',
          breathType: 'Lip Nose Hum 👃',
          isDragon: false
        }
      ]
    },
    {
      id: 'ya_varga',
      title: 'The Smooth Gliders (य, र, ल, व)',
      subtitle: 'These 4 friendly letters glide smoothly like wind and water — just like या, रा, ला, वा in South Indian languages!',
      color: '#0FB9B1',
      icon: '🚂',
      letters: [
        {
          id: 'ya',
          letter: 'य',
          ttsText: 'य',
          roman: 'ya',
          soundHint: '"y" in यान (Rocket) / Yes',
          bridge: { ta: 'ய', te: 'య', kn: 'ಯ', ml: 'യ' },
          wordHindi: 'यान',
          wordRoman: 'Yaan',
          wordMeaning: 'Space Rocket',
          emoji: '🚀',
          shapeTrick: 'Curves in on the left like a moon, scoops under like a cup, and joins a stick!',
          breathType: 'Smooth Glide',
          isDragon: false
        },
        {
          id: 'ra',
          letter: 'र',
          ttsText: 'र',
          roman: 'ra',
          soundHint: '"r" in रेल (Train) / Raja',
          bridge: { ta: 'ர', te: 'ర', kn: 'ರ', ml: 'ര' },
          wordHindi: 'रेल / राजा',
          wordRoman: 'Rail / Raja',
          wordMeaning: 'Choo-Choo Train',
          emoji: '🚂',
          shapeTrick: 'Looks like the number 2 sliding down a ramp!',
          breathType: 'Rolling Tongue',
          isDragon: false
        },
        {
          id: 'la',
          letter: 'ल',
          ttsText: 'ल',
          roman: 'la',
          soundHint: '"l" in लड्डू (Laddu) / Lattu',
          bridge: { ta: 'ல', te: 'ల', kn: 'ಲ', ml: 'ല' },
          wordHindi: 'लड्डू',
          wordRoman: 'Laddu',
          wordMeaning: 'Sweet Golden Laddu',
          emoji: '🟡',
          shapeTrick: 'Looks like a heart/M-wave jumping onto a standing stick on the right!',
          breathType: 'Liquid Tongue',
          isDragon: false
        },
        {
          id: 'va',
          letter: 'व',
          ttsText: 'व',
          roman: 'va / wa',
          soundHint: '"v" in वन (Forest) / Vada!',
          bridge: { ta: 'வ', te: 'వ', kn: 'ವ', ml: 'വ' },
          wordHindi: 'वड़ा / वन',
          wordRoman: 'Vada / Van',
          wordMeaning: 'Crispy Medu Vada & Forest',
          emoji: '🍩',
          shapeTrick: 'A round Vada circle attached to a stick — NO slash inside (unlike ब)!',
          breathType: 'Lip-Tooth Glide',
          isDragon: false
        }
      ]
    },
    {
      id: 'sha_varga',
      title: 'Wind, Whistle & Superhero Combos',
      subtitle: 'The 3 "S/Sh" whistles, the Big Breath "Ha", and the 3 Superhero Combined Letters!',
      color: '#F368E0',
      icon: '🦁',
      letters: [
        {
          id: 'sha',
          letter: 'श',
          ttsText: 'श',
          roman: 'sha',
          soundHint: 'Soft "sh" in शेर (Lion) / Sugar',
          bridge: { ta: 'ஶ', te: 'శ', kn: 'ಶ', ml: 'ശ' },
          wordHindi: 'शेर',
          wordRoman: 'Sher',
          wordMeaning: 'Roaring Lion',
          emoji: '🦁',
          shapeTrick: 'Starts with a curly loop at the top like a lion mane ("2" with a loop) + standing stick!',
          breathType: 'Soft Whistle',
          isDragon: true
        },
        {
          id: 'shha',
          letter: 'ष',
          ttsText: 'ष',
          roman: 'ṣha',
          soundHint: 'Curled-tongue "sh" in षट्कोण (Hexagon)',
          bridge: { ta: 'ஷ', te: 'ష', kn: 'ಷ', ml: 'ഷ' },
          wordHindi: 'षट्कोण',
          wordRoman: 'Shatkon',
          wordMeaning: 'Six-Sided Star',
          emoji: '✡️',
          shapeTrick: 'It is simply "प" (Kite letter) with a diagonal slash (/) across its U-belly!',
          breathType: 'Curled Whistle',
          isDragon: true
        },
        {
          id: 'sa',
          letter: 'स',
          ttsText: 'स',
          roman: 'sa',
          soundHint: '"s" in समोसा (Samosa) / Sun',
          bridge: { ta: 'ஸ', te: 'స', kn: 'ಸ', ml: 'സ' },
          wordHindi: 'समोसा / सेब',
          wordRoman: 'Samosa / Seb',
          wordMeaning: 'Yummy Samosa & Apple',
          emoji: '🥟',
          shapeTrick: 'It is "र" (Train letter) tied to a standing stick with a little belt in the middle!',
          breathType: 'Hissing Snake 🐍',
          isDragon: false
        },
        {
          id: 'ha',
          letter: 'ह',
          ttsText: 'ह',
          roman: 'ha',
          soundHint: '"h" in हाथी (Elephant) / Happy',
          bridge: { ta: 'ஹ', te: 'హ', kn: 'ಹ', ml: 'ഹ' },
          wordHindi: 'हाथी',
          wordRoman: 'Haathi',
          wordMeaning: 'Friendly Elephant',
          emoji: '🐘',
          shapeTrick: 'Looks like a curved elephant trunk curling around a little tummy curl!',
          breathType: '🔥 Warm Laughing Breath',
          isDragon: true
        },
        {
          id: 'ksha',
          letter: 'क्ष',
          ttsText: 'क्ष',
          roman: 'ksha',
          soundHint: '"ksh" in कक्षा (Classroom) = क + ष',
          bridge: { ta: 'க்ஷ', te: 'క్ష', kn: 'ಕ್ಷ', ml: 'ക്ഷ' },
          wordHindi: 'कक्षा',
          wordRoman: 'Kaksha',
          wordMeaning: 'School Classroom',
          emoji: '🏫',
          shapeTrick: 'Superhero fusion of क + ष! Has a curly S-loop on the left tied to a stick!',
          breathType: '⚡ Superhero Combo',
          isDragon: true
        },
        {
          id: 'tra',
          letter: 'त्र',
          ttsText: 'त्र',
          roman: 'tra',
          soundHint: '"tr" in मित्र (Friend) = त + र',
          bridge: { ta: 'த்ர', te: 'త్ర', kn: 'ತ್ರ', ml: 'ത്ര' },
          wordHindi: 'मित्र / त्रिशूल',
          wordRoman: 'Mitra',
          wordMeaning: 'Best Friend',
          emoji: '🤝',
          shapeTrick: 'Superhero fusion of त + र! Two diagonal laser beams shooting left from a stick!',
          breathType: '⚡ Superhero Combo',
          isDragon: false
        },
        {
          id: 'gya',
          letter: 'ज्ञ',
          ttsText: 'ज्ञ',
          roman: 'gya / jnya',
          soundHint: '"gya" in ज्ञान (Knowledge)',
          bridge: { ta: 'ஜ்ஞ / க்ய', te: 'జ్ఞ', kn: 'ಜ್ಞ', ml: 'ജ്ഞ' },
          wordHindi: 'ज्ञान / ज्ञानी',
          wordRoman: 'Gyaan',
          wordMeaning: 'Super Knowledge',
          emoji: '🧠',
          shapeTrick: 'Looks like "ज" (Ship) with a curly tail dropping down at the front!',
          breathType: '⚡ Superhero Combo',
          isDragon: false
        }
      ]
    }
  ],

  // LOOK-ALIKE DETECTIVE PAIRS (The #1 secret to never getting confused!)
  lookAlikePairs: [
    {
      id: 'ba_va',
      title: 'The Bus & The Vada Twins',
      left: 'ब',
      right: 'व',
      leftLabel: 'ब (Ba - Bus 🚌)',
      rightLabel: 'व (Va - Vada 🍩)',
      secretTrick: 'Both have a round circle on a stick! When you ride a BUS (ब), you wear a SEATBELT slash (/) across your tummy! A VADA (व) has an empty round tummy!',
      quizQuestion: 'Which letter wears a SEATBELT slash inside its tummy for BUS (बस)?',
      correctAnswer: 'ब'
    },
    {
      id: 'pa_shha',
      title: 'The Kite & The Star Twins',
      left: 'प',
      right: 'ष',
      leftLabel: 'प (Pa - Patang 🪁)',
      rightLabel: 'ष (Sha - Shatkon ✡️)',
      secretTrick: '"प" has a clean open U-cup. Cross a diagonal sword (/) inside "प" and it becomes "ष" (Shatkon)!',
      quizQuestion: 'Which letter is a clean open U-cup for PATANG (पतंग - Kite)?',
      correctAnswer: 'प'
    },
    {
      id: 'gha_dha',
      title: 'The House & The Bow Twins',
      left: 'घ',
      right: 'ध',
      leftLabel: 'घ (Gha - Ghar 🏠)',
      rightLabel: 'ध (Dha - Dhanush 🏹)',
      secretTrick: 'A HOUSE (घर - घ) needs a FULL ROOF on top so rain doesn\'t enter! A BOW (धनुष - ध) has a curly string loop on the left and a GAP in the roof!',
      quizQuestion: 'Which letter has a FULL ROOF on top like a real HOUSE (घर)?',
      correctAnswer: 'घ'
    },
    {
      id: 'ma_bha',
      title: 'The Peacock & The Bear Twins',
      left: 'म',
      right: 'भ',
      leftLabel: 'म (Ma - Mor 🦚)',
      rightLabel: 'भ (Bha - Bhalu 🐻)',
      secretTrick: '"म" (Mor) has a flat FULL ROOF on top. "भ" (Bhalu the Bear) has a round bear-ear loop at the top-left and a GAP in its roof!',
      quizQuestion: 'Which letter has a round BEAR-EAR loop at the top-left for BHALU (भालू)?',
      correctAnswer: 'भ'
    },
    {
      id: 'ta_da_dha',
      title: 'The Tomato, Milk & Drum Cousins',
      left: 'ट',
      right: 'द',
      leftLabel: 'ट (Ta - Tamatar 🍅)',
      rightLabel: 'द (Da - Doodh 🥛)',
      secretTrick: 'A TOMATO (ट) is smoothly round at the bottom. Pour MILK (द - Doodh) and a little drop tail drips down from the bottom!',
      quizQuestion: 'Which letter has a little drip-tail at the bottom for DOODH (दूध - Milk)?',
      correctAnswer: 'द'
    },
    {
      id: 'da_i',
      title: 'The Dosa & The Idli Snakes',
      left: 'ड',
      right: 'इ',
      leftLabel: 'ड (Da - Dosa 🥞)',
      rightLabel: 'इ (I - Idli 🍽️)',
      secretTrick: '"ड" (Dosa) is a simple S-snake. Give that S-snake a curly knot tail at the bottom and it becomes "इ" (Idli)!',
      quizQuestion: 'Which S-snake has a curly knot tail at the bottom for IDLI (इडली)?',
      correctAnswer: 'इ'
    },
    {
      id: 'ka_pha',
      title: 'The Lotus & The Fruit Cousins',
      left: 'क',
      right: 'फ',
      leftLabel: 'क (Ka - Kamal 🪷)',
      rightLabel: 'फ (Pha - Phal 🍓)',
      secretTrick: '"क" has a CLOSED round loop on the left side. "फ" starts open from the top like a U-cup ("प") with a tail on the right!',
      quizQuestion: 'Which letter has a CLOSED round loop on its left side for KAMAL (कमल)?',
      correctAnswer: 'क'
    }
  ],

  // QUEST ISLANDS (Structured progression for an 8-year-old)
  questIslands: [
    {
      id: 'island_1',
      number: 1,
      title: 'Mango Island: The "Number 3" Vowels',
      subtitle: 'Did you know 6 Hindi vowels are secretly built from the number 3? Master them in 3 minutes!',
      emoji: '🥭',
      themeColor: '#FF9F43',
      bgGradient: 'linear-gradient(135deg, #FFF3CD 0%, #FFE082 100%)',
      letterIds: ['u', 'oo', 'a', 'aa', 'o', 'au', 'am', 'aha'],
      rewardSticker: { id: 'mango_king', emoji: '🥭', name: 'Mango Island Hero' },
      wordsToBuild: [
        { hindi: 'आओ', roman: 'Aao', meaning: 'Come here! 👋', letters: ['आ', 'ओ'], distractors: ['उ', 'अं'] },
        { hindi: 'आम', roman: 'Aam', meaning: 'Sweet Mango 🥭', letters: ['आ', 'म'], distractors: ['उ', 'ओ'] }
      ]
    },
    {
      id: 'island_2',
      number: 2,
      title: 'Idli Lagoon: Snakes & Horned Vowels',
      subtitle: 'Meet the S-snake vowels (इ, ई) and the Balloon-Crown vowels (ए, ऐ, ऋ)!',
      emoji: '🍽️',
      themeColor: '#00CEC9',
      bgGradient: 'linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 100%)',
      letterIds: ['i', 'ee', 'ri', 'e', 'ai'],
      rewardSticker: { id: 'idli_champ', emoji: '🍽️', name: 'Idli Lagoon Master' },
      wordsToBuild: [
        { hindi: 'एक', roman: 'Ek', meaning: 'Number One 1️⃣', letters: ['ए', 'क'], distractors: ['इ', 'ऐ'] },
        { hindi: 'ईंट', roman: 'Eent', meaning: 'Red Brick 🧱', letters: ['ईं', 'ट'], distractors: ['ए', 'उ'] }
      ]
    },
    {
      id: 'island_3',
      number: 3,
      title: 'Lotus Jungle: Throat & Palate Friends',
      subtitle: 'Learn क, ख, ग, घ & च, छ, ज, झ with the Dragon Breath trick!',
      emoji: '🪷',
      themeColor: '#FF6B6B',
      bgGradient: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)',
      letterIds: ['ka', 'kha', 'ga', 'gha', 'cha', 'chha', 'ja', 'jha'],
      rewardSticker: { id: 'lotus_knight', emoji: '🪷', name: 'Lotus Jungle Knight' },
      wordsToBuild: [
        { hindi: 'गज', roman: 'Gaj', meaning: 'Royal Elephant 🐘', letters: ['ग', 'ज'], distractors: ['क', 'च'] },
        { hindi: 'चख', roman: 'Chakh', meaning: 'Taste It! 😋', letters: ['च', 'ख'], distractors: ['घ', 'छ'] },
        { hindi: 'जग', roman: 'Jag', meaning: 'Water Jug  pitcher', letters: ['ज', 'ग'], distractors: ['ख', 'झ'] }
      ]
    },
    {
      id: 'island_4',
      number: 4,
      title: 'Dosa Drum Temple: Curled vs Tooth Tap',
      subtitle: 'Feel the difference between Curled-Tongue (ट, ठ, ड, ढ) and Tooth-Touch (त, थ, द, ध, न)!',
      emoji: '🥁',
      themeColor: '#10AC84',
      bgGradient: 'linear-gradient(135deg, #E8F8F5 0%, #A3E4D7 100%)',
      letterIds: ['ta_hard', 'tha_hard', 'da_hard', 'dha_hard', 'ta_soft', 'tha_soft', 'da_soft', 'dha_soft', 'na_soft'],
      rewardSticker: { id: 'dosa_drummer', emoji: '🥁', name: 'Dosa Drum Legend' },
      wordsToBuild: [
        { hindi: 'छत', roman: 'Chhat', meaning: 'House Roof 🏠', letters: ['छ', 'त'], distractors: ['ट', 'थ'] },
        { hindi: 'धन', roman: 'Dhan', meaning: 'Treasure Coins 🪙', letters: ['ध', 'न'], distractors: ['द', 'ड'] },
        { hindi: 'तन', roman: 'Tan', meaning: 'Healthy Body 💪', letters: ['त', 'न'], distractors: ['ठ', 'ढ'] }
      ]
    },
    {
      id: 'island_5',
      number: 5,
      title: 'Peacock Palace: Lip Poppers & Gliders',
      subtitle: 'Pop your lips with प, फ, ब, भ, म and ride the train with य, र, ल, व!',
      emoji: '🦚',
      themeColor: '#8854D0',
      bgGradient: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)',
      letterIds: ['pa', 'pha', 'ba', 'bha', 'ma', 'ya', 'ra', 'la', 'va'],
      rewardSticker: { id: 'peacock_prince', emoji: '🦚', name: 'Peacock Palace Royalty' },
      wordsToBuild: [
        { hindi: 'घर', roman: 'Ghar', meaning: 'Sweet Home 🏠', letters: ['घ', 'र'], distractors: ['ध', 'ल'] },
        { hindi: 'फल', roman: 'Phal', meaning: 'Fresh Fruit 🍓', letters: ['फ', 'ल'], distractors: ['प', 'ब'] },
        { hindi: 'वन', roman: 'Van', meaning: 'Green Forest 🌳', letters: ['व', 'न'], distractors: ['ब', 'म'] },
        { hindi: 'कमल', roman: 'Kamal', meaning: 'Lotus Flower 🪷', letters: ['क', 'म', 'ल'], distractors: ['ब', 'र'] }
      ]
    },
    {
      id: 'island_6',
      number: 6,
      title: 'Lion Peak: Whistles & Superhero Combos',
      subtitle: 'Roar with श, ष, स, ह and unlock the 3 Superhero Combined Letters क्ष, त्र, ज्ञ!',
      emoji: '🦁',
      themeColor: '#F368E0',
      bgGradient: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD0 100%)',
      letterIds: ['sha', 'shha', 'sa', 'ha', 'ksha', 'tra', 'gya'],
      rewardSticker: { id: 'super_scholar', emoji: '👑', name: 'Varnamala Crown Champion' },
      wordsToBuild: [
        { hindi: 'बस', roman: 'Bus', meaning: 'School Bus 🚌', letters: ['ब', 'स'], distractors: ['व', 'श'] },
        { hindi: 'रस', roman: 'Ras', meaning: 'Sweet Juice 🧃', letters: ['र', 'स'], distractors: ['ह', 'ष'] },
        { hindi: 'हल', roman: 'Hal', meaning: 'Farmer Plough 🌾', letters: ['ह', 'ल'], distractors: ['इ', 'त्र'] },
        { hindi: 'शहद', roman: 'Shahad', meaning: 'Sweet Honey 🍯', letters: ['श', 'ह', 'द'], distractors: ['स', 'ट'] }
      ]
    }
  ],

  // All Collectible Stickers
  stickers: [
    { id: 'first_trace', emoji: '🎨', name: 'Rainbow Artist', desc: 'Traced your first Hindi letter!' },
    { id: 'mango_king', emoji: '🥭', name: 'Mango Island Hero', desc: 'Completed Island 1 (Number 3 Vowels)!' },
    { id: 'idli_champ', emoji: '🍽️', name: 'Idli Lagoon Master', desc: 'Completed Island 2 (Snake & Crown Vowels)!' },
    { id: 'lotus_knight', emoji: '🪷', name: 'Lotus Jungle Knight', desc: 'Completed Island 3 (Throat & Palate)!' },
    { id: 'dosa_drummer', emoji: '🥁', name: 'Dosa Drum Legend', desc: 'Completed Island 4 (Curled vs Tooth Tap)!' },
    { id: 'peacock_prince', emoji: '🦚', name: 'Peacock Palace Royalty', desc: 'Completed Island 5 (Lip Poppers & Gliders)!' },
    { id: 'super_scholar', emoji: '👑', name: 'Varnamala Champion', desc: 'Completed Island 6 (Whistles & Superheroes)!' },
    { id: 'twin_detective', emoji: '🕵️', name: 'Look-Alike Detective', desc: 'Solved the Look-Alike Twin Mystery!' },
    { id: 'boss_slayer', emoji: '⚡', name: 'Confusion Buster', desc: 'Won a round in the Arcade Quiz!' }
  ]
};

// Helper lookup map for all letters by ID or character
window.VARNAMALA_MAP = {};
window.ALL_LETTERS = [];

window.VARNAMALA_DATA.swar.forEach(item => {
  item.category = 'swar';
  item.vargaTitle = 'Swar (Musical Vowels)';
  item.themeColor = '#FF9F43';
  window.VARNAMALA_MAP[item.id] = item;
  window.VARNAMALA_MAP[item.letter] = item;
  window.ALL_LETTERS.push(item);
});

window.VARNAMALA_DATA.vargas.forEach(varga => {
  varga.letters.forEach(item => {
    item.category = 'vyanjan';
    item.vargaId = varga.id;
    item.vargaTitle = varga.title;
    item.themeColor = varga.color;
    window.VARNAMALA_MAP[item.id] = item;
    window.VARNAMALA_MAP[item.letter] = item;
    window.ALL_LETTERS.push(item);
  });
});
