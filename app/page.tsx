'use client';

import { motion } from 'framer-motion';
import { Leaf, Sun, Moon, Calendar, Play, Pause, Menu } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';


export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [currentDay, setCurrentDay] = useState(1);
  const [completed, setCompleted] = useState<number[]>([]);

  // Таймер 4-7-8
  const [isBreathing, setIsBreathing] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [seconds, setSeconds] = useState(4);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    setMounted(true);

    const savedDay = localStorage.getItem('currentDay');
    if (savedDay) setCurrentDay(parseInt(savedDay));

    const savedCompleted = localStorage.getItem('completedDays');
    if (savedCompleted) setCompleted(JSON.parse(savedCompleted));
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem('currentDay', currentDay.toString());
  }, [currentDay, mounted]);

  useEffect(() => {
    if (mounted) localStorage.setItem('completedDays', JSON.stringify(completed));
  }, [completed, mounted]);

  const progress = Math.round((completed.length / 21) * 100);

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

  const startBreathing = () => {
    setIsBreathing(true);
    setPhase('inhale');
    setSeconds(4);
    setCycles(0);
  };

  const stopBreathing = () => setIsBreathing(false);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* 🔥 ПРЕМИУМ ШАПКА — финальная версия */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-zinc-950/90 backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">

          {/* Логотип */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-all group-hover:scale-110 group-hover:rotate-6">
              <Leaf className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tighter">Анти-Кортизол</h1>
              <p className="text-[10px] text-emerald-400 -mt-1 tracking-widest">21 ДЕНЬ • НОВОЕ СОСТОЯНИЕ</p>
            </div>
          </Link>

          {/* Десктоп меню */}
          <div className="hidden md:flex items-center gap-10 text-sm font-medium">
            <Link href="/theory" className="hover:text-emerald-400 transition-colors">Теория</Link>
            <Link href="/practice" className="hover:text-emerald-400 transition-colors">Практика</Link>
            <Link href="/diary" className="hover:text-emerald-400 transition-colors">Дневник</Link>
            <Link href="/tools" className="hover:text-emerald-400 transition-colors">Инструменты</Link>
          </div>

          {/* Правая часть */}
          <div className="flex items-center gap-4">
            {/* Переключатель темы */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-3 rounded-2xl hover:bg-white/10 transition-all active:scale-95"
            >
              {mounted && theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Мобильная кнопка меню */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-2xl hover:bg-white/10 transition-all"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-zinc-950/95 backdrop-blur-2xl px-6 py-8 flex flex-col gap-6 text-lg">
            <Link href="/theory" className="py-3 hover:text-emerald-400" onClick={() => setIsMenuOpen(false)}>Теория</Link>
            <Link href="/practice" className="py-3 hover:text-emerald-400" onClick={() => setIsMenuOpen(false)}>Практика</Link>
            <Link href="/diary" className="py-3 hover:text-emerald-400" onClick={() => setIsMenuOpen(false)}>Дневник</Link>
            <Link href="/tools" className="py-3 hover:text-emerald-400" onClick={() => setIsMenuOpen(false)}>Инструменты</Link>
          </div>
        )}
      </nav>

      {/* HERO — исправленный */}
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 pb-12">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/hero.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full mb-8">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium">День {currentDay} из 21</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none mb-8">
            Добро пожаловать
          </h1>

          <p className="text-xl md:text-2xl text-zinc-300 max-w-xl mx-auto mb-12">
            Ты на <span className="text-emerald-400 font-semibold">{currentDay}</span> дне.<br />
            Каждый день приближает тебя к спокойствию и энергии.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/theory" className="px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-3xl transition-all active:scale-95">
              Начать с Теории
            </Link>
            <Link href="/practice" className="px-10 py-5 border border-white/30 hover:bg-white/10 rounded-3xl transition-all">
              Перейти к практике
            </Link>
          </div>
        </div>
      </section>

      {/* Прогресс — улучшенная версия */}
      <section className="px-6 max-w-5xl mx-auto pb-20">
        <div className="glass p-8 md:p-10 rounded-3xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6">
            <div>
              <p className="text-sm text-zinc-400">Общий прогресс протокола</p>
              <p className="text-5xl font-bold text-emerald-400 mt-1 tabular-nums">{progress}%</p>
            </div>

            <div className="text-right">
              <p className="text-sm text-zinc-400">Дней завершено</p>
              <p className="text-4xl font-semibold">{completed.length} <span className="text-zinc-500 text-2xl">из 21</span></p>
            </div>
          </div>

          <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full"
            />
          </div>

          <div className="flex justify-between text-xs text-zinc-500">
            <span>День 1</span>
            <span>День 21</span>
          </div>
        </div>
      </section>

      {/* До / После — улучшенная версия */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Реальные результаты</h2>
        <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
          Как меняется тело и самочувствие женщин после 21 дня протокола
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* ДО */}
          <div className="relative rounded-3xl overflow-hidden group">
            <img
              src="/images/before.jpg"
              alt="До"
              className="w-full aspect-[4/3] object-cover transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-red-400 text-sm font-medium tracking-widest">ДО ПРОТОКОЛА</p>
              <p className="text-3xl font-semibold mt-2">Постоянная усталость, тревога, лишний вес на животе</p>
              <p className="text-zinc-400 mt-4 text-sm">«Нет сил», «всё раздражает», «живот не уходит»</p>
            </div>
          </div>

          {/* ПОСЛЕ */}
          <div className="relative rounded-3xl overflow-hidden group">
            <img
              src="/images/after.jpg"
              alt="После"
              className="w-full aspect-[4/3] object-cover transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-emerald-400 text-sm font-medium tracking-widest">ПОСЛЕ 21 ДНЯ</p>
              <p className="text-3xl font-semibold mt-2">Энергия, лёгкость, спокойствие и видимые изменения фигуры</p>
              <p className="text-zinc-400 mt-4 text-sm">«Просыпаюсь отдохнувшей», «живот ушёл», «нервы в порядке»</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 text-zinc-400 text-sm">
          Реальные изменения женщин 35–55 лет, прошедших протокол
        </div>
      </section>

      {/* Теория (короткая версия на главной) */}
      <section className="py-20 bg-zinc-900/50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Почему протокол работает</h2>

          <div className="space-y-16">
            {/* Модуль 1 */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="glass p-10 rounded-3xl">
              <div className="text-emerald-400 text-sm mb-3">МОДУЛЬ 1 • Дни 1-3</div>
              <h3 className="text-3xl font-semibold mb-6">Диагностика и мощный старт</h3>
              <p className="text-zinc-300 leading-relaxed mb-6">
                Хронически повышенный кортизол — это главная причина усталости, набора веса на животе, тревожности, плохого сна и выпадения волос у женщин после 35 лет.
                Первый модуль — это момент запуска. Мы начинаем с самого мощного естественного инструмента — утреннего света, который быстро снижает утренний пик кортизола и перестраивает циркадные ритмы.
              </p>
              <p className="text-emerald-400 text-sm mb-4">Научная основа</p>
              <p className="text-zinc-400 italic mb-8">
                По данным Andrew Huberman Lab: 10–30 минут яркого утреннего света подавляет мелатонин и снижает кортизол на 20–30% уже в первые дни.
              </p>
              <p className="text-zinc-300">Уже на 3-й день большинство женщин чувствуют прилив энергии, уменьшение тяги к сладкому и легче просыпаются.</p>
            </motion.div>

            {/* Модуль 2 */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="glass p-10 rounded-3xl">
              <div className="text-emerald-400 text-sm mb-3">МОДУЛЬ 2 • Дни 4-9</div>
              <h3 className="text-3xl font-semibold mb-6">Перезагрузка нервной системы</h3>
              <p className="text-zinc-300 leading-relaxed mb-6">
                После первых дней мы переходим к глубокому восстановлению парасимпатической нервной системы.
                Именно здесь большинство женщин впервые ощущают «лёгкость в голове», снижение тревожности и заметное улучшение качества сна.
              </p>
              <p className="text-emerald-400 text-sm mb-4">Научная основа</p>
              <p className="text-zinc-400 italic mb-8">
                Physiological Sigh и дыхание 4-7-8 — самые быстрые техники снижения кортизола. NSDR-протоколы дают эффект, сравнимый с 2–3 часами глубокого сна.
              </p>
              <p className="text-zinc-300">К концу модуля тревожность заметно падает, а восстановление после стресса становится гораздо быстрее.</p>
            </motion.div>

            {/* Модуль 3 */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="glass p-10 rounded-3xl">
              <div className="text-emerald-400 text-sm mb-3">МОДУЛЬ 3 • Дни 10-15</div>
              <h3 className="text-3xl font-semibold mb-6">Антистрессовое питание и гормональный баланс</h3>
              <p className="text-zinc-300 leading-relaxed mb-6">
                Кортизол напрямую влияет на распределение жира и разрушение мышц. В этом модуле мы стабилизируем сахар крови, снижаем воспаление и поддерживаем гормональный фон.
              </p>
              <p className="text-emerald-400 text-sm mb-4">Научная основа</p>
              <p className="text-zinc-400 italic mb-8">
                Harvard Medical School: ограничение окна питания до 10–12 часов + высокий белок и здоровые жиры значительно снижают кортизол и инсулин.
              </p>
              <p className="text-zinc-300">Результат — уменьшение отёков, более ровная энергия и улучшение состава тела.</p>
            </motion.div>

            {/* Модуль 4 */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="glass p-10 rounded-3xl">
              <div className="text-emerald-400 text-sm mb-3">МОДУЛЬ 4 • Дни 16-19</div>
              <h3 className="text-3xl font-semibold mb-6">Глубокое восстановление и эмоциональный баланс</h3>
              <p className="text-zinc-300 leading-relaxed mb-6">
                К этому этапу кортизол уже существенно снижен. Теперь мы фокусируемся на качестве сна, эмоциональном состоянии и внутреннем спокойствии.
              </p>
              <p className="text-emerald-400 text-sm mb-4">Научная основа</p>
              <p className="text-zinc-400 italic mb-8">
                Качественный сон до 22:30 + практика благодарности снижают кортизол на следующее утро на 15–25%.
              </p>
              <p className="text-zinc-300">Появляется ощущение «я снова в своём теле» и стабильное хорошее настроение.</p>
            </motion.div>

            {/* Модуль 5 */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="glass p-10 rounded-3xl">
              <div className="text-emerald-400 text-sm mb-3">МОДУЛЬ 5 • Дни 20-21</div>
              <h3 className="text-3xl font-semibold mb-6">Закрепление результата и стратегия на будущее</h3>
              <p className="text-zinc-300 leading-relaxed mb-6">
                Финальный модуль. Мы подводим итоги, фиксируем изменения, создаём персональный протокол, который останется с тобой надолго.
              </p>
              <p className="text-emerald-400 text-sm mb-4">Научная основа</p>
              <p className="text-zinc-400 italic mb-8">
                21 день — критический период формирования новых нейронных связей. Дальше привычки становятся автоматическими.
              </p>
              <p className="text-zinc-300">Ты получаешь не просто результат, а работающую систему на долгие годы.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Таймер на главной — улучшенная версия */}
      <section className="py-20 px-6 max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Быстрый инструмент</h2>
        <p className="text-zinc-400 text-center mb-12">Самая эффективная техника для мгновенного снижения кортизола</p>

        <div className="glass p-10 rounded-3xl text-center">
          <h3 className="text-2xl font-semibold mb-8">Дыхание 4-7-8</h3>

          <div className="mb-10">
            <div className="text-7xl font-mono font-bold text-emerald-400 mb-6">
              {phase === 'inhale' && 'ВДОХ'}
              {phase === 'hold' && 'ЗАДЕРЖКА'}
              {phase === 'exhale' && 'ВЫДОХ'}
            </div>
            <div className="text-7xl font-bold mb-10 text-white">{seconds}</div>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            {!isBreathing ? (
              <button onClick={startBreathing} className="px-12 py-5 bg-emerald-500 hover:bg-emerald-400 text-black rounded-3xl font-medium flex items-center gap-3 text-xl transition-all active:scale-95">
                <Play className="w-6 h-6" /> Начать сессию
              </button>
            ) : (
              <button onClick={stopBreathing} className="px-12 py-5 bg-red-500/80 hover:bg-red-500 text-white rounded-3xl font-medium flex items-center gap-3 text-xl transition-all">
                <Pause className="w-6 h-6" /> Остановить
              </button>
            )}
          </div>

          <p className="text-emerald-400 font-medium mb-1">Циклов пройдено: {cycles}</p>
          <p className="text-xs text-zinc-500">Рекомендуется 2–3 раза в день, особенно при стрессе или перед сном</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/10 bg-black/40">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-11 h-11 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-black" />
            </div>
          </div>

          <p className="text-2xl font-medium text-white mb-3">
            Ты уже внутри протокола
          </p>
          <p className="text-zinc-400 max-w-md mx-auto">
            Каждый день, который ты выполняешь — это инвестиция в свою энергию, здоровье и спокойствие.
          </p>

          <div className="mt-12 pt-8 border-t border-white/10 text-xs text-zinc-500">
            © 2026 Анти-Кортизол • 21-дневный протокол<br />
            Ты на правильном пути. Продолжай.
          </div>
        </div>
      </footer>
    </main>
  );
}