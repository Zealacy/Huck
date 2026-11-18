// Pacific Huck career mode (play as one player for four years), removed from the game in Version 13.
// This is the code that was taken out of src/pacific-huck.html. See README.md in this folder for how to
// plug it back in. It calls saveCareer(); in the main file that function is now called saveProgram().

const SAVE_KEY='pacific-huck-career-v1';

const xpNeed=l=>90+30*(l-1);

const upCost=r=>r<=3?2:r-1;

const START={H:{thr:6,spd:3,hnd:4,jmp:3,def:3,sta:3},C:{thr:3,spd:5,hnd:5,jmp:3,def:3,sta:3},D:{thr:3,spd:4,hnd:3,jmp:4,def:5,sta:3}};

function loadCareer(){try{const s=localStorage.getItem(SAVE_KEY);return s?migrate(JSON.parse(s)):null}catch(e){return null}}

function showCreate(){
  let pos='C';
  let first=pick(FIRST),last=pick(LAST),num=randi(0,99);
  const render=()=>{
    const s=START[pos];
    show(`<div class="screen"><div class="panel" style="width:calc(var(--u)*720)">
      <div class="row between"><div><div class="eyebrow">New career · Freshman year</div><h2>Make your player</h2></div><button class="btn alt small" id="cback">Back</button></div>
      <div class="form-row">
        <label class="field" for="fn">First name<input id="fn" maxlength="14" value="${esc(first)}"></label>
        <label class="field" for="ln">Last name<input id="ln" maxlength="16" value="${esc(last)}"></label>
        <label class="field" for="nm">Number<input id="nm" type="number" min="0" max="99" value="${num}"></label>
        <button class="btn alt small" id="reroll">Random</button>
      </div>
      <div class="pos-cards">${['H','C','D'].map(k=>`<button class="pos-card" data-pos="${k}" aria-pressed="${k===pos}"><b>${POS[k]}</b><span>${{H:'Runs the offense. Big throws, break marks, handles the reset.',C:'Gets open downfield. Fast, sure hands, catches the goals.',D:'Lives on defense. Gets blocks and sky battles.'}[k]}</span><span class="dim">${ATTR.map(a=>`${ATTR_SHORT[a]} ${START[k][a]}`).join(' · ')}</span></button>`).join('')}</div>
      <p class="dim">You start as a freshman with ${ATTR.reduce((t,a)=>t+s[a],0)} rating points. Play four seasons, earn XP for wins, goals, assists and blocks, and spend skill points to grow.</p>
      <div class="row end"><button class="btn" id="cnext" data-primary>Choose your school <span class="kbd">Enter</span></button></div>
    </div></div>`);
    const grab=()=>{first=document.getElementById('fn').value.trim()||first;last=document.getElementById('ln').value.trim()||last;num=clamp(parseInt(document.getElementById('nm').value,10)||0,0,99)};
    ui.querySelectorAll('.pos-card').forEach(b=>b.addEventListener('click',()=>{grab();pos=b.dataset.pos;SFX.click();render()}));
    on('reroll',()=>{first=pick(FIRST);last=pick(LAST);num=randi(0,99);render()});
    on('cback',showTitle);
    on('cnext',()=>{grab();showTeamPick('New career','Pick your school',null,id=>startCareer({first,last,num,pos},id),showCreate)});
  };
  render();
}

function startCareer(info,teamId){
  const me=Object.assign({id:'me',first:info.first.slice(0,14),last:info.last.slice(0,16),num:info.num,pos:info.pos,skin:randi(0,4),hair:randi(0,6),style:randi(0,2),grade:9},START[info.pos]);
  const rosters={},prestige={};
  for(const t of TEAMS){
    prestige[t.id]=t.elite?5:randi(1,5);
    const ro=genRoster(Math.random,prestige[t.id],t.elite);
    if(t.id===teamId){
      // you take a roster spot: drop a non-star with your position (or any non-star)
      let i=ro.findIndex(p=>p.pos===info.pos&&p.tier===0);if(i<0)i=ro.findIndex(p=>p.tier===0);if(i<0)i=ro.length-1;
      ro.splice(i,1);
      ro.forEach(p=>{if(p.num===me.num)p.num=(p.num+11)%100});
    }
    rosters[t.id]=ro;
  }
  CAR={v:1,me,teamId,year:1,level:1,xp:0,sp:2,rosters,prestige,titles:0,history:[],totals:{gp:0,w:0,l:0,g:0,a:0,d:0,c:0,ct:0,to:0},awards:[]};
  newSeason();saveCareer();showHub();
}

