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
// g.easy = the easier level 1 (Zion 16.11.26, after Reef's teacher said it is hard): one step only, small numbers
function fracOf(g,p){
  const d=g.tiny?g.pick([2,3,4]):g.easy?g.pick([2,3,4,5]):g.pick([2,3,4,5,6,8,10]), a=d===2||g.easy?1:g.ri(1,d-1), k=g.tiny?g.ri(2,5):g.easy?g.ri(2,10):g.ri(2,d>=8?6:12), T=d*k, part=k*a, fr=F(a,d);
  const html=g.pick([
    ()=>`${P(p)} בעט ${N(T)} בעיטות לשער באימון. ${fr} מהבעיטות נכנסו לרשת. כמה בעיטות נכנסו לרשת?`,
    ()=>`במשחק של ברצלונה ${P(p)} מסר ${N(T)} מסירות. ${fr} מהמסירות היו מסירות קדימה. כמה מסירות קדימה הוא מסר?`,
    ()=>`באימון של ${P(p)} היו ${N(T)} כדורים. ${fr} מהכדורים היו צהובים. כמה כדורים צהובים היו באימון?`,
    ()=>`בלה מאסיה, בית הספר לכדורגל של ברצלונה, מתאמנים ${N(T)} ילדים. ${fr} מהם בני 10. כמה ילדים בני 10 מתאמנים שם?`
  ])();
  return {cat:'שברים',html,answer:part,ans:N(part),t:{kind:'fracOf',T,d,a,each:k,part},
    hint:`קודם מחלקים את ${N(T)} ל-${N(d)} חלקים שווים: ${X(`${T} ÷ ${d} = ${k}`)}. `+(a>1?`ואז לוקחים ${N(a)} חלקים: ${X(`${k} × ${a}`)}.`:`לוקחים חלק אחד, אז זו התשובה.`)};
}
function fracAdd(g,p){
  const d=g.tiny?g.pick([3,4,5]):g.easy?g.pick([3,4,5,6]):g.pick([5,6,7,8,9,10,12]), a=g.ri(1,d-2), b=g.ri(1,d-1-a), s=a+b;
  const html=g.pick([
    ()=>`${P(p)} שתה ${F(a,d)} מבקבוק המים במחצית הראשונה, ועוד ${F(b,d)} מהבקבוק במחצית השנייה. איזה חלק מהבקבוק הוא שתה?`,
    ()=>`ביום ראשון ${NAME} צבע ${F(a,d)} מהציור של ${P(p)}, וביום שני עוד ${F(b,d)} מהציור. איזה חלק מהציור הוא צבע בסך הכול?`,
    ()=>`האוהדים של ברצלונה מילאו ${F(a,d)} מהיציע בשעה הראשונה, ועוד ${F(b,d)} מהיציע בשעה השנייה. איזה חלק מהיציע התמלא?`
  ])();
  return {cat:'שברים',html,answer:s/d,ans:F(s,d),t:{kind:'fracAdd',a,b,d,s},
    hint:`כשהמכנים שווים, מחברים רק את המונים: ${X(`${a} + ${b} = ${s}`)}, והמכנה נשאר ${N(d)}. כותבים שבר עם הכפתור ⁄.`};
}
function fracSub(g,p){
  const d=g.tiny?g.pick([2,3,4]):g.easy?g.pick([2,3,4,5]):g.pick([3,4,5,6,8,10]), a=g.ri(1,d-1);
  const html=g.pick([
    ()=>`${P(p)} כבר סיים ${F(a,d)} מהאימון של היום. איזה חלק מהאימון נשאר לו?`,
    ()=>`${F(a,d)} מהכרטיסים למשחק של ברצלונה כבר נמכרו. איזה חלק מהכרטיסים עוד לא נמכר?`,
    ()=>`${NAME} כבר הדביק ${F(a,d)} מהמדבקות באלבום של ברצלונה. איזה חלק מהאלבום עוד ריק?`
  ])();
  return {cat:'שברים',html,answer:(d-a)/d,ans:F(d-a,d),t:{kind:'fracSub',a,d},
    hint:`השלם הוא ${F(d,d)}. מחסרים את המונים: ${X(`${d} − ${a} = ${d-a}`)}, והמכנה נשאר ${N(d)}. כותבים שבר עם הכפתור ⁄.`};
}
function fracRemain(g,p){
  const d=g.pick([3,4,5,6,8]), a=g.ri(1,d-1), k=g.ri(2,10), T=d*k, part=k*a;
  const html=g.pick([
    ()=>`ל${NAME} היו ${N(T)} ₪. הוא הוציא ${F(a,d)} מהכסף על כדור עם החתימה של ${P(p)}. כמה כסף נשאר לו?`,
    ()=>`ל${NAME} היו ${N(T)} מדבקות של שחקני ברצלונה. הוא נתן לחבר ${F(a,d)} מהמדבקות. כמה מדבקות נשארו לו?`,
    ()=>`בלה מאסיה יש ${N(T)} ילדים. ${F(a,d)} מהם שוערים, וכל השאר שחקני שדה. כמה שחקני שדה יש?`
  ])();
  return {cat:'שברים',html,answer:T-part,ans:N(T-part),t:{kind:'fracRemain',T,d,a,each:k,part},
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
  return {cat:'כפל',html,answer:a*b,ans:N(a*b),hint:mulHint(a,b),t:{kind:'mul',a,b}};
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
  if(L===1&&g.tiny) return mulStory(g,p,g.ri(2,10),g.ri(2,5));
  if(L===1) return mulStory(g,p,g.ri(3,10),g.ri(3,10));
  if(L===2) return mulStory(g,p,g.ri(12,49),g.ri(3,9));
  if(L===3) return g.ri(0,2)===0?mulStory(g,p,g.ri(105,450),g.ri(2,6)):mulStory(g,p,g.ri(13,96),g.ri(3,9));
  return mulStory(g,p,g.ri(120,899),g.ri(3,9));
}
// level 1 mixes both kinds (Zion, 16.11.26: "גם וגם, לא רק לוח הכפל"): mul1 = the table, mul2 = something bigger
function mul2(g,p){
  const L=g.lvl;
  if(L===1&&g.tiny) return g.ri(0,1)===0?mulStory(g,p,g.ri(1,5)*10,g.ri(2,3)):mulStory(g,p,g.ri(11,15),2);
  if(L===1&&g.easy) return g.ri(0,1)===0?mulStory(g,p,g.ri(1,5)*10,g.ri(2,5)):mulStory(g,p,g.ri(11,20),g.ri(2,3));
  if(L===1) return g.ri(0,1)===0?mulStory(g,p,g.ri(2,9)*10,g.ri(2,9)):mulStory(g,p,g.ri(12,29),g.ri(2,5));
  if(L===2) return g.ri(0,1)===0?mulStory(g,p,g.ri(12,48),g.pick([10,20,30])):mulStory(g,p,g.ri(101,250),g.ri(2,4));
  if(L===3) return mulStory(g,p,g.ri(12,48),g.pick([20,30,40,50,11,12,13,14,15]));
  return mulStory(g,p,g.ri(21,79),g.ri(21,49));
}
function area(g,p){
  const L=g.lvl;
  let w,h;
  if(L===1&&g.tiny){w=g.ri(3,6);h=g.ri(2,Math.min(4,w-1));}
  else if(L===1&&g.easy){w=g.ri(3,9);h=g.ri(2,Math.min(5,w-1));}
  else if(L===1){w=g.ri(5,10);h=g.ri(3,w-1);}
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
  return {cat:'הנדסה · שטח',html,answer:w*h,ans:N(w*h),fig:figRect(w,h),t:{kind:'area',w,h},hint:`שטח של מלבן = אורך × רוחב. `+mulHint(w,h)};
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
  const L=g.lvl, w=L===1?g.ri(g.easy?3:5,g.tiny?7:g.easy?10:12):L===2?g.ri(4,10)*5:g.ri(4,10)*10, h=L===1?g.ri(2,w-2):L===2?g.ri(2,w/5-1)*5:g.ri(2,w/10-1)*10;
  const html=g.pick([
    ()=>`${P(p)} רץ סיבוב אחד מסביב למגרש אימון בצורת מלבן, באורך ${N(w)} מטר וברוחב ${N(h)} מטר. כמה מטרים הוא רץ?`,
    ()=>`${NAME} רוצה לצבוע קו לבן מסביב למגרש קטן בצורת מלבן, באורך ${N(w)} מטר וברוחב ${N(h)} מטר. כמה מטרים של קו הוא צריך לצבוע?`
  ])();
  return {cat:'הנדסה · היקף',html,answer:2*(w+h),ans:N(2*(w+h)),fig:figRect(w,h),t:{kind:'perim',w,h},
    hint:`היקף זה סכום כל ארבע הצלעות: ${X(`${w} + ${h} + ${w} + ${h}`)}. או: ${X(`(${w} + ${h}) × 2`)}.`};
}
function square(g,p){
  const L=g.lvl, s=L===1?(g.tiny?g.ri(2,6):g.ri(3,10)):g.ri(6,25), v=g.ri(0,2);
  if(v===0) return {cat:'הנדסה · ריבוע',html:`בחדר הכושר של ברצלונה יש מזרן בצורת ריבוע, וכל צלע שלו ${N(s)} מטר. מה ההיקף של המזרן?`,answer:4*s,ans:N(4*s),fig:figSquare(s),t:{kind:'sqPerim',s},
    hint:`בריבוע כל 4 הצלעות שוות. ההיקף: ${X(`${s} × 4`)}.`};
  if(v===1) return {cat:'הנדסה · ריבוע',html:`${P(p)} רץ מסביב לריבוע שסימן המאמן על הדשא. ההיקף של הריבוע ${N(4*s)} מטר. מה האורך של כל צלע?`,answer:s,ans:N(s),fig:figSquare('?'),t:{kind:'sqSide',s},
    hint:`בריבוע יש 4 צלעות שוות, אז מחלקים את ההיקף ל-4: ${X(`${4*s} ÷ 4`)}.`};
  return {cat:'הנדסה · ריבוע',html:`על הדשא סימנו ריבוע לתרגיל מסירות, וכל צלע שלו ${N(s)} מטר. מה השטח של הריבוע במטרים רבועים?`,answer:s*s,ans:N(s*s),fig:figSquare(s),t:{kind:'sqArea',s},
    hint:`שטח של ריבוע = צלע × צלע: ${X(`${s} × ${s}`)}.`};
}
function missingSide(g,p){
  const L=g.lvl, w=L===1?g.ri(3,10):g.ri(6,12), h=L===1?g.ri(2,9):g.ri(4,15), A=w*h;
  return {cat:'הנדסה · שטח',html:`השטח של מגרש מיני בצורת מלבן הוא ${N(A)} מטרים רבועים. האורך שלו ${N(w)} מטר. מה הרוחב שלו?`,answer:h,ans:N(h),fig:figRect(w,h,w,'?'),t:{kind:'missingSide',w,h,A},
    hint:`שטח = אורך × רוחב, אז שואלים: ${N(w)} כפול כמה זה ${N(A)}? כלומר ${X(`${A} ÷ ${w}`)}.`};
}
function triangle(g,p){
  const v=g.easy?g.pick([0,2]):g.ri(0,2), s=g.tiny?g.ri(2,6):g.easy?g.ri(2,10):g.ri(3,15), b=g.ri(g.tiny?2:3,g.tiny?6:g.easy?9:12);
  if(v===0) return {cat:'הנדסה · משולש',html:`דגלון פינה בצורת משולש שווה צלעות. כל צלע ${N(s)} סנטימטר. מה ההיקף של הדגלון?`,answer:3*s,ans:N(3*s),fig:figTri(s,s,s),t:{kind:'triEq',s},
    hint:`במשולש שווה צלעות כל 3 הצלעות שוות: ${X(`${s} × 3`)}.`};
  if(v===1) return {cat:'הנדסה · משולש',html:`למשולש שווה צלעות יש היקף של ${N(3*s)} סנטימטר. מה האורך של כל צלע?`,answer:s,ans:N(s),fig:figTri('?','?','?'),t:{kind:'triSide',s},
    hint:`3 צלעות שוות, אז מחלקים את ההיקף ל-3: ${X(`${3*s} ÷ 3`)}.`};
  return {cat:'הנדסה · משולש',html:`${P(p)} צייר משולש שווה שוקיים. כל שוק ${N(s)} סנטימטר, והבסיס ${N(b)} סנטימטר. מה ההיקף של המשולש?`,answer:2*s+b,ans:N(2*s+b),fig:figTri(b,s,s),t:{kind:'triIso',s,b},
    hint:`במשולש שווה שוקיים שתי השוקיים שוות: ${X(`${s} + ${s} + ${b}`)}.`};
}
function box(g,p){
  const L=g.lvl, v=g.easy?0:g.ri(0,2);   // easy: only how many faces / edges / vertices
  if(v===0){const n=g.ri(2,g.tiny?3:L===1?5:9), part=g.pick([['פאות',6,'פאה'],['מקצועות',12,'מקצוע'],['קודקודים',8,'קודקוד']]);
    return {cat:'הנדסה · תיבה',html:`הנעליים החדשות של ${P(p)} הגיעו בקופסה בצורת תיבה. במחסן יש ${N(n)} קופסאות כאלה. כמה ${part[0]} יש לכל הקופסאות ביחד?`,answer:n*part[1],ans:N(n*part[1]),fig:figBox('','',''),t:{kind:'boxCount',n,per:part[1],name:part[0],one:part[2]},
      hint:`לכל תיבה יש ${N(6)} פאות, ${N(12)} מקצועות ו-${N(8)} קודקודים. לקופסה אחת יש ${N(part[1])} ${part[0]}, אז: ${X(`${part[1]} × ${n}`)}.`};}
  const a=g.ri(2,L===1?5:8), b=g.ri(2,L===1?4:6), c=g.ri(2,L===1?3:5);
  if(v===1) return {cat:'הנדסה · נפח',html:`ארגז כדורים בצורת תיבה מלא בקוביות קטנות. לאורך יש ${N(a)} קוביות, לרוחב ${N(b)} קוביות ולגובה ${N(c)} קוביות. כמה קוביות יש בארגז?`,answer:a*b*c,ans:N(a*b*c),fig:figBox(a,b,c),t:{kind:'boxVol',a,b,c},
    hint:`בשכבה אחת יש ${X(`${a} × ${b} = ${a*b}`)} קוביות. יש ${N(c)} שכבות: ${X(`${a*b} × ${c}`)}.`};
  return {cat:'הנדסה · תיבה',html:`ל${NAME} יש קופסה בצורת תיבה לאוסף המדבקות. האורך שלה ${N(a)} סנטימטר, הרוחב ${N(b)} סנטימטר והגובה ${N(c)} סנטימטר. מה הסכום של האורכים של כל 12 המקצועות?`,answer:4*(a+b+c),ans:N(4*(a+b+c)),fig:figBox(a,b,c),t:{kind:'boxEdges',a,b,c},
    hint:`בתיבה יש 4 מקצועות לאורך, 4 לרוחב ו-4 לגובה: ${X(`(${a} + ${b} + ${c}) × 4`)}.`};
}
function polygons(g,p){
  const v=g.ri(0,2);
  if(v===0){const n=g.ri(2,g.tiny?4:9);
    return {cat:'הנדסה · מצולעים',html:`על כדור הכדורגל הקלאסי יש מחומשים שחורים ומשושים לבנים. כמה צלעות יש בסך הכול ל-${N(n)} משושים?`,answer:6*n,ans:N(6*n),t:{kind:'poly',n,per:6,one:'משושה',what:'צלעות'},
      hint:`למשושה יש ${N(6)} צלעות: ${X(`6 × ${n}`)}.`};}
  if(v===1){const n=g.ri(2,g.tiny?4:12);
    return {cat:'הנדסה · מצולעים',html:`${NAME} צייר ${N(n)} מחומשים, כמו הכתמים השחורים על כדור כדורגל. כמה צלעות יש לכל המחומשים ביחד?`,answer:5*n,ans:N(5*n),t:{kind:'poly',n,per:5,one:'מחומש',what:'צלעות'},
      hint:`למחומש יש ${N(5)} צלעות: ${X(`5 × ${n}`)}.`};}
  const n=g.ri(2,g.tiny?4:9);
  return {cat:'הנדסה · מלבן',html:`על הדשא סימנו ${N(n)} מגרשים קטנים בצורת מלבן. כמה זוויות ישרות יש בכל המלבנים ביחד?`,answer:4*n,ans:N(4*n),fig:figRect(3,2,'',''),t:{kind:'poly',n,per:4,one:'מלבן',what:'זוויות ישרות'},
    hint:`לכל מלבן יש ${N(4)} זוויות ישרות: ${X(`4 × ${n}`)}.`};
}

/* ---------- other ---------- */
function div(g,p){
  const L=g.lvl;
  const k=L===1&&g.tiny?g.ri(2,5):L===1?g.ri(2,9):L===2?g.ri(2,5):g.ri(3,9);
  const q=L===1&&g.tiny?g.ri(2,5):L===1?g.ri(2,10):L===2?g.ri(11,20):L===3?g.ri(12,28):g.ri(21,99);
  const T=k*q;
  const html=g.pick([
    ()=>`${NAME} אסף ${N(T)} מדבקות של שחקני ברצלונה, וחילק אותן שווה בשווה ל-${N(k)} עמודים באלבום. כמה מדבקות יש בכל עמוד?`,
    ()=>`${N(T)} ילדים הגיעו למחנה כדורגל, וחילקו אותם ל-${N(k)} קבוצות שוות. כמה ילדים יש בכל קבוצה?`,
    ()=>`${P(p)} כבש ${N(T)} שערים ב-${N(k)} עונות, אותו מספר שערים בכל עונה. כמה שערים הוא כבש בכל עונה?`
  ])();
  const hint=q<=10?`${X(`${T} ÷ ${k}`)}. שואלים: איזה מספר כפול ${N(k)} נותן ${N(T)}? זה מלוח הכפל.`
                  :`${X(`${T} ÷ ${k}`)}. שואלים: איזה מספר כפול ${N(k)} נותן ${N(T)}? אפשר להתחיל מ-${X(`10 × ${k} = ${10*k}`)}.`;
  return {cat:'חילוק',html,answer:q,ans:N(q),hint,t:{kind:'div',T,k,q}};
}
function multiStep(g,p){
  const L=g.lvl, v=g.ri(0,2);
  if(v===0){const n=g.ri(2,5),pr=L===1?g.ri(3,10):L===2?g.ri(11,25):g.ri(15,35),c=n*pr,pay=c<50?50:c<100?100:200;
    return {cat:'שני שלבים',html:`${NAME} קנה ${N(n)} כרטיסים למשחק של הפועל באר שבע, כל כרטיס ב-${N(pr)} ₪. הוא שילם בשטר של ${N(pay)} ₪. כמה עודף הוא קיבל?`,answer:pay-c,ans:N(pay-c),t:{kind:'change',n,pr,c,pay},
      hint:`קודם מחשבים כמה עלו הכרטיסים: ${X(`${n} × ${pr} = ${c}`)}. ואז מחסרים: ${X(`${pay} − ${c}`)}.`};}
  if(v===1){const S=g.ri(120,600)*10,n=g.ri(3,8),m=L===1?g.ri(2,5)*10:L===2?g.ri(12,30):g.ri(42,58);
    return {cat:'שני שלבים',html:`באצטדיון ישבו ${N(S)} אוהדים. הגיעו עוד ${N(n)} אוטובוסים, ובכל אוטובוס ${N(m)} אוהדים. כמה אוהדים יש עכשיו באצטדיון?`,answer:S+n*m,ans:N(S+n*m),t:{kind:'fans',S,n,m},
      hint:`קודם מחשבים כמה אוהדים הגיעו באוטובוסים: ${X(`${n} × ${m} = ${n*m}`)}. ואז מחברים: ${X(`${S} + ${n*m}`)}.`};}
  const s=L===1?g.ri(4,10):L===2?g.ri(10,20):g.ri(10,30),n=g.ri(4,9),c=g.ri(Math.max(5,Math.floor(s*n/4)),s*n-3);
  return {cat:'שני שלבים',html:`${NAME} חוסך ${N(s)} ₪ בכל שבוע. אחרי ${N(n)} שבועות הוא קנה חולצה של ${P(p)} ב-${N(c)} ₪. כמה כסף נשאר לו?`,answer:s*n-c,ans:N(s*n-c),t:{kind:'save',s,n,c},
    hint:`קודם מחשבים כמה הוא חסך: ${X(`${s} × ${n} = ${s*n}`)}. ואז מחסרים: ${X(`${s*n} − ${c}`)}.`};
}
function time(g,p){
  const v=g.ri(0,2);
  if(v===0){const m=g.tiny?g.ri(1,6)*10:g.ri(12,64);
    return {cat:'זמן',html:`משחק כדורגל נמשך ${N(90)} דקות. ${P(p)} נכנס כמחליף ושיחק ${N(m)} דקות עד הסוף. כמה דקות הוא ישב על הספסל?`,answer:90-m,ans:N(90-m),t:{kind:'bench',m},
      hint:`מחסרים מכל המשחק את הזמן ששיחק: ${X(`90 − ${m}`)}.`};}
  if(v===1){const n=g.tiny?g.ri(2,3):g.easy?g.ri(2,4):g.ri(3,8);
    return {cat:'זמן',html:`החודש ברצלונה שיחקה ${N(n)} משחקים, וכל משחק נמשך ${N(90)} דקות. כמה דקות כדורגל היא שיחקה החודש?`,answer:90*n,ans:N(90*n),t:{kind:'games',n},
      hint:`${X(`90 × ${n}`)}. טיפ: ${X(`9 × ${n} = ${9*n}`)}, ומוסיפים אפס.`};}
  const h=g.tiny?1:g.ri(1,3), m=g.pick(g.tiny?[10,15,20,30]:[10,15,20,25,30,40,45,50]);
  return {cat:'זמן',html:`${P(p)} התאמן ${hours(h)} ו-${N(m)} דקות. כמה דקות הוא התאמן בסך הכול?`,answer:h*60+m,ans:N(h*60+m),t:{kind:'hm',h,m},
    hint:`בכל שעה יש ${N(60)} דקות: ${X(`${h} × 60 = ${h*60}`)}. ועכשיו מוסיפים עוד ${N(m)} דקות.`};
}
/* ---------- teaching (Zion 16.11.26: "שהוא גם ילמד ולא רק ינסה לפתור"): every question gets
   pic   = a drawing of ITS numbers (+ a short caption), opened with a button, never costs points
   steps = solving it together, one small question at a time (after a miss); the last step = the answer
   and genTwin() = a twin question of the same kind with other numbers (after a miss), worth TWIN_BONUS.
   Built only from the numbers already chosen (q.t): no new random draws, so the questions stay the same. */
const PIC = (h, body) => `<svg class="pic" viewBox="0 0 300 ${h}" role="img" aria-hidden="true" font-family="Fredoka, Rubik, sans-serif" font-weight="600">${body}</svg>`;
const TX = (x,y,t,size=18,fill='var(--night)',anchor='middle') => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" fill="${fill}" direction="ltr">${t}</text>`;
const DOT = (x,y,r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="var(--night)" stroke-width="1.6"/>`;
// a bar cut into d equal parts; marks colour the first parts in order; top = the whole amount
function picBar(d, marks, top){
  const W=270, x0=15, y0=top?36:8, cw=W/d, H=46;
  let body=top?TX(150,20,top,20,'var(--blau)')+`<path d="M${x0} 31 v-6 H${x0+W} v6" fill="none" stroke="var(--blau)" stroke-width="2"/>`:'';
  let i=0;
  for(const m of marks) for(let j=0;j<m.n;j++,i++) body+=`<rect x="${x0+i*cw}" y="${y0}" width="${cw}" height="${H}" fill="${m.fill}"/>`;
  for(let j=0;j<d;j++) body+=`<rect x="${x0+j*cw}" y="${y0}" width="${cw}" height="${H}" fill="none" stroke="var(--night)" stroke-width="2"/>`;
  return PIC(y0+H+8,body);
}
function picDots(a,b){   // b rows of a balls (the times table)
  const s=Math.min(24,250/a), r=s*0.36, rowH=s+6, x0=150-a*s/2;
  let body='';
  for(let i=0;i<b;i++){const y=6+i*rowH;
    body+=`<rect x="${x0-6}" y="${y}" width="${a*s+12}" height="${s}" rx="${s/2}" fill="var(--pitch)" opacity=".2"/>`;
    for(let j=0;j<a;j++) body+=DOT(x0+s/2+j*s,y+s/2,r);}
  return PIC(b*rowH+8,body);
}
function picBoxes(a,b){  // b boxes with a in each
  const per=Math.min(b,5), rows=Math.ceil(b/5), bw=52, gap=6, x0=150-(per*bw+(per-1)*gap)/2;
  let body='';
  for(let i=0;i<b;i++){const x=x0+(i%5)*(bw+gap), y=6+Math.floor(i/5)*58;
    body+=`<rect x="${x}" y="${y}" width="${bw}" height="48" rx="10" fill="var(--gold)" stroke="var(--night)" stroke-width="2"/>`+TX(x+bw/2,y+31,a,a>=100?16:19);}
  return PIC(rows*58+6,body);
}
function picSplit(parts, side){   // a rectangle cut into parts (how we break a number apart)
  const W=225, x0=60, y0=32, H=80, tot=parts.reduce((s,x)=>s+x,0);
  let ws=parts.map(p=>Math.max(60,W*p/tot)); const k=W/ws.reduce((s,x)=>s+x,0); ws=ws.map(w=>w*k);
  let x=x0, body=TX(x0-10,y0+H/2+7,side,20,'var(--blau)','end');
  parts.forEach((p,i)=>{const w=ws[i];
    body+=`<rect x="${x}" y="${y0}" width="${w}" height="${H}" fill="${i?'#9DBCEB':'var(--gold)'}" stroke="var(--night)" stroke-width="2"/>`+TX(x+w/2,y0-9,p,20,'var(--blau)')+TX(x+w/2,y0+H/2+8,'?',24);
    x+=w;});
  return PIC(y0+H+8,body);
}
function picGrid(w,h){   // w x h unit squares
  const c=Math.min(26,250/w,180/h), x0=150-w*c/2+8, y0=6;
  let body='';
  for(let i=0;i<h;i++) for(let j=0;j<w;j++) body+=`<rect x="${x0+j*c}" y="${y0+i*c}" width="${c}" height="${c}" fill="${(i+j)%2?'var(--pitch)':'var(--pitch-2)'}" stroke="#fff" stroke-width="1.5"/>`;
  body+=TX(x0+w*c/2,y0+h*c+22,w,18,'var(--blau)')+TX(x0-8,y0+h*c/2+6,h,18,'var(--blau)','end');
  return PIC(y0+h*c+30,body);
}
function picRow(w,A){    // one row of w squares; how many rows make A?
  const c=Math.min(26,250/w), x0=150-w*c/2+8, y0=6;
  let body='';
  for(let j=0;j<w;j++) body+=`<rect x="${x0+j*c}" y="${y0}" width="${c}" height="${c}" fill="var(--pitch)" stroke="#fff" stroke-width="1.5"/>`;
  body+=`<rect x="${x0}" y="${y0}" width="${w*c}" height="${c*4}" fill="none" stroke="var(--night)" stroke-width="2" stroke-dasharray="6 5"/>`+
        TX(x0+w*c/2,y0+c*2.9,A,22)+TX(x0-8,y0+c*2+7,'?',22,'var(--blau)','end')+TX(x0+w*c/2,y0+c*4+22,w,18,'var(--blau)');
  return PIC(y0+c*4+30,body);
}
function picPerim(w,h){  // a rectangle with all four sides written
  return PIC(170,`<rect x="60" y="28" width="180" height="104" rx="3" fill="var(--pitch)" stroke="var(--night)" stroke-width="2"/>`+
    TX(150,20,w,20,'var(--blau)')+TX(150,156,w,20,'var(--blau)')+TX(50,87,h,20,'var(--blau)','end')+TX(250,87,h,20,'var(--blau)','start'));
}
function picShare(T,k,q){   // T shared equally into k groups
  const per=Math.min(k,4), rows=Math.ceil(k/4), bw=64, gap=8, bh=q<=12?Math.ceil(q/4)*13+10:44, x0=150-(per*bw+(per-1)*gap)/2;
  let body='';
  for(let i=0;i<k;i++){const x=x0+(i%4)*(bw+gap), y=6+Math.floor(i/4)*(bh+8);
    body+=`<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="10" fill="#fff" stroke="var(--night)" stroke-width="2"/>`;
    if(q<=12) for(let j=0;j<q;j++) body+=DOT(x+11+(j%4)*14,y+11+Math.floor(j/4)*13,5);
    else body+=TX(x+bw/2,y+bh/2+8,'?',22);}
  return PIC(6+rows*(bh+8),body);
}
function picPoly(per,n){   // n hexagons / pentagons / rectangles
  const cols=Math.min(n,6), rows=Math.ceil(n/6), sz=40, gap=8, x0=150-(cols*sz+(cols-1)*gap)/2;
  let body='';
  for(let i=0;i<n;i++){const cx=x0+(i%6)*(sz+gap)+sz/2, cy=6+Math.floor(i/6)*(sz+gap)+sz/2;
    if(per===4) body+=`<rect x="${cx-18}" y="${cy-12}" width="36" height="24" fill="var(--pitch)" stroke="var(--night)" stroke-width="2"/>`;
    else body+=`<polygon points="${Array.from({length:per},(_,j)=>{const an=-Math.PI/2+j*2*Math.PI/per;return (cx+18*Math.cos(an)).toFixed(1)+','+(cy+18*Math.sin(an)).toFixed(1)}).join(' ')}" fill="${per===5?'var(--night)':'#fff'}" stroke="var(--night)" stroke-width="2"/>`;}
  return PIC(6+rows*(sz+gap),body);
}
function picTime(segs,total){   // a time bar, read right to left like Hebrew: each piece with its minutes
  let x=285, body='';
  for(const s of segs){const w=270*s.v/total; x-=w;
    body+=`<rect x="${x}" y="28" width="${w}" height="34" fill="${s.fill}" stroke="var(--night)" stroke-width="2"/>`+TX(x+w/2,20,s.l,15,'var(--blau)');}
  return PIC(70,body);
}
const ST = (text,a,ans) => ({text, a, ans: ans===undefined ? N(a) : ans});
function mulTeach(a,b){
  if(a<=10&&b<=10) return {
    steps: b<=5 ? [ST(`כמה קבוצות יש?`,b), ST(`סופרים בקפיצות של ${N(a)}, ${N(b)} קפיצות. כמה יוצא?`,a*b)]
                : [ST(`קודם ${X(`${a} × 5`)}`,a*5), ST(`ועוד ${X(`${a} × ${b-5}`)}`,a*(b-5)), ST(`מחברים: ${X(`${a*5} + ${a*(b-5)}`)}`,a*b)],
    pic: picDots(a,b), cap: `${N(b)} שורות, ובכל שורה ${N(a)}. כמה ביחד?`};
  if(b<=10&&a%10===0&&a<100) return {
    steps: [ST(`${X(`${a/10} × ${b}`)}`,a/10*b), ST(`מוסיפים אפס בסוף: ${X(`${a} × ${b}`)}`,a*b)],
    pic: picBoxes(a,b), cap: `${N(b)} קבוצות של ${N(a)}. כל ${N(a)} זה ${N(a/10)} עשרות.`};
  if(b<=10){const u=a>=100?100:10, hi=a-a%u, lo=a%u;
    if(lo) return {steps: [ST(`${X(`${hi} × ${b}`)}`,hi*b), ST(`${X(`${lo} × ${b}`)}`,lo*b), ST(`מחברים: ${X(`${hi*b} + ${lo*b}`)}`,a*b)],
      pic: picSplit([hi,lo],b), cap: `מפרקים את ${N(a)} ל-${N(hi)} ועוד ${N(lo)}, וכופלים כל חלק ב-${N(b)}.`};
    return {steps: [ST(`${X(`${a/u} × ${b}`)}`,a/u*b), ST(`מוסיפים ${u===100?'שני אפסים':'אפס'}: ${X(`${a} × ${b}`)}`,a*b)],
      pic: picBoxes(a,b), cap: `${N(b)} קבוצות של ${N(a)}.`};}
  if(b%10===0) return {steps: [ST(`${X(`${a} × ${b/10}`)}`,a*b/10), ST(`מוסיפים אפס: ${X(`${a} × ${b}`)}`,a*b)], pic:'', cap:`${X(`${a} × ${b}`)} זה כמו ${X(`${a} × ${b/10}`)} ועוד אפס בסוף.`};
  const bt=b-b%10, bo=b%10;
  return {steps: [ST(`${X(`${a} × ${bt}`)}`,a*bt), ST(`${X(`${a} × ${bo}`)}`,a*bo), ST(`מחברים: ${X(`${a*bt} + ${a*bo}`)}`,a*b)],
    pic: picSplit([bt,bo],a), cap: `מפרקים את ${N(b)} ל-${N(bt)} ועוד ${N(bo)}, וכופלים כל חלק ב-${N(a)}.`};
}
function teach(q){
  const t=q.t; let steps=[], pic='', cap='';
  if(!t) return q;
  switch(t.kind){
    case 'fracOf': case 'fracRemain': {const {T,d,a,each,part}=t;
      steps=[ST(`לכמה חלקים שווים מחלקים את ${N(T)}? (המספר התחתון בשבר ${F(a,d)})`,d), ST(`כמה יש בכל חלק? ${X(`${T} ÷ ${d}`)}`,each)];
      if(a>1) steps.push(ST(`לוקחים ${N(a)} חלקים: ${X(`${each} × ${a}`)}`,part));
      if(t.kind==='fracRemain') steps.push(ST(`כמה נשארו? ${X(`${T} − ${part}`)}`,T-part));
      pic=picBar(d,[{n:a,fill:'var(--gold)'}],T);
      cap=`כל הפס הוא ${N(T)}. חותכים אותו ל-${N(d)} חלקים שווים, והחלקים הצהובים הם ${F(a,d)}.`+(t.kind==='fracRemain'?' מה שלא צהוב זה מה שנשאר.':''); break;}
    case 'fracAdd': {const {a,b,d,s}=t;
      steps=[ST(`מה המספר התחתון (המכנה)? כשהמכנים שווים הוא לא משתנה`,d), ST(`כמה חלקים ביחד? ${X(`${a} + ${b}`)}`,s),
             ST(`עכשיו כותבים את השבר: ${N(s)} למעלה ו-${N(d)} למטה, עם הכפתור ⁄`,s/d,F(s,d))];
      pic=picBar(d,[{n:a,fill:'var(--gold)'},{n:b,fill:'#9DBCEB'}]);
      cap=`הפס מחולק ל-${N(d)} חלקים. הצהוב זה ${F(a,d)} והכחול זה ${F(b,d)}. כמה חלקים צבועים?`; break;}
    case 'fracSub': {const {a,d}=t;
      steps=[ST(`לכמה חלקים מחולק השלם?`,d), ST(`כמה חלקים נשארו? ${X(`${d} − ${a}`)}`,d-a),
             ST(`עכשיו כותבים את השבר: ${N(d-a)} למעלה ו-${N(d)} למטה, עם הכפתור ⁄`,(d-a)/d,F(d-a,d))];
      pic=picBar(d,[{n:a,fill:'#C8CDD6'}]);
      cap=`השלם מחולק ל-${N(d)} חלקים. האפור זה ${F(a,d)} שכבר נגמר. כמה חלקים לבנים נשארו?`; break;}
    case 'mul': ({steps,pic,cap}=mulTeach(t.a,t.b)); break;
    case 'area': {const {w,h}=t;
      steps=[ST(`מה האורך?`,w), ST(`מה הרוחב?`,h), ST(`שטח = אורך × רוחב: ${X(`${w} × ${h}`)}`,w*h)];
      if(w*h<=150){pic=picGrid(w,h); cap=`כל משבצת היא ריבוע של 1 על 1. יש ${N(h)} שורות, ובכל שורה ${N(w)} משבצות.`;} break;}
    case 'perim': {const {w,h}=t;
      steps=[ST(`חצי סיבוב: אורך ועוד רוחב ${X(`${w} + ${h}`)}`,w+h), ST(`סיבוב שלם זה פעמיים: ${X(`${w+h} × 2`)}`,2*(w+h))];
      pic=picPerim(w,h); cap=`היקף זה כל הדרך מסביב, כל ארבע הצלעות.`; break;}
    case 'sqPerim': steps=[ST(`כמה צלעות יש לריבוע?`,4), ST(`כל הצלעות שוות: ${X(`${t.s} × 4`)}`,4*t.s)];
      pic=picPerim(t.s,t.s); cap='בריבוע כל 4 הצלעות שוות.'; break;
    case 'sqSide': steps=[ST(`כמה צלעות יש לריבוע?`,4), ST(`מחלקים את ההיקף ל-4: ${X(`${4*t.s} ÷ 4`)}`,t.s)];
      pic=picPerim('?','?'); cap=`4 צלעות שוות, וביחד הן ${N(4*t.s)}.`; break;
    case 'sqArea': steps=[ST(`מה האורך של צלע?`,t.s), ST(`שטח = צלע × צלע: ${X(`${t.s} × ${t.s}`)}`,t.s*t.s)];
      if(t.s<=12){pic=picGrid(t.s,t.s); cap=`ריבוע של ${N(t.s)} על ${N(t.s)} משבצות.`;} break;
    case 'missingSide': {const {w,h,A}=t;
      steps=[ST(`מה האורך?`,w), ST(`${N(w)} כפול כמה זה ${N(A)}? ${X(`${A} ÷ ${w}`)}`,h)];
      if(w<=15){pic=picRow(w,A); cap=`בשורה אחת יש ${N(w)} משבצות. כמה שורות צריך כדי שיהיו ${N(A)} משבצות?`;} break;}
    case 'triEq': steps=[ST(`כמה צלעות יש למשולש?`,3), ST(`כל הצלעות שוות: ${X(`${t.s} × 3`)}`,3*t.s)];
      cap='במשולש שווה צלעות כל 3 הצלעות שוות.'; break;
    case 'triSide': steps=[ST(`כמה צלעות יש למשולש?`,3), ST(`מחלקים את ההיקף ל-3: ${X(`${3*t.s} ÷ 3`)}`,t.s)];
      cap='במשולש שווה צלעות כל 3 הצלעות שוות.'; break;
    case 'triIso': steps=[ST(`שתי השוקיים: ${X(`${t.s} + ${t.s}`)}`,2*t.s), ST(`ועוד הבסיס: ${X(`${2*t.s} + ${t.b}`)}`,2*t.s+t.b)];
      cap='במשולש שווה שוקיים שתי הצלעות הצדדיות (השוקיים) שוות.'; break;
    case 'boxCount': steps=[ST(`כמה ${t.name} יש לקופסה אחת?`,t.per), ST(`יש ${N(t.n)} קופסאות: ${X(`${t.per} × ${t.n}`)}`,t.per*t.n)];
      cap=`לכל תיבה יש ${N(6)} פאות (הצדדים), ${N(12)} מקצועות (הקווים) ו-${N(8)} קודקודים (הפינות).`; break;
    case 'boxVol': steps=[ST(`כמה קוביות בשכבה אחת? ${X(`${t.a} × ${t.b}`)}`,t.a*t.b), ST(`כמה שכבות יש?`,t.c), ST(`${X(`${t.a*t.b} × ${t.c}`)}`,t.a*t.b*t.c)];
      pic=picGrid(t.a,t.b); cap=`זו שכבה אחת, ${N(t.a)} על ${N(t.b)}. יש ${N(t.c)} שכבות כאלה אחת על השנייה.`; break;
    case 'boxEdges': steps=[ST(`מקצוע אחד מכל סוג: ${X(`${t.a} + ${t.b} + ${t.c}`)}`,t.a+t.b+t.c), ST(`יש 4 מכל סוג: ${X(`${t.a+t.b+t.c} × 4`)}`,4*(t.a+t.b+t.c))];
      cap='בתיבה יש 4 מקצועות לאורך, 4 לרוחב ו-4 לגובה.'; break;
    case 'poly': steps=[ST(`כמה ${t.what} יש ל${t.one} אחד?`,t.per), ST(`יש ${N(t.n)}: ${X(`${t.per} × ${t.n}`)}`,t.per*t.n)];
      pic=picPoly(t.per,t.n); cap=`כאן יש ${N(t.n)}. סופרים ${t.what} באחד, ואז כופלים.`; break;
    case 'div': steps=[ST(`לכמה קבוצות מחלקים?`,t.k), ST(`${N(t.k)} כפול כמה זה ${N(t.T)}? ${X(`${t.T} ÷ ${t.k}`)}`,t.q)];
      pic=picShare(t.T,t.k,t.q); cap=`מחלקים ${N(t.T)} ל-${N(t.k)} קבוצות שוות. כמה יש בכל קבוצה?`; break;
    case 'change': steps=[ST(`כמה עלו הכרטיסים? ${X(`${t.n} × ${t.pr}`)}`,t.c), ST(`כמה עודף? ${X(`${t.pay} − ${t.c}`)}`,t.pay-t.c)]; break;
    case 'fans': steps=[ST(`כמה אוהדים הגיעו באוטובוסים? ${X(`${t.n} × ${t.m}`)}`,t.n*t.m), ST(`ביחד עם מי שכבר ישב: ${X(`${t.S} + ${t.n*t.m}`)}`,t.S+t.n*t.m)]; break;
    case 'save': steps=[ST(`כמה הוא חסך? ${X(`${t.s} × ${t.n}`)}`,t.s*t.n), ST(`כמה נשאר אחרי הקנייה? ${X(`${t.s*t.n} − ${t.c}`)}`,t.s*t.n-t.c)]; break;
    case 'bench': steps=[ST(`כמה דקות נמשך משחק שלם?`,90), ST(`פחות הזמן ששיחק: ${X(`90 − ${t.m}`)}`,90-t.m)];
      pic=picTime([{v:90-t.m,l:'?',fill:'#C8CDD6'},{v:t.m,l:t.m,fill:'var(--pitch)'}],90);
      cap=`כל הפס הוא משחק של ${N(90)} דקות. הירוק זה הזמן שהוא שיחק, והאפור זה הספסל.`; break;
    case 'games': steps=[ST(`טיפ: קודם ${X(`9 × ${t.n}`)}`,9*t.n), ST(`ומוסיפים אפס: ${X(`90 × ${t.n}`)}`,90*t.n)];
      pic=picTime(Array.from({length:t.n},()=>({v:90,l:90,fill:'var(--pitch)'})),90*t.n); cap=`${N(t.n)} משחקים, כל אחד ${N(90)} דקות.`; break;
    case 'hm': steps=[ST(`כמה דקות יש ב${hours(t.h)}? ${X(`${t.h} × 60`)}`,60*t.h), ST(`ועוד ${N(t.m)} דקות: ${X(`${60*t.h} + ${t.m}`)}`,60*t.h+t.m)];
      pic=picTime([...Array.from({length:t.h},()=>({v:60,l:60,fill:'var(--pitch)'})),{v:t.m,l:t.m,fill:'var(--gold)'}],60*t.h+t.m); cap=`כל שעה היא ${N(60)} דקות.`; break;
  }
  q.steps=steps;
  q.pic=pic||cap?`<div class="picwrap">${pic}${cap?`<p class="piccap">${cap}</p>`:''}</div>`:'';
  return q;
}

// round 2+ = a retry ("אימון חוזר", Zion 16.11.26): 5 new questions, same day and level. Round 1 keeps the old seed.
export const MAX_ROUND = 4;
/* ---------- a level per topic, from 17.11.26 (Zion: "אולי הוא חזק בשברים אבל חלש בהנדסה") ----------
   level = {mul, frac, geo, other}, each 1-5. Every week each topic goes up on its own (tools/poller.py).
   1 = very easy (g.tiny), 2 = the easy level 1 (g.easy), 3-5 = the old levels 2-4. Days before 17.11 keep the old single level. */
export const TOPIC_FROM = '2026-11-17';
export const TOPICS = { mul:'כפל', frac:'שברים', geo:'הנדסה', other:'חילוק וזמן' };
export const TOPIC_MAX = 5;
export const TOPIC_LEVEL_NAMES = {1:'ממש קל', 2:'קל', 3:'בינוני', 4:'קשה', 5:'הכי קשה'};
const TOPIC_OF = f => f===mul1||f===mul2 ? 'mul' : [fracOf,fracAdd,fracSub,fracRemain].includes(f) ? 'frac'
                    : [div,multiStep,time].includes(f) ? 'other' : 'geo';
const DIFF = n => n<=1 ? {lvl:1,easy:true,tiny:true} : n===2 ? {lvl:1,easy:true,tiny:false} : {lvl:Math.min(4,n-1),easy:false,tiny:false};
export function normLevels(level){
  const o={};
  for(const t in TOPICS){const v=level&&typeof level==='object'?level[t]:level; o[t]=Math.min(TOPIC_MAX,Math.max(1,parseInt(v,10)||1));}
  return o;
}
function buildTopics(key, L, rd){
  const r=rng(seedOf('reef-football-g4|'+key+'|T'+L.mul+L.frac+L.geo+L.other+(rd>1?'|R'+rd:'')));
  const g={ri:(a,b)=>a+Math.floor(r()*(b-a+1)),pick:arr=>arr[Math.floor(r()*arr.length)]};
  const shuffle=arr=>{const c=arr.slice();for(let i=c.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[c[i],c[j]]=[c[j],c[i]]}return c};
  const D={}; for(const t in L) D[t]=DIFF(L[t]);
  const fr=shuffle(D.frac.easy?[fracOf,fracOf,fracAdd,fracSub]:[fracOf,fracAdd,fracSub,fracRemain]);
  const geo=g.pick(D.geo.easy?[area,rectPerim,square,triangle,box,polygons]:[area,rectPerim,square,missingSide,triangle,box,box,polygons]);
  const extra=g.pick(D.other.easy?[fr[1],div,time]:[fr[1],fr[1],div,multiStep,time]);
  const used=new Set();
  const items=shuffle([fr[0],mul1,mul2,geo,extra]).map(f=>{
    let p; for(let t=0;t<6;t++){p=g.pick(f===fracOf||f===mul1?BARCA:PICKS); if(!used.has(p)) break}
    used.add(p);
    const tk=TOPIC_OF(f); Object.assign(g,D[tk]);
    const q=f(g,p); q.player=p; q.tk=tk; return {q,f,p,diff:D[tk]};
  });
  return {lvl:'T'+L.mul+L.frac+L.geo+L.other,rd,items};
}
function build(key, level=1, round=1){
  const rd=Math.min(MAX_ROUND,Math.max(1,parseInt(round,10)||1));
  if(key>=TOPIC_FROM) return buildTopics(key, normLevels(level), rd);
  const lvl=Math.min(MAX_LEVEL,Math.max(1,parseInt(level&&typeof level==='object'?1:level,10)||1));
  const r=rng(seedOf('reef-football-g4|'+key+'|L'+lvl+(rd>1?'|R'+rd:'')));
  // easier level 1 from 17.11.26 (Reef's teacher: too hard). 16.11 rounds 1-2 were already played, so they keep the old questions
  const easy=lvl===1&&(key>'2026-11-16'||rd>=3);
  const g={lvl,easy,ri:(a,b)=>a+Math.floor(r()*(b-a+1)),pick:arr=>arr[Math.floor(r()*arr.length)]};
  const shuffle=arr=>{const c=arr.slice();for(let i=c.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[c[i],c[j]]=[c[j],c[i]]}return c};
  // every day: a fraction, the multiplication table kind (mul1), a bigger multiplication (mul2), a geometry
  // question, and one more: a second fraction (most days), division, two steps or time.
  // easy: no two-step questions ("כמה נשארו" after a fraction, change from a bill), no "find the side from the area",
  // no box edges / volume
  const fr=shuffle(easy?[fracOf,fracOf,fracAdd,fracSub]:[fracOf,fracAdd,fracSub,fracRemain]);
  const geo=g.pick(easy?[area,rectPerim,square,triangle,box,polygons]:[area,rectPerim,square,missingSide,triangle,box,box,polygons]);
  const extra=g.pick(easy?[fr[1],div,time]:[fr[1],fr[1],div,multiStep,time]);
  const used=new Set();
  const items=shuffle([fr[0],mul1,mul2,geo,extra]).map(f=>{
    // a different player for each question when possible
    let p; for(let t=0;t<6;t++){p=g.pick(f===fracOf||f===mul1?BARCA:PICKS); if(!used.has(p)) break}
    used.add(p);
    const q=f(g,p); q.player=p; q.tk=TOPIC_OF(f); return {q,f,p,diff:{lvl,easy}};
  });
  return {lvl,rd,items};
}
export function genDay(key, level=1, round=1){ return build(key,level,round).items.map(x=>teach(x.q)); }
// the twin of question i (תרגיל תאום): the same kind of question with other numbers, after he missed it
export function genTwin(key, level=1, round=1, i=0){
  const b=build(key,level,round), it=b.items[i];
  if(!it) return null;
  let q;
  for(let t=0;t<8;t++){
    const r=rng(seedOf('reef-twin|'+key+'|L'+b.lvl+'|R'+b.rd+'|'+i+'|'+t));
    const g={...it.diff,ri:(a,c)=>a+Math.floor(r()*(c-a+1)),pick:arr=>arr[Math.floor(r()*arr.length)]};
    q=it.f(g,it.p); q.player=it.p; q.tk=it.q.tk;
    if(q.answer!==it.q.answer) break;
  }
  return teach(q);
}

export function parseAnswer(s){
  s=String(s||'').trim();
  if(!/^\d{1,6}(\/\d{1,6})?$/.test(s)) return NaN;
  if(s.includes('/')){const [a,b]=s.split('/');return +b===0?NaN:+a/+b}
  return +s;
}
export function isRight(given,answer){const v=parseAnswer(given);return isFinite(v)&&Math.abs(v-answer)<1e-9}
// + TWIN_BONUS when he missed the question but then solved its twin
export const TWIN_BONUS = 3;
export function pointsFor(r){if(!r) return 0; return (r.ok?(r.tries===1?POINTS_FIRST:POINTS_SECOND):0)+(!r.ok&&r.twinOk?TWIN_BONUS:0)}

// level in force on a date: levels = [{from:'YYYY-MM-DD', level, topics?}], sorted by from.
// From 17.11.26 an entry has topics = {mul, frac, geo, other} and that object is the level.
export function levelFor(date, levels){
  let l=1; for(const x of (levels||[])) if(x.from<=date) l=x.topics||x.level; return l;
}
