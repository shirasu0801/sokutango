import { useState, useEffect } from 'react';
import type { Topic, QuizMode, ColorMark } from '../types';
import './QuizMode.css';

interface QuizModeComponentProps {
  topic: Topic;
  onUpdate: (topic: Topic) => void;
}

export const QuizModeComponent = ({ topic, onUpdate }: QuizModeComponentProps) => {
  const [quizMode, setQuizMode] = useState<QuizMode>('japanese-to-english');
  const [filterColors, setFilterColors] = useState<ColorMark[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const filteredWords = topic.words.filter(word => {
    if (filterColors.length === 0) return true;
    return word.colorMark && filterColors.includes(word.colorMark);
  });

  const currentWord = filteredWords[currentIndex];
  const isFinished = currentIndex >= filteredWords.length;

  useEffect(() => {
    if (filteredWords.length > 0) {
      setCurrentIndex(0);
      setAnswer('');
      setShowResult(false);
      setScore({ correct: 0, total: 0 });
    }
  }, [quizMode, filterColors.length]);

  const handleAnswer = () => {
    if (!currentWord) return;

    const correctAnswer = quizMode === 'japanese-to-english'
      ? currentWord.english.toLowerCase().trim()
      : currentWord.japanese.trim();

    const userAnswer = answer.toLowerCase().trim();
    const correct = userAnswer === correctAnswer;

    setIsCorrect(correct);
    setShowResult(true);
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNext = () => {
    if (currentIndex < filteredWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setAnswer('');
      setShowResult(false);
    }
  };

  const handleColorFilterToggle = (color: ColorMark) => {
    if (!color) return;
    setFilterColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const toggleColorMark = (color: ColorMark) => {
    if (!currentWord) return;
    const newColorMark = currentWord.colorMark === color ? null : color;
    const updatedWords = topic.words.map(w =>
      w.id === currentWord.id ? { ...w, colorMark: newColorMark } : w
    );
    onUpdate({ ...topic, words: updatedWords });
  };

  if (filteredWords.length === 0) {
    return (
      <div className="quiz-mode">
        <div className="quiz-settings">
          <div className="quiz-mode-selector">
            <h3>クイズモード</h3>
            <div className="mode-buttons">
              <button
                className={`quiz-mode-btn ${quizMode === 'japanese-to-english' ? 'active' : ''}`}
                onClick={() => setQuizMode('japanese-to-english')}
              >
                日本語 → 英語
              </button>
              <button
                className={`quiz-mode-btn ${quizMode === 'english-to-japanese' ? 'active' : ''}`}
                onClick={() => setQuizMode('english-to-japanese')}
              >
                英語 → 日本語
              </button>
            </div>
          </div>

          <div className="color-filter">
            <h3>フィルター（色で絞り込み）</h3>
            <div className="filter-buttons">
              <button
                className={`filter-btn red ${filterColors.includes('red') ? 'active' : ''}`}
                onClick={() => handleColorFilterToggle('red')}
              >
                🔴 赤
              </button>
              <button
                className={`filter-btn yellow ${filterColors.includes('yellow') ? 'active' : ''}`}
                onClick={() => handleColorFilterToggle('yellow')}
              >
                🟡 黄
              </button>
              <button
                className={`filter-btn green ${filterColors.includes('green') ? 'active' : ''}`}
                onClick={() => handleColorFilterToggle('green')}
              >
                🟢 緑
              </button>
            </div>
            <p className="filter-hint">
              フィルターを選択すると、選択した色の単語のみがクイズに出題されます
            </p>
          </div>
        </div>

        <div className="no-words-message">
          {filterColors.length === 0
            ? '単語が登録されていません。登録モードで単語を追加してください。'
            : '選択した色の単語がありません。'}
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-mode">
      <div className="quiz-settings">
        <div className="quiz-mode-selector">
          <h3>クイズモード</h3>
          <div className="mode-buttons">
            <button
              className={`quiz-mode-btn ${quizMode === 'japanese-to-english' ? 'active' : ''}`}
              onClick={() => setQuizMode('japanese-to-english')}
            >
              日本語 → 英語
            </button>
            <button
              className={`quiz-mode-btn ${quizMode === 'english-to-japanese' ? 'active' : ''}`}
              onClick={() => setQuizMode('english-to-japanese')}
            >
              英語 → 日本語
            </button>
          </div>
        </div>

        <div className="color-filter">
          <h3>フィルター（色で絞り込み）</h3>
          <div className="filter-buttons">
            <button
              className={`filter-btn red ${filterColors.includes('red') ? 'active' : ''}`}
              onClick={() => handleColorFilterToggle('red')}
            >
              🔴 赤
            </button>
            <button
              className={`filter-btn yellow ${filterColors.includes('yellow') ? 'active' : ''}`}
              onClick={() => handleColorFilterToggle('yellow')}
            >
              🟡 黄
            </button>
            <button
              className={`filter-btn green ${filterColors.includes('green') ? 'active' : ''}`}
              onClick={() => handleColorFilterToggle('green')}
            >
              🟢 緑
            </button>
          </div>
        </div>
      </div>

      {isFinished ? (
        <div className="quiz-result">
          <h2>🎉 クイズ完了！</h2>
          <div className="score-display">
            <div className="score-number">
              {score.correct} / {score.total}
            </div>
            <div className="score-percentage">
              {score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%
            </div>
          </div>
          <button
            onClick={() => {
              setCurrentIndex(0);
              setAnswer('');
              setShowResult(false);
              setScore({ correct: 0, total: 0 });
            }}
            className="restart-btn"
          >
            もう一度挑戦
          </button>
        </div>
      ) : (
        <div className="quiz-content">
          <div className="quiz-progress">
            {currentIndex + 1} / {filteredWords.length}
          </div>

          <div className="quiz-question">
            <div className="question-label">
              {quizMode === 'japanese-to-english' ? '日本語' : 'English'}
            </div>
            <div className="question-text">
              {quizMode === 'japanese-to-english'
                ? currentWord.japanese
                : currentWord.english}
            </div>
          </div>

          {!showResult ? (
            <div className="quiz-answer">
              <input
                type="text"
                placeholder={
                  quizMode === 'japanese-to-english'
                    ? '英語で入力'
                    : '日本語で入力'
                }
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAnswer();
                  }
                }}
                autoFocus
              />
              <button onClick={handleAnswer} className="submit-btn">
                回答
              </button>
            </div>
          ) : (
            <div className={`quiz-result-card ${isCorrect ? 'correct' : 'incorrect'}`}>
              <div className="result-icon">
                {isCorrect ? '✅' : '❌'}
              </div>
              <div className="result-text">
                <div className="result-label">
                  {isCorrect ? '正解！' : '不正解'}
                </div>
                <div className="correct-answer">
                  正解: {quizMode === 'japanese-to-english'
                    ? currentWord.english
                    : currentWord.japanese}
                </div>
              </div>
              <div className="color-mark-actions">
                <button
                  className={`color-mark-btn red ${currentWord.colorMark === 'red' ? 'active' : ''}`}
                  onClick={() => toggleColorMark('red')}
                >
                  🔴
                </button>
                <button
                  className={`color-mark-btn yellow ${currentWord.colorMark === 'yellow' ? 'active' : ''}`}
                  onClick={() => toggleColorMark('yellow')}
                >
                  🟡
                </button>
                <button
                  className={`color-mark-btn green ${currentWord.colorMark === 'green' ? 'active' : ''}`}
                  onClick={() => toggleColorMark('green')}
                >
                  🟢
                </button>
              </div>
              <button onClick={handleNext} className="next-btn">
                次へ →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