function careerGameEnd(res){
  const S=CAR.season,ng=nextGame(),s=res.stats.me||{g:0,a:0,d:0,c:0,ct:0,to:0};
  for(const k of['g','a','d','c','ct','to']){S.stats[k]+=s[k];CAR.totals[k]+=s[k]}
  S.stats.gp++;CAR.totals.gp++;
  if(res.win){S.stats.w++;CAR.totals.w++}else{S.stats.l++;CAR.totals.l++}
  // XP
  const lines=[];const add=(l,v)=>{if(v>0)lines.push([l,v])};
  if(!res.forfeit){
    add(res.win?'Win':'Played the game',res.win?50:25);
    add(`Goals × ${s.g}`,s.g*14);add(`Assists × ${s.a}`,s.a*14);add(`Blocks × ${s.d}`,s.d*12);
    add(`Catches × ${s.ct}`,s.ct*2);add(`Completions × ${s.c}`,s.c*2);
    const pts=(res.pp||{}).me||0;add(`Points played × ${pts}`,pts*3);
    if(ng.kind==='po')add('Playoff game',20);
  }
  const total=lines.reduce((t,l)=>t+l[1],0);
  CAR.xp+=total;let ups=0;
  while(CAR.xp>=xpNeed(CAR.level)){CAR.xp-=xpNeed(CAR.level);CAR.level++;CAR.sp+=3;ups++}
  recordResult(res,ng);
  saveCareer();
  if(ups)SFX.level();
  const me=TEAM(CAR.teamId),op=TEAM(ng.opp);
  show(`<div class="screen"><div class="panel" style="width:calc(var(--u)*760)">
    <div class="eyebrow">${esc(ng.label)}</div>
    <h2 class="${res.win?'gold':'bad'}">${res.forfeit?'Forfeit':res.win?'Win':'Loss'} · ${esc(me.abbr)} ${res.us}–${res.them} ${esc(op.abbr)}</h2>
    <div class="two">
      <div>${boxScore(res,myRoster())}</div>
      <div class="card">
        <h3>Your game</h3>
        <div>${s.g} goals · ${s.a} assists · ${s.d} blocks · ${s.to} turnovers</div>
        <table><tbody>${lines.map(l=>`<tr><td>${esc(l[0])}</td><td class="n gold">+${l[1]} XP</td></tr>`).join('')||'<tr><td class="dim">No XP for a forfeit.</td></tr>'}</tbody></table>
        ${ups?`<div class="levelup">Level up! Now level ${CAR.level}. +${ups*3} skill points</div>`:''}
        <div class="dim">Level ${CAR.level}: ${CAR.xp} / ${xpNeed(CAR.level)} XP</div>
      </div>
    </div>
    <div class="row end"><button class="btn" id="tohub" data-primary>Back to the team <span class="kbd">Enter</span></button></div>
  </div></div>`);
  on('tohub',showHub);
}

function playCareerGame(){
  const ng=nextGame();
  const me={team:TEAM(CAR.teamId),ro:myRoster()},opp={team:TEAM(ng.opp),ro:rosterOf(ng.opp)};
  pregame({me,opp,home:ng.home,label:ng.label,meId:'me',career:true,onEnd:careerGameEnd,back:showHub});
}

