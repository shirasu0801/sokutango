import { useState } from 'react';
import type { Topic, WordPair } from '../types';
import { storage } from '../utils/storage';
import { generateId } from '../utils/id';
import './RegisterMode.css';

interface RegisterModeProps {
  topic: Topic;
  onUpdate: (topic: Topic) => void;
}

export const RegisterMode = ({ topic, onUpdate }: RegisterModeProps) => {
  const [english, setEnglish] = useState('');
  const [japanese, setJapanese] = useState('');

  const handleAddWord = () => {
    if (english.trim() && japanese.trim()) {
      const newWord: WordPair = {
        id: generateId(),
        english: english.trim(),
        japanese: japanese.trim(),
        colorMark: null,
      };
      
      const updatedTopic = {
        ...topic,
        words: [...topic.words, newWord],
      };
      
      storage.saveTopic(updatedTopic);
      onUpdate(updatedTopic);
      setEnglish('');
      setJapanese('');
    }
  };

  const handleDeleteWord = (wordId: string) => {
    const updatedTopic = {
      ...topic,
      words: topic.words.filter(w => w.id !== wordId),
    };
    storage.saveTopic(updatedTopic);
    onUpdate(updatedTopic);
  };

  const handleColorMarkChange = (wordId: string, colorMark: WordPair['colorMark']) => {
    const updatedTopic = {
      ...topic,
      words: topic.words.map(w =>
        w.id === wordId ? { ...w, colorMark } : w
      ),
    };
    storage.saveTopic(updatedTopic);
    onUpdate(updatedTopic);
  };

  return (
    <div className="register-mode">
      <div className="register-form">
        <h2>新しい単語を登録</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="英単語"
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && japanese.trim()) {
                handleAddWord();
              }
            }}
          />
          <input
            type="text"
            placeholder="日本語訳"
            value={japanese}
            onChange={(e) => setJapanese(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && english.trim()) {
                handleAddWord();
              }
            }}
          />
          <button onClick={handleAddWord} className="add-btn">
            追加
          </button>
        </div>
      </div>

      <div className="word-list">
        <h3>登録済み単語 ({topic.words.length})</h3>
        {topic.words.length === 0 ? (
          <div className="empty-state">まだ単語が登録されていません</div>
        ) : (
          <div className="words-grid">
            {topic.words.map(word => (
              <div key={word.id} className="word-card">
                <div className="word-content">
                  <div className="word-english">{word.english}</div>
                  <div className="word-japanese">{word.japanese}</div>
                </div>
                <div className="word-actions">
                  <div className="color-marks">
                    <label className={`color-checkbox ${word.colorMark === 'red' ? 'checked red' : ''}`}>
                      <input
                        type="checkbox"
                        checked={word.colorMark === 'red'}
                        onChange={(e) =>
                          handleColorMarkChange(word.id, e.target.checked ? 'red' : null)
                        }
                      />
                      <span className="color-dot red"></span>
                    </label>
                    <label className={`color-checkbox ${word.colorMark === 'yellow' ? 'checked yellow' : ''}`}>
                      <input
                        type="checkbox"
                        checked={word.colorMark === 'yellow'}
                        onChange={(e) =>
                          handleColorMarkChange(word.id, e.target.checked ? 'yellow' : null)
                        }
                      />
                      <span className="color-dot yellow"></span>
                    </label>
                    <label className={`color-checkbox ${word.colorMark === 'green' ? 'checked green' : ''}`}>
                      <input
                        type="checkbox"
                        checked={word.colorMark === 'green'}
                        onChange={(e) =>
                          handleColorMarkChange(word.id, e.target.checked ? 'green' : null)
                        }
                      />
                      <span className="color-dot green"></span>
                    </label>
                  </div>
                  <button
                    onClick={() => handleDeleteWord(word.id)}
                    className="delete-word-btn"
                    aria-label="削除"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
