// Hindi Varnamala Quest - Main Interactive Game Engine

class VarnamalaQuestApp {
  constructor() {
    this.storageKey = 'hindi_varnamala_quest_v1';
    this.state = {
      stars: 0,
      bridgeLang: 'te', // Default to Telugu or let kid switch immediately (en, ta, te, kn, ml)
      avatarId: 'peacock',
      masteredLetters: {}, // { letterId: true }
      completedIslands: {}, // { islandId: true }
      unlockedStickers: {}, // { stickerId: true }
      activeTab: 'quest', // 'quest' | 'chart' | 'twins' | 'arcade' | 'stickers'
      // Active Quest Lesson State
      activeIslandId: null,
      questStep: 1, // 1: Learn, 2: Trace, 3: Quiz, 4: WordBuilder
      letterIndex: 0,
      tracedInSession: {},
      // Quiz / WordBuilder state
      quizQuestions: [],
      quizIdx: 0,
      quizScore: 0,
      wordIdx: 0,
      builtWordLetters: [],
      // Chart filter
      chartFilter: 'all', // 'all' | 'swar' | 'vyanjan' | 'shape3'
      // Arcade state
      arcadeScore: 0,
      arcadeStreak: 0,
      arcadeQuestion: null
    };

    this.traceCtx = null;
    this.isDrawing = false;
    this.strokeCount = 0;
    this.drawnPixels = 0;
    this.brushColor = '#FF5252';

    this.loadState();
    this.initDOM();
    this.render();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state = { ...this.state, ...parsed };
      }
    } catch (e) {
      console.warn('Could not load saved state:', e);
    }
  }

  saveState() {
    try {
      const toSave = {
        stars: this.state.stars,
        bridgeLang: this.state.bridgeLang,
        avatarId: this.state.avatarId,
        masteredLetters: this.state.masteredLetters,
        completedIslands: this.state.completedIslands,
        unlockedStickers: this.state.unlockedStickers
      };
      localStorage.setItem(this.storageKey, JSON.stringify(toSave));
    } catch (e) {
      console.warn('Could not save state:', e);
    }
  }

  addStars(amount) {
    this.state.stars += amount;
    this.saveState();
    this.updateHeaderUI();
  }

  markLetterMastered(letterId) {
    if (!this.state.masteredLetters[letterId]) {
      this.state.masteredLetters[letterId] = true;
      this.state.stars += 5;
      this.saveState();
      this.updateHeaderUI();
    }
  }

  unlockSticker(stickerId) {
    if (!this.state.unlockedStickers[stickerId]) {
      this.state.unlockedStickers[stickerId] = true;
      this.saveState();
      const sticker = window.VARNAMALA_DATA.stickers.find(s => s.id === stickerId);
      if (sticker) {
        this.showToast(`🎉 New Sticker Unlocked: ${sticker.emoji} ${sticker.name}!`);
      }
    }
  }

  initDOM() {
    // Bridge Language Selector
    const select = document.getElementById('bridgeLangSelect');
    if (select) {
      select.innerHTML = window.VARNAMALA_DATA.bridgeLanguages
        .map(b => `<option value="${b.id}" ${b.id === this.state.bridgeLang ? 'selected' : ''}>${b.flag} ${b.label}</option>`)
        .join('');
      select.addEventListener('change', e => {
        this.state.bridgeLang = e.target.value;
        window.soundFX.playClick(700);
        this.saveState();
        this.renderMainView();
      });
    }

    // Avatar Click
    const avatarBtn = document.getElementById('avatarBtn');
    if (avatarBtn) {
      avatarBtn.addEventListener('click', () => {
        window.soundFX.playClick();
        this.openAvatarModal();
      });
    }

    // Navigation Tabs
    document.querySelectorAll('.nav-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        window.soundFX.playClick();
        this.state.activeTab = tab;
        this.state.activeIslandId = null;
        this.render();
      });
    });
  }

  updateHeaderUI() {
    const avatar = window.VARNAMALA_DATA.avatars.find(a => a.id === this.state.avatarId) || window.VARNAMALA_DATA.avatars[0];
    const avatarBtn = document.getElementById('avatarBtn');
    if (avatarBtn) avatarBtn.textContent = avatar.emoji;

    const starEl = document.getElementById('starCount');
    if (starEl) starEl.textContent = this.state.stars;

    const masteredCount = Object.keys(this.state.masteredLetters).length;
    const totalCount = window.ALL_LETTERS.length;
    const masteryEl = document.getElementById('masteryCount');
    if (masteryEl) masteryEl.textContent = `${masteredCount} / ${totalCount} Letters`;

    document.querySelectorAll('.nav-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === this.state.activeTab);
    });
  }

  getBridgeText(letterObj) {
    const lang = this.state.bridgeLang;
    if (lang === 'en' || !letterObj.bridge || !letterObj.bridge[lang]) {
      return `Sound: "${letterObj.roman}"`;
    }
    const langNames = { ta: 'Tamil', te: 'Telugu', kn: 'Kannada', ml: 'Malayalam' };
    return `${langNames[lang]}: ${letterObj.bridge[lang]} (${letterObj.roman})`;
  }

  render() {
    this.updateHeaderUI();
    this.renderMainView();
  }

  renderMainView() {
    const main = document.getElementById('mainContent');
    if (!main) return;

    if (this.state.activeTab === 'quest') {
      if (this.state.activeIslandId) {
        this.renderQuestLesson(main);
      } else {
        this.renderQuestMap(main);
      }
    } else if (this.state.activeTab === 'chart') {
      this.renderVarnamalaChart(main);
    } else if (this.state.activeTab === 'twins') {
      this.renderLookAlikeTwins(main);
    } else if (this.state.activeTab === 'arcade') {
      this.renderArcadeMode(main);
    } else if (this.state.activeTab === 'stickers') {
      this.renderStickerBook(main);
    }
  }

  // =========================================================================
  // 1. QUEST ISLAND MAP
  // =========================================================================
  renderQuestMap(container) {
    const islands = window.VARNAMALA_DATA.questIslands;

    let html = `
      <div class="quest-welcome-banner">
        <div class="quest-welcome-text">
          <h2>🗺️ Welcome to Varnamala Island Quest!</h2>
          <p>Learn Hindi letters with visual shape tricks, Dragon Breath secrets, and your home language bridge!</p>
        </div>
        <div class="secret-tip-pill">
          💡 <strong>South India Super-Secret:</strong> Hindi Varnamala has the <em>exact same</em> vowel & consonant order as Telugu, Kannada, Malayalam & Tamil! You already know the sounds — let's match the shapes!
        </div>
      </div>

      <div class="islands-grid">
    `;

    islands.forEach(island => {
      const letters = island.letterIds.map(id => window.VARNAMALA_MAP[id]).filter(Boolean);
      const masteredInIsland = letters.filter(l => this.state.masteredLetters[l.id]).length;
      const isCompleted = this.state.completedIslands[island.id] || masteredInIsland === letters.length;

      html += `
        <div class="island-card" style="background: ${island.bgGradient};">
          <div>
            <div class="island-header">
              <div class="island-icon">${island.emoji}</div>
              <div>
                <span class="island-badge">Island ${island.number} ${isCompleted ? '✅ COMPLETED' : ''}</span>
                <h3 class="island-title">${island.title}</h3>
              </div>
            </div>
            <p class="island-desc">${island.subtitle}</p>
            <div class="island-letters-preview">
              ${letters.map(l => `
                <div class="mini-letter-chip hindi-font ${this.state.masteredLetters[l.id] ? 'mastered' : ''}" 
                     onclick="app.quickSpeak('${l.id}', event)" title="Click to hear ${l.roman}">
                  ${l.letter} <small style="font-size:0.75rem;opacity:0.75;">${l.roman}</small>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="island-footer">
            <span class="island-progress-text">⭐ ${masteredInIsland}/${letters.length} Mastered</span>
            <button class="btn-3d" onclick="app.startIsland('${island.id}')">
              ${isCompleted ? '🔄 Play Again' : '🚀 Start Quest'}
            </button>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  }

  quickSpeak(letterId, event) {
    if (event) event.stopPropagation();
    const letterObj = window.VARNAMALA_MAP[letterId];
    if (letterObj) {
      window.soundFX.speakLetterAndWord(letterObj);
    }
  }

  startIsland(islandId) {
    window.soundFX.playClick(680);
    this.state.activeIslandId = islandId;
    this.state.questStep = 1;
    this.state.letterIndex = 0;
    this.state.tracedInSession = {};
    this.renderMainView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // =========================================================================
  // 2. ACTIVE ISLAND 4-STEP INTERACTIVE QUEST
  // =========================================================================
  renderQuestLesson(container) {
    const island = window.VARNAMALA_DATA.questIslands.find(i => i.id === this.state.activeIslandId);
    if (!island) return;
    const letters = island.letterIds.map(id => window.VARNAMALA_MAP[id]).filter(Boolean);
    const currentLetter = letters[this.state.letterIndex] || letters[0];

    let stepContent = '';
    if (this.state.questStep === 1) {
      stepContent = this.buildStep1LearnHTML(island, letters, currentLetter);
    } else if (this.state.questStep === 2) {
      stepContent = this.buildStep2TraceHTML(island, letters, currentLetter);
    } else if (this.state.questStep === 3) {
      stepContent = this.buildStep3QuizHTML(island, letters);
    } else if (this.state.questStep === 4) {
      stepContent = this.buildStep4WordBuilderHTML(island);
    }

    container.innerHTML = `
      <div class="quest-stage-container">
        <div class="quest-top-bar">
          <button class="btn-3d blue" onclick="app.exitIsland()">⬅️ Back to Islands</button>
          <h2 style="font-size:1.4rem;color:#2D3436;">${island.emoji} ${island.title}</h2>
          <div class="step-pills">
            <div class="step-pill ${this.state.questStep === 1 ? 'active' : ''}" onclick="app.goToQuestStep(1)">1. Meet & Trick 🧠</div>
            <div class="step-pill ${this.state.questStep === 2 ? 'active' : ''}" onclick="app.goToQuestStep(2)">2. Rainbow Trace 🎨</div>
            <div class="step-pill ${this.state.questStep === 3 ? 'active' : ''}" onclick="app.goToQuestStep(3)">3. Sound Battle 🎯</div>
            <div class="step-pill ${this.state.questStep === 4 ? 'active' : ''}" onclick="app.goToQuestStep(4)">4. Word Kitchen 🍲</div>
          </div>
        </div>
        ${stepContent}
      </div>
    `;

    if (this.state.questStep === 2) {
      setTimeout(() => this.initTracingCanvas(currentLetter), 30);
    }
  }

  exitIsland() {
    window.soundFX.playClick();
    this.state.activeIslandId = null;
    this.renderMainView();
  }

  goToQuestStep(step) {
    window.soundFX.playClick();
    this.state.questStep = step;
    if (step === 3) {
      this.setupIslandQuiz();
    } else if (step === 4) {
      this.state.wordIdx = 0;
      this.state.builtWordLetters = [];
    }
    this.renderMainView();
  }

  // --- STEP 1: MEET & REMEMBER ---
  buildStep1LearnHTML(island, letters, cur) {
    const bridgeStr = this.getBridgeText(cur);

    return `
      <div class="learn-grid">
        <div class="big-letter-showcase">
          <span style="font-weight:800;color:#B33939;font-size:0.95rem;">TAP THE LETTER TO HEAR IT! 🔊</span>
          <div class="huge-hindi-char hindi-font" onclick="window.soundFX.speakLetterAndWord(window.VARNAMALA_MAP['${cur.id}'])">
            ${cur.letter}
          </div>
          <div class="phonetic-badges">
            <span class="phonetic-badge">"${cur.roman.toUpperCase()}"</span>
            <span class="bridge-script-badge">${bridgeStr}</span>
          </div>
          <div class="sound-hint-box">
            👂 Sounds like: <strong>${cur.soundHint}</strong>
          </div>
          <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;">
            <button class="btn-3d" onclick="window.soundFX.speakHindi('${cur.ttsText || cur.letter}', '${cur.roman}', 0.75)">
              🔊 Hear Letter
            </button>
            <button class="btn-3d green" onclick="window.soundFX.speakLetterAndWord(window.VARNAMALA_MAP['${cur.id}'])">
              🗣️ Say "${cur.letter} से ${cur.wordHindi.split('/')[0].trim()}"
            </button>
          </div>
        </div>

        <div class="memory-tricks-column">
          <div class="word-association-card" onclick="window.soundFX.speakLetterAndWord(window.VARNAMALA_MAP['${cur.id}'])">
            <div class="word-emoji-circle">${cur.emoji}</div>
            <div class="word-texts">
              <span style="font-size:0.85rem;font-weight:800;color:#636E72;">PICTURE WORD (TAP TO LISTEN)</span>
              <h3 class="hindi-font">${cur.wordHindi}</h3>
              <div class="word-roman">${cur.wordRoman} — ${cur.wordMeaning}</div>
            </div>
          </div>

          <div class="memory-trick-box">
            <h4>🪄 Visual Shape Trick (How to Remember Forever!):</h4>
            <p>${cur.shapeTrick}</p>
          </div>

          <div class="breath-mouth-box">
            <div class="breath-info">
              <span>👄 Mouth Spot: ${cur.mouthZone || cur.vargaTitle}</span>
              <span style="color:#D63031;margin-top:4px;">💨 Breath Style: ${cur.breathType}</span>
            </div>
            ${cur.isDragon ? `
              <button class="btn-3d gold" onclick="app.triggerDragonBreath('${cur.id}')">
                🐉 Test Dragon Breath!
              </button>
            ` : `
              <span style="background:#FFFFFF;padding:6px 12px;border-radius:12px;font-weight:800;color:#00B894;border:2px solid #00B894;">
                ✨ Gentle Breath
              </span>
            `}
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:auto;padding-top:8px;">
            <button class="btn-3d blue" ${this.state.letterIndex === 0 ? 'disabled style="opacity:0.4"' : ''} onclick="app.changeLetter(-1)">
              ⬅️ Previous
            </button>
            <button class="btn-3d purple" onclick="app.goToQuestStep(2)">
              🎨 Trace "${cur.letter}" Now!
            </button>
            ${this.state.letterIndex < letters.length - 1 ? `
              <button class="btn-3d green" onclick="app.changeLetter(1)">
                Next Letter ➡️
              </button>
            ` : `
              <button class="btn-3d gold" onclick="app.goToQuestStep(2)">
                Go to Tracing Studio ➡️
              </button>
            `}
          </div>
        </div>
      </div>

      <div class="letter-carousel-bar">
        ${letters.map((l, idx) => `
          <button class="carousel-letter-btn hindi-font ${idx === this.state.letterIndex ? 'active' : ''} ${this.state.masteredLetters[l.id] ? 'done' : ''}"
                  onclick="app.selectLetterIdx(${idx})">
            ${l.letter}
          </button>
        `).join('')}
      </div>
    `;
  }

  triggerDragonBreath(letterId) {
    const letterObj = window.VARNAMALA_MAP[letterId];
    window.soundFX.playDragonPuff();
    setTimeout(() => {
      window.soundFX.speakHindi(letterObj.ttsText || letterObj.letter, letterObj.roman, 0.75);
    }, 320);
    this.showToast(`🐉 Put your palm in front of your mouth and say "${letterObj.roman.toUpperCase()}!" Feel that warm puff of air!`);
  }

  changeLetter(delta) {
    const island = window.VARNAMALA_DATA.questIslands.find(i => i.id === this.state.activeIslandId);
    if (!island) return;
    const curId = island.letterIds[this.state.letterIndex];
    this.markLetterMastered(curId);

    const nextIdx = Math.max(0, Math.min(island.letterIds.length - 1, this.state.letterIndex + delta));
    this.state.letterIndex = nextIdx;
    const nextLetter = window.VARNAMALA_MAP[island.letterIds[nextIdx]];
    window.soundFX.speakHindi(nextLetter.ttsText || nextLetter.letter, nextLetter.roman, 0.8);
    this.renderMainView();
  }

  selectLetterIdx(idx) {
    this.state.letterIndex = idx;
    const island = window.VARNAMALA_DATA.questIslands.find(i => i.id === this.state.activeIslandId);
    const letterObj = window.VARNAMALA_MAP[island.letterIds[idx]];
    window.soundFX.speakHindi(letterObj.ttsText || letterObj.letter, letterObj.roman, 0.8);
    this.renderMainView();
  }

  // --- STEP 2: RAINBOW TRACING STUDIO ---
  buildStep2TraceHTML(island, letters, cur) {
    const colors = ['#FF5252', '#FF7A00', '#00B894', '#0984E3', '#8854D0', '#F368E0'];
    return `
      <div class="tracing-studio">
        <div class="canvas-frame">
          <div style="display:flex;justify-content:space-between;width:100%;max-width:360px;margin-bottom:8px;align-items:center;">
            <span style="font-weight:800;color:#D66200;">✏️ Trace inside the dotted letter!</span>
            <button class="btn-3d blue" style="padding:5px 12px;font-size:0.9rem;" onclick="app.clearTraceCanvas()">🔄 Clear</button>
          </div>
          <canvas id="traceCanvas" width="340" height="320"></canvas>
          <div class="brush-palette">
            ${colors.map(c => `
              <div class="color-swatch ${this.brushColor === c ? 'active' : ''}" 
                   style="background:${c}" 
                   onclick="app.setBrushColor('${c}')"></div>
            `).join('')}
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:14px;">
          <div class="memory-trick-box">
            <h4>👑 Don't Forget the Roof (Shirorekha)!</h4>
            <p>1. First draw the curvy body of <strong>${cur.letter} (${cur.roman})</strong>.<br>
               2. Finish by drawing its flat <strong>roof line</strong> across the top!</p>
          </div>
          <div class="word-association-card" onclick="window.soundFX.speakLetterAndWord(window.VARNAMALA_MAP['${cur.id}'])">
            <div class="word-emoji-circle">${cur.emoji}</div>
            <div class="word-texts">
              <h3 class="hindi-font">${cur.letter} — ${cur.wordHindi}</h3>
              <div class="word-roman">${this.getBridgeText(cur)}</div>
            </div>
          </div>
          <button class="btn-3d green" style="font-size:1.2rem;padding:14px;" onclick="app.completeLetterTrace('${cur.id}')">
            🌟 I Traced "${cur.letter}"! (Claim +10 Stars)
          </button>
          <button class="btn-3d gold" onclick="app.goToQuestStep(3)">
            🎯 Ready for Sound Battle! ➡️
          </button>
        </div>
      </div>

      <div class="letter-carousel-bar">
        ${letters.map((l, idx) => `
          <button class="carousel-letter-btn hindi-font ${idx === this.state.letterIndex ? 'active' : ''} ${this.state.tracedInSession[l.id] ? 'done' : ''}"
                  onclick="app.selectLetterIdx(${idx})">
            ${l.letter}
          </button>
        `).join('')}
      </div>
    `;
  }

  initTracingCanvas(letterObj) {
    const canvas = document.getElementById('traceCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    this.traceCtx = ctx;
    this.drawnPixels = 0;
    this.drawGhostLetter(letterObj);

    const getPos = e => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * (canvas.width / rect.width),
        y: (clientY - rect.top) * (canvas.height / rect.height)
      };
    };

    const startDraw = e => {
      e.preventDefault();
      this.isDrawing = true;
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      window.soundFX.playSparkle();
    };

    const moveDraw = e => {
      if (!this.isDrawing) return;
      e.preventDefault();
      const pos = getPos(e);
      ctx.lineWidth = 18;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = this.brushColor;
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      this.drawnPixels += 1;
      if (this.drawnPixels % 18 === 0) {
        window.soundFX.playSparkle();
      }
    };

    const endDraw = () => {
      this.isDrawing = false;
    };

    canvas.onmousedown = startDraw;
    canvas.onmousemove = moveDraw;
    window.onmouseup = endDraw;

    canvas.ontouchstart = startDraw;
    canvas.ontouchmove = moveDraw;
    canvas.ontouchend = endDraw;
  }

  drawGhostLetter(letterObj) {
    const canvas = document.getElementById('traceCanvas');
    if (!canvas || !this.traceCtx) return;
    const ctx = this.traceCtx;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Subtle notebook guide lines
    ctx.strokeStyle = '#FFF3CD';
    ctx.lineWidth = 2;
    [70, 160, 260].forEach(y => {
      ctx.beginPath();
      ctx.moveTo(20, y);
      ctx.lineTo(canvas.width - 20, y);
      ctx.stroke();
    });

    // Ghost letter in center
    ctx.save();
    ctx.font = '700 195px "Noto Sans Devanagari", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#F1F2F6';
    ctx.fillText(letterObj.letter, canvas.width / 2, canvas.height / 2 + 12);

    ctx.lineWidth = 3;
    ctx.setLineDash([6, 6]);
    ctx.strokeStyle = '#B2BEC3';
    ctx.strokeText(letterObj.letter, canvas.width / 2, canvas.height / 2 + 12);
    ctx.restore();
  }

  clearTraceCanvas() {
    const island = window.VARNAMALA_DATA.questIslands.find(i => i.id === this.state.activeIslandId);
    const cur = window.VARNAMALA_MAP[island.letterIds[this.state.letterIndex]];
    this.drawnPixels = 0;
    this.drawGhostLetter(cur);
    window.soundFX.playClick(450);
  }

  setBrushColor(color) {
    this.brushColor = color;
    window.soundFX.playClick(750);
    document.querySelectorAll('.color-swatch').forEach(el => {
      el.classList.toggle('active', el.style.backgroundColor === color || el.getAttribute('onclick').includes(color));
    });
  }

  completeLetterTrace(letterId) {
    if (this.drawnPixels < 8) {
      this.showToast('✏️ Trace over the big letter on the pad first!');
      window.soundFX.playWrong();
      return;
    }
    window.soundFX.playCorrect();
    const letterObj = window.VARNAMALA_MAP[letterId];
    window.soundFX.speakHindi(letterObj.ttsText || letterObj.letter, letterObj.roman);
    this.markLetterMastered(letterId);
    this.state.tracedInSession[letterId] = true;
    this.addStars(10);
    this.unlockSticker('first_trace');

    const island = window.VARNAMALA_DATA.questIslands.find(i => i.id === this.state.activeIslandId);
    if (this.state.letterIndex < island.letterIds.length - 1) {
      this.state.letterIndex += 1;
      this.renderMainView();
    } else {
      this.showToast('🎉 Awesome tracing! Let\'s play the Sound Battle!');
      this.goToQuestStep(3);
    }
  }

  // --- STEP 3: ISLAND SOUND & SHAPE BATTLE ---
  setupIslandQuiz() {
    const island = window.VARNAMALA_DATA.questIslands.find(i => i.id === this.state.activeIslandId);
    if (!island) return;
    const pool = island.letterIds.map(id => window.VARNAMALA_MAP[id]).filter(Boolean);

    const questions = [];
    pool.forEach(target => {
      const distractors = window.ALL_LETTERS
        .filter(l => l.id !== target.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      const options = [target, ...distractors].sort(() => Math.random() - 0.5);
      questions.push({
        target,
        options,
        answered: false
      });
    });

    this.state.quizQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 6);
    this.state.quizIdx = 0;
    this.state.quizScore = 0;
  }

  buildStep3QuizHTML(island) {
    if (!this.state.quizQuestions.length) {
      this.setupIslandQuiz();
    }
    const q = this.state.quizQuestions[this.state.quizIdx];
    if (!q) {
      return `
        <div class="quiz-arena">
          <h2 style="font-size:2rem;color:#00B894;margin-bottom:10px;">🎉 Sound Battle Complete!</h2>
          <p style="font-size:1.2rem;margin-bottom:20px;">You scored <strong>${this.state.quizScore} / ${this.state.quizQuestions.length}</strong>!</p>
          <button class="btn-3d gold" style="font-size:1.2rem;" onclick="app.goToQuestStep(4)">
            🍲 Enter the Word Kitchen (Final Step!) ➡️
          </button>
        </div>
      `;
    }

    const t = q.target;
    setTimeout(() => {
      window.soundFX.speakHindi(t.ttsText || t.letter, t.roman, 0.8);
    }, 150);

    return `
      <div class="quiz-arena">
        <div style="display:flex;justify-content:space-between;margin-bottom:10px;font-weight:800;">
          <span>Question ${this.state.quizIdx + 1} of ${this.state.quizQuestions.length}</span>
          <span>⭐ Score: ${this.state.quizScore}</span>
        </div>

        <div class="quiz-prompt-box">
          <p style="font-size:1.1rem;font-weight:700;color:#B33939;">FIND THE LETTER FOR THIS SOUND & CLUE:</p>
          <h3 style="font-size:2rem;margin:8px 0;color:#2D3436;">
            ${t.emoji} "${t.roman.toUpperCase()}" — as in ${t.wordRoman} (${t.wordMeaning})
          </h3>
          <p style="font-size:1rem;color:#008F72;font-weight:700;margin-bottom:12px;">
            🪄 Hint: ${t.shapeTrick}
          </p>
          <button class="btn-3d" onclick="window.soundFX.speakLetterAndWord(window.VARNAMALA_MAP['${t.id}'])">
            🔊 Hear Sound Again
          </button>
        </div>

        <div class="quiz-options-grid">
          ${q.options.map(opt => `
            <button class="quiz-option-btn hindi-font" onclick="app.answerQuizOption('${opt.id}', this)">
              ${opt.letter}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  answerQuizOption(pickedId, btnEl) {
    const q = this.state.quizQuestions[this.state.quizIdx];
    if (!q || q.answered) return;

    if (pickedId === q.target.id) {
      q.answered = true;
      btnEl.classList.add('correct');
      window.soundFX.playCorrect();
      this.markLetterMastered(q.target.id);
      this.state.quizScore += 1;
      this.addStars(10);
      setTimeout(() => {
        this.state.quizIdx += 1;
        this.renderMainView();
      }, 900);
    } else {
      btnEl.classList.add('wrong');
      window.soundFX.playWrong();
      const pickedObj = window.VARNAMALA_MAP[pickedId];
      this.showToast(`Oops! "${pickedObj.letter}" is "${pickedObj.roman}" (${pickedObj.wordMeaning}). Try again!`);
    }
  }

  // --- STEP 4: WORD KITCHEN (Combine Letters to Read Real Hindi Words!) ---
  buildStep4WordBuilderHTML(island) {
    const words = island.wordsToBuild || [];
    const curWord = words[this.state.wordIdx];

    if (!curWord) {
      return `
        <div class="quiz-arena" style="padding:24px;">
          <div style="font-size:4.5rem;">🏆 ${island.rewardSticker.emoji}</div>
          <h2 style="font-size:2.2rem;color:#D63031;margin:10px 0;">Island ${island.number} Conquered!</h2>
          <p style="font-size:1.2rem;margin-bottom:20px;">
            You unlocked the <strong>${island.rewardSticker.name}</strong> badge and read real Hindi words!
          </p>
          <button class="btn-3d green" style="font-size:1.25rem;padding:14px 28px;" onclick="app.exitIsland()">
            🗺️ Return to World Map
          </button>
        </div>
      `;
    }

    const allChoices = [...curWord.letters, ...(curWord.distractors || [])];

    return `
      <div class="quiz-arena">
        <h3 style="font-size:1.4rem;color:#8854D0;margin-bottom:6px;">
          🍲 Word Kitchen: Cook Word ${this.state.wordIdx + 1} of ${words.length}!
        </h3>
        <p style="font-size:1.05rem;margin-bottom:14px;">Tap the Hindi letters in the right order to build this word:</p>

        <div class="quiz-prompt-box" style="background:#F3E5F5;border-color:#8854D0;">
          <h2 style="font-size:2.1rem;color:#2D3436;">"${curWord.roman}" — ${curWord.meaning}</h2>
          <button class="btn-3d purple" style="margin-top:10px;" onclick="window.soundFX.speakHindi('${curWord.hindi}', '${curWord.roman}', 0.8)">
            🔊 Hear Word "${curWord.hindi}"
          </button>
        </div>

        <div class="word-slots-row">
          ${curWord.letters.map((targetChar, i) => {
            const filledChar = this.state.builtWordLetters[i] || '';
            return `<div class="word-slot hindi-font ${filledChar ? 'filled' : ''}">${filledChar || '?'}</div>`;
          }).join('')}
        </div>

        <div class="quiz-options-grid" style="max-width:520px;margin:20px auto;">
          ${allChoices.map(ch => `
            <button class="quiz-option-btn hindi-font" onclick="app.pickWordBuilderChar('${ch}')">
              ${ch}
            </button>
          `).join('')}
        </div>

        <button class="btn-3d blue" onclick="app.resetCurrentWord()">🔄 Reset Letters</button>
      </div>
    `;
  }

  pickWordBuilderChar(ch) {
    const island = window.VARNAMALA_DATA.questIslands.find(i => i.id === this.state.activeIslandId);
    const curWord = island.wordsToBuild[this.state.wordIdx];
    if (!curWord) return;

    const nextSlotIdx = this.state.builtWordLetters.length;
    const expectedChar = curWord.letters[nextSlotIdx];

    if (ch === expectedChar) {
      this.state.builtWordLetters.push(ch);
      window.soundFX.speakHindi(ch, '', 0.85);

      if (this.state.builtWordLetters.length === curWord.letters.length) {
        // Word completed!
        window.soundFX.playCorrect();
        setTimeout(() => {
          window.soundFX.speakHindi(curWord.hindi, curWord.roman, 0.8);
        }, 300);
        this.addStars(15);

        setTimeout(() => {
          this.state.wordIdx += 1;
          this.state.builtWordLetters = [];
          if (this.state.wordIdx >= island.wordsToBuild.length) {
            this.state.completedIslands[island.id] = true;
            this.unlockSticker(island.rewardSticker.id);
            window.soundFX.playFanfare();
          }
          this.renderMainView();
        }, 1200);
      } else {
        this.renderMainView();
      }
    } else {
      window.soundFX.playWrong();
      this.showToast(`Try another letter! Look for "${expectedChar}"!`);
    }
  }

  resetCurrentWord() {
    this.state.builtWordLetters = [];
    window.soundFX.playClick();
    this.renderMainView();
  }

  // =========================================================================
  // 3. INTERACTIVE VARNAMALA SOUNDBOARD & SHAPE FAMILY EXPLORER
  // =========================================================================
  renderVarnamalaChart(container) {
    const f = this.state.chartFilter;

    let html = `
      <div class="explorer-section">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:18px;">
          <div>
            <h2 style="font-size:1.7rem;color:#0984E3;">🎹 Interactive Varnamala Soundboard</h2>
            <p style="font-weight:600;color:#636E72;">Tap any letter to hear its pronunciation, see its South Indian twin, and open its Shape Trick!</p>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;">
            <button class="btn-3d ${f === 'all' ? '' : 'blue'}" style="padding:8px 14px;font-size:0.95rem;" onclick="app.setChartFilter('all')">All (49)</button>
            <button class="btn-3d ${f === 'swar' ? '' : 'blue'}" style="padding:8px 14px;font-size:0.95rem;" onclick="app.setChartFilter('swar')">Swar Vowels (13)</button>
            <button class="btn-3d ${f === 'vyanjan' ? '' : 'blue'}" style="padding:8px 14px;font-size:0.95rem;" onclick="app.setChartFilter('vyanjan')">Vyanjan Consonants (36)</button>
            <button class="btn-3d ${f === 'shape3' ? '' : 'purple'}" style="padding:8px 14px;font-size:0.95rem;" onclick="app.setChartFilter('shape3')">🪄 "Number 3" Family</button>
          </div>
        </div>
    `;

    if (f === 'shape3') {
      const shape3Letters = window.VARNAMALA_DATA.swar.filter(s => s.shapeFamily === 'Number 3 Family');
      html += `
        <div class="varga-block" style="background:#FFF8E1;border-color:#FFB142;">
          <h3 style="color:#D66200;font-size:1.35rem;">🪄 The "Number 3" Super-Shortcut!</h3>
          <p style="font-weight:700;margin-top:4px;">Look how 8 different Hindi vowels all start by drawing the number <strong>3 (उ)</strong>! Once you can write 3, you know almost all the vowels!</p>
          <div class="varga-letters-grid">
            ${shape3Letters.map(l => this.renderChartTileHTML(l)).join('')}
          </div>
        </div>
      `;
    }

    if (f === 'all' || f === 'swar') {
      html += `
        <div class="varga-block" style="background:#FFFDF2;border-color:#FDCB6E;">
          <h3 style="color:#D63031;font-size:1.35rem;">🎵 Swar: The 13 Musical Vowels (अ to अः)</h3>
          <p style="font-weight:600;color:#636E72;">Short vowel + Long vowel pairs — clap once for short, clap twice for long!</p>
          <div class="varga-letters-grid">
            ${window.VARNAMALA_DATA.swar.map(l => this.renderChartTileHTML(l)).join('')}
          </div>
        </div>
      `;
    }

    if (f === 'all' || f === 'vyanjan') {
      window.VARNAMALA_DATA.vargas.forEach(varga => {
        html += `
          <div class="varga-block" style="border-left: 8px solid ${varga.color};">
            <h3 style="color:${varga.color};font-size:1.35rem;">${varga.icon} ${varga.title}</h3>
            <p style="font-weight:600;color:#2D3436;">${varga.subtitle}</p>
            <div class="varga-letters-grid">
              ${varga.letters.map(l => this.renderChartTileHTML(l)).join('')}
            </div>
          </div>
        `;
      });
    }

    html += `</div>`;
    container.innerHTML = html;
  }

  renderChartTileHTML(l) {
    const isMastered = !!this.state.masteredLetters[l.id];
    const bridgeCode = this.state.bridgeLang !== 'en' && l.bridge && l.bridge[this.state.bridgeLang]
      ? `<div class="tile-bridge">${l.bridge[this.state.bridgeLang]}</div>`
      : '';

    return `
      <div class="chart-tile ${isMastered ? 'mastered' : ''}" onclick="app.openLetterModal('${l.id}')">
        <div style="position:absolute;top:6px;right:8px;font-size:1rem;">${l.emoji}</div>
        <div class="tile-hindi hindi-font">${l.letter}</div>
        <div class="tile-roman">${l.roman}</div>
        ${bridgeCode}
        <div class="tile-word">${l.wordRoman}</div>
      </div>
    `;
  }

  setChartFilter(filter) {
    window.soundFX.playClick();
    this.state.chartFilter = filter;
    this.renderMainView();
  }

  openLetterModal(letterId) {
    const l = window.VARNAMALA_MAP[letterId];
    if (!l) return;
    window.soundFX.speakLetterAndWord(l);
    this.markLetterMastered(letterId);

    const modalRoot = document.getElementById('modalRoot');
    modalRoot.classList.remove('hidden');
    modalRoot.innerHTML = `
      <div class="modal-backdrop" onclick="app.closeModal(event)">
        <div class="modal-card" onclick="event.stopPropagation()">
          <button class="close-modal-btn" onclick="app.closeModal()">✕</button>
          <div style="text-align:center;">
            <div class="huge-hindi-char hindi-font" style="font-size:6rem;" onclick="window.soundFX.speakLetterAndWord(window.VARNAMALA_MAP['${l.id}'])">
              ${l.letter}
            </div>
            <div class="phonetic-badges">
              <span class="phonetic-badge">"${l.roman.toUpperCase()}"</span>
              <span class="bridge-script-badge">${this.getBridgeText(l)}</span>
            </div>
            <p style="font-weight:700;font-size:1.1rem;margin-bottom:14px;">👂 Sounds like: ${l.soundHint}</p>
          </div>

          <div class="word-association-card" style="margin-bottom:14px;" onclick="window.soundFX.speakLetterAndWord(window.VARNAMALA_MAP['${l.id}'])">
            <div class="word-emoji-circle">${l.emoji}</div>
            <div class="word-texts">
              <h3 class="hindi-font">${l.wordHindi}</h3>
              <div class="word-roman">${l.wordRoman} (${l.wordMeaning})</div>
            </div>
          </div>

          <div class="memory-trick-box" style="margin-bottom:16px;">
            <h4>🪄 Visual Shape Trick:</h4>
            <p>${l.shapeTrick}</p>
          </div>

          <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
            <button class="btn-3d" onclick="window.soundFX.speakLetterAndWord(window.VARNAMALA_MAP['${l.id}'])">
              🔊 Speak Again
            </button>
            <button class="btn-3d green" onclick="app.closeModal()">
              ✅ Got It!
            </button>
          </div>
        </div>
      </div>
    `;
  }

  closeModal() {
    const modalRoot = document.getElementById('modalRoot');
    if (modalRoot) {
      modalRoot.classList.add('hidden');
      modalRoot.innerHTML = '';
    }
    this.renderMainView();
  }

  // =========================================================================
  // 4. LOOK-ALIKE TWIN DETECTIVE (Solves confusing letter pairs forever!)
  // =========================================================================
  renderLookAlikeTwins(container) {
    const pairs = window.VARNAMALA_DATA.lookAlikePairs;

    container.innerHTML = `
      <div class="explorer-section" style="border-color:#A29BFE;box-shadow:0 8px 0 #6C5CE7;">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:20px;">
          <div>
            <h2 style="font-size:1.75rem;color:#6C5CE7;">🕵️ Look-Alike Twin Detective Lab</h2>
            <p style="font-weight:600;color:#636E72;">
              Many kids mix up these 7 look-alike pairs! Learn their secret differences and you will NEVER get tricked!
            </p>
          </div>
        </div>

        <div class="twins-grid">
          ${pairs.map(p => {
            const leftObj = window.VARNAMALA_MAP[p.left];
            const rightObj = window.VARNAMALA_MAP[p.right];
            return `
              <div class="twin-card">
                <h3 style="font-size:1.25rem;color:#4834D4;">🔍 ${p.title}</h3>
                <div class="twin-vs-row">
                  <div class="twin-char-box" onclick="app.quickSpeak('${leftObj ? leftObj.id : ''}', event)">
                    <div class="char hindi-font">${p.left}</div>
                    <div style="font-weight:800;color:#D63031;">${p.leftLabel}</div>
                    <small style="color:#0984E3;font-weight:700;">🔊 Tap to hear</small>
                  </div>
                  <div class="vs-circle">VS</div>
                  <div class="twin-char-box" onclick="app.quickSpeak('${rightObj ? rightObj.id : ''}', event)">
                    <div class="char hindi-font">${p.right}</div>
                    <div style="font-weight:800;color:#00B894;">${p.rightLabel}</div>
                    <small style="color:#0984E3;font-weight:700;">🔊 Tap to hear</small>
                  </div>
                </div>
                <div class="memory-trick-box" style="margin-bottom:12px;">
                  <h4>🕵️ Detective Clue:</h4>
                  <p style="font-size:0.98rem;">${p.secretTrick}</p>
                </div>
                <div style="background:#FFF8E1;padding:12px;border-radius:14px;border:2px solid #FFB142;">
                  <p style="font-weight:800;font-size:0.95rem;margin-bottom:8px;">🎯 Mini Test: ${p.quizQuestion}</p>
                  <div style="display:flex;gap:10px;">
                    <button class="btn-3d purple hindi-font" style="flex:1;font-size:1.3rem;" 
                            onclick="app.checkTwinAnswer('${p.id}', '${p.left}', '${p.correctAnswer}')">${p.left}</button>
                    <button class="btn-3d purple hindi-font" style="flex:1;font-size:1.3rem;" 
                            onclick="app.checkTwinAnswer('${p.id}', '${p.right}', '${p.correctAnswer}')">${p.right}</button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  checkTwinAnswer(pairId, picked, correct) {
    if (picked === correct) {
      window.soundFX.playCorrect();
      const obj = window.VARNAMALA_MAP[picked];
      if (obj) window.soundFX.speakLetterAndWord(obj);
      this.addStars(10);
      this.unlockSticker('twin_detective');
      this.showToast(`🕵️ Spot on, Detective! "${picked}" is the right answer! (+10 Stars)`);
    } else {
      window.soundFX.playWrong();
      this.showToast('🔍 Look closely at the Detective Clue above and try the other twin!');
    }
  }

  // =========================================================================
  // 5. ARCADE BOSS QUIZ (Confusion Monster Buster)
  // =========================================================================
  generateArcadeQuestion() {
    const target = window.ALL_LETTERS[Math.floor(Math.random() * window.ALL_LETTERS.length)];
    const distractors = window.ALL_LETTERS
      .filter(l => l.id !== target.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const options = [target, ...distractors].sort(() => Math.random() - 0.5);
    this.state.arcadeQuestion = { target, options };
  }

  renderArcadeMode(container) {
    if (!this.state.arcadeQuestion) {
      this.generateArcadeQuestion();
    }
    const q = this.state.arcadeQuestion;
    const t = q.target;

    setTimeout(() => {
      window.soundFX.speakHindi(t.ttsText || t.letter, t.roman, 0.8);
    }, 120);

    container.innerHTML = `
      <div class="quest-stage-container" style="text-align:center;">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;margin-bottom:18px;">
          <h2 style="font-size:1.7rem;color:#D63031;">⚡ Confusion Monster Arcade</h2>
          <div style="display:flex;gap:12px;">
            <span class="stat-pill">🔥 Streak: ${this.state.arcadeStreak}</span>
            <span class="stat-pill mastery-pill">🏆 Arcade Score: ${this.state.arcadeScore}</span>
          </div>
        </div>

        <div class="quiz-arena">
          <div class="quiz-prompt-box" style="background:linear-gradient(135deg,#E0F7FA,#FFF9C4);">
            <div style="font-size:3.5rem;margin-bottom:6px;">${t.emoji}</div>
            <h3 style="font-size:1.85rem;color:#2D3436;">
              Find the letter for <strong>"${t.roman.toUpperCase()}"</strong> (${this.getBridgeText(t)})
            </h3>
            <p style="font-size:1.1rem;font-weight:700;color:#008F72;margin:8px 0;">
              Word: ${t.wordRoman} (${t.wordMeaning}) — ${t.shapeTrick}
            </p>
            <button class="btn-3d" onclick="window.soundFX.speakLetterAndWord(window.VARNAMALA_MAP['${t.id}'])">
              🔊 Hear Sound
            </button>
          </div>

          <div class="quiz-options-grid">
            ${q.options.map(opt => `
              <button class="quiz-option-btn hindi-font" onclick="app.answerArcade('${opt.id}', this)">
                ${opt.letter}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  answerArcade(pickedId, btnEl) {
    const q = this.state.arcadeQuestion;
    if (!q) return;
    if (pickedId === q.target.id) {
      btnEl.classList.add('correct');
      window.soundFX.playCorrect();
      this.state.arcadeScore += 10;
      this.state.arcadeStreak += 1;
      this.markLetterMastered(q.target.id);
      this.addStars(5);
      if (this.state.arcadeStreak >= 3) {
        this.unlockSticker('boss_slayer');
      }
      setTimeout(() => {
        this.generateArcadeQuestion();
        this.renderMainView();
      }, 750);
    } else {
      btnEl.classList.add('wrong');
      window.soundFX.playWrong();
      this.state.arcadeStreak = 0;
      const wrongObj = window.VARNAMALA_MAP[pickedId];
      this.showToast(`That letter is "${wrongObj.letter}" (${wrongObj.roman}). Keep trying!`);
    }
  }

  // =========================================================================
  // 6. STICKER BOOK & TROPHY ROOM
  // =========================================================================
  renderStickerBook(container) {
    const stickers = window.VARNAMALA_DATA.stickers;

    container.innerHTML = `
      <div class="explorer-section" style="border-color:#FFD32A;box-shadow:0 8px 0 #FBC531;">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;margin-bottom:18px;">
          <div>
            <h2 style="font-size:1.75rem;color:#D66200;">🏆 My Sticker Book & Badges</h2>
            <p style="font-weight:600;color:#636E72;">Complete Island Quests, Trace Letters, and solve Look-Alike Mysteries to collect them all!</p>
          </div>
          <button class="btn-3d purple" onclick="app.openAvatarModal()">🎭 Change My Avatar</button>
        </div>

        <div class="stickers-grid">
          ${stickers.map(s => {
            const unlocked = !!this.state.unlockedStickers[s.id];
            return `
              <div class="sticker-card ${unlocked ? '' : 'locked'}">
                <div class="sticker-emoji">${s.emoji}</div>
                <h3 style="font-size:1.2rem;color:#2D3436;">${s.name}</h3>
                <p style="font-size:0.92rem;color:#636E72;font-weight:600;margin-top:4px;">${s.desc}</p>
                <div style="margin-top:10px;font-weight:800;color:${unlocked ? '#00B894' : '#B2BEC3'};">
                  ${unlocked ? '✅ UNLOCKED!' : '🔒 Locked'}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  openAvatarModal() {
    const modalRoot = document.getElementById('modalRoot');
    modalRoot.classList.remove('hidden');
    modalRoot.innerHTML = `
      <div class="modal-backdrop" onclick="app.closeModal()">
        <div class="modal-card" onclick="event.stopPropagation()">
          <button class="close-modal-btn" onclick="app.closeModal()">✕</button>
          <h2 style="text-align:center;color:#D63031;margin-bottom:16px;">🎭 Choose Your Quest Buddy!</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;">
            ${window.VARNAMALA_DATA.avatars.map(a => `
              <div class="chart-tile ${this.state.avatarId === a.id ? 'mastered' : ''}" onclick="app.selectAvatar('${a.id}')">
                <div style="font-size:3.2rem;">${a.emoji}</div>
                <div style="font-weight:800;margin-top:6px;">${a.name}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  selectAvatar(avatarId) {
    this.state.avatarId = avatarId;
    window.soundFX.playCorrect();
    this.saveState();
    this.closeModal();
    this.updateHeaderUI();
  }

  showToast(message) {
    let toast = document.getElementById('kidToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'kidToast';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        background: #2D3436;
        color: #FFFFFF;
        border: 3px solid #FFD32A;
        padding: 12px 24px;
        border-radius: 999px;
        font-weight: 800;
        font-size: 1.05rem;
        z-index: 200;
        box-shadow: 0 8px 24px rgba(0,0,0,0.25);
        text-align: center;
        max-width: 90vw;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.display = 'block';
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.style.display = 'none';
    }, 3400);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new VarnamalaQuestApp();
});
