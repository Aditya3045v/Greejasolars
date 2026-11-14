export type Bi = { hi: string; en: string };

export const CLINIC = {
  phone: "+91 00000 00000", // TODO: real number
  whatsapp: "910000000000", // TODO: country code + number, no symbols
  email: "hello@hmshomeopathy.example",
  town: { hi: "बहादुरगंज, ज़िला किशनगंज, बिहार", en: "Bahadurganj, Kishanganj, Bihar" } as Bi,
  landmark: { hi: "सटीक पता / लैंडमार्क यहाँ जोड़ें", en: "Add exact address / landmark here" } as Bi,
  hours: { hi: "सोम – शनि · सुबह 9:00 – शाम 7:00", en: "Mon – Sat · 9:00 AM – 7:00 PM" } as Bi,
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Bahadurganj+Kishanganj+Bihar",
  mapsEmbed: "https://maps.google.com/maps?q=Bahadurganj%2C%20Kishanganj%2C%20Bihar&z=13&output=embed",
};

export const CONDITIONS: { img: string; title: Bi; why: Bi; signs: Bi[]; }[] = [
  {
    img: "/images/grandma.jpg",
    title: { hi: "बच्चों की बार-बार होने वाली तकलीफ़ें", en: "Children's recurring ailments" },
    why: { hi: "नमी और बदलते मौसम में बच्चे जल्दी बीमार पड़ते हैं।", en: "Humidity and changing weather make children fall ill again and again." },
    signs: [{ hi: "बार-बार सर्दी-खाँसी, टॉन्सिल", en: "Frequent colds, cough, tonsillitis" }, { hi: "पेट दर्द, दस्त, भूख की कमी", en: "Stomach pain, loose motions, poor appetite" }, { hi: "कमज़ोरी और कम वज़न", en: "Weakness and low weight" }, { hi: "बिस्तर गीला करना", en: "Bed-wetting" }],
  },
  {
    img: "/images/hills.jpg",
    title: { hi: "एलर्जी, साइनस और साँस की तकलीफ़", en: "Allergy, sinus & breathing trouble" },
    why: { hi: "धूल, पराग, भूसे की धूल और बरसात की नमी इसे बढ़ाती है।", en: "Dust, pollen, husk dust and monsoon dampness make it worse." },
    signs: [{ hi: "छींकें, नाक बहना, बंद नाक", en: "Sneezing, runny or blocked nose" }, { hi: "पुरानी खाँसी, सीने में जकड़न", en: "Long-standing cough, chest tightness" }, { hi: "साइनस का भारीपन और सिरदर्द", en: "Sinus heaviness and headache" }, { hi: "मौसम बदलते ही दमे जैसी तकलीफ़", en: "Asthma-like symptoms with season change" }],
  },
  {
    img: "/images/hero-field.jpg",
    title: { hi: "त्वचा रोग और फंगल संक्रमण", en: "Skin & fungal infections" },
    why: { hi: "बरसात-बाढ़ के मौसम में खेत और पानी में काम, गीले कपड़ों से बढ़ता है।", en: "Work in fields and standing water and damp clothes during monsoon and floods." },
    signs: [{ hi: "दाद, खाज-खुजली", en: "Ringworm, itching" }, { hi: "एक्ज़िमा, फुंसी-मुंहासे", en: "Eczema, boils, acne" }, { hi: "रूसी और बाल झड़ना", en: "Dandruff and hair fall" }, { hi: "तलवों-उँगलियों में सड़न/दरारें", en: "Cracked or rotting feet and toes" }],
  },
  {
    img: "/images/herbs1.jpg",
    title: { hi: "पेट और पाचन की समस्याएँ", en: "Stomach & digestive problems" },
    why: { hi: "दूषित पानी, बाढ़ के बाद की गंदगी और मसालेदार खान-पान से।", en: "From contaminated water, post-flood hygiene issues and spicy diets." },
    signs: [{ hi: "एसिडिटी, गैस, खट्टी डकार", en: "Acidity, gas, sour belching" }, { hi: "कब्ज़ और बवासीर", en: "Constipation and piles" }, { hi: "दस्त-पेचिश के बाद कमज़ोरी", en: "Weakness after diarrhoea or dysentery" }, { hi: "भूख न लगना", en: "Loss of appetite" }],
  },
  {
    img: "/images/family.jpg",
    title: { hi: "महिलाओं की सेहत", en: "Women's health" },
    why: { hi: "पोषण की कमी, घर-खेती का भारी काम और तनाव से।", en: "Due to poor nutrition, heavy household and farm work, and stress." },
    signs: [{ hi: "अनियमित या दर्दनाक माहवारी, PCOS", en: "Irregular or painful periods, PCOS" }, { hi: "सफ़ेद पानी की शिकायत", en: "White discharge" }, { hi: "थकान, कमज़ोरी, खून की कमी जैसे लक्षण", en: "Fatigue, weakness, anaemia-like symptoms" }, { hi: "प्रसव के बाद कमज़ोरी, बाल झड़ना", en: "Post-delivery weakness, hair fall" }],
  },
  {
    img: "/images/elder.jpg",
    title: { hi: "जोड़ों का दर्द और बुज़ुर्गों की देखभाल", en: "Joint pain & elder care" },
    why: { hi: "मेहनत-मज़दूरी, नमी और ठंड से दर्द बढ़ता है।", en: "Hard physical work, dampness and cold increase pain." },
    signs: [{ hi: "घुटने, कमर और गर्दन का दर्द", en: "Knee, back and neck pain" }, { hi: "गठिया और जकड़न", en: "Arthritis and stiffness" }, { hi: "नींद की कमी, बेचैनी", en: "Poor sleep, restlessness" }, { hi: "BP-शुगर जैसे रोगों में सहायक देखभाल", en: "Supportive care alongside BP / sugar treatment" }],
  },
];