function attrRows(){
  return ATTR.map(a=>{const v=CAR.me[a],c=upCost(v),can=v<10&&CAR.sp>=c;
    return`<div class="attr" title="${esc(ATTR_HINT[a])}"><span>${ATTR_NAME[a]}</span><div class="pips">${Array.from({length:10},(_,i)=>`<span class="${i<v?'on':''}"></span>`).join('')}</div><span class="v">${v}</span>
    <button class="plus" data-up="${a}" ${can?'':'disabled'} aria-label="Upgrade ${ATTR_NAME[a]} for ${c} skill points">${v>=10?'MAX':`+1 · ${c}SP`}</button></div>`}).join('');
}

function showHub(){
  if(!G||!G.demo)startDemo();
  const S=CAR.season,t=TEAM(CAR.teamId),me=CAR.me,ng=nextGame(),st=S.standings[CAR.teamId];
  const sched=S.schedule.map((g,i)=>{const o=TEAM(g.opp);const r=g.res?`<span class="${g.res[0]>g.res[1]?'good':'bad'}">${g.res[0]>g.res[1]?'W':'L'} ${g.res[0]}–${g.res[1]}</span>`:'<span class="dim">–</span>';
    return`<div class="${S.phase==='reg'&&i===S.week?'next':''}"><span>W${i+1}</span><span>${g.home?'vs':'at'} ${esc(o.name)}</span>${r}</div>`}).join('');
  const po=S.bracket?S.bracket.map((r,ri)=>r.map(m=>{const mine=m.a===CAR.teamId||m.b===CAR.teamId;const res=m.res?`${m.res[0]}–${m.res[1]}`:'';return`<div class="${mine&&!m.res?'next':''}"><span>${['QF','SF','F'][ri]}</span><span>${esc(TEAM(m.a).abbr)} vs ${esc(TEAM(m.b).abbr)}${m.win?` · <b class="${m.win===CAR.teamId?'good':''}">${esc(TEAM(m.win).abbr)}</b>`:''}</span><span class="dim">${res}</span></div>`}).join('')).join(''):'';
  const ranks=sortedStandings().slice(0,8).map((id,i)=>{const s=S.standings[id];return`<tr class="${id===CAR.teamId?'me':''}"><td>${i+1}</td><td class="trunc">${esc(TEAM(id).name)}</td><td class="n">${s.w}-${s.l}</td><td class="n">${s.pf-s.pa>0?'+':''}${s.pf-s.pa}</td></tr>`}).join('');
  let next;
  if(ng){const o=TEAM(ng.opp),oro=rosterOf(ng.opp);
    next=`<div class="nextbox"><div class="eyebrow">${esc(ng.label)}</div><div class="big">${ng.home?'vs':'at'} ${esc(o.name)}</div>
    <div class="dim">${esc(o.city)}, ${o.st} · OVR ${teamRating(oro).toFixed(1)} · Top star: ${esc(pname(topStars(oro,1)[0]))} ${'★'.repeat(starsOf(topStars(oro,1)[0]))}</div>
    <div class="row"><button class="btn" id="play" data-primary>Play game <span class="kbd">Enter</span></button></div></div>`;
  }else{
    const last=CAR.year>=4;
    next=`<div class="nextbox"><div class="eyebrow">Season ${CAR.year} complete</div><div class="big">${esc(S.finish||'')}</div>
    <div class="dim">Champion: ${esc(TEAM(S.champ).name)}. ${S.awards.length?'Your awards: '+S.awards.map(esc).join(', ')+'.':'No individual awards this year.'}</div>
    <div class="row"><button class="btn" id="nexts" data-primary>${last?'Graduate':'Start next season'} <span class="kbd">Enter</span></button></div></div>`;
  }
  show(`<div class="screen"><div class="panel hub">
    <div class="row between"><div><div class="eyebrow">Year ${CAR.year} of 4 · ${GRADE[me.grade]}</div><h2>${esc(t.name)}</h2><div class="dim">${esc(t.city)}, ${STATE_NAME[t.st]} · Record ${st.w}-${st.l}</div></div>
      <div class="row"><button class="btn alt small" id="roster">Roster</button><button class="btn alt small" id="quit">Save and exit</button></div></div>
    <div class="hub-grid">
      <section class="card">
        <div class="row between"><div class="me-name">${esc(pname(me))}</div><span class="badge">#${me.num} ${POS[me.pos].toUpperCase()}</span></div>
        <div class="row between"><span class="stars">${starStr(starsOf(me))}</span><span class="dim">OVR ${ovr(me).toFixed(1)}</span></div>
        <div class="row between"><span>Level ${CAR.level}</span><span class="dim">${CAR.xp} / ${xpNeed(CAR.level)} XP</span></div>
        <div class="xpbar"><i style="width:${Math.round(100*CAR.xp/xpNeed(CAR.level))}%"></i></div>
        <div class="row between"><span class="sp">${CAR.sp} skill points</span><span class="dim" style="font-size:calc(var(--u)*12)">Hover a stat to see what it does</span></div>
        ${attrRows()}
        <div class="dim" style="font-size:calc(var(--u)*13)">Season: ${S.stats.g} G · ${S.stats.a} A · ${S.stats.d} D in ${S.stats.gp} games. Career titles: ${CAR.titles}.</div>
      </section>
      <section class="card">
        ${next}
        <div class="two">
          <div><h3>${S.phase==='reg'?'Schedule':'Bracket'}</h3><div class="sched">${S.phase==='reg'?sched:po}</div></div>
          <div><h3>Standings</h3><table><tbody>${ranks}</tbody></table><div class="dim" style="font-size:calc(var(--u)*12)">Top 8 make the Pacific Championships.</div></div>
        </div>
      </section>
    </div>
  </div></div>`);
  ui.querySelectorAll('[data-up]').forEach(b=>b.addEventListener('click',()=>{const a=b.dataset.up,c=upCost(CAR.me[a]);if(CAR.sp>=c&&CAR.me[a]<10){CAR.sp-=c;CAR.me[a]++;saveCareer();SFX.level();showHub()}}));
  on('play',playCareerGame);
  on('nexts',()=>{if(CAR.year>=4)showGraduation();else{advanceSeason();showHub()}});
  on('roster',showRoster);
  on('quit',()=>{saveCareer();showTitle()});
}

