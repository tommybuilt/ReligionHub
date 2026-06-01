-- ============================================================
-- ReligionCompare — Seed Data
-- Taxonomy + example claims + citations to prove the pipeline
-- ============================================================

-- System admin user (password will be set via setup endpoint)
INSERT INTO users (id, email, username, display_name, password_hash, role, is_active, email_verified, created_at, updated_at)
VALUES ('usr_system', 'support@tpsworldwide.net', 'admin', 'System Admin', 'SETUP_REQUIRED', 'admin', 1, 1, datetime('now'), datetime('now'));

-- ============================================================
-- RELIGIONS
-- ============================================================

INSERT INTO religions (id, slug, parent_id, display_order) VALUES
  ('rel_christianity', 'christianity', NULL, 1),
  ('rel_islam', 'islam', NULL, 2),
  ('rel_hinduism', 'hinduism', NULL, 3),
  ('rel_buddhism', 'buddhism', NULL, 4),
  ('rel_judaism', 'judaism', NULL, 5),
  ('rel_sikhism', 'sikhism', NULL, 6),
  ('rel_unaffiliated', 'unaffiliated', NULL, 7),
  ('rel_chinese_ea', 'chinese-east-asian-traditions', NULL, 8),
  ('rel_shinto', 'shinto', NULL, 9),
  ('rel_jainism', 'jainism', NULL, 10),
  ('rel_bahai', 'bahai-faith', NULL, 11),
  ('rel_indigenous', 'indigenous-traditional-religions', NULL, 12);

