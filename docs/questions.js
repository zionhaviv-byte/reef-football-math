// Shared by the page and the Netlify function: same date -> same 5 questions.
// Grade 4 (כיתה ד'), word problems, football theme. Every day: fraction, 2 multiplication, geometry, 1 more.
// genDay(date, level): the level (1-4) sets how big the multiplication / division numbers are.

export const NAME = 'ריף';
export const TOTAL = 5;
export const POINTS_FIRST = 10, POINTS_SECOND = 5;

export const PLAYERS = {
  yamal:    { he: 'לאמין יאמל',     team: 'ברצלונה' },
  cubarsi:  { he: 'פאו קוברסי',     team: 'ברצלונה' },
  pedri:    { he: 'פדרי',           team: 'ברצלונה' },
  gavi:     { he: 'גאבי',           team: 'ברצלונה' },
  raphinha: { he: 'רפיניה',         team: 'ברצלונה' },
  olmo:     { he: 'דני אולמו',      team: 'ברצלונה' },
  messi:    { he: 'ליונל מסי',      team: 'נבחרת ארגנטינה' },
  mbappe:   { he: 'קיליאן אמבפה',   team: 'נבחרת צרפת' },
  haaland:  { he: 'ארלינג הולאנד',  team: 'נבחרת נורווגיה' },
};
// Yamal and Cubarsí come up most (his favourites)
const PICKS = ['yamal','yamal','yamal','cubarsi','cubarsi','cubarsi','pedri','gavi','raphinha','olmo','messi','mbappe','haaland'];
const BARCA = ['yamal','yamal','cubarsi','cubarsi','pedri','gavi','raphinha','olmo'];

