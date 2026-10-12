# EduSim 3D

Maktab informatika darslari uchun o‘zbekcha interaktiv kompyuter laboratoriyasi. React + Three.js + Vite; Vercel uchun tayyor.

## Ishga tushirish

```sh
npm ci
npm run dev
```

```sh
npm test
npm run build
```

## v0.1 imkoniyatlari

- Brauzerda haqiqiy WebGL 3D model: aylantirish, kattalashtirish, qismlarga ajratish va tanlash.
- Ona plata, CPU, RAM, SSD, GPU, PSU va sovutish tizimi haqida o‘zbekcha darslar.
- Ketma-ketlikni tekshiradigan virtual yig‘ish mashqi.
- 7 savolli test, izohlar va takroriy urinishlar.
- Shu brauzerdagi natijalar tarixi (localStorage). Server hisoblari yoki umumiy o‘qituvchi paneli hali mavjud emas.
- Moslashuvchan dizayn va klaviatura orqali komponent tanlash.

Model umumlashtirilgan o‘quv tasviri; aniq apparat soketlari, kabellar, termopasta va elektr ulanishlarini modellashtirmaydi. Yig‘ish bosqichlari pedagogik ketma-ketlikdir. Ma’lumot oqimi animatsiyasi soddalashtirilgan.

## Vercel

GitHub repozitoriyni import qiling. Framework: Vite; build: `npm run build`; output: `dist`. Asosiy branch: `main`. Boshlang‘ich versiya maxfiy kalit yoki pulli xizmat talab qilmaydi.

## Keyingi bosqichlar

1. O‘qituvchi va o‘quvchi hisoblari, sinflar, serverda natijalarni saqlash.
2. Komponentlarni mos slotga tortib joylashtirish va moslikni tekshirish.
3. Maktab o‘quv dasturiga mos darslar va o‘qituvchi tahrirlaydigan testlar.
4. GLB eksport, batafsil kabellar va komponentlar.
5. Haqiqiy sinfda tajriba: oldingi/keyingi test, foydalanish qulayligi va o‘zlashtirish tahlili.

Bu bosqichlar reja bo‘lib, v0.1 da bajarilgan funksiyalar hisoblanmaydi.