-- Religion Translations (English)
INSERT INTO religion_translations (id, religion_id, locale, name, summary, overview) VALUES
  ('rt_christianity_en', 'rel_christianity', 'en', 'Christianity', 'A monotheistic Abrahamic religion based on the life and teachings of Jesus of Nazareth.', 'Christianity is the world''s largest religion by number of adherents. It is centered on the belief that Jesus of Nazareth is the Son of God and the Messiah (Christ) prophesied in the Hebrew Bible. Christians believe in the Trinity — one God in three persons: Father, Son, and Holy Spirit. The religion emerged in the 1st century CE in the Levant region of the Roman Empire and has since spread globally, diversifying into numerous denominations and traditions.'),
  ('rt_islam_en', 'rel_islam', 'en', 'Islam', 'A monotheistic Abrahamic religion articulated by the Quran and the teachings of Muhammad.', 'Islam is the second-largest religion in the world. Muslims believe in one God (Allah) and that Muhammad is the final prophet in a line that includes Abraham, Moses, and Jesus. The Quran, revealed to Muhammad over approximately 23 years, is considered the literal word of God. Islam emerged in the 7th century CE in the Arabian Peninsula and encompasses a comprehensive way of life including spiritual practice, law, ethics, and community governance.'),
  ('rt_hinduism_en', 'rel_hinduism', 'en', 'Hinduism', 'A diverse system of thought and practice originating in the Indian subcontinent.', 'Hinduism is one of the oldest religions in the world, with roots tracing back over 4,000 years to the Indus Valley civilization and the Vedic period. It encompasses a wide range of philosophies, beliefs, and rituals. Rather than a single founder or unified creed, Hinduism is a family of traditions that share certain core concepts including dharma (duty/righteousness), karma (action and consequence), samsara (cycle of rebirth), and moksha (liberation). It is the third-largest religion globally.'),
  ('rt_buddhism_en', 'rel_buddhism', 'en', 'Buddhism', 'A nontheistic religion and philosophy based on the teachings of Siddhartha Gautama (the Buddha).', 'Buddhism originated in the 5th century BCE in what is now Nepal and northern India, founded on the teachings of Siddhartha Gautama, who became known as the Buddha ("the awakened one"). The core teachings center on the Four Noble Truths and the Eightfold Path as a means to end suffering (dukkha) and achieve nirvana. Buddhism has diversified into several major traditions including Theravada, Mahayana, and Vajrayana, and has spread throughout Asia and increasingly worldwide.'),
  ('rt_judaism_en', 'rel_judaism', 'en', 'Judaism', 'A monotheistic Abrahamic religion based on the Torah and Talmudic tradition.', 'Judaism is one of the oldest monotheistic religions, originating in the ancient Near East. It is based on the covenant between God and the people of Israel as described in the Hebrew Bible (Tanakh). Central to Jewish belief and practice are the Torah (the first five books of the Hebrew Bible), the Talmud (rabbinic commentary and law), and the observance of commandments (mitzvot). Judaism has given rise to several major movements including Orthodox, Conservative, Reform, and Reconstructionist.'),
  ('rt_sikhism_en', 'rel_sikhism', 'en', 'Sikhism', 'A monotheistic religion founded in the Punjab region of South Asia in the 15th century.', 'Sikhism was founded by Guru Nanak Dev Ji in the Punjab region in the late 15th century CE. It is based on the teachings of ten Gurus and the Guru Granth Sahib, the religion''s primary scripture, which is considered the eternal living Guru. Sikhs believe in one God (Ik Onkar), the equality of all people, service to others, and honest living. With approximately 25-30 million adherents worldwide, Sikhism is the fifth-largest organized religion.'),
  ('rt_unaffiliated_en', 'rel_unaffiliated', 'en', 'Unaffiliated / Nonreligious', 'Individuals who do not identify with any organized religion, including atheists, agnostics, and secular persons.', 'The religiously unaffiliated — sometimes called "nones" — represent a growing demographic worldwide. This category includes atheists (who do not believe in the existence of deities), agnostics (who hold that the existence of deities is unknown or unknowable), and those who identify as secular or simply having no religion. This is not a monolithic group; individuals within it hold diverse philosophical positions and may still engage with spiritual practices or cultural religious traditions.'),
  ('rt_chinese_ea_en', 'rel_chinese_ea', 'en', 'Chinese & East Asian Traditions', 'A grouping of religious and philosophical traditions originating in China and East Asia.', 'This category encompasses several distinct but historically interrelated traditions originating in China and East Asia. These include Daoism (Taoism), Confucian traditions, and various forms of folk religion. In practice, many adherents in East Asia draw from multiple traditions simultaneously, and the boundaries between these traditions are often fluid. Scholars note that the Western concept of "religion" as a discrete category does not always map neatly onto these traditions.'),
  ('rt_shinto_en', 'rel_shinto', 'en', 'Shinto', 'An indigenous religion of Japan centered on kami (spirits or sacred essences).', 'Shinto is the indigenous spiritual tradition of Japan, centered on the veneration of kami — spirits or sacred essences found in natural phenomena, ancestors, and sacred places. Shinto has no single founder, no fixed dogma, and no centralized authority. It emphasizes ritual purity, harmony with nature, and community festivals (matsuri). Historically, Shinto has coexisted and blended with Buddhism in Japan, and many Japanese people participate in both Shinto and Buddhist practices.'),
  ('rt_jainism_en', 'rel_jainism', 'en', 'Jainism', 'An ancient Indian religion emphasizing non-violence, truth, and asceticism.', 'Jainism is an ancient Indian religion that teaches a path to spiritual purity and enlightenment through disciplined nonviolence (ahimsa) to all living beings. Jains trace their tradition through a succession of 24 Tirthankaras (ford-makers), with Mahavira (6th-5th century BCE) as the most recent. Core principles include non-violence, truth (satya), non-stealing (asteya), celibacy/chastity (brahmacharya), and non-attachment (aparigraha). Jainism has approximately 4-5 million adherents, primarily in India.'),
  ('rt_bahai_en', 'rel_bahai', 'en', 'Baha''i Faith', 'A monotheistic religion founded in 19th-century Persia emphasizing the unity of all religions and humanity.', 'The Baha''i Faith was founded by Baha''u''llah in 19th-century Persia (modern-day Iran). It teaches the essential unity of all religions and the oneness of humanity. Baha''is believe that religious truth is revealed progressively by a series of divine messengers, including Abraham, Moses, Buddha, Jesus, Muhammad, and Baha''u''llah. The religion emphasizes the elimination of prejudice, equality of men and women, universal education, and the harmony of science and religion. It has approximately 5-8 million adherents worldwide.'),
  ('rt_indigenous_en', 'rel_indigenous', 'en', 'Indigenous & Traditional Religions', 'Diverse spiritual traditions of indigenous peoples across the world.', 'Indigenous and traditional religions encompass a vast diversity of spiritual beliefs and practices among indigenous peoples worldwide. These traditions are not a single religion but rather thousands of distinct traditions, each tied to specific peoples, lands, and cultures. Common themes across many (but not all) indigenous traditions include animism, ancestor veneration, oral transmission of sacred knowledge, and deep connection to specific landscapes. Scholars caution against treating these diverse traditions as a monolithic category.');

-- ============================================================
-- DENOMINATIONS
-- ============================================================

