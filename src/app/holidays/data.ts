export interface ReligiousHoliday {
  id: string;
  name: string;
  tradition: string;
  date: string; // ISO date string YYYY-MM-DD
  endDate?: string; // for multi-day events
  displayDate: string;
  description: string;
  source: string;
}

export const TRADITIONS = [
  'Christianity',
  'Islam',
  'Judaism',
  'Hinduism',
  'Buddhism',
  'Sikhism',
  'Bahá\'í',
  'Jainism',
  'Shinto',
  'Zoroastrianism',
] as const;

export const HOLIDAYS_2026: ReligiousHoliday[] = [
  // CHRISTIANITY
  { id: 'epiphany-2026', name: 'Epiphany', tradition: 'Christianity', date: '2026-01-06', displayDate: 'January 6, 2026', description: 'Commemorates the visit of the Magi to the infant Jesus and, in some traditions, the baptism of Jesus.', source: 'Encyclopaedia Britannica, "Epiphany."' },
  { id: 'ash-wednesday-2026', name: 'Ash Wednesday', tradition: 'Christianity', date: '2026-02-18', displayDate: 'February 18, 2026', description: 'Marks the beginning of Lent, a 40-day period of fasting and penitence before Easter.', source: 'Encyclopaedia Britannica, "Ash Wednesday."' },
  { id: 'palm-sunday-2026', name: 'Palm Sunday', tradition: 'Christianity', date: '2026-03-29', displayDate: 'March 29, 2026', description: 'Celebrates Jesus\'s triumphal entry into Jerusalem, beginning Holy Week.', source: 'Encyclopaedia Britannica, "Palm Sunday."' },
  { id: 'good-friday-2026', name: 'Good Friday', tradition: 'Christianity', date: '2026-04-03', displayDate: 'April 3, 2026', description: 'Observes the crucifixion of Jesus Christ. A day of mourning and fasting.', source: 'Encyclopaedia Britannica, "Good Friday."' },
  { id: 'easter-2026', name: 'Easter Sunday', tradition: 'Christianity', date: '2026-04-05', displayDate: 'April 5, 2026', description: 'Celebrates the resurrection of Jesus Christ from the dead. The most important Christian feast.', source: 'Encyclopaedia Britannica, "Easter."' },
  { id: 'ascension-2026', name: 'Ascension Day', tradition: 'Christianity', date: '2026-05-14', displayDate: 'May 14, 2026', description: 'Commemorates Jesus\'s ascension to heaven 40 days after Easter.', source: 'Encyclopaedia Britannica, "Ascension."' },
  { id: 'pentecost-2026', name: 'Pentecost', tradition: 'Christianity', date: '2026-05-24', displayDate: 'May 24, 2026', description: 'Celebrates the descent of the Holy Spirit upon the apostles, often called the "birthday of the Church."', source: 'Encyclopaedia Britannica, "Pentecost."' },
  { id: 'assumption-2026', name: 'Assumption of Mary', tradition: 'Christianity', date: '2026-08-15', displayDate: 'August 15, 2026', description: 'Catholic and Orthodox feast celebrating the taking up of the Virgin Mary into heaven.', source: 'Encyclopaedia Britannica, "Assumption."' },
  { id: 'christmas-2026', name: 'Christmas', tradition: 'Christianity', date: '2026-12-25', displayDate: 'December 25, 2026', description: 'Celebrates the birth of Jesus Christ. The second most important Christian feast after Easter.', source: 'Encyclopaedia Britannica, "Christmas."' },

  // ISLAM (2026 dates are approximate, Islamic calendar is lunar)
  { id: 'isra-miraj-2026', name: 'Isra and Mi\'raj', tradition: 'Islam', date: '2026-01-16', displayDate: 'January 16, 2026 (approx.)', description: 'Commemorates the Prophet Muhammad\'s night journey from Mecca to Jerusalem and ascension to heaven.', source: 'Encyclopaedia Britannica, "Isrāʾ."' },
  { id: 'ramadan-start-2026', name: 'Ramadan Begins', tradition: 'Islam', date: '2026-02-18', displayDate: 'February 18, 2026 (approx.)', description: 'The beginning of the holy month of fasting, prayer, and reflection for Muslims worldwide.', source: 'Encyclopaedia Britannica, "Ramadan."' },
  { id: 'laylat-al-qadr-2026', name: 'Laylat al-Qadr (Night of Power)', tradition: 'Islam', date: '2026-03-15', displayDate: 'March 15, 2026 (approx.)', description: 'The holiest night of the Islamic year, marking the first revelation of the Quran to Muhammad.', source: 'Encyclopaedia Britannica, "Laylat al-Qadr."' },
  { id: 'eid-al-fitr-2026', name: 'Eid al-Fitr', tradition: 'Islam', date: '2026-03-20', displayDate: 'March 20, 2026 (approx.)', description: 'The "Festival of Breaking the Fast," celebrating the end of Ramadan with prayers, feasting, and charity.', source: 'Encyclopaedia Britannica, "Eid al-Fitr."' },
  { id: 'eid-al-adha-2026', name: 'Eid al-Adha', tradition: 'Islam', date: '2026-05-27', displayDate: 'May 27, 2026 (approx.)', description: 'The "Festival of Sacrifice," commemorating Abraham\'s willingness to sacrifice his son. Coincides with the Hajj pilgrimage.', source: 'Encyclopaedia Britannica, "Eid al-Adha."' },
  { id: 'islamic-new-year-2026', name: 'Islamic New Year (1 Muharram)', tradition: 'Islam', date: '2026-06-17', displayDate: 'June 17, 2026 (approx.)', description: 'Marks the beginning of the new Islamic calendar year.', source: 'Encyclopaedia Britannica, "Islamic calendar."' },
  { id: 'ashura-2026', name: 'Ashura', tradition: 'Islam', date: '2026-06-26', displayDate: 'June 26, 2026 (approx.)', description: 'The 10th of Muharram. Observed as a day of fasting by Sunnis and as a day of mourning for Husayn by Shias.', source: 'Encyclopaedia Britannica, "Ashura."' },
  { id: 'mawlid-2026', name: 'Mawlid al-Nabi (Prophet\'s Birthday)', tradition: 'Islam', date: '2026-08-26', displayDate: 'August 26, 2026 (approx.)', description: 'Celebrates the birthday of Prophet Muhammad with prayers, gatherings, and charitable acts.', source: 'Encyclopaedia Britannica, "Mawlid."' },

  // JUDAISM
  { id: 'purim-2026', name: 'Purim', tradition: 'Judaism', date: '2026-03-05', displayDate: 'March 5, 2026', description: 'Celebrates the deliverance of the Jewish people from Haman\'s plot as told in the Book of Esther.', source: 'Encyclopaedia Britannica, "Purim."' },
  { id: 'passover-2026', name: 'Passover (Pesach)', tradition: 'Judaism', date: '2026-04-02', endDate: '2026-04-09', displayDate: 'April 2–9, 2026', description: 'Commemorates the Israelites\' exodus from Egypt. Celebrated with the Seder meal and unleavened bread (matzah).', source: 'Encyclopaedia Britannica, "Passover."' },
  { id: 'shavuot-2026', name: 'Shavuot', tradition: 'Judaism', date: '2026-05-22', endDate: '2026-05-23', displayDate: 'May 22–23, 2026', description: 'Marks the giving of the Torah at Mount Sinai and the wheat harvest. Also known as the Feast of Weeks.', source: 'Encyclopaedia Britannica, "Shavuot."' },
  { id: 'rosh-hashanah-2026', name: 'Rosh Hashanah', tradition: 'Judaism', date: '2026-09-12', endDate: '2026-09-13', displayDate: 'September 12–13, 2026', description: 'The Jewish New Year. A time of introspection, repentance, and the sounding of the shofar (ram\'s horn).', source: 'Encyclopaedia Britannica, "Rosh Hashana."' },
  { id: 'yom-kippur-2026', name: 'Yom Kippur', tradition: 'Judaism', date: '2026-09-21', displayDate: 'September 21, 2026', description: 'The Day of Atonement, the holiest day in Judaism. A 25-hour fast devoted to prayer and repentance.', source: 'Encyclopaedia Britannica, "Yom Kippur."' },
  { id: 'sukkot-2026', name: 'Sukkot', tradition: 'Judaism', date: '2026-09-26', endDate: '2026-10-02', displayDate: 'September 26 – October 2, 2026', description: 'The Feast of Tabernacles, commemorating the Israelites\' 40 years in the wilderness.', source: 'Encyclopaedia Britannica, "Sukkot."' },
  { id: 'hanukkah-2026', name: 'Hanukkah', tradition: 'Judaism', date: '2026-12-05', endDate: '2026-12-13', displayDate: 'December 5–13, 2026', description: 'The Festival of Lights, celebrating the rededication of the Second Temple and the miracle of oil lasting eight days.', source: 'Encyclopaedia Britannica, "Hanukkah."' },

  // HINDUISM
  { id: 'makar-sankranti-2026', name: 'Makar Sankranti / Pongal', tradition: 'Hinduism', date: '2026-01-14', displayDate: 'January 14, 2026', description: 'Harvest festival marking the sun\'s transit into Capricorn. Celebrated with bonfires, sweets, and kite flying.', source: 'Encyclopaedia Britannica, "Sankranti."' },
  { id: 'maha-shivaratri-2026', name: 'Maha Shivaratri', tradition: 'Hinduism', date: '2026-02-15', displayDate: 'February 15, 2026', description: 'The "Great Night of Shiva", a major festival honoring Lord Shiva with fasting, prayer, and all-night vigils.', source: 'Encyclopaedia Britannica, "Shivaratri."' },
  { id: 'holi-2026', name: 'Holi', tradition: 'Hinduism', date: '2026-03-10', displayDate: 'March 10, 2026', description: 'The Festival of Colors, celebrating the arrival of spring and the triumph of good over evil.', source: 'Encyclopaedia Britannica, "Holi."' },
  { id: 'ram-navami-2026', name: 'Ram Navami', tradition: 'Hinduism', date: '2026-03-28', displayDate: 'March 28, 2026', description: 'Celebrates the birth of Lord Rama, the seventh avatar of Vishnu.', source: 'Encyclopaedia Britannica, "Ram Navami."' },
  { id: 'krishna-janmashtami-2026', name: 'Krishna Janmashtami', tradition: 'Hinduism', date: '2026-08-25', displayDate: 'August 25, 2026', description: 'Celebrates the birth of Lord Krishna, the eighth avatar of Vishnu.', source: 'Encyclopaedia Britannica, "Janmashtami."' },
  { id: 'ganesh-chaturthi-2026', name: 'Ganesh Chaturthi', tradition: 'Hinduism', date: '2026-09-08', displayDate: 'September 8, 2026', description: 'Celebrates the birth of Lord Ganesha, the elephant-headed god of wisdom and new beginnings.', source: 'Encyclopaedia Britannica, "Ganesh Chaturthi."' },
  { id: 'navaratri-2026', name: 'Navaratri', tradition: 'Hinduism', date: '2026-10-08', endDate: '2026-10-16', displayDate: 'October 8–16, 2026', description: 'Nine nights of worship dedicated to the goddess Durga, culminating in Dussehra (Vijayadashami).', source: 'Encyclopaedia Britannica, "Navaratri."' },
  { id: 'diwali-2026', name: 'Diwali', tradition: 'Hinduism', date: '2026-10-28', displayDate: 'October 28, 2026', description: 'The Festival of Lights, the most widely celebrated Hindu festival, honoring the triumph of light over darkness.', source: 'Encyclopaedia Britannica, "Diwali."' },

  // BUDDHISM
  { id: 'losar-2026', name: 'Losar (Tibetan New Year)', tradition: 'Buddhism', date: '2026-02-17', displayDate: 'February 17, 2026', description: 'Tibetan Buddhist New Year celebration with prayer flags, rituals, and feasting.', source: 'Encyclopaedia Britannica, "Losar."' },
  { id: 'vesak-2026', name: 'Vesak (Buddha Day)', tradition: 'Buddhism', date: '2026-05-12', displayDate: 'May 12, 2026', description: 'The most important Buddhist festival, commemorating the birth, enlightenment, and death of the Buddha.', source: 'Encyclopaedia Britannica, "Vesak."' },
  { id: 'asalha-puja-2026', name: 'Asalha Puja (Dharma Day)', tradition: 'Buddhism', date: '2026-07-11', displayDate: 'July 11, 2026', description: 'Marks the Buddha\'s first sermon at Deer Park in Sarnath, setting the "wheel of dharma" in motion.', source: 'Encyclopaedia Britannica, "Dhammacakkappavattana Sutta."' },
  { id: 'vassa-2026', name: 'Vassa (Rains Retreat Begins)', tradition: 'Buddhism', date: '2026-07-12', displayDate: 'July 12, 2026', description: 'The three-month monsoon retreat period for Theravada Buddhist monks, devoted to intensive meditation and study.', source: 'Encyclopaedia Britannica, "Vassa."' },
  { id: 'kathina-2026', name: 'Kathina', tradition: 'Buddhism', date: '2026-10-10', displayDate: 'October 10, 2026 (approx.)', description: 'Lay Buddhists offer new robes and supplies to monastics at the end of Vassa.', source: 'Encyclopaedia Britannica, "Kathina."' },

  // SIKHISM
  { id: 'lohri-2026', name: 'Lohri', tradition: 'Sikhism', date: '2026-01-13', displayDate: 'January 13, 2026', description: 'Punjabi winter harvest festival celebrated with bonfires, singing, and dancing.', source: 'Encyclopaedia Britannica, "Lohri."' },
  { id: 'vaisakhi-2026', name: 'Vaisakhi', tradition: 'Sikhism', date: '2026-04-14', displayDate: 'April 14, 2026', description: 'Celebrates the founding of the Khalsa by Guru Gobind Singh in 1699 and the spring harvest.', source: 'Encyclopaedia Britannica, "Vaisakhi."' },
  { id: 'guru-nanak-gurpurab-2026', name: 'Guru Nanak Gurpurab', tradition: 'Sikhism', date: '2026-11-08', displayDate: 'November 8, 2026', description: 'Celebrates the birth of Guru Nanak, the founder of Sikhism, with prayers, processions, and langar.', source: 'Encyclopaedia Britannica, "Guru Nanak."' },
  { id: 'guru-gobind-singh-birthday-2026', name: 'Guru Gobind Singh Jayanti', tradition: 'Sikhism', date: '2026-01-05', displayDate: 'January 5, 2026', description: 'Celebrates the birth of Guru Gobind Singh, the tenth Sikh Guru and founder of the Khalsa.', source: 'Encyclopaedia Britannica, "Guru Gobind Singh."' },

  // BAHÁ'Í
  { id: 'naw-ruz-2026', name: 'Naw-Rúz (Bahá\'í New Year)', tradition: 'Bahá\'í', date: '2026-03-20', displayDate: 'March 20, 2026', description: 'The Bahá\'í New Year, coinciding with the spring equinox, ending the 19-day fast.', source: 'Encyclopaedia Britannica, "Bahá\'í calendar."' },
  { id: 'ridvan-2026', name: 'Festival of Ridván', tradition: 'Bahá\'í', date: '2026-04-21', endDate: '2026-05-02', displayDate: 'April 21 – May 2, 2026', description: 'The holiest Bahá\'í festival, commemorating Bahá\'u\'lláh\'s declaration of his mission in the Garden of Ridván.', source: 'Encyclopaedia Britannica, "Ridván."' },
  { id: 'birth-of-bab-2026', name: 'Birth of the Báb', tradition: 'Bahá\'í', date: '2026-10-28', displayDate: 'October 28, 2026 (approx.)', description: 'Celebrates the birth of the Báb, the forerunner of Bahá\'u\'lláh.', source: 'Encyclopaedia Britannica, "Báb."' },

  // JAINISM
  { id: 'mahavir-jayanti-2026', name: 'Mahavir Jayanti', tradition: 'Jainism', date: '2026-04-06', displayDate: 'April 6, 2026', description: 'Celebrates the birth of Mahavira, the 24th and last Tirthankara and founder of Jainism as a historical religion.', source: 'Encyclopaedia Britannica, "Mahavira."' },
  { id: 'paryushana-2026', name: 'Paryushana', tradition: 'Jainism', date: '2026-08-22', endDate: '2026-08-30', displayDate: 'August 22–30, 2026 (approx.)', description: 'The most important Jain festival, an 8-day period of fasting, prayer, and forgiveness.', source: 'Encyclopaedia Britannica, "Paryushana."' },
  { id: 'diwali-jain-2026', name: 'Diwali (Jain observance)', tradition: 'Jainism', date: '2026-10-28', displayDate: 'October 28, 2026', description: 'Marks the nirvana (final liberation) of Mahavira. Celebrated with lights, prayers, and reflections on nonviolence.', source: 'Encyclopaedia Britannica, "Jain festivals."' },

  // SHINTO
  { id: 'oshogatsu-2026', name: 'Ōshōgatsu (New Year)', tradition: 'Shinto', date: '2026-01-01', displayDate: 'January 1, 2026', description: 'Japan\'s most important holiday. Shinto shrines welcome millions of visitors for hatsumōde (first shrine visit).', source: 'Encyclopaedia Britannica, "Japanese New Year."' },
  { id: 'setsubun-2026', name: 'Setsubun', tradition: 'Shinto', date: '2026-02-03', displayDate: 'February 3, 2026', description: 'Bean-throwing festival marking the beginning of spring. Rituals ward off evil spirits.', source: 'Encyclopaedia Britannica, "Setsubun."' },
  { id: 'shichi-go-san-2026', name: 'Shichi-Go-San', tradition: 'Shinto', date: '2026-11-15', displayDate: 'November 15, 2026', description: 'Festival for children aged 3, 5, and 7, who visit Shinto shrines to pray for health and growth.', source: 'Encyclopaedia Britannica, "Shichi-go-san."' },

  // ZOROASTRIANISM
  { id: 'nowruz-zoro-2026', name: 'Nowruz', tradition: 'Zoroastrianism', date: '2026-03-20', displayDate: 'March 20, 2026', description: 'The Zoroastrian New Year at the spring equinox, the oldest continuously celebrated holiday on earth.', source: 'Encyclopaedia Britannica, "Nowruz."' },
  { id: 'khordad-sal-2026', name: 'Khordad Sal', tradition: 'Zoroastrianism', date: '2026-03-26', displayDate: 'March 26, 2026 (approx.)', description: 'Celebrates the birth of Zoroaster (Zarathustra), the prophet and founder of Zoroastrianism.', source: 'Encyclopaedia Britannica, "Zoroaster."' },
].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;
