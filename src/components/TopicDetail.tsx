import { useState, useEffect } from 'react';
import type { Topic, AppMode } from '../types';
import { storage } from '../utils/storage';
import { RegisterMode } from './RegisterMode';
import { QuizModeComponent } from './QuizMode';
import './TopicDetail.css';

interface TopicDetailProps {
  topicId: string;
  onBack: () => void;
}

export const TopicDetail = ({ topicId, onBack }: TopicDetailProps) => {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [mode, setMode] = useState<AppMode>('register');

  useEffect(() => {
    const loadedTopic = storage.getTopic(topicId);
    if (loadedTopic) {
      setTopic(loadedTopic);
    }
  }, [topicId]);

  useEffect(() => {
    if (topic) {
      storage.saveTopic(topic);
    }
  }, [topic]);

  if (!topic) {
    return <div>トピックが見つかりません</div>;
  }

  const handleTopicUpdate = (updatedTopic: Topic) => {
    setTopic(updatedTopic);
  };

  return (
    <div className="topic-detail">
      <div className="topic-detail-header">
        <button onClick={onBack} className="back-btn">← 戻る</button>
        <h1>{topic.name}</h1>
      </div>

      <div className="mode-selector">
        <button
          className={`mode-btn ${mode === 'register' ? 'active' : ''}`}
          onClick={() => setMode('register')}
        >
          📝 登録モード
        </button>
        <button
          className={`mode-btn ${mode === 'quiz' ? 'active' : ''}`}
          onClick={() => setMode('quiz')}
        >
          🎯 1問1答モード
        </button>
      </div>

      {mode === 'register' ? (
        <RegisterMode topic={topic} onUpdate={handleTopicUpdate} />
      ) : (
        <QuizModeComponent topic={topic} onUpdate={handleTopicUpdate} />
      )}
    </div>
  );
};
