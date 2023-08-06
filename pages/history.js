import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import styles from '@/styles/History.module.css';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { removeFromHistory, getHistory } from '@/lib/userData';

const History = () => 
{
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  useEffect(() => 
  {
    async function updateHistory() 
    {
      if (!searchHistory || searchHistory.length === 0) 
      {
        setSearchHistory(await getHistory());
      }
    }
    updateHistory();
  }, [searchHistory, setSearchHistory]);

  if (!searchHistory) 
    return null;

  const parsedHistory = searchHistory.map((h) => 
  {
    const params = new URLSearchParams(h);
    const entries = params.entries();
    const historyElements = [];
    for (const [key, value] of entries) {
      historyElements.push(
        <span key={key}>
          {key}: <strong>{value}</strong>&nbsp;
        </span>
      );
    }
    return historyElements;
  });

  const historyClicked = (e, index) => {
    e.stopPropagation();
    const searchQuery = searchHistory[index];
    router.push(`/artwork?${searchQuery}`);
  };

  async function removeHistoryClicked(e, index) {
    e.stopPropagation();
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  }

  return (
    <div>
      {parsedHistory.length > 0 ? (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              key={index}
              className={styles.historyListItem}
              onClick={(e) => historyClicked(e, index)}
            >
              {historyItem}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Card>
          <Card.Body>
            <Card.Text>Nothing Here. Try searching for some artwork.</Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default History;