export const BENEFITS: { t: Bi; d: Bi }[] = [
  { t: { hi: "हर मरीज़ के लिए अलग दवा", en: "A remedy chosen for you" }, d: { hi: "एक ही बीमारी में भी दो लोगों की दवा अलग हो सकती है, क्योंकि चुनाव आपके लक्षण, स्वभाव और जीवनशैली देखकर होता है।", en: "Even for the same illness, two people can get different remedies, chosen by symptoms, temperament and lifestyle." } },
  { t: { hi: "सौम्य और आमतौर पर अच्छी तरह सहन होने वाली", en: "Gentle and generally well tolerated" }, d: { hi: "अत्यंत सूक्ष्म मात्रा की दवाएँ, जिन्हें बच्चे, गर्भवती महिलाएँ और बुज़ुर्ग भी डॉक्टर की सलाह से ले सकते हैं।", en: "Highly diluted medicines that children, pregnant women and the elderly can take under a doctor's guidance." } },
  { t: { hi: "सिर्फ़ लक्षण नहीं, कारण पर ध्यान", en: "Looks at the cause, not just symptoms" }, d: { hi: "बार-बार लौटने वाली तकलीफ़ों में शरीर की पूरी प्रवृत्ति को समझकर इलाज की योजना बनाई जाती है।", en: "For recurring problems, the plan is built around the body's overall tendency, not only the complaint." } },
  { t: { hi: "बच्चों के लिए आसान", en: "Easy for children" }, d: { hi: "मीठी गोलियाँ और बूँदें, जिन्हें बच्चे आसानी से ले लेते हैं — कड़वी दवा की ज़िद नहीं।", en: "Small sweet pills and drops that children take easily — no bitter-medicine battles." } },
  { t: { hi: "किफ़ायती, लंबे समय तक चलने वाला साथ", en: "Affordable, long-term support" }, d: { hi: "पुरानी तकलीफ़ों में भी साधारण खर्च पर नियमित देखभाल संभव है।", en: "Regular care for long-standing conditions at a modest cost." } },
  { t: { hi: "सामान्य इलाज के साथ पूरक", en: "Complements regular medicine" }, d: { hi: "आप अपनी चल रही दवाएँ जारी रखकर भी परामर्श ले सकते हैं — बस हमें बताइए।", en: "You can consult us while continuing your current medicines — just tell us about them." } },
];

export const STEPS: { t: Bi; d: Bi }[] = [
  { t: { hi: "बुक करें", en: "Book" }, d: { hi: "कॉल, WhatsApp या फ़ॉर्म से समय चुनें।", en: "Pick a slot by call, WhatsApp or the form." } },
  { t: { hi: "खुलकर बताइए", en: "Tell us everything" }, d: { hi: "45 मिनट या अधिक की आराम की बातचीत — लक्षण, नींद, भूख, मन, परिवार।", en: "A relaxed 45+ minute conversation — symptoms, sleep, appetite, mood, family." } },
  { t: { hi: "आपकी दवा", en: "Your remedy" }, d: { hi: "आपके लिए चुनी गई दवा और साफ़ निर्देश।", en: "A remedy chosen for you with clear instructions." } },
  { t: { hi: "फॉलो-अप", en: "Follow up" }, d: { hi: "क्लिनिक या WhatsApp पर समीक्षा, ज़रूरत हो तो बदलाव।", en: "Review in clinic or on WhatsApp, with changes if needed." } },
];