-- Christianity denominations
INSERT INTO denominations (id, religion_id, parent_denomination_id, slug, display_order) VALUES
  ('den_catholicism', 'rel_christianity', NULL, 'catholicism', 1),
  ('den_eastern_orthodoxy', 'rel_christianity', NULL, 'eastern-orthodoxy', 2),
  ('den_protestantism', 'rel_christianity', NULL, 'protestantism', 3),
  ('den_anglican', 'rel_christianity', 'den_protestantism', 'anglican-episcopal', 4),
  ('den_baptist', 'rel_christianity', 'den_protestantism', 'baptist', 5),
  ('den_lutheran', 'rel_christianity', 'den_protestantism', 'lutheran', 6),
  ('den_methodist', 'rel_christianity', 'den_protestantism', 'methodist', 7),
  ('den_presbyterian', 'rel_christianity', 'den_protestantism', 'presbyterian-reformed', 8),
  ('den_pentecostal', 'rel_christianity', 'den_protestantism', 'pentecostal-charismatic', 9),
  ('den_nondenominational', 'rel_christianity', 'den_protestantism', 'non-denominational', 10),
  ('den_restorationist', 'rel_christianity', NULL, 'restorationist', 11),
  ('den_lds', 'rel_christianity', 'den_restorationist', 'latter-day-saints', 12),
  ('den_jw', 'rel_christianity', 'den_restorationist', 'jehovahs-witnesses', 13);

-- Islam denominations
INSERT INTO denominations (id, religion_id, parent_denomination_id, slug, display_order) VALUES
  ('den_sunni', 'rel_islam', NULL, 'sunni', 1),
  ('den_shia', 'rel_islam', NULL, 'shia', 2),
  ('den_ibadi', 'rel_islam', NULL, 'ibadi', 3),
  ('den_sufism', 'rel_islam', NULL, 'sufism', 4);

-- Hinduism denominations
INSERT INTO denominations (id, religion_id, parent_denomination_id, slug, display_order) VALUES
  ('den_vaishnavism', 'rel_hinduism', NULL, 'vaishnavism', 1),
  ('den_shaivism', 'rel_hinduism', NULL, 'shaivism', 2),
  ('den_shaktism', 'rel_hinduism', NULL, 'shaktism', 3),
  ('den_smartism', 'rel_hinduism', NULL, 'smartism', 4);

-- Buddhism denominations
INSERT INTO denominations (id, religion_id, parent_denomination_id, slug, display_order) VALUES
  ('den_theravada', 'rel_buddhism', NULL, 'theravada', 1),
  ('den_mahayana', 'rel_buddhism', NULL, 'mahayana', 2),
  ('den_zen', 'rel_buddhism', 'den_mahayana', 'zen', 3),
  ('den_pure_land', 'rel_buddhism', 'den_mahayana', 'pure-land', 4),
  ('den_vajrayana', 'rel_buddhism', NULL, 'vajrayana', 5);

-- Judaism denominations
INSERT INTO denominations (id, religion_id, parent_denomination_id, slug, display_order) VALUES
  ('den_orthodox_judaism', 'rel_judaism', NULL, 'orthodox', 1),
  ('den_conservative_judaism', 'rel_judaism', NULL, 'conservative', 2),
  ('den_reform_judaism', 'rel_judaism', NULL, 'reform', 3),
  ('den_reconstructionist', 'rel_judaism', NULL, 'reconstructionist', 4);

-- Unaffiliated sub-categories
INSERT INTO denominations (id, religion_id, parent_denomination_id, slug, display_order) VALUES
  ('den_atheism', 'rel_unaffiliated', NULL, 'atheism', 1),
  ('den_agnosticism', 'rel_unaffiliated', NULL, 'agnosticism', 2),
  ('den_secular', 'rel_unaffiliated', NULL, 'secular-no-religion', 3);

-- Chinese/EA traditions
INSERT INTO denominations (id, religion_id, parent_denomination_id, slug, display_order) VALUES
  ('den_daoism', 'rel_chinese_ea', NULL, 'daoism-taoism', 1),
  ('den_confucian', 'rel_chinese_ea', NULL, 'confucian-traditions', 2),
  ('den_folk_religion', 'rel_chinese_ea', NULL, 'folk-religion', 3);

