-- ============================================================
-- Skillza — Demo Account Seed
-- Run this once in the Supabase SQL editor.
-- Creates 5 fully-populated demo student profiles + packages.
-- Safe to re-run: uses WHERE NOT EXISTS checks.
-- ============================================================

-- ── 1. SIPHO DLAMINI — Photography / UCT / Cape Town ─────────
DO $$
DECLARE v_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM students WHERE email = 'sipho.dlamini@myuct.ac.za') THEN
    INSERT INTO students (
      name, short_name, university, degree, year, skill, secondary_skill, category,
      bio, emoji, city, starting_price, price_unit, rating, review_count,
      verified, active, email, whatsapp, student_number,
      portfolio_links, availability, extra_info, tags
    ) VALUES (
      'Sipho Dlamini', 'Sipho D.', 'UCT', 'BA Visual Arts', '3rd Year',
      'Photography', 'Videography', 'photography',
      'Event and portrait photographer specialising in authentic moments that tell your story. Currently in my 3rd year at UCT studying Visual Arts. I''ve shot 50+ events across Cape Town from corporate functions to intimate birthday parties. Fast turnaround, great communication, and photos that actually look like you.',
      '📸', 'Cape Town', '600', 'session', 4.8, 14,
      true, true, 'sipho.dlamini@myuct.ac.za', '+27 82 345 6789', 'UCT2022-1103',
      E'https://instagram.com/siphoshootsct\nhttps://behance.net/siphodlamini',
      ARRAY['Weekday evenings', 'Saturdays', 'Sundays'],
      'Own a Sony A7III with 50mm f/1.8 and 85mm f/1.8. Available for travel within 50km of Cape Town CBD. Speak isiXhosa and English.',
      ARRAY['events', 'portraits', 'corporate', 'graduation']
    ) RETURNING id INTO v_id;

    INSERT INTO student_pricing (student_id, name, description, price, unit, featured, sort_order) VALUES
      (v_id, 'Basic',    '1-hr session · 20 edited photos delivered in 5 days',        'R600',  'session', false, 1),
      (v_id, 'Standard', '2-hr session · 50 edited photos + 1 location',                'R1,100', 'session', true,  2),
      (v_id, 'Premium',  'Half-day shoot · 100+ photos · 2 locations · same-week delivery', 'R2,000', 'session', false, 3);
  END IF;
END $$;

-- ── 2. KEYLA MENDES — Graphic Design / Wits / Johannesburg ───
DO $$
DECLARE v_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM students WHERE email = 'keyla.mendes@students.wits.ac.za') THEN
    INSERT INTO students (
      name, short_name, university, degree, year, skill, secondary_skill, category,
      bio, emoji, city, starting_price, price_unit, rating, review_count,
      verified, active, email, whatsapp, student_number,
      portfolio_links, availability, extra_info, tags
    ) VALUES (
      'Keyla Mendes', 'Keyla M.', 'Wits', 'BCom Graphic Design', '2nd Year',
      'Graphic Design', 'Web Development', 'graphic-design',
      'Brand strategist and visual designer helping small businesses and creators look their absolute best. 2nd-year BCom Graphic Design student at Wits with a passion for logos, social media content, and full brand identities that actually convert. I''ve worked with 20+ local businesses and my designs have landed on Joburg street billboards. I believe great design is invisible — it just feels right.',
      '🎨', 'Johannesburg', '800', 'project', 4.9, 22,
      true, true, 'keyla.mendes@students.wits.ac.za', '+27 73 456 7890', 'WITS2023-0047',
      E'https://behance.net/keylamendesdesign\nhttps://instagram.com/keyla.creates\nhttps://keylamendes.co.za',
      ARRAY['Weekdays', 'Weekday evenings', 'Flexible'],
      'Adobe CC (Illustrator, Photoshop, InDesign, Premiere). Figma, Canva Pro. Fluent in English and Portuguese. Available for rush turnaround at an additional 20% fee.',
      ARRAY['logos', 'branding', 'social media', 'print', 'web']
    ) RETURNING id INTO v_id;

    INSERT INTO student_pricing (student_id, name, description, price, unit, featured, sort_order) VALUES
      (v_id, 'Logo Pack',        '3 concepts · 2 revision rounds · all source files included',   'R800',  'project', false, 1),
      (v_id, 'Brand Kit',        'Logo + colour palette + fonts + business card + letterhead',    'R2,000', 'project', true,  2),
      (v_id, 'Social Media Pack','10 custom posts + 5 story templates + Canva editable files',   'R1,500', 'project', false, 3);
  END IF;
END $$;

