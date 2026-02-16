(function() {
  'use strict';

  var state = {
    order: 'inorder',
    answered: {},
    score: { correct: 0, incorrect: 0, total: 0 },
    domainScores: {},
    timerSeconds: 0,
    timerInterval: null,
    displayIndices: []
  };

  var domainClasses = {
    'Kubernetes Fundamentals': 'badge-k8s-fundamentals',
    'Container Orchestration': 'badge-container-orchestration',
    'Cloud Native Architecture': 'badge-cloud-native-architecture',
    'Cloud Native Observability': 'badge-cloud-native-observability',
    'Cloud Native Application Delivery': 'badge-cloud-native-app-delivery'
  };

  var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

  function init() {
    if (typeof questions === 'undefined' || !questions.length) {
      document.getElementById('app').innerHTML = '<p style="padding:2rem">No questions loaded.</p>';
      return;
    }
    state.score.total = questions.length;
    state.displayIndices = questions.map(function(_, i) { return i; });
    render();
    startTimer();
    setupScroll();
  }

  function render() {
    var app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(buildHeader());
    app.appendChild(buildContent());
    app.appendChild(buildBackToTop());
  }

  /* ─── Header ─── */
  function buildHeader() {
    var header = el('div', 'exam-header');

    var top = el('div', 'header-top');
    top.appendChild(el('h1', '', null, typeof EXAM_TITLE !== 'undefined' ? EXAM_TITLE : 'KCNA Practice Exam'));
    var timer = el('div', 'timer');
    timer.id = 'timer';
    timer.textContent = '00:00:00';
    top.appendChild(timer);
    header.appendChild(top);

    var controls = el('div', 'header-controls');

    var sd = el('div', 'score-display');
    sd.id = 'score-display';
    sd.innerHTML =
      '<span class="score-item">Answered: <strong id="score-answered">0</strong>/' + questions.length + '</span>' +
      '<span class="score-item score-correct">Correct: <strong id="score-correct">0</strong></span>' +
      '<span class="score-item score-incorrect">Wrong: <strong id="score-incorrect">0</strong></span>' +
      '<span class="score-item">Score: <strong id="score-percent">0%</strong></span>';
    controls.appendChild(sd);

    var toggle = el('div', 'order-toggle');
    var btnIn = el('button', 'order-btn active', { 'data-order': 'inorder' }, 'In Order');
    var btnRand = el('button', 'order-btn', { 'data-order': 'random' }, 'Random Order');
    btnIn.onclick = function() { setOrder('inorder'); };
    btnRand.onclick = function() { setOrder('random'); };
    toggle.appendChild(btnIn);
    toggle.appendChild(btnRand);
    controls.appendChild(toggle);
    header.appendChild(controls);

    var pb = el('div', 'progress-bar');
    var pf = el('div', 'progress-fill');
    pf.id = 'progress-fill';
    pf.style.width = '0%';
    pb.appendChild(pf);
    header.appendChild(pb);

    var nav = el('div', 'set-navigation');
    for (var i = 1; i <= 10; i++) {
      var pad2 = i < 10 ? '0' + i : '' + i;
      var a = el('a', 'set-nav-link' + (i === (typeof EXAM_SET !== 'undefined' ? EXAM_SET : 0) ? ' current' : ''));
      a.href = 'kcna-practice-' + pad2 + '.html';
      a.textContent = 'Set ' + pad2;
      nav.appendChild(a);
    }
    header.appendChild(nav);

    return header;
  }

  /* ─── Content ─── */
  function buildContent() {
    var content = el('div', 'exam-content');
    content.id = 'exam-content';

    var actions = el('div', 'exam-actions');
    var b1 = el('button', 'btn btn-primary', null, 'Check All Answers');
    b1.onclick = checkAll;
    var b2 = el('button', 'btn btn-outline', null, 'Reset All');
    b2.onclick = resetAll;
    var b3 = el('button', 'btn btn-success', null, 'Show Summary');
    b3.onclick = showSummary;
    actions.appendChild(b1);
    actions.appendChild(b2);
    actions.appendChild(b3);
    content.appendChild(actions);

    var summary = el('div', 'summary-section');
    summary.id = 'summary-section';
    content.appendChild(summary);

    for (var d = 0; d < state.displayIndices.length; d++) {
      content.appendChild(buildCard(questions[state.displayIndices[d]], state.displayIndices[d], d + 1));
    }

    if (typeof labExercises !== 'undefined' && labExercises.length) {
      content.appendChild(buildLabSection());
    }

    return content;
  }

  /* ─── Question Card ─── */
  function buildCard(q, qIdx, displayNum) {
    var card = el('div', 'question-card');
    card.id = 'question-' + qIdx;
    card.setAttribute('data-domain', q.domain);

    var meta = el('div', 'question-meta');
    meta.appendChild(el('span', 'question-number', null, 'Q' + displayNum));
    meta.appendChild(el('span', 'badge ' + (domainClasses[q.domain] || ''), null, q.domain));
    if (q.subsection) {
      meta.appendChild(el('span', 'badge badge-subsection', null, q.subsection));
    }
    card.appendChild(meta);

    var qt = el('div', 'question-text');
    qt.innerHTML = fmt(q.text);
    card.appendChild(qt);

    if (q.diagram) {
      var dc = el('div', 'diagram-container');
      dc.innerHTML = q.diagram;
      card.appendChild(dc);
    }

    var ol = el('ul', 'options-list');
    for (var i = 0; i < q.options.length; i++) {
      (function(optIdx) {
        var li = el('li', 'option-item');
        li.setAttribute('data-qidx', qIdx);
        li.setAttribute('data-optidx', optIdx);
        li.onclick = function() { selectOpt(qIdx, optIdx); };

        var radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'q' + qIdx;
        radio.className = 'option-radio';
        radio.value = optIdx;
        li.appendChild(radio);

        var lb = el('span', 'option-label');
        lb.innerHTML = '<strong>' + LETTERS[optIdx] + '.</strong> ' + fmt(q.options[optIdx]);
        li.appendChild(lb);
        ol.appendChild(li);
      })(i);
    }
    card.appendChild(ol);

    var cb = el('button', 'check-btn', null, 'Check Answer');
    cb.id = 'check-' + qIdx;
    cb.onclick = function() { checkAnswer(qIdx); };
    card.appendChild(cb);

    var exp = el('div', 'explanation');
    exp.id = 'explanation-' + qIdx;
    card.appendChild(exp);

    return card;
  }

  /* ─── Select option ─── */
  function selectOpt(qIdx, optIdx) {
    if (state.answered[qIdx] !== undefined) return;
    var items = document.querySelectorAll('.option-item[data-qidx="' + qIdx + '"]');
    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove('selected');
      items[i].querySelector('.option-radio').checked = false;
    }
    var sel = document.querySelector('.option-item[data-qidx="' + qIdx + '"][data-optidx="' + optIdx + '"]');
    if (sel) {
      sel.classList.add('selected');
      sel.querySelector('.option-radio').checked = true;
    }
  }

  /* ─── Check single answer ─── */
  function checkAnswer(qIdx) {
    var q = questions[qIdx];
    var sel = document.querySelector('.option-item[data-qidx="' + qIdx + '"].selected');
    if (!sel) { alert('Please select an answer first.'); return; }
    if (state.answered[qIdx] !== undefined) return;

    var selIdx = parseInt(sel.getAttribute('data-optidx'), 10);
    var ok = selIdx === q.answer;
    state.answered[qIdx] = { selected: selIdx, correct: ok };

    if (ok) state.score.correct++; else state.score.incorrect++;

    if (!state.domainScores[q.domain]) state.domainScores[q.domain] = { correct: 0, total: 0 };
    state.domainScores[q.domain].total++;
    if (ok) state.domainScores[q.domain].correct++;

    var items = document.querySelectorAll('.option-item[data-qidx="' + qIdx + '"]');
    for (var i = 0; i < items.length; i++) {
      items[i].classList.add('disabled');
      items[i].onclick = null;
      var idx = parseInt(items[i].getAttribute('data-optidx'), 10);
      if (idx === q.answer) items[i].classList.add('correct');
      if (idx === selIdx && !ok) items[i].classList.add('incorrect');
    }

    var card = document.getElementById('question-' + qIdx);
    card.classList.add(ok ? 'answered-correct' : 'answered-incorrect');
    document.getElementById('check-' + qIdx).disabled = true;

    var ed = document.getElementById('explanation-' + qIdx);
    ed.className = 'explanation show ' + (ok ? 'correct-exp' : 'incorrect-exp');
    var h = '<div class="explanation-title">' + (ok ? 'Correct!' : 'Incorrect. The correct answer is ' + LETTERS[q.answer] + '.') + '</div>';
    h += '<p>' + fmt(q.explanation) + '</p>';
    if (q.verify) {
      h += '<div class="verify-label">Verify with MicroK8s:</div>';
      h += '<div class="verify-cmd">' + esc(q.verify) + '</div>';
    }
    ed.innerHTML = h;

    updateScore();
  }

  /* ─── Bulk actions ─── */
  function checkAll() {
    for (var i = 0; i < questions.length; i++) {
      if (state.answered[i] === undefined) {
        var sel = document.querySelector('.option-item[data-qidx="' + i + '"].selected');
        if (sel) checkAnswer(i);
      }
    }
  }

  function resetAll() {
    if (!confirm('Reset all answers? This cannot be undone.')) return;
    state.answered = {};
    state.score = { correct: 0, incorrect: 0, total: questions.length };
    state.domainScores = {};
    state.timerSeconds = 0;
    document.getElementById('summary-section').className = 'summary-section';
    reRenderQuestions();
    updateScore();
  }

  function showSummary() {
    var ans = state.score.correct + state.score.incorrect;
    var pct = ans > 0 ? Math.round((state.score.correct / ans) * 100) : 0;
    var pass = pct >= 75;

    var s = document.getElementById('summary-section');
    var h = '<h2>Exam Summary</h2>';
    h += '<div class="summary-score ' + (pass ? 'summary-pass' : 'summary-fail') + '">' + pct + '%</div>';
    h += '<p style="margin:0.5rem 0;font-size:1.15rem;font-weight:600;color:' + (pass ? 'var(--correct)' : 'var(--incorrect)') + '">';
    h += (pass ? 'PASSED' : 'NOT YET PASSING') + ' (75% required)</p>';
    h += '<p style="color:var(--text-secondary)">' + state.score.correct + ' correct, ' + state.score.incorrect + ' incorrect, ' + (questions.length - ans) + ' unanswered</p>';
    h += '<div class="summary-breakdown">';
    for (var d in state.domainScores) {
      var ds = state.domainScores[d];
      var dp = ds.total > 0 ? Math.round((ds.correct / ds.total) * 100) : 0;
      h += '<div class="summary-domain"><div class="summary-domain-score" style="color:' + (dp >= 75 ? 'var(--correct)' : 'var(--incorrect)') + '">' + dp + '%</div>';
      h += '<div class="summary-domain-name">' + d + '<br>(' + ds.correct + '/' + ds.total + ')</div></div>';
    }
    h += '</div>';
    s.innerHTML = h;
    s.className = 'summary-section show';
    s.scrollIntoView({ behavior: 'smooth' });
  }

  /* ─── Order toggle ─── */
  function setOrder(order) {
    state.order = order;
    var btns = document.querySelectorAll('.order-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle('active', btns[i].getAttribute('data-order') === order);
    }
    if (order === 'random') {
      state.displayIndices = shuffle(makeRange(questions.length));
    } else {
      state.displayIndices = makeRange(questions.length);
    }
    reRenderQuestions();
  }

  function reRenderQuestions() {
    var content = document.getElementById('exam-content');
    var cards = content.querySelectorAll('.question-card');
    for (var i = 0; i < cards.length; i++) cards[i].remove();

    var lab = content.querySelector('.lab-section');
    for (var d = 0; d < state.displayIndices.length; d++) {
      var qIdx = state.displayIndices[d];
      var card = buildCard(questions[qIdx], qIdx, d + 1);

      if (state.answered[qIdx] !== undefined) {
        restoreCard(card, qIdx);
      }

      if (lab) content.insertBefore(card, lab); else content.appendChild(card);
    }
  }

  function restoreCard(card, qIdx) {
    var ans = state.answered[qIdx];
    var q = questions[qIdx];
    var items = card.querySelectorAll('.option-item');
    for (var i = 0; i < items.length; i++) {
      items[i].classList.add('disabled');
      items[i].onclick = null;
      var idx = parseInt(items[i].getAttribute('data-optidx'), 10);
      if (idx === ans.selected) {
        items[i].classList.add('selected');
        items[i].querySelector('.option-radio').checked = true;
        if (!ans.correct) items[i].classList.add('incorrect');
      }
      if (idx === q.answer) items[i].classList.add('correct');
    }
    card.classList.add(ans.correct ? 'answered-correct' : 'answered-incorrect');
    card.querySelector('.check-btn').disabled = true;
    var ed = card.querySelector('.explanation');
    ed.className = 'explanation show ' + (ans.correct ? 'correct-exp' : 'incorrect-exp');
    var h = '<div class="explanation-title">' + (ans.correct ? 'Correct!' : 'Incorrect. The correct answer is ' + LETTERS[q.answer] + '.') + '</div>';
    h += '<p>' + fmt(q.explanation) + '</p>';
    if (q.verify) {
      h += '<div class="verify-label">Verify with MicroK8s:</div>';
      h += '<div class="verify-cmd">' + esc(q.verify) + '</div>';
    }
    ed.innerHTML = h;
  }

  /* ─── Timer ─── */
  function startTimer() {
    state.timerInterval = setInterval(function() {
      state.timerSeconds++;
      var h = Math.floor(state.timerSeconds / 3600);
      var m = Math.floor((state.timerSeconds % 3600) / 60);
      var s = state.timerSeconds % 60;
      var te = document.getElementById('timer');
      if (te) te.textContent = pad0(h) + ':' + pad0(m) + ':' + pad0(s);
    }, 1000);
  }

  /* ─── Score ─── */
  function updateScore() {
    var ans = state.score.correct + state.score.incorrect;
    var pct = ans > 0 ? Math.round((state.score.correct / ans) * 100) : 0;
    setText('score-answered', ans);
    setText('score-correct', state.score.correct);
    setText('score-incorrect', state.score.incorrect);
    var pe = document.getElementById('score-percent');
    if (pe) {
      pe.textContent = pct + '%';
      pe.style.color = pct >= 75 ? '#a5d6a7' : (ans > 0 ? '#ef9a9a' : 'white');
    }
    var pf = document.getElementById('progress-fill');
    if (pf) pf.style.width = (ans / questions.length * 100) + '%';
  }

  /* ─── Lab Section ─── */
  function buildLabSection() {
    var section = el('div', 'lab-section');
    var h = '<h2>Hands-On Lab: Verify with LXD + MicroK8s</h2>';
    h += '<h3>Lab Setup</h3>';
    h += labStep(1, 'Create the MicroK8s LXD profile (one-time)',
      '<span class="prompt">$</span> lxc profile create microk8s<br>' +
      '<span class="prompt">$</span> wget -qO- https://raw.githubusercontent.com/canonical/microk8s/master/tests/lxc/microk8s.profile | lxc profile edit microk8s',
      'Creates a privileged LXD profile with the kernel modules, AppArmor, and device access that MicroK8s requires.');
    h += labStep(2, 'Launch the LXD container',
      '<span class="prompt">$</span> lxc launch ubuntu:24.04 kcna-lab --profile default --profile microk8s --config limits.cpu=2 --config limits.memory=4GiB',
      'Launches an Ubuntu 24.04 LTS container with the microk8s profile applied. Typically under 10 seconds.');
    h += labStep(3, 'Shell into the container',
      '<span class="prompt">$</span> lxc exec kcna-lab -- bash',
      'You are now inside the container with a root prompt <code>root@kcna-lab:~#</code>');
    h += labStep(4, 'Install MicroK8s',
      '<span class="prompt">$</span> snap install microk8s --classic --channel=1.32/stable',
      'Output: <code>microk8s (1.32/stable) v1.32.x from Canonical** installed</code>');
    h += labStep(5, 'Wait for MicroK8s to be ready',
      '<span class="prompt">$</span> microk8s status --wait-ready',
      'Shows <code>microk8s is running</code> with a list of available add-ons. DNS and ha-cluster are enabled by default.');
    h += labStep(6, 'Enable essential add-ons',
      '<span class="prompt">$</span> microk8s enable hostpath-storage<br>' +
      '<span class="prompt">$</span> microk8s enable ingress',
      'Each add-on enables successfully. Storage for PVCs, ingress for Ingress resources. DNS is already enabled by default.');
    h += labStep(7, 'Verify the cluster',
      '<span class="prompt">$</span> microk8s kubectl get nodes<br>' +
      '<span class="prompt">$</span> microk8s kubectl get pods -A',
      'One node in <code>Ready</code> state. System pods (coredns, calico, hostpath-provisioner, nginx-ingress) running.');
    h += labStep(8, 'Set up kubectl alias',
      '<span class="prompt">$</span> alias kubectl=\'microk8s kubectl\'<br>' +
      '<span class="prompt">$</span> echo "alias kubectl=\'microk8s kubectl\'" &gt;&gt; ~/.bashrc<br>' +
      '<span class="prompt">$</span> source ~/.bashrc',
      'You can now use <code>kubectl</code> directly instead of <code>microk8s kubectl</code>.');

    if (typeof labExercises !== 'undefined' && labExercises.length) {
      h += '<h3>Verification Exercises for This Set</h3>';
      for (var i = 0; i < labExercises.length; i++) {
        var ex = labExercises[i];
        h += '<div class="lab-step"><span class="lab-step-number">' + (i + 1) + '</span> <strong>' + ex.title + '</strong>';
        h += '<p style="margin:0.5rem 0;color:var(--text-secondary)">' + ex.description + '</p>';
        var cmds = Array.isArray(ex.commands) ? ex.commands.join('<br>') : ex.commands;
        h += '<div class="lab-cmd">' + cmds + '</div>';
        var expText = ex.expected || ex.expectedOutput || '';
        h += '<div class="lab-expected"><strong>Expected:</strong> ' + expText + '</div></div>';
      }
    }

    h += '<h3>Cleanup</h3>';
    h += '<div class="lab-step"><span class="lab-step-number">!</span> <strong>Delete the container when finished</strong>';
    h += '<div class="lab-cmd"><span class="prompt">$</span> exit <span class="comment"># exit the container shell</span><br>';
    h += '<span class="prompt">$</span> lxc stop kcna-lab &amp;&amp; lxc delete kcna-lab</div>';
    h += '<div class="lab-expected"><strong>Expected:</strong> Container stopped and deleted.</div></div>';

    section.innerHTML = h;
    return section;
  }

  function labStep(n, title, cmd, expected) {
    return '<div class="lab-step"><span class="lab-step-number">' + n + '</span> <strong>' + title + '</strong>' +
      '<div class="lab-cmd">' + cmd + '</div>' +
      '<div class="lab-expected"><strong>Expected:</strong> ' + expected + '</div></div>';
  }

  /* ─── Back to top ─── */
  function buildBackToTop() {
    var b = el('button', 'back-to-top', null, '\u2191');
    b.title = 'Back to top';
    b.onclick = function() { window.scrollTo({ top: 0, behavior: 'smooth' }); };
    return b;
  }

  function setupScroll() {
    window.addEventListener('scroll', function() {
      var b = document.querySelector('.back-to-top');
      if (b) b.classList.toggle('show', window.scrollY > 400);
    });
  }

  /* ─── Utilities ─── */
  function el(tag, cls, attrs, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (attrs) { for (var k in attrs) e.setAttribute(k, attrs[k]); }
    if (text) e.textContent = text;
    return e;
  }

  function setText(id, v) {
    var e = document.getElementById(id);
    if (e) e.textContent = v;
  }

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  function makeRange(n) {
    var a = [];
    for (var i = 0; i < n; i++) a.push(i);
    return a;
  }

  function pad0(n) { return n < 10 ? '0' + n : '' + n; }

  function fmt(text) {
    if (!text) return '';
    text = text.replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre>$2</pre>');
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    text = text.replace(/\n/g, '<br>');
    return text;
  }

  function esc(text) {
    if (!text) return '';
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
  }

  document.addEventListener('DOMContentLoaded', init);
})();
