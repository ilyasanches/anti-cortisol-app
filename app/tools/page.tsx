'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, Home, Leaf, Heart, Menu } from 'lucide-react';
import Link from 'next/link';

export default function Tools() {
    // 4-7-8
    const [isBreathing, setIsBreathing] = useState(false);
    const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
    const [seconds, setSeconds] = useState(4);
    const [cycles, setCycles] = useState(0);

    // NSDR
    const [nsdrTime, setNsdrTime] = useState(600);
    const [isNsdrRunning, setIsNsdrRunning] = useState(false);

    // Physiological Sigh
    const [sighCount, setSighCount] = useState(0);

    // КБЖУ Калькулятор
    const [age, setAge] = useState(38);
    const [weight, setWeight] = useState(68);
    const [height, setHeight] = useState(165);
    const [activity, setActivity] = useState("1.55");

    // 5-минутный протокол
    const [protocolTime, setProtocolTime] = useState(300);
    const [isProtocolRunning, setIsProtocolRunning] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const protocolSteps = [
        { title: "Physiological Sigh × 5", desc: "Два коротких вдоха носом + длинный выдох ртом. Повтори 5 раз подряд." },
        { title: "Дыхание 4-7-8", desc: "4 сек вдох — 7 сек задержка — 8 сек выдох. Сделай 4–6 циклов." },
        { title: "Прогрессивная мышечная релаксация", desc: "Напряги и резко расслабь по очереди: лицо → плечи → руки → живот → ноги." },
        { title: "Благодарность + визуализация", desc: "Назови 3 вещи, за которые ты благодарна. Почувствуй спокойствие в теле." },
    ];

    // === Расчёт КБЖУ ===
    const bmr = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
    const tdee = Math.round(bmr * parseFloat(activity));
    const proteinGoal = Math.round(weight * 1.6);
    const fatGoal = Math.round((tdee * 0.25) / 9);
    const carbGoal = Math.round((tdee - (proteinGoal * 4) - (fatGoal * 9)) / 4);

    // Таймер 4-7-8
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isBreathing) {
            interval = setInterval(() => {
                setSeconds((prev) => {
                    if (phase === 'inhale' && prev === 1) { setPhase('hold'); return 7; }
                    if (phase === 'hold' && prev === 1) { setPhase('exhale'); return 8; }
                    if (phase === 'exhale' && prev === 1) {
                        setPhase('inhale');
                        setCycles(c => c + 1);
                        return 4;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isBreathing, phase]);

    // Таймер NSDR
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isNsdrRunning && nsdrTime > 0) {
            interval = setInterval(() => setNsdrTime(t => t - 1), 1000);
        } else if (nsdrTime === 0) {
            setIsNsdrRunning(false);
        }
        return () => clearInterval(interval);
    }, [isNsdrRunning, nsdrTime]);

    // Таймер 5-минутного протокола
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isProtocolRunning && protocolTime > 0) {
            interval = setInterval(() => {
                setProtocolTime(prev => {
                    const newTime = prev - 1;
                    const newStep = Math.min(3, Math.floor((300 - newTime) / 75));

                    if (newStep !== currentStep) setCurrentStep(newStep);

                    if (newTime <= 0) {
                        setIsProtocolRunning(false);
                        setCurrentStep(0);
                        return 300;
                    }
                    return newTime;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isProtocolRunning, currentStep]);

    const startBreathing = () => {
        setIsBreathing(true);
        setPhase('inhale');
        setSeconds(4);
        setCycles(0);
    };

    const stopBreathing = () => setIsBreathing(false);

    const startProtocol = () => {
        setProtocolTime(300);
        setCurrentStep(0);
        setIsProtocolRunning(true);
    };

    const stopProtocol = () => {
        setIsProtocolRunning(false);
        setCurrentStep(0);
        setProtocolTime(300);
    };


    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* NAV — точечное улучшение */}
            <nav className="sticky top-0 z-50 glass border-b border-white/10 backdrop-blur-xl">
                <div className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3 hover:text-emerald-400 transition">
                        <Home className="w-6 h-6" />
                        <span className="font-medium hidden sm:inline">На главную</span>
                    </Link>

                    <div className="hidden md:flex gap-8 text-sm font-medium">
                        <Link href="/theory" className="hover:text-emerald-400 transition">Теория</Link>
                        <Link href="/practice" className="hover:text-emerald-400 transition">Практика</Link>
                        <Link href="/diary" className="hover:text-emerald-400 transition">Дневник</Link>
                        <Link href="/tools" className="text-emerald-400">Инструменты</Link>
                    </div>

                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden border-t border-white/10 bg-zinc-950/95 backdrop-blur-xl px-6 py-8 flex flex-col gap-6 text-lg">
                        <Link href="/theory" className="hover:text-emerald-400" onClick={() => setIsMenuOpen(false)}>Теория</Link>
                        <Link href="/practice" className="hover:text-emerald-400" onClick={() => setIsMenuOpen(false)}>Практика</Link>
                        <Link href="/diary" className="hover:text-emerald-400" onClick={() => setIsMenuOpen(false)}>Дневник</Link>
                        <Link href="/tools" className="text-emerald-400" onClick={() => setIsMenuOpen(false)}>Инструменты</Link>
                    </div>
                )}
            </nav>

            {/* Tools Hero с новой фоткой — чисто, без дублирования */}
            <div className="relative h-80 md:h-96 -mx-6 mb-12 overflow-hidden">
                <img
                    src="/images/breathing.jpg"
                    alt="Инструменты"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/90" />

                <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
                    <div>
                        <Leaf className="w-16 h-16 mx-auto mb-6 text-emerald-400" />
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter">Инструменты</h1>
                        <p className="text-xl text-zinc-400 mt-3">Практики, которые реально работают</p>
                    </div>
                </div>
            </div>

            {/* Основной контент */}
            <div className="max-w-4xl mx-auto px-6 pb-24">
                <div className="space-y-8 md:space-y-12">
                    {/* Здесь остаются все твои блоки: 4-7-8, Physiological Sigh, NSDR, КБЖУ и 5-минутный протокол */}
                    {/* 4-7-8 — сильно улучшенный и наполненный */}
                    <div className="glass p-6 md:p-10 rounded-3xl">
                        <h2 className="text-3xl font-bold mb-2">Дыхание 4-7-8</h2>
                        <p className="text-emerald-400 font-medium mb-2">Техника доктора Эндрю Вейла</p>
                        <p className="text-zinc-400 mb-8">Одна из самых мощных и научно подтверждённых техник для быстрого снижения кортизола и активации парасимпатической нервной системы</p>

                        <div className="bg-white/5 rounded-3xl p-6 md:p-8 mb-8">
                            <div className="flex flex-col lg:flex-row gap-10 items-center">
                                {/* Инструкция */}
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg mb-6 flex items-center gap-3">
                                        <span className="text-emerald-400">📋</span> Как правильно выполнять
                                    </h3>
                                    <ol className="space-y-6 text-sm md:text-base text-zinc-300">
                                        <li className="flex gap-4">
                                            <span className="font-mono bg-emerald-500/20 text-emerald-400 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                                            <div>
                                                <strong className="text-white">Вдох</strong> — 4 секунды через нос (живот надувается, грудь почти не поднимается)
                                            </div>
                                        </li>
                                        <li className="flex gap-4">
                                            <span className="font-mono bg-emerald-500/20 text-emerald-400 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                                            <div>
                                                <strong className="text-white">Задержка дыхания</strong> — 7 секунд (максимально комфортно)
                                            </div>
                                        </li>
                                        <li className="flex gap-4">
                                            <span className="font-mono bg-emerald-500/20 text-emerald-400 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                                            <div>
                                                <strong className="text-white">Выдох</strong> — 8 секунд через рот со звуком «шшш» или «фух» (полностью опустошаем лёгкие)
                                            </div>
                                        </li>
                                    </ol>

                                    <div className="mt-8 p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
                                        <p className="text-emerald-400 text-sm font-medium mb-2">Научный эффект</p>
                                        <p className="text-zinc-300 text-[15px] leading-relaxed">
                                            По исследованиям Andrew Huberman Lab: эта техника активирует блуждающий нерв, снижает кортизол и адреналин, быстро переводит организм из режима «борьба или бегство» в режим «отдых и восстановление».
                                        </p>
                                    </div>
                                </div>

                                {/* Таймер */}
                                <div className="flex-1 text-center pt-4">
                                    <div className="text-6xl md:text-7xl font-mono font-bold text-emerald-400 mb-6 tracking-widest">
                                        {phase === 'inhale' && 'ВДОХ'}
                                        {phase === 'hold' && 'ЗАДЕРЖКА'}
                                        {phase === 'exhale' && 'ВЫДОХ'}
                                    </div>
                                    <div className="text-7xl md:text-8xl font-bold mb-10 text-white tabular-nums">{seconds}</div>

                                    <div className="flex justify-center gap-4">
                                        {!isBreathing ? (
                                            <button
                                                onClick={startBreathing}
                                                className="px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-black rounded-3xl font-medium flex items-center gap-3 text-lg md:text-xl transition active:scale-95"
                                            >
                                                <Play className="w-6 h-6" /> Начать сессию
                                            </button>
                                        ) : (
                                            <button
                                                onClick={stopBreathing}
                                                className="px-10 py-5 bg-red-500/80 hover:bg-red-500 text-white rounded-3xl font-medium flex items-center gap-3 text-lg md:text-xl transition"
                                            >
                                                <Pause className="w-6 h-6" /> Остановить
                                            </button>
                                        )}
                                    </div>

                                    <p className="mt-6 text-emerald-400 font-medium text-lg">
                                        Циклов сегодня: <span className="text-2xl">{cycles}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center text-xs md:text-sm text-zinc-500">
                            Рекомендуется 2–4 раза в день • Особенно эффективно перед сном и при остром стрессе •
                            Уже после 4–6 циклов чувствуется заметное расслабление
                        </div>
                    </div>

                    {/* Physiological Sigh — улучшенная и наполненная версия */}
                    <div className="glass p-6 md:p-10 rounded-3xl">
                        <h2 className="text-3xl font-bold mb-2">Physiological Sigh</h2>
                        <p className="text-emerald-400 font-medium mb-2">Техника из лаборатории Andrew Huberman</p>
                        <p className="text-zinc-400 mb-8">Самый быстрый способ мгновенно снизить кортизол и активировать блуждающий нерв (работает за 20–40 секунд)</p>

                        <div className="bg-white/5 rounded-3xl p-6 md:p-8 mb-8">
                            <div className="flex flex-col lg:flex-row gap-10 items-center">
                                {/* Инструкция */}
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg mb-6 flex items-center gap-3">
                                        <span className="text-emerald-400">⚡</span> Как делать (3 простых шага)
                                    </h3>
                                    <ol className="space-y-6 text-sm md:text-base text-zinc-300">
                                        <li className="flex gap-4">
                                            <span className="font-mono bg-emerald-500/20 text-emerald-400 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                                            <div>
                                                <strong className="text-white">Два коротких вдоха носом</strong><br />
                                                Один за другим, как будто быстро нюхаешь цветок
                                            </div>
                                        </li>
                                        <li className="flex gap-4">
                                            <span className="font-mono bg-emerald-500/20 text-emerald-400 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                                            <div>
                                                <strong className="text-white">Очень длинный выдох ртом</strong><br />
                                                Полностью опустоши лёгкие (со звуком «хааа» или «фух»)
                                            </div>
                                        </li>
                                        <li className="flex gap-4">
                                            <span className="font-mono bg-emerald-500/20 text-emerald-400 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                                            <div>
                                                Повтори цикл <strong>3–5 раз подряд</strong>
                                            </div>
                                        </li>
                                    </ol>

                                    <div className="mt-8 p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
                                        <p className="text-emerald-400 text-sm font-medium mb-2">Почему это работает</p>
                                        <p className="text-zinc-300 text-[15px] leading-relaxed">
                                            Два быстрых вдоха наполняют нижние доли лёгких кислородом, а длинный выдох мощно стимулирует блуждающий нерв.
                                            Это самый быстрый естественный способ переключить организм из симпатического («стресс») в парасимпатический («восстановление») режим.
                                        </p>
                                    </div>
                                </div>

                                {/* Большая интерактивная кнопка */}
                                <div className="flex-1 text-center pt-4">
                                    <button
                                        onClick={() => setSighCount(c => c + 1)}
                                        className="group relative w-60 h-60 md:w-72 md:h-72 mx-auto flex items-center justify-center rounded-full border-4 border-emerald-500/30 hover:border-emerald-500 active:scale-95 transition-all duration-300"
                                    >
                                        <div className="text-center">
                                            <Heart className="w-24 h-24 md:w-28 md:h-28 text-emerald-400 mx-auto mb-6 group-active:scale-110 transition" />
                                            <p className="font-semibold text-2xl">Сделать Sigh</p>
                                            <p className="text-sm text-zinc-500 mt-2">Нажми и выполни прямо сейчас</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4">
                            <p className="text-emerald-400 font-medium text-lg">
                                Сегодня сделано: <span className="text-3xl tabular-nums">{sighCount}</span> раз
                            </p>
                            <p className="text-xs md:text-sm text-zinc-500 max-w-xs">
                                Используй при любом стрессе, тревоге, перед важным разговором или когда хочется «заесть» эмоции
                            </p>
                        </div>
                    </div>
                    {/* NSDR / Yoga Nidra — улучшенная и наполненная версия */}
                    <div className="glass p-6 md:p-10 rounded-3xl">
                        <h2 className="text-3xl font-bold mb-2">NSDR / Yoga Nidra</h2>
                        <p className="text-emerald-400 font-medium mb-2">Non-Sleep Deep Rest</p>
                        <p className="text-zinc-400 mb-8">10–20 минут практики = эффект от 2–3 часов глубокого сна. Один из самых мощных инструментов снижения кортизола по версии Andrew Huberman</p>

                        <div className="bg-white/5 rounded-3xl p-6 md:p-8 mb-8">
                            <div className="flex flex-col lg:flex-row gap-10 items-center">
                                {/* Информация и инструкция */}
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg mb-6">В чём сила этой практики</h3>
                                    <div className="space-y-6 text-sm md:text-base text-zinc-300">
                                        <p>
                                            NSDR (Non-Sleep Deep Rest) и Yoga Nidra — это состояние глубокого осознанного расслабления,
                                            когда мозг находится между бодрствованием и сном. В этот момент происходит мощное восстановление нервной системы и снижение уровня кортизола.
                                        </p>
                                        <div className="p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
                                            <p className="text-emerald-400 text-sm font-medium mb-2">Научная основа</p>
                                            <p className="text-zinc-300 italic">
                                                По исследованиям Andrew Huberman Lab (Stanford): 10–20 минут NSDR снижают кортизол, восстанавливают дофаминовые рецепторы и дают восстановление, сравнимое с полноценным ночным сном.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <h4 className="font-semibold mb-4">Как правильно делать:</h4>
                                        <ul className="space-y-3 text-sm md:text-base text-zinc-300">
                                            <li>• Ляг или сядь максимально удобно</li>
                                            <li>• Закрой глаза и следуй за голосом (можно включить любую запись Yoga Nidra)</li>
                                            <li>• Не пытайся «заснуть» — просто наблюдай за телом и дыханием</li>
                                            <li>• Если мысли убегают — мягко возвращай внимание</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Таймер */}
                                <div className="flex-1 text-center">
                                    <div className="text-6xl md:text-7xl font-mono font-bold text-teal-400 mb-6 tracking-widest">
                                        {Math.floor(nsdrTime / 60)}:{(nsdrTime % 60).toString().padStart(2, '0')}
                                    </div>

                                    <button
                                        onClick={() => {
                                            setIsNsdrRunning(!isNsdrRunning);
                                            if (!isNsdrRunning) setNsdrTime(600);
                                        }}
                                        className="px-12 py-6 bg-teal-500 hover:bg-teal-400 text-black rounded-3xl font-medium flex items-center gap-3 mx-auto text-xl transition active:scale-95 w-full md:w-auto justify-center"
                                    >
                                        {isNsdrRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                                        {isNsdrRunning ? 'Пауза' : 'Запустить 10 минут'}
                                    </button>

                                    <p className="text-xs text-zinc-500 mt-6">
                                        Лучше всего делать днём (вместо кофе) или вечером перед сном
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center text-sm text-zinc-500">
                            Регулярная практика NSDR — один из самых недооценённых способов быстро восстановить нервную систему и снизить хронический стресс
                        </div>
                    </div>

                    {/* Персонализированный КБЖУ калькулятор */}
                    <div className="glass p-6 md:p-10 rounded-3xl">
                        <h2 className="text-3xl font-bold mb-2">Твой КБЖУ</h2>
                        <p className="text-zinc-400 mb-8">Рассчитано специально для снижения кортизола у женщин 35+</p>

                        {/* Параметры для расчёта */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                            <div>
                                <label className="text-xs text-zinc-400">Возраст</label>
                                <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-center" placeholder="38" />
                            </div>
                            <div>
                                <label className="text-xs text-zinc-400">Вес (кг)</label>
                                <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-center" placeholder="68" />
                            </div>
                            <div>
                                <label className="text-xs text-zinc-400">Рост (см)</label>
                                <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-center" placeholder="165" />
                            </div>
                            <div>
                                <label className="text-xs text-zinc-400">Активность</label>
                                <select value={activity} onChange={e => setActivity(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-zinc-200">
                                    <option value="1.2">Сидячий образ жизни</option>
                                    <option value="1.375">Лёгкая активность</option>
                                    <option value="1.55">Умеренная (3-4 тренировки)</option>
                                    <option value="1.725">Высокая активность</option>
                                </select>
                            </div>
                        </div>

                        {/* Результаты */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white/5 p-8 rounded-3xl">
                                <p className="text-sm text-zinc-400 mb-2">Рекомендуемые калории в день</p>
                                <p className="text-5xl font-bold text-emerald-400">{Math.round(tdee)} <span className="text-2xl text-zinc-500">ккал</span></p>
                                <p className="text-xs text-zinc-500 mt-3">Для мягкого снижения кортизола и веса</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <span>Белки</span>
                                    <span className="font-mono text-emerald-400">{Math.round(proteinGoal)} г</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Жиры</span>
                                    <span className="font-mono text-amber-400">{Math.round(fatGoal)} г</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Углеводы</span>
                                    <span className="font-mono text-violet-400">{Math.round(carbGoal)} г</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-xs text-zinc-500 border-t border-white/10 pt-6">
                            Расчёт по формуле Mifflin-St Jeor + поправка на возраст и снижение кортизола (дефицит 15-20%)
                        </div>
                    </div>
                </div>
            </div>
            {/* 5-МИНУТНЫЙ АНТИСТРЕСС ПРОТОКОЛ — минимализм + адаптив */}
            <div className="max-w-2xl mx-auto glass p-6 md:p-10 rounded-3xl">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-10">
                    <div>
                        <p className="text-emerald-400 text-xs tracking-widest mb-1">5 МИНУТ</p>
                        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Сброс кортизола</h2>
                    </div>

                    <div className="text-right shrink-0">
                        <div className="text-5xl md:text-6xl font-mono font-light text-teal-400 tabular-nums">
                            {Math.floor(protocolTime / 60)}:{(protocolTime % 60).toString().padStart(2, '0')}
                        </div>
                    </div>
                </div>

                <div className="h-1 bg-white/10 rounded-full mb-10 overflow-hidden">
                    <div
                        className="h-1 bg-teal-400 rounded-full transition-all duration-1000"
                        style={{ width: `${((300 - protocolTime) / 300) * 100}%` }}
                    />
                </div>

                <div className="mb-10">
                    <div className="uppercase text-xs tracking-widest text-zinc-500 mb-2">
                        ШАГ {currentStep + 1} ИЗ 4
                    </div>
                    <h3 className="text-xl md:text-2xl font-medium mb-3">
                        {protocolSteps[currentStep].title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed text-[16px] md:text-[17px]">
                        {protocolSteps[currentStep].desc}
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    {!isProtocolRunning ? (
                        <button
                            onClick={() => {
                                setProtocolTime(300);
                                setCurrentStep(0);
                                setIsProtocolRunning(true);
                            }}
                            className="w-full py-5 border border-white/30 hover:bg-white/5 rounded-3xl font-medium text-base md:text-lg transition"
                        >
                            Начать протокол
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                setIsProtocolRunning(false);
                                setCurrentStep(0);
                                setProtocolTime(300);
                            }}
                            className="w-full py-5 bg-red-500/80 hover:bg-red-500 rounded-3xl font-medium text-base md:text-lg transition"
                        >
                            Завершить досрочно
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}