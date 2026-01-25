import { useState, useEffect } from 'react';
import type { Topic } from '../types';
import { storage } from '../utils/storage';
import { generateId } from '../utils/id';
import './TopicList.css';

interface TopicListProps {
  onSelectTopic: (topicId: string) => void;
}

export const TopicList = ({ onSelectTopic }: TopicListProps) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [newTopicName, setNewTopicName] = useState('');
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    setTopics(storage.getTopics());
  }, []);

  const handleCreateTopic = () => {
    if (newTopicName.trim()) {
      const newTopic: Topic = {
        id: generateId(),
        name: newTopicName.trim(),
        words: [],
        createdAt: Date.now(),
      };
      storage.saveTopic(newTopic);
      setTopics(storage.getTopics());
      setNewTopicName('');
      setShowInput(false);
    }
  };

  const handleDeleteTopic = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('このトピックを削除しますか？')) {
      storage.deleteTopic(id);
      setTopics(storage.getTopics());
    }
  };

  return (
    <div className="topic-list">
      <h1 className="app-title">📚 英単語1問1答</h1>
      
      <div className="topics-grid">
        {topics.map(topic => (
          <div
            key={topic.id}
            className="topic-card"
            onClick={() => onSelectTopic(topic.id)}
          >
            <div className="topic-header">
              <h2>{topic.name}</h2>
              <button
                className="delete-btn"
                onClick={(e) => handleDeleteTopic(topic.id, e)}
                aria-label="削除"
              >
                ×
              </button>
            </div>
            <div className="topic-info">
              <span className="word-count">{topic.words.length} 単語</span>
            </div>
          </div>
        ))}
        
        <div
          className="topic-card new-topic-card"
          onClick={() => setShowInput(true)}
        >
          {showInput ? (
            <div className="new-topic-input">
              <input
                type="text"
                placeholder="トピック名を入力"
                value={newTopicName}
                onChange={(e) => setNewTopicName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateTopic();
                  } else if (e.key === 'Escape') {
                    setShowInput(false);
                    setNewTopicName('');
                  }
                }}
                autoFocus
              />
              <div className="new-topic-actions">
                <button onClick={handleCreateTopic} className="create-btn">作成</button>
                <button onClick={() => {
                  setShowInput(false);
                  setNewTopicName('');
                }} className="cancel-btn">キャンセル</button>
              </div>
            </div>
          ) : (
            <div className="new-topic-placeholder">
              <span className="plus-icon">+</span>
              <span>新しいトピックを作成</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
