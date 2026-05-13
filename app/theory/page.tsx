'use client';

import { motion } from 'framer-motion';
import { BookOpen, Award, CheckCircle, Clock, Home, Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Theory() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const modules = [
        {
            id: 1,
            title: "Модуль 1 • Дни 1-3",
            subtitle: "Диагностика и мощный старт снижения кортизола",
            duration: "3 дня",
            content: "Хронически повышенный кортизол — это тихий разрушитель здоровья женщины после 35 лет. Он крадёт энергию, разрушает мышцы, заставляет жир откладываться именно на животе, провоцирует тревожность, бессонницу и даже выпадение волос. Первый модуль — это момент, когда мы наконец начинаем понимать, что происходит в организме, и запускаем самые мощные естественные механизмы снижения стрессового гормона.",
            science: "По исследованиям Andrew Huberman Lab (Stanford): всего 10–30 минут утреннего яркого естественного света (лучше на улице) даёт мощный сигнал супрахиазматическому ядру мозга. Это подавляет мелатонин днём и резко снижает утренний пик кортизола на 20–30% уже в первые дни. Это один из самых эффективных и бесплатных инструментов нейронауки.",
            expectations: "Уже на 3-й день большинство женщин отмечают: появляется утренняя энергия, уменьшается тяга к сладкому и кофе, улучшается настроение, легче вставать по утрам.",
            keyPoints: [
                "Утренний свет 10–30 минут каждый день (обязательно на улице или у открытого окна)",
                "Прогулка на свежем воздухе минимум 30–40 минут (желательно утром)",
                "Практика дыхания 4-7-8 утром и перед сном",
                "Ограничение кофеина после 14:00 (лучше до 12:00)",
                "Последний приём пищи не позже 19:00",
                "Вести дневник самочувствия каждый вечер"
            ]
        },
        {
            id: 2,
            title: "Модуль 2 • Дни 4-9",
            subtitle: "Перезагрузка нервной системы",
            duration: "6 дней",
            content: "После первых трёх дней мы переходим к глубокому восстановлению. Здесь мы активно тренируем парасимпатическую нервную систему — режим «отдых и восстановление». Именно в этом модуле происходит самое заметное снижение фоновой тревожности, улучшение сна и ощущение, что «голова наконец-то успокоилась».",
            science: "Huberman Lab: Physiological Sigh (два коротких вдоха носом + очень длинный выдох ртом) — самая быстрая техника активации блуждающего нерва. NSDR (Non-Sleep Deep Rest) протоколы дают эффект, сравнимый с 2–3 часами глубокого сна.",
            expectations: "К 9-му дню большинство замечают: глубокий ночной сон, меньше нервозности, стабильную энергию в течение дня, снижение тяги к «заеданию» стресса.",
            keyPoints: [
                "Дыхание 4-7-8 минимум 2 раза в день (утро + вечер)",
                "Physiological Sigh при любом ощущении стресса (5–10 повторений)",
                "NSDR / Yoga Nidra 10–20 минут ежедневно (особенно днём)",
                "Магний глицинат или треонат 300–400 мг за час до сна",
                "Холодный душ по утрам (начинай с 30 секунд, постепенно увеличивай)",
                "Минимизировать новости и соцсети после 20:00"
            ]
        },
        {
            id: 3,
            title: "Модуль 3 • Дни 10-15",
            subtitle: "Антистрессовое питание и гормональный баланс",
            duration: "6 дней",
            content: "К этому моменту кортизол уже начал снижаться. Теперь мы работаем с тем, что сильно влияет на него — питание и стабильность сахара в крови. Высокий кортизол заставляет организм запасать жир на животе и разрушать мышцы. Мы это разворачиваем.",
            science: "Harvard Medical School: ограничение окна питания + достаточное количество белка и здоровых жиров значительно снижает уровень кортизола и инсулина, улучшает чувствительность к гормонам.",
            expectations: "Улучшение состава тела, уменьшение отёков, стабильная энергия без провалов в 15–16 часов, лучшее настроение.",
            keyPoints: [
                "Окно питания 10–12 часов (рекомендуем 8:00–20:00 или 9:00–19:00)",
                "Минимум 1,6–2 г белка на кг веса тела ежедневно",
                "Продукты, активно снижающие кортизол: жирная рыба, авокадо, ягоды, тёмный шоколад 85%+, брокколи, орехи, оливковое масло",
                "Полный отказ от добавленного сахара и ультраобработанных продуктов",
                "Омега-3 (рыбий жир) 1–2 г EPA+DHA каждый день",
                "Магний + витамин D + адаптогены (ашваганда, родиола — по желанию)"
            ]
        },
        {
            id: 4,
            title: "Модуль 4 • Дни 16-19",
            subtitle: "Глубокое восстановление и эмоциональный баланс",
            duration: "4 дня",
            content: "К этому этапу кортизол уже заметно ниже. Теперь мы работаем с самыми глубокими уровнями — качеством сна, эмоциональным состоянием и внутренним спокойствием.",
            science: "Национальные институты здоровья (NIH): сон до 22:30 + ежедневная практика благодарности снижают утренний кортизол на 15–25% уже на следующее утро.",
            expectations: "Глубокий восстановительный сон, стабильное хорошее настроение, ощущение «я снова в своём теле», прилив женской энергии.",
            keyPoints: [
                "Ложиться спать до 22:30 каждый день (это критично)",
                "Холодный или контрастный душ по утрам",
                "Ведение дневника благодарности (минимум 5 пунктов вечером)",
                "Социальные связи — общение, объятия, поддержка",
                "Полный отказ от экранов минимум за 60 минут до сна",
                "Медитация или дыхательные практики перед сном"
            ]
        },
        {
            id: 5,
            title: "Модуль 5 • Дни 20-21",
            subtitle: "Закрепление результата и стратегия на будущее",
            duration: "2 дня",
            content: "Финальный модуль. Мы подводим итоги 21-дневного пути, фиксируем все изменения и создаём персональный протокол, который ты сможешь повторять снова и снова.",
            science: "Наука о привычках показывает, что 21 день — это критический период формирования новой нейронной сети. Дальше привычки становятся автоматическими.",
            expectations: "Чёткое понимание, что именно работает для твоего организма. Видимые изменения во внешности и самочувствии.",
            keyPoints: [
                "Сделать фото и замеры «до/после» (талия, вес, настроение, энергия)",
                "Проанализировать все изменения по каждому параметру",
                "Создать свой персональный мини-протокол на следующие 30–60 дней",
                "Праздновать результат (купить себе подарок, сделать что-то приятное)",
                "Выбрать 3–5 главных привычек, которые останутся с тобой навсегда"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* NAV — улучшенный */}
            <nav className="sticky top-0 z-50 glass border-b border-white/10 backdrop-blur-xl">
                <div className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3 hover:text-emerald-400 transition">
                        <Home className="w-6 h-6" />
                        <span className="font-medium hidden sm:inline">На главную</span>
                    </Link>

                    <div className="hidden md:flex gap-8 text-sm font-medium">
                        <Link href="/theory" className="text-emerald-400">Теория</Link>
                        <Link href="/practice" className="hover:text-emerald-400 transition">Практика</Link>
                        <Link href="/diary" className="hover:text-emerald-400 transition">Дневник</Link>
                        <Link href="/tools" className="hover:text-emerald-400 transition">Инструменты</Link>
                    </div>

                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden border-t border-white/10 bg-zinc-950/95 backdrop-blur-xl px-6 py-8 flex flex-col gap-6 text-lg">
                        <Link href="/theory" className="text-emerald-400" onClick={() => setIsMenuOpen(false)}>Теория</Link>
                        <Link href="/practice" className="hover:text-emerald-400 transition" onClick={() => setIsMenuOpen(false)}>Практика</Link>
                        <Link href="/diary" className="hover:text-emerald-400 transition" onClick={() => setIsMenuOpen(false)}>Дневник</Link>
                        <Link href="/tools" className="hover:text-emerald-400 transition" onClick={() => setIsMenuOpen(false)}>Инструменты</Link>
                    </div>
                )}
            </nav>

            {/* Theory Hero с новой фоткой */}
            <div className="relative h-80 md:h-96 -mx-6 mb-12 overflow-hidden">
                <img
                    src="/images/theory-bg.jpg"
                    alt="Теория"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/90" />

                <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
                    <div>
                        <BookOpen className="w-16 h-16 mx-auto mb-6 text-emerald-400" />
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter">Теория</h1>
                        <p className="text-xl text-zinc-400 mt-3">Полная научная основа 21-дневного протокола</p>
                    </div>
                </div>
            </div>

            {/* Основной контент модулей — исправлено под ПК */}
            <div className="max-w-5xl mx-auto px-6">
                <div className="space-y-16 md:space-y-20">
                    {modules.map((module, index) => (
                        <motion.div
                            key={module.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="glass p-8 md:p-12 rounded-3xl border border-white/10"
                        >
                            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                                {/* Левая колонка — сделала гибкой */}
                                <div className="lg:w-80 xl:w-96 flex-shrink-0">
                                    <div className="inline-flex items-center gap-3 bg-emerald-500/10 text-emerald-400 px-5 py-2.5 rounded-full mb-6 text-sm">
                                        <Clock className="w-4 h-4" /> {module.duration}
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{module.title}</h2>
                                    <p className="text-emerald-400 text-xl md:text-2xl">{module.subtitle}</p>
                                </div>

                                {/* Правая колонка */}
                                <div className="flex-1 space-y-9">
                                    <p className="text-zinc-200 text-[17px] leading-relaxed">
                                        {module.content}
                                    </p>

                                    <div className="border-l-4 border-emerald-500 pl-6 md:pl-8">
                                        <p className="uppercase text-xs tracking-widest text-emerald-400 mb-3">НАУЧНАЯ ОСНОВА</p>
                                        <p className="text-zinc-400 italic text-[16px] leading-relaxed">{module.science}</p>
                                    </div>

                                    {module.expectations && (
                                        <div className="border-l-4 border-teal-500 pl-6 md:pl-8">
                                            <p className="uppercase text-xs tracking-widest text-teal-400 mb-3">ЧЕГО ОЖИДАТЬ</p>
                                            <p className="text-zinc-300 leading-relaxed">{module.expectations}</p>
                                        </div>
                                    )}

                                    <div>
                                        <h4 className="font-semibold mb-6 flex items-center gap-3 text-lg">
                                            <Award className="w-6 h-6 text-emerald-400" />
                                            Ключевые практики модуля
                                        </h4>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {module.keyPoints.map((point, i) => (
                                                <div
                                                    key={i}
                                                    className="flex gap-4 bg-white/5 hover:bg-white/10 p-5 md:p-6 rounded-2xl transition-all group"
                                                >
                                                    <CheckCircle className="w-6 h-6 text-emerald-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition" />
                                                    <span className="text-zinc-200 text-[15px] leading-relaxed">{point}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );

};