-- Denomination Translations (English) — selected key ones
INSERT INTO denomination_translations (id, denomination_id, locale, name, summary, overview) VALUES
  ('dt_catholicism_en', 'den_catholicism', 'en', 'Catholicism', 'The largest Christian denomination, led by the Pope in Rome.', 'The Catholic Church is the largest Christian church, with approximately 1.3 billion baptized members worldwide. It traces its history to the apostles of Jesus Christ, particularly Saint Peter, whom Catholics regard as the first pope. The Church is led by the Bishop of Rome (the Pope) and is organized into dioceses overseen by bishops. Catholic theology emphasizes the seven sacraments, the authority of Sacred Scripture and Sacred Tradition, and the teaching authority (Magisterium) of the Church.'),
  ('dt_eastern_orthodoxy_en', 'den_eastern_orthodoxy', 'en', 'Eastern Orthodoxy', 'A communion of autocephalous churches tracing their origins to the early Church.', 'Eastern Orthodoxy comprises a communion of autocephalous (self-governing) churches that share a common theology, liturgical practice, and canonical tradition. The Orthodox churches trace their origins to the early Christian communities established by the apostles. Major Orthodox churches include the Ecumenical Patriarchate of Constantinople, the Russian Orthodox Church, the Greek Orthodox Church, and others. Orthodox theology emphasizes theosis (divinization), the Holy Tradition, the seven ecumenical councils, and the Divine Liturgy.'),
  ('dt_protestantism_en', 'den_protestantism', 'en', 'Protestantism', 'A broad movement within Christianity originating from the 16th-century Reformation.', 'Protestantism encompasses a diverse range of Christian denominations and traditions that trace their origins to the 16th-century Reformation, particularly the work of Martin Luther, John Calvin, and other reformers. Protestant theology generally emphasizes the authority of Scripture alone (sola scriptura), justification by faith alone (sola fide), and the priesthood of all believers. Protestantism includes thousands of denominations worldwide.'),
  ('dt_sunni_en', 'den_sunni', 'en', 'Sunni Islam', 'The largest branch of Islam, followed by approximately 85-90% of Muslims.', 'Sunni Islam is the largest denomination of Islam, comprising approximately 85-90% of the world''s Muslim population. The term "Sunni" derives from "Ahl al-Sunnah" (people of the tradition), referring to the practices and teachings of the Prophet Muhammad. Sunni Muslims recognize the first four caliphs (Abu Bakr, Umar, Uthman, and Ali) as the rightful successors of Muhammad. Sunni jurisprudence is organized into four major schools of law (madhabs): Hanafi, Maliki, Shafi''i, and Hanbali.'),
  ('dt_shia_en', 'den_shia', 'en', 'Shia Islam', 'The second-largest branch of Islam, comprising approximately 10-15% of Muslims.', 'Shia Islam is the second-largest denomination of Islam. Shia Muslims believe that Ali ibn Abi Talib, the cousin and son-in-law of Prophet Muhammad, was his rightful successor as leader of the Muslim community. The term "Shia" derives from "Shi''at Ali" (partisans of Ali). Shia Islam encompasses several sub-branches, the largest being Twelver (Ithna Ashari) Shia, followed by Ismaili and Zaydi branches. Shia theology emphasizes the role of the Imams as divinely guided leaders.'),
  ('dt_sufism_en', 'den_sufism', 'en', 'Sufism', 'The mystical and spiritual dimension of Islam, practiced across Sunni and Shia traditions.', 'Sufism (tasawwuf) is the mystical and spiritual dimension of Islam, emphasizing the inward search for God and the cultivation of the heart. Rather than a separate sect, Sufism is a cross-cutting tradition practiced by both Sunni and Shia Muslims. Sufis seek a direct personal experience of the divine through practices such as dhikr (remembrance of God), meditation, poetry, and music. Sufi orders (tariqas) are organized around a spiritual master (sheikh or murshid) and a chain of spiritual transmission.'),
  ('dt_theravada_en', 'den_theravada', 'en', 'Theravada Buddhism', 'The oldest surviving Buddhist school, predominant in Southeast Asia.', 'Theravada ("Teaching of the Elders") is the oldest surviving school of Buddhism and is predominant in Sri Lanka, Myanmar, Thailand, Cambodia, and Laos. It bases its teachings on the Pali Canon (Tipitaka), considered the oldest complete collection of Buddhist scriptures. Theravada emphasizes individual enlightenment through meditation, moral conduct, and wisdom, with the ideal of the arhat (one who has attained nirvana).'),
  ('dt_mahayana_en', 'den_mahayana', 'en', 'Mahayana Buddhism', 'A major branch of Buddhism emphasizing the bodhisattva path, predominant in East Asia.', 'Mahayana ("Great Vehicle") Buddhism is a major branch of Buddhism that developed around the 1st century BCE to 1st century CE. It is predominant in China, Japan, Korea, Vietnam, and Taiwan. Mahayana Buddhism emphasizes the bodhisattva ideal — the aspiration to attain enlightenment for the benefit of all sentient beings. It includes a vast body of additional scriptures (sutras) beyond the Pali Canon and encompasses diverse schools including Zen, Pure Land, and Tiantai.');