function showRoster(){
  const ro=myRoster().slice().sort((a,b)=>ovr(b)-ovr(a)),t=TEAM(CAR.teamId);
  show(`<div class="screen"><div class="panel" style="width:calc(var(--u)*760)">
    <div class="row between"><div><div class="eyebrow">Roster</div><h2>${esc(t.name)}</h2></div><button class="btn" id="rb" data-primary>Back</button></div>
    <table><thead><tr><th>Player</th><th>Pos</th><th>Year</th>${ATTR.map(a=>`<th class="n">${ATTR_SHORT[a]}</th>`).join('')}<th>Stars</th></tr></thead><tbody>
    ${ro.map(p=>`<tr class="${p.id==='me'?'me':''}"><td>#${p.num} ${esc(pname(p))}</td><td>${POS[p.pos]}</td><td>${GRADE[p.grade]||''}</td>${ATTR.map(a=>`<td class="n">${p[a]}</td>`).join('')}<td class="stars">${starStr(starsOf(p))}</td></tr>`).join('')}
    </tbody></table>
    <p class="dim" style="font-size:calc(var(--u)*13)">14 players: seven take the field each point. Seniors graduate each spring and freshmen join. Players improve every year until they reach their potential.</p>
  </div></div>`);
  on('rb',showHub);
}

function advanceSeason(){
  CAR.year++;CAR.me.grade++;CAR.sp+=5;
  for(const t of TEAMS){
    const ro=CAR.rosters[t.id],used=new Set(ro.map(p=>p.num).concat(t.id===CAR.teamId?[CAR.me.num]:[]));
    for(let i=0;i<ro.length;i++){
      const p=ro[i];p.grade++;
      if(p.grade>12){
        used.delete(p.num);
        const tier=t.elite&&Math.random()<.35||CAR.prestige[t.id]>=4&&Math.random()<.2?1:0;
        const np=genPlayer(Math.random,p.pos,tier,used,9);shapeTier(np,tier,Math.random);
        np.pot=TIER_POT[tier]-Math.random()*.3;
        for(let k=0;k<4;k++){const a=pick(ATTR);np[a]=Math.max(1,np[a]-1)} // freshmen start raw and grow
        ro[i]=np;
      }
      else for(let k=0;k<2;k++)if(Math.random()<.7&&ovr(p)<(p.pot||9)){const a=pick(ATTR);p[a]=clamp(p[a]+1,1,10)}
    }
    CAR.prestige[t.id]=clamp(CAR.prestige[t.id]+randi(-1,1),t.elite?4:1,5);
  }
  newSeason();saveCareer();
}

function showGraduation(){
  const o=ovr(CAR.me),T=CAR.totals;
  const tier=o>=8.5?'Invited to a youth national team tryout, with top college programs calling':o>=7.5?'Recruited to play for a top college program':o>=6.5?'Starting for a college club team as a freshman':'Walking on to a college club team';
  const hist=CAR.history.map(h=>`<tr><td>${esc(h.grade)}</td><td class="n">${h.w}-${h.l}</td><td>${esc(h.finish)}</td><td class="n">${h.g}</td><td class="n">${h.a}</td><td class="n">${h.d}</td></tr>`).join('');
  SFX.level();
  show(`<div class="screen"><div class="panel" style="width:calc(var(--u)*720)">
    <div class="eyebrow">Graduation · ${esc(TEAM(CAR.teamId).name)}</div><h2>${esc(pname(CAR.me))}, class of ${new Date().getFullYear()+1}</h2>
    <p class="gold">${tier}.</p>
    <table><thead><tr><th>Year</th><th class="n">W-L</th><th>Finish</th><th class="n">G</th><th class="n">A</th><th class="n">D</th></tr></thead><tbody>${hist}</tbody></table>
    <p>Career: ${T.g} goals, ${T.a} assists, ${T.d} blocks in ${T.gp} games. ${CAR.titles} Pacific title${CAR.titles===1?'':'s'}. Final OVR ${o.toFixed(1)}.</p>
    ${CAR.awards.length?`<p class="dim">Awards: ${CAR.awards.map(esc).join(' · ')}</p>`:''}
    <div class="row end"><button class="btn" id="grad" data-primary>Start a new career</button></div>
  </div></div>`);
  on('grad',()=>{CAR=null;saveCareer();showCreate()});
}

// endSeasonAwards() as it was with both modes:
function endSeasonAwards(){
  if(CAR.mode==='coach'){coachSeasonEnd();return}
  const S=CAR.season,st=S.stats,o=ovr(CAR.me),pg=st.gp?(st.g+st.a+st.d)/st.gp:0;
  const aw=[];
  if(S.champ===CAR.teamId)aw.push('Pacific Champions');
  if(o>=8.4&&st.gp&&st.w/st.gp>=.7)aw.push('Pacific Player of the Year');
  if(o>=7.2||pg>=3)aw.push('All-Pacific First Team');
  else if(o>=6||pg>=2)aw.push('All-Pacific Second Team');
  S.awards=aw;CAR.awards=CAR.awards.concat(aw.map(a=>`${a} (${GRADE[CAR.me.grade]})`));
  CAR.history.push({year:CAR.year,grade:GRADE[CAR.me.grade],w:st.w,l:st.l,finish:S.finish,g:st.g,a:st.a,d:st.d,champ:TEAM(S.champ).name});
}

// title screen button (career):
      ${C?`<button class="btn" id="cont" data-primary>Continue: ${esc(C.me.last)}, ${GRADE[C.me.grade]||'Senior'}</button>`:''}

// title screen handlers (career):
  on('cont',()=>{CAR=C;showHub()});
  on('newc',()=>C?confirmScreen('Start a new career?',`This replaces ${esc(pname(C.me))}'s career at ${esc(TEAM(C.teamId).name)}.`,'Start a new career',showCreate,showTitle):showCreate());


// boot (career save restore):
  if(data&&data.career)try{localStorage.setItem(SAVE_KEY,JSON.stringify(data.career))}catch(e){}
