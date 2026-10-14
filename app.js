'use strict';
const state={lang:navigator.language.toLowerCase().startsWith('zh')?'zh':'en',step:0,furthest:0,store:'gulou',birth:{year:'',month:'',day:''},profile:null,selected:null,qty:1,done:false};
const products=[
  {
    "id": "wood",
    "char": "木",
    "code": "01",
    "tone": "#41614a",
    "color": [
      "绿",
      "Green"
    ],
    "name": [
      "东阁藏春",
      "Dongge Cangchun"
    ],
    "phase": [
      "木",
      "Wood"
    ],
    "scentType": [
      "清雅草本木香",
      "Elegant herbal woods"
    ],
    "scentIntro": [
      "沉檀木韵融入草本气息，微辛点缀，层次清雅。",
      "Agarwood and sandalwood mingle with herbal aromas, touched with gentle spice for an elegant, layered scent."
    ],
    "scentMeaning": [
      "取木之舒展，呈草木清雅之韵。",
      "Inspired by Wood’s unfolding growth, an elegant expression of herbs and woods."
    ]
  },
  {
    "id": "fire",
    "char": "火",
    "code": "02",
    "tone": "#a34e3c",
    "color": [
      "红",
      "Red"
    ],
    "name": [
      "南极庆寿",
      "Nanji Qingshou"
    ],
    "phase": [
      "火",
      "Fire"
    ],
    "scentType": [
      "温甜树脂香",
      "Warm, sweet resin"
    ],
    "scentIntro": [
      "温甜脂香与沉檀木韵相融，气息柔和，香韵圆润。",
      "Warm, sweet resin blends with agarwood and sandalwood in a soft, rounded aroma."
    ],
    "scentMeaning": [
      "取火之明朗，添一缕融融暖香。",
      "Inspired by Fire’s brightness, a gently warming scent."
    ]
  },
  {
    "id": "earth",
    "char": "土",
    "code": "03",
    "tone": "#977746",
    "color": [
      "黄",
      "Yellow"
    ],
    "name": [
      "四时清味",
      "Sishi Qingwei"
    ],
    "phase": [
      "土",
      "Earth"
    ],
    "scentType": [
      "甘辛芳草香",
      "Sweet-spicy herbs"
    ],
    "scentIntro": [
      "甘辛气息交织芳草香韵，木香相衬，带一缕清透。",
      "Sweet and spicy notes weave through aromatic herbs, supported by woods with an airy touch."
    ],
    "scentMeaning": [
      "取土之中和，呈甘辛温厚之韵。",
      "Inspired by Earth’s harmony, a mellow expression of sweet and spicy aromas."
    ]
  },
  {
    "id": "metal",
    "char": "金",
    "code": "04",
    "tone": "#757575",
    "color": [
      "灰",
      "Grey"
    ],
    "name": [
      "西斋雅意",
      "Xizhai Yayi"
    ],
    "phase": [
      "金",
      "Metal"
    ],
    "scentType": [
      "素雅本草香",
      "Understated herbal aroma"
    ],
    "scentIntro": [
      "本草气息伴以微辛木韵，素雅含蓄，层次简净。",
      "Herbal aromas meet gently spicy woods, understated and restrained, with simple, clear layers."
    ],
    "scentMeaning": [
      "取金之简净，留一缕素雅清芬。",
      "Inspired by Metal’s simplicity, a delicate, understated fragrance."
    ]
  },
  {
    "id": "water",
    "char": "水",
    "code": "05",
    "tone": "#303335",
    "color": [
      "黑",
      "Black"
    ],
    "name": [
      "北苑名芬",
      "Beiyuan Mingfen"
    ],
    "phase": [
      "水",
      "Water"
    ],
    "scentType": [
      "幽润脂木香",
      "Deep resinous woods"
    ],
    "scentIntro": [
      "树脂气息与檀木香韵相融，幽润含蓄，木韵深长。",
      "Resin blends with sandalwood in a smooth, understated aroma with woody depth."
    ],
    "scentMeaning": [
      "取水之静藏，呈幽深含蓄之韵。",
      "Inspired by Water’s quiet stillness, a deep and understated scent."
    ]
  }
];
const zodiac=[['摩羯座','Capricorn','♑'],['水瓶座','Aquarius','♒'],['双鱼座','Pisces','♓'],['白羊座','Aries','♈'],['金牛座','Taurus','♉'],['双子座','Gemini','♊'],['巨蟹座','Cancer','♋'],['狮子座','Leo','♌'],['处女座','Virgo','♍'],['天秤座','Libra','♎'],['天蝎座','Scorpio','♏'],['射手座','Sagittarius','♐']];
const qi=[['初之气 · 厥阴风木','First phase · Wind / Wood'],['二之气 · 少阴君火','Second phase · Sovereign Fire'],['三之气 · 少阳相火','Third phase · Ministerial Fire'],['四之气 · 太阴湿土','Fourth phase · Dampness / Earth'],['五之气 · 阳明燥金','Fifth phase · Dryness / Metal'],['终之气 · 太阳寒水','Final phase · Cold / Water']];
const t=(zh,en)=>state.lang==='zh'?zh:en;
const tx=a=>a[state.lang==='zh'?0:1];
const el=id=>document.getElementById(id);
const product=id=>products.find(p=>p.id===id);
const productName=p=>`<span class="product-name">${p.name[0]}</span>${state.lang==='en'?`<small class="product-romanization">${p.name[1]}</small>`:''}`;
const scentDraftNote=()=>`<p class="note">${t('香气文案依据原料组合拟定，具体气味以成品试闻为准。','Scent descriptions are based on the ingredient combinations; confirm the aroma by sampling the finished bracelet.')}</p>`;
const scentMeaningRow=p=>`<div class="info-row"><span>${t('香意','Scent inspiration')}</span><span>${tx(p.scentMeaning)}</span></div>`;
const storeName=()=>state.store==='gulou'?t('北京 · 鼓楼店','Beijing · Gulou'):t('北京 · 戒台寺店','Beijing · Jietai Temple');
function demoProfile(b){const n=Number(b.month)*100+Number(b.day);const cuts=[120,219,321,420,521,621,723,823,923,1023,1122,1222];let z=cuts.filter(c=>n>=c).length%12;let q=n<120?5:n<321?0:n<521?1:n<723?2:n<923?3:n<1122?4:5;return{z,q,id:['wood','fire','fire','earth','metal','water'][q],boundary:cuts.some(c=>Math.abs(c-n)<=1)};}
function validBirth(b){const y=Number(b.year),m=Number(b.month),d=Number(b.day),date=new Date(y,m-1,d),today=new Date();return Number.isInteger(y)&&y>=1900&&y<=today.getFullYear()&&m>=1&&m<=12&&d>=1&&date.getFullYear()===y&&date.getMonth()===m-1&&date.getDate()===d&&date<=today;}
function birthLabel(){const b=state.birth;return new Intl.DateTimeFormat(state.lang==='zh'?'zh-CN':'en-GB',{year:'numeric',month:'long',day:'numeric'}).format(new Date(+b.year,+b.month-1,+b.day));}
function navigate(step){if(step>1&&!state.profile)return;state.step=step;state.furthest=Math.max(state.furthest,step);state.done=false;history.pushState({step},'',`#${['welcome','birthday','story','scent','bracelet','selection'][step]}`);render();window.scrollTo({top:0,behavior:'instant'});el('screen-title')?.focus({preventScroll:true});}
function title(meta,heading,desc){return `<div class="step-meta">${meta}</div><h2 id="screen-title" tabindex="-1">${heading}</h2>${desc?`<p class="intro">${desc}</p>`:''}`;}
function actions(next,action,back=true){return `<div class="actions">${back?`<button class="secondary" data-action="back">${t('返回','Back')}</button>`:''}<button class="primary" data-action="${action}">${next}<span aria-hidden="true">→</span></button></div>`;}
function welcome(){return title(t('一缕香，一段北京记忆','A SCENT TO REMEMBER'),t('找到属于你的<br>那一缕香。','Find a scent.<br>Carry a story.'),t('从你的生日出发，探索中国时序文化，再用鼻子选出真正喜欢的中药芳香手串。','Begin with your birthday, discover a Chinese seasonal story, then let your senses choose a herbal bead bracelet.'))+`<div class="welcome-line"><span class="line-number">01</span><div><strong>${t('读一段生日故事','Discover your birthday story')}</strong><small>${t('用熟悉的星座，走近五运六气','A familiar zodiac sign meets Chinese seasonal traditions.')}</small></div></div><div class="welcome-line"><span class="line-number">02</span><div><strong>${t('在店里，闻到喜欢','Meet the five scents in person')}</strong><small>${t('生日给你灵感，实际喜好由你决定','Your birthday offers a starting point. Your senses decide.')}</small></div></div><div class="store-control"><label for="store">${t('你所在的门店','Your store')}</label><select id="store"><option value="gulou" ${state.store==='gulou'?'selected':''}>${t('北京 · 鼓楼店','Beijing · Gulou')}</option><option value="jietai" ${state.store==='jietai'?'selected':''}>${t('北京 · 戒台寺店','Beijing · Jietai Temple')}</option></select></div>`+actions(t('开启选香体验','Discover my scent'),'start',false)+`<p class="note center">${t('约 2 分钟 · 无需注册','About 2 minutes · No sign-up')}</p>`;}
function birthday(){const months=Array.from({length:12},(_,i)=>`<option value="${i+1}" ${+state.birth.month===i+1?'selected':''}>${state.lang==='zh'?`${i+1} 月`:new Intl.DateTimeFormat('en',{month:'long'}).format(new Date(2000,i,1))}</option>`).join('');return title('01 / '+t('你的生日','YOUR BIRTHDAY'),t('故事，从这一天开始。','Every story has<br>a beginning.'),t('请填写公历生日。此原型只在当前页面使用你的生日，不会创建账户。','Enter your Gregorian birth date. This prototype keeps it only in this page session and creates no account.'))+`<form id="birth-form" novalidate><div class="date-fields"><div class="field"><label for="year">${t('年','Year')}</label><input id="year" name="year" inputmode="numeric" type="number" min="1900" max="${new Date().getFullYear()}" placeholder="${t('请输入年份','Enter year')}" value="${state.birth.year}" aria-describedby="birth-error"></div><div class="field"><label for="month">${t('月','Month')}</label><select id="month" name="month" aria-describedby="birth-error"><option value="">${t('选择月份','Month')}</option>${months}</select></div><div class="field"><label for="day">${t('日','Day')}</label><input id="day" name="day" inputmode="numeric" type="number" min="1" max="31" placeholder="${t('请输入日期','Enter day')}" value="${state.birth.day}" aria-describedby="birth-error"></div></div><p class="error" id="birth-error" role="alert"></p><p class="note">${t('不知道出生时间也可以继续。接近交界日期的结果会提示需进一步确认。','No birth time needed to explore. Dates near a transition will be marked for confirmation.')}</p><div class="actions"><button type="button" class="secondary" data-action="back">${t('返回','Back')}</button><button type="submit" class="primary">${t('查看我的生日故事','Reveal my story')} <span aria-hidden="true">→</span></button></div></form><div class="sample"><span>${t('只是想先体验一下？','Just taking a look?')}</span><button class="text-button" data-action="sample">${t('使用示例生日','Try a sample date')}</button></div>`;}
function story(){return renderCompactStory();}
function scents(){return title('03 / '+t('现场试香','FOLLOW YOUR SENSES'),t('让喜欢，做最后决定。','Let your senses<br>have the final say.'),t('向店员索取对应编号的试香珠。闻过之后，选择你最喜欢的一款；也可以先浏览。','Ask your host for the numbered scent samples. After smelling them, choose your favourite — or browse first.'))+`<div class="scent-grid" role="radiogroup" aria-label="${t('选择香型','Choose a scent')}">${products.map(p=>`<button class="scent ${state.selected===p.id?'selected':''}" role="radio" aria-checked="${state.selected===p.id}" data-action="choose" data-id="${p.id}"><span class="scent-char" style="--tone:${p.tone}">${p.char}</span><span class="scent-content"><span class="scent-title">${productName(p)} ${state.profile.id===p.id?`<span class="badge">${t('生日灵感','BIRTHDAY PICK')}</span>`:''}</span><span class="scent-desc">${p.code} · ${t('五行','Element')}：${tx(p.phase)}</span><span class="scent-type">${t('香型','Scent type')} · ${tx(p.scentType)}</span><span class="scent-meaning">${t('香意','Scent inspiration')} · ${tx(p.scentMeaning)}</span></span><span class="radio" aria-hidden="true"></span></button>`).join('')}</div>${scentDraftNote()}`+actions(t('查看这款手串','View this bracelet'),'to-detail');}
function detail(){const p=product(state.selected);return title('04 / '+t('你的选择','YOUR CHOICE'),t('把这一缕香，带在身边。','A little scent,<br>to take with you.'),'')+`<div class="product-hero"><img src="bracelet.png" alt="${t('香珠手串概念图，非实物','Concept bracelet image, not the final product')}"><div><span class="caption">${p.code} / ${t('五行','Element')}：${tx(p.phase)}</span><h3>${productName(p)}</h3><p>${t('香型','Scent type')} · ${tx(p.scentType)}</p><div class="price">¥168 <small>${t('演示单价','Demo price')}</small></div></div></div><div class="info-row"><span>${t('香气简介','Scent profile')}</span><span>${tx(p.scentIntro)}</span></div>${scentMeaningRow(p)}${scentDraftNote()}<div class="info-row"><span>${t('推荐依据','Your selection')}</span><span>${state.selected===state.profile.id?t('与生日文化主题相同；最终以你的闻香喜好为准。','Matches your birthday theme; your scent preference remains the deciding factor.'):t('你选择了不同于生日主题的香型，系统尊重你的实际喜好。','You chose a different scent from the birthday theme. Your preference comes first.')}</span></div><div class="info-row"><span>${t('制作形式','Craft')}</span><span>${t('中药粉末直接成珠。黏结材料与尺寸待打样确认。','Beads formed from powdered herbs. Binder and sizing await sample approval.')}</span></div><div class="info-row"><span>${t('原料信息','Ingredients')}</span><span>${t('完整成分及黏结材料信息，请以企业最终确认资料为准。','Confirm the complete ingredient list and binder with the brand.')}</span></div><details><summary>${t('佩戴与保养说明','Wearing & care')}</summary><p>${t('拟定指引：避免浸水，保持干燥，勿食用。如有不适请停止佩戴。最终保养方式应根据成珠与佩戴测试确定，购买前请向店员确认实际原料。','Proposed guidance: keep dry, avoid soaking and do not ingest. Stop wearing if discomfort occurs. Final care instructions depend on product testing; confirm actual ingredients with your host before purchase.')}</p></details><div class="quantity"><span>${t('数量','Quantity')}</span><div class="counter"><button data-action="minus" aria-label="${t('减少数量','Decrease quantity')}" ${state.qty===1?'disabled':''}>−</button><output>${state.qty}</output><button data-action="plus" aria-label="${t('增加数量','Increase quantity')}" ${state.qty===9?'disabled':''}>+</button></div></div>`+actions(t('生成选购卡','Prepare my selection'),'to-confirm')+`<p class="note center">${t('在店内结账 · 此处不会收取费用','Checkout in store · No payment taken here')}</p>`;}
function confirm(){const p=product(state.selected);if(state.done)return `<div class="done-mark" aria-hidden="true">✓</div>`+title(t('体验完成','EXPERIENCE COMPLETE'),t('把这段记忆，带回家。','A story to<br>carry home.'),t('你已走完选香流程。此操作仅模拟向店员展示选购卡，没有创建订单或收款。','You have completed the scent journey. This only simulates showing a selection to your host. No order or payment was created.'))+ticket(p)+actions(t('开始新的体验','Start a new experience'),'reset',false);return title('05 / '+t('门店选购卡','YOUR IN-STORE SELECTION'),t('把这张卡，交给店员。','Your host will<br>take it from here.'),t('店员会协助你确认实物、尺寸和实际价格，然后通过门店现有方式结账。','Your host will confirm the product, fit and actual price, then help you pay using the store’s usual checkout.'))+ticket(p)+actions(t('演示：已向店员出示','Demo: shown to my host'),'finish')+`<p class="note center">${t('选购卡不是订单或付款凭证。','This selection is not an order or proof of payment.')}</p>`;}
function ticket(p){return `<div class="ticket"><div class="ticket-top"><div><span class="caption">${storeName()}</span><h3>${t('选香确认卡','Scent selection')}</h3></div><span class="seal">中轴<br>寻香</span></div><div class="ticket-code">${p.code}</div><div class="ticket-item"><strong>${productName(p)}<span class="selection-phase">${t('五行','Element')}：${tx(p.phase)}</span></strong><span>× ${state.qty}</span></div><div class="ticket-item"><span>${t('商品中文名称','Chinese product name')}</span><span>${p.name[0]} · ${p.char}系列</span></div><div class="ticket-item"><span>${t('香型','Scent type')}</span><span>${tx(p.scentType)}</span></div><div class="ticket-item"><span>${t('香意','Scent inspiration')}</span><span>${tx(p.scentMeaning).replace(/。$/,'')}</span></div><div class="ticket-item"><span>${t('参考单价','Demo unit price')}</span><span>¥168</span></div><div class="ticket-item total"><span>${t('演示合计','Demo total')}</span><strong>¥${168*state.qty}</strong></div><span class="checkout-label">${t('待店内确认 · 未付款','Confirm in store · Not paid')}</span></div>`;}
function render(){document.querySelector('.layout').classList.toggle('story-mode',state.step===2);document.documentElement.lang=state.lang==='zh'?'zh-CN':'en';document.querySelector('.brand').setAttribute('aria-label',t('中轴寻香首页','Zhongzhou Xunxiang home'));document.title=t('中轴寻香 · 门店选香原型','ZHONGZHOU XUNXIANG · Find your scent');el('language').textContent=state.lang==='zh'?'English':'中文';el('prototype').textContent=t('交互原型 · 非正式销售','INTERACTIVE PROTOTYPE');el('image-label').textContent=t('AI 概念图 · 非实物','AI concept image');el('editorial-title').innerHTML=t('香有来处，<br>遇见是缘。','Rooted in nature.<br>Found by you.');el('editorial-sub').textContent=t('以木、火、土、金、水为灵感，将草本、树脂与木香的不同韵致，融入五款随身香饰。','Inspired by Wood, Fire, Earth, Metal and Water, five wearable scents explore the character of herbs, resins and woods.');document.querySelector('.editorial').classList.toggle('compact',state.step>0);const labels=[['欢迎','Welcome'],['生日','Birthday'],['故事','Story'],['试香','Scent'],['手串','Bracelet'],['选购','Selection']];el('progress').className='progress';el('progress').innerHTML=labels.map((v,i)=>`<button data-step="${i}" class="${i===state.step?'current':i<state.step?'complete':''}" ${i>state.furthest?'disabled':''} ${i===state.step?'aria-current="step"':''} aria-label="${i+1}. ${tx(v)}"><span class="bar"></span><span class="step-label">${String(i+1).padStart(2,'0')} ${tx(v)}</span></button>`).join('');el('screen').className='screen';el('screen').innerHTML=[welcome,birthday,story,scents,detail,confirm][state.step]();el('footer').className='footer';el('footer').innerHTML=`<span>${t('文化与香气体验 · 非医疗建议','Culture & scent · Not medical advice')}<br>${t('中轴寻香 · 北京','ZHONGZHOU XUNXIANG · BEIJING')}</span><button data-action="reset">${t('重新体验','Start over')}</button>`;if(state.step===3&&!state.selected)el('screen').querySelector('[data-action="to-detail"]').disabled=true;}
function readBirth(){if(state.step===1){for(const key of ['year','month','day'])state.birth[key]=el(key).value;}}
function submitBirth(){readBirth();if(!validBirth(state.birth)){el('birth-error').textContent=t('请填写 1900 年至今天之间的有效公历日期。','Enter a valid Gregorian date between 1900 and today.');return false;}state.profile=demoProfile(state.birth);resetStory();state.selected=state.profile.id;state.qty=1;state.furthest=2;navigate(2);return true;}
function reset(){resetStory();state.birth={year:'',month:'',day:''};state.profile=null;state.selected=null;state.qty=1;state.furthest=0;navigate(0);}
document.addEventListener('click',e=>{const button=e.target.closest('button');if(!button||button.disabled)return;if(button.id==='language'){readBirth();state.lang=state.lang==='zh'?'en':'zh';render();return;}if(button.dataset.step!==undefined){readBirth();navigate(+button.dataset.step);return;}const action=button.dataset.action;if(action==='start')navigate(1);if(action==='back'){readBirth();navigate(Math.max(0,state.step-1));}if(action==='sample'){state.birth={year:'1990',month:'4',day:'10'};render();submitBirth();}if(action==='to-scents')navigate(3);if(action==='choose'){state.selected=button.dataset.id;render();document.querySelector(`[data-id="${state.selected}"]`).focus({preventScroll:true});}if(action==='to-detail'&&state.selected)navigate(4);if(action==='minus'||action==='plus'){state.qty=Math.max(1,Math.min(9,state.qty+(action==='plus'?1:-1)));render();}if(action==='to-confirm')navigate(5);if(action==='finish'){state.done=true;render();window.scrollTo({top:0,behavior:'instant'});}if(action==='reset')reset();});
document.addEventListener('change',e=>{if(e.target.id==='store')state.store=e.target.value;});
document.querySelector('.brand').addEventListener('click',e=>{e.preventDefault();readBirth();navigate(0);});
document.addEventListener('submit',e=>{if(e.target.id==='birth-form'){e.preventDefault();submitBirth();}});
window.addEventListener('popstate',e=>{state.step=Math.min(e.state?.step??0,state.furthest);if(state.step>1&&!state.profile)state.step=0;state.done=false;render();});
history.replaceState({step:0},'','#welcome');render();
if(document.modelContext?.registerTool){try{const result=document.modelContext.registerTool({name:'read_scent_prototype_state',title:'Read current scent selection',description:'Read the current demonstration screen and scent selection. Does not place an order.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute:()=>({step:state.step,language:state.lang,store:state.store,selected:state.selected,quantity:state.qty,storyChapter:storyUI.chapter,exploredQi:storyUI.qi,exploredSign:storyUI.sign,isPrototype:true,orderCreated:false})});Promise.resolve(result).catch(()=>{});}catch{}}
