import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

type Language = 'en' | 'hi';

const translations = {
  en: {
    appTitle: 'Anjali Notes',
    navHome: 'HOME',
    navAbout: 'ABOUT',
    navPrograms: 'PROGRAMS',
    navNotes: 'NOTES',
    navPPTs: 'PPTS',
    navContact: 'CONTACT',
    navSubmissions: 'SUBMISSIONS',
    heroTitle: 'Clarity in Every Chapter.',
    heroSubtitle: 'Welcome to your central hub for course notes, lecture slides, and academic resources, designed to help you succeed.',
    getStarted: 'Explore Content',
    servicesTitle: 'Our Services',
    service1Title: 'Easy Notes',
    service1Desc: 'We provide free, easy-to-understand handwritten and typed notes for various subjects to aid in your studies.',
    service2Title: 'Lecture PPTs',
    service2Desc: 'Download comprehensive PPTs for Software Engineering, Operating Systems, and other subjects for offline study.',
    service3Title: 'Code & Programs',
    service3Desc: 'Access all programs of C, C++ with source code. We provide programs for each and every topic.',
    clickHere: 'Click Here',
    notesSectionTitle: 'Subject Notes',
    pptsSectionTitle: 'Lecture Slides',
    programsSectionTitle: 'Subject Programs',
    downloadPdf: 'Download PDF',
    downloadPpt: 'Download PPT',
    downloadProgram: 'Download Program',
    subjectC: 'C Language',
    subjectCpp: 'C++',
    subjectJava: 'Java',
    subjectPython: 'Python',
    subjectDataStructures: 'Data Structures',
    subjectCompNetworks: 'Computer Networks',
    subjectOS: 'Operating Systems',
    subjectDBMS: 'Database Systems',
    subjectCOA: 'Computer Architecture',
    subjectIT: 'Information Technology',
    subjectSoftwareEng: 'Software Engineering',
    visionTitle: 'Our Vision - Student First',
    vision1Title: '100% Secure',
    vision1Desc: 'A website created by our web developers is highly secure. Customers have a peace of mind that the site can be trusted and the information is safe.',
    vision2Title: 'Quality Content',
    vision2Desc: 'We provide high-quality materials, checked for accuracy and clarity, to ensure you get the most reliable information for your studies.',
    vision3Title: 'Cost-effective services',
    vision3Desc: 'All notes, slides, and resources on this platform are provided completely free of charge to support every student.',
    vision4Title: '24X7 SUPPORT',
    vision4Desc: 'Part of our custom web development services includes ongoing support and maintenance. Our customers can be assured that we will deliver genuine service on time.',
    footerAddress: 'Bathinda, Punjab 151001',
    footerEmail: 'anjalirajput507q@gmail.com',
    quickLinks: 'Quick links',
    contactUs: 'Contact Us',
    followUs: 'Follow Us',
    chooseSubject: 'Choose a Subject',
    backToSubjects: 'Back to Subjects',
    notesFor: 'Notes for',
    pptsFor: 'PPTs for',
    programsFor: 'Programs for',
    contactInfo: 'Contact Information',
    contactDesc: 'If you have any questions, feel free to reach out via email or connect with me on LinkedIn.',
    contactFormTitle: 'Get In Touch',
    formName: 'Your Name',
    formEmail: 'Your Email',
    formMessage: 'Your Message',
    submit: 'Submit Message',
    formSuccess: 'Thank you for your message! I will get back to you soon.',
    addSubject: 'Add Subject',
    deleteSubject: 'Delete Subject',
    addFile: 'Add File',
    newSubjectName: 'New Subject Name',
    newFileName: 'Choose a file to upload',
    submissionsTitle: 'Contact Form Submissions',
    noSubmissions: 'No submissions received yet.',
    submittedOn: 'Submitted on',

    subjectWebDev: 'Web Development',
    aboutTitle: 'About Me',
    aboutDesc1: "I'm Anjali, an Assistant Professor and passionate educator dedicated to making computer science concepts clear and accessible for everyone. This platform is my effort to provide high-quality notes and resources for my students.",
    aboutDesc2: 'Here you will find structured notes, presentations, and code for various subjects to help you excel in your studies. My focus is on simplicity and clarity to foster a strong academic foundation.',
    subjectsTaught: 'Subjects Covered',

    searchPlaceholder: 'Search notes...',
    newNote: 'New Note',
    untitledNote: 'Untitled Note',
    createNewNotePrompt: 'Select a note or create a new one.',
    noNoteSelected: 'No Note Selected',
    lastModified: 'Last Modified',
  },
  hi: {
    appTitle: 'अंजलि नोट्स',
    navHome: 'होम',
    navAbout: 'मेरे बारे में',
    navPrograms: 'कार्यक्रम',
    navNotes: 'नोट्स',
    navPPTs: 'पीपीटी',
    navContact: 'संपर्क',
    navSubmissions: 'प्रस्तुतियाँ',
    heroTitle: 'हर अध्याय में स्पष्टता।',
    heroSubtitle: 'पाठ्यक्रम नोट्स, व्याख्यान स्लाइड्स और शैक्षणिक संसाधनों के लिए आपके केंद्रीय केंद्र में आपका स्वागत है, जो आपकी सफलता में मदद करने के लिए डिज़ाइन किया गया है।',
    getStarted: 'सामग्री देखें',
    servicesTitle: 'हमारी सेवाएँ',
    service1Title: 'आसान नोट्स',
    service1Desc: 'हम आपकी पढ़ाई में सहायता के लिए विभिन्न विषयों के लिए मुफ्त, समझने में आसान हस्तलिखित और टाइप किए गए नोट्स प्रदान करते हैं।',
    service2Title: 'व्याख्यान पीपीटी',
    service2Desc: 'ऑफलाइन अध्ययन के लिए सॉफ्टवेयर इंजीनियरिंग, ऑपरेटिंग सिस्टम और अन्य विषयों के लिए व्यापक पीपीटी डाउनलोड करें।',
    service3Title: 'कोड और प्रोग्राम',
    service3Desc: 'स्रोत कोड के साथ C, C++ के सभी प्रोग्राम एक्सेस करें। हम प्रत्येक विषय के लिए प्रोग्राम प्रदान करते हैं।',
    clickHere: 'यहां क्लिक करें',
    notesSectionTitle: 'विषय नोट्स',
    pptsSectionTitle: 'व्याख्यान स्लाइड्स',
    programsSectionTitle: 'विषय कार्यक्रम',
    downloadPdf: 'पीडीएफ डाउनलोड करें',
    downloadPpt: 'पीपीटी डाउनलोड करें',
    downloadProgram: 'प्रोग्राम डाउनलोड करें',
    subjectC: 'C भाषा',
    subjectCpp: 'C++',
    subjectJava: 'जावा',
    subjectPython: 'पाइथन',
    subjectDataStructures: 'डेटा संरचनाएं',
    subjectCompNetworks: 'कंप्यूटर नेटवर्क',
    subjectOS: 'ऑपरेटING सिस्टम',
    subjectDBMS: 'डेटाबेस सिस्टम',
    subjectCOA: 'कंप्यूटर आर्किटेक्चर',
    subjectIT: 'सूचना प्रौद्योगिकी',
    subjectSoftwareEng: 'सॉफ्टवेयर इंजीनियरिंग',
    visionTitle: 'हमारा दृष्टिकोण - छात्र पहले',
    vision1Title: '100% सुरक्षित',
    vision1Desc: 'हमारे वेब डेवलपर्स द्वारा बनाई गई एक वेबसाइट अत्यधिक सुरक्षित है। ग्राहकों को मन की शांति है कि साइट पर भरोसा किया जा सकता है और जानकारी सुरक्षित है।',
    vision2Title: 'गुणवत्ता सामग्री',
    vision2Desc: 'हम यह सुनिश्चित करने के लिए सटीकता और स्पष्टता के लिए जांची गई उच्च-गुणवत्ता वाली सामग्री प्रदान करते हैं कि आपको अपनी पढ़ाई के लिए सबसे विश्वसनीय जानकारी मिले।',
    vision3Title: 'लागत प्रभावी सेवाएं',
    vision3Desc: 'इस प्लेटफ़ॉर्म पर सभी नोट्स, स्लाइड्स और संसाधन हर छात्र का समर्थन करने के लिए पूरी तरह से निःशुल्क प्रदान किए जाते हैं।',
    vision4Title: '24X7 समर्थन',
    vision4Desc: 'हमारी कस्टम वेब विकास सेवाओं का हिस्सा चल रहे समर्थन और रखरखाव को शामिल करता है। हमारे ग्राहकों को यह आश्वासन दिया जा सकता है कि हम समय पर वास्तविक सेवा प्रदान करेंगे।',
    footerAddress: 'बठिंडा, पंजाब 151001',
    footerEmail: 'anjalirajput507q@gmail.com',
    quickLinks: 'त्वरित लिंक्स',
    contactUs: 'हमसे संपर्क करें',
    followUs: 'हमें फॉलो करें',
    chooseSubject: 'एक विषय चुनें',
    backToSubjects: 'विषयों पर वापस जाएं',
    notesFor: 'के लिए नोट्स',
    pptsFor: 'के लिए पीपीटी',
    programsFor: 'के लिए प्रोग्राम',
    contactInfo: 'संपर्क जानकारी',
    contactDesc: 'यदि आपके कोई प्रश्न हैं, तो बेझझक ईमेल के माध्यम से संपर्क करें या लिंक्डइन पर मुझसे जुड़ें।',
    contactFormTitle: 'संपर्क करें',
    formName: 'आपका नाम',
    formEmail: 'आपका ईमेल',
    formMessage: 'आपका संदेश',
    submit: 'संदेश भेजें',
    formSuccess: 'आपके संदेश के लिए धन्यवाद! मैं जल्द ही आपसे संपर्क करूंगा।',
    addSubject: 'विषय जोड़ें',
    deleteSubject: 'विषय हटाएं',
    addFile: 'फ़ाइल जोड़ें',
    newSubjectName: 'नए विषय का नाम',
    newFileName: 'अपलोड करने के लिए एक फ़ाइल चुनें',
    submissionsTitle: 'संपर्क फ़ॉर्म प्रस्तुतियाँ',
    noSubmissions: 'अभी तक कोई सबमिशन प्राप्त नहीं हुआ है।',
    submittedOn: 'को प्रस्तुत किया गया',
    
    subjectWebDev: 'वेब डेवलपमेंट',
    aboutTitle: 'मेरे बारे में',
    aboutDesc1: 'मैं अंजलि हूं, एक सहायक प्रोफेसर और भावुक शिक्षिका जो कंप्यूटर विज्ञान की अवधारणाओं को सभी के लिए स्पष्ट और सुलभ बनाने के लिए समर्पित है। यह मंच मेरे छात्रों के लिए उच्च गुणवत्ता वाले नोट्स और संसाधन प्रदान करने का मेरा प्रयास है।',
    aboutDesc2: 'यहां आपको अपनी पढ़ाई में उत्कृष्टता प्राप्त करने में मदद करने के लिए विभिन्न विषयों के लिए संरचित नोट्स, प्रस्तुतियां और कोड मिलेंगे। मेरा ध्यान एक मजबूत अकादमिक नींव को बढ़ावा देने के लिए सादगी और स्पष्टता पर है।',
    subjectsTaught: 'शामिल विषय',

    searchPlaceholder: 'नोट्स खोजें...',
    newNote: 'नया नोट',
    untitledNote: 'बिना शीर्षक वाला नोट',
    createNewNotePrompt: 'एक नोट चुनें या एक नया बनाएं।',
    noNoteSelected: 'कोई नोट नहीं चुना गया',
    lastModified: 'अंतिम बार संशोधित',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback((key: keyof typeof translations.en) => {
    return translations[language][key] || translations.en[key];
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t
  }), [language, t]);

  return React.createElement(LanguageContext.Provider, { value }, children);
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};