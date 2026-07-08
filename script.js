// Agentic AI Course — shared interactivity
document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var toggle = document.querySelector('.navtoggle');
  var links = document.querySelector('.navlinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  // Tab panels (Overview / Build / Exercise)
  document.querySelectorAll('.tabbar').forEach(function (bar) {
    var buttons = bar.querySelectorAll('.tabbtn');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-tab');
        var container = bar.parentElement;
        container.querySelectorAll('.tabbtn').forEach(function (b) { b.classList.remove('active'); });
        container.querySelectorAll('.tabpanel').forEach(function (p) { p.classList.remove('active'); });
        btn.classList.add('active');
        container.querySelector('[data-panel="' + target + '"]').classList.add('active');
      });
    });
  });

  // Quiz logic: each .quiz-opt has data-correct="true|false"
  document.querySelectorAll('.quiz-q').forEach(function (q) {
    var opts = q.querySelectorAll('.quiz-opt');
    var feedback = q.querySelector('.quiz-feedback');
    opts.forEach(function (opt) {
      opt.addEventListener('click', function () {
        if (opt.dataset.answered === 'locked') return;
        opts.forEach(function (o) { o.dataset.answered = 'locked'; });
        var isCorrect = opt.getAttribute('data-correct') === 'true';
        opt.classList.add(isCorrect ? 'correct' : 'incorrect');
        if (!isCorrect) {
          var correctOpt = q.querySelector('[data-correct="true"]');
          if (correctOpt) correctOpt.classList.add('correct');
        }
        if (feedback) {
          feedback.textContent = isCorrect
            ? '✓ Correct — ' + (opt.getAttribute('data-explain') || '')
            : '✗ Not quite — ' + (opt.getAttribute('data-explain') || '');
          feedback.style.color = isCorrect ? '#6FCB8F' : '#E8695E';
        }
      });
    });
  });

  // Highlight active nav link based on current path
  var path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.navlinks a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href && (href === path || (path === '' && href === 'index.html'))) {
      a.classList.add('active');
    }
  });
});