-- ============================================================
-- EXAMPLE CITATIONS (to prove the pipeline)
-- ============================================================

INSERT INTO citations (id, title, publisher, author, url, date_published, date_accessed, excerpt, reliability_tier, created_by) VALUES
  ('cit_pew_2015', 'The Future of World Religions: Population Growth Projections, 2010-2050', 'Pew Research Center', NULL, 'https://www.pewresearch.org/religion/2015/04/02/religious-projections-2010-2050/', '2015-04-02', '2024-01-15', 'Christians remained the largest religious group...', 'primary', 'usr_system'),
  ('cit_britannica_christianity', 'Christianity - Origins, History, Beliefs, & Facts', 'Encyclopaedia Britannica', NULL, 'https://www.britannica.com/topic/Christianity', NULL, '2024-01-15', 'Christianity, major religion stemming from the life...', 'primary', 'usr_system'),
  ('cit_britannica_islam', 'Islam - Five Pillars, Nation of Islam, & Definition', 'Encyclopaedia Britannica', NULL, 'https://www.britannica.com/topic/Islam', NULL, '2024-01-15', 'Islam, major world religion promulgated by the Prophet...', 'primary', 'usr_system'),
  ('cit_britannica_hinduism', 'Hinduism - Origins, Facts, & Beliefs', 'Encyclopaedia Britannica', NULL, 'https://www.britannica.com/topic/Hinduism', NULL, '2024-01-15', 'Hinduism, major world religion originating on the...', 'primary', 'usr_system'),
  ('cit_britannica_buddhism', 'Buddhism - Definition, Beliefs, Origin, & Facts', 'Encyclopaedia Britannica', NULL, 'https://www.britannica.com/topic/Buddhism', NULL, '2024-01-15', 'Buddhism, religion and philosophy that developed from...', 'primary', 'usr_system'),
  ('cit_britannica_judaism', 'Judaism - History, Beliefs, & Facts', 'Encyclopaedia Britannica', NULL, 'https://www.britannica.com/topic/Judaism', NULL, '2024-01-15', 'Judaism, monotheistic religion developed among the...', 'primary', 'usr_system'),
  ('cit_pew_2012_global', 'The Global Religious Landscape', 'Pew Research Center', NULL, 'https://www.pewresearch.org/religion/2012/12/18/global-religious-landscape-exec/', '2012-12-18', '2024-01-15', 'A comprehensive demographic study of more than 230...', 'primary', 'usr_system'),
  ('cit_oxford_handbook', 'The Oxford Handbook of Religious Diversity', 'Oxford University Press', 'Chad Meister', 'https://global.oup.com/academic/product/the-oxford-handbook-of-religious-diversity-9780195340136', '2010-09-01', '2024-01-15', 'A comprehensive academic reference on religious diversity...', 'primary', 'usr_system');

-- ============================================================
-- EXAMPLE CLAIMS (atomic facts with citations)
-- ============================================================

-- Christianity claims
INSERT INTO claims (id, claim_text, subject_type, subject_id, category, locale, status, created_by, updated_by, display_order) VALUES
  ('clm_chr_origin_1', 'Christianity originated in the 1st century CE in the Levant region of the Roman Empire.', 'religion', 'rel_christianity', 'origins', 'en', 'published', 'usr_system', 'usr_system', 1),
  ('clm_chr_belief_1', 'Christians believe in one God who exists as three persons: Father, Son, and Holy Spirit (the Trinity).', 'religion', 'rel_christianity', 'beliefs', 'en', 'published', 'usr_system', 'usr_system', 1),
  ('clm_chr_belief_2', 'Christians believe that Jesus of Nazareth is the Son of God and the Messiah (Christ) prophesied in the Hebrew Bible.', 'religion', 'rel_christianity', 'beliefs', 'en', 'published', 'usr_system', 'usr_system', 2),
  ('clm_chr_demo_1', 'Christianity is the world''s largest religion with approximately 2.4 billion adherents as of 2020.', 'religion', 'rel_christianity', 'demographics', 'en', 'published', 'usr_system', 'usr_system', 1),
  ('clm_chr_text_1', 'The Bible, consisting of the Old Testament and the New Testament, is the primary sacred text of Christianity.', 'religion', 'rel_christianity', 'texts', 'en', 'published', 'usr_system', 'usr_system', 1);

