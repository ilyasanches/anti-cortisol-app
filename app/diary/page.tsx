'use client';

import { motion } from 'framer-motion';
import { Home, BookOpen, Camera, Upload, TrendingUp, Menu } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Diary() {
    const today = new Date().toISOString().split('T')[0];
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [entries, setEntries] = useState<Record<string, any>>({});
    const [currentEntry, setCurrentEntry] = useState({
        mood: 5,
        energy: 7,
        sleep: 7,
        weight: '',
        waist: '',
        bellyFeel: 7,
        sweetCraving: 5,
        note: '',
        photo: '' as string,
    });

    useEffect(() => {
        const saved = localStorage.getItem('diaryEntries');
        if (saved) setEntries(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem('diaryEntries', JSON.stringify(entries));
    }, [entries]);

    const saveEntry = () => {
        setEntries(prev => ({
            ...prev,
            [today]: { ...currentEntry, date: today }
        }));
    };

    const handlePhotoUpload = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => setCurrentEntry(prev => ({ ...prev, photo: ev.target?.result as string }));
            reader.readAsDataURL(file);
        }
    };

    const moodEmojis = ['😢', '🙁', '😐', '🙂', '😊', '🥰', '😍'];

    const dates = Object.keys(entries).sort();
    const energyData = dates.map(d => entries[d].energy || 0);
    const moodData = dates.map(d => entries[d].mood || 0);
    const weightData = dates.map(d => parseFloat(entries[d].weight) || 0);

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <nav className="sticky top-0 z-50 glass border-b border-white/10 backdrop-blur-xl">
                <div className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3 hover:text-emerald-400 transition">
                        <Home className="w-6 h-6" />
                        <span className="font-medium hidden sm:inline">На главную</span>
                    </Link>

                    <div className="hidden md:flex gap-8 text-sm font-medium">
                        <Link href="/theory" className="hover:text-emerald-400 transition">Теория</Link>
                        <Link href="/practice" className="hover:text-emerald-400 transition">Практика</Link>
                        <Link href="/diary" className="text-emerald-400">Дневник</Link>
                        <Link href="/tools" className="hover:text-emerald-400 transition">Инструменты</Link>
                    </div>

                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden border-t border-white/10 bg-zinc-950/95 backdrop-blur-xl px-6 py-8 flex flex-col gap-6 text-lg">
                        <Link href="/theory" className="hover:text-emerald-400" onClick={() => setIsMenuOpen(false)}>Теория</Link>
                        <Link href="/practice" className="hover:text-emerald-400" onClick={() => setIsMenuOpen(false)}>Практика</Link>
                        <Link href="/diary" className="text-emerald-400" onClick={() => setIsMenuOpen(false)}>Дневник</Link>
                        <Link href="/tools" className="hover:text-emerald-400" onClick={() => setIsMenuOpen(false)}>Инструменты</Link>
                    </div>
                )}
            </nav>

            <div className="max-w-5xl mx-auto px-6 pt-24 md:pt-28 pb-24">
                <div className="flex items-center gap-4 mb-12">
                    <BookOpen className="w-12 h-12 md:w-14 md:h-14 text-emerald-400 flex-shrink-0" />
                    <div>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter">Дневник</h1>
                        <p className="text-xl md:text-2xl text-zinc-400">Твой личный прогресс за 21 день</p>
                    </div>
                </div>

                {/* Форма записи */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-6 md:p-10 rounded-3xl mb-16">
                    <h2 className="text-3xl font-semibold mb-8">Сегодня • {new Date().toLocaleDateString('ru-RU')}</h2>

                    <div className="space-y-10">
                        {/* Настроение — исправлено под мобильные */}
                        <div>
                            <label className="block text-sm text-zinc-400 mb-4">Настроение сегодня</label>
                            <div className="grid grid-cols-7 gap-2 bg-white/5 border border-white/10 rounded-3xl p-4">
                                {moodEmojis.map((emoji, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentEntry({ ...currentEntry, mood: i + 1 })}
                                        className={`text-4xl md:text-5xl transition-all hover:scale-125 py-3 rounded-2xl ${currentEntry.mood === i + 1 ? 'bg-emerald-500/20 scale-110' : ''}`}
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Слайдеры */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { label: "Энергия", value: currentEntry.energy, key: "energy" },
                                { label: "Сон (ч)", value: currentEntry.sleep, key: "sleep", type: "number" },
                                { label: "Живот", value: currentEntry.bellyFeel, key: "bellyFeel" },
                                { label: "Тяга к сладкому", value: currentEntry.sweetCraving, key: "sweetCraving" },
                            ].map((item) => (
                                <div key={item.key}>
                                    <label className="block text-sm text-zinc-400 mb-2">{item.label}</label>
                                    {item.type === "number" ? (
                                        <input
                                            type="number"
                                            value={item.value}
                                            onChange={(e) => setCurrentEntry({ ...currentEntry, [item.key]: +e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-center text-3xl"
                                        />
                                    ) : (
                                        <>
                                            <input
                                                type="range"
                                                min="1"
                                                max="10"
                                                value={item.value}
                                                onChange={(e) => setCurrentEntry({ ...currentEntry, [item.key]: +e.target.value })}
                                                className="w-full accent-emerald-500"
                                            />
                                            <div className="text-center font-bold text-emerald-400 mt-1">{item.value}</div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Вес и Талия */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Вес (кг)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={currentEntry.weight}
                                    onChange={(e) => setCurrentEntry({ ...currentEntry, weight: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-center text-3xl"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">Талия (см)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={currentEntry.waist}
                                    onChange={(e) => setCurrentEntry({ ...currentEntry, waist: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-center text-3xl"
                                />
                            </div>
                        </div>

                        {/* Фото */}
                        <div>
                            <label className="block text-sm text-zinc-400 mb-3 flex items-center gap-2">
                                <Camera className="w-5 h-5" /> Фото сегодня
                            </label>
                            <label className="cursor-pointer flex items-center justify-center border border-dashed border-white/30 rounded-3xl h-52 md:h-64 hover:bg-white/5 transition overflow-hidden">
                                {currentEntry.photo ? (
                                    <img src={currentEntry.photo} alt="Сегодня" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-center">
                                        <Upload className="w-10 h-10 mx-auto mb-3 text-zinc-400" />
                                        <p className="text-zinc-400">Нажми чтобы загрузить фото</p>
                                    </div>
                                )}
                                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                            </label>
                        </div>

                        {/* Заметки */}
                        <div>
                            <label className="block text-sm text-zinc-400 mb-3">Заметки и наблюдения</label>
                            <textarea
                                value={currentEntry.note}
                                onChange={(e) => setCurrentEntry({ ...currentEntry, note: e.target.value })}
                                placeholder="Как прошёл день? Что было сложно? Что особенно хорошо? Ощущения в теле..."
                                className="w-full h-40 md:h-48 bg-white/5 border border-white/10 rounded-3xl p-6 text-zinc-200 resize-y"
                            />
                        </div>

                        <button
                            onClick={saveEntry}
                            className="w-full py-6 md:py-7 bg-gradient-to-r from-emerald-500 to-teal-500 text-black rounded-3xl font-semibold text-lg md:text-xl hover:scale-[1.02] transition-all active:scale-95"
                        >
                            Сохранить запись за сегодня
                        </button>
                    </div>
                </motion.div>

                {/* Графики — с настроенными осями */}
                {dates.length > 0 && (
                    <div className="glass p-6 md:p-10 rounded-3xl mb-12">
                        <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
                            <TrendingUp className="w-6 h-6" /> Твой прогресс
                        </h3>

                        <div className="grid md:grid-cols-3 gap-6">
                            {/* График Энергии */}
                            <div className="bg-white/5 p-4 rounded-3xl h-80">
                                <Line
                                    data={{
                                        labels: dates,
                                        datasets: [{
                                            label: 'Энергия',
                                            data: energyData,
                                            borderColor: '#10b981',
                                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                            tension: 0.4,
                                            borderWidth: 3
                                        }]
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: { display: true, position: 'top', labels: { color: '#e4e4e7', font: { size: 13 } } },
                                            title: { display: true, text: 'Энергия (1-10)', color: '#a1a1aa', font: { size: 14 } }
                                        },
                                        scales: {
                                            y: {
                                                min: 0,
                                                max: 10,
                                                grid: { color: 'rgba(255,255,255,0.08)' },
                                                ticks: { color: '#71717a', stepSize: 2 }
                                            },
                                            x: {
                                                grid: { color: 'rgba(255,255,255,0.08)' },
                                                ticks: { color: '#71717a', maxRotation: 45, minRotation: 45 }
                                            }
                                        }
                                    }}
                                />
                            </div>

                            {/* График Настроения */}
                            <div className="bg-white/5 p-4 rounded-3xl h-80">
                                <Line
                                    data={{
                                        labels: dates,
                                        datasets: [{
                                            label: 'Настроение',
                                            data: moodData,
                                            borderColor: '#8b5cf6',
                                            backgroundColor: 'rgba(139, 92, 246, 0.1)',
                                            tension: 0.4,
                                            borderWidth: 3
                                        }]
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: { display: true, position: 'top', labels: { color: '#e4e4e7' } },
                                            title: { display: true, text: 'Настроение (1-10)', color: '#a1a1aa', font: { size: 14 } }
                                        },
                                        scales: {
                                            y: {
                                                min: 0,
                                                max: 10,
                                                grid: { color: 'rgba(255,255,255,0.08)' },
                                                ticks: { color: '#71717a', stepSize: 2 }
                                            },
                                            x: {
                                                grid: { color: 'rgba(255,255,255,0.08)' },
                                                ticks: { color: '#71717a', maxRotation: 45 }
                                            }
                                        }
                                    }}
                                />
                            </div>

                            {/* График Веса */}
                            <div className="bg-white/5 p-4 rounded-3xl h-80">
                                <Line
                                    data={{
                                        labels: dates,
                                        datasets: [{
                                            label: 'Вес (кг)',
                                            data: weightData,
                                            borderColor: '#f59e0b',
                                            backgroundColor: 'rgba(245, 158, 11, 0.1)',
                                            tension: 0.4,
                                            borderWidth: 3
                                        }]
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: { display: true, position: 'top', labels: { color: '#e4e4e7' } },
                                            title: { display: true, text: 'Вес (кг)', color: '#a1a1aa', font: { size: 14 } }
                                        },
                                        scales: {
                                            y: {
                                                grid: { color: 'rgba(255,255,255,0.08)' },
                                                ticks: { color: '#71717a' }
                                            },
                                            x: {
                                                grid: { color: 'rgba(255,255,255,0.08)' },
                                                ticks: { color: '#71717a', maxRotation: 45 }
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
                <h3 className="text-2xl font-semibold mb-6">История записей</h3>
                <div className="space-y-8">
                    {Object.entries(entries).reverse().map(([date, entry]) => (
                        <motion.div key={date} className="glass p-6 md:p-8 rounded-3xl">
                            <p className="font-medium mb-6 text-lg">
                                {new Date(date).toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}
                            </p>
                            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-zinc-300">
                                <div>Настроение: {moodEmojis[entry.mood - 1]}</div>
                                <div>Энергия: {entry.energy}/10</div>
                                <div>Сон: {entry.sleep} ч</div>
                                <div>Вес: {entry.weight} кг</div>
                                <div>Талия: {entry.waist} см</div>
                            </div>
                            {entry.note && <p className="mt-6 text-zinc-300 italic leading-relaxed">«{entry.note}»</p>}
                            {entry.photo && (
                                <img src={entry.photo} alt="Фото" className="mt-6 w-full max-h-96 object-cover rounded-3xl" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}