function seedOf(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function rng(seed){let a=seed;return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}

const N = x => `<span class="n">${x}</span>`;
const F = (a,b) => `<span class="fr" role="img" aria-label="${a} חלקי ${b}"><span>${a}</span><span>${b}</span></span>`;
const X = s => `<span class="x">${s}</span>`;
const P = k => `<b class="pl">${PLAYERS[k].he}</b>`;
const hours = h => h===1?'שעה':h===2?'שעתיים':`${N(h)} שעות`;

export function toPlain(html){
  return String(html)
    .replace(/<span class="fr"[^>]*><span>(\d+)<\/span><span>(\d+)<\/span><\/span>/g,'$1/$2')
    .replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
}

/* ---------- fractions ---------- */
function fracOf(g,p){
  const d=g.pick([2,3,4,5,6,8,10]), a=d===2?1:g.ri(1,d-1), k=g.ri(2,d>=8?6:12), T=d*k, part=k*a, fr=F(a,d);
  const html=g.pick([
    ()=>`${P(p)} בעט ${N(T)} בעיטות לשער באימון. ${fr} מהבעיטות נכנסו לרשת. כמה בעיטות נכנסו לרשת?`,
    ()=>`במשחק של ברצלונה ${P(p)} מסר ${N(T)} מסירות. ${fr} מהמסירות היו מסירות קדימה. כמה מסירות קדימה הוא מסר?`,
    ()=>`באימון של ${P(p)} היו ${N(T)} כדורים. ${fr} מהכדורים היו צהובים. כמה כדורים צהובים היו באימון?`,
    ()=>`בלה מאסיה, בית הספר לכדורגל של ברצלונה, מתאמנים ${N(T)} ילדים. ${fr} מהם בני 10. כמה ילדים בני 10 מתאמנים שם?`
  ])();
  return {cat:'שברים',html,answer:part,ans:N(part),
    hint:`קודם מחלקים את ${N(T)} ל-${N(d)} חלקים שווים: ${X(`${T} ÷ ${d} = ${k}`)}. `+(a>1?`ואז לוקחים ${N(a)} חלקים: ${X(`${k} × ${a}`)}.`:`לוקחים חלק אחד, אז זו התשובה.`)};
}
function fracAdd(g,p){
  const d=g.pick([5,6,7,8,9,10,12]), a=g.ri(1,d-2), b=g.ri(1,d-1-a), s=a+b;
  const html=g.pick([
    ()=>`${P(p)} שתה ${F(a,d)} מבקבוק המים במחצית הראשונה, ועוד ${F(b,d)} מהבקבוק במחצית השנייה. איזה חלק מהבקבוק הוא שתה?`,
    ()=>`ביום ראשון ${NAME} צבע ${F(a,d)} מהציור של ${P(p)}, וביום שני עוד ${F(b,d)} מהציור. איזה חלק מהציור הוא צבע בסך הכול?`,
    ()=>`האוהדים של ברצלונה מילאו ${F(a,d)} מהיציע בשעה הראשונה, ועוד ${F(b,d)} מהיציע בשעה השנייה. איזה חלק מהיציע התמלא?`
  ])();
  return {cat:'שברים',html,answer:s/d,ans:F(s,d),
    hint:`כשהמכנים שווים, מחברים רק את המונים: ${X(`${a} + ${b} = ${s}`)}, והמכנה נשאר ${N(d)}. כותבים שבר עם הכפתור ⁄.`};
}
function fracSub(g,p){
  const d=g.pick([3,4,5,6,8,10]), a=g.ri(1,d-1);
  const html=g.pick([
    ()=>`${P(p)} כבר סיים ${F(a,d)} מהאימון של היום. איזה חלק מהאימון נשאר לו?`,
    ()=>`${F(a,d)} מהכרטיסים למשחק של ברצלונה כבר נמכרו. איזה חלק מהכרטיסים עוד לא נמכר?`,
    ()=>`${NAME} כבר הדביק ${F(a,d)} מהמדבקות באלבום של ברצלונה. איזה חלק מהאלבום עוד ריק?`
  ])();
  return {cat:'שברים',html,answer:(d-a)/d,ans:F(d-a,d),
    hint:`השלם הוא ${F(d,d)}. מחסרים את המונים: ${X(`${d} − ${a} = ${d-a}`)}, והמכנה נשאר ${N(d)}. כותבים שבר עם הכפתור ⁄.`};
}
function fracRemain(g,p){
  const d=g.pick([3,4,5,6,8]), a=g.ri(1,d-1), k=g.ri(2,10), T=d*k, part=k*a;
  const html=g.pick([
    ()=>`ל${NAME} היו ${N(T)} ₪. הוא הוציא ${F(a,d)} מהכסף על כדור עם החתימה של ${P(p)}. כמה כסף נשאר לו?`,
    ()=>`ל${NAME} היו ${N(T)} מדבקות של שחקני ברצלונה. הוא נתן לחבר ${F(a,d)} מהמדבקות. כמה מדבקות נשארו לו?`,
    ()=>`בלה מאסיה יש ${N(T)} ילדים. ${F(a,d)} מהם שוערים, וכל השאר שחקני שדה. כמה שחקני שדה יש?`
  ])();
  return {cat:'שברים',html,answer:T-part,ans:N(T-part),
    hint:`שני שלבים. קודם מוצאים ${F(a,d)} מ-${N(T)}: ${X(`${T} ÷ ${d} × ${a} = ${part}`)}. ואז מחסרים: ${X(`${T} − ${part}`)}.`};
}

/* ---------- multiplication, by level ----------
   1 = לוח הכפל + כפל בעשרות שלמות            (כמו 7 × 8, 40 × 6)
   2 = דו-ספרתי × חד-ספרתי, × 10/20/30          (כמו 34 × 6, 23 × 20)
   3 = דו-ספרתי × דו-ספרתי קל, תלת-ספרתי × חד   (כמו 36 × 14, 245 × 3)
   4 = דו-ספרתי × דו-ספרתי מלא, תלת × חד גדול   (כמו 57 × 34, 678 × 7)
   Reef goes up a level after a week with 90% right (tools/poller.py). */
export const MAX_LEVEL = 4;
export const LEVEL_NAMES = {1:'לוח הכפל', 2:'דו-ספרתי כפול חד-ספרתי', 3:'דו-ספרתי כפול דו-ספרתי', 4:'כפל גדול'};

// a = how much in each one, b = how many
function mulStory(g,p,a,b){
  const small=[
    ()=>`${P(p)} כובש ${N(a)} שערים בכל אימון בעיטות. כמה שערים הוא כובש ב-${N(b)} אימונים?`,
    ()=>`בכל קבוצה במחנה הכדורגל יש ${N(a)} ילדים. כמה ילדים יש ב-${N(b)} קבוצות?`,
    ()=>`בכל חבילה יש ${N(a)} מדבקות של שחקני ברצלונה. ${NAME} קנה ${N(b)} חבילות. כמה מדבקות יש לו?`,
    ()=>`${P(p)} רץ ${N(a)} סיבובים מסביב למגרש בכל אימון. כמה סיבובים הוא רץ ב-${N(b)} אימונים?`
  ];
  const medium=[
    ()=>`בכל אוטובוס של אוהדי ברצלונה יש ${N(a)} אוהדים. למשחק נסעו ${N(b)} אוטובוסים מלאים. כמה אוהדים נסעו למשחק?`,
    ()=>`חולצה של ${P(p)} עולה ${N(a)} ₪. ${NAME} והחברים שלו קנו ${N(b)} חולצות. כמה הם שילמו בסך הכול?`,
    ()=>`${P(p)} מוסר ${N(a)} מסירות בכל משחק. כמה מסירות הוא מוסר ב-${N(b)} משחקים?`,
    ()=>`${P(p)} עושה ${N(a)} קפיצות בחבל בכל אימון. כמה קפיצות הוא עושה ב-${N(b)} אימונים?`,
    ()=>`באצטדיון יש ${N(b)} שורות, ובכל שורה ${N(a)} כיסאות. כמה כיסאות יש באצטדיון?`
  ];
  const big=[
    ()=>`בכל יציע באצטדיון של ברצלונה יש ${N(a)} מושבים. כמה מושבים יש ב-${N(b)} יציעים?`,
    ()=>`בחנות של ברצלונה מוכרים ${N(a)} חולצות של ${P(p)} בכל יום. כמה חולצות נמכרו ב-${N(b)} ימים?`
  ];
  const html=g.pick(a<=10?small:a<100?medium:big)();
  return {cat:'כפל',html,answer:a*b,ans:N(a*b),hint:mulHint(a,b)};
}
function mulHint(a,b){
  if(a<=10&&b<=10) return `זה מלוח הכפל: ${X(`${a} × ${b}`)}. אם לא זוכרים, מתחילים ממשהו שזוכרים, כמו ${X(`${a} × 5 = ${a*5}`)}, ומוסיפים או מורידים ${N(a)} כל פעם.`;
  if(b<=10&&a%10===0&&a<100) return `${X(`${a/10} × ${b} = ${a/10*b}`)}, ומוסיפים אפס בסוף.`;
  if(b<=10){const u=a>=100?100:10, hi=a-a%u, lo=a%u;
    return lo?`מפרקים את ${N(a)}: ${X(`${hi} × ${b} = ${hi*b}`)} ועוד ${X(`${lo} × ${b} = ${lo*b}`)}. עכשיו מחברים את שתי התוצאות.`
             :`${X(`${a/u} × ${b} = ${a/u*b}`)}, ומוסיפים ${u===100?'שני אפסים':'אפס'} בסוף.`;}
  if(b%10===0) return `${X(`${a} × ${b}`)} זה כמו ${X(`${a} × ${b/10} = ${a*b/10}`)}, ואז מוסיפים אפס בסוף.`;
  const bt=b-b%10, bo=b%10;
  return `מפרקים את ${N(b)} ל-${N(bt)} ועוד ${N(bo)}: ${X(`${a} × ${bt} = ${a*bt}`)} ועוד ${X(`${a} × ${bo} = ${a*bo}`)}. מחברים.`;
}
function mul1(g,p){
  const L=g.lvl;
  if(L===1) return mulStory(g,p,g.ri(3,10),g.ri(3,10));
  if(L===2) return mulStory(g,p,g.ri(12,49),g.ri(3,9));
  if(L===3) return g.ri(0,2)===0?mulStory(g,p,g.ri(105,450),g.ri(2,6)):mulStory(g,p,g.ri(13,96),g.ri(3,9));
  return mulStory(g,p,g.ri(120,899),g.ri(3,9));
}
// level 1 mixes both kinds (Zion, 16.11.26: "גם וגם, לא רק לוח הכפל"): mul1 = the table, mul2 = something bigger
function mul2(g,p){
  const L=g.lvl;
  if(L===1) return g.ri(0,1)===0?mulStory(g,p,g.ri(2,9)*10,g.ri(2,9)):mulStory(g,p,g.ri(12,29),g.ri(2,5));
  if(L===2) return g.ri(0,1)===0?mulStory(g,p,g.ri(12,48),g.pick([10,20,30])):mulStory(g,p,g.ri(101,250),g.ri(2,4));
  if(L===3) return mulStory(g,p,g.ri(12,48),g.pick([20,30,40,50,11,12,13,14,15]));
  return mulStory(g,p,g.ri(21,79),g.ri(21,49));
}
function area(g,p){
  const L=g.lvl;
  let w,h;
  if(L===1){w=g.ri(5,10);h=g.ri(3,w-1);}
  else if(L===2){w=g.pick([10,20,30]);h=g.ri(4,12);}
  else if(L===3){w=g.pick([20,30,40,50]);h=g.ri(11,25);}
  else {w=g.ri(21,45);h=g.ri(12,w-3);}
  const html=g.pick(L===1?[
    ()=>`בחצר של ${NAME} יש מגרש מיני בצורת מלבן, באורך ${N(w)} מטר וברוחב ${N(h)} מטר. מה השטח של המגרש במטרים רבועים?`,
    ()=>`השטיח בחדר של ${NAME} מעוצב כמו מגרש כדורגל. הוא מלבן באורך ${N(w)} מטר וברוחב ${N(h)} מטר. מה השטח של השטיח במטרים רבועים?`
  ]:[
    ()=>`מגרש אימון קטן של ברצלונה בצורת מלבן, באורך ${N(w)} מטר וברוחב ${N(h)} מטר. מה השטח של המגרש במטרים רבועים?`,
    ()=>`פוסטר של ${P(p)} בצורת מלבן, באורך ${N(w)} סנטימטר וברוחב ${N(h)} סנטימטר. מה השטח של הפוסטר בסנטימטרים רבועים?`
  ])();
  return {cat:'הנדסה · שטח',html,answer:w*h,ans:N(w*h),fig:figRect(w,h),hint:`שטח של מלבן = אורך × רוחב. `+mulHint(w,h)};
}

/* ---------- geometry (הנדסה), grade 4: rectangle & square, triangles, boxes, polygons ---------- */
const FIG = (vb, body) => `<svg class="fig" viewBox="${vb}" role="img" aria-hidden="true" font-family="Fredoka, Rubik, sans-serif" font-weight="600">${body}</svg>`;
const LBL = (x,y,t,anchor='middle') => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="20" fill="var(--blau)" direction="ltr">${t}</text>`;
function figRect(w,h,lw=w,lh=h){
  const W=190, H=Math.max(56,Math.min(130,Math.round(190*h/w)));
  return FIG(`0 0 260 ${H+46}`,
    `<rect x="40" y="8" width="${W}" height="${H}" rx="3" fill="var(--pitch)" stroke="#fff" stroke-width="3"/>`+
    `<line x1="${40+W/2}" y1="8" x2="${40+W/2}" y2="${8+H}" stroke="#fff" stroke-width="2" opacity=".7"/>`+
    `<circle cx="${40+W/2}" cy="${8+H/2}" r="${Math.min(18,H/3)}" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>`+
    LBL(40+W/2, H+36, lw)+LBL(30, 8+H/2+7, lh, 'end'));
}
function figSquare(l){ return FIG('0 0 220 170',
  `<rect x="60" y="8" width="130" height="130" rx="3" fill="var(--pitch)" stroke="#fff" stroke-width="3"/>`+LBL(125,162,l)+LBL(50,80,l,'end')); }
function figTri(lb,lr,ll){ return FIG('0 0 240 190',
  `<polygon points="120,10 215,160 25,160" fill="var(--gold)" stroke="var(--night)" stroke-width="3" stroke-linejoin="round"/>`+
  LBL(120,184,lb)+LBL(186,82,lr,'start')+LBL(54,82,ll,'end')); }
function figBox(a,b,c){ return FIG('0 0 260 190',
  `<polygon points="30,70 170,70 170,170 30,170" fill="#C9A26B" stroke="var(--night)" stroke-width="3" stroke-linejoin="round"/>`+
  `<polygon points="30,70 80,30 220,30 170,70" fill="#E2C08D" stroke="var(--night)" stroke-width="3" stroke-linejoin="round"/>`+
  `<polygon points="170,70 220,30 220,130 170,170" fill="#A9824F" stroke="var(--night)" stroke-width="3" stroke-linejoin="round"/>`+
  (a?LBL(100,188,a):'')+(b?LBL(206,166,b,'start'):'')+(c?LBL(22,126,c,'end'):'')); }

function rectPerim(g,p){
  const L=g.lvl, w=L===1?g.ri(5,12):L===2?g.ri(4,10)*5:g.ri(4,10)*10, h=L===1?g.ri(2,w-2):L===2?g.ri(2,w/5-1)*5:g.ri(2,w/10-1)*10;
  const html=g.pick([
    ()=>`${P(p)} רץ סיבוב אחד מסביב למגרש אימון בצורת מלבן, באורך ${N(w)} מטר וברוחב ${N(h)} מטר. כמה מטרים הוא רץ?`,
    ()=>`${NAME} רוצה לצבוע קו לבן מסביב למגרש קטן בצורת מלבן, באורך ${N(w)} מטר וברוחב ${N(h)} מטר. כמה מטרים של קו הוא צריך לצבוע?`
  ])();
  return {cat:'הנדסה · היקף',html,answer:2*(w+h),ans:N(2*(w+h)),fig:figRect(w,h),
    hint:`היקף זה סכום כל ארבע הצלעות: ${X(`${w} + ${h} + ${w} + ${h}`)}. או: ${X(`(${w} + ${h}) × 2`)}.`};
}
function square(g,p){
  const L=g.lvl, s=L===1?g.ri(3,10):g.ri(6,25), v=g.ri(0,2);
  if(v===0) return {cat:'הנדסה · ריבוע',html:`בחדר הכושר של ברצלונה יש מזרן בצורת ריבוע, וכל צלע שלו ${N(s)} מטר. מה ההיקף של המזרן?`,answer:4*s,ans:N(4*s),fig:figSquare(s),
    hint:`בריבוע כל 4 הצלעות שוות. ההיקף: ${X(`${s} × 4`)}.`};
  if(v===1) return {cat:'הנדסה · ריבוע',html:`${P(p)} רץ מסביב לריבוע שסימן המאמן על הדשא. ההיקף של הריבוע ${N(4*s)} מטר. מה האורך של כל צלע?`,answer:s,ans:N(s),fig:figSquare('?'),
    hint:`בריבוע יש 4 צלעות שוות, אז מחלקים את ההיקף ל-4: ${X(`${4*s} ÷ 4`)}.`};
  return {cat:'הנדסה · ריבוע',html:`על הדשא סימנו ריבוע לתרגיל מסירות, וכל צלע שלו ${N(s)} מטר. מה השטח של הריבוע במטרים רבועים?`,answer:s*s,ans:N(s*s),fig:figSquare(s),
    hint:`שטח של ריבוע = צלע × צלע: ${X(`${s} × ${s}`)}.`};
}
function missingSide(g,p){
  const L=g.lvl, w=L===1?g.ri(3,10):g.ri(6,12), h=L===1?g.ri(2,9):g.ri(4,15), A=w*h;
  return {cat:'הנדסה · שטח',html:`השטח של מגרש מיני בצורת מלבן הוא ${N(A)} מטרים רבועים. האורך שלו ${N(w)} מטר. מה הרוחב שלו?`,answer:h,ans:N(h),fig:figRect(w,h,w,'?'),
    hint:`שטח = אורך × רוחב, אז שואלים: ${N(w)} כפול כמה זה ${N(A)}? כלומר ${X(`${A} ÷ ${w}`)}.`};
}
function triangle(g,p){
  const v=g.ri(0,2), s=g.ri(3,15), b=g.ri(3,12);
  if(v===0) return {cat:'הנדסה · משולש',html:`דגלון פינה בצורת משולש שווה צלעות. כל צלע ${N(s)} סנטימטר. מה ההיקף של הדגלון?`,answer:3*s,ans:N(3*s),fig:figTri(s,s,s),
    hint:`במשולש שווה צלעות כל 3 הצלעות שוות: ${X(`${s} × 3`)}.`};
  if(v===1) return {cat:'הנדסה · משולש',html:`למשולש שווה צלעות יש היקף של ${N(3*s)} סנטימטר. מה האורך של כל צלע?`,answer:s,ans:N(s),fig:figTri('?','?','?'),
    hint:`3 צלעות שוות, אז מחלקים את ההיקף ל-3: ${X(`${3*s} ÷ 3`)}.`};
  return {cat:'הנדסה · משולש',html:`${P(p)} צייר משולש שווה שוקיים. כל שוק ${N(s)} סנטימטר, והבסיס ${N(b)} סנטימטר. מה ההיקף של המשולש?`,answer:2*s+b,ans:N(2*s+b),fig:figTri(b,s,s),
    hint:`במשולש שווה שוקיים שתי השוקיים שוות: ${X(`${s} + ${s} + ${b}`)}.`};
}
function box(g,p){
  const L=g.lvl, v=g.ri(0,2);
  if(v===0){const n=g.ri(2,L===1?5:9), part=g.pick([['פאות',6,'פאה'],['מקצועות',12,'מקצוע'],['קודקודים',8,'קודקוד']]);
    return {cat:'הנדסה · תיבה',html:`הנעליים החדשות של ${P(p)} הגיעו בקופסה בצורת תיבה. במחסן יש ${N(n)} קופסאות כאלה. כמה ${part[0]} יש לכל הקופסאות ביחד?`,answer:n*part[1],ans:N(n*part[1]),fig:figBox('','',''),
      hint:`לכל תיבה יש ${N(6)} פאות, ${N(12)} מקצועות ו-${N(8)} קודקודים. לקופסה אחת יש ${N(part[1])} ${part[0]}, אז: ${X(`${part[1]} × ${n}`)}.`};}
  const a=g.ri(2,L===1?5:8), b=g.ri(2,L===1?4:6), c=g.ri(2,L===1?3:5);
  if(v===1) return {cat:'הנדסה · נפח',html:`ארגז כדורים בצורת תיבה מלא בקוביות קטנות. לאורך יש ${N(a)} קוביות, לרוחב ${N(b)} קוביות ולגובה ${N(c)} קוביות. כמה קוביות יש בארגז?`,answer:a*b*c,ans:N(a*b*c),fig:figBox(a,b,c),
    hint:`בשכבה אחת יש ${X(`${a} × ${b} = ${a*b}`)} קוביות. יש ${N(c)} שכבות: ${X(`${a*b} × ${c}`)}.`};
  return {cat:'הנדסה · תיבה',html:`ל${NAME} יש קופסה בצורת תיבה לאוסף המדבקות. האורך שלה ${N(a)} סנטימטר, הרוחב ${N(b)} סנטימטר והגובה ${N(c)} סנטימטר. מה הסכום של האורכים של כל 12 המקצועות?`,answer:4*(a+b+c),ans:N(4*(a+b+c)),fig:figBox(a,b,c),
    hint:`בתיבה יש 4 מקצועות לאורך, 4 לרוחב ו-4 לגובה: ${X(`(${a} + ${b} + ${c}) × 4`)}.`};
}
function polygons(g,p){
  const v=g.ri(0,2);
  if(v===0){const n=g.ri(2,9);
    return {cat:'הנדסה · מצולעים',html:`על כדור הכדורגל הקלאסי יש מחומשים שחורים ומשושים לבנים. כמה צלעות יש בסך הכול ל-${N(n)} משושים?`,answer:6*n,ans:N(6*n),
      hint:`למשושה יש ${N(6)} צלעות: ${X(`6 × ${n}`)}.`};}
  if(v===1){const n=g.ri(2,12);
    return {cat:'הנדסה · מצולעים',html:`${NAME} צייר ${N(n)} מחומשים, כמו הכתמים השחורים על כדור כדורגל. כמה צלעות יש לכל המחומשים ביחד?`,answer:5*n,ans:N(5*n),
      hint:`למחומש יש ${N(5)} צלעות: ${X(`5 × ${n}`)}.`};}
  const n=g.ri(2,9);
  return {cat:'הנדסה · מלבן',html:`על הדשא סימנו ${N(n)} מגרשים קטנים בצורת מלבן. כמה זוויות ישרות יש בכל המלבנים ביחד?`,answer:4*n,ans:N(4*n),fig:figRect(3,2,'',''),
    hint:`לכל מלבן יש ${N(4)} זוויות ישרות: ${X(`4 × ${n}`)}.`};
}

/* ---------- other ---------- */
function div(g,p){
  const L=g.lvl;
  const k=L===1?g.ri(2,9):L===2?g.ri(2,5):g.ri(3,9);
  const q=L===1?g.ri(2,10):L===2?g.ri(11,20):L===3?g.ri(12,28):g.ri(21,99);
  const T=k*q;
  const html=g.pick([
    ()=>`${NAME} אסף ${N(T)} מדבקות של שחקני ברצלונה, וחילק אותן שווה בשווה ל-${N(k)} עמודים באלבום. כמה מדבקות יש בכל עמוד?`,
    ()=>`${N(T)} ילדים הגיעו למחנה כדורגל, וחילקו אותם ל-${N(k)} קבוצות שוות. כמה ילדים יש בכל קבוצה?`,
    ()=>`${P(p)} כבש ${N(T)} שערים ב-${N(k)} עונות, אותו מספר שערים בכל עונה. כמה שערים הוא כבש בכל עונה?`
  ])();
  const hint=q<=10?`${X(`${T} ÷ ${k}`)}. שואלים: איזה מספר כפול ${N(k)} נותן ${N(T)}? זה מלוח הכפל.`
                  :`${X(`${T} ÷ ${k}`)}. שואלים: איזה מספר כפול ${N(k)} נותן ${N(T)}? אפשר להתחיל מ-${X(`10 × ${k} = ${10*k}`)}.`;
  return {cat:'חילוק',html,answer:q,ans:N(q),hint};
}
function multiStep(g,p){
  const L=g.lvl, v=g.ri(0,2);
  if(v===0){const n=g.ri(2,5),pr=L===1?g.ri(3,10):L===2?g.ri(11,25):g.ri(15,35),c=n*pr,pay=c<50?50:c<100?100:200;
    return {cat:'שני שלבים',html:`${NAME} קנה ${N(n)} כרטיסים למשחק של הפועל באר שבע, כל כרטיס ב-${N(pr)} ₪. הוא שילם בשטר של ${N(pay)} ₪. כמה עודף הוא קיבל?`,answer:pay-c,ans:N(pay-c),
      hint:`קודם מחשבים כמה עלו הכרטיסים: ${X(`${n} × ${pr} = ${c}`)}. ואז מחסרים: ${X(`${pay} − ${c}`)}.`};}
  if(v===1){const S=g.ri(120,600)*10,n=g.ri(3,8),m=L===1?g.ri(2,5)*10:L===2?g.ri(12,30):g.ri(42,58);
    return {cat:'שני שלבים',html:`באצטדיון ישבו ${N(S)} אוהדים. הגיעו עוד ${N(n)} אוטובוסים, ובכל אוטובוס ${N(m)} אוהדים. כמה אוהדים יש עכשיו באצטדיון?`,answer:S+n*m,ans:N(S+n*m),
      hint:`קודם מחשבים כמה אוהדים הגיעו באוטובוסים: ${X(`${n} × ${m} = ${n*m}`)}. ואז מחברים: ${X(`${S} + ${n*m}`)}.`};}
  const s=L===1?g.ri(4,10):L===2?g.ri(10,20):g.ri(10,30),n=g.ri(4,9),c=g.ri(Math.max(5,Math.floor(s*n/4)),s*n-3);
  return {cat:'שני שלבים',html:`${NAME} חוסך ${N(s)} ₪ בכל שבוע. אחרי ${N(n)} שבועות הוא קנה חולצה של ${P(p)} ב-${N(c)} ₪. כמה כסף נשאר לו?`,answer:s*n-c,ans:N(s*n-c),
    hint:`קודם מחשבים כמה הוא חסך: ${X(`${s} × ${n} = ${s*n}`)}. ואז מחסרים: ${X(`${s*n} − ${c}`)}.`};
}
function time(g,p){
  const v=g.ri(0,2);
  if(v===0){const m=g.ri(12,64);
    return {cat:'זמן',html:`משחק כדורגל נמשך ${N(90)} דקות. ${P(p)} נכנס כמחליף ושיחק ${N(m)} דקות עד הסוף. כמה דקות הוא ישב על הספסל?`,answer:90-m,ans:N(90-m),
      hint:`מחסרים מכל המשחק את הזמן ששיחק: ${X(`90 − ${m}`)}.`};}
  if(v===1){const n=g.ri(3,8);
    return {cat:'זמן',html:`החודש ברצלונה שיחקה ${N(n)} משחקים, וכל משחק נמשך ${N(90)} דקות. כמה דקות כדורגל היא שיחקה החודש?`,answer:90*n,ans:N(90*n),
      hint:`${X(`90 × ${n}`)}. טיפ: ${X(`9 × ${n} = ${9*n}`)}, ומוסיפים אפס.`};}
  const h=g.ri(1,3), m=g.pick([10,15,20,25,30,40,45,50]);
  return {cat:'זמן',html:`${P(p)} התאמן ${hours(h)} ו-${N(m)} דקות. כמה דקות הוא התאמן בסך הכול?`,answer:h*60+m,ans:N(h*60+m),
    hint:`בכל שעה יש ${N(60)} דקות: ${X(`${h} × 60 = ${h*60}`)}. ועכשיו מוסיפים עוד ${N(m)} דקות.`};
}
export function genDay(key, level=1){
  const lvl=Math.min(MAX_LEVEL,Math.max(1,parseInt(level,10)||1));
  const r=rng(seedOf('reef-football-g4|'+key+'|L'+lvl));
  const g={lvl,ri:(a,b)=>a+Math.floor(r()*(b-a+1)),pick:arr=>arr[Math.floor(r()*arr.length)]};
  const shuffle=arr=>{const c=arr.slice();for(let i=c.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[c[i],c[j]]=[c[j],c[i]]}return c};
  // every day: a fraction, the multiplication table kind (mul1), a bigger multiplication (mul2), a geometry
  // question, and one more: a second fraction (most days), division, two steps or time
  const fr=shuffle([fracOf,fracAdd,fracSub,fracRemain]);
  const geo=g.pick([area,rectPerim,square,missingSide,triangle,box,box,polygons]);
  const extra=g.pick([fr[1],fr[1],div,multiStep,time]);
  const used=new Set();
  return shuffle([fr[0],mul1,mul2,geo,extra]).map(f=>{
    // a different player for each question when possible
    let p; for(let t=0;t<6;t++){p=g.pick(f===fracOf||f===mul1?BARCA:PICKS); if(!used.has(p)) break}
    used.add(p);
    const q=f(g,p); q.player=p; return q;
  });
}

export function parseAnswer(s){
  s=String(s||'').trim();
  if(!/^\d{1,6}(\/\d{1,6})?$/.test(s)) return NaN;
  if(s.includes('/')){const [a,b]=s.split('/');return +b===0?NaN:+a/+b}
  return +s;
}
export function isRight(given,answer){const v=parseAnswer(given);return isFinite(v)&&Math.abs(v-answer)<1e-9}
export function pointsFor(r){return r&&r.ok?(r.tries===1?POINTS_FIRST:POINTS_SECOND):0}

// level in force on a date: levels = [{from:'YYYY-MM-DD', level}], sorted by from
export function levelFor(date, levels){
  let l=1; for(const x of (levels||[])) if(x.from<=date) l=x.level; return l;
}
