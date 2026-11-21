// src/components/quiz/BossBattleModal.jsx
// Boss battle modal with 5 questions and 3 lives for ScaleQuest

import React, { useState } from 'react';
import './BossBattleModal.css';
import QuestionRenderer from './QuestionRenderer.jsx';
import { useAudio } from '../../hooks/useAudio.js';
import { bossStartNarration, bossWinNarration } from '../../utils/narration.js';

export default function BossBattleModal({ boss, questions, onWin, onClose, audioEnabled }) {
  const { narrate, sounds } = useAudio(audioEnabled);
  const [started, setStarted] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);

  const question = questions[qIndex] || questions[0];

  function startBattle() {
    setStarted(true);
    narrate(bossStartNarration());
  }

  function handleAnswer(ans) {
    const isCorrect = String(ans).trim() === String(question.correctAnswer).trim();
    if (isCorrect) {
      sounds.correct();
      if (qIndex + 1 >= Math.min(questions.length, 5)) {
        setWon(true);
        sounds.badge();
        narrate(bossWinNarration());
      } else {
        setQIndex(qIndex + 1);
      }
    } else {
      sounds.wrong();
      const nextLives = lives - 1;
      setLives(nextLives);
      if (nextLives <= 0) {
        setLost(true);
        sounds.defeat();
      }
    }
  }

  if (!started) {
    return (
      <div className="boss-modal-backdrop">
        <div className="boss-modal-card glass-card anim-bounce-in">
          <div className="boss-avatar-pulse">
            <span className="boss-emoji">{boss.emoji}</span>
          </div>
          <h2 className="boss-title">{boss.name}</h2>
          <p className="boss-desc">
            Answer 5 scale questions accurately to overcome the distorter!
          </p>
          <div className="boss-lives-preview">
            Lives: {'❤️'.repeat(3)}
          </div>
          <div className="boss-reward-preview">
            Reward: <strong>{boss.reward}</strong> (+50 XP)
          </div>
          <div className="boss-actions">
            <button className="btn btn-primary" onClick={startBattle}>
              ⚔️ Begin Boss Battle!
            </button>
            <button className="btn btn-outline" onClick={onClose}>
              Back to World
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (won) {
    return (
      <div className="boss-modal-backdrop">
        <div className="boss-modal-card glass-card anim-celebrate">
          <div className="boss-avatar-pulse" style={{ background: 'rgba(76, 175, 80, 0.4)' }}>
            <span className="boss-emoji">🏆</span>
          </div>
          <h2 className="boss-title" style={{ color: '#86efac' }}>
            Boss Defeated!
          </h2>
          <p className="boss-desc">
            You conquered {boss.name} and claimed the <strong>{boss.reward}</strong>!
          </p>
          <button className="btn btn-green" onClick={onWin}>
            Claim Reward &amp; Continue ✨
          </button>
        </div>
      </div>
    );
  }

  if (lost) {
    return (
      <div className="boss-modal-backdrop">
        <div className="boss-modal-card glass-card anim-shake">
          <div className="boss-avatar-pulse" style={{ background: 'rgba(239, 83, 80, 0.4)' }}>
            <span className="boss-emoji">💔</span>
          </div>
          <h2 className="boss-title" style={{ color: '#fca5a5' }}>
            Battle Lost!
          </h2>
          <p className="boss-desc">
            The distorter scrambled the dimensions. Review your scale factors and try again!
          </p>
          <button className="btn btn-outline" onClick={onClose}>
            Back to Map
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="boss-modal-backdrop">
      <div className="boss-battle-screen">
        <div className="boss-hud">
          <div className="boss-hud-left">
            <span className="boss-mini-icon">{boss.emoji}</span>
            <span className="boss-hud-name">{boss.name}</span>
          </div>
          <div className="boss-hud-center">
            Question {qIndex + 1} / 5
          </div>
          <div className="boss-hud-lives">
            {'❤️'.repeat(lives)}
          </div>
        </div>

        <QuestionRenderer
          question={question}
          onAnswer={handleAnswer}
          isLocked={false}
        />
      </div>
    </div>
  );
}
