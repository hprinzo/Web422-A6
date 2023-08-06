import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import ArtworkCard from '../components/ArtworkCard';
import { Row, Col, Card } from 'react-bootstrap';
const Favourites = () => {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  if (!favouritesList)
    return null;

    if (favouritesList) 
    {
      return (
      <div>
        {favouritesList.length > 0 ? (
          <Row className="gy-4">
            {favouritesList.map((objectID) => (
              <Col lg={3} key={objectID}>
                <ArtworkCard objectID={objectID} />
              </Col>
            ))}
          </Row>
        ) : (
          <Card>
            <Card.Body>
              <h4>Nothing Here</h4>
              Try adding some new artwork to the list.
            </Card.Body>
          </Card>
        )}
      </div>
    );
  }

  return null;
};

export default Favourites;
