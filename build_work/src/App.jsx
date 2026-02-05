import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Phone, Clock, ChevronRight, ChevronLeft, Check, Mail, CreditCard, Copy } from 'lucide-react';

import weddingNew from './assets/wedding_new.jpg';
import arrangementNew from './assets/arrangement_new.jpg';
import arrangementEnd1 from './assets/arrangement_end_1.jpg';
import arrangementEnd2 from './assets/arrangement_end_2.jpg';
import arrangementEnd3 from './assets/arrangement_end_3.jpg';
import bouquetEnd1 from './assets/bouquet_end_1.jpg';
import bouquetEnd2 from './assets/bouquet_end_2.jpg';
import weddingEnd1 from './assets/wedding_end_1.jpg';
import weddingEnd2 from './assets/wedding_end_2.jpg';
import weddingEnd3 from './assets/wedding_end_3.jpg';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ja } from 'date-fns/locale/ja';
import { addDays } from 'date-fns';

registerLocale('ja', ja);

const App = () => {
    // ... (state vars same as before) ...
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    // Gallery Modal State
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [orderStep, setOrderStep] = useState(1);
    const [orderData, setOrderData] = useState({
        purpose: '',
        purposeOther: '',
        budget: '',
        budgetOther: '',
        type: '',
        typeOther: '',
        image: '',
        imageOther: '',
        useDate: '',
        useTime: '',
        hasMessageCard: '',
        messageCardText: '',
        delivery: '',
        // Detailed contact info
        senderName: '',
        senderPhone: '',
        senderAddress: '',
        recipientName: '',
        recipientPhone: '',
        recipientAddress: ''
    });

    // Gallery Data
    const galleryData = {
        Bouquet: [
            "https://i.imgur.com/wMaeyoI.jpg",
            "https://i.imgur.com/4zC4J4l.jpg",
            "https://i.imgur.com/gEPevmu.jpg",
            bouquetEnd1,
            bouquetEnd2
        ],
        Arrangement: [
            "https://i.imgur.com/JqfNZ6P.jpg",
            arrangementNew,
            "https://i.imgur.com/kefkYt6.jpg",
            "https://i.imgur.com/NVEhUfC.jpg",
            "https://i.imgur.com/pCYYN6u.jpg",
            "https://i.imgur.com/NlR50gt.jpg",
            arrangementEnd1,
            arrangementEnd2,
            arrangementEnd3
        ],
        Wedding: [
            "https://i.imgur.com/3l98YKH.jpg",
            "https://i.imgur.com/B4LVMzt.jpg",
            weddingNew,
            "https://i.imgur.com/NnEC3sF.jpg",
            "https://i.imgur.com/N48Lazr.jpg",
            "https://i.imgur.com/EyPN77x.jpg",
            weddingEnd1,
            weddingEnd2,
            weddingEnd3
        ]
    };

    // Calculate minimum date (3 days from today)
    // Use date-fns addDays to ensure correct date math
    // Set time to 00:00:00 to verify against calendar dates (which are usually 00:00:00)
    const minDate = (() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return addDays(today, 3);
    })();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('opacity-100', 'translate-y-0');
                        entry.target.classList.remove('opacity-0', 'translate-y-8');
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [showOrderModal, selectedCategory]);

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    const purposes = [
        { id: 'celebration', label: 'お祝い', english: 'Celebration' },
        { id: 'condolence', label: 'お供え', english: 'Condolence' },
        { id: 'birthday', label: '誕生日', english: 'Birthday' },
        { id: 'opening', label: '開店（開業）', english: 'Grand Opening' },
        { id: 'home', label: '自宅用', english: 'For Home' },
        { id: 'other', label: 'その他', english: 'Other' }
    ];

    const budgets = [
        { id: '5500', label: '¥5,500' },
        { id: '7700', label: '¥7,700' },
        { id: '11000', label: '¥11,000' },
        { id: '16500', label: '¥16,500' },
        { id: '22000', label: '¥22,000' },
        { id: '27500', label: '¥27,500' },
        { id: '33000', label: '¥33,000' },
        { id: 'other', label: 'その他' }
    ];

    const types = [
        { id: 'bouquet', label: '花束' },
        { id: 'arrangement', label: 'アレンジメント' },
        { id: 'other', label: 'その他' }
    ];

    const images = [
        { id: 'omakase', label: 'おまかせ' },
        { id: 'pale', label: '淡く' },
        { id: 'gorgeous', label: '華やかに' },
        { id: 'chic', label: 'シックに' },
        { id: 'cute', label: '可愛らしく' },
        { id: 'white_green', label: '白グリーン系' }
    ];

    const deliveryOptions = [
        { id: 'pickup', label: '来店', desc: '店頭でのお受け取り' },
        { id: 'sendai', label: '配達（仙台市内）', desc: '仙台市内への配送\n※別途配達料 ¥880' },
        { id: 'outside', label: '市外県外配送', desc: '仙台市外・県外への配送\n＊別途配送料¥1,980〜（サイズにより異なります）' }
    ];

    const timeOptions = [
        "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
    ];

    const handleOrderStart = () => {
        setShowOrderModal(true);
        setOrderStep(1);
        setOrderData({
            purpose: '',
            purposeOther: '',
            budget: '',
            budgetOther: '',
            type: '',
            typeOther: '',
            image: '',
            imageOther: '',
            useDate: '',
            useTime: '',
            hasMessageCard: '',
            messageCardText: '',
            delivery: '',
            senderName: '',
            senderPhone: '',
            senderAddress: '',
            recipientName: '',
            recipientPhone: '',
            recipientAddress: ''
        });
    };

    const handleNext = () => {
        setOrderStep(orderStep + 1);
    };

    const handleBack = () => {
        setOrderStep(orderStep - 1);
    };

    const handleDateChange = (date) => {
        if (!date) {
            setOrderData({ ...orderData, useDate: '' });
            return;
        }
        // date is already a Date object from DatePicker
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;
        setOrderData({ ...orderData, useDate: dateStr });
    };

    // Filter for DatePicker: return true if date is valid (selectable)
    const isDateSelectable = (date) => {
        const day = date.getDay();
        return day !== 3; // 3 is Wednesday (0=Sun, 1=Mon, ..., 6=Sat)
    };

    const generateMessage = () => {
        const purposeLabel = orderData.purpose === 'other' ? `その他（${orderData.purposeOther}）` : purposes.find(p => p.id === orderData.purpose)?.label;

        let budgetLabel = '';
        if (orderData.budget === 'other') {
            budgetLabel = `その他（${orderData.budgetOther}）`;
        } else {
            budgetLabel = budgets.find(b => b.id === orderData.budget)?.label;
        }

        const typeLabel = orderData.type === 'other' ? `その他（${orderData.typeOther}）` : types.find(t => t.id === orderData.type)?.label;
        const imageLabel = images.find(i => i.id === orderData.image)?.label || '';
        const imageDetail = orderData.imageOther ? `\nイメージ詳細: ${orderData.imageOther}` : '';

        const deliveryLabel = deliveryOptions.find(d => d.id === orderData.delivery)?.label;
        const messageCardInfo = orderData.hasMessageCard === 'yes' ? `あり\nメッセージ内容：${orderData.messageCardText}` : 'なし';

        let deliveryDetails = '';
        if (orderData.delivery === 'sendai' || orderData.delivery === 'outside') {
            deliveryDetails = `
----------------
【ご依頼主様】
お名前: ${orderData.senderName}
電話番号: ${orderData.senderPhone}
ご住所: ${orderData.senderAddress}

【お届け先】
お名前: ${orderData.recipientName}
電話番号: ${orderData.recipientPhone}
ご住所: ${orderData.recipientAddress}
----------------`;
        } else if (orderData.delivery === 'pickup') {
            deliveryDetails = `
----------------
【ご依頼主様】
お名前: ${orderData.senderName}
電話番号: ${orderData.senderPhone}
----------------`;
        }

        return `【Hanaya ikka オーダー】

用途: ${purposeLabel}
予算: ${budgetLabel}
種類: ${typeLabel}
イメージ: ${imageLabel}${imageDetail}
ご利用日時: ${orderData.useDate || '未定'} ${orderData.useTime || ''}
メッセージカード（立て札）: ${messageCardInfo}
受取方法: ${deliveryLabel}${deliveryDetails}

※ご注文の詳細確認のため、追ってご連絡させていただきます。`;
    };

    const handleLineSend = () => {
        const message = generateMessage();
        const encodedMessage = encodeURIComponent(message);
        window.location.href = `https://line.me/R/oaMessage/@716atlab/?${encodedMessage}`;
        setShowOrderModal(false);
    };

    const handleMailSend = () => {
        const message = generateMessage().replace(/\n/g, '\r\n'); // Ensure CRLF for broad compatibility
        const subject = "オーダー注文";
        const body = encodeURIComponent(message);
        // Use a hidden anchor tag click to better support mobile
        const link = document.createElement('a');
        link.href = `mailto:mail@ikka-hanaya.jp?subject=${subject}&body=${body}`;
        link.click();
        setShowOrderModal(false);
    };

    const handleCopyContent = async () => {
        const message = generateMessage();
        try {
            await navigator.clipboard.writeText(message);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const isStepComplete = () => {
        switch (orderStep) {
            case 1: return orderData.purpose !== '' && (orderData.purpose !== 'other' || orderData.purposeOther !== '');
            case 2: return orderData.budget !== '' && (orderData.budget !== 'other' || orderData.budgetOther !== '');
            case 3: return orderData.type !== '' && (orderData.type !== 'other' || orderData.typeOther !== '');
            case 4: return orderData.image !== '';
            case 5: return orderData.useDate !== '' && orderData.useTime !== '';
            case 6: return orderData.hasMessageCard !== '' && (orderData.hasMessageCard === 'no' || orderData.messageCardText !== '');
            case 7:
                if (!orderData.delivery) return false;
                if (orderData.delivery === 'pickup') {
                    return orderData.senderName !== '' && orderData.senderPhone !== '';
                }
                if (orderData.delivery === 'sendai' || orderData.delivery === 'outside') {
                    return orderData.senderName !== '' &&
                        orderData.senderPhone !== '' &&
                        orderData.senderAddress !== '' &&
                        orderData.recipientName !== '' &&
                        orderData.recipientPhone !== '' &&
                        orderData.recipientAddress !== '';
                }
                return false;
            default: return false;
        }
    };

    return (
        <div className="min-h-screen bg-stone-100 text-stone-800">
            {/* Navigation */}
            <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${scrolled ? 'bg-white/95 shadow-sm py-4' : 'bg-transparent py-8'}`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                    {/* Logo Image in Navigation - Left aligned */}
                    <div className="cursor-pointer z-50" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <img src="https://i.imgur.com/mU4Jon8.png" alt="一花" className="w-16 md:w-24 h-auto object-contain" referrerPolicy="no-referrer" />
                    </div>

                    {/* Desktop Menu - Right aligned */}
                    <div className="hidden md:flex gap-10 text-sm tracking-widest ml-auto">
                        {['concept', 'services', 'gallery', 'order', 'info'].map((item) => (
                            <button key={item} onClick={() => scrollToSection(item)} className="hover:text-stone-400 transition-colors uppercase english-text text-xs">
                                {item === 'info' ? 'access' : item}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button - Right aligned */}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-stone-800 z-50 relative ml-auto">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <div className={`fixed inset-0 bg-white/95 z-40 transition-opacity duration-300 flex items-center justify-center ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    <div className="flex flex-col gap-8 text-center">
                        {['concept', 'services', 'gallery', 'order', 'info'].map((item) => (
                            <button key={item} onClick={() => scrollToSection(item)} className="text-2xl uppercase hover:text-stone-400 english-text tracking-widest">
                                {item === 'info' ? 'access' : item}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative h-screen flex items-center justify-center bg-stone-100 overflow-hidden">
                {/* Background Image removed */}
                <div className="absolute inset-0 z-0">
                    {/* Simple subtle background color */}
                    <div className="absolute inset-0 bg-stone-100"></div>
                </div>

                <div className="relative text-center z-10 px-6 flex flex-col items-center">
                    <img
                        src="https://i.imgur.com/q7cXpmM.png"
                        alt="HANAYA IKKA"
                        className="w-40 md:w-60 h-auto fade-in transition-all duration-1000 delay-200 object-contain"
                        referrerPolicy="no-referrer"
                    />

                    {/* Inserted Image - Increased Size & Changed Source */}
                    <div className="mt-8 mb-8 fade-in transition-all duration-1000 delay-500">
                        <img
                            src="https://i.imgur.com/74ib8gN.jpeg"
                            alt="Flower"
                            className="w-56 md:w-80 h-auto object-contain rounded-sm"
                            referrerPolicy="no-referrer"
                        />
                    </div>

                    <div className="w-[1px] h-16 bg-stone-400 mx-auto fade-in transition-all duration-1000 delay-700 origin-top"></div>
                    <p className="mt-8 text-sm leading-8 tracking-widest text-stone-600 fade-in transition-all duration-1000 delay-1000 font-light">
                        花との出会いは、一期一会。<br />
                        想いを託す、一季一花。
                    </p>
                </div>
            </section>

            {/* Concept */}
            <section id="concept" className="py-32 px-6 max-w-4xl mx-auto">
                <div className="fade-in transition-all duration-1000 text-center">
                    <h2 className="text-4xl md:text-5xl mb-16 tracking-widest font-light english-text">Concept</h2>
                    <p className="text-sm leading-10 text-stone-600 tracking-wide font-light">
                        ikkaが大事にするのは、<br />
                        その花がその花らしくあること。<br />
                        生き物であるということの生々しさです。<br /><br />
                        色彩、香り、フォルム、質感、そして季節感まで、<br />
                        花本来の個性を大事にしています。<br /><br />
                        花が一番美しく見える「必然」を形にするべく、<br />
                        一つひとつ丁寧にお作りいたします。
                    </p>
                </div>
            </section>

            {/* Services */}
            <section id="services" className="py-32 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-24 fade-in transition-all duration-1000">
                        <h2 className="text-4xl md:text-5xl tracking-widest font-light english-text">Services</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 md:gap-16">
                        {[
                            {
                                title: 'Bouquet & Arrangement',
                                desc: '花束・アレンジメント',
                                detail: (
                                    <>
                                        大切な方への贈り物や、お祝い事、弔辞用に。<br />
                                        花束はラッピングをしてご用意しております。<br />
                                        （ラッピングはおまかせとなります）<br />
                                        アレンジメントは器に活けるもので、お届け後そのまま飾っていただけます。
                                    </>
                                )
                            },
                            {
                                title: 'Wedding',
                                desc: 'ブライダル',
                                detail: (
                                    <>
                                        一生に一度の特別な日を、花で彩ります。<br />
                                        お二人らしさを大切にコーディネートいたします。<br />
                                        ブーケ、贈呈用、会場装花まで、お気軽にご相談ください。
                                    </>
                                )
                            },
                            {
                                title: 'Lesson',
                                desc: '一花ノ会',
                                detail: (
                                    <>
                                        ikkaでは「一花ノ会」と題し、<br />
                                        不定期にお花の教室を開催しております。<br />
                                        花束やアレンジメント、リースなど、<br />
                                        内容はその時期により様々です。<br />
                                        型にこだわらず、花の個性を大切にしています。<br />
                                        少人数の完全予約制です。<br />
                                        もちろん未経験、お一人様でも。<br />
                                        是非お気軽にご参加ください。
                                    </>
                                )
                            }
                        ].map((service, idx) => (
                            <div
                                key={idx}
                                className="fade-in transition-all duration-1000 flex flex-col items-center text-center group"
                                style={{ transitionDelay: `${idx * 200}ms` }}
                            >
                                <h3 className="text-xl mb-3 tracking-wider english-text font-medium">{service.title}</h3>
                                <p className="text-sm mb-6 text-stone-500 tracking-wider">{service.desc}</p>
                                <div className="w-8 h-[1px] bg-stone-300 mb-6"></div>
                                <p className="text-sm leading-8 text-stone-600 font-light text-center">{service.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section id="gallery" className="py-32 px-6 bg-stone-100">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-20 fade-in transition-all duration-1000">
                        <h2 className="text-4xl md:text-5xl tracking-widest font-light english-text">Gallery</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                        {Object.entries(galleryData).map(([category, images], idx) => (
                            <div
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`aspect-square relative overflow-hidden group cursor-pointer fade-in transition-all duration-1000`}
                                style={{ transitionDelay: `${idx * 100}ms` }}
                            >
                                <img
                                    src={images[0]}
                                    alt={category}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 text-white transition-opacity duration-500 hover:opacity-100">
                                    <span className="english-text tracking-widest text-2xl italic mb-2">{category}</span>
                                    <span className="text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 english-text border-b border-white pb-1">View All</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12 fade-in transition-all duration-1000 delay-500">
                        <a
                            href="https://www.instagram.com/hanaya.ikka?igsh=MXVvd3VoZTkwejRxYg%3D%3D&utm_source=qr"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block border-b border-stone-400 pb-1 text-stone-500 hover:text-stone-800 hover:border-stone-800 transition-colors tracking-widest text-sm english-text"
                        >
                            INSTAGRAM
                        </a>
                    </div>
                </div>
            </section>

            {/* Gallery Modal */}
            {selectedCategory && (
                <div className="fixed inset-0 bg-black/90 z-50 flex flex-col p-4 animate-in fade-in duration-300">
                    <div className="flex justify-between items-center mb-6 text-white px-2">
                        <h3 className="text-2xl english-text tracking-widest italic">{selectedCategory}</h3>
                        <button onClick={() => setSelectedCategory(null)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                            <X size={32} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto px-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
                            {galleryData[selectedCategory].map((src, index) => (
                                <div key={index} className="aspect-square relative bg-stone-800">
                                    <img src={src} alt={`${selectedCategory} ${index + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Order - Renamed from Contact, bg-white for contrast */}
            <section id="order" className="py-32 px-6 bg-white">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="mb-12 fade-in transition-all duration-1000">
                        <h2 className="text-4xl md:text-5xl mb-16 tracking-widest font-light english-text">Order</h2>
                        <p className="text-sm leading-8 text-stone-600 tracking-wide font-light">
                            お花のご注文は以下の「オーダー」ボタンより承っております。<br />
                            クレジット等、オンライン決済をご希望の際はWeb shopをご利用ください。<br />
                            ウェディングのご相談や、事前に内容をご相談したい方は「LINEで相談」か「メールで相談」をお選びください。
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 justify-center items-center fade-in transition-all duration-1000 delay-200">
                        <button
                            onClick={handleOrderStart}
                            className="group relative w-full md:w-64 h-14 bg-stone-800 text-white overflow-hidden transition-all hover:bg-stone-700"
                        >
                            <span className="absolute inset-0 flex items-center justify-center gap-2 tracking-widest transition-transform group-hover:-translate-y-full">
                                オーダー <ChevronRight size={16} />
                            </span>
                            <span className="absolute inset-0 flex items-center justify-center gap-2 tracking-widest translate-y-full transition-transform group-hover:translate-y-0 english-text">
                                START ORDER
                            </span>
                        </button>

                        <a
                            href="https://hanayaikka.stores.jp"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full md:w-64 h-14 border border-stone-400 text-stone-600 flex items-center justify-center gap-2 tracking-widest hover:bg-stone-400 hover:text-white transition-all hover:border-stone-400 bg-transparent group"
                        >
                            <CreditCard size={16} className="text-stone-500 group-hover:text-white" />
                            <span className="english-text">WEB SHOP</span>
                        </a>

                        <a
                            href="https://lin.ee/v0joyVM"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full md:w-64 h-14 border border-stone-400 text-stone-600 flex items-center justify-center gap-2 tracking-widest hover:bg-stone-400 hover:text-white transition-all hover:border-stone-400 bg-transparent"
                        >
                            LINEで相談
                        </a>

                        <a
                            href="mailto:mail@ikka-hanaya.jp?subject=ご相談&body=お名前：%0D%0Aご用件：%0D%0A"
                            className="w-full md:w-64 h-14 border border-stone-400 text-stone-600 flex items-center justify-center gap-2 tracking-widest hover:bg-stone-400 hover:text-white transition-all hover:border-stone-400 bg-transparent"
                        >
                            <Mail size={16} />
                            メールで相談
                        </a>
                    </div>

                    <div className="mt-12 space-y-4 fade-in transition-all duration-1000 delay-300">
                        <p className="text-xs text-stone-500 tracking-wider">
                            お急ぎの場合はお電話（<span className="english-text">022-397-7552</span>）にてご連絡ください。
                        </p>
                    </div>
                </div>
            </section>

            {/* Info & Access - Swapped with Contact, bg-stone-100 for contrast */}
            <section id="info" className="py-32 px-6 bg-stone-100">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-20 fade-in transition-all duration-1000">
                        <h2 className="text-4xl md:text-5xl tracking-widest font-light english-text">Access</h2>
                    </div>

                    <div className="fade-in transition-all duration-1000">
                        <div className="bg-stone-50 p-8 md:p-12 max-w-2xl mx-auto">
                            <div className="space-y-8">
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <MapPin className="text-stone-400" size={20} />
                                    <div>
                                        <p className="text-base leading-relaxed tracking-wide text-stone-700">
                                            〒980-0811<br />
                                            仙台市青葉区一番町1-5-31<br />
                                            MIGNON一番町ビル3F−A
                                        </p>
                                        <p className="text-xs text-stone-500 mt-2 tracking-wider">※完全予約制となっております</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-2 text-center">
                                    <Clock className="text-stone-400" size={20} />
                                    <div className="text-stone-700 tracking-wide">
                                        <p className="mb-1">11:00 - 18:00</p>
                                        <p>定休日：水曜日</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-2 text-center">
                                    <Phone className="text-stone-400" size={20} />
                                    <div>
                                        <a href="tel:022-397-7552" className="text-lg tracking-wider text-stone-700 hover:text-stone-400 transition-colors english-text">
                                            022-397-7552
                                        </a>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-2 text-center">
                                    <Mail className="text-stone-400" size={20} />
                                    <div>
                                        <a href="mailto:mail@ikka-hanaya.jp" className="text-lg tracking-wider text-stone-700 hover:text-stone-400 transition-colors english-text">
                                            mail@ikka-hanaya.jp
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=仙台市青葉区一番町1-5-31+MIGNON一番町ビル3F-A"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center py-3 border border-stone-300 text-stone-600 hover:bg-stone-600 hover:text-white hover:border-stone-600 transition-all tracking-wider text-sm english-text"
                                >
                                    GOOGLE MAPS
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Order Modal */}
            {showOrderModal && (
                <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity">
                    <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-300">
                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b border-stone-100 p-6 flex items-center justify-between z-10">
                            <div>
                                <h3 className="text-xl tracking-widest text-stone-800 english-text">ORDER</h3>
                                <p className="text-xs text-stone-500 mt-1 tracking-wider english-text">Step {orderStep} / 8</p>
                            </div>
                            <button onClick={() => setShowOrderModal(false)} className="text-stone-400 hover:text-stone-800 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-1 bg-stone-100 w-full">
                            <div className="h-full bg-stone-800 transition-all duration-500 ease-out" style={{ width: `${(orderStep / 8) * 100}%` }} />
                        </div>

                        {/* Content */}
                        <div className="p-8 min-h-[400px]">
                            {/* Step 1: Purpose */}
                            {orderStep === 1 && (
                                <div className="animate-in slide-in-from-right-4 duration-300">
                                    <h4 className="text-lg mb-8 tracking-widest text-center">用途をお選びください</h4>
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        {purposes.map((purpose) => (
                                            <button
                                                key={purpose.id}
                                                onClick={() => setOrderData({ ...orderData, purpose: purpose.id })}
                                                className={`p-4 border transition-all text-center group ${orderData.purpose === purpose.id
                                                    ? 'border-stone-800 bg-stone-50 text-stone-800'
                                                    : 'border-stone-200 text-stone-500 hover:border-stone-400 hover:text-stone-600'
                                                    }`}
                                            >
                                                <div className="text-base tracking-wide mb-1">{purpose.label}</div>
                                                <div className="text-[10px] uppercase tracking-widest opacity-60 english-text">{purpose.english}</div>
                                            </button>
                                        ))}
                                    </div>
                                    {orderData.purpose === 'other' && (
                                        <div className="mt-4 animate-in fade-in">
                                            <input
                                                type="text"
                                                value={orderData.purposeOther}
                                                onChange={(e) => setOrderData({ ...orderData, purposeOther: e.target.value })}
                                                placeholder="具体的な用途をご記入ください"
                                                className="w-full p-4 border border-stone-300 focus:border-stone-800 outline-none text-stone-700 placeholder-stone-300 tracking-wide bg-transparent"
                                                autoFocus
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Step 2: Budget */}
                            {orderStep === 2 && (
                                <div className="animate-in slide-in-from-right-4 duration-300">
                                    <h4 className="text-lg mb-8 tracking-widest text-center">ご予算をお選びください</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {budgets.map((budget) => (
                                            <button
                                                key={budget.id}
                                                onClick={() => setOrderData({ ...orderData, budget: budget.id })}
                                                className={`py-6 border transition-all ${orderData.budget === budget.id
                                                    ? 'border-stone-800 bg-stone-50 text-stone-800'
                                                    : 'border-stone-200 text-stone-500 hover:border-stone-400'
                                                    }`}
                                            >
                                                <div className="text-lg tracking-wider english-text">{budget.label}</div>
                                            </button>
                                        ))}
                                    </div>
                                    {orderData.budget === 'other' ? (
                                        <div className="mt-4 animate-in fade-in">
                                            <input
                                                type="text"
                                                value={orderData.budgetOther}
                                                onChange={(e) => setOrderData({ ...orderData, budgetOther: e.target.value })}
                                                placeholder="ご希望の予算をご記入ください"
                                                className="w-full p-4 border border-stone-300 focus:border-stone-800 outline-none text-stone-700 placeholder-stone-300 tracking-wide bg-transparent"
                                                autoFocus
                                            />
                                            <p className="text-xs text-stone-500 mt-2 tracking-wide text-center">
                                                （¥4,000〜）別途消費税が加算されます。
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-xs text-stone-400 text-center mt-6 tracking-wide">
                                            ※税込価格となります
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Step 3: Type */}
                            {orderStep === 3 && (
                                <div className="animate-in slide-in-from-right-4 duration-300">
                                    <h4 className="text-lg mb-8 tracking-widest text-center">種類をお選びください</h4>
                                    <div className="space-y-4 max-w-md mx-auto">
                                        {types.map((type) => (
                                            <button
                                                key={type.id}
                                                onClick={() => setOrderData({ ...orderData, type: type.id })}
                                                className={`w-full p-6 border transition-all flex items-center justify-between ${orderData.type === type.id
                                                    ? 'border-stone-800 bg-stone-50 text-stone-800'
                                                    : 'border-stone-200 text-stone-500 hover:border-stone-400'
                                                    }`}
                                            >
                                                <span className="text-lg tracking-widest">{type.label}</span>
                                                {orderData.type === type.id && <Check size={18} />}
                                            </button>
                                        ))}
                                    </div>
                                    {orderData.type === 'other' && (
                                        <div className="mt-4 max-w-md mx-auto animate-in fade-in">
                                            <input
                                                type="text"
                                                value={orderData.typeOther}
                                                onChange={(e) => setOrderData({ ...orderData, typeOther: e.target.value })}
                                                placeholder="その他の内容（例：スタンド花、リース）"
                                                className="w-full p-4 border border-stone-300 focus:border-stone-800 outline-none text-stone-700 placeholder-stone-300 tracking-wide bg-transparent"
                                                autoFocus
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Step 4: Image */}
                            {orderStep === 4 && (
                                <div className="animate-in slide-in-from-right-4 duration-300">
                                    <h4 className="text-lg mb-8 tracking-widest text-center">イメージをお選びください</h4>
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        {images.map((image) => (
                                            <button
                                                key={image.id}
                                                onClick={() => setOrderData({ ...orderData, image: image.id })}
                                                className={`p-4 border transition-all text-center group ${orderData.image === image.id
                                                    ? 'border-stone-800 bg-stone-50 text-stone-800'
                                                    : 'border-stone-200 text-stone-500 hover:border-stone-400 hover:text-stone-600'
                                                    }`}
                                            >
                                                <div className="text-lg tracking-wider">{image.label}</div>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="mt-6 animate-in fade-in">
                                        <input
                                            type="text"
                                            value={orderData.imageOther}
                                            onChange={(e) => setOrderData({ ...orderData, imageOther: e.target.value })}
                                            placeholder="何かあれば入力してください。"
                                            className="w-full p-4 border border-stone-300 focus:border-stone-800 outline-none text-stone-700 placeholder-stone-300 tracking-wide bg-transparent"
                                        />
                                    </div>
                                    <p className="text-xs text-red-500 mt-4 text-center tracking-wide font-bold">
                                        ※色合いのご指定は不可となります。
                                    </p>
                                </div>
                            )}

                            {/* Step 5: Additional Info */}
                            {orderStep === 5 && (
                                <div className="animate-in slide-in-from-right-4 duration-300">
                                    <h4 className="text-lg mb-8 tracking-widest text-center">ご利用日・時間</h4>
                                    <div className="max-w-xs mx-auto">
                                        <label className="block text-xs text-stone-500 mb-2 tracking-widest uppercase english-text">Pick up Date</label>
                                        <div className="w-full">
                                            <DatePicker
                                                selected={orderData.useDate ? new Date(orderData.useDate) : null}
                                                onChange={handleDateChange}
                                                minDate={minDate}
                                                filterDate={isDateSelectable}
                                                locale="ja"
                                                dateFormat="yyyy/MM/dd"
                                                placeholderText="日付を選択してください"
                                                className="w-full p-4 border border-stone-300 focus:border-stone-800 outline-none text-stone-700 tracking-widest bg-transparent text-center cursor-pointer english-text rounded-none"
                                                wrapperClassName="w-full"
                                                onFocus={(e) => e.target.blur()} // Prevent keyboard on mobile
                                                withPortal // Render as modal on mobile
                                                portalId="root-portal" // Optional, but good practice
                                            />
                                        </div>
                                        <p className="text-xs text-red-500 mt-2 text-center tracking-wide font-bold">
                                            ※本日から3日後以降、水曜日（定休）以外を選択可能です
                                        </p>

                                        <label className="block text-xs text-stone-500 mt-6 mb-2 tracking-widest uppercase english-text">Pick up Time</label>
                                        <select
                                            value={orderData.useTime}
                                            onChange={(e) => setOrderData({ ...orderData, useTime: e.target.value })}
                                            className="w-full p-4 border border-stone-300 focus:border-stone-800 outline-none text-stone-700 tracking-widest bg-transparent text-center cursor-pointer english-text"
                                        >
                                            <option value="">TIME</option>
                                            {timeOptions.map((time) => (
                                                <option key={time} value={time}>{time}</option>
                                            ))}
                                        </select>

                                        <p className="text-xs text-stone-400 mt-6 text-center tracking-wide leading-relaxed">
                                            ※本日より3日後以降の日付をご指定ください。<br />
                                            お急ぎの場合はお電話にてご相談ください。
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Step 6: Message Card */}
                            {orderStep === 6 && (
                                <div className="animate-in slide-in-from-right-4 duration-300">
                                    <h4 className="text-lg mb-8 tracking-widest text-center">メッセージカード（立て札）</h4>
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <button
                                            onClick={() => setOrderData({ ...orderData, hasMessageCard: 'yes' })}
                                            className={`p-4 border transition-all text-center ${orderData.hasMessageCard === 'yes'
                                                ? 'border-stone-800 bg-stone-50 text-stone-800'
                                                : 'border-stone-200 text-stone-500 hover:border-stone-400'
                                                }`}
                                        >
                                            <span className="tracking-widest">あり</span>
                                        </button>
                                        <button
                                            onClick={() => setOrderData({ ...orderData, hasMessageCard: 'no', messageCardText: '' })}
                                            className={`p-4 border transition-all text-center ${orderData.hasMessageCard === 'no'
                                                ? 'border-stone-800 bg-stone-50 text-stone-800'
                                                : 'border-stone-200 text-stone-500 hover:border-stone-400'
                                                }`}
                                        >
                                            <span className="tracking-widest">なし</span>
                                        </button>
                                    </div>

                                    {orderData.hasMessageCard === 'yes' && (
                                        <div className="animate-in fade-in">
                                            <textarea
                                                value={orderData.messageCardText}
                                                onChange={(e) => setOrderData({ ...orderData, messageCardText: e.target.value })}
                                                placeholder="メッセージをご入力ください（例：Happy Birthday、祝御開店 株式会社〇〇）"
                                                rows={4}
                                                className="w-full p-4 border border-stone-300 focus:border-stone-800 outline-none text-stone-700 placeholder-stone-300 tracking-wide bg-transparent resize-none"
                                                autoFocus
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Step 7: Delivery */}
                            {orderStep === 7 && (
                                <div className="animate-in slide-in-from-right-4 duration-300">
                                    <h4 className="text-lg mb-8 tracking-widest text-center">お受取方法</h4>
                                    <div className="space-y-4 max-w-md mx-auto mb-8">
                                        {deliveryOptions.map((option) => (
                                            <button
                                                key={option.id}
                                                onClick={() => setOrderData({ ...orderData, delivery: option.id, senderName: '', senderPhone: '', senderAddress: '', recipientName: '', recipientPhone: '', recipientAddress: '' })}
                                                className={`w-full p-6 border transition-all text-left group ${orderData.delivery === option.id
                                                    ? 'border-stone-800 bg-stone-50 text-stone-800'
                                                    : 'border-stone-200 text-stone-500 hover:border-stone-400'
                                                    }`}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <div className="text-lg tracking-widest mb-1">{option.label}</div>
                                                        <div className="text-xs text-stone-400 group-hover:text-stone-500 whitespace-pre-wrap">{option.desc}</div>
                                                    </div>
                                                    {orderData.delivery === option.id && <Check size={18} />}
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Detailed Input based on Delivery Choice */}
                                    {orderData.delivery && (
                                        <div className="space-y-8 animate-in fade-in bg-stone-50 p-6 rounded-lg">
                                            {/* Sender Info - Always needed but address depends */}
                                            <div>
                                                <h5 className="text-sm tracking-widest mb-4 font-bold text-stone-700 border-b border-stone-200 pb-2">ご依頼主様 (Requester)</h5>
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-xs text-stone-500 mb-1 tracking-wide">お名前（フルネーム）</label>
                                                        <input
                                                            type="text"
                                                            value={orderData.senderName}
                                                            onChange={(e) => setOrderData({ ...orderData, senderName: e.target.value })}
                                                            className="w-full p-3 border border-stone-300 focus:border-stone-800 outline-none bg-white"
                                                            placeholder="山田 太郎"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs text-stone-500 mb-1 tracking-wide">電話番号</label>
                                                        <input
                                                            type="tel"
                                                            value={orderData.senderPhone}
                                                            onChange={(e) => setOrderData({ ...orderData, senderPhone: e.target.value })}
                                                            className="w-full p-3 border border-stone-300 focus:border-stone-800 outline-none bg-white"
                                                            placeholder="090-1234-5678"
                                                        />
                                                    </div>
                                                    {(orderData.delivery === 'sendai' || orderData.delivery === 'outside') && (
                                                        <div>
                                                            <label className="block text-xs text-stone-500 mb-1 tracking-wide">ご住所</label>
                                                            <textarea
                                                                value={orderData.senderAddress}
                                                                onChange={(e) => setOrderData({ ...orderData, senderAddress: e.target.value })}
                                                                placeholder="〒000-0000 〇〇県〇〇市..."
                                                                rows={3}
                                                                className="w-full p-3 border border-stone-300 focus:border-stone-800 outline-none bg-white resize-none"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Recipient Info - Only for delivery */}
                                            {(orderData.delivery === 'sendai' || orderData.delivery === 'outside') && (
                                                <div>
                                                    <h5 className="text-sm tracking-widest mb-4 font-bold text-stone-700 border-b border-stone-200 pb-2">お届け先 (Recipient)</h5>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <label className="block text-xs text-stone-500 mb-1 tracking-wide">お名前（フルネーム）</label>
                                                            <input
                                                                type="text"
                                                                value={orderData.recipientName}
                                                                onChange={(e) => setOrderData({ ...orderData, recipientName: e.target.value })}
                                                                className="w-full p-3 border border-stone-300 focus:border-stone-800 outline-none bg-white"
                                                                placeholder="鈴木 花子"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs text-stone-500 mb-1 tracking-wide">電話番号</label>
                                                            <input
                                                                type="tel"
                                                                value={orderData.recipientPhone}
                                                                onChange={(e) => setOrderData({ ...orderData, recipientPhone: e.target.value })}
                                                                className="w-full p-3 border border-stone-300 focus:border-stone-800 outline-none bg-white"
                                                                placeholder="080-9876-5432"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs text-stone-500 mb-1 tracking-wide">ご住所</label>
                                                            <textarea
                                                                value={orderData.recipientAddress}
                                                                onChange={(e) => setOrderData({ ...orderData, recipientAddress: e.target.value })}
                                                                placeholder="〒000-0000 〇〇県〇〇市..."
                                                                rows={3}
                                                                className="w-full p-3 border border-stone-300 focus:border-stone-800 outline-none bg-white resize-none"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Step 8: Confirmation & Send */}
                            {orderStep === 8 && (
                                <div className="animate-in slide-in-from-right-4 duration-300">
                                    <h4 className="text-lg mb-6 tracking-widest text-center">ご注文内容の確認</h4>
                                    <div className="bg-stone-50 p-4 rounded text-sm whitespace-pre-wrap mb-6 font-mono text-stone-600 leading-relaxed max-h-[300px] overflow-y-auto">
                                        {generateMessage()}
                                    </div>
                                    <p className="text-xs text-center text-stone-400 mb-6 tracking-wide">
                                        送信方法をお選びください。<br />
                                        ボタンを押すとアプリが起動します。
                                    </p>
                                    <div className="flex flex-col gap-3">
                                        <button
                                            onClick={handleLineSend}
                                            className="w-full py-4 bg-[#06C755] text-white hover:opacity-90 transition-all tracking-widest flex items-center justify-center gap-2 rounded"
                                        >
                                            LINEで送信
                                        </button>
                                        <button
                                            onClick={handleMailSend}
                                            className="w-full py-4 bg-stone-600 text-white hover:bg-stone-700 transition-all tracking-widest flex items-center justify-center gap-2 rounded"
                                        >
                                            <Mail size={18} /> メールで送信
                                        </button>
                                        <button
                                            onClick={handleCopyContent}
                                            className="w-full py-4 bg-stone-200 text-stone-600 hover:bg-stone-300 transition-all tracking-widest flex items-center justify-center gap-2 rounded relative"
                                        >
                                            {copySuccess ? (
                                                <>
                                                    <Check size={18} className="text-green-600" />
                                                    <span className="text-green-600">コピーしました！</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy size={18} /> 文章をコピー
                                                </>
                                            )}
                                        </button>
                                        <div className="text-[10px] text-stone-400 text-center leading-relaxed">
                                            ※メールが起動しない場合、「文章をコピー」を押してから<br />
                                            ご自身のメールアプリに貼り付けて送信してください。
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="bg-stone-50 border-t border-stone-100 p-6 flex gap-4">
                            {orderStep > 1 && (
                                <button
                                    onClick={handleBack}
                                    className="w-16 flex items-center justify-center border border-stone-300 text-stone-500 hover:bg-stone-200 transition-colors"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                            )}
                            {orderStep < 8 ? (
                                <button
                                    onClick={handleNext}
                                    disabled={!isStepComplete()}
                                    className={`flex-1 tracking-widest flex items-center justify-center gap-2 transition-all english-text ${isStepComplete()
                                        ? 'bg-stone-800 text-white hover:bg-stone-700'
                                        : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                                        }`}
                                >
                                    NEXT <ChevronRight size={16} />
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="py-20 px-6 bg-stone-800 text-stone-400 text-center flex flex-col items-center">
                {/* Footer Logo Image with inverted brightness for dark background */}
                <img
                    src="https://i.imgur.com/mU4Jon8.png"
                    alt="一花"
                    className="h-10 w-auto mb-8 brightness-0 invert opacity-90 object-contain"
                    referrerPolicy="no-referrer"
                />
                <div className="flex justify-center gap-8 mb-12 text-xs tracking-widest">
                    {['concept', 'services', 'gallery', 'order', 'info'].map((item) => (
                        <button key={item} onClick={() => scrollToSection(item)} className="hover:text-white uppercase english-text">
                            {item === 'info' ? 'access' : item}
                        </button>
                    ))}
                </div>
                <p className="text-[10px] tracking-widest opacity-50 english-text">
                    © 2026 HANAYA IKKA. ALL RIGHTS RESERVED. (v1.0.2)
                </p>
            </footer>
        </div>
    );
};

export default App;
