// Shared by the page and the Netlify function: same date -> same 5 questions.
// Grade 4 (כיתה ד'), word problems, football theme. Every day: 2 fractions, 2 multiplication, 1 other.

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

/* ---------- multiplication ---------- */
function mul1(g,p){
  const big=g.ri(0,2)===0, a=big?g.ri(105,450):g.ri(13,96), b=big?g.ri(2,6):g.ri(3,9);
  const html=(big?g.pick([
    ()=>`בכל יציע באצטדיון של ברצלונה יש ${N(a)} מושבים. כמה מושבים יש ב-${N(b)} יציעים?`,
    ()=>`בחנות של ברצלונה מוכרים ${N(a)} חולצות של ${P(p)} בכל יום. כמה חולצות נמכרו ב-${N(b)} ימים?`
  ]):g.pick([
    ()=>`בכל אוטובוס של אוהדי ברצלונה יש ${N(a)} אוהדים. למשחק נסעו ${N(b)} אוטובוסים מלאים. כמה אוהדים נסעו למשחק?`,
    ()=>`חולצה של ${P(p)} עולה ${N(a)} ₪. ${NAME} והחברים שלו קנו ${N(b)} חולצות. כמה הם שילמו בסך הכול?`,
    ()=>`${P(p)} מוסר ${N(a)} מסירות בכל משחק. כמה מסירות הוא מוסר ב-${N(b)} משחקים?`,
    ()=>`${P(p)} עושה ${N(a)} קפיצות בחבל בכל אימון. כמה קפיצות הוא עושה ב-${N(b)} אימונים?`
  ]))();
  const unit=big?100:10, hi=a-a%unit, lo=a%unit;
  const hint=lo?`מפרקים את ${N(a)}: ${X(`${hi} × ${b} = ${hi*b}`)} ועוד ${X(`${lo} × ${b} = ${lo*b}`)}. עכשיו מחברים את שתי התוצאות.`
               :`${X(`${a/unit} × ${b} = ${a/unit*b}`)}, ומוסיפים ${unit===100?'שני אפסים':'אפס'} בסוף.`;
  return {cat:'כפל',html,answer:a*b,ans:N(a*b),hint};
}
function mul2(g,p){
  const a=g.ri(12,48), b=g.pick([20,30,40,50,11,12,13,14,15]);
  const html=g.pick([
    ()=>`באצטדיון יש ${N(b)} שורות, ובכל שורה ${N(a)} כיסאות. כמה כיסאות יש באצטדיון?`,
    ()=>`בכל חבילה יש ${N(a)} מדבקות של שחקני ברצלונה. ${NAME} קנה ${N(b)} חבילות. כמה מדבקות יש לו?`,
    ()=>`${P(p)} מתאמן ${N(a)} דקות בכל בוקר. כמה דקות הוא מתאמן ב-${N(b)} בקרים?`
  ])();
  const hint=b%10===0?`${X(`${a} × ${b}`)} זה כמו ${X(`${a} × ${b/10} = ${a*b/10}`)}, ואז מוסיפים אפס בסוף.`
                     :`מפרקים את ${N(b)} ל-${N(10)} ועוד ${N(b-10)}: ${X(`${a} × 10 = ${a*10}`)} ועוד ${X(`${a} × ${b-10} = ${a*(b-10)}`)}. מחברים.`;
  return {cat:'כפל',html,answer:a*b,ans:N(a*b),hint};
}
function area(g,p){
  const w=g.pick([20,30,40,50]), h=g.ri(11,25);
  const html=g.pick([
    ()=>`מגרש אימון קטן של ברצלונה בצורת מלבן, באורך ${N(w)} מטר וברוחב ${N(h)} מטר. מה השטח של המגרש במטרים רבועים?`,
    ()=>`פוסטר של ${P(p)} בצורת מלבן, באורך ${N(w)} סנטימטר וברוחב ${N(h)} סנטימטר. מה השטח של הפוסטר בסנטימטרים רבועים?`
  ])();
  return {cat:'כפל · שטח',html,answer:w*h,ans:N(w*h),
    hint:`שטח של מלבן = אורך × רוחב: ${X(`${w} × ${h}`)}. זה כמו ${X(`${h} × ${w/10} = ${h*w/10}`)}, ואז מוסיפים אפס.`};
}