-- Islam claims
INSERT INTO claims (id, claim_text, subject_type, subject_id, category, locale, status, created_by, updated_by, display_order) VALUES
  ('clm_isl_origin_1', 'Islam emerged in the 7th century CE in the Arabian Peninsula, in the city of Mecca.', 'religion', 'rel_islam', 'origins', 'en', 'published', 'usr_system', 'usr_system', 1),
  ('clm_isl_belief_1', 'Muslims believe in one God (Allah) and that Muhammad is the final prophet in a line that includes Abraham, Moses, and Jesus.', 'religion', 'rel_islam', 'beliefs', 'en', 'published', 'usr_system', 'usr_system', 1),
  ('clm_isl_belief_2', 'The Five Pillars of Islam are: shahada (declaration of faith), salat (prayer), zakat (almsgiving), sawm (fasting during Ramadan), and hajj (pilgrimage to Mecca).', 'religion', 'rel_islam', 'beliefs', 'en', 'published', 'usr_system', 'usr_system', 2),
  ('clm_isl_demo_1', 'Islam is the second-largest religion in the world with approximately 1.9 billion adherents as of 2020.', 'religion', 'rel_islam', 'demographics', 'en', 'published', 'usr_system', 'usr_system', 1),
  ('clm_isl_text_1', 'The Quran, believed by Muslims to be the literal word of God as revealed to Muhammad, is the primary sacred text of Islam.', 'religion', 'rel_islam', 'texts', 'en', 'published', 'usr_system', 'usr_system', 1);

-- Hinduism claims
INSERT INTO claims (id, claim_text, subject_type, subject_id, category, locale, status, created_by, updated_by, display_order) VALUES
  ('clm_hin_origin_1', 'Hinduism has roots tracing back over 4,000 years to the Indus Valley civilization and the Vedic period in the Indian subcontinent.', 'religion', 'rel_hinduism', 'origins', 'en', 'published', 'usr_system', 'usr_system', 1),
  ('clm_hin_belief_1', 'Core concepts shared across Hindu traditions include dharma (duty/righteousness), karma (action and consequence), samsara (cycle of rebirth), and moksha (liberation).', 'religion', 'rel_hinduism', 'beliefs', 'en', 'published', 'usr_system', 'usr_system', 1),
  ('clm_hin_demo_1', 'Hinduism is the third-largest religion globally with approximately 1.2 billion adherents as of 2020.', 'religion', 'rel_hinduism', 'demographics', 'en', 'published', 'usr_system', 'usr_system', 1),
  ('clm_hin_text_1', 'The Vedas (Rigveda, Yajurveda, Samaveda, Atharvaveda) are among the oldest sacred texts in Hinduism, composed between approximately 1500-500 BCE.', 'religion', 'rel_hinduism', 'texts', 'en', 'published', 'usr_system', 'usr_system', 1);

-- Buddhism claims
INSERT INTO claims (id, claim_text, subject_type, subject_id, category, locale, status, created_by, updated_by, display_order) VALUES
  ('clm_bud_origin_1', 'Buddhism originated in the 5th century BCE in what is now Nepal and northern India, based on the teachings of Siddhartha Gautama.', 'religion', 'rel_buddhism', 'origins', 'en', 'published', 'usr_system', 'usr_system', 1),
  ('clm_bud_belief_1', 'The Four Noble Truths are central to Buddhist teaching: the truth of suffering (dukkha), the truth of the origin of suffering, the truth of the cessation of suffering, and the truth of the path leading to cessation.', 'religion', 'rel_buddhism', 'beliefs', 'en', 'published', 'usr_system', 'usr_system', 1),
  ('clm_bud_belief_2', 'The Noble Eightfold Path consists of right view, right intention, right speech, right action, right livelihood, right effort, right mindfulness, and right concentration.', 'religion', 'rel_buddhism', 'beliefs', 'en', 'published', 'usr_system', 'usr_system', 2),
  ('clm_bud_demo_1', 'Buddhism has approximately 500 million adherents worldwide as of 2020.', 'religion', 'rel_buddhism', 'demographics', 'en', 'published', 'usr_system', 'usr_system', 1);