-- ── 3. AMAHLE KHUMALO — Videography / AFDA / Cape Town ───────
DO $$
DECLARE v_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM students WHERE email = 'amahle.khumalo@afda.ac.za') THEN
    INSERT INTO students (
      name, short_name, university, degree, year, skill, secondary_skill, category,
      bio, emoji, city, starting_price, price_unit, rating, review_count,
      verified, active, email, whatsapp, student_number,
      portfolio_links, availability, extra_info, tags
    ) VALUES (
      'Amahle Khumalo', 'Amahle K.', 'AFDA', 'BA Film & Media Production', '3rd Year',
      'Videography', 'Photography', 'videography',
      'Cinematographer and editor with a cinematic eye and a storyteller''s instinct. 3rd-year Film & Media student at AFDA Cape Town. From brand reels and event coverage to short films and music videos — I shoot, direct, and edit end-to-end. My work has been screened at the AFDA Student Showcase two years running.',
      '🎬', 'Cape Town', '1200', 'project', 4.7, 9,
      true, true, 'amahle.khumalo@afda.ac.za', '+27 71 234 5678', 'AFDA2022-CT-0338',
      E'https://vimeo.com/amahlek\nhttps://instagram.com/amahle.films\nhttps://youtube.com/@amahlefilms',
      ARRAY['Weekday evenings', 'Saturdays', 'Sundays'],
      'Sony FX3 + A7IV, DJI Ronin-SC, DJI Mini 4 Pro (drone). Adobe Premiere Pro, DaVinci Resolve, After Effects. Available for travel in Western Cape.',
      ARRAY['events', 'brand reels', 'music videos', 'weddings', 'corporate']
    ) RETURNING id INTO v_id;

    INSERT INTO student_pricing (student_id, name, description, price, unit, featured, sort_order) VALUES
      (v_id, 'Event Coverage', '3-hr event · 2-min highlight reel · delivered in 5 days',                'R1,200', 'project', false, 1),
      (v_id, 'Brand Reel',     'Up to 5-min branded video · shoot day + full edit + revisions',          'R3,500', 'project', true,  2),
      (v_id, 'Full Production','Pre-production, shoot (up to 2 days), full post-production + colour grade', 'R8,000', 'project', false, 3);
  END IF;
END $$;

-- ── 4. ZARA MOOSA — Makeup Artistry / Red & Yellow / Cape Town
DO $$
DECLARE v_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM students WHERE email = 'zara.moosa@redandyellow.co.za') THEN
    INSERT INTO students (
      name, short_name, university, degree, year, skill, secondary_skill, category,
      bio, emoji, city, starting_price, price_unit, rating, review_count,
      verified, active, email, whatsapp, student_number,
      portfolio_links, availability, extra_info, tags
    ) VALUES (
      'Zara Moosa', 'Zara M.', 'Red & Yellow', 'BA Creative Brand Communications', '3rd Year',
      'Makeup Artistry', null, 'makeup-artistry',
      'Certified MUA and final-year Creative Brand Communications student turning looks for weddings, events, graduations, and editorial shoots. I use only cruelty-free, long-lasting products and always offer a trial so you know exactly what to expect on the day. Cape Town based and available for travel — I''ll come to you.',
      '💄', 'Cape Town', '650', 'session', 5.0, 31,
      true, true, 'zara.moosa@redandyellow.co.za', '+27 84 567 8901', 'RY2022-0214',
      E'https://instagram.com/zaramoosabeauty\nhttps://www.tiktok.com/@zaramua',
      ARRAY['Weekdays', 'Weekday evenings', 'Saturdays', 'Sundays'],
      'Products: Charlotte Tilbury, MAC, NARS, NYX. Services: bridal, editorial, SFX basics, lash application. Speak English, Afrikaans, and basic Zulu. Will travel within Cape Town metro (travel fee may apply over 30km).',
      ARRAY['bridal', 'events', 'editorial', 'graduation', 'glam']
    ) RETURNING id INTO v_id;

    INSERT INTO student_pricing (student_id, name, description, price, unit, featured, sort_order) VALUES
      (v_id, 'Everyday Glam',  '1-look application · lashes included · touch-up kit provided',        'R650',  'session', false, 1),
      (v_id, 'Event Ready',    'Full glam · trial session included · on-location touch-ups for 4hrs', 'R1,400', 'session', true,  2),
      (v_id, 'Bridal Package', 'Bridal + up to 3 bridesmaids · trial · on-day coverage',              'R3,200', 'session', false, 3);
  END IF;
END $$;

-- ── 5. LETHABO SITHOLE — Tutoring / Wits / Johannesburg ──────
DO $$
DECLARE v_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM students WHERE email = 'lethabo.sithole@students.wits.ac.za') THEN
    INSERT INTO students (
      name, short_name, university, degree, year, skill, secondary_skill, category,
      bio, emoji, city, starting_price, price_unit, rating, review_count,
      verified, active, email, whatsapp, student_number,
      portfolio_links, availability, extra_info, tags
    ) VALUES (
      'Lethabo Sithole', 'Lethabo S.', 'Wits', 'BSc Applied Mathematics', '4th Year',
      'Tutoring', null, 'tutoring',
      'Maths and Physical Science tutor with 3 years of experience helping matrics and first-year university students crack the subjects that trip everyone up. Currently finishing my BSc Applied Mathematics at Wits. I focus on building real understanding, not just teaching you to pass the test. 90% of my students improved by at least one sub-level. Patient, structured, and genuinely invested in your results.',
      '📚', 'Johannesburg', '250', 'hour', 4.9, 47,
      true, true, 'lethabo.sithole@students.wits.ac.za', '+27 79 678 9012', 'WITS2021-1189',
      E'https://www.superprof.co.za/lethabosithole',
      ARRAY['Weekdays', 'Weekday evenings', 'Saturdays'],
      'Subjects: Mathematics (Gr 10–12 + first-year university), Physical Science (Gr 10–12), Statistics (first year). Sessions in-person (Joburg North / Sandton) or online via Google Meet. Speak Sesotho, English, and basic Zulu.',
      ARRAY['mathematics', 'science', 'matric', 'university', 'online']
    ) RETURNING id INTO v_id;

    INSERT INTO student_pricing (student_id, name, description, price, unit, featured, sort_order) VALUES
      (v_id, 'Single Session',  '1-hr focused session on a specific topic or problem set', 'R250', 'hour',    false, 1),
      (v_id, 'Weekly Block',    '4 x 1-hr sessions per month · progress tracking included', 'R850', 'month',   true,  2),
      (v_id, 'Exam Bootcamp',   '5 x 2-hr intensive sessions in the week before exams',    'R2,200', 'package', false, 3);
  END IF;
END $$;
