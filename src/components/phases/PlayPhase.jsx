// src/components/phases/PlayPhase.jsx
// Practice Phase (World Map & Quiz) for ScaleQuest

import React, { useState, useEffect, useRef } from 'react';
import './PlayPhase.css';
import KingdomMap from '../gamification/KingdomMap.jsx';
import QuestionRenderer from '../quiz/QuestionRenderer.jsx';
import BossBattleModal from '../quiz/BossBattleModal.jsx';
import FeedbackOverlay from '../shared/FeedbackOverlay.jsx';
import { useAudio } from '../../hooks/useAudio.js';
import { WORLDS } from '../../config/worlds.config.js';
import {
  playQuestionNarration,
  playCorrectNarration,
  playWrongNarration,
  playHint1Narration,
  playHint2Narration,
  districtCompleteNarration,
} from '../../utils/narration.js';

export default function PlayPhase({ state, dispatch }) {
  const { narrate, stopAll, sounds } = useAudio(state?.audioEnabled ?? true);
  const [showMap, setShowMap] = useState(true);
  const [hintsShown, setHintsShown] = useState(0);
  const [showHint, setShowHint] = useState(0);
  const [showBoss, setShowBoss] = useState(false);
  const feedbackTimer = useRef(null);

  const qs = state?.questionSet || [];
  const qIdx = state?.currentQuestion || 0;
  const question = qs[qIdx] || qs[0];
  const distIdx = state?.currentDistrict || 0;
  const world = WORLDS[distIdx] || WORLDS[0];
  const isPlayDone = state?.phaseComplete?.play;

  // Question narration
  useEffect(() => {
    if (!showMap && !showBoss && question && !state?.showFeedback) {
      const timer = setTimeout(() => {
        narrate(playQuestionNarration(question.questionText));
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [qIdx, showMap, showBoss, narrate, question, state?.showFeedback]);

  const actionsRef = useRef({});
  actionsRef.current = {
    dispatch,
    advanceQuestion: () => advanceQuestion(),
    handleAfterWrong: () => handleAfterWrong(),
  };

  // Auto-dismiss popup after 2.2s
  useEffect(() => {
    if (state?.showFeedback) {
      feedbackTimer.current = setTimeout(() => {
        if (state?.showFeedback === 'correct') {
          actionsRef.current.dispatch({ type: 'CLEAR_FEEDBACK' });
          actionsRef.current.advanceQuestion();
        } else {
          actionsRef.current.handleAfterWrong();
        }
      }, 2200);
    }
    return () => {
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    };
  }, [state?.showFeedback]);

  useEffect(() => {
    return () => {
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
      stopAll();
    };
  }, [stopAll]);

  function handleAnswer(answer) {
    stopAll();
    const isCorrect = String(answer).trim() === String(question.correctAnswer).trim();

    if (isCorrect) {
      sounds.correct();
      dispatch({ type: 'ANSWER_CORRECT' });
      narrate(playCorrectNarration((state?.streak || 0) + 1));
    } else {
      sounds.wrong();
      dispatch({ type: 'ANSWER_INCORRECT', payload: question.explanation });
      narrate(playWrongNarration());
      setHintsShown(0);
    }
  }

  function advanceQuestion() {
    setHintsShown(0);
    setShowHint(0);
    const nextIdx = qIdx + 1;

    if (nextIdx % 10 === 0 && nextIdx <= 100) {
      sounds.levelUp();
      narrate(districtCompleteNarration());
      dispatch({ type: 'NEXT_QUESTION' });
      setShowMap(true);
    } else {
      dispatch({ type: 'NEXT_QUESTION' });
    }
  }

  function handleShowHint() {
    stopAll();
    dispatch({ type: 'USE_HINT' });
    if (hintsShown === 0) {
      setShowHint(1);
      setHintsShown(1);
      narrate(playHint1Narration(question.hint1));
    } else {
      setShowHint(2);
      setHintsShown(2);
      narrate(playHint2Narration(question.hint2));
    }
  }

  function handleAfterWrong() {
    dispatch({ type: 'CLEAR_FEEDBACK' });
    advanceQuestion();
  }

  function handlePrevQuestion() {
    stopAll();
    dispatch({ type: 'CLEAR_FEEDBACK' });
    dispatch({ type: 'PREV_QUESTION' });
  }

  function handleNextQuestion() {
    stopAll();
    dispatch({ type: 'CLEAR_FEEDBACK' });
    advanceQuestion();
  }

  function handleSelectWorld(_idx) {
    stopAll();
    setShowMap(false);
  }

  function handleReplayWorld(idx) {
    stopAll();
    dispatch({ type: 'REPLAY_WORLD', payload: idx });
    setShowMap(false);
  }

  function handleWinBoss() {
    setShowBoss(false);
    dispatch({ type: 'BOSS_DEFEATED' });
  }

  // Play Complete Screen
  if (isPlayDone || (qIdx >= 100 && !showMap)) {
    const totalCorrect = state?.districtCorrect?.reduce((s, c) => s + (c || 0), 0) || 0;
    return (
      <div className="play-done-wrap">
        <div className="play-done-card glass-card anim-bounce-in">
          <div className="play-done-icon">🏆</div>
          <h2 className="play-done-title headline">Practice Phase Complete!</h2>
          <div className="play-done-stats">
            <div className="stat-pill"><span>✅</span><span>{totalCorrect}/100 Correct</span></div>
            <div className="stat-pill"><span>⭐</span><span>{state?.xp || 0} XP Earned</span></div>
            <div className="stat-pill"><span>🔥</span><span>Best Streak: {state?.maxStreak || 0}</span></div>
          </div>
          <button
            className="btn btn-primary btn-lg play-done-cta"
            onClick={() => dispatch({ type: 'SET_PHASE', payload: 'reflect' })}
          >
            🌟 Go to Reflect Phase
          </button>
        </div>
      </div>
    );
  }

  // World Map view
  if (showMap) {
    return (
      <div className="play-wrap">
        <KingdomMap
          districtScores={state?.districtScores || []}
          districtCorrect={state?.districtCorrect || []}
          currentDistrict={distIdx}
          unlocked={state?.unlocked || [true]}
          onSelectDistrict={handleSelectWorld}
          onReplayDistrict={handleReplayWorld}
          onStartBoss={() => setShowBoss(true)}
          onJumpReflect={() => dispatch({ type: 'SET_PHASE', payload: 'reflect' })}
        />

        {showBoss && (
          <BossBattleModal
            boss={world.boss}
            questions={qs.slice(distIdx * 10, distIdx * 10 + 5)}
            onWin={handleWinBoss}
            onClose={() => setShowBoss(false)}
            audioEnabled={state?.audioEnabled}
          />
        )}
      </div>
    );
  }

  // Question view
  return (
    <div className="play-wrap">
      {/* Top HUD */}
      <div className="play-top-bar">
        <div className="play-topic-compact">
          <span className="topic-name">
            <span>{world.emoji}</span> {world.name}
          </span>
          <button
            type="button"
            className="topic-mini-btn"
            onClick={() => setShowMap(true)}
            aria-label="Back to world map"
          >
            🗺️ Worlds
          </button>
        </div>

        <div className="play-hud-compact">
          <span className="hud-pill-mini q-num">
            Q{(qIdx % 10) + 1}/10
          </span>
          <span className="hud-pill-mini">
            ⭐ {state?.xp || 0} XP
          </span>
          {(state?.streak || 0) > 1 && (
            <span className="hud-pill-mini streak-pill">
              🔥 {state.streak}
            </span>
          )}
        </div>
      </div>

      {/* Progress line */}
      <div className="play-progress-line">
        <div
          className="play-progress-fill"
          style={{ width: `${(((qIdx % 10) + 1) / 10) * 100}%` }}
        />
      </div>

      {/* Active Question */}
      <QuestionRenderer
        question={question}
        onAnswer={handleAnswer}
        hintsShown={hintsShown}
        showHint={showHint}
        onHint={handleShowHint}
        isLocked={Boolean(state?.showFeedback)}
        onPrev={qIdx % 10 > 0 ? handlePrevQuestion : null}
        onNext={handleNextQuestion}
        canPrev={qIdx % 10 > 0}
      />

      {/* Instant Feedback Overlay */}
      {state?.showFeedback && (
        <FeedbackOverlay
          isCorrect={state.showFeedback === 'correct'}
          explanation={state.feedbackMsg || question.explanation}
          onContinue={() => {
            dispatch({ type: 'CLEAR_FEEDBACK' });
            advanceQuestion();
          }}
        />
      )}
    </div>
  );
}
