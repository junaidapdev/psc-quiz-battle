// The question bank.
// Each question: topic, question, options (4), answer (0-3), explanation, source.
// Add checked: false to a question if its answer is not confirmed yet.

const QUESTIONS = [
  // ---------- Kerala history ----------
  {
    topic: "കേരള ചരിത്രം",
    question: "കേരള സംസ്ഥാനം രൂപീകൃതമായത് ഏത് ദിവസമാണ്?",
    options: ["1956 നവംബർ 1", "1947 ഓഗസ്റ്റ് 15", "1949 ജൂലൈ 1", "1957 ഏപ്രിൽ 5"],
    answer: 0,
    explanation: "1956 നവംബർ 1-ന് കേരള സംസ്ഥാനം രൂപീകൃതമായി; ഈ ദിവസം കേരളപ്പിറവിയായി ആഘോഷിക്കുന്നു.",
    source: "Kasaragod District official website (Govt. of Kerala), History page: https://kasargod.nic.in/history/"
  },
  {
    topic: "കേരള ചരിത്രം",
    question: "1498-ൽ വാസ്കോ ഡ ഗാമ കോഴിക്കോടിനടുത്ത് കപ്പലിറങ്ങിയ സ്ഥലം ഏത്?",
    options: ["കാപ്പാട്", "കൊടുങ്ങല്ലൂർ", "കൊച്ചി", "കണ്ണൂർ"],
    answer: 0,
    explanation: "1498 മേയിൽ വാസ്കോ ഡ ഗാമ കോഴിക്കോടിന് വടക്കുള്ള കാപ്പാടിൽ എത്തി.",
    source: "Kozhikode District official website (Govt. of Kerala), History page: https://kozhikode.nic.in/history/"
  },
  {
    topic: "കേരള ചരിത്രം",
    question: "തൊട്ടുകൂടായ്മയ്ക്കെതിരായ വൈക്കം സത്യാഗ്രഹം നടന്ന വർഷം ഏത്?",
    options: ["1930–31", "1946–47", "1924–25", "1936–37"],
    answer: 2,
    explanation: "തൊട്ടുകൂടായ്മ ഇല്ലാതാക്കാനുള്ള വൈക്കം സത്യാഗ്രഹം 1924–25-ൽ കോട്ടയം ജില്ലയിലെ വൈക്കത്ത് നടന്നു.",
    source: "Kottayam District official website (Govt. of Kerala), History page: https://kottayam.nic.in/history/"
  },
  {
    topic: "കേരള ചരിത്രം",
    question: "1809-ൽ കുണ്ടറ വിളംബരം നടത്തിയത് ആര്?",
    options: ["പഴശ്ശിരാജ", "മാർത്താണ്ഡവർമ്മ", "ശക്തൻ തമ്പുരാൻ", "വേലുത്തമ്പി ദളവ"],
    answer: 3,
    explanation: "1809-ൽ വേലുത്തമ്പി ദളവ ബ്രിട്ടീഷുകാർക്കെതിരെ കുണ്ടറ വിളംബരം നടത്തി.",
    source: "Pathanamthitta District official website (Govt. of Kerala), History page: https://pathanamthitta.nic.in/history/"
  },
  {
    topic: "കേരള ചരിത്രം",
    question: "1741-ലെ കുളച്ചൽ യുദ്ധത്തിൽ ഡച്ചുകാരെ തോൽപ്പിച്ച തിരുവിതാംകൂർ രാജാവ് ആര്?",
    options: ["മാർത്താണ്ഡവർമ്മ", "സ്വാതി തിരുനാൾ", "ശ്രീമൂലം തിരുനാൾ", "ആയില്യം തിരുനാൾ"],
    answer: 0,
    explanation: "1741-ലെ കുളച്ചൽ യുദ്ധത്തിൽ മാർത്താണ്ഡവർമ്മ ഡച്ച് ഈസ്റ്റ് ഇന്ത്യ കമ്പനിയെ തോൽപ്പിച്ചു.",
    source: "Kollam District official website (Govt. of Kerala), History page: https://kollam.nic.in/history/"
  },
  {
    topic: "കേരള ചരിത്രം",
    question: "ബ്രിട്ടീഷുകാർക്കെതിരെ കലാപം നയിച്ച കോട്ടയം (മലബാർ) രാജവംശത്തിലെ ഭരണാധികാരി ആര്?",
    options: ["വേലുത്തമ്പി ദളവ", "പഴശ്ശിരാജ", "കെ. കേളപ്പൻ", "മാർത്താണ്ഡവർമ്മ"],
    answer: 1,
    explanation: "കോട്ടയം രാജവംശത്തിലെ കേരളവർമ്മ പഴശ്ശിരാജ കുറിച്യരെ സംഘടിപ്പിച്ച് വയനാടൻ കാടുകളിൽ ബ്രിട്ടീഷുകാർക്കെതിരെ പോരാടി.",
    source: "Wayanad District official website (Govt. of Kerala), History page: https://wayanad.nic.in/history/"
  },
  {
    topic: "കേരള ചരിത്രം",
    question: "1930-ൽ പയ്യന്നൂരിൽ ഉപ്പുസത്യാഗ്രഹത്തിന് നേതൃത്വം നൽകിയത് ആര്?",
    options: ["ടി.കെ. മാധവൻ", "കെ. കേളപ്പൻ", "എ.കെ. ഗോപാലൻ", "മന്നത്ത് പത്മനാഭൻ"],
    answer: 1,
    explanation: "1930 ഏപ്രിൽ 13-ന് കെ. കേളപ്പന്റെ നേതൃത്വത്തിൽ സന്നദ്ധഭടന്മാർ കോഴിക്കോട്ടുനിന്ന് കാൽനടയായി പുറപ്പെട്ടു; പിന്നീട് പയ്യന്നൂർ കടപ്പുറത്ത് ഉപ്പുനിയമം ലംഘിച്ചു.",
    source: "Kannur District official website (Govt. of Kerala), History page: https://kannur.nic.in/history/"
  },
  {
    topic: "കേരള ചരിത്രം",
    question: "പുന്നപ്ര-വയലാർ സമരം നടന്ന വർഷം ഏത്?",
    options: ["1921", "1938", "1946", "1957"],
    answer: 2,
    explanation: "1946-ലെ പുന്നപ്ര-വയലാർ സമരം ദിവാൻ സർ സി.പി. രാമസ്വാമി അയ്യർക്കെതിരായ ജനരോഷം ശക്തമാക്കി.",
    source: "Alappuzha District official website (Govt. of Kerala), History page: https://alappuzha.nic.in/history/"
  },
  {
    topic: "കേരള ചരിത്രം",
    question: "കണ്ണൂരിലെ സെന്റ് ആഞ്ചലോ കോട്ട 1505-ൽ നിർമ്മിച്ചത് ആര്?",
    options: ["ഡച്ചുകാർ", "ബ്രിട്ടീഷുകാർ", "ഫ്രഞ്ചുകാർ", "പോർച്ചുഗീസുകാർ"],
    answer: 3,
    explanation: "ആദ്യ പോർച്ചുഗീസ് വൈസ്രോയി ഡോം ഫ്രാൻസിസ്കോ ഡി അൽമേഡ 1505-ൽ സെന്റ് ആഞ്ചലോ കോട്ട നിർമ്മിച്ചു.",
    source: "Kannur District official website (Govt. of Kerala), History page: https://kannur.nic.in/history/"
  },
  {
    topic: "കേരള ചരിത്രം",
    question: "മലബാർ കലാപം നടന്ന വർഷം ഏത്?",
    options: ["1857", "1921", "1932", "1946"],
    answer: 1,
    explanation: "1921-ലെ മലബാർ കലാപത്തിന്റെ പ്രധാന വേദികളിലൊന്ന് മലപ്പുറമായിരുന്നു; മലബാർ സ്പെഷ്യൽ പോലീസ് അത് അടിച്ചമർത്തി.",
    source: "Malappuram District official website (Govt. of Kerala), History page: https://malappuram.nic.in/history/"
  },

  // ---------- Kerala geography ----------
  {
    topic: "കേരള ഭൂമിശാസ്ത്രം",
    question: "കേരളത്തിൽ എത്ര ജില്ലകളുണ്ട്?",
    options: ["12", "13", "14", "15"],
    answer: 2,
    explanation: "തിരുവനന്തപുരം മുതൽ കാസർകോട് വരെ കേരളത്തിൽ 14 ജില്ലകളുണ്ട്.",
    source: "Kerala Tourism (Dept. of Tourism, Govt. of Kerala), Districts page: https://www.keralatourism.org/districts/"
  },
  {
    topic: "കേരള ഭൂമിശാസ്ത്രം",
    question: "ദക്ഷിണേന്ത്യയിലെ ഏറ്റവും ഉയരം കൂടിയ കൊടുമുടിയായ ആനമുടി ഏത് ദേശീയോദ്യാനത്തിലാണ്?",
    options: ["സൈലന്റ് വാലി", "ഇരവികുളം", "പെരിയാർ", "മതികെട്ടാൻ ചോല"],
    answer: 1,
    explanation: "2695 മീറ്റർ ഉയരമുള്ള ആനമുടി മൂന്നാറിനടുത്തുള്ള ഇരവികുളം ദേശീയോദ്യാനത്തിലാണ്.",
    source: "Kerala Tourism (Dept. of Tourism, Govt. of Kerala), Eravikulam National Park page: https://www.keralatourism.org/destination/eravikulam-national-park/319"
  },
  {
    topic: "കേരള ഭൂമിശാസ്ത്രം",
    question: "കേരളത്തിലെ ഏറ്റവും വലിയ കായൽ ഏത്?",
    options: ["അഷ്ടമുടി കായൽ", "വേമ്പനാട് കായൽ", "ശാസ്താംകോട്ട കായൽ", "പുന്നമട കായൽ"],
    answer: 1,
    explanation: "വേമ്പനാട് കായലാണ് കേരളത്തിലെ ഏറ്റവും വലിയ കായൽ; തണ്ണീർമുക്കം ബണ്ട് ഇതിന് കുറുകെയാണ്.",
    source: "Kerala Tourism (Dept. of Tourism, Govt. of Kerala), Thanneermukkom Bund page: https://www.keralatourism.org/kumarakom/thanneermukkom-bund-kuttanad.php"
  },
  {
    topic: "കേരള ഭൂമിശാസ്ത്രം",
    question: "സമുദ്രനിരപ്പിൽ നിന്ന് ഏതാനും അടി താഴെ സ്ഥിതിചെയ്യുന്ന കേരളത്തിലെ നെൽകൃഷി പ്രദേശം ഏത്?",
    options: ["കുട്ടനാട്", "വയനാട്", "പാലക്കാട്", "ഇടുക്കി"],
    answer: 0,
    explanation: "നെൽകൃഷിക്ക് പേരുകേട്ട കുട്ടനാട് സമുദ്രനിരപ്പിൽ നിന്ന് ഏതാനും അടി താഴെയാണ്.",
    source: "Kerala Tourism (Dept. of Tourism, Govt. of Kerala), Kumarakom page: https://www.keralatourism.org/kumarakom"
  },
  {
    topic: "കേരള ഭൂമിശാസ്ത്രം",
    question: "സൈലന്റ് വാലി ദേശീയോദ്യാനം ഏത് ജില്ലയിലാണ്?",
    options: ["ഇടുക്കി", "വയനാട്", "പാലക്കാട്", "മലപ്പുറം"],
    answer: 2,
    explanation: "സൈലന്റ് വാലി ദേശീയോദ്യാനം പാലക്കാട് ജില്ലയിലെ മണ്ണാർക്കാടിനടുത്താണ്; കുന്തിപ്പുഴ ഇതിലൂടെ ഒഴുകുന്നു.",
    source: "Kerala Tourism (Dept. of Tourism, Govt. of Kerala), Silent Valley National Park page: https://www.keralatourism.org/destination/silent-valley-national-park-palakkad/157/"
  },
  {
    topic: "കേരള ഭൂമിശാസ്ത്രം",
    question: "പശ്ചിമഘട്ടത്തിലെ പ്രശസ്തമായ വിടവ് ഏത്?",
    options: ["താമരശ്ശേരി ചുരം", "പാലക്കാട് ചുരം", "ആര്യങ്കാവ് ചുരം", "പേരിയ ചുരം"],
    answer: 1,
    explanation: "പാലക്കാട് ചുരം എന്ന 40 കി.മീ. വിടവ് പണ്ടുമുതലേ കിഴക്കൻ-പടിഞ്ഞാറൻ തീരങ്ങൾക്കിടയിലെ വ്യാപാരത്തിന് സഹായിച്ചു.",
    source: "Kerala Tourism (Dept. of Tourism, Govt. of Kerala), Palakkad district page: https://www.keralatourism.org/districts/palakkad/"
  },
  {
    topic: "കേരള ഭൂമിശാസ്ത്രം",
    question: "അതിരപ്പിള്ളി വെള്ളച്ചാട്ടം ഏത് നദിയിലാണ്?",
    options: ["പെരിയാർ", "ഭാരതപ്പുഴ", "പമ്പ", "ചാലക്കുടിപ്പുഴ"],
    answer: 3,
    explanation: "ഷോളയാർ വനമേഖലയുടെ പ്രവേശനകവാടത്തിലുള്ള അതിരപ്പിള്ളി വെള്ളച്ചാട്ടം ചാലക്കുടിപ്പുഴയുടെ ഭാഗമാണ്.",
    source: "Kerala Tourism (Dept. of Tourism, Govt. of Kerala), Athirappilly and Vazhachal FAQ page: https://www.keralatourism.org/faq/what-is-special-about-athirappilly-and-vazhachal-waterfalls"
  },
  {
    topic: "കേരള ഭൂമിശാസ്ത്രം",
    question: "കേരളത്തിലെ ഏക ഡ്രൈവ്-ഇൻ ബീച്ചായ മുഴപ്പിലങ്ങാട് ഏത് ജില്ലയിലാണ്?",
    options: ["കണ്ണൂർ", "കോഴിക്കോട്", "കാസർകോട്", "തിരുവനന്തപുരം"],
    answer: 0,
    explanation: "കണ്ണൂർ ജില്ലയിലെ മുഴപ്പിലങ്ങാട് ബീച്ചാണ് കേരളത്തിലെ ഏക ഡ്രൈവ്-ഇൻ ബീച്ച്.",
    source: "Kerala Tourism (Dept. of Tourism, Govt. of Kerala), Muzhappilangad Beach page: https://www.keralatourism.org/destination/muzhapilangad-beach/85/"
  },
  {
    topic: "കേരള ഭൂമിശാസ്ത്രം",
    question: "ബേക്കൽ കോട്ട ഏത് ജില്ലയിലാണ്?",
    options: ["കണ്ണൂർ", "കോഴിക്കോട്", "മലപ്പുറം", "കാസർകോട്"],
    answer: 3,
    explanation: "കടൽത്തീരത്തെ കുന്നിൻമുകളിലുള്ള ബേക്കൽ കോട്ട കാസർകോട് ജില്ലയിലാണ്.",
    source: "Kerala Tourism (Dept. of Tourism, Govt. of Kerala), Bekal page: https://www.keralatourism.org/destination/bekal-kasaragod/259/"
  },
  {
    topic: "കേരള ഭൂമിശാസ്ത്രം",
    question: "1984 മേയ് 24-ന് രൂപീകരിച്ച കേരളത്തിലെ ജില്ല ഏത്?",
    options: ["പത്തനംതിട്ട", "വയനാട്", "കാസർകോട്", "ഇടുക്കി"],
    answer: 2,
    explanation: "കേരളത്തിന്റെ വടക്കേയറ്റത്തുള്ള കാസർകോട് ജില്ല 1984 മേയ് 24-ന് രൂപീകരിച്ചു.",
    source: "Kasaragod District official website (Govt. of Kerala), History page: https://kasargod.nic.in/history/"
  },

  // ---------- Indian Constitution ----------
  {
    topic: "ഇന്ത്യൻ ഭരണഘടന",
    question: "തൊട്ടുകൂടായ്മ നിർത്തലാക്കുന്ന ഭരണഘടനാ അനുച്ഛേദം ഏത്?",
    options: ["അനുച്ഛേദം 14", "അനുച്ഛേദം 17", "അനുച്ഛേദം 21", "അനുച്ഛേദം 32"],
    answer: 1,
    explanation: "അനുച്ഛേദം 17 തൊട്ടുകൂടായ്മ നിർത്തലാക്കുകയും അതിന്റെ ആചരണം ശിക്ഷാർഹമാക്കുകയും ചെയ്യുന്നു.",
    source: "The Constitution of India, Article 17 (Legislative Department, Govt. of India, 2024 edition): https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/07/20240716890312078.pdf"
  },
  {
    topic: "ഇന്ത്യൻ ഭരണഘടന",
    question: "6 മുതൽ 14 വയസ്സു വരെയുള്ള കുട്ടികൾക്ക് സൗജന്യവും നിർബന്ധിതവുമായ വിദ്യാഭ്യാസം ഉറപ്പാക്കുന്ന അനുച്ഛേദം ഏത്?",
    options: ["അനുച്ഛേദം 19", "അനുച്ഛേദം 21A", "അനുച്ഛേദം 24", "അനുച്ഛേദം 280"],
    answer: 1,
    explanation: "അനുച്ഛേദം 21A പ്രകാരം 6–14 വയസ്സുള്ള എല്ലാ കുട്ടികൾക്കും സൗജന്യവും നിർബന്ധിതവുമായ വിദ്യാഭ്യാസം നൽകണം.",
    source: "The Constitution of India, Article 21A (Legislative Department, Govt. of India, 2024 edition): https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/07/20240716890312078.pdf"
  },
  {
    topic: "ഇന്ത്യൻ ഭരണഘടന",
    question: "നിയമത്തിനു മുന്നിലുള്ള സമത്വം ഉറപ്പാക്കുന്ന ഭരണഘടനാ അനുച്ഛേദം ഏത്?",
    options: ["അനുച്ഛേദം 14", "അനുച്ഛേദം 19", "അനുച്ഛേദം 21", "അനുച്ഛേദം 25"],
    answer: 0,
    explanation: "അനുച്ഛേദം 14 പ്രകാരം നിയമത്തിനു മുന്നിൽ സമത്വവും നിയമങ്ങളുടെ തുല്യ സംരക്ഷണവും ആർക്കും നിഷേധിക്കാൻ പാടില്ല.",
    source: "The Constitution of India, Article 14 (Legislative Department, Govt. of India, 2024 edition): https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/07/20240716890312078.pdf"
  },
  {
    topic: "ഇന്ത്യൻ ഭരണഘടന",
    question: "ജീവനും വ്യക്തിസ്വാതന്ത്ര്യത്തിനുമുള്ള സംരക്ഷണം ഉറപ്പാക്കുന്ന അനുച്ഛേദം ഏത്?",
    options: ["അനുച്ഛേദം 19", "അനുച്ഛേദം 20", "അനുച്ഛേദം 22", "അനുച്ഛേദം 21"],
    answer: 3,
    explanation: "അനുച്ഛേദം 21: നിയമം സ്ഥാപിച്ച നടപടിക്രമത്തിലൂടെയല്ലാതെ ആരുടെയും ജീവനോ വ്യക്തിസ്വാതന്ത്ര്യമോ ഹനിക്കാൻ പാടില്ല.",
    source: "The Constitution of India, Article 21 (Legislative Department, Govt. of India, 2024 edition): https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/07/20240716890312078.pdf"
  },
  {
    topic: "ഇന്ത്യൻ ഭരണഘടന",
    question: "മൗലികാവകാശങ്ങൾ നടപ്പാക്കാൻ സുപ്രീം കോടതിയെ സമീപിക്കാനുള്ള അവകാശം ഉറപ്പാക്കുന്ന അനുച്ഛേദം ഏത്?",
    options: ["അനുച്ഛേദം 226", "അനുച്ഛേദം 32", "അനുച്ഛേദം 21", "അനുച്ഛേദം 368"],
    answer: 1,
    explanation: "അനുച്ഛേദം 32 പ്രകാരം മൗലികാവകാശങ്ങൾക്കായി സുപ്രീം കോടതിയെ സമീപിക്കാം; കോടതിക്ക് റിട്ടുകൾ പുറപ്പെടുവിക്കാം.",
    source: "The Constitution of India, Article 32 (Legislative Department, Govt. of India, 2024 edition): https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/07/20240716890312078.pdf"
  },
  {
    topic: "ഇന്ത്യൻ ഭരണഘടന",
    question: "മൗലിക കടമകൾ (അനുച്ഛേദം 51A) ഭരണഘടനയുടെ ഏത് ഭാഗത്താണ്?",
    options: ["ഭാഗം III", "ഭാഗം IV", "ഭാഗം IVA", "ഭാഗം V"],
    answer: 2,
    explanation: "മൗലിക കടമകൾ ഭാഗം IVA-യിലെ അനുച്ഛേദം 51A-ലാണ്; മൗലികാവകാശങ്ങൾ ഭാഗം III-ലാണ്.",
    source: "The Constitution of India, Part IVA, Article 51A (Legislative Department, Govt. of India, 2024 edition): https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/07/20240716890312078.pdf"
  },
  {
    topic: "ഇന്ത്യൻ ഭരണഘടന",
    question: "തിരഞ്ഞെടുപ്പുകളുടെ മേൽനോട്ടം തിരഞ്ഞെടുപ്പ് കമ്മീഷനെ ഏൽപ്പിക്കുന്ന അനുച്ഛേദം ഏത്?",
    options: ["അനുച്ഛേദം 280", "അനുച്ഛേദം 312", "അനുച്ഛേദം 356", "അനുച്ഛേദം 324"],
    answer: 3,
    explanation: "അനുച്ഛേദം 324 പ്രകാരം പാർലമെന്റ്, നിയമസഭ, രാഷ്ട്രപതി, ഉപരാഷ്ട്രപതി തിരഞ്ഞെടുപ്പുകളുടെ ചുമതല തിരഞ്ഞെടുപ്പ് കമ്മീഷനാണ്.",
    source: "The Constitution of India, Article 324 (Legislative Department, Govt. of India, 2024 edition): https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/07/20240716890312078.pdf"
  },
  {
    topic: "ഇന്ത്യൻ ഭരണഘടന",
    question: "അനുച്ഛേദം 343 പ്രകാരം യൂണിയന്റെ ഔദ്യോഗിക ഭാഷ ഏത്?",
    options: ["ഇംഗ്ലീഷ്", "ദേവനാഗരി ലിപിയിലുള്ള ഹിന്ദി", "സംസ്കൃതം", "ഉർദു"],
    answer: 1,
    explanation: "അനുച്ഛേദം 343(1) പ്രകാരം യൂണിയന്റെ ഔദ്യോഗിക ഭാഷ ദേവനാഗരി ലിപിയിലുള്ള ഹിന്ദിയാണ്.",
    source: "The Constitution of India, Article 343 (Legislative Department, Govt. of India, 2024 edition): https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/07/20240716890312078.pdf"
  },
  {
    topic: "ഇന്ത്യൻ ഭരണഘടന",
    question: "രാഷ്ട്രപതിയായി തിരഞ്ഞെടുക്കപ്പെടാൻ വേണ്ട കുറഞ്ഞ പ്രായം എത്ര?",
    options: ["25 വയസ്സ്", "30 വയസ്സ്", "35 വയസ്സ്", "40 വയസ്സ്"],
    answer: 2,
    explanation: "അനുച്ഛേദം 58 പ്രകാരം രാഷ്ട്രപതി സ്ഥാനാർത്ഥിക്ക് 35 വയസ്സ് പൂർത്തിയായിരിക്കണം.",
    source: "The Constitution of India, Article 58 (Legislative Department, Govt. of India, 2024 edition): https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/07/20240716890312078.pdf"
  },
  {
    topic: "ഇന്ത്യൻ ഭരണഘടന",
    question: "യുദ്ധം, ബാഹ്യ ആക്രമണം അല്ലെങ്കിൽ സായുധ കലാപം മൂലമുള്ള അടിയന്തരാവസ്ഥ പ്രഖ്യാപനത്തെക്കുറിച്ചുള്ള അനുച്ഛേദം ഏത്?",
    options: ["അനുച്ഛേദം 352", "അനുച്ഛേദം 356", "അനുച്ഛേദം 360", "അനുച്ഛേദം 365"],
    answer: 0,
    explanation: "ഇന്ത്യയുടെ സുരക്ഷ ഭീഷണിയിലാകുമ്പോൾ അനുച്ഛേദം 352 പ്രകാരം രാഷ്ട്രപതിക്ക് അടിയന്തരാവസ്ഥ പ്രഖ്യാപിക്കാം.",
    source: "The Constitution of India, Article 352 (Legislative Department, Govt. of India, 2024 edition): https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/07/20240716890312078.pdf"
  },

  // ---------- General science ----------
  {
    topic: "പൊതുശാസ്ത്രം",
    question: "ഒരു നിർവീര്യ (ന്യൂട്രൽ) ലായനിയുടെ pH മൂല്യം എത്ര?",
    options: ["0", "7", "10", "14"],
    answer: 1,
    explanation: "നിർവീര്യ ലായനിയുടെ pH 7 ആണ്; 7-ൽ കുറവ് അമ്ലവും 7-ൽ കൂടുതൽ ക്ഷാരവുമാണ്.",
    source: "NCERT Science Class 10, Chapter 2 'Acids, Bases and Salts': https://ncert.nic.in/textbook/pdf/jesc102.pdf"
  },
  {
    topic: "പൊതുശാസ്ത്രം",
    question: "വൈദ്യുത പ്രവാഹം (കറന്റ്) അളക്കുന്ന യൂണിറ്റ് ഏത്?",
    options: ["വോൾട്ട്", "ഓം", "ആമ്പിയർ", "വാട്ട്"],
    answer: 2,
    explanation: "വൈദ്യുത പ്രവാഹത്തിന്റെ യൂണിറ്റ് ആമ്പിയർ (A) ആണ്; ആന്ദ്രേ-മേരി ആമ്പിയറിന്റെ പേരിലാണ് ഇത്.",
    source: "NCERT Science Class 10, Chapter 11 'Electricity': https://ncert.nic.in/textbook/pdf/jesc111.pdf"
  },
  {
    topic: "പൊതുശാസ്ത്രം",
    question: "ഹ്രസ്വദൃഷ്ടി (മയോപ്പിയ) പരിഹരിക്കാൻ ഉപയോഗിക്കുന്ന ലെൻസ് ഏത്?",
    options: ["ഉത്തല ലെൻസ് (കോൺവെക്സ്)", "അവതല ലെൻസ് (കോൺകേവ്)", "ബൈഫോക്കൽ ലെൻസ്", "സിലിണ്ട്രിക്കൽ ലെൻസ്"],
    answer: 1,
    explanation: "അനുയോജ്യമായ പവറുള്ള അവതല (കോൺകേവ്) ലെൻസ് ഉപയോഗിച്ചാണ് ഹ്രസ്വദൃഷ്ടി പരിഹരിക്കുന്നത്.",
    source: "NCERT Science Class 10, Chapter 10 'The Human Eye and the Colourful World': https://ncert.nic.in/textbook/pdf/jesc110.pdf"
  },
  {
    topic: "പൊതുശാസ്ത്രം",
    question: "ലെൻസിന്റെ പവറിന്റെ SI യൂണിറ്റ് ഏത്?",
    options: ["ഡയോപ്റ്റർ", "വാട്ട്", "ലക്സ്", "മീറ്റർ"],
    answer: 0,
    explanation: "ലെൻസിന്റെ പവറിന്റെ SI യൂണിറ്റ് ഡയോപ്റ്റർ (D) ആണ്; 1 D = 1 m⁻¹.",
    source: "NCERT Science Class 10, Chapter 9 'Light – Reflection and Refraction': https://ncert.nic.in/textbook/pdf/jesc109.pdf"
  },
  {
    topic: "പൊതുശാസ്ത്രം",
    question: "മനുഷ്യരിൽ ഓക്സിജൻ വഹിക്കുന്ന ശ്വസനവർണ്ണകം ഏത്?",
    options: ["ക്ലോറോഫിൽ", "മെലാനിൻ", "ഹീമോഗ്ലോബിൻ", "ഇൻസുലിൻ"],
    answer: 2,
    explanation: "ചുവന്ന രക്താണുക്കളിലുള്ള ഹീമോഗ്ലോബിനാണ് ഓക്സിജൻ വഹിക്കുന്നത്.",
    source: "NCERT Science Class 10, Chapter 5 'Life Processes': https://ncert.nic.in/textbook/pdf/jesc105.pdf"
  },
  {
    topic: "പൊതുശാസ്ത്രം",
    question: "പിത്തരസം (ബൈൽ) ഉത്പാദിപ്പിക്കുന്ന അവയവം ഏത്?",
    options: ["പാൻക്രിയാസ്", "കരൾ", "ആമാശയം", "വൃക്ക"],
    answer: 1,
    explanation: "കരളിൽ നിന്നുള്ള പിത്തരസം ആഹാരത്തെ ക്ഷാരീയമാക്കുകയും കൊഴുപ്പിനെ ചെറുകണികകളാക്കുകയും ചെയ്യുന്നു.",
    source: "NCERT Science Class 10, Chapter 5 'Life Processes': https://ncert.nic.in/textbook/pdf/jesc105.pdf"
  },
  {
    topic: "പൊതുശാസ്ത്രം",
    question: "രക്തത്തിലെ പഞ്ചസാരയുടെ അളവ് നിയന്ത്രിക്കുന്ന ഇൻസുലിൻ ഉത്പാദിപ്പിക്കുന്നത് ഏത് അവയവം?",
    options: ["കരൾ", "തൈറോയ്ഡ് ഗ്രന്ഥി", "പാൻക്രിയാസ്", "അഡ്രിനൽ ഗ്രന്ഥി"],
    answer: 2,
    explanation: "പാൻക്രിയാസ് ഉത്പാദിപ്പിക്കുന്ന ഇൻസുലിൻ ആവശ്യത്തിന് ഇല്ലെങ്കിൽ രക്തത്തിലെ പഞ്ചസാരയുടെ അളവ് കൂടും.",
    source: "NCERT Science Class 10, Chapter 6 'Control and Coordination': https://ncert.nic.in/textbook/pdf/jesc106.pdf"
  },
  {
    topic: "പൊതുശാസ്ത്രം",
    question: "സൂര്യനിൽ നിന്നുള്ള അൾട്രാവയലറ്റ് (UV) കിരണങ്ങളിൽ നിന്ന് ഭൂമിയെ സംരക്ഷിക്കുന്ന പാളി ഏത്?",
    options: ["ട്രോപോസ്ഫിയർ", "ഓസോൺ പാളി", "അയണോസ്ഫിയർ", "മേഘപാളി"],
    answer: 1,
    explanation: "മൂന്ന് ഓക്സിജൻ ആറ്റങ്ങളുള്ള ഓസോൺ (O₃) അന്തരീക്ഷത്തിന്റെ ഉയർന്ന തലത്തിൽ UV കിരണങ്ങളെ തടയുന്നു.",
    source: "NCERT Science Class 10, Chapter 13 'Our Environment': https://ncert.nic.in/textbook/pdf/jesc113.pdf"
  },
  {
    topic: "പൊതുശാസ്ത്രം",
    question: "താപത്തിന്റെ ഏറ്റവും നല്ല ചാലകങ്ങളായ ലോഹങ്ങൾ ഏവ?",
    options: ["ഈയവും മെർക്കുറിയും", "ഇരുമ്പും അലുമിനിയവും", "സ്വർണവും സിങ്കും", "വെള്ളിയും ചെമ്പും"],
    answer: 3,
    explanation: "വെള്ളിയും ചെമ്പുമാണ് താപത്തിന്റെ ഏറ്റവും നല്ല ചാലകങ്ങൾ; ഈയവും മെർക്കുറിയും താരതമ്യേന മോശം ചാലകങ്ങളാണ്.",
    source: "NCERT Science Class 10, Chapter 3 'Metals and Non-metals': https://ncert.nic.in/textbook/pdf/jesc103.pdf"
  },
  {
    topic: "പൊതുശാസ്ത്രം",
    question: "മനുഷ്യരിൽ കുഞ്ഞിന്റെ ലിംഗം നിർണ്ണയിക്കുന്നത് ആരിൽ നിന്ന് ലഭിക്കുന്ന ക്രോമസോമാണ്?",
    options: ["അമ്മയിൽ നിന്ന്", "അച്ഛനിൽ നിന്ന്", "രണ്ടുപേരിൽ നിന്നും തുല്യമായി", "ഇവയൊന്നുമല്ല"],
    answer: 1,
    explanation: "എല്ലാ കുട്ടികൾക്കും അമ്മയിൽ നിന്ന് X ക്രോമസോം ലഭിക്കുന്നു; അച്ഛനിൽ നിന്ന് X കിട്ടിയാൽ പെൺകുട്ടി, Y കിട്ടിയാൽ ആൺകുട്ടി.",
    source: "NCERT Science Class 10, Chapter 8 'Heredity': https://ncert.nic.in/textbook/pdf/jesc108.pdf"
  },

  // ---------- Malayalam literature ----------
  {
    topic: "മലയാള സാഹിത്യം",
    question: "ആദ്യത്തെ ജ്ഞാനപീഠ പുരസ്കാരം (1965) നേടിയ മലയാള കവി ആര്?",
    options: ["ഒ.എൻ.വി. കുറുപ്പ്", "വള്ളത്തോൾ നാരായണമേനോൻ", "ജി. ശങ്കരക്കുറുപ്പ്", "കുമാരനാശാൻ"],
    answer: 2,
    explanation: "'ഓടക്കുഴൽ' എന്ന കൃതിക്കാണ് ജി. ശങ്കരക്കുറുപ്പിന് 1965-ലെ ആദ്യ ജ്ഞാനപീഠം ലഭിച്ചത്.",
    source: "Bharatiya Jnanpith official website, list of Jnanpith laureates: https://jnanpith.net/"
  },
  {
    topic: "മലയാള സാഹിത്യം",
    question: "2007-ലെ ജ്ഞാനപീഠ പുരസ്കാരം നേടിയ മലയാള സാഹിത്യകാരൻ ആര്?",
    options: ["എം.ടി. വാസുദേവൻ നായർ", "അക്കിത്തം", "എസ്.കെ. പൊറ്റെക്കാട്ട്", "ഒ.എൻ.വി. കുറുപ്പ്"],
    answer: 3,
    explanation: "മലയാള സാഹിത്യത്തിനുള്ള സംഭാവനകൾക്ക് ഒ.എൻ.വി. കുറുപ്പിന് 2007-ലെ ജ്ഞാനപീഠം ലഭിച്ചു.",
    source: "Bharatiya Jnanpith official website, list of Jnanpith laureates: https://jnanpith.net/"
  },
  {
    topic: "മലയാള സാഹിത്യം",
    question: "എസ്.കെ. പൊറ്റെക്കാട്ടിന് 1980-ലെ ജ്ഞാനപീഠം നേടിക്കൊടുത്ത കൃതി ഏത്?",
    options: ["ഒരു തെരുവിന്റെ കഥ", "വിഷകന്യക", "ഒരു ദേശത്തിന്റെ കഥ", "ഓടക്കുഴൽ"],
    answer: 2,
    explanation: "'ഒരു ദേശത്തിന്റെ കഥ' എന്ന കൃതിക്കാണ് എസ്.കെ. പൊറ്റെക്കാട്ടിന് 1980-ലെ ജ്ഞാനപീഠം ലഭിച്ചത്.",
    source: "Bharatiya Jnanpith official website, list of Jnanpith laureates: https://jnanpith.net/"
  },
  {
    topic: "മലയാള സാഹിത്യം",
    question: "തകഴി ശിവശങ്കരപ്പിള്ളയ്ക്ക് ജ്ഞാനപീഠ പുരസ്കാരം ലഭിച്ച വർഷം ഏത്?",
    options: ["1965", "1980", "1984", "1995"],
    answer: 2,
    explanation: "മലയാള സാഹിത്യത്തിനുള്ള സംഭാവനകൾക്ക് തകഴി ശിവശങ്കരപ്പിള്ളയ്ക്ക് 1984-ലെ ജ്ഞാനപീഠം ലഭിച്ചു.",
    source: "Bharatiya Jnanpith official website, list of Jnanpith laureates: https://jnanpith.net/"
  },
  {
    topic: "മലയാള സാഹിത്യം",
    question: "2019-ലെ ജ്ഞാനപീഠ പുരസ്കാരം നേടിയ മലയാള കവി ആര്?",
    options: ["സുഗതകുമാരി", "അക്കിത്തം", "ഒ.എൻ.വി. കുറുപ്പ്", "വൈലോപ്പിള്ളി ശ്രീധരമേനോൻ"],
    answer: 1,
    explanation: "മലയാള സാഹിത്യത്തിനുള്ള സംഭാവനകൾക്ക് അക്കിത്തത്തിന് 2019-ലെ ജ്ഞാനപീഠം ലഭിച്ചു.",
    source: "Bharatiya Jnanpith official website, list of Jnanpith laureates: https://jnanpith.net/"
  },
  {
    topic: "മലയാള സാഹിത്യം",
    question: "1995-ലെ ജ്ഞാനപീഠ പുരസ്കാരം നേടിയ മലയാള സാഹിത്യകാരൻ ആര്?",
    options: ["എം.ടി. വാസുദേവൻ നായർ", "തകഴി ശിവശങ്കരപ്പിള്ള", "വൈക്കം മുഹമ്മദ് ബഷീർ", "എസ്.കെ. പൊറ്റെക്കാട്ട്"],
    answer: 0,
    explanation: "മലയാള സാഹിത്യത്തിനുള്ള സംഭാവനകൾക്ക് എം.ടി. വാസുദേവൻ നായർക്ക് 1995-ലെ ജ്ഞാനപീഠം ലഭിച്ചു.",
    source: "Bharatiya Jnanpith official website, list of Jnanpith laureates: https://jnanpith.net/"
  },
  {
    topic: "മലയാള സാഹിത്യം",
    question: "1930-ൽ കേരള കലാമണ്ഡലം സ്ഥാപിച്ച കവി ആര്?",
    options: ["കുമാരനാശാൻ", "ഉള്ളൂർ എസ്. പരമേശ്വരയ്യർ", "വള്ളത്തോൾ നാരായണമേനോൻ", "ജി. ശങ്കരക്കുറുപ്പ്"],
    answer: 2,
    explanation: "1930-ൽ കവി വള്ളത്തോൾ നാരായണമേനോനും മണക്കുളം മുകുന്ദരാജയും ചേർന്നാണ് കേരള കലാമണ്ഡലം സ്ഥാപിച്ചത്.",
    source: "Kerala Kalamandalam official website, About Us page: https://kalamandalam.ac.in/about-us"
  },
  {
    topic: "മലയാള സാഹിത്യം",
    question: "കേരള സാഹിത്യ അക്കാദമിയുടെ ആസ്ഥാനം എവിടെയാണ്?",
    options: ["തിരുവനന്തപുരം", "കോട്ടയം", "കോഴിക്കോട്", "തൃശൂർ"],
    answer: 3,
    explanation: "1956-ൽ രൂപീകരിച്ച കേരള സാഹിത്യ അക്കാദമിയുടെ ആസ്ഥാനം 1958-ൽ തൃശൂരിലേക്ക് മാറ്റി.",
    source: "Kerala Sahitya Akademi official website, 'About the Akademi' section on the home page: https://keralasahityaakademi.org/"
  },
  {
    topic: "മലയാള സാഹിത്യം",
    question: "മലയാള സർവകലാശാല ഏത് കവിയുടെ പേരിലാണ് അറിയപ്പെടുന്നത്?",
    options: ["തുഞ്ചത്ത് എഴുത്തച്ഛൻ", "കുഞ്ചൻ നമ്പ്യാർ", "ചെറുശ്ശേരി", "കുമാരനാശാൻ"],
    answer: 0,
    explanation: "മലയാള സർവകലാശാലയുടെ ഔദ്യോഗിക പേര് 'തുഞ്ചത്ത് എഴുത്തച്ഛൻ മലയാള സർവകലാശാല' എന്നാണ്.",
    source: "Thunchath Ezhuthachan Malayalam University official website: https://www.malayalamuniversity.edu.in/"
  },
  {
    topic: "മലയാള സാഹിത്യം",
    question: "മലയാളത്തിന് ശ്രേഷ്ഠഭാഷ (ക്ലാസിക്കൽ ഭാഷ) പദവി ലഭിച്ച വർഷം ഏത്?",
    options: ["2004", "2008", "2013", "2014"],
    answer: 2,
    explanation: "2013 ഓഗസ്റ്റ് 8-നാണ് കേന്ദ്ര സാംസ്കാരിക മന്ത്രാലയം മലയാളത്തെ ശ്രേഷ്ഠഭാഷയായി പ്രഖ്യാപിച്ചത്.",
    source: "Ministry of Culture via PIB, 'Status of Classical Language: An Explainer' (Oct 2024): https://static.pib.gov.in/WriteReadData/specificdocs/documents/2024/oct/doc2024104408501.pdf"
  }
];
