export const parts = [
 {id:'board',name:'Ona plata',short:'MB',color:'#37b69c',category:'Bog‘lanish',description:'Kompyuter qismlarini bir-biriga bog‘laydigan asosiy elektron plata. Protsessor, RAM va kengaytirish kartalari shu plataga ulanadi.',analogy:'Shahardagi ko‘chalar kabi: barcha qismlar orasida aloqa yo‘lini yaratadi.',fact:'Ona plata va protsessor soketi bir-biriga mos bo‘lishi kerak.'},
 {id:'cpu',name:'Protsessor',short:'CPU',color:'#a18af5',category:'Hisoblash',description:'Dastur buyruqlarini bajaradi, hisob-kitob qiladi va ma’lumotlarni qayta ishlaydi.',analogy:'Masalalarni yechadigan boshqaruvchi: buyruqlarni ketma-ket bajaradi.',fact:'GHz chastotani bildiradi; unumdorlik faqat chastotaga bog‘liq emas.'},
 {id:'ram',name:'Tezkor xotira',short:'RAM',color:'#f4bd50',category:'Vaqtinchalik saqlash',description:'Ishlayotgan dasturlar uchun zarur ma’lumotlarni vaqtincha saqlaydi. Elektr o‘chsa, undagi ma’lumotlar yo‘qoladi.',analogy:'Ish stolingiz: ayni paytda ishlatayotgan narsalaringiz shu yerda turadi.',fact:'RAM doimiy fayl saqlash qurilmasi emas.'},
 {id:'ssd',name:'SSD disk',short:'SSD',color:'#52b7ec',category:'Doimiy saqlash',description:'Operatsion tizim, dasturlar va fayllarni doimiy saqlaydi. Elektr uzilganda ham ma’lumotlar saqlanadi.',analogy:'Kitob javoni: kerakli fayllarni uzoq muddat saqlaydi.',fact:'SSD ichida HDD dagidek aylanuvchi magnit disklar bo‘lmaydi.'},
 {id:'gpu',name:'Videokarta',short:'GPU',color:'#ee8d9c',category:'Tasvir',description:'Grafik ma’lumotlarni qayta ishlaydi. O‘yinlar, 3D sahnalar va videolarni tasvirlashda yordam beradi.',analogy:'Rassom: hisoblangan ma’lumotlardan ekrandagi tasvirni yaratadi.',fact:'Ayrim kompyuterlarda grafik protsessor CPU tarkibiga o‘rnatilgan.'},
 {id:'psu',name:'Quvvat bloki',short:'PSU',color:'#8593ab',category:'Elektr ta’minoti',description:'Tarmoqdagi elektr energiyasini kompyuter qismlariga mos doimiy kuchlanishlarga aylantiradi.',analogy:'Elektr ta’minoti markazi: barcha qismlarga kerakli energiyani beradi.',fact:'Quvvat blokini ochish xavfli. Virtual mashqda uni faqat korpusga joylashtiramiz.'},
 {id:'fan',name:'Sovutish tizimi',short:'FAN',color:'#52cabb',category:'Sovutish',description:'Radiator va ventilyator protsessordan issiqlikni olib chiqishga yordam beradi.',analogy:'Shamollatish tizimi: qizigan qismlarni sovitib turadi.',fact:'Protsessor ustidagi termopasta issiqlik uzatishni yaxshilaydi.'}
];
export const assemblyOrder=['board','cpu','ram','ssd','gpu','psu','fan'];
export const questions=[
 {text:'Dastur buyruqlarini qaysi qism bajaradi?',options:['SSD','Protsessor','Quvvat bloki','Ventilyator'],answer:1,why:'Protsessor buyruqlarni bajaradi va ma’lumotlarni qayta ishlaydi.'},
 {text:'Elektr o‘chirilganda qaysi xotiradagi ma’lumotlar yo‘qoladi?',options:['SSD','HDD','RAM','USB fleshka'],answer:2,why:'RAM vaqtinchalik xotira bo‘lib, elektr ta’minotiga bog‘liq.'},
 {text:'Kompyuter qismlarini qaysi qurilma bog‘laydi?',options:['Ona plata','Monitor','Sichqoncha','SSD'],answer:0,why:'Asosiy komponentlar ona plataga ulanadi.'},
 {text:'Grafik ma’lumotlarni qayta ishlashda qaysi qism yordam beradi?',options:['RAM','PSU','SSD','GPU'],answer:3,why:'GPU grafik ma’lumotlarni qayta ishlaydi.'},
 {text:'Fayllarni elektr o‘chganda ham qaysi qurilma saqlaydi?',options:['Ventilyator','SSD','RAM','Radiator'],answer:1,why:'SSD doimiy ma’lumot saqlash qurilmasidir.'},
 {text:'Protsessor qizib ketmasligi uchun nima kerak?',options:['Sovutish tizimi','Qo‘shimcha monitor','Klaviatura','USB kabel'],answer:0,why:'Sovutish tizimi protsessordan issiqlikni chiqaradi.'},
 {text:'Quvvat blokining vazifasi nima?',options:['Tasvir yaratish','Fayl saqlash','Elektr bilan ta’minlash','Buyruqlarni bajarish'],answer:2,why:'PSU kompyuter qismlarini mos kuchlanishlar bilan ta’minlaydi.'}
];
export function checkPlacement(installed,id){return assemblyOrder[installed.length]===id;}
export function scoreAnswers(answers){return questions.reduce((s,q,i)=>s+(answers[i]===q.answer?1:0),0);}