-- Judaism claims
INSERT INTO claims (id, claim_text, subject_type, subject_id, category, locale, status, created_by, updated_by, display_order) VALUES
  ('clm_jud_origin_1', 'Judaism is one of the oldest monotheistic religions, originating in the ancient Near East approximately 3,500 years ago.', 'religion', 'rel_judaism', 'origins', 'en', 'published', 'usr_system', 'usr_system', 1),
  ('clm_jud_belief_1', 'Judaism is based on the covenant between God and the people of Israel as described in the Hebrew Bible (Tanakh).', 'religion', 'rel_judaism', 'beliefs', 'en', 'published', 'usr_system', 'usr_system', 1),
  ('clm_jud_text_1', 'The Torah (the first five books of the Hebrew Bible) and the Talmud (rabbinic commentary and law) are central texts in Judaism.', 'religion', 'rel_judaism', 'texts', 'en', 'published', 'usr_system', 'usr_system', 1),
  ('clm_jud_demo_1', 'Judaism has approximately 14-15 million adherents worldwide as of 2020.', 'religion', 'rel_judaism', 'demographics', 'en', 'published', 'usr_system', 'usr_system', 1);

-- ============================================================
-- CLAIM-CITATION LINKS
-- ============================================================

INSERT INTO claim_citations (claim_id, citation_id, supports_field) VALUES
  ('clm_chr_origin_1', 'cit_britannica_christianity', 'origin_date_location'),
  ('clm_chr_belief_1', 'cit_britannica_christianity', 'trinity_doctrine'),
  ('clm_chr_belief_2', 'cit_britannica_christianity', 'messiah_belief'),
  ('clm_chr_demo_1', 'cit_pew_2015', 'adherent_count'),
  ('clm_chr_demo_1', 'cit_pew_2012_global', 'adherent_count'),
  ('clm_chr_text_1', 'cit_britannica_christianity', 'sacred_texts'),
  ('clm_isl_origin_1', 'cit_britannica_islam', 'origin_date_location'),
  ('clm_isl_belief_1', 'cit_britannica_islam', 'core_beliefs'),
  ('clm_isl_belief_2', 'cit_britannica_islam', 'five_pillars'),
  ('clm_isl_demo_1', 'cit_pew_2015', 'adherent_count'),
  ('clm_isl_text_1', 'cit_britannica_islam', 'sacred_texts'),
  ('clm_hin_origin_1', 'cit_britannica_hinduism', 'origin_date'),
  ('clm_hin_belief_1', 'cit_britannica_hinduism', 'core_concepts'),
  ('clm_hin_demo_1', 'cit_pew_2015', 'adherent_count'),
  ('clm_hin_text_1', 'cit_britannica_hinduism', 'sacred_texts'),
  ('clm_bud_origin_1', 'cit_britannica_buddhism', 'origin_date_location'),
  ('clm_bud_belief_1', 'cit_britannica_buddhism', 'four_noble_truths'),
  ('clm_bud_belief_2', 'cit_britannica_buddhism', 'eightfold_path'),
  ('clm_bud_demo_1', 'cit_pew_2012_global', 'adherent_count'),
  ('clm_jud_origin_1', 'cit_britannica_judaism', 'origin_date'),
  ('clm_jud_belief_1', 'cit_britannica_judaism', 'covenant_belief'),
  ('clm_jud_text_1', 'cit_britannica_judaism', 'sacred_texts'),
  ('clm_jud_demo_1', 'cit_pew_2012_global', 'adherent_count');

-- ============================================================
-- SOURCE REGISTRY
-- ============================================================

INSERT INTO sources_registry (id, domain, publisher_name, reliability_tier, notes, is_approved, created_by) VALUES
  ('src_pew', 'pewresearch.org', 'Pew Research Center', 'primary', 'Nonpartisan fact tank; widely cited demographic research on religion.', 1, 'usr_system'),
  ('src_britannica', 'britannica.com', 'Encyclopaedia Britannica', 'primary', 'Long-established general encyclopedia with expert-reviewed articles.', 1, 'usr_system'),
  ('src_oup', 'global.oup.com', 'Oxford University Press', 'primary', 'Academic publisher; peer-reviewed scholarly works.', 1, 'usr_system'),
  ('src_cup', 'cambridge.org', 'Cambridge University Press', 'primary', 'Academic publisher; peer-reviewed scholarly works.', 1, 'usr_system'),
  ('src_stanford', 'plato.stanford.edu', 'Stanford Encyclopedia of Philosophy', 'primary', 'Peer-reviewed academic encyclopedia maintained by Stanford University.', 1, 'usr_system');

-- ============================================================
-- FORUM BOARDS
-- ============================================================

