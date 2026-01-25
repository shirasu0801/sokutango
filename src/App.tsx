import { useState } from 'react';
import { TopicList } from './components/TopicList';
import { TopicDetail } from './components/TopicDetail';
import './App.css';

function App() {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
  };

  const handleBack = () => {
    setSelectedTopicId(null);
  };

  return (
    <div className="app">
      {selectedTopicId ? (
        <TopicDetail topicId={selectedTopicId} onBack={handleBack} />
      ) : (
        <TopicList onSelectTopic={handleSelectTopic} />
      )}
    </div>
  );
}

export default App;
