import type { Topic, WordPair } from '../types';

const STORAGE_KEY = 'sokutango_topics';

export const storage = {
  getTopics(): Topic[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveTopics(topics: Topic[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(topics));
    } catch (error) {
      console.error('Failed to save topics:', error);
    }
  },

  getTopic(id: string): Topic | null {
    const topics = this.getTopics();
    return topics.find(t => t.id === id) || null;
  },

  saveTopic(topic: Topic): void {
    const topics = this.getTopics();
    const index = topics.findIndex(t => t.id === topic.id);
    if (index >= 0) {
      topics[index] = topic;
    } else {
      topics.push(topic);
    }
    this.saveTopics(topics);
  },

  deleteTopic(id: string): void {
    const topics = this.getTopics();
    const filtered = topics.filter(t => t.id !== id);
    this.saveTopics(filtered);
  },

  addWordToTopic(topicId: string, word: WordPair): void {
    const topic = this.getTopic(topicId);
    if (topic) {
      topic.words.push(word);
      this.saveTopic(topic);
    }
  },

  updateWordInTopic(topicId: string, wordId: string, updates: Partial<WordPair>): void {
    const topic = this.getTopic(topicId);
    if (topic) {
      const wordIndex = topic.words.findIndex(w => w.id === wordId);
      if (wordIndex >= 0) {
        topic.words[wordIndex] = { ...topic.words[wordIndex], ...updates };
        this.saveTopic(topic);
      }
    }
  },

  deleteWordFromTopic(topicId: string, wordId: string): void {
    const topic = this.getTopic(topicId);
    if (topic) {
      topic.words = topic.words.filter(w => w.id !== wordId);
      this.saveTopic(topic);
    }
  },
};