INSERT INTO forum_boards (id, slug, religion_id, display_order) VALUES
  ('board_general', 'general-discussion', NULL, 1),
  ('board_comparative', 'comparative-questions', NULL, 2),
  ('board_history', 'history', NULL, 3),
  ('board_practices', 'practices', NULL, 4),
  ('board_texts', 'sacred-texts', NULL, 5),
  ('board_christianity', 'christianity', 'rel_christianity', 10),
  ('board_islam', 'islam', 'rel_islam', 11),
  ('board_hinduism', 'hinduism', 'rel_hinduism', 12),
  ('board_buddhism', 'buddhism', 'rel_buddhism', 13),
  ('board_judaism', 'judaism', 'rel_judaism', 14);

INSERT INTO forum_board_translations (id, board_id, locale, name, description) VALUES
  ('fbt_general_en', 'board_general', 'en', 'General Discussion', 'Open discussion about world religions and comparative topics.'),
  ('fbt_comparative_en', 'board_comparative', 'en', 'Comparative Questions', 'Ask and discuss questions comparing different religious traditions.'),
  ('fbt_history_en', 'board_history', 'en', 'History', 'Discussion of religious history, historical events, and timelines.'),
  ('fbt_practices_en', 'board_practices', 'en', 'Practices & Rituals', 'Discussion of religious practices, rituals, and observances.'),
  ('fbt_texts_en', 'board_texts', 'en', 'Sacred Texts', 'Discussion of religious scriptures, texts, and their interpretations.'),
  ('fbt_christianity_en', 'board_christianity', 'en', 'Christianity', 'Discussion related to Christianity and its denominations.'),
  ('fbt_islam_en', 'board_islam', 'en', 'Islam', 'Discussion related to Islam and its traditions.'),
  ('fbt_hinduism_en', 'board_hinduism', 'en', 'Hinduism', 'Discussion related to Hinduism and its traditions.'),
  ('fbt_buddhism_en', 'board_buddhism', 'en', 'Buddhism', 'Discussion related to Buddhism and its traditions.'),
  ('fbt_judaism_en', 'board_judaism', 'en', 'Judaism', 'Discussion related to Judaism and its movements.');

-- ============================================================
-- EXAMPLE QUIZ
-- ============================================================

INSERT INTO quizzes (id, slug, quiz_type, religion_id, is_published, created_by) VALUES
  ('quiz_world_religions', 'world-religions-basics', 'knowledge', NULL, 1, 'usr_system');

INSERT INTO quiz_translations (id, quiz_id, locale, title, description, disclaimer) VALUES
  ('qt_wr_en', 'quiz_world_religions', 'en', 'World Religions Basics', 'Test your knowledge of the fundamental facts about major world religions.', 'This quiz tests factual knowledge only. All questions are based on widely accepted scholarly sources.');

INSERT INTO quiz_questions (id, quiz_id, question_type, display_order, citation_id) VALUES
  ('qq_wr_1', 'quiz_world_religions', 'multiple_choice', 1, 'cit_pew_2015'),
  ('qq_wr_2', 'quiz_world_religions', 'multiple_choice', 2, 'cit_britannica_islam'),
  ('qq_wr_3', 'quiz_world_religions', 'multiple_choice', 3, 'cit_britannica_buddhism');

INSERT INTO quiz_question_translations (id, question_id, locale, question_text, options_json, explanation) VALUES
  ('qqt_wr_1_en', 'qq_wr_1', 'en', 'Which is the largest religion in the world by number of adherents?',
   '{"options": [{"id": "a", "text": "Islam", "correct": false}, {"id": "b", "text": "Christianity", "correct": true}, {"id": "c", "text": "Hinduism", "correct": false}, {"id": "d", "text": "Buddhism", "correct": false}]}',
   'According to Pew Research Center, Christianity is the largest religion with approximately 2.4 billion adherents worldwide.'),
  ('qqt_wr_2_en', 'qq_wr_2', 'en', 'How many pillars of Islam are there?',
   '{"options": [{"id": "a", "text": "Three", "correct": false}, {"id": "b", "text": "Four", "correct": false}, {"id": "c", "text": "Five", "correct": true}, {"id": "d", "text": "Seven", "correct": false}]}',
   'The Five Pillars of Islam are shahada, salat, zakat, sawm, and hajj.'),
  ('qqt_wr_3_en', 'qq_wr_3', 'en', 'What are the Four Noble Truths central to?',
   '{"options": [{"id": "a", "text": "Hinduism", "correct": false}, {"id": "b", "text": "Jainism", "correct": false}, {"id": "c", "text": "Buddhism", "correct": true}, {"id": "d", "text": "Sikhism", "correct": false}]}',
   'The Four Noble Truths are a foundational teaching in Buddhism, articulated by Siddhartha Gautama (the Buddha).');