/* ---------- other ---------- */
function div(g,p){
  const k=g.ri(3,9), q=g.ri(12,28), T=k*q;
  const html=g.pick([
    ()=>`${NAME} אסף ${N(T)} מדבקות של שחקני ברצלונה, וחילק אותן שווה בשווה ל-${N(k)} עמודים באלבום. כמה מדבקות יש בכל עמוד?`,
    ()=>`${N(T)} ילדים הגיעו למחנה כדורגל, וחילקו אותם ל-${N(k)} קבוצות שוות. כמה ילדים יש בכל קבוצה?`,
    ()=>`${P(p)} כבש ${N(T)} שערים ב-${N(k)} עונות, אותו מספר שערים בכל עונה. כמה שערים הוא כבש בכל עונה?`
  ])();
  return {cat:'חילוק',html,answer:q,ans:N(q),
    hint:`${X(`${T} ÷ ${k}`)}. שואלים: איזה מספר כפול ${N(k)} נותן ${N(T)}? אפשר להתחיל מ-${X(`10 × ${k} = ${10*k}`)}.`};
}
function multiStep(g,p){
  const v=g.ri(0,2);
  if(v===0){const n=g.ri(2,5),pr=g.ri(15,35),c=n*pr,pay=c<50?50:c<100?100:200;
    return {cat:'שני שלבים',html:`${NAME} קנה ${N(n)} כרטיסים למשחק של הפועל באר שבע, כל כרטיס ב-${N(pr)} ₪. הוא שילם בשטר של ${N(pay)} ₪. כמה עודף הוא קיבל?`,answer:pay-c,ans:N(pay-c),
      hint:`קודם מחשבים כמה עלו הכרטיסים: ${X(`${n} × ${pr} = ${c}`)}. ואז מחסרים: ${X(`${pay} − ${c}`)}.`};}
  if(v===1){const S=g.ri(120,600)*10,n=g.ri(3,8),m=g.ri(42,58);
    return {cat:'שני שלבים',html:`באצטדיון ישבו ${N(S)} אוהדים. הגיעו עוד ${N(n)} אוטובוסים, ובכל אוטובוס ${N(m)} אוהדים. כמה אוהדים יש עכשיו באצטדיון?`,answer:S+n*m,ans:N(S+n*m),
      hint:`קודם מחשבים כמה אוהדים הגיעו באוטובוסים: ${X(`${n} × ${m} = ${n*m}`)}. ואז מחברים: ${X(`${S} + ${n*m}`)}.`};}
  const s=g.ri(10,30),n=g.ri(4,9),c=g.ri(20,s*n-10);
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
function perimeter(g,p){
  const w=g.ri(4,10)*10, h=g.ri(2,w/10-1)*10;
  const html=g.pick([
    ()=>`${P(p)} רץ סיבוב אחד מסביב למגרש אימון בצורת מלבן, באורך ${N(w)} מטר וברוחב ${N(h)} מטר. כמה מטרים הוא רץ?`,
    ()=>`${NAME} רוצה לצבוע קו לבן מסביב למגרש קטן בצורת מלבן, באורך ${N(w)} מטר וברוחב ${N(h)} מטר. כמה מטרים של קו הוא צריך לצבוע?`
  ])();
  return {cat:'היקף',html,answer:2*(w+h),ans:N(2*(w+h)),
    hint:`היקף זה סכום כל ארבע הצלעות: ${X(`${w} + ${h} + ${w} + ${h}`)}. או: ${X(`(${w} + ${h}) × 2`)}.`};
}

export function genDay(key){
  const r=rng(seedOf('reef-football-g4|'+key));
  const g={ri:(a,b)=>a+Math.floor(r()*(b-a+1)),pick:arr=>arr[Math.floor(r()*arr.length)]};
  const shuffle=arr=>{const c=arr.slice();for(let i=c.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[c[i],c[j]]=[c[j],c[i]]}return c};
  const fr=shuffle([fracOf,fracAdd,fracSub,fracRemain]).slice(0,2);
  const mu=shuffle([mul1,mul2,area]).slice(0,2);
  const ot=g.pick([div,multiStep,time,perimeter]);
  const used=new Set();
  return shuffle([...fr,...mu,ot]).map(f=>{
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