export const STORIES: { img: string; q: Bi; who: Bi }[] = [
  { img: "/images/grandma.jpg", q: { hi: "मेरे पोते को हर महीने सर्दी-खाँसी हो जाती थी। यहाँ डॉक्टर ने आराम से पूरी बात पूछी, और अब वह पहले से बहुत कम बीमार पड़ता है।", en: "My grandson caught a cold every month. The doctor listened patiently here, and he now falls sick far less." }, who: { hi: "दादी, बहादुरगंज (नमूना)", en: "Grandmother, Bahadurganj (sample)" } },
  { img: "/images/farmer.jpg", q: { hi: "बरसात में खेत के काम से पैरों में खुजली-दाद रहती थी। यहाँ इलाज और परहेज़ की सलाह से काफ़ी राहत मिली।", en: "Field work in monsoon left me with itching and ringworm. Treatment and advice here gave me good relief." }, who: { hi: "किसान, किशनगंज (नमूना)", en: "Farmer, Kishanganj (sample)" } },
  { img: "/images/family.jpg", q: { hi: "मासिक की परेशानी में किसी ने इतने भरोसे से बात नहीं की थी। फॉलो-अप WhatsApp पर भी हो जाता है, यह सबसे सुविधाजनक है।", en: "No one had spoken so reassuringly about my period problems. Follow-ups on WhatsApp are very convenient." }, who: { hi: "गृहिणी, ठाकुरगंज (नमूना)", en: "Homemaker, Thakurganj (sample)" } },
];

export const FAQS: { q: Bi; a: Bi }[] = [
  { q: { hi: "क्लिनिक कहाँ है और कैसे पहुँचें?", en: "Where is the clinic and how do I reach it?" }, a: { hi: "HMS होम्योपैथी सेंटर बहादुरगंज, किशनगंज (बिहार) में है। ठाकुरगंज, कोचाधामन, पोठिया, दिघलबैंक और आसपास के इलाक़ों से आसानी से पहुँचा जा सकता है। नीचे दिए नक़्शे से रास्ता देखें।", en: "HMS Homeopathy Center is in Bahadurganj, Kishanganj (Bihar), easy to reach from Thakurganj, Kochadhaman, Pothia, Dighalbank and nearby areas. See the map below for directions." } },
  { q: { hi: "होम्योपैथी का असर कितने दिन में दिखता है?", en: "How soon does homeopathy show results?" }, a: { hi: "यह तकलीफ़ और व्यक्ति पर निर्भर करता है। नई तकलीफ़ों में अक्सर जल्दी फ़र्क़ दिखता है, जबकि पुरानी बीमारियों में कुछ हफ़्ते से महीनों का नियमित इलाज लग सकता है। हम पहले दिन साफ़ बताते हैं।", en: "It depends on the problem and the person. Recent complaints often respond sooner; long-standing ones may need weeks to months of regular care. We explain this clearly on day one." } },
  { q: { hi: "क्या यह बच्चों और गर्भावस्था में सुरक्षित है?", en: "Is it suitable for children and pregnancy?" }, a: { hi: "होम्योपैथिक दवाएँ आमतौर पर सभी उम्र में दी जाती हैं। बच्चों, गर्भावस्था और स्तनपान के लिए डॉक्टर आपको व्यक्तिगत सलाह देंगे।", en: "Homeopathic remedies are commonly used at all ages. Your doctor will personalise advice for children, pregnancy and breastfeeding." } },
  { q: { hi: "क्या मैं अपनी चल रही दवाएँ जारी रखूँ?", en: "Should I continue my current medicines?" }, a: { hi: "डॉक्टर की सलाह के बिना कोई दवा बंद न करें, ख़ासकर BP, शुगर, दमा या दिल की दवाएँ। होम्योपैथी अक्सर सामान्य इलाज के साथ ली जाती है।", en: "Never stop prescribed medicines without medical advice, especially for BP, sugar, asthma or heart conditions. Homeopathy is often taken alongside regular treatment." } },
  { q: { hi: "परामर्श की फ़ीस कितनी है?", en: "What is the consultation fee?" }, a: { hi: "पहले परामर्श की फ़ीस (यहाँ अपनी फ़ीस जोड़ें) फ़ोन या WhatsApp पर बता दी जाती है, ताकि कोई अचरज न हो।", en: "The first consultation fee (add your fee here) is shared by phone or WhatsApp in advance, so there are no surprises." } },
  { q: { hi: "क्या WhatsApp या वीडियो पर परामर्श हो सकता है?", en: "Can I consult on WhatsApp or video?" }, a: { hi: "हाँ। जो मरीज़ अररिया, पूर्णिया या कटिहार जैसे दूर के इलाक़ों में हैं, वे फॉलो-अप वीडियो/WhatsApp पर ले सकते हैं।", en: "Yes. Patients in farther areas like Araria, Purnia or Katihar can take follow-ups on video or WhatsApp." } },
];

export const NEARBY: Bi[] = [
  { hi: "बहादुरगंज", en: "Bahadurganj" }, { hi: "ठाकुरगंज", en: "Thakurganj" }, { hi: "कोचाधामन", en: "Kochadhaman" }, { hi: "पोठिया", en: "Pothia" },
  { hi: "दिघलबैंक", en: "Dighalbank" }, { hi: "टेढ़ागाछ", en: "Terhagachh" }, { hi: "किशनगंज", en: "Kishanganj" }, { hi: "अररिया", en: "Araria" },
  { hi: "पूर्णिया", en: "Purnia" }, { hi: "कटिहार", en: "Katihar" },
